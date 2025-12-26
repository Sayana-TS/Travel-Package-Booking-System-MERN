import React, { useState } from 'react'; // 1. Import useState
import TicketDetailModal from './TicketDetailModal'; // Adjust the path as needed

const TicketTable = ({ tickets }) => {
  // 2. State to manage modal visibility and data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // 3. Handlers to open and close
  const handleOpenModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return 'bg-amber-500';
      case 'Pending': return 'bg-blue-500';
      case 'Closed': return 'bg-emerald-500';
      default: return 'bg-slate-400';
    }
  };

  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'Low': return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
      case 'Medium': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'High': return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
      case 'Urgent': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  if (tickets.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 opacity-30">inbox</span>
        <p className="text-slate-500 font-medium text-lg">No tickets found matching your filters.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 font-bold">Ticket ID</th>
                <th className="px-6 py-4 font-bold">Subject</th>
                <th className="px-6 py-4 font-bold">Related Entity</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Priority</th>
                <th className="px-6 py-4 font-bold">Created</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-primary">#{ticket.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{ticket.subject}</td>
                  <td className="px-6 py-4 text-slate-500">{ticket.related}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(ticket.status)}`}></div>
                      <span className="font-medium text-slate-700 dark:text-slate-300">{ticket.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${getPriorityClass(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{ticket.createdAt}</td>
                  <td className="px-6 py-4 text-right">
                    {/* 4. Added onClick to the visibility button */}
                    <button 
                      onClick={() => handleOpenModal(ticket)}
                      className="p-2 rounded-lg text-slate-400 hover:bg-primary/10 hover:text-primary transition-all"
                    >
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. The Modal Component rendered outside the table */}
      <TicketDetailModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        ticket={selectedTicket} 
      />
    </>
  );
};

export default TicketTable;