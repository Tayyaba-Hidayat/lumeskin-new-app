
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Shield, Users, ShoppingCart, BarChart3, MessageSquare, LogOut, Check, X, Search, MoreVertical } from 'lucide-react';

const AdminDashboard: React.FC<{ user: User, onLogout: () => void }> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'catalog' | 'approvals'>('stats');

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="px-6 pt-12 pb-4 bg-white sticky top-0 z-10 border-b border-gray-50">
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-xl font-bold text-gray-800">Admin Console</h1>
          <button onClick={onLogout} className="text-gray-300"><LogOut size={20}/></button>
        </div>
        <p className="text-[10px] text-baby-pink font-black uppercase tracking-widest">System Controller</p>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-24 pt-6">
        {activeTab === 'stats' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Patients" value="1,284" change="+12%" />
              <StatCard label="Doctors" value="24" change="+2" />
              <StatCard label="Sales" value="$4.2k" change="+8%" />
              <StatCard label="Reports" value="5" color="text-red-400" />
            </div>
            
            <div className="bg-slate-50 p-6 rounded-[32px] border border-gray-100">
              <h3 className="text-sm font-bold text-gray-700 mb-4">Performance Monitor</h3>
              <div className="h-32 flex items-end justify-between gap-2 px-2">
                {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                  <div key={i} className="flex-1 bg-baby-pink/30 rounded-t-lg transition-all hover:bg-baby-pink" style={{ height: `${h}%` }}></div>
                ))}
              </div>
              <div className="flex justify-between mt-2 px-1 text-[8px] text-gray-400 font-bold">
                <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <div className="bg-slate-50 p-3 rounded-2xl flex items-center gap-2 mb-2">
              <Search size={14} className="text-gray-400" />
              <input type="text" placeholder="Search accounts..." className="bg-transparent text-xs outline-none w-full" />
            </div>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-full bg-baby-pink/10 flex items-center justify-center text-baby-pink font-bold">U</div>
                <div className="flex-1">
                  <p className="text-xs font-bold">User_ID_00{i}</p>
                  <p className="text-[10px] text-gray-400">patient@lumeskin.com</p>
                </div>
                <button className="text-gray-300"><MoreVertical size={16}/></button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'approvals' && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pending Doctor Licenses</h3>
            {[1, 2].map(i => (
              <div key={i} className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100"></div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">Dr. Applicant {i}</p>
                    <p className="text-[10px] text-baby-pink font-bold">Dermatology Board Cert.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => alert('Approved')} className="flex-1 py-2 bg-green-50 text-green-600 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1">
                    <Check size={12}/> APPROVE
                  </button>
                  <button onClick={() => alert('Denied')} className="flex-1 py-2 bg-red-50 text-red-600 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1">
                    <X size={12}/> REJECT
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Product Catalog</h3>
              <button className="text-[10px] font-bold text-baby-pink">+ ADD ITEM</button>
            </div>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm"></div>
                <div className="flex-1">
                  <p className="text-xs font-bold">Lume Product {i}</p>
                  <p className="text-[10px] text-gray-400">In Stock: 42 units</p>
                </div>
                <span className="text-xs font-black text-baby-pink">$24.00</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/90 backdrop-blur-md border-t border-gray-100 flex justify-around items-center pt-3 pb-8 px-4 tab-bar-shadow z-40">
        <TabButton active={activeTab === 'stats'} icon={<BarChart3 size={20}/>} label="Stats" onClick={() => setActiveTab('stats')} />
        <TabButton active={activeTab === 'users'} icon={<Users size={20}/>} label="Users" onClick={() => setActiveTab('users')} />
        <TabButton active={activeTab === 'approvals'} icon={<Shield size={20}/>} label="Verify" onClick={() => setActiveTab('approvals')} />
        <TabButton active={activeTab === 'catalog'} icon={<ShoppingCart size={20}/>} label="Shop" onClick={() => setActiveTab('catalog')} />
      </nav>
    </div>
  );
};

const TabButton = ({ active, icon, label, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-baby-pink scale-110' : 'text-gray-300'}`}>
    {icon}
    <span className="text-[8px] font-bold uppercase tracking-widest">{label}</span>
  </button>
);

const StatCard = ({ label, value, change, color = 'text-gray-800' }: any) => (
  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <div className="flex items-baseline gap-2">
      <span className={`text-xl font-black ${color}`}>{value}</span>
      {change && <span className="text-[8px] text-green-500 font-bold">{change}</span>}
    </div>
  </div>
);

export default AdminDashboard;
