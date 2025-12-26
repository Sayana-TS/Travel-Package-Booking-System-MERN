import React, { useState, useMemo } from 'react';
import AgentLayout from '../../../Shared/layouts/AgentLayout';
import Breadcrumb from '../../../Shared/Components/Breadcrumb';
import RoomDetailsModal from '../Components/RoomDetailsModal';

const RoomManagementPage = () => {
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  // Dummy Data for Hotels
  const [hotels] = useState([
    { id: 1, name: "The Grand Retreat", description: "Luxury hotel in the city center", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80" },
    { id: 2, name: "The Urban Oasis", description: "Modern hotel with rooftop pool", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80" },
    { id: 3, name: "The Lakeside Haven", description: "Serene lakeside resort", image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?w=400&q=80" },
    { id: 4, name: "Coastal Charm Inn", description: "Quaint inn by the sea", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80" },
    { id: 5, name: "Mountain View Lodge", description: "Rustic lodge with stunning views", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80" },
  ]);

  // Dummy Data for Rooms
  const [roomsData] = useState({
    1: [
      { id: 101, type: "Deluxe Suite", price: 250, available: true },
      { id: 102, type: "Standard Room", price: 150, available: true },
      { id: 103, type: "Family Room", price: 300, available: false },
    ],
    2: [
      { id: 201, type: "Executive Suite", price: 400, available: true },
      { id: 202, type: "Economy Room", price: 100, available: true },
    ]
  });

  const [selectedHotelId, setSelectedHotelId] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Logic to open modal for View/Edit
  const handleViewRoom = (id) => {
    setSelectedRoomId(id);
    setIsModalOpen(true);
  };

  // Logic to open modal for Adding new room
  const handleAddRoom = () => {
    setSelectedRoomId(null); // Explicitly null signals "Add" mode to the modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoomId(null);
  };

  // Filter Logic
  const filteredRooms = useMemo(() => {
    const rooms = roomsData[selectedHotelId] || [];
    return rooms.filter(room => 
      room.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedHotelId, searchQuery, roomsData]);

  const inputClass = "w-full rounded-lg border border-black/10 bg-white py-2 pl-10 pr-4 text-black focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-white/20 dark:bg-white/5 dark:text-white transition-all";

  return (
    <AgentLayout>
      <main className="flex-1 overflow-auto p-6 md:p-8 animate-[fadeIn_0.5s_ease-out]">
        
        <div className="mb-6">
          <Breadcrumb 
            path={[{ label: 'Hotels', href: '/hotels' }]} 
            currentPage="Room Management" 
          />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white">Room Management</h1>
          <p className="mt-1 text-black/60 dark:text-white/60">Manage and monitor room availability for your properties.</p>
        </div>

        {/* Hotel Selector */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-black dark:text-white">Select Hotel</h2>
          <div className="scrollbar-hide flex gap-6 overflow-x-auto pb-4">
            {hotels.map((hotel) => (
              <div 
                key={hotel.id}
                onClick={() => setSelectedHotelId(hotel.id)}
                className={`group w-72 flex-shrink-0 cursor-pointer rounded-lg border transition-all duration-300 ${
                  selectedHotelId === hotel.id 
                  ? 'ring-2 ring-primary border-transparent shadow-lg scale-[1.02]' 
                  : 'border-black/10 dark:border-white/10 hover:border-primary/50'
                } bg-card-light dark:bg-card-dark`}
              >
                <div 
                  className="aspect-video w-full rounded-t-lg bg-cover bg-center" 
                  style={{ backgroundImage: `url(${hotel.image})` }}
                />
                <div className="p-4">
                  <p className={`font-semibold ${selectedHotelId === hotel.id ? 'text-primary' : 'text-black dark:text-white'}`}>
                    {hotel.name}
                  </p>
                  <p className="text-sm text-black/60 dark:text-white/60">{hotel.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Room List Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-black dark:text-white">Room List</h2>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64 lg:w-80">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40">search</span>
                <input 
                  className={inputClass} 
                  placeholder="Search room types..." 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button 
                onClick={handleAddRoom}
                className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-md hover:brightness-110 transition-all"
              >
                <span className="material-symbols-outlined">add</span>
                <span className="hidden sm:inline">Add Room</span>
              </button>
            </div>
          </div>

          {/* Room Table */}
          <div className="overflow-x-auto rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-background-dark shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/5 dark:bg-white/5 text-xs uppercase text-black/60 dark:text-white/60">
                <tr>
                  <th className="px-6 py-4 font-bold">Room Type</th>
                  <th className="px-6 py-4 font-bold">Price / Night</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {filteredRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-medium text-black dark:text-white">{room.type}</td>
                    <td className="px-6 py-4 text-black/80 dark:text-white/80">${room.price}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${
                        room.available ? 'bg-primary/10 text-primary' : 'bg-black/10 text-black/50 dark:bg-white/10'
                      }`}>
                        {room.available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => handleViewRoom(room.id)}
                          className="icon-btn hover:text-primary"
                        >
                          <span className="material-symbols-outlined !text-xl">visibility</span>
                        </button>
                        <button onClick={() => handleViewRoom(room.id)} className="icon-btn hover:text-primary"><span className="material-symbols-outlined !text-xl">edit</span></button>
                        <button className="icon-btn hover:text-red-500"><span className="material-symbols-outlined !text-xl">delete</span></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Room Details Modal */}
      <RoomDetailsModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        roomId={selectedRoomId} 
      />
    </AgentLayout>
  );
};

export default RoomManagementPage;