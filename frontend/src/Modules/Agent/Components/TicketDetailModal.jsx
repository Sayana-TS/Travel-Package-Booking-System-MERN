import React, { useState, useEffect, useRef } from 'react';

const TicketDetailModal = ({ isOpen, onClose, ticket }) => {
  const [reply, setReply] = useState('');
  const [messages, setMessages] = useState([]);
  const [isClosing, setIsClosing] = useState(false);
  const scrollRef = useRef(null);

  // Initialize messages and handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Mock initial load - in production, fetch from API using ticket.id
      setMessages([
        {
          id: 1,
          sender: "Alex Johnson (You)",
          role: "agent",
          time: "Oct 27, 2023, 10:30 AM",
          message: "Hello, I've created a ticket regarding a booking confirmation issue for a client.",
          avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=0ea5e9&color=fff"
        },
        {
          id: 2,
          sender: "Admin Support",
          role: "admin",
          time: "Oct 27, 2023, 11:05 AM",
          message: "Hi Alex, thanks for reaching out. We are looking into this and will get back to you shortly. Can you please provide the customer's booking ID?",
          avatar: "https://ui-avatars.com/api/?name=Admin+Support&background=64748b&color=fff"
        }
      ]);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, ticket]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isOpen || !ticket) return null;

  const handleSendReply = () => {
    if (!reply.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      sender: "Alex Johnson (You)",
      role: "agent",
      time: new Date().toLocaleString([], { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      message: reply,
      avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=0ea5e9&color=fff"
    };

    setMessages([...messages, newMessage]);
    setReply('');
  };

  const handleCloseTicket = () => {
    // Logic to update ticket status to "Closed" would go here
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-2 sm:p-4 animate-[fadeIn_0.2s_ease-out]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] bg-white dark:bg-slate-900 shadow-2xl rounded-3xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex size-12 rounded-2xl bg-primary/10 text-primary items-center justify-center">
              <span className="material-symbols-outlined text-2xl">confirmation_number</span>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                Ticket Details
                <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg uppercase tracking-wider">#{ticket.id}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">View and respond to support conversation</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-400 hover:text-slate-600"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-5 sm:p-8 scrollbar-hide space-y-8"
        >
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-5 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-800/50">
            <div className="col-span-2 lg:col-span-1">
              <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1">Subject</h3>
              <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-tight">{ticket.subject}</p>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1">Entity</h3>
              <p className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{ticket.related}</p>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1">Status</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className={`size-2 rounded-full animate-pulse ${ticket.status === 'Open' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{ticket.status}</span>
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1">Priority</h3>
              <div className="mt-1">
                <span className="px-2.5 py-1 text-[10px] font-black text-white rounded-lg bg-primary uppercase">
                  {ticket.priority}
                </span>
              </div>
            </div>
          </div>

          {/* Issue Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <span className="material-symbols-outlined text-lg">subject</span>
              <h3 className="text-sm font-black uppercase tracking-wider">Description</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed bg-slate-50/50 dark:bg-slate-800/20 p-4 rounded-2xl">
              A customer is reporting that they are not receiving a booking confirmation email after completing their payment. 
              They have checked their spam folder and have not found it. They are requesting assistance.
            </p>
          </div>

          {/* Messages Section */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between mb-2">
               <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">forum</span>
                Conversation History
              </h3>
              <span className="text-[10px] font-bold text-slate-400 px-2 py-1 bg-slate-50 dark:bg-slate-800 rounded-md">
                {messages.length} Messages
              </span>
            </div>
            
            <div className="space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 sm:gap-4 ${msg.role === 'admin' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div 
                    className="size-8 sm:size-10 rounded-xl bg-cover bg-center ring-2 ring-white dark:ring-slate-800 flex-shrink-0 shadow-sm" 
                    style={{ backgroundImage: `url("${msg.avatar}")` }}
                  />
                  <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${msg.role === 'admin' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-4 rounded-2xl shadow-sm text-sm sm:text-base ${
                      msg.role === 'admin' 
                        ? 'bg-slate-800 dark:bg-slate-700 text-white rounded-tr-none' 
                        : 'bg-primary/5 dark:bg-primary/10 text-slate-800 dark:text-slate-200 border border-primary/10 rounded-tl-none'
                    }`}>
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 px-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{msg.sender}</span>
                      <span className="size-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{msg.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Area */}
        <div className="p-5 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 sticky bottom-0">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-2xl border border-slate-100 dark:border-slate-800 transition-within:border-primary/30">
            <textarea 
              className="w-full p-3 bg-transparent text-slate-900 dark:text-white text-sm sm:text-base outline-none resize-none" 
              placeholder="Write your message here..." 
              rows="2"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendReply();
                }
              }}
            />
            <div className="flex items-center justify-between p-2 border-t border-slate-200/50 dark:border-slate-700/50">
              <button className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-primary transition-colors px-2 py-1">
                <span className="material-symbols-outlined text-lg">attach_file</span>
                <span className="hidden sm:inline">Add Attachment</span>
              </button>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleCloseTicket}
                  className="px-4 py-2 text-[10px] font-black uppercase text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                >
                  Close Ticket
                </button>
                <button 
                  onClick={handleSendReply}
                  disabled={!reply.trim()}
                  className="px-5 py-2 text-[10px] font-black uppercase text-white bg-primary rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/40 disabled:opacity-50 disabled:shadow-none hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2"
                >
                  <span>Send</span>
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailModal;