
import React, { useState } from 'react';
import { User, Appointment } from '../types';
import { Calendar, UserPlus, Bell, LogOut, Clock, Plus, X, Search, Phone } from 'lucide-react';

interface StaffProps {
  user: User;
  appointments: Appointment[];
  onLogout: () => void;
  onAddAppointment: (a: Appointment) => void;
  onUpdateAppointment: (id: string, status: Appointment['status']) => void;
}

const StaffDashboard: React.FC<StaffProps> = ({ user, appointments, onLogout, onAddAppointment, onUpdateAppointment }) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'reminders'>('schedule');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleCancel = (id: string) => {
    if(window.confirm("Really cancel this appointment?")) {
      onUpdateAppointment(id, 'CANCELLED');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <header className="px-6 pt-12 pb-4 bg-white sticky top-0 z-10">
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-xl font-bold text-gray-800">Staff Portal</h1>
          <button onClick={onLogout} className="text-gray-300"><LogOut size={20}/></button>
        </div>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Clinic Operations</p>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="flex gap-4 mb-8">
           <button 
             onClick={() => setActiveTab('schedule')}
             className={`flex-1 py-3 rounded-2xl text-xs font-bold transition-all ${activeTab === 'schedule' ? 'bg-baby-pink text-white shadow-lg shadow-pink-100' : 'bg-slate-50 text-gray-400'}`}
           >
             Appointments
           </button>
           <button 
             onClick={() => setActiveTab('reminders')}
             className={`flex-1 py-3 rounded-2xl text-xs font-bold transition-all ${activeTab === 'reminders' ? 'bg-baby-pink text-white shadow-lg shadow-pink-100' : 'bg-slate-50 text-gray-400'}`}
           >
             Reminders
           </button>
        </div>

        {activeTab === 'schedule' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Clinic Master List</h3>
              <button onClick={() => setShowAddModal(true)} className="w-8 h-8 bg-baby-pink text-white rounded-full flex items-center justify-center"><Plus size={18}/></button>
            </div>
            
            {appointments.map(appt => (
              <div key={appt.id} className={`p-4 bg-white border border-gray-100 rounded-[24px] shadow-sm relative overflow-hidden ${appt.status === 'CANCELLED' ? 'opacity-40 grayscale' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-bold text-gray-800">{appt.patientName}</p>
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${appt.status === 'CONFIRMED' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                    {appt.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-gray-400 font-medium mb-4">
                  <div className="flex items-center gap-1"><Clock size={12}/> {appt.time}</div>
                  <div className="flex items-center gap-1"><Calendar size={12}/> {appt.date}</div>
                  <div className="text-baby-pink">with {appt.doctorName}</div>
                </div>
                {appt.status !== 'CANCELLED' && (
                  <div className="flex gap-2">
                    <button onClick={() => alert('Confirmed payment')} className="flex-1 py-2 bg-slate-50 text-gray-500 rounded-xl text-[10px] font-bold">PHYSICAL PMT</button>
                    <button onClick={() => handleCancel(appt.id)} className="flex-1 py-2 bg-red-50 text-red-400 rounded-xl text-[10px] font-bold">CANCEL</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reminders' && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500"><Bell size={18}/></div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-700">Send reminder to Patient {i}</p>
                  <p className="text-[10px] text-gray-400 tracking-tight">Visit tomorrow at 10:00 AM</p>
                </div>
                <button onClick={() => alert('SMS Sent')} className="p-2 bg-white rounded-full text-blue-500 shadow-sm border border-blue-50"><Phone size={14}/></button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white w-full rounded-[32px] p-8 shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Clinic Booking</h3>
              <button onClick={() => setShowAddModal(false)}><X size={20} className="text-gray-400"/></button>
            </div>
            <div className="space-y-4">
               <input type="text" placeholder="Patient Name" className="w-full p-4 bg-slate-50 rounded-2xl text-xs outline-none" />
               <select className="w-full p-4 bg-slate-50 rounded-2xl text-xs outline-none">
                  <option>Assign Doctor</option>
                  <option>Dr. Sarah Smith</option>
                  <option>Dr. James Wilson</option>
               </select>
               <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="p-4 bg-slate-50 rounded-2xl text-[10px] outline-none" />
                  <input type="time" className="p-4 bg-slate-50 rounded-2xl text-[10px] outline-none" />
               </div>
               <button 
                 onClick={() => {
                   onAddAppointment({
                     id: Math.random().toString(),
                     patientId: 'new',
                     patientName: 'New Patient',
                     doctorId: 'd1',
                     doctorName: 'Dr. Sarah Smith',
                     date: '2024-06-25',
                     time: '14:00',
                     status: 'CONFIRMED'
                   });
                   setShowAddModal(false);
                 }}
                 className="w-full py-4 bg-baby-pink text-white rounded-2xl font-bold shadow-lg shadow-pink-100 mt-4"
               >
                 Confirm Booking
               </button>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/90 backdrop-blur-md border-t border-gray-100 flex justify-around items-center pt-3 pb-8 px-4 tab-bar-shadow">
        <TabButton active={activeTab === 'schedule'} icon={<Calendar size={20}/>} label="Queue" onClick={() => setActiveTab('schedule')} />
        <TabButton active={activeTab === 'reminders'} icon={<Bell size={20}/>} label="Remind" onClick={() => setActiveTab('reminders')} />
        <TabButton active={false} icon={<UserPlus size={20}/>} label="Intake" onClick={() => alert('Opening Intake form...')} />
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

export default StaffDashboard;
