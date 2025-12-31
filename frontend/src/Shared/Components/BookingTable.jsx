import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const BookingTable = ({ bookings }) => {
  const navigate = useNavigate(); // 2. Initialize navigate

  const handleRowClick = (bookingId) => {
    // 3. Define the destination path
    navigate(`/agent/bookings/detail`);
  };

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-white/[0.03] border-b border-white/5">
            <tr>
              {['ID', 'Customer', 'Destination', 'Status', 'Date'].map((head) => (
                <th key={head} className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {bookings.map((b) => (
              <tr 
                key={b.id} 
                onClick={() => handleRowClick(b.id)} // 4. Add Click Handler
                className="hover:bg-white/[0.03] transition-colors cursor-pointer group" // 5. Add cursor-pointer
              >
                <td className="p-4 text-xs sm:text-sm font-bold text-white group-hover:text-primary transition-colors">
                  {b.id}
                </td>
                <td className="p-4 text-xs sm:text-sm text-slate-300">{b.customer}</td>
                <td className="p-4 text-xs sm:text-sm text-slate-300">{b.destination}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter rounded-full ${
                    b.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-500' :
                    b.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-rose-500/10 text-rose-500'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="p-4 text-xs sm:text-sm text-slate-500">{b.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;