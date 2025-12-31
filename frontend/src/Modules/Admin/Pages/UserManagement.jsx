import React, { useState, useMemo } from 'react';
import AgentLayout from '../../../Shared/layouts/AgentLayout';
import UserDetailsModal from '../Components/UserDetailModal';

const UserManagement = () => {
    const [activeTab, setActiveTab] = useState('customers');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Updated Dummy Data with history and package details
    const [users, setUsers] = useState({
        customers: [
            { 
                id: '#1024', 
                name: 'John Doe', 
                email: 'john.doe@example.com', 
                status: 'Active', 
                role: 'User',
                totalBookings: 5, 
                upcoming: 1,
                history: ['Tropical Escape V1', 'Mountain Retreat Deluxe'],
                phone: '+1-555-010-9988',
                regDate: '2023-05-12'
            },
            { 
                id: '#1025', 
                name: 'Jane Smith', 
                email: 'jane.smith@example.com', 
                status: 'Inactive', 
                role: 'User',
                totalBookings: 2, 
                upcoming: 0,
                history: ['Winter Wonderland Solo'],
                phone: '+1-555-010-7722',
                regDate: '2023-08-20'
            },
            { 
                id: '#1026', 
                name: 'Sam Wilson', 
                email: 'sam.wilson@example.com', 
                status: 'Pending', 
                role: 'User',
                totalBookings: 0, 
                upcoming: 0,
                history: [],
                phone: '+1-555-010-4433',
                regDate: '2024-01-05'
            },
        ],
        agents: [
            { 
                id: '#A042', 
                name: 'Alex Johnson', 
                email: 'alex.j@agent.com', 
                status: 'Active', 
                role: 'Agent',
                hotelCount: 2, 
                activePackages: 3,
                managedHotels: ['Grand Plaza Hotel', 'Ocean View Suites'],
                history: ['Summer Beach Bliss', 'Urban Night Stay', 'Family Fun 4D3N'],
                phone: '+1-222-555-0199',
                regDate: '2022-11-10'
            },
            { 
                id: '#A043', 
                name: 'Maria Garcia', 
                email: 'maria.g@agent.com', 
                status: 'Inactive', 
                role: 'Agent',
                hotelCount: 1, 
                activePackages: 0,
                managedHotels: ['The Ritz Carlton'],
                history: ['Luxury Suite Promo'],
                phone: '+1-222-555-0188',
                regDate: '2023-02-14'
            },
            { 
                id: '#A044', 
                name: 'David Chen', 
                email: 'david.c@agent.com', 
                status: 'Pending Approval', 
                role: 'Agent',
                hotelCount: 0, 
                activePackages: 0,
                managedHotels: [],
                history: ['Budget Backpacker V1'],
                phone: '+1-222-555-0177',
                regDate: '2023-12-28'
            },
            { 
                id: '#A045', 
                name: 'Sarah Miller', 
                email: 'sarah.m@agent.com', 
                status: 'Pending Approval', 
                role: 'Agent',
                hotelCount: 0, 
                activePackages: 0,
                managedHotels: [],
                history: [],
                phone: '+1-222-555-0166',
                regDate: '2024-01-02'
            },
        ]
    });

    // Derived State for red badge
    const pendingAgentsCount = useMemo(() =>
        users.agents.filter(a => a.status === 'Pending Approval').length,
        [users.agents]);

    // Action Handlers
    const handleDelete = (type, id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(prev => ({
                ...prev,
                [type]: prev[type].filter(user => user.id !== id)
            }));
        }
    };

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleAgentStatus = (id, newStatus) => {
        setUsers(prev => ({
            ...prev,
            agents: prev.agents.map(agent =>
                agent.id === id ? { ...agent, status: newStatus } : agent
            )
        }));
    };

    // Filter Logic
    const filteredData = useMemo(() => {
        let data = users[activeTab];

        if (statusFilter !== 'All') {
            data = data.filter(user => user.status === statusFilter);
        }

        if (!searchQuery) return data;

        return data.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [activeTab, searchQuery, statusFilter, users]);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Active': return 'bg-emerald-500/10 text-emerald-500';
            case 'Pending Approval':
            case 'Pending': return 'bg-amber-500/10 text-amber-500';
            case 'Inactive': return 'bg-rose-500/10 text-rose-500';
            default: return 'bg-slate-500/10 text-slate-500';
        }
    };

    return (
        <AgentLayout role="admin">
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight">User Management</h1>
                        <p className="text-slate-500 text-sm mt-1">Manage system access for customers and travel agents.</p>
                    </div>
                </div>

                {/* Tab System */}
                <div className="border-b border-white/5 flex gap-8 px-2">
                    <button
                        onClick={() => { setActiveTab('customers'); setStatusFilter('All'); }}
                        className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'customers' ? 'text-primary' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        Customers
                        {activeTab === 'customers' && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full" />}
                    </button>
                    <button
                        onClick={() => { setActiveTab('agents'); setStatusFilter('All'); }}
                        className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 ${activeTab === 'agents' ? 'text-primary' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        Agents
                        {pendingAgentsCount > 0 && (
                            <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-md animate-pulse">
                                {pendingAgentsCount}
                            </span>
                        )}
                        {activeTab === 'agents' && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full" />}
                    </button>
                </div>

                {/* Table/Content Card */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">

                    {/* Table Filters */}
                    <div className="p-4 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/[0.01]">
                        <div className="relative w-full sm:w-96">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">search</span>
                            <input
                                type="text"
                                placeholder={`Search by name, email or ID...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-slate-600"
                            />
                        </div>

                        <div className="relative flex gap-2 w-full sm:w-auto">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-slate-300 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all"
                            >
                                Status: {statusFilter}
                                <span className={`material-symbols-outlined text-lg transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}>expand_more</span>
                            </button>

                            {isFilterOpen && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-[#1a232e] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                                    {['All', 'Active', 'Inactive', activeTab === 'agents' ? 'Pending Approval' : 'Pending'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => { setStatusFilter(status); setIsFilterOpen(false); }}
                                            className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 hover:bg-white/5 hover:text-primary transition-colors"
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Dynamic Table */}
                    <div className="overflow-x-auto scrollbar-hide">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/[0.03] border-b border-white/5">
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                                        {activeTab === 'customers' ? 'User ID' : 'Agent ID'}
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Name</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Email</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                                        {activeTab === 'customers' ? 'Bookings' : 'Properties'}
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredData.length > 0 ? (
                                    filteredData.map((user) => (
                                        <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-4 font-mono text-xs text-slate-500">{user.id}</td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{user.name}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-400">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 text-[9px] font-black uppercase rounded-full tracking-wider ${getStatusStyle(user.status)}`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-bold text-primary">
                                                {activeTab === 'customers' ? `Bookings (${user.totalBookings})` : `Hotels (${user.hotelCount})`}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    {user.status === 'Pending Approval' ? (
                                                        <>
                                                            <button
                                                                onClick={() => handleAgentStatus(user.id, 'Active')}
                                                                className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-colors" title="Approve"
                                                            >
                                                                <span className="material-symbols-outlined">check_circle</span>
                                                            </button>
                                                            <button
                                                                onClick={() => handleAgentStatus(user.id, 'Inactive')}
                                                                className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors" title="Reject"
                                                            >
                                                                <span className="material-symbols-outlined">cancel</span>
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleViewUser(user)}
                                                                className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                            >
                                                                <span className="material-symbols-outlined text-xl">visibility</span>
                                                            </button>
                                                            {/* <button className="p-2 text-slate-500 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                                                                <span className="material-symbols-outlined text-xl">edit</span>
                                                            </button> */}
                                                        </>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(activeTab, user.id)}
                                                        className="p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-500/5 rounded-lg transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-xl">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-20 text-center">
                                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">No users found matching your criteria</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/[0.01] border-t border-white/5">
                        <p className="text-xs text-slate-500 font-medium">
                            Showing <span className="text-white">{filteredData.length}</span> of <span className="text-white">{users[activeTab].length}</span> Entries
                        </p>
                        <div className="flex gap-1">
                            <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-xs font-bold hover:bg-white/10 transition-all disabled:opacity-50">Previous</button>
                            <button className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold">1</button>
                            <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-xs font-bold hover:bg-white/10 transition-all">Next</button>
                        </div>
                    </div>
                </div>
                
                <UserDetailsModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    user={selectedUser}
                />
            </div>
        </AgentLayout>
    );
};

export default UserManagement;