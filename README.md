# Urban Transit Card Management System

A comprehensive full-stack application for managing urban transit cards, passengers, stations, and fare systems with real-time analytics and seamless database integration.

## 🌟 Features

### For Passengers
- **Card Management**: View card balance, transaction history, and trip records
- **Real-time Analytics**: Monthly trip statistics and spending insights
- **Profile Management**: Update personal information and preferences
- **Secure Login**: Card-based authentication system

### For Administrators
- **Comprehensive Dashboard**: Real-time analytics and KPI monitoring
- **User Management**: Manage passengers, cards, and card types
- **Station Management**: Configure transit stations and fare rules
- **System Analytics**: Revenue tracking, trip analysis, and usage patterns

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **shadcn/ui** for consistent UI components
- **React Query** for efficient data fetching and caching
- **React Router** for navigation

### Backend
- **Python Flask** for RESTful API
- **SQLite** for relational database management
- **SQLAlchemy-style** queries for data operations

### Database Schema
- **Passengers**: Personal information and registration details
- **Cards**: Card numbers, balances, status, and associations
- **Stations**: Transit stations with line information
- **Card Types**: Different card categories (Adult, Student, Senior)
- **Transactions**: Top-up and payment history
- **Trips**: Journey records with entry/exit data
- **Fare Rules**: Station-to-station pricing configurations

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **SQLite** (usually included with Python)

### Installation & Setup

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd urban-card-flow
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Start the backend API**
```bash
python app.py
```
The API will run on `http://localhost:5000`

4. **Start the frontend development server**
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

## 🔑 Default Credentials

### Passenger Login
Use any of the sample card numbers:
- `SNJ1001` (Sanjay Kumar - Adult Card)
- `PRI2002` (Priya Sharma - Student Card)
- `ARU3003` (Arun Verma - Adult Card)
- `MEE4004` (Meera Nair - Senior Card)
- `ROH5005` (Rohan Singh - Student Card)

### Admin Login
- **Username**: `admin`
- **Password**: `admin`

## 📊 Database Information

The SQLite database (`project.db`) comes pre-populated with:
- **5 Sample Passengers** with different card types
- **5 Transit Stations** across different lines
- **3 Card Types** (Adult, Student, Senior) with fare multipliers
- **Sample Cards** with balances and transaction history
- **Fare Rules** for station-to-station pricing
- **Trip Records** for testing and demonstration

## 🏗️ Project Structure

```
urban-card-flow/
├── app.py                 # Flask API server
├── project.db            # SQLite database
├── src/
│   ├── components/       # React components
│   │   ├── admin/       # Admin management components
│   │   ├── PassengerLogin.tsx
│   │   ├── PassengerDashboard.tsx
│   │   ├── TripHistory.tsx
│   │   └── TransactionHistory.tsx
│   ├── contexts/        # React contexts
│   ├── hooks/          # Custom React hooks
│   └── pages/          # Page components
├── public/             # Static assets
└── package.json       # Node.js dependencies
```

## 🔌 API Endpoints

### Authentication
- `POST /api/passenger/login` - Passenger authentication
- `POST /api/admin/login` - Admin authentication

### Passengers
- `GET /api/passengers` - List all passengers
- `POST /api/passengers` - Create new passenger
- `GET /api/passengers/{id}` - Get passenger details
- `PUT /api/passengers/{id}` - Update passenger
- `DELETE /api/passengers/{id}` - Delete passenger

### Cards
- `GET /api/cards` - List all cards
- `POST /api/cards` - Create new card
- `GET /api/cards/{id}` - Get card details
- `PUT /api/cards/{id}` - Update card
- `DELETE /api/cards/{id}` - Delete card
- `POST /api/cards/{id}/recharge` - Recharge card balance

### Stations
- `GET /api/stations` - List all stations
- `POST /api/stations` - Create new station
- `GET /api/stations/{id}` - Get station details
- `PUT /api/stations/{id}` - Update station
- `DELETE /api/stations/{id}` - Delete station

### Analytics
- `GET /api/analytics/kpis` - Key performance indicators

### Trip & Transaction History
- `GET /api/cards/{id}/trips` - Get trip history for a card
- `GET /api/cards/{id}/transactions` - Get transaction history for a card

## 🎯 Key Features Implemented

✅ **Real Database Integration** - All data stored in SQLite database
✅ **RESTful API** - Complete backend API with Flask
✅ **Real-time Updates** - Live balance and transaction updates
✅ **Responsive Design** - Works on desktop and mobile devices
✅ **Type Safety** - Full TypeScript implementation
✅ **Modern UI** - Beautiful interface with Tailwind CSS
✅ **Error Handling** - Proper error states and user feedback
✅ **Loading States** - Smooth loading animations
✅ **Data Validation** - Input validation and sanitization

## 🔒 Security Features

- Card-based authentication for passengers
- Admin role-based access control
- Input validation and sanitization
- SQL injection prevention through parameterized queries

## 📈 Future Enhancements

- Real-time trip tracking with GPS integration
- Mobile app development (React Native)
- Advanced analytics with charts and graphs
- Multi-language support
- Push notifications for low balance alerts
- Integration with payment gateways
- Fare calculation engine improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@urbantransit.com or create an issue in the repository.

---

**Built with ❤️ for efficient urban transit management**
