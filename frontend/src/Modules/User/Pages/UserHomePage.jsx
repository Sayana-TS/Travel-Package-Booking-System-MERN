import React, { useState } from "react";
import UserLayout from "../layouts/UserLayout";
import HeroSection from "../Components/HeroSection";
import CategorySection from "../components/CategorySection";
import PackageCard from "../components/PackageCard";
import WidePackageCard from "../components/WidePackageCard";
import PromoBanner from "../Components/PromoBanner";
import Testimonials from "../Components/Testimonials";
import GallerySection from "../Components/GallerySection";
import TopDestinations from "../Components/TopDestinations";
import {
  recommended,
  featured,
  ongoing,
  upcoming,
  popular,
  budgetFriendly,
} from "../data/packages";

const UserHomePage = () => {
  const [tab, setTab] = useState("ongoing");
  return (
    <UserLayout>
      <HeroSection />
      <CategorySection />
      {/* Recommended Packages Section */}
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Recommended Packages</h2>
          <a href="#" className="text-primary font-medium hover:underline">View All</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recommended.map((pkg) => (
            <PackageCard key={pkg.title} {...pkg} cta={<a className="px-4 py-2 bg-primary/20 text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors" href="#">View Details</a>} />
          ))}
        </div>
      </section>
      {/* Featured Packages Section */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Featured Packages</h2>
          <a href="#" className="text-primary font-medium hover:underline">View All</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((pkg) => (
            <WidePackageCard key={pkg.title} {...pkg} cta={<a className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity" href="#">View Details</a>} />
          ))}
        </div>
      </section>
      {/* Ongoing/Upcoming Packages Section (toggle) */}
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Current Packages</h2>
          <div className="flex space-x-1 bg-card-dark p-1 rounded-lg">
            <button onClick={() => setTab("ongoing")} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${tab === "ongoing" ? "bg-primary text-white" : "text-subtext-dark hover:bg-border-dark"}`}>Ongoing</button>
            <button onClick={() => setTab("upcoming")} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${tab === "upcoming" ? "bg-primary text-white" : "text-subtext-dark hover:bg-border-dark"}`}>Upcoming</button>
          </div>
        </div>
        {tab === "ongoing" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {ongoing.map((pkg) => (
              <PackageCard key={pkg.title} {...pkg} cta={<a className="block w-full text-center px-4 py-2 bg-primary/20 text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors" href="#">View Details</a>} />
            ))}
          </div>
        )}
        {tab === "upcoming" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {upcoming.map((pkg) => (
              <PackageCard key={pkg.title} {...pkg} cta={<a className="block w-full text-center px-4 py-2 bg-primary/20 text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors" href="#">View Details</a>} />
            ))}
          </div>
        )}
        <div className="text-center mt-10">
      <a className="px-6 py-3 bg-primary/20 text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors" href="#">View All</a>
    </div>
      </section>
      {/* Popular Packages Section */}
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Popular Packages</h2>
          <a href="#" className="text-primary font-medium hover:underline">View All</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {popular.map((pkg) => (
            <PackageCard key={pkg.title} {...pkg} cta={<a className="block w-full text-center px-4 py-2 bg-primary/20 text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors" href="#">View Details</a>} />
          ))}
        </div>
      </section>
      {/* Promo Banner Section */}
      <PromoBanner />
      {/* Top Destinations Section (NEW) */}
      <TopDestinations />
      {/* Budget Friendly Packages Section */}
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Budget-Friendly Packages</h2>
          <a href="#" className="text-primary font-medium hover:underline">View All</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {budgetFriendly.map((pkg) => (
            <WidePackageCard key={pkg.title} {...pkg} cta={<a className="px-4 py-2 bg-primary/20 text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors" href="#">View Details</a>} />
          ))}
        </div>
      </section>
      {/* Testimonials Section */}
      <Testimonials />
      {/* Gallery Section */}
      <GallerySection />
    </UserLayout>
  );
};

export default UserHomePage;



