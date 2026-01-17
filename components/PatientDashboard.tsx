
import React, { useState, useRef } from 'react';
import { User, Product, CartItem, Appointment } from '../types';
import { MOCK_PRODUCTS, MOCK_DOCTORS } from '../constants';
import { analyzeSkin, chatWithAI } from '../geminiService';
import { 
  Camera, ShoppingBag, Calendar, MessageSquare, 
  Home, LogOut, X, Star, ShoppingCart, User as UserIcon,
  ChevronRight, ArrowLeft, Send, CheckCircle, Plus, Heart
} from 'lucide-react';

interface PatientProps {
  user: User;
  cart: CartItem[];
  addToCart: (p: Product) => void;
  removeFromCart: (id: string) => void;
  appointments: Appointment[];
  onLogout: () => void;
  onAddAppointment: (a: Appointment) => void;
}

const PatientDashboard: React.FC<PatientProps> = ({ 
  user, cart, addToCart, removeFromCart, appointments, onLogout, onAddAppointment 
}) => {
  const [view, setView] = useState<'home' | 'ai' | 'shop' | 'booking' | 'chat'>('home');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [showCart, setShowCart] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [bookingDoc, setBookingDoc] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsAnalyzing(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      try {
        const result = await analyzeSkin(base64);
        setAnalysisResult(result);
      } catch (error) {
        alert("AI processing error. Please try again.");
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: msg }]);
    setIsTyping(true);
    try {
      const response = await chatWithAI(msg, chatHistory);
      setChatHistory(prev => [...prev, { role: 'ai', text: response || 'I am currently calibrating. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <div className="flex flex-col h-full bg-white relative">
      <header className="px-6 pt-12 pb-4 flex justify-between items-center bg-white sticky top-0 z-20">
        <div>
          <h1 className="text-2xl font-serif text-pink-500">LumeSkin</h1>
          <p className="text-[10px] text-pink-300 font-black tracking-widest uppercase">The Glow App</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowCart(true)} className="relative p-2 text-pink-400 active:scale-90 transition-transform">
            <ShoppingCart size={22} />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 bg-pink-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </button>
          <button onClick={onLogout} className="text-gray-300 hover:text-pink-500 transition-colors"><LogOut size={20} /></button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-24 pt-2">
        {view === 'home' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="btn-gradient p-6 rounded-[32px] text-white shadow-xl shadow-pink-100">
              <h2 className="text-xl font-black mb-1">Welcome, {user.name.split(' ')[0]}!</h2>
              <p className="text-xs opacity-90 mb-4">You have {appointments.length} upcoming clinical visits.</p>
              <button onClick={() => setView('ai')} className="w-full py-3 bg-white text-pink-500 font-black rounded-2xl shadow-sm hover:scale-[1.02] transition-transform">
                Start Skin Scan
              </button>
            </div>

            <section>
              <h3 className="font-black text-gray-800 mb-4 text-xs uppercase tracking-widest">Core Features</h3>
              <div className="grid grid-cols-2 gap-4">
                <ActionButton icon={<Camera className="text-pink-500" />} label="AI Analyze" color="bg-pink-50" onClick={() => setView('ai')} />
                <ActionButton icon={<Calendar className="text-blue-500" />} label="Book Doctor" color="bg-blue-50" onClick={() => setView('booking')} />
                <ActionButton icon={<ShoppingBag className="text-green-500" />} label="Shop Items" color="bg-green-50" onClick={() => setView('shop')} />
                <ActionButton icon={<MessageSquare className="text-purple-500" />} label="AI Chatbot" color="bg-purple-50" onClick={() => setView('chat')} />
              </div>
            </section>
          </div>
        )}

        {view === 'ai' && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            {!analysisResult ? (
              <div className="text-center py-10">
                <div className="aspect-square w-full max-w-[280px] mx-auto bg-pink-50 rounded-[48px] border-2 border-dashed border-pink-300 flex flex-col items-center justify-center mb-8 shadow-inner">
                  <Camera size={64} className="text-pink-400 mb-4" />
                  <p className="text-[10px] font-black text-pink-500 px-10 uppercase tracking-widest">Place skin area in frame</p>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                <button 
                  disabled={isAnalyzing}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-5 btn-gradient text-white rounded-[24px] font-black shadow-xl shadow-pink-200 disabled:opacity-50 active:scale-95 transition-transform uppercase tracking-widest text-xs"
                >
                  {isAnalyzing ? 'Processing AI...' : 'Upload Image for Analysis'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <button onClick={() => setAnalysisResult(null)} className="flex items-center gap-2 text-pink-400 text-[10px] font-black uppercase tracking-widest"><ArrowLeft size={14}/> Back to Scan</button>
                <div className="bg-white p-6 rounded-[32px] border-2 border-pink-100 shadow-sm">
                  <h3 className="text-2xl font-serif text-gray-800 mb-1">{analysisResult.condition}</h3>
                  <div className={`px-3 py-1 rounded-full inline-block text-[10px] font-black uppercase mb-4 ${analysisResult.severity === 'High' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'}`}>
                    {analysisResult.severity} RISK LEVEL
                  </div>
                  <p className="text-sm text-gray-600 mt-4 mb-6 italic leading-relaxed mb-6 border-l-4 border-pink-500 pl-4">{analysisResult.summary}</p>
                  <div className="space-y-3">
                    {analysisResult.recommendations.map((r: string, i: number) => (
                      <div key={i} className="flex gap-3 text-xs text-gray-700 bg-pink-50/50 p-4 rounded-2xl border border-pink-100/50">
                        <CheckCircle size={14} className="text-pink-500 shrink-0" />
                        {r}
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={() => setView('booking')} className="w-full py-5 bg-gray-900 text-white rounded-[24px] font-black shadow-lg shadow-gray-200 uppercase text-xs tracking-widest">Connect with Professional</button>
              </div>
            )}
          </div>
        )}

        {view === 'shop' && (
          <div className="animate-in slide-in-from-right duration-300 space-y-6">
            <div className="flex justify-between items-center">
               <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Medical Catalog</h3>
               <button onClick={() => setShowCart(true)} className="text-[10px] font-black text-pink-500 underline">VIEW CART ({cart.length})</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {MOCK_PRODUCTS.map(p => (
                <div key={p.id} className="bg-white rounded-[32px] border border-pink-50 overflow-hidden shadow-sm flex flex-col group">
                  <div className="aspect-square relative" onClick={() => setSelectedProduct(p)}>
                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(p); }} 
                      className="absolute bottom-3 right-3 w-10 h-10 bg-white/95 backdrop-blur rounded-2xl flex items-center justify-center text-pink-500 shadow-lg active:scale-90 transition-transform"
                    >
                      <Plus size={20} strokeWidth={3} />
                    </button>
                  </div>
                  <div className="p-4" onClick={() => setSelectedProduct(p)}>
                    <h4 className="text-xs font-bold text-gray-800 truncate">{p.name}</h4>
                    <p className="text-[10px] text-gray-400 mb-2">{p.category}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-black text-pink-500">${p.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'booking' && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            {!bookingDoc ? (
              <div className="space-y-4">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Select Clinician</p>
                {MOCK_DOCTORS.map(doc => (
                  <div key={doc.id} onClick={() => setBookingDoc(doc)} className="bg-white p-5 rounded-[28px] border-2 border-pink-50 shadow-sm flex items-center gap-4 active:scale-95 transition-transform">
                    <img src={doc.image} className="w-16 h-16 rounded-2xl object-cover shadow-md border-2 border-pink-100" />
                    <div className="flex-1">
                      <h4 className="font-black text-gray-800">{doc.name}</h4>
                      <p className="text-[10px] text-pink-500 font-black uppercase tracking-tighter">{doc.specialty}</p>
                    </div>
                    <ChevronRight size={18} className="text-pink-200" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <button onClick={() => setBookingDoc(null)} className="flex items-center gap-2 text-pink-400 text-[10px] font-black uppercase tracking-widest"><ArrowLeft size={14}/> Specialist List</button>
                <div className="text-center p-6 bg-pink-50 rounded-[40px] border border-pink-100">
                  <img src={bookingDoc.image} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-xl object-cover" />
                  <h3 className="text-xl font-black text-gray-800">{bookingDoc.name}</h3>
                  <p className="text-[10px] text-pink-500 font-black uppercase mb-4 tracking-widest">{bookingDoc.specialty}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {bookingDoc.availability.map((t: string) => (
                    <button 
                      key={t}
                      onClick={() => {
                        onAddAppointment({
                          id: Math.random().toString(),
                          patientId: user.id,
                          patientName: user.name,
                          doctorId: bookingDoc.id,
                          doctorName: bookingDoc.name,
                          date: 'June 25',
                          time: t,
                          status: 'CONFIRMED'
                        });
                        alert(`Booked with ${bookingDoc.name} at ${t}`);
                        setView('home');
                        setBookingDoc(null);
                      }}
                      className="py-4 rounded-2xl bg-white border-2 border-pink-50 text-[10px] font-black text-pink-500 active:bg-pink-500 active:text-white transition-all shadow-sm"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {view === 'chat' && (
          <div className="h-full flex flex-col animate-in slide-in-from-right duration-300">
             <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-1">
                {chatHistory.map((c, i) => (
                  <div key={i} className={`flex ${c.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-5 py-3 rounded-[24px] text-xs leading-relaxed ${c.role === 'user' ? 'btn-gradient text-white rounded-br-none shadow-md' : 'bg-slate-50 text-gray-700 rounded-bl-none border border-gray-100 shadow-sm'}`}>
                      {c.text}
                    </div>
                  </div>
                ))}
                {isTyping && <div className="text-[10px] text-pink-500 animate-pulse font-black uppercase tracking-tighter ml-2">Lume is typing...</div>}
             </div>
             <div className="flex gap-2 bg-white pt-4 pb-2 sticky bottom-0">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your question..."
                  className="flex-1 bg-slate-50 px-6 py-4 rounded-full text-xs outline-none border border-gray-100 focus:border-pink-300 transition-all font-medium"
                />
                <button onClick={handleSendMessage} className="w-14 h-14 btn-gradient text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                  <Send size={20} />
                </button>
             </div>
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/95 backdrop-blur-md border-t border-pink-50 flex justify-around items-center pt-3 pb-8 px-4 tab-bar-shadow z-40">
        <TabButton active={view === 'home'} icon={<Home size={22}/>} label="Home" onClick={() => setView('home')} />
        <TabButton active={view === 'ai'} icon={<Camera size={22}/>} label="AI Scan" onClick={() => setView('ai')} />
        <TabButton active={view === 'shop'} icon={<ShoppingBag size={22}/>} label="Boutique" onClick={() => setView('shop')} />
        <TabButton active={view === 'booking'} icon={<Calendar size={22}/>} label="Booking" onClick={() => setView('booking')} />
        <TabButton active={view === 'chat'} icon={<MessageSquare size={22}/>} label="AI Chat" onClick={() => setView('chat')} />
      </nav>

      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end">
          <div className="w-full bg-white rounded-t-[40px] p-8 max-h-[85vh] flex flex-col animate-slide-up shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">Your Cart</h3>
              <button onClick={() => setShowCart(false)} className="text-pink-500 bg-pink-50 p-2 rounded-full"><X size={20}/></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.product.id} className="flex gap-4 items-center bg-pink-50/30 p-4 rounded-3xl border border-pink-100">
                  <img src={item.product.image} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                  <div className="flex-1">
                    <p className="text-xs font-black text-gray-800">{item.product.name}</p>
                    <p className="text-[10px] text-pink-500 font-black">${item.product.price} x {item.quantity}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-pink-300 hover:text-pink-600 transition-colors"><X size={16} /></button>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center font-black text-lg py-4 border-t border-gray-100">
              <span className="text-gray-400 uppercase text-xs tracking-widest">Total Amount</span>
              <span className="text-pink-500">${cartTotal}</span>
            </div>
            <button onClick={() => { alert('Success!'); setShowCart(false); }} className="w-full py-5 btn-gradient text-white rounded-[24px] font-black shadow-xl shadow-pink-200 uppercase text-xs tracking-widest">
              Confirm & Checkout
            </button>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end">
          <div className="w-full bg-white rounded-t-[40px] p-8 max-h-[90vh] flex flex-col animate-slide-up">
            <button onClick={() => setSelectedProduct(null)} className="self-end text-pink-500 bg-pink-50 p-2 rounded-full mb-2"><X size={20}/></button>
            <img src={selectedProduct.image} className="w-full h-64 object-cover rounded-[32px] mb-6 shadow-xl border-4 border-pink-50" />
            <h3 className="text-2xl font-serif text-gray-800">{selectedProduct.name}</h3>
            <p className="text-sm font-black text-pink-500 mb-4 uppercase tracking-tighter">${selectedProduct.price}</p>
            <p className="text-xs text-gray-500 leading-relaxed mb-6">{selectedProduct.description}</p>
            <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="w-full py-5 btn-gradient text-white rounded-[24px] font-black shadow-xl shadow-pink-200 uppercase text-xs tracking-widest">Add To My Regimen</button>
          </div>
        </div>
      )}
    </div>
  );
};

const TabButton = ({ active, icon, label, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-pink-500 scale-110' : 'text-gray-300'}`}>
    {icon}
    <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

const ActionButton = ({ icon, label, color, onClick }: any) => (
  <button onClick={onClick} className={`${color} p-6 rounded-[32px] flex flex-col items-center justify-center gap-2 border border-black/5 active:scale-95 transition-transform shadow-md border-b-4 border-black/10`}>
    <div className="opacity-90">{icon}</div>
    <span className="text-[10px] font-black text-gray-700 uppercase tracking-tighter">{label}</span>
  </button>
);

export default PatientDashboard;
