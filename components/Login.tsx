
import React, { useState } from 'react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.PATIENT);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    onLogin(selectedRole);
  };

  return (
    <div className="h-full bg-white flex flex-col p-8 justify-center animate-in fade-in duration-500">
      <div className="mb-10 text-center">
        <div className="w-20 h-20 bg-baby-pink rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-lg border border-pink-200">
          <span className="text-4xl font-serif text-baby-pink">L</span>
        </div>
        <h1 className="text-4xl font-serif text-gray-800 mb-2">LumeSkin</h1>
        <p className="text-gray-400 text-sm italic">Advanced Clinical Skincare</p>
      </div>

      <div className="bg-slate-50 p-1 rounded-2xl flex mb-8 border border-gray-100">
        <button 
          onClick={() => setIsSignUp(false)}
          className={`flex-1 py-3 text-xs font-black rounded-xl transition-all ${!isSignUp ? 'bg-white text-pink-500 shadow-md' : 'text-gray-400'}`}
        >
          LOG IN
        </button>
        <button 
          onClick={() => setIsSignUp(true)}
          className={`flex-1 py-3 text-xs font-black rounded-xl transition-all ${isSignUp ? 'bg-white text-pink-500 shadow-md' : 'text-gray-400'}`}
        >
          SIGN UP
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-[10px] font-black text-pink-400 uppercase tracking-widest ml-1">Access Portal</label>
          <select 
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as UserRole)}
            className="w-full mt-1 p-4 bg-slate-50 border border-gray-100 rounded-2xl text-sm font-medium outline-none focus:border-pink-300 transition-colors"
          >
            <option value={UserRole.PATIENT}>Patient</option>
            <option value={UserRole.DOCTOR}>Dermatologist</option>
            <option value={UserRole.STAFF}>Clinic Staff</option>
            <option value={UserRole.ADMIN}>Administrator</option>
          </select>
        </div>

        <input 
          type="email" 
          placeholder="Email address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 bg-slate-50 border border-gray-100 rounded-2xl text-sm outline-none focus:border-pink-300 transition-colors"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 bg-slate-50 border border-gray-100 rounded-2xl text-sm outline-none focus:border-pink-300 transition-colors"
        />

        <button 
          type="submit"
          className="w-full py-4 btn-gradient text-white rounded-2xl font-black text-sm shadow-xl shadow-pink-200 active:scale-95 transition-transform"
        >
          {isSignUp ? 'Create Lume Account' : 'Sign In'}
        </button>
      </form>

      <div className="mt-8 text-center flex flex-col gap-2">
        <button className="text-[10px] font-black text-pink-500 uppercase tracking-widest hover:underline">
          Forgot Password?
        </button>
        <p className="text-[10px] text-gray-400">By continuing, you agree to our Terms of Service</p>
      </div>
    </div>
  );
};

export default Login;
