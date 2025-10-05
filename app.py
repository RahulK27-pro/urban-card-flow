from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime
import random
import string

app = Flask(__name__)
CORS(app)

DATABASE = 'project.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def generate_card_number():
    """Generate a unique card number"""
    return 'CARD-' + ''.join(random.choices(string.digits, k=6))

# ===== AUTHENTICATION ENDPOINTS =====

@app.route('/api/passenger/login', methods=['POST'])
def passenger_login():
    data = request.json
    card_number = data.get('cardNumber')
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT c.*, p.FirstName, p.LastName, p.Email, p.PhoneNumber, ct.TypeName
        FROM Card c
        JOIN Passenger p ON c.PassengerID = p.PassengerID
        JOIN CardType ct ON c.CardTypeID = ct.CardTypeID
        WHERE c.CardNumber = ?
    ''', (card_number,))
    
    card = cursor.fetchone()
    conn.close()
    
    if card:
        return jsonify(dict(card)), 200
    else:
        return jsonify({'error': 'Invalid card number'}), 401

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Simple hardcoded admin check
    if username == 'admin' and password == 'admin':
        return jsonify({'success': True}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

# ===== PASSENGER ENDPOINTS =====

@app.route('/api/passengers', methods=['GET'])
def get_passengers():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Passenger ORDER BY RegistrationDate DESC')
    passengers = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(passengers), 200

@app.route('/api/passengers/<int:id>', methods=['GET'])
def get_passenger(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Passenger WHERE PassengerID = ?', (id,))
    passenger = cursor.fetchone()
    conn.close()
    
    if passenger:
        return jsonify(dict(passenger)), 200
    else:
        return jsonify({'error': 'Passenger not found'}), 404

@app.route('/api/passengers', methods=['POST'])
def create_passenger():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO Passenger (FirstName, LastName, Email, PhoneNumber, RegistrationDate)
        VALUES (?, ?, ?, ?, ?)
    ''', (
        data['firstName'],
        data['lastName'],
        data['email'],
        data['phoneNumber'],
        datetime.now().strftime('%Y-%m-%d')
    ))
    
    conn.commit()
    passenger_id = cursor.lastrowid
    conn.close()
    
    return jsonify({'id': passenger_id, 'message': 'Passenger created successfully'}), 201

@app.route('/api/passengers/<int:id>', methods=['PUT'])
def update_passenger(id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        UPDATE Passenger
        SET FirstName = ?, LastName = ?, Email = ?, PhoneNumber = ?
        WHERE PassengerID = ?
    ''', (
        data['firstName'],
        data['lastName'],
        data['email'],
        data['phoneNumber'],
        id
    ))
    
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Passenger updated successfully'}), 200

@app.route('/api/passengers/<int:id>', methods=['DELETE'])
def delete_passenger(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Delete associated cards first
    cursor.execute('DELETE FROM Card WHERE PassengerID = ?', (id,))
    cursor.execute('DELETE FROM Passenger WHERE PassengerID = ?', (id,))
    
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Passenger deleted successfully'}), 200

# ===== CARD ENDPOINTS =====

@app.route('/api/cards', methods=['GET'])
def get_cards():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT c.*, p.FirstName || ' ' || p.LastName as PassengerName, ct.TypeName as CardTypeName
        FROM Card c
        JOIN Passenger p ON c.PassengerID = p.PassengerID
        JOIN CardType ct ON c.CardTypeID = ct.CardTypeID
        ORDER BY c.IssueDate DESC
    ''')
    cards = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(cards), 200

@app.route('/api/cards/<int:id>', methods=['GET'])
def get_card(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT c.*, p.FirstName || ' ' || p.LastName as PassengerName, ct.TypeName as CardTypeName
        FROM Card c
        JOIN Passenger p ON c.PassengerID = p.PassengerID
        JOIN CardType ct ON c.CardTypeID = ct.CardTypeID
        WHERE c.CardID = ?
    ''', (id,))
    card = cursor.fetchone()
    conn.close()
    
    if card:
        return jsonify(dict(card)), 200
    else:
        return jsonify({'error': 'Card not found'}), 404

@app.route('/api/cards', methods=['POST'])
def create_card():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    
    card_number = generate_card_number()
    
    cursor.execute('''
        INSERT INTO Card (CardNumber, Balance, IssueDate, Status, PassengerID, CardTypeID)
        VALUES (?, ?, ?, 'Active', ?, ?)
    ''', (
        card_number,
        data.get('initialBalance', 0),
        datetime.now().strftime('%Y-%m-%d'),
        data['passengerId'],
        data['cardTypeId']
    ))
    
    conn.commit()
    card_id = cursor.lastrowid
    conn.close()
    
    return jsonify({'id': card_id, 'cardNumber': card_number, 'message': 'Card created successfully'}), 201

@app.route('/api/cards/<int:id>', methods=['PUT'])
def update_card(id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        UPDATE Card
        SET Status = ?, CardTypeID = ?
        WHERE CardID = ?
    ''', (
        data.get('status'),
        data.get('cardTypeId'),
        id
    ))
    
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Card updated successfully'}), 200

@app.route('/api/cards/<int:id>', methods=['DELETE'])
def delete_card(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Delete associated transactions and trips
    cursor.execute('DELETE FROM Transaction WHERE CardID = ?', (id,))
    cursor.execute('DELETE FROM Trip WHERE CardID = ?', (id,))
    cursor.execute('DELETE FROM Card WHERE CardID = ?', (id,))
    
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Card deleted successfully'}), 200

@app.route('/api/cards/<int:id>/recharge', methods=['POST'])
def recharge_card(id):
    data = request.json
    amount = data.get('amount')
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Update card balance
    cursor.execute('UPDATE Card SET Balance = Balance + ? WHERE CardID = ?', (amount, id))
    
    # Create transaction record
    cursor.execute('''
        INSERT INTO Transaction (TransactionType, Amount, TransactionDate, CardID)
        VALUES ('Top-up', ?, ?, ?)
    ''', (amount, datetime.now().strftime('%Y-%m-%d %H:%M:%S'), id))
    
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Card recharged successfully'}), 200

# ===== STATION ENDPOINTS =====

@app.route('/api/stations', methods=['GET'])
def get_stations():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Station ORDER BY StationName')
    stations = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(stations), 200

@app.route('/api/stations/<int:id>', methods=['GET'])
def get_station(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Station WHERE StationID = ?', (id,))
    station = cursor.fetchone()
    conn.close()
    
    if station:
        return jsonify(dict(station)), 200
    else:
        return jsonify({'error': 'Station not found'}), 404

@app.route('/api/stations', methods=['POST'])
def create_station():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO Station (StationName, LineColor)
        VALUES (?, ?)
    ''', (data['stationName'], data['lineColor']))
    
    conn.commit()
    station_id = cursor.lastrowid
    conn.close()
    
    return jsonify({'id': station_id, 'message': 'Station created successfully'}), 201

@app.route('/api/stations/<int:id>', methods=['PUT'])
def update_station(id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        UPDATE Station
        SET StationName = ?, LineColor = ?
        WHERE StationID = ?
    ''', (data['stationName'], data['lineColor'], id))
    
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Station updated successfully'}), 200

@app.route('/api/stations/<int:id>', methods=['DELETE'])
def delete_station(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM Station WHERE StationID = ?', (id,))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Station deleted successfully'}), 200

# ===== CARD TYPE ENDPOINTS =====

@app.route('/api/cardtypes', methods=['GET'])
def get_card_types():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM CardType ORDER BY TypeName')
    card_types = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(card_types), 200

@app.route('/api/cardtypes/<int:id>', methods=['GET'])
def get_card_type(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM CardType WHERE CardTypeID = ?', (id,))
    card_type = cursor.fetchone()
    conn.close()
    
    if card_type:
        return jsonify(dict(card_type)), 200
    else:
        return jsonify({'error': 'Card type not found'}), 404

@app.route('/api/cardtypes', methods=['POST'])
def create_card_type():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO CardType (TypeName, BaseFareMultiplier, Description)
        VALUES (?, ?, ?)
    ''', (data['typeName'], data['baseFareMultiplier'], data['description']))
    
    conn.commit()
    card_type_id = cursor.lastrowid
    conn.close()
    
    return jsonify({'id': card_type_id, 'message': 'Card type created successfully'}), 201

@app.route('/api/cardtypes/<int:id>', methods=['PUT'])
def update_card_type(id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        UPDATE CardType
        SET TypeName = ?, BaseFareMultiplier = ?, Description = ?
        WHERE CardTypeID = ?
    ''', (data['typeName'], data['baseFareMultiplier'], data['description'], id))
    
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Card type updated successfully'}), 200

@app.route('/api/cardtypes/<int:id>', methods=['DELETE'])
def delete_card_type(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM CardType WHERE CardTypeID = ?', (id,))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Card type deleted successfully'}), 200

# ===== FARE RULE ENDPOINTS =====

@app.route('/api/farerules', methods=['GET'])
def get_fare_rules():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT fr.*, s1.StationName as StartStationName, s2.StationName as EndStationName
        FROM FareRule fr
        JOIN Station s1 ON fr.StartStationID = s1.StationID
        JOIN Station s2 ON fr.EndStationID = s2.StationID
        ORDER BY s1.StationName
    ''')
    fare_rules = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(fare_rules), 200

@app.route('/api/farerules/<int:id>', methods=['GET'])
def get_fare_rule(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT fr.*, s1.StationName as StartStationName, s2.StationName as EndStationName
        FROM FareRule fr
        JOIN Station s1 ON fr.StartStationID = s1.StationID
        JOIN Station s2 ON fr.EndStationID = s2.StationID
        WHERE fr.FareRuleID = ?
    ''', (id,))
    fare_rule = cursor.fetchone()
    conn.close()
    
    if fare_rule:
        return jsonify(dict(fare_rule)), 200
    else:
        return jsonify({'error': 'Fare rule not found'}), 404

@app.route('/api/farerules', methods=['POST'])
def create_fare_rule():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO FareRule (FareAmount, FareType, StartStationID, EndStationID)
        VALUES (?, ?, ?, ?)
    ''', (data['fareAmount'], data.get('fareType', 'Standard'), data['startStationId'], data['endStationId']))
    
    conn.commit()
    fare_rule_id = cursor.lastrowid
    conn.close()
    
    return jsonify({'id': fare_rule_id, 'message': 'Fare rule created successfully'}), 201

@app.route('/api/farerules/<int:id>', methods=['PUT'])
def update_fare_rule(id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        UPDATE FareRule
        SET FareAmount = ?, FareType = ?, StartStationID = ?, EndStationID = ?
        WHERE FareRuleID = ?
    ''', (data['fareAmount'], data.get('fareType', 'Standard'), data['startStationId'], data['endStationId'], id))
    
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Fare rule updated successfully'}), 200

@app.route('/api/farerules/<int:id>', methods=['DELETE'])
def delete_fare_rule(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM FareRule WHERE FareRuleID = ?', (id,))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Fare rule deleted successfully'}), 200

# ===== TRIP & TRANSACTION HISTORY =====

@app.route('/api/cards/<int:id>/trips', methods=['GET'])
def get_card_trips(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT t.*, s1.StationName as EntryStationName, s2.StationName as ExitStationName
        FROM Trip t
        JOIN Station s1 ON t.EntryStationID = s1.StationID
        LEFT JOIN Station s2 ON t.ExitStationID = s2.StationID
        WHERE t.CardID = ?
        ORDER BY t.EntryTime DESC
    ''', (id,))
    trips = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(trips), 200

@app.route('/api/cards/<int:id>/transactions', methods=['GET'])
def get_card_transactions(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT * FROM Transaction
        WHERE CardID = ?
        ORDER BY TransactionDate DESC
    ''', (id,))
    transactions = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(transactions), 200

# ===== ANALYTICS =====

@app.route('/api/analytics/kpis', methods=['GET'])
def get_kpis():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT COUNT(*) as count FROM Passenger')
    total_passengers = cursor.fetchone()['count']
    
    cursor.execute('SELECT SUM(Balance) as total FROM Card')
    total_balance = cursor.fetchone()['total'] or 0
    
    cursor.execute('SELECT COUNT(*) as count FROM Trip')
    total_trips = cursor.fetchone()['count']
    
    cursor.execute('SELECT SUM(Amount) as total FROM Transaction WHERE TransactionType = "Top-up"')
    total_revenue = cursor.fetchone()['total'] or 0
    
    conn.close()
    
    return jsonify({
        'totalPassengers': total_passengers,
        'totalBalance': total_balance,
        'totalTrips': total_trips,
        'totalRevenue': total_revenue
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
