import React, { useState, useMemo } from 'react';
import AgentLayout from '../../../Shared/layouts/AgentLayout';
import TicketTable from '../Components/TicketTable';
import TicketFilters from '../Components/TicketFilters';
import TicketDetailModal from '../Components/TicketDetailModal'; 
import TicketCreateModal from '../Components/TicketCreateModal'; 

const SupportTicketsPage = ({ role = 'agent' }) => {
  // --- Data State (Ready for API Integration) ---
  const [tickets, setTickets] = useState([
    { id: '12345', subject: 'Booking Confirmation Error', related: 'Grand Hyatt', status: 'Open', priority: 'High', createdAt: '2023-10-27', updatedAt: '2023-10-27' },
    { id: '12346', subject: 'Payment Gateway Issue', related: 'The Ritz-Carlton', status: 'Pending', priority: 'Urgent', createdAt: '2023-10-26', updatedAt: '2023-10-27' },
    { id: '12347', subject: 'Room Availability Discrepancy', related: 'Luxury Suite Package', status: 'Closed', priority: 'Medium', createdAt: '2023-10-25', updatedAt: '2023-10-26' },
    { id: '12348', subject: 'Website Bug Report', related: '-', status: 'Open', priority: 'Low', createdAt: '2023-10-27', updatedAt: '2023-10-27' },
    { id: '12349', subject: 'Special Request for a Client', related: 'Four Seasons', status: 'Pending', priority: 'High', createdAt: '2023-10-26', updatedAt: '2023-10-27' },
  ]);

  // --- UI States ---
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // --- Modal States ---
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // --- Filtering Logic ---
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            ticket.id.includes(searchQuery);
      const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || ticket.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, searchQuery, statusFilter, priorityFilter]);

  // --- Action Handlers ---
  const handleCreateTicket = (newTicketData) => {
    const newEntry = {
      id: Math.floor(10000 + Math.random() * 90000).toString(),
      subject: newTicketData.subject,
      related: newTicketData.relatedItem || '-',
      status: 'Open',
      priority: newTicketData.priority,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setTickets([newEntry, ...tickets]);
    setIsCreateModalOpen(false); // Close modal after creation
  };

  return (
    <AgentLayout role={role}>
      <main className="flex-1 p-6 md:p-10 animate-[fadeIn_0.4s_ease-out]">
        <div className="mx-auto max-w-7xl">
          
          {/* Dynamic Page Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                Support Tickets
              </h1>
              <p className="text-slate-500 dark:text-subtext-dark font-medium">
                {role === 'admin' 
                  ? "Monitor and resolve system-wide support requests from agents" 
                  : "Manage and track your assistance requests"}
              </p>
            </div>
            
            {/* Create Button (Visible to both, but labeled contextually) */}
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-primary h-12 px-6 text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">add</span>
              <span>{role === 'admin' ? "New Internal Ticket" : "Submit New Ticket"}</span>
            </button>
          </div>

          {/* Shared Filters Component */}
          <TicketFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />

          {/* Shared Table Component */}
          <TicketTable 
            tickets={filteredTickets} 
            onView={(ticket) => setSelectedTicket(ticket)} 
          />
          
        </div>
      </main>

      {/* --- Modals --- */}
      
      <TicketCreateModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTicket} 
        isAdmin={role === 'admin'}
      />

      <TicketDetailModal 
        isOpen={!!selectedTicket} 
        ticket={selectedTicket} 
        onClose={() => setSelectedTicket(null)} 
        isAdmin={role === 'admin'} // Pass role to modal to enable admin-only actions like "Close Ticket"
      />

    </AgentLayout>
  );
};

export default SupportTicketsPage;