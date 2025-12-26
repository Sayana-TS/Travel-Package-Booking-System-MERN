import React, { useState, useMemo } from 'react';
import AgentLayout from '../../../Shared/layouts/AgentLayout';
import { useNavigate } from 'react-router-dom';

// Sub-component for Stats Cards
const BookingStatsCard = ({ label, value, colorClass = "text-slate-900 dark:text-white" }) => (
  <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
    <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
    <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
  </div>
);

// Sub-component for Status Badges
const StatusBadge = ({ status }) => {
  const styles = {
    Confirmed: "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400",
    Pending: "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400",
    Cancelled: "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400",
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[status] || styles.Pending}`}>
      {status}
    </span>
  );
};

const BookingsManagementPage = () => {
  // --- Dummy Data ---
  const [bookings] = useState([
    { id: "BK12345", customer: "Sophia Clark", email: "sophia.clark@email.com", package: "Luxury Beach Getaway", checkIn: "2024-08-15", checkOut: "2024-08-22", amount: 2500, paymentStatus: "Paid", status: "Confirmed" },
    { id: "BK12346", customer: "Ethan Carter", email: "ethan.carter@email.com", package: "Mountain Adventure", checkIn: "2024-09-01", checkOut: "2024-09-08", amount: 3200, paymentStatus: "Paid", status: "Confirmed" },
    { id: "BK12347", customer: "Olivia Davis", email: "olivia.davis@email.com", package: "City Exploration", checkIn: "2024-10-10", checkOut: "2024-10-15", amount: 1800, paymentStatus: "Pending", status: "Pending" },
  ]);

  // --- Filter State ---
  const [filters, setFilters] = useState({
    search: "",
    date: "",
    status: "",
    paymentStatus: "",
  });

  // --- Logic ---
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({ search: "", date: "", status: "", paymentStatus: "" });
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchesSearch = 
        b.customer.toLowerCase().includes(filters.search.toLowerCase()) || 
        b.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        b.email.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesStatus = filters.status ? b.status === filters.status : true;
      const matchesPayment = filters.paymentStatus ? b.paymentStatus === filters.paymentStatus : true;
      const matchesDate = filters.date ? b.checkIn === filters.date : true;
      
      return matchesSearch && matchesStatus && matchesPayment && matchesDate;
    });
  }, [bookings, filters]);

  const navigate = useNavigate()

  const selectClass = "w-full rounded-lg bg-slate-100/50 dark:bg-slate-900/50 border-slate-300 dark:border-slate-700 focus:ring-primary focus:border-primary text-sm transition-all text-slate-700 dark:text-slate-200 py-2.5 px-4";
  const inputClass = "w-full rounded-lg bg-slate-100/50 dark:bg-slate-900/50 border-slate-300 dark:border-slate-700 focus:ring-primary focus:border-primary text-sm transition-all text-slate-700 dark:text-slate-200 py-2.5 px-4";

  return (
    <AgentLayout>
      <main className="flex-1 p-4 md:p-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Bookings Management</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Manage and oversee all package bookings efficiently.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6 mb-6">
          <BookingStatsCard label="Total Bookings" value="1,250" />
          <BookingStatsCard label="Confirmed" value="850" colorClass="text-green-500" />
          <BookingStatsCard label="Pending" value="200" colorClass="text-amber-500" />
          <BookingStatsCard label="Cancelled" value="200" colorClass="text-red-500" />
          <div className="sm:col-span-2">
            <BookingStatsCard label="Total Revenue" value="$500,000" />
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-background-light/50 dark:bg-background-dark/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-1">
              <input 
                name="search"
                className={inputClass} 
                placeholder="Search ID, Name..." 
                value={filters.search}
                onChange={handleFilterChange}
                type="text"
              />
            </div>
            <input name="date" className={inputClass} type="date" value={filters.date} onChange={handleFilterChange} />
            <select name="status" className={selectClass} value={filters.status} onChange={handleFilterChange}>
              <option value="">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select name="paymentStatus" className={selectClass} value={filters.paymentStatus} onChange={handleFilterChange}>
              <option value="">Payment Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
            <button 
              onClick={resetFilters}
              className="w-full justify-center flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-hidden bg-background-light/50 dark:bg-background-dark/50 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="overflow-x-auto shadow-inner">
            <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
              <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-100 dark:bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 font-bold">Booking ID</th>
                  <th className="px-6 py-4 font-bold">Customer</th>
                  <th className="px-6 py-4 font-bold">Package</th>
                  <th className="px-6 py-4 font-bold">Dates</th>
                  <th className="px-6 py-4 font-bold">Amount</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-primary whitespace-nowrap">{booking.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800 dark:text-slate-200">{booking.customer}</div>
                        <div className="text-xs text-slate-500">{booking.email}</div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">
                        {booking.package}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.checkIn} / {booking.checkOut}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <span className="text-slate-900 dark:text-white">${booking.amount.toLocaleString()}</span>
                          <span className={`w-fit text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                            booking.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30'
                          }`}>
                            {booking.paymentStatus}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={()=>navigate('/agent/bookings/detail')} title="View" className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            <span className="material-symbols-outlined text-lg">visibility</span>
                          </button>
                          {/* <button title="Edit" className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            <span className="material-symbols-outlined text-lg">edit</span>
                          </button> */}
                          <button title="Cancel" className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-red-500 transition-colors">
                            <span className="material-symbols-outlined text-lg">cancel</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                      No bookings found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 md:p-6 gap-4 border-t border-slate-200 dark:border-slate-800">
            <span className="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left">
              Showing <span className="font-semibold text-slate-800 dark:text-slate-200">1</span> to <span className="font-semibold text-slate-800 dark:text-slate-200">{filteredBookings.length}</span> of <span className="font-semibold text-slate-800 dark:text-slate-200">{bookings.length}</span> Entries
            </span>
            <div className="inline-flex items-center -space-x-px shadow-sm rounded-lg overflow-hidden">
              <button className="px-3 py-2 text-sm font-medium text-slate-500 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700">Prev</button>
              <button className="px-3 py-2 text-sm font-medium text-white bg-primary border border-primary">1</button>
              <button className="px-3 py-2 text-sm font-medium text-slate-500 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700">Next</button>
            </div>
          </div>
        </div>
      </main>
    </AgentLayout>
  );
};

export default BookingsManagementPage;