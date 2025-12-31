import React, { useState, useMemo } from 'react';
import AgentLayout from '../../../Shared/layouts/AgentLayout';
import PackageStats from '../../Agent/Components/PackageStats';
import ViewPackageModal from '../../Agent/Components/ViewPackageModal'; // Adjust path if necessary

const PackageManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [agentFilter, setAgentFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortBy, setSortBy] = useState('Date');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const [packages, setPackages] = useState([
        { 
            id: 1, 
            title: 'Maldives Luxury Escape', 
            agentName: 'John Doe', 
            date: '2023-10-27', 
            status: 'Pending', 
            isFeatured: false, 
            image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=500' 
        },
        { 
            id: 2, 
            title: 'Parisian Romance', 
            agentName: 'Jane Smith', 
            date: '2023-10-26', 
            status: 'Approved', 
            isFeatured: false, 
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=500' 
        },
        { 
            id: 3, 
            title: 'Tokyo Adventure', 
            agentName: 'Emily White', 
            date: '2023-10-25', 
            status: 'Rejected', 
            isFeatured: false, 
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=500' 
        },
        { 
            id: 4, 
            title: 'Roman Holiday', 
            agentName: 'Michael Brown', 
            date: '2023-10-24', 
            status: 'Pending', 
            isFeatured: true, 
            image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=500' 
        }
    ]);

    // --- Action Handlers ---
    
    const handleStatusUpdate = (id, newStatus) => {
        setPackages(prev => prev.map(pkg => 
            pkg.id === id ? { ...pkg, status: newStatus } : pkg
        ));
    };

    const toggleFeatured = (id) => {
        setPackages(prev => prev.map(pkg => 
            pkg.id === id ? { ...pkg, isFeatured: !pkg.isFeatured } : pkg
        ));
    };

    // Modal-specific handlers
    const openPackageModal = (pkg) => {
        setSelectedPackage(pkg);
        setIsModalOpen(true);
    };

    const closePackageModal = () => {
        setIsModalOpen(false);
        setSelectedPackage(null);
    };

    // --- Filter Logic ---

    const statsConfig = useMemo(() => [
        { label: 'Total Packages', value: packages.length.toLocaleString(), color: 'text-white' },
        { label: 'Pending Approval', value: packages.filter(p => p.status === 'Pending').length, color: 'text-amber-500' },
        { label: 'Approved Packages', value: packages.filter(p => p.status === 'Approved').length, color: 'text-emerald-500' },
        { label: 'Rejected', value: packages.filter(p => p.status === 'Rejected').length, color: 'text-rose-500' },
    ], [packages]);

    const filteredPackages = useMemo(() => {
        return packages
            .filter(pkg => {
                const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesAgent = agentFilter === 'All' || pkg.agentName === agentFilter;
                const matchesStatus = statusFilter === 'All' || pkg.status === statusFilter;
                return matchesSearch && matchesAgent && matchesStatus;
            })
            .sort((a, b) => {
                if (sortBy === 'Name') return a.title.localeCompare(b.title);
                if (sortBy === 'Status') return a.status.localeCompare(b.status);
                return new Date(b.date) - new Date(a.date);
            });
    }, [packages, searchQuery, agentFilter, statusFilter, sortBy]);

    return (
        <AgentLayout role="admin">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight">Package Management</h1>
                        <p className="text-slate-500 text-sm mt-1">Review and curate travel packages from your agents.</p>
                    </div>
                </div>

                <PackageStats config={statsConfig} />

                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm">
                    <div className="relative flex-1 min-w-[280px]">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">search</span>
                        <input 
                            type="text"
                            placeholder="Search by Package Name..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3">
                        <select 
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-300 focus:outline-none focus:border-primary/50"
                            onChange={(e) => setAgentFilter(e.target.value)}
                        >
                            <option value="All">All Agents</option>
                            {[...new Set(packages.map(p => p.agentName))].map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>

                        <select 
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-300 focus:outline-none focus:border-primary/50"
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>

                        <select 
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-300 focus:outline-none focus:border-primary/50"
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="Date">Sort by Date</option>
                            <option value="Name">Sort by Name</option>
                            <option value="Status">Sort by Status</option>
                        </select>
                    </div>
                </div>

                {/* Package Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPackages.map((pkg) => (
                        <div 
                            key={pkg.id} 
                            className={`group flex flex-col bg-white/[0.02] rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 ${pkg.isFeatured ? 'border-amber-500/50 shadow-lg shadow-amber-500/10' : 'border-white/5'}`}
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider backdrop-blur-md ${
                                    pkg.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-500' : 
                                    pkg.status === 'Rejected' ? 'bg-rose-500/20 text-rose-500' : 
                                    'bg-amber-500/20 text-amber-500'
                                }`}>
                                    {pkg.status}
                                </div>

                                {pkg.isFeatured && (
                                    <div className="absolute top-3 left-3 bg-amber-500 text-black text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1 uppercase tracking-tighter">
                                        <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        Featured
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button 
                                        onClick={() => toggleFeatured(pkg.id)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl backdrop-blur-md hover:bg-white/20 border border-white/20 text-xs font-bold transition-all"
                                    >
                                        <span className="material-symbols-outlined text-sm">{pkg.isFeatured ? 'star_half' : 'star'}</span>
                                        {pkg.isFeatured ? 'Unset Featured' : 'Set as Featured'}
                                    </button>
                                </div>
                            </div>

                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="text-white text-lg font-bold mb-1 group-hover:text-primary transition-colors">{pkg.title}</h3>
                                <p className="text-slate-500 text-xs mb-1">Submitted by <span className="text-slate-300 font-medium">{pkg.agentName}</span></p>
                                <p className="text-slate-600 text-[10px] font-mono mb-4">{new Date(pkg.date).toLocaleDateString()}</p>
                                
                                <div className="mt-auto space-y-2">
                                    <button 
                                        onClick={() => openPackageModal(pkg)}
                                        className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl transition-all border border-white/10"
                                    >
                                        View Details
                                    </button>
                                    
                                    <div className="flex gap-2">
                                        {pkg.status === 'Pending' && (
                                            <>
                                                <button onClick={() => handleStatusUpdate(pkg.id, 'Rejected')} className="flex-1 py-2.5 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white text-xs font-bold rounded-xl transition-all">Reject</button>
                                                <button onClick={() => handleStatusUpdate(pkg.id, 'Approved')} className="flex-1 py-2.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white text-xs font-bold rounded-xl transition-all">Approve</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View Package Modal */}
                <ViewPackageModal 
                    isOpen={isModalOpen}
                    onClose={closePackageModal}
                    packageData={selectedPackage}
                    userRole="admin"
                    onApprove={(data) => {
                        handleStatusUpdate(data.id, 'Approved');
                        closePackageModal();
                    }}
                    onReject={(data) => {
                        handleStatusUpdate(data.id, 'Rejected');
                        closePackageModal();
                    }}
                    onSetFeatured={(data) => {
                        toggleFeatured(data.id);
                        // Optional: closePackageModal(); 
                    }}
                    onEdit={(data) => {
                        console.log("Edit triggered for:", data.title);
                    }}
                />
            </div>
        </AgentLayout>
    );
};

export default PackageManagement;