import React from 'react';
import PaymentSection from './PaymentSection'; // Adjust path if necessary

const SidebarBooking = ({ data }) => (
    // Replaced bg-white/5 with the semantic bg-card-dark
    <div className="bg-card-dark rounded-xl p-6 space-y-6 sticky lg:top-8"> 
        
        {/* Booking Summary */}
        <h2 className="text-xl font-bold">Booking Summary</h2>
        <div className="flex gap-4">
            <div 
                className="w-24 h-24 rounded-lg bg-cover bg-center flex-shrink-0" 
                style={{ backgroundImage: `url("${data.imageSrc}")` }}
            />
            <div className="space-y-1">
                <h3 className="font-bold">{data.packageName}</h3>
                <p className="text-sm text-white/60">Hotel: {data.hotel}</p>
                <p className="text-sm text-white/60">Includes: Guided hikes, meals, and accommodation.</p>
            </div>
        </div>
        
        {/* Price Breakdown */}
        <div className="space-y-3 border-t border-white/10 pt-4">
            <div className="flex justify-between text-sm">
                <span className="text-white/60">Price per person</span>
                <span>${data.pricePerPerson.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-white/60">Number of travelers</span>
                <span>{data.travelers}</span>
            </div>
            <div className="flex justify-between font-bold text-base border-t border-white/10 pt-3 mt-3">
                <span>Total Price</span>
                <span className="text-primary">${data.totalPrice.toLocaleString()}</span>
            </div>
        </div>

        {/* Payment Section */}
        <PaymentSection data={data} />
        
    </div>
);

export default SidebarBooking;