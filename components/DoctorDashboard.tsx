
import React, { useState } from 'react';
import { User, Appointment } from '../types';
import { Users, Calendar, Clipboard, LogOut, Search, Clock, ChevronRight, Settings, Plus, Star, Bell } from 'lucide-react';

interface DoctorProps {
  user: User;
  appointments: Appointment[];
  onLogout: () => void;
  onUpdateAppointment: (id: string, status: Appointment['status']) => void;
}

const DoctorDashboard: React.FC<DoctorProps> = ({ user, appointments, onLogout, onUpdateAppointment }) => {
  const [view, setView] = useState<'schedule' | 'patients' | 'records' | 'settings'>('schedule');

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="px-6 pt-12 pb-4 bg-white sticky top-0 z-10 border-b border-pink-50">
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-xl font-black text-gray-800">Dr. {user.name.split(' ')[0]}</h1>
          <div className="flex gap-3">
             <button className="text-gray-300"><Bell size={20}/></button>
             <button onClick={onLogout} className="text-gray-300 hover:text-pink-500"><LogOut size={20}/></button>
          </div>
        </div>
        <p className="text-[10px] text-pink-500 font-black uppercase tracking-widest">Clinician Environment</p>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-24 pt-4">
        {view === 'schedule' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Today's Visits</h3>
              <button onClick={() => alert('Opening availability controls...')} className="text-[10px] font-black text-pink-500 bg-pink-50 px-4 py-2 rounded-full uppercase tracking-tighter shadow-sm border border-pink-100">Manage Schedule</button>
            </div>
            <div className="space-y-4">
              {appointments.filter(a => a.status !== 'CANCELLED').map(appt => (
                <div key={appt.id} className="bg-white p-5 rounded-[28px] border-2 border-pink-50 flex items-center gap-4 shadow-sm active:scale-[0.98] transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-pink-500 text-white flex flex-col items-center justify-center shadow-lg shadow-pink-100">
                    <span className="text-[8px] font-black uppercase tracking-tighter">TIME</span>
                    <span className="text-sm font-black">{appt.time}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black text-gray-800">{appt.patientName}</p>
                    <p className="text-[10px] text-pink-400 font-bold">Standard Skin Evaluation</p>
                  </div>
                  <button onClick={() => alert('Starting Clinical Session...')} className="px-5 py-2 btn-gradient rounded-xl text-[10px] font-black text-white shadow-md">START</button>
                </div>
              ))}
              {appointments.filter(a => a.status !== 'CANCELLED').length === 0 && (
                <div className="text-center py-20 bg-slate-50 rounded-[40px] border border-dashed border-gray-200">
                    <Calendar size={48} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-xs text-gray-400 font-bold italic">No sessions confirmed for today.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'patients' && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <div className="bg-pink-50/50 border border-pink-100 p-4 rounded-2xl flex items-center gap-3 mb-6">
              <Search size={16} className="text-pink-400" />
              <input type="text" placeholder="Search my database..." className="bg-transparent text-xs flex-1 outline-none font-medium placeholder-pink-300" />
            </div>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-[28px] shadow-sm">
                 <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 font-black">P</div>
                 <div className="flex-1">
                    <p className="text-sm font-black text-gray-800">Case ID #C99{i}</p>
                    <p className="text-[10px] text-gray-400 font-bold">Diagnosed: Psoriasis Type I</p>
                 </div>
                 <button onClick={() => setView('records')} className="text-pink-200 hover:text-pink-500 transition-colors"><ChevronRight size={20} /></button>
              </div>
            ))}
          </div>
        )}

        {view === 'records' && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Patient Vault</h3>
            {[1, 2].map(i => (
              <div key={i} className="bg-white p-6 rounded-[32px] border-2 border-pink-50 shadow-md">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-xs font-black text-pink-500 uppercase tracking-widest">Case L00{i}</p>
                    <span className="text-[10px] text-gray-300 font-bold">Updated Yesterday</span>
                </div>
                <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-2xl">
                  <div className="flex justify-between text-[11px]"><span className="text-gray-400 font-bold">Diagnosis:</span> <span className="text-gray-800 font-black">Eczema Flare-up</span></div>
                  <div className="flex justify-between text-[11px]"><span className="text-gray-400 font-bold">Severity:</span> <span className="text-orange-500 font-black uppercase">Moderate</span></div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => alert('Sending product recommendation p1 to patient...')} className="flex-1 py-3 bg-white text-pink-500 border border-pink-100 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">Send Products</button>
                  <button onClick={() => alert('Updating Case Record...')} className="flex-1 py-3 btn-gradient text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-pink-100">Update Record</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'settings' && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
             <div className="btn-gradient p-8 rounded-[40px] text-white shadow-xl shadow-pink-100 text-center">
               <h4 className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">Clinician Rating</h4>
               <div className="flex justify-center items-center gap-1 text-white mb-2">
                 <Star fill="currentColor" size={24}/><Star fill="currentColor" size={24}/><Star fill="currentColor" size={24}/><Star fill="currentColor" size={24}/><Star fill="currentColor" size={24}/>
               </div>
               <span className="text-4xl font-black">5.0</span>
               <p className="text-[10px] opacity-70 mt-4">Calculated from 250+ Sessions</p>
             </div>
             <div className="space-y-1">
               <button onClick={() => alert('Account Settings')} className="w-full flex justify-between items-center p-5 bg-white border-b border-gray-50 text-xs font-black text-gray-700"><span>Privacy & Security</span> <ChevronRight size={14}/></button>
               <button onClick={() => alert('Notification Settings')} className="w-full flex justify-between items-center p-5 bg-white border-b border-gray-50 text-xs font-black text-gray-700"><span>App Notifications</span> <ChevronRight size={14}/></button>
               <button onClick={() => alert('Bio Settings')} className="w-full flex justify-between items-center p-5 bg-white border-b border-gray-50 text-xs font-black text-gray-700"><span>Professional Profile</span> <ChevronRight size={14}/></button>
             </div>
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/95 backdrop-blur-md border-t border-pink-50 flex justify-around items-center pt-3 pb-8 px-4 tab-bar-shadow z-40">
        <TabButton active={view === 'schedule'} icon={<Calendar size={20}/>} label="Schedule" onClick={() => setView('schedule')} />
        <TabButton active={view === 'patients'} icon={<Users size={20}/>} label="Patients" onClick={() => setView('patients')} />
        <TabButton active={view === 'records'} icon={<Clipboard size={20}/>} label="History" onClick={() => setView('records')} />
        <TabButton active={view === 'settings'} icon={<Settings size={20}/>} label="Configs" onClick={() => setView('settings')} />
      </nav>
    </div>
  );
};

const TabButton = ({ active, icon, label, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-pink-500 scale-110' : 'text-gray-300'}`}>
    {icon}
    <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default DoctorDashboard;
