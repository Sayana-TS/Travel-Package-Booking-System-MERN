import React, { useState, useMemo } from 'react';
import AgentLayout from '../../../Shared/layouts/AgentLayout';
import TicketTable from '../Components/TicketTable';
import TicketFilters from '../Components/TicketFilters';
import TicketDetailModal from '../Components/TicketDetailModal'; // Import Detail Modal
import TicketCreateModal from '../Components/TicketCreateModal'; // Import Create Modal

const SupportTicketsPage = () => {
  // --- Data State ---
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
  const [selectedTicket, setSelectedTicket] = useState(null); // When null, detail modal is closed

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
      id: Math.floor(10000 + Math.random() * 90000).toString(), // Random 5-digit ID
      subject: newTicketData.subject,
      related: newTicketData.relatedItem || '-',
      status: 'Open',
      priority: newTicketData.priority,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setTickets([newEntry, ...tickets]); // Prepend new ticket to the list
  };

  return (
    <AgentLayout>
      <main className="flex-1 p-6 md:p-10 animate-[fadeIn_0.4s_ease-out]">
        <div className="mx-auto max-w-7xl">
          
          {/* Page Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                Support Tickets
              </h1>
              <p className="text-slate-500 dark:text-subtext-dark font-medium">Manage and track your assistance requests</p>
            </div>
            {/* Open Create Modal */}
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-primary h-12 px-6 text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">add</span>
              <span>Submit New Ticket</span>
            </button>
          </div>

          {/* Filters Component */}
          <TicketFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />

          {/* Table Component */}
          <TicketTable 
            tickets={filteredTickets} 
            onView={(ticket) => setSelectedTicket(ticket)} // Pass the view handler
          />
          
        </div>
      </main>

      {/* --- Modals --- */}
      
      {/* 1. Create Ticket Modal */}
      <TicketCreateModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTicket} 
      />

      {/* 2. View/Detail Ticket Modal */}
      <TicketDetailModal 
        isOpen={!!selectedTicket} 
        ticket={selectedTicket} 
        onClose={() => setSelectedTicket(null)} 
      />

    </AgentLayout>
  );
};

export default SupportTicketsPage;