import React, { useState } from 'react';
import AgentLayout from '../../../Shared/layouts/AgentLayout';
import Breadcrumb from '../../../Shared/Components/Breadcrumb';

// Accept 'role' as a prop (default to 'agent')
const BookingDetailsPage = ({ role = 'agent' }) => {
  const isAdmin = role === 'admin';
  const [activeTab, setActiveTab] = useState('itinerary');
  const [internalNote, setInternalNote] = useState('');

  // --- Dummy Data (Ready for API Integration) ---
  const bookingData = {
    id: "BKG123456",
    status: "Confirmed",
    paymentStatus: "Paid",
    packageName: "Luxury Getaway to the Alps",
    destinations: "Zermatt, Switzerland",
    travelDates: "Dec 15 - Dec 22, 2025",
    duration: "7 nights",
    travelers: "2 Adults",
    totalAmount: 5832,
    agent: "Sarah Miller",
    createdDate: "Nov 1, 2025",
    customer: {
      name: "Sophia Clark",
      email: "sophia.clark@email.com",
      phone: "+1 (555) 123-4567"
    },
    travelerList: [
      { name: "Sophia Clark", age: 28, contact: "sophia.clark@email.com" },
      { name: "James Clark", age: 31, contact: "+1 (555) 987-6543" }
    ],
    pricing: {
      basePrice: 2000,
      quantity: 3,
      subtotal: 6000,
      discount: 600,
      taxes: 432
    }
  };

  const tabs = [
    { id: 'itinerary', label: 'Itinerary / Package' },
    { id: 'travelers', label: 'Traveler Details' },
    { id: 'notes', label: 'Customer Notes' },
    { id: 'tickets', label: 'Support Tickets' },
  ];

  // --- Handlers ---
  const handleAction = (actionType) => {
    console.log(`Performing action: ${actionType} for ${bookingData.id}`);
    alert(`${actionType} initiated for ${bookingData.id}`);
  };

  return (
    <AgentLayout role={role}>
      <main className="flex-1 p-4 md:p-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* Breadcrumbs - Dynamic Path based on role */}
        <Breadcrumb 
            path={[{ 
              label: 'Bookings', 
              href: isAdmin ? '/admin/bookings' : '/agent/bookings' 
            }]} 
            currentPage={bookingData.id}
          />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Main Content */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            
            {/* Main Booking Header Card */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white line-break-anywhere">Booking ID: {bookingData.id}</h2>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {bookingData.status}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        {bookingData.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                  <div className="space-y-1">
                    <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">Package</p>
                    <p className="font-semibold text-primary">{bookingData.packageName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">Destinations</p>
                    <p className="font-medium text-slate-900 dark:text-white">{bookingData.destinations}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">Travel Dates</p>
                    <p className="font-medium text-slate-900 dark:text-white">{bookingData.travelDates}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">Travelers</p>
                    <p className="font-medium text-slate-900 dark:text-white">{bookingData.travelers}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">Agent</p>
                    <p className="font-medium text-slate-900 dark:text-white">{bookingData.agent}</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center flex-wrap gap-4">
                <div className="flex gap-4 text-xs font-bold">
                  {/* HIDDEN FOR ADMIN */}
                  {!isAdmin && (
                    <button onClick={() => handleAction('Email')} className="flex items-center gap-1 hover:text-primary transition-colors text-slate-600 dark:text-slate-300">
                      <span className="material-symbols-outlined text-sm">mail</span> EMAIL CUSTOMER
                    </button>
                  )}
                </div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Created: {bookingData.createdDate}</p>
              </div>
            </div>

            {/* Tabs System */}
            <div>
              <div className="border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
                <nav className="flex gap-8 whitespace-nowrap min-w-max">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 text-sm font-bold transition-all ${
                        activeTab === tab.id 
                        ? 'border-primary text-primary' 
                        : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="py-6">
                {activeTab === 'itinerary' && (
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="md:col-span-2 p-6">
                          <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Package Overview</h3>
                          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            Day 1: Arrival in Zermatt and luxury chalet check-in. Day 2: Skiing on Matterhorn slopes. 
                            Day 3: Village exploration and gourmet dining. Day 4-6: Spa treatments and optional ice climbing. 
                            Experience the peak of luxury in the Swiss Alps with curated experiences and premium amenities.
                          </p>
                          <button onClick={() => handleAction('View Full Package')} className="mt-6 flex items-center gap-2 text-xs font-bold text-primary hover:underline transition-all">
                            VIEW FULL PACKAGE DETAILS <span className="material-symbols-outlined text-sm">open_in_new</span>
                          </button>
                        </div>
                        <div 
                          className="h-48 md:h-auto bg-cover bg-center bg-no-repeat min-h-[200px] grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=800')` }}
                        >
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {['Daily Breakfast', 'Airport Transfers', 'Ski Equipment'].map((item) => (
                        <div key={item} className="flex items-center gap-3 p-4 rounded-lg bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                          <span className="material-symbols-outlined text-primary">check_circle</span>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item} Included</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'travelers' && (
                  <div className="space-y-4">
                    <div className="hidden md:block bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold">
                            <th className="px-6 py-4">Full Name</th>
                            <th className="px-6 py-4">Age</th>
                            <th className="px-6 py-4">Contact Info</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {bookingData.travelerList.map((traveler, index) => (
                            <tr key={index} className="text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                              <td className="px-6 py-4 font-semibold">{traveler.name}</td>
                              <td className="px-6 py-4">{traveler.age}</td>
                              <td className="px-6 py-4 font-mono text-xs">{traveler.contact}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="md:hidden space-y-4">
                      {bookingData.travelerList.map((traveler, index) => (
                        <div key={index} className="bg-white dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-slate-400 uppercase">Traveler {index + 1}</span>
                              <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-md">Age: {traveler.age}</span>
                            </div>
                            <p className="font-bold text-slate-900 dark:text-white">{traveler.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm">alternate_email</span> {traveler.contact}
                            </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-amber-500 mt-1">restaurant</span>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Dietary Restrictions</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Vegetarian meal options required for one traveler.</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-start gap-4">
                      <span className="material-symbols-outlined text-rose-500 mt-1">celebration</span>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Special Occasion</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Anniversary trip - complimentary champagne requested.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'tickets' && (
                  <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/30 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                    <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-700">confirmation_number</span>
                    <p className="mt-2 text-sm text-slate-500 font-medium">No active support tickets found.</p>
                    <button onClick={() => handleAction('Create Ticket')} className="mt-4 text-xs font-bold text-primary hover:underline uppercase">Create New Ticket</button>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Timeline */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 pb-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Booking Timeline</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 h-[85%] w-0.5 bg-primary/20"></div>
                <div className="space-y-8">
                  {[
                    { title: 'Booking Created', date: 'Nov 1, 2025', icon: 'calendar_add_on', done: true },
                    { title: 'Payment Received', date: 'Nov 1, 2025', icon: 'payments', done: true },
                    { title: 'Confirmed', date: 'Nov 2, 2025', icon: 'check_circle', done: true },
                    { title: 'Trip Completed', date: 'Dec 22, 2025', icon: 'flight_takeoff', done: false },
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-4 relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 shadow-sm ${step.done ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                        <span className="material-symbols-outlined text-sm">{step.icon}</span>
                      </div>
                      <div className="pb-4">
                        <p className={`font-bold text-sm ${step.done ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{step.title}</p>
                        <p className="text-[11px] font-medium text-slate-500 uppercase tracking-tighter">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-6 md:space-y-8 sticky top-0 self-start">
            
            {/* Action Section */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-slate-900 dark:text-white text-lg font-bold mb-4">Actions</h2>
              <div className="flex flex-col gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                {/* HIDDEN FOR ADMIN */}
                {!isAdmin && (
                  <button onClick={() => handleAction('Complete')} className="w-full flex items-center justify-center rounded-lg h-11 bg-green-600 text-white gap-2 text-sm font-bold hover:bg-green-700 transition-all shadow-sm">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>Mark as Completed</span>
                  </button>
                )}
                
                <button onClick={() => handleAction('Print')} className="w-full flex items-center justify-center rounded-lg h-11 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white gap-2 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all">
                  <span className="material-symbols-outlined text-base">print</span>
                  <span>Print Booking Details</span>
                </button>

                {/* HIDDEN FOR ADMIN */}
                {!isAdmin && (
                  <button onClick={() => handleAction('Cancel')} className="w-full flex items-center justify-center rounded-lg h-11 bg-red-50 dark:bg-red-900/10 text-red-600 gap-2 text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/20 transition-all">
                    <span className="material-symbols-outlined text-base">cancel</span>
                    <span>Cancel Booking</span>
                  </button>
                )}
              </div>
            </div>

            {/* Pricing & Payment Card */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-slate-900 dark:text-white text-lg font-bold mb-4">Pricing & Payment</h2>
              <div className="space-y-3 text-sm border-t border-slate-100 dark:border-slate-800 pt-6">
                <div className="flex justify-between items-center">
                  <p className="text-slate-500">Base Price</p>
                  <p className="text-slate-800 dark:text-slate-200 font-medium">${bookingData.pricing.basePrice.toLocaleString()} x {bookingData.pricing.quantity}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-slate-500">Subtotal</p>
                  <p className="text-slate-800 dark:text-slate-200 font-medium">${bookingData.pricing.subtotal.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-slate-500">Discount (10%)</p>
                  <p className="text-red-500 font-bold">-${bookingData.pricing.discount}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-slate-500">Taxes (8%)</p>
                  <p className="text-slate-800 dark:text-slate-200 font-medium">${bookingData.pricing.taxes}</p>
                </div>
                <div className="border-t border-dashed border-slate-200 dark:border-slate-700 my-3"></div>
                <div className="flex justify-between items-center text-lg">
                  <p className="text-slate-900 dark:text-white font-bold">Total Cost</p>
                  <p className="text-primary font-black">${bookingData.totalAmount.toLocaleString()}</p>
                </div>
                <div className="border-t border-solid border-slate-100 dark:border-slate-800 my-4"></div>
                <div className="flex justify-between items-center">
                  <p className="text-slate-500">Method</p>
                  <p className="text-slate-800 dark:text-slate-200 font-medium">Credit Card (**** 4242)</p>
                </div>
                <button onClick={() => handleAction('Download Invoice')} className="w-full flex items-center justify-center rounded-lg h-10 bg-primary/10 text-primary gap-2 text-sm font-bold mt-4 hover:bg-primary/20 transition-all">
                  <span className="material-symbols-outlined text-base">receipt_long</span>
                  <span>Download Invoice</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AgentLayout>
  );
};

export default BookingDetailsPage;