import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserLayout from "../Layouts/UserLayout";
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

  const promoData = {
    title: "20% Off on Beach Escapes!",
    subtitle: "Summer Sale",
    discountText: "SUMMER SALE - 20% OFF!",
    description:
      "Book your dream beach vacation now and save big. Limited time offer!",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    expiresIn: [
      { label: "Days", value: "02" },
      { label: "Hours", value: "12" },
      { label: "Mins", value: "45" },
    ],
  };


  const navigate = useNavigate()
  return (
    <UserLayout>
      <HeroSection />
      <CategorySection />
      {/* Recommended Packages Section */}
      <section className="py-8">
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-3xl font-bold text-white">Recommended Packages</h2>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide snap-x snap-mandatory -mx-1 px-1">
          {recommended.map((pkg) => (
            /* Responsive Width Logic:
               - w-[85%]   : Mobile (shows 1 card + a peek of the next)
               - md:w-[45%]: Tablet (shows 2 cards)
               - lg:w-[30%]: Desktop (shows 3 cards)
               - xl:w-[22%]: Large Desktop (shows 4 cards)
            */
            <div key={pkg.title} className="flex-shrink-0 w-[85%] md:w-[45%] lg:w-[30%] xl:w-[23%] snap-center">
              <PackageCard
                {...pkg}
                cta={
                  <button
                    onClick={() => navigate('/packageDetail')}
                    className="px-4 py-2 bg-primary/20 text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors w-full sm:w-auto"
                  >
                    View Details
                  </button>
                }
              />
            </div>
          ))}
        </div>
      </section>
      {/* Featured Packages Section */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-3xl font-bold text-white">Featured Packages</h2>
        </div>

        {/* Container updated from grid to flex with horizontal scroll logic */}
        <div className="flex overflow-x-auto gap-8 pb-8 scrollbar-hide snap-x snap-mandatory -mx-1 px-1">
          {featured.map((pkg) => (
            /* Responsive Width Logic applied to match the Recommended section */
            <div key={pkg.title} className="flex-shrink-0 w-[85%] md:w-[45%] lg:w-[32%] snap-center">
              <WidePackageCard
                {...pkg}
                cta={
                  <button
                    onClick={() => navigate('/packageDetail')}
                    className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto"
                  >
                    View Details
                  </button>
                }
              />
            </div>
          ))}
        </div>
      </section>
      {/* Ongoing/Upcoming Packages Section (toggle) */}
      <section className="py-8">
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-3xl font-bold text-white">Current Packages</h2>
          <div className="flex space-x-1 bg-card-dark p-1 rounded-lg">
            <button onClick={() => setTab("ongoing")} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${tab === "ongoing" ? "bg-primary text-white" : "text-subtext-dark hover:bg-border-dark"}`}>Ongoing</button>
            <button onClick={() => setTab("upcoming")} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${tab === "upcoming" ? "bg-primary text-white" : "text-subtext-dark hover:bg-border-dark"}`}>Upcoming</button>
          </div>
        </div>

        {tab === "ongoing" && (
          /* Flex container with horizontal scroll and snapping */
          <div className="flex overflow-x-auto gap-8 pb-8 scrollbar-hide snap-x snap-mandatory -mx-1 px-1">
            {ongoing.map((pkg) => (
              <div key={pkg.title} className="flex-shrink-0 w-[85%] md:w-[45%] lg:w-[30%] xl:w-[23%] snap-center">
                <PackageCard
                  {...pkg}
                  cta={
                    <button
                      onClick={() => navigate('/packageDetail')}
                      className="block w-full text-center px-4 py-2 bg-primary/20 text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
                    >
                      View Details
                    </button>
                  }
                />
              </div>
            ))}
          </div>
        )}

        {tab === "upcoming" && (
          /* Flex container with horizontal scroll and snapping */
          <div className="flex overflow-x-auto gap-8 pb-8 scrollbar-hide snap-x snap-mandatory -mx-1 px-1">
            {upcoming.map((pkg) => (
              <div key={pkg.title} className="flex-shrink-0 w-[85%] md:w-[45%] lg:w-[30%] xl:w-[23%] snap-center">
                <PackageCard
                  {...pkg}
                  cta={
                    <button
                      onClick={() => navigate('/packageDetail')}
                      className="block w-full text-center px-4 py-2 bg-primary/20 text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
                    >
                      View Details
                    </button>
                  }
                />
              </div>
            ))}
          </div>
        )}
      </section>
      {/* Popular Packages Section */}
      <section className="py-8">
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-3xl font-bold text-white">Popular Packages</h2>
        </div>

        {/* Changed grid to flex with horizontal scroll and snapping logic */}
        <div className="flex overflow-x-auto gap-8 pb-8 scrollbar-hide snap-x snap-mandatory -mx-1 px-1">
          {popular.map((pkg) => (
            /* Responsive Width Logic:
               - w-[85%]   : Mobile (peek effect)
               - md:w-[45%]: Tablet
               - lg:w-[30%]: Desktop
               - xl:w-[23%]: Large Desktop
            */
            <div key={pkg.title} className="flex-shrink-0 w-[85%] md:w-[45%] lg:w-[30%] xl:w-[23%] snap-center">
              <PackageCard
                {...pkg}
                cta={
                  <button
                    onClick={() => navigate('/packageDetail')}
                    className="block w-full text-center px-4 py-2 bg-primary/20 text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    View Details
                  </button>
                }
              />
            </div>
          ))}
        </div>
      </section>
      {/* Promo Banner Section */}
      <PromoBanner promo={promoData} />
      {/* Top Destinations Section (NEW) */}
      <TopDestinations />
      {/* Budget Friendly Packages Section */}
      <section className="py-8">
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-3xl font-bold text-white">Budget-Friendly Packages</h2>
        </div>

        {/* Transitioned from grid to flex with horizontal scroll and snapping */}
        <div className="flex overflow-x-auto gap-8 pb-8 scrollbar-hide snap-x snap-mandatory -mx-1 px-1">
          {budgetFriendly.map((pkg) => (
            /* Responsive Width Logic for Wide Cards:
               - w-[85%]   : Mobile (peek effect)
               - md:w-[45%]: Tablet
               - lg:w-[32%]: Desktop (3-column feel)
            */
            <div key={pkg.title} className="flex-shrink-0 w-[85%] md:w-[45%] lg:w-[32%] snap-center">
              <WidePackageCard
                {...pkg}
                cta={
                  <button
                    onClick={() => navigate('/packageDetail')}
                    className="px-4 py-2 bg-primary/20 text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    View Details
                  </button>
                }
              />
            </div>
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




