
import React, { useState } from 'react';
import { UserRole, User, Product, Appointment, CartItem } from './types';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import AdminDashboard from './components/AdminDashboard';
import StaffDashboard from './components/StaffDashboard';
import Login from './components/Login';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'a1',
      patientId: 'u1',
      patientName: 'Jane Doe',
      doctorId: 'd1',
      doctorName: 'Dr. Sarah Smith',
      date: '2024-06-20',
      time: '09:00',
      status: 'CONFIRMED'
    }
  ]);

  const handleLogin = (role: UserRole) => {
    setUser({
      id: role.toLowerCase() + '_1',
      name: `${role.charAt(0) + role.slice(1).toLowerCase()} User`,
      email: `${role.toLowerCase()}@lumeskin.com`,
      role
    });
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const addAppointment = (appt: Appointment) => {
    setAppointments(prev => [...prev, appt]);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <div className="mobile-container border-x border-gray-100 shadow-2xl">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          {user.role === UserRole.PATIENT && (
            <PatientDashboard 
              user={user} 
              cart={cart} 
              addToCart={addToCart} 
              removeFromCart={removeFromCart}
              appointments={appointments}
              onLogout={handleLogout} 
              onAddAppointment={addAppointment}
            />
          )}
          {user.role === UserRole.DOCTOR && (
            <DoctorDashboard 
              user={user} 
              appointments={appointments}
              onLogout={handleLogout} 
              onUpdateAppointment={updateAppointmentStatus}
            />
          )}
          {user.role === UserRole.ADMIN && (
            <AdminDashboard 
              user={user} 
              onLogout={handleLogout} 
            />
          )}
          {user.role === UserRole.STAFF && (
            <StaffDashboard 
              user={user} 
              appointments={appointments}
              onLogout={handleLogout}
              onAddAppointment={addAppointment}
              onUpdateAppointment={updateAppointmentStatus}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
