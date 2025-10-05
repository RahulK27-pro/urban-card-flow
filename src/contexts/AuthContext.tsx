import { createContext, useContext, useState, ReactNode } from 'react';

interface Passenger {
  PassengerID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  CardNumber: string;
  Balance: number;
  CardType: string;
  Status: string;
}

interface AuthContextType {
  passenger: Passenger | null;
  admin: { username: string } | null;
  loginPassenger: (passenger: Passenger) => void;
  loginAdmin: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [passenger, setPassenger] = useState<Passenger | null>(null);
  const [admin, setAdmin] = useState<{ username: string } | null>(null);

  const loginPassenger = (passengerData: Passenger) => {
    setPassenger(passengerData);
    setAdmin(null);
  };

  const loginAdmin = (username: string) => {
    setAdmin({ username });
    setPassenger(null);
  };

  const logout = () => {
    setPassenger(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ passenger, admin, loginPassenger, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
