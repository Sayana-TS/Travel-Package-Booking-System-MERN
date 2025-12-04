import React from "react";

const PromoBanner = () => (
  <section className="py-12">
    <div className="bg-card-dark rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center">
      <div className="md:w-1/2">
        <img alt="Tropical beach for special offer" className="w-full h-64 md:h-full object-cover" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" />
      </div>
      <div className="p-8 md:p-12 md:w-1/2">
        <p className="text-sm font-bold text-primary mb-2">SUMMER SALE - 20% OFF!</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">20% Off on Beach Escapes!</h2>
        <p className="text-subtext-dark mb-6">Book your dream beach vacation now and save big. Limited time offer!</p>
        <div className="flex items-center gap-4 mb-6">
          <p className="text-lg font-semibold text-white">Offer ends in:</p>
          <div className="flex gap-2 text-center">
            <div className="bg-primary/20 text-primary p-2 rounded-lg"><span className="text-xl font-bold">02</span><span className="text-xs block">Days</span></div>
            <div className="bg-primary/20 text-primary p-2 rounded-lg"><span className="text-xl font-bold">12</span><span className="text-xs block">Hours</span></div>
            <div className="bg-primary/20 text-primary p-2 rounded-lg"><span className="text-xl font-bold">45</span><span className="text-xs block">Mins</span></div>
          </div>
        </div>
        <a className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity" href="#">Book Now</a>
      </div>
    </div>
  </section>
);

export default PromoBanner;
