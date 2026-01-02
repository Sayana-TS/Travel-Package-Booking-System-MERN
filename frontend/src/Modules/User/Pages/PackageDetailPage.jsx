// src/pages/YosemitePackagePage.jsx
import React, { useState } from 'react';
import MaterialIcon from '../Components/MaterialIcon';
import StarRating from '../Components/StarRating';
import Breadcrumb from '../../../Shared/Components/Breadcrumb';
import PackageSummary from '../Components/PackageSummary';
import HighlightsGrid from '../Components/HighlightsGrid';
import InclusionsExclusions from '../Components/InclusionsExclusions';
import ActivityCard from '../Components/ActivityCard';
import BookingSidebar from '../Components/BookingSidebar';
import PackageCards from '../Components/PackageCards';
import UserLayout from '../Layouts/UserLayout'
import { Link } from 'react-router-dom';

// --- Dummy Data (Updated with description) ---
const PACKAGE_DATA = {
  title: "Yosemite National Park Adventure",
  description: "Experience the majesty of the High Sierras. This comprehensive 5-day package covers all the essentials—from guided treks beneath the Giant Sequoias to peaceful afternoons by the Merced River. Perfect for families and solo explorers alike seeking a blend of adventure and comfort.",
  price: 1200,
  rating: 4.8,
  reviewCount: 2,
  details: {
    duration: "5 Days / 4 Nights",
    location: "Yosemite, CA",
    season: "June - Sep"
  },
  gallery: {
    mainImage: "https://images.unsplash.com/photo-1533496199141-bccd9b139773?auto=format&fit=crop&w=1200&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1505159947324-47d039f193c4?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39?auto=format&fit=crop&w=400&q=80"
    ]
  },
  highlights: [
    { icon: "hiking", text: "Guided Hikes" },
    { icon: "park", text: "Giant Sequoias" },
    { icon: "directions_boat", text: "River Boating" },
    { icon: "photo_camera", text: "Scenic Views" }
  ],
  activities: [
    {
      title: "Guided Yosemite Hikes",
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk3h0o_SBKzKHEP6XWEAz0NKEHFfBYHFQJM3PwfTOhPlPjtoDJ7Wrt62hxM-urwSB1BkQ66ydYDmin_dru9eeUeBsd46a2O4-Ly7lnQtgmK9mSLWhNGPHkH3DeXsdFgtT-O9sPl3UFY-qF7Irt4YcXzSvCxglTnvl7H1Cvti7u5GuMChs8rjbuOl6zJqoAUeW19L_7MTGO_PiKjs6f6MplWDZ-i-7gYyindiyXAQRR8U6JhMsRMK68AWz3VlYT3he4Sxxn8jEtOZg",
      description: "Explore famous trails like the Mist Trail and John Muir Trail with our expert guides leading the way.",
      link: "#",
      duration: "4-6 Hours",
      schedule: "Daily, 8:00 AM"
    },
    {
      title: "Mariposa Grove Tour",
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBELK7VvPN2AxkfYhe4im9vNy9b2M7ehxuMV8FZc64xpaX4yuiKf8a3GZVOxoDK0uDPxGYds97pwqKKVBB-IGO_JuS9MfG6McZE5q4BC_tVC8xblHlxdYGg9NL1Gp8PIu5psFIl-ffHy6Dke4Ai7sXPCk6YVIme7hOe6ncolNyASx9nCOc8MNTDDFdpP5J6TCFls6jK-P8jBMaa2uMWrXURZYvE5Dc8Cs71oOSoNSOQWNahdXzZugGagy_2nR2lbcDpAcOULWU-gnw",
      description: "Stand in awe of the ancient Giant Sequoias, some of the largest living things on Earth.",
      link: "#",
      duration: "3 Hours",
      schedule: "Tue & Thu, 10:00 AM"
    },
    {
      title: "Merced River Boating",
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAI985wQnmGbBerrBObDQEhdrSvemuHnOgd5PVxn2IVftqWwW6JdrluxERxAF1zokbF2Iy9rWVvPncqI_AEgG_KpB5iDM2sUELxx2WzhNK--z8NFqwoo-EH3wr7LdTGU1PPheW2oV1u7s-Abfpurank3qq8vpcnrHdm9n2cdwEC3kxh9IqO-wcs5gY_ogYGpPOmeBcra7G7jnsC6_r-ncixmBHpsDTFysK6FMZByOnk110_CPFFXxzHOwOAqpVSwnyzuJhgOGshuts",
      description: "Enjoy a relaxing float or an exciting paddle down the scenic Merced River, offering unique views.",
      link: "#",
      duration: "2 Hours",
      schedule: "Afternoons, 2:00 PM"
    },
  ],
  transportation: {
    serviceType: "Private Transfer & Shuttle",
    vehicleType: "Luxury Mercedes Sprinter Van",
    schedule: "Daily pickups at 8:30 AM",
    duration: "Varies by destination (30-60 mins average)",
    pickupLocation: "Fresno Yosemite International Airport (FAT)",
    dropLocation: "Cozy Mountain Lodge (Main Entrance)",
    note: "All vehicles are climate-controlled and feature complimentary bottled water and Wi-Fi."
  },
  reviews: [
    { name: "Sonia Bennett", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0M51dZaL9rea-iZaCq9vOuxMAz-GBKArzB6IdIbeSmXqLskxZyFotBITZ4NKFLydAGgZjkSZg7nBUhCnR14EETzBKlrh85a-U2ViMl1IcuCfp1A34cKbX3DqgazEgivViWLmZSNaOF4xnEPggHXXLBO9SLvY2xoBQZbQcLYWgdw8W_h29c1YcX2Wmh81HLSX51xtk7ks08sKPYnPNA7XxfFP2YQCuH9QetIcgH1LRFIFS8U_ITmTAO6y4WppH0HyHbw5GMiA4NlA", rating: 5, text: "Absolutely breathtaking! The views were stunning, and the hike was challenging but rewarding. Our guide, Alex, was knowledgeable and made the experience even better." },
    { name: "Mark Johnson", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdy9-x0X45synRE6hmdoPVyvT8LAPSUykcOfsrGRf_AzHKjliET8Mr6IMFtkteyWvBym0KGxJn6sWfSPyIz3BNFR2IwuETyibhz82E9Pt0bDVE5LSzdfJBy06i8Otu7DCZBwmL7MQ8fvAZtGpcmmkiUlxOl2KbFtZxa5HNRL5hNr7FKSq_5_2-Pu-MAZqJAJrennTILxFmlwbpX_yAsoyJkFI8TudGpYpVVCjpLYMzN9i3GvFD3RAqrlvoIbnBSGqyHltN3XBtjJM", rating: 4, text: "Great trip overall. The hotel was comfortable and the transportation was seamless. Wish we had more time at Glacier Point." },
  ],
  qna: [
    { name: "Agent", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6IePeLqnG3dr34yT1hKpkXuyeYPU_JMPnS_E2NZZoRHJiK-8-IsaSUj5NJqmcQc4MrjWzlPZ6_amsMQtiHy9Yem5sKgBNuMXLUPhCaDv_KE3u7z5H74gAl_lAnAwMjKJo1WmQjs1ir_1ablvHC1clOdhBbjsWI7H74WkVRXky8rd54_KsbVEqvYj8NujZJZAMlHnnW70qQKsXdHBeZc2FOPRGgDz8MdxzlAmMXwgR9Iq9vQf27YvqWQaq3hBqcA-nPpYSwYfLfRE", question: "Is this package suitable for children?", answer: "Yes, it's family-friendly, but some hikes may be strenuous for young children. We recommend it for children aged 10 and above." },
    { name: "Agent", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqQmt04V0wGoNF4L_z566oHNZevx5BBPgNcCW1LXt1M37JVTDjY4G-R2uXo1XUcFxfwDzHWLoFV1XNY5gPoCvivAyaj8MC3RXoPiURHUzqxFIcJRuZRwbVn6P6dHpvxSKJfp3ABFDdYQZVN2ZdwcjsvztKnxqftUerBNQWTYdwrbO5dEHOnCE3RQlUEYW1TaF4HmtrzzIJUJvYLdi8-ZgJycnL-0aClNm4P6w7H4K-gUIDo3ncG19kR4-qtTRFL4hdr0uwwps61wQ", question: "What kind of clothing should we pack?", answer: "We recommend layers. Warm clothing for evenings and mornings, and lighter clothes for daytime. Don't forget sturdy hiking shoes!" },
  ],
  similarPackages: [
    { title: "Zion National Park Escape", price: 950, imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAOR8xO3767dsDGNF8BTt5HP8iAowEaqlxPmLumWJDrw9Dih5Ag6q2td3aA1X1Qph3ghPNoz8M3zVwgqk1RrkaZ7k2i7QYcGLXw9nGuqinUG6WB16x_13vlmYCrYT8wfTm3bYjwWIrgBfyUuEqHLNZkB1jDJ-54Qc-ubqu__TpBfYJsZC5IP82-4waGb-Kyt3wAcbb-RjTtA2KdRdXzpP6O7bhvRwsycLSrVKshx3lHDI2U2T6JTeG_OlnAsdpIv-IfOwTuKf3t5I" },
    { title: "Grand Canyon Explorer", price: 1450, imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC9UJ17_rkO_d84Elxl1jLOFPThNuO01ckSAgxTqnqH1HELCnSL_Hfyss36qtPh4spYema4rYsJAOr3jFP7FfxfEzuVMoKUA_xeJ4vnAH_LftsUFpCSoFkl8NjblyNIUd0NOfuSfCk9qlds4TqY-Npwh5dqSGeuXfQL5j-GzToER5Z65Yuvs2kuCx3Qz40Fq9ABGcLRbjKo1BJba6FxARgowumlAW7cRBc2MDCPhl2RBC2J7vY-7cWjHSq_70rpn-g_ObgFOPR6sk" },
    { title: "Rocky Mountain Highs", price: 1100, imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnNBhXTNA01t0XXJf7HcIVdT_wzY8Yo03ho2gSCpuyQelxeVUFbYPZBUfTXZ5OGituyQmKVwglEVMh4En3_mFQFN8MrXy1v4Tqb_9wRhbX0GbGmssAEif90iDJo5KKr6XC2nMYBy9tmD2IeMzx-WzbmmcvTlf1YFEXfHZ3CDBUrUngUF1ETknX-XCJOMgJUSdkKj3IUuqvZaMdz7DluH6lI9qOgxrfx2TwOUDN3aUm6iezyHylhqXW61pNV7lz_FBqWdEB3Yo158U" },
    { title: "Alaskan Wonders", price: 1800, imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcEp6L6Zv3giO6F6dj5sVm9Iz96enn_ZoWM_kmKyyHjCHUDNWgZ6Fo2ycOLrI7aLiWCjQSyQzUrJ1YjsY6DVsLlERTk8CfwxBmKvQI9N1K54SOx_USwVO1WrJy71s64WL6uDVBK0JAiBk6ZUUf2FV4co2AkDDVMxMCBZ32hPGHIFwXnPcHQnDL6487VqrlMQturwBZexdlNHzsAzOy6QDzdxciepyKk7OaPMyyI2E9X5C1GOjJE82Xsi2p-NiyjYTZUn6DTfs_B78" },
  ]
};

const PackageDetailPage = () => {
  const [packageData, setPackageData] = useState(PACKAGE_DATA);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Add these for the form inputs
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const [questionText, setQuestionText] = useState("");
  // --- Carousel State & Logic ---
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const allImages = [PACKAGE_DATA.gallery.mainImage, ...PACKAGE_DATA.gallery.thumbnails];

  const handlePostReview = (e) => {
    e.preventDefault();
    if (userRating === 0) return alert("Please select a rating!");

    const newReview = {
      name: "You",
      avatar: "https://ui-avatars.com/api/?name=User&background=056bd1&color=fff",
      rating: userRating,
      text: reviewText,
    };

    const updatedReviews = [newReview, ...packageData.reviews];
    const newAverage = updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;

    setPackageData({
      ...packageData,
      reviews: updatedReviews,
      reviewCount: updatedReviews.length,
      rating: newAverage,
    });

    // Reset form
    setReviewText("");
    setUserRating(0);
    setShowReviewForm(false);
  };

  const handlePostQuestion = (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;
  
    const newQna = {
      name: "User", // The person asking
      avatar: "https://ui-avatars.com/api/?name=User&background=056bd1&color=fff",
      question: questionText,
      answer: "Pending response from agent...", // Default text for new questions
    };
  
    setPackageData({
      ...packageData,
      qna: [...packageData.qna, newQna], // Adds the new question to the list
    });
  
    setQuestionText(""); // Clear the box
  };

  const handleNext = () => {
    setActiveImgIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveImgIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  // --- Hotel Details Section ---
  const HotelDetails = () => {
    const hotelImages = PACKAGE_DATA.gallery.thumbnails;
    const [hotelIdx, setHotelIdx] = useState(0);

    const nextHotelImg = () => {
      setHotelIdx((prev) => (prev === hotelImages.length - 1 ? 0 : prev + 1));
    };

    const prevHotelImg = () => {
      setHotelIdx((prev) => (prev === 0 ? hotelImages.length - 1 : prev - 1));
    };

    return (
      <section className="bg-card-light dark:bg-card-dark p-6 rounded-lg border border-white/5">
        <h3 className="text-2xl font-bold mb-4 text-white">Hotel Details: Cozy Mountain Lodge</h3>
        <p className="text-subtext-dark mb-4">
          Nestled in the heart of Yosemite, offering stunning views and world-class amenities.
          Enjoy comfort and nature at your doorstep.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="relative group overflow-hidden rounded-lg bg-gray-800">
              <img
                alt="A cozy hotel room"
                className="w-full h-64 object-cover transition-all duration-500"
                src={hotelImages[hotelIdx]}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between px-2">
                <button
                  onClick={prevHotelImg}
                  className="text-white p-2 hover:bg-primary rounded-full transition-colors"
                >
                  <MaterialIcon name="arrow_back_ios" className="text-3xl translate-x-1" />
                </button>
                <button
                  onClick={nextHotelImg}
                  className="text-white p-2 hover:bg-primary rounded-full transition-colors"
                >
                  <MaterialIcon name="arrow_forward_ios" className="text-3xl" />
                </button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white">
                {hotelIdx + 1} / {hotelImages.length}
              </div>
            </div>
            <div className="flex space-x-2 mt-2">
              {hotelImages.map((src, index) => (
                <div
                  key={index}
                  className={`relative w-1/3 h-16 cursor-pointer rounded-md overflow-hidden transition-all ${hotelIdx === index ? 'ring-2 ring-primary ring-offset-2 ring-offset-black' : 'opacity-50 hover:opacity-100'
                    }`}
                  onClick={() => setHotelIdx(index)}
                >
                  <img
                    alt={`Hotel thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    src={src}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-semibold mb-3 text-white">Amenities</h4>
              <div className="grid grid-cols-2 gap-3 text-sm mb-6">
                {['wifi', 'pool', 'local_parking', 'restaurant', 'fitness_center', 'spa'].map((icon, index) => (
                  <span key={index} className="flex items-center text-gray-300">
                    <MaterialIcon name={icon} className="text-primary mr-2 text-lg" />
                    {icon.charAt(0).toUpperCase() + icon.slice(1).replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-2 text-white flex items-center">
                <MaterialIcon name="king_bed" className="mr-2 text-primary" />
                Room Details
              </h4>
              <p className="text-sm text-subtext-dark leading-relaxed">
                Standard rooms with double beds, mountain-view balconies, and climate control.
                Options to upgrade to Deluxe or Suite available.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // --- Itinerary Section ---
  const ItineraryAccordion = () => {
    const itinerary = [
      { day: 1, title: "Arrival & Welcome", content: "Arrival at Fresno Yosemite International Airport (FAT), pickup by our representative, transfer to the hotel. Check-in, relax, and join us for a welcome dinner.", open: true },
      { day: 2, title: "Yosemite Valley Exploration", content: "Full day guided tour of Yosemite Valley. Visit iconic spots like Tunnel View, Bridalveil Fall, and Yosemite Falls. Enjoy a picnic lunch amidst nature." },
      { day: 3, title: "Giant Sequoias & Glacier Point", content: "Morning visit to Mariposa Grove to see the majestic giant sequoias. In the afternoon, travel to Glacier Point for breathtaking panoramic views of the Sierra Nevada." },
      { day: 4, title: "Optional Activities & Leisure", content: "A day for leisure. You can opt for activities like rock climbing (additional cost), boating on the Merced River, or simply explore the local shops and cafes." },
      { day: 5, title: "Departure", content: "After breakfast, check-out from the hotel. You will be transferred back to Fresno Yosemite International Airport for your return journey." },
    ];

    return (
      <section className="bg-card-light dark:bg-card-dark p-6 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Tour Itinerary</h3>
        <div className="space-y-4">
          {itinerary.map((item, index) => (
            <details key={item.day} className={`group ${index < itinerary.length - 1 ? 'border-b border-gray-200 dark:border-border-dark pb-4' : ''} ${index > 0 ? 'pt-4' : ''}`} open={item.open}>
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-semibold text-lg">{`Day ${item.day}: ${item.title}`}</span>
                <MaterialIcon name="expand_more" className="transform transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-subtext-dark">{item.content}</p>
            </details>
          ))}
        </div>
      </section>
    );
  };

  // --- Transportation Section ---
  const TransportationSection = () => {
    const t = PACKAGE_DATA.transportation;
    return (
      <section className="bg-card-light dark:bg-card-dark p-6 rounded-lg">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <MaterialIcon name="directions_bus" className="mr-3 text-primary" />
          Transportation Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <MaterialIcon name="category" className="text-primary mr-3 mt-1" />
              <div>
                <p className="text-xs text-subtext-dark uppercase font-bold tracking-wider">Service & Vehicle</p>
                <p className="text-white">{t.serviceType} — {t.vehicleType}</p>
              </div>
            </div>
            <div className="flex items-start">
              <MaterialIcon name="history" className="text-primary mr-3 mt-1" />
              <div>
                <p className="text-xs text-subtext-dark uppercase font-bold tracking-wider">Schedule & Duration</p>
                <p className="text-white">{t.schedule} ({t.duration})</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <MaterialIcon name="location_on" className="text-primary mr-3 mt-1" />
              <div>
                <p className="text-xs text-subtext-dark uppercase font-bold tracking-wider">Pickup & Drop-off</p>
                <p className="text-white">From: {t.pickupLocation}</p>
                <p className="text-white">To: {t.dropLocation}</p>
              </div>
            </div>
            {t.note && (
              <div className="flex items-start bg-white/5 p-3 rounded-lg border-l-4 border-primary">
                <MaterialIcon name="info" className="text-primary mr-3 mt-1" />
                <p className="text-sm text-subtext-dark italic">{t.note}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  // --- Hosted By Section ---
  const HostedByAgent = () => (
    <section className="bg-card-light dark:bg-card-dark p-6 rounded-lg">
      <h3 className="text-2xl font-bold mb-4">Hosted By</h3>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <img alt="Profile picture of Riya Thomas" className="w-24 h-24 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp1SLAVPSxnics0M7jQL9I4qzu7VId9kG3m5pjNLJKVOsqnATJHUE-YoaD_hyLr-UdBNGNHzB7pEZWPDOsNq-IPiyvAAVPH0O-InntvjExIxaWoG5n_XdFR1t9KsXIH99MQXjshDe8U7TyfQ5SD2Vi6SHbAZj1P6Oc7k7hH2GQ_B1kARzzKr8YlNy3e-ATgQmTnmlLZiCf7WJfyGqZVLj4WnQWuJm18vmLxc8U34rSOWUmaniOBNsgHN9Gz_ACJ0_Y6wz_zF179p8" />
        <div className="flex-grow text-center sm:text-left">
          <h4 className="text-xl font-semibold">Riya Thomas</h4>
          <p className="text-subtext-dark">Kochi, Kerala</p>
          <div className="flex items-center justify-center sm:justify-start my-1">
            <MaterialIcon name="star" className="text-yellow-500 text-base" />
            <span className="text-sm ml-1">4.8 Rating</span>
          </div>
          <p className="text-sm text-subtext-dark mt-2">5+ years organizing Kerala backwater and hill station trips.</p>
        </div>
        <div className="flex flex-col space-y-2 w-full sm:w-auto">
          <Link to='/profileHost' className="bg-primary text-white text-center font-bold py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors">Contact Agent</Link>
          <Link className="text-center text-primary text-sm font-medium hover:underline" to="/profileHost">View All Packages</Link>
        </div>
      </div>
    </section>
  );

  return (
    <div className='min-h-screen bg-background-dark text-white'>
      <UserLayout>
        <div className="container mx-auto p-4 md:p-8">

          <Breadcrumb path={[{ label: 'Home', href: '/' }, { label: 'Packages', href: '#' }]} currentPage={PACKAGE_DATA.title} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-8">

              {/* --- PACKAGE QUICK SUMMARY (Uses PACKAGE_DATA.description) --- */}
              {/* <section className="p-6 rounded-lg  border-primary/20">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h1 className="text-3xl font-bold text-white">{PACKAGE_DATA.title}</h1>
                  <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold border border-primary/20">
                    Featured Adventure
                  </div>
                </div>
              </section> */}

              <section>
                <div className="relative group overflow-hidden rounded-lg mb-6">
                  <img
                    alt="Yosemite Gallery Image"
                    className="w-full h-[500px] object-cover transition-transform duration-500 ease-in-out"
                    src={allImages[activeImgIndex]}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={handlePrev}
                      className="p-2 bg-black/40 hover:bg-primary text-white rounded-full transition-colors"
                    >
                      <MaterialIcon name="arrow_back_ios" className="translate-x-1" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2 bg-black/40 hover:bg-primary text-white rounded-full transition-colors"
                    >
                      <MaterialIcon name="arrow_forward_ios" />
                    </button>
                  </div>
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">20% OFF</div>
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
                    {allImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImgIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${i === activeImgIndex ? 'bg-primary w-6' : 'bg-white/50'}`}
                      ></button>
                    ))}
                  </div>
                </div>

                <PackageSummary
                  title={PACKAGE_DATA.title}
                  duration={PACKAGE_DATA.details.duration}
                  location={PACKAGE_DATA.details.location}
                  season={PACKAGE_DATA.details.season}
                  price={PACKAGE_DATA.price.toLocaleString()}
                  rating={PACKAGE_DATA.rating}
                  reviewCount={PACKAGE_DATA.reviewCount}
                />
              </section>

              <HighlightsGrid highlights={PACKAGE_DATA.highlights} />
              <p className="text-subtext-dark leading-relaxed">
                {PACKAGE_DATA.description}
              </p>

              <InclusionsExclusions
                inclusions={[
                  "4 nights accommodation at Cozy Mountain Lodge.",
                  "Daily breakfast and welcome dinner.",
                  "All activities mentioned in the itinerary.",
                  "Airport transfers and park transportation.",
                  "Experienced tour guide.",
                ]}
                exclusions={[
                  "Airfare to/from Fresno (FAT).",
                  "Lunches and dinners (except welcome dinner).",
                  "Optional activities and personal expenses.",
                  "Travel insurance.",
                ]}
              />

              <section className="bg-card-light dark:bg-card-dark p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Activities / Tours Included</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PACKAGE_DATA.activities.map((activity, index) => (
                    <ActivityCard
                      key={index}
                      {...activity}
                    />
                  ))}
                </div>
              </section>

              <HotelDetails />

              <ItineraryAccordion />

              <TransportationSection />

              <section className="bg-card-light dark:bg-card-dark p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  <div className="md:col-span-3">
                    <h3 className="text-2xl font-bold mb-4">Location Overview</h3>
                    <p className="text-subtext-dark mb-4">Yosemite National Park, California’s Sierra Nevada jewel, is renowned for its giant sequoias and iconic vistas like Tunnel View, Bridalveil Fall, El Capitan, and Half Dome.</p>
                    <img alt="A stylized map showing mountains and a book" className="w-full h-64 object-cover rounded-lg shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCm8zzgdyEh3625Gs1DQwMQUjeBvl5v2m2OChMuYX6YdvoUK7F3gfon-LgsTeof4zxDUVAUc8GIQ3jMPVIJBB4HNOYPcM3znFpIk--bzcGU2__ljrgpzXgod6B3eCmRK0m8PZrWQYcGVHNvK24EW3MmFH0_XZP9BgZqtsSVj6TDASToofD3LaqsTQdToo__cHrfaG6atiM4mnwcdL0hBPvIeKvJOTR1W-gF2M4bCbNVjRPRJVPjYeeZpnkMQf7Iw2v_rdnP_ZKAfE0" />
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold mb-4">Weather Forecast</h3>
                    <div className="space-y-3">
                      {[
                        { day: 'Mon', icon: 'wb_sunny', color: 'text-yellow-500', condition: 'Sunny', temps: '75°F / 55°F' },
                        { day: 'Tue', icon: 'cloud', color: 'text-blue-400', condition: 'Cloudy', temps: '72°F / 52°F' },
                        { day: 'Wed', icon: 'grain', color: 'text-gray-400', condition: 'Rainy', temps: '70°F / 50°F' },
                        { day: 'Thu', icon: 'wb_sunny', color: 'text-yellow-500', condition: 'Sunny', temps: '78°F / 58°F' },
                        { day: 'Fri', icon: 'wb_sunny', color: 'text-yellow-500', condition: 'Sunny', temps: '79°F / 59°F' },
                      ].map((w, index) => (
                        <div key={index} className="flex items-center justify-between bg-background-light dark:bg-background-dark p-3 rounded-lg">
                          <span className="font-semibold w-12">{w.day}</span>
                          <div className="flex items-center space-x-2">
                            <MaterialIcon name={w.icon} className={`${w.color} text-3xl`} />
                            <span className="text-sm">{w.condition}</span>
                          </div>
                          <span className="font-semibold text-sm">{w.temps}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-card-light dark:bg-card-dark p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Reviews & Ratings</h3>
                <div className="flex items-center mb-6">
                  <p className="text-4xl font-bold mr-4">{packageData.rating.toFixed(1)}</p>
                  <div>
                    <StarRating rating={packageData.rating} />
                    <p className="text-sm text-subtext-dark">Based on {packageData.reviewCount} reviews</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-border-dark pt-6 space-y-6">
                  {packageData.reviews.map((review, index) => (
                    <div key={index} className="flex items-start space-x-4 animate-fadeIn">
                      <img alt={`Avatar of ${review.name}`} className="w-12 h-12 rounded-full object-cover" src={review.avatar} />
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <StarRating rating={review.rating} size="sm" />
                        <p className="text-subtext-dark">{review.text}</p>
                      </div>
                    </div>
                  ))}
                  <button
                    className="w-full mt-6 bg-primary/20 text-primary hover:bg-primary hover:text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    onClick={() => setShowReviewForm(prev => !prev)}
                  >
                    {showReviewForm ? "Cancel Submission" : "Submit Your Review"}
                  </button>

                  {showReviewForm && (
                    <div className="mt-6 border border-primary/30 p-4 rounded-lg bg-background-light dark:bg-background-dark">
                      <h4 className="font-semibold mb-3">Share Your Experience</h4>
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <img alt="Your avatar" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvrlwqCjrlzqS7F_ybxRTku1r7XVLpt5FkQQnYVE2YrsGh0ELhX7GsQGqpmp-ijY9kdIbwmqaJoS6hjeKTwLRETIW2lwEJPLrX9OqO0DWJ8dFT8-IjkyOabq2HdTMIY30BsI7s4fCl72zEGbeNHUKHoqMTlg80jQh11H6LuRuW8puFYy7f75aVKq6eKxvGZE3tZ5Z4C5Srxq49HJD37Bar5lRKzzCMekIUppdnAfM_o7YAv62gnR_nlAfUNWN7zt7H-aPUIHRAdE4" />
                        </div>
                        <div className="flex-grow">
                          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <div>
                              <label className="text-sm font-medium block mb-1 text-text-light dark:text-white">Your Rating:</label>
                              {/* Replace your current Star Div with this */}
                              <div className="flex items-center space-x-1 text-yellow-500">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button" // Important: prevents form from auto-submitting
                                    className="focus:outline-none transition-transform hover:scale-110"
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setUserRating(star)}
                                  >
                                    <MaterialIcon
                                      name={(hoverRating || userRating) >= star ? "star" : "star_outline"}
                                      className="text-2xl"
                                    />
                                  </button>
                                ))}
                              </div>

                              {/* Replace your current Textarea with this */}
                              <textarea
                                className="w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-3 focus:ring-primary focus:border-primary transition-colors text-text-light dark:text-white"
                                placeholder="Write your detailed review here..."
                                rows="5"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                required
                              ></textarea>

                              {/* Replace your current Post Review button with this */}
                              <button
                                className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors"
                                type="submit"
                                onClick={handlePostReview}
                              >
                                Post Review
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <section className="bg-card-light dark:bg-card-dark p-6 rounded-lg">
  <h3 className="text-2xl font-bold mb-6">Customer Q&A</h3>
  <div className="space-y-6">
    {/* 1. Use packageData instead of PACKAGE_DATA */}
    {packageData.qna.map((item, index) => (
      <div key={index} className="bg-background-light dark:bg-background-dark p-4 rounded-lg border border-white/5">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <img alt="User avatar" className="w-8 h-8 rounded-full" src={item.avatar} />
          </div>
          <div className="flex-grow">
            <p className="font-semibold">{item.question}</p>
            <p className="text-sm text-subtext-dark mt-1">{item.answer}</p>
          </div>
        </div>
      </div>
    ))}

    <div className="mt-6">
      <h4 className="font-semibold mb-3 text-primary">Ask a Question</h4>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <img alt="Your avatar" className="w-10 h-10 rounded-full" src="https://ui-avatars.com/api/?name=User&background=056bd1&color=fff" />
        </div>
        <div className="flex-grow">
          {/* 2. Bind the form to the handler and state */}
          <form onSubmit={handlePostQuestion}>
            <textarea 
              className="w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-3 focus:ring-primary focus:border-primary transition-colors text-white" 
              placeholder="Type your question here..." 
              rows="3"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
            ></textarea>
            <div className="flex justify-end mt-2">
              <button 
                className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary/90 transition-all" 
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

              <HostedByAgent />
            </div>

            <div className="lg:col-span-1">
              <BookingSidebar
                price={PACKAGE_DATA.price.toLocaleString()}
                rating={PACKAGE_DATA.rating}
                reviewCount={PACKAGE_DATA.reviewCount}
              />
            </div>

            <div className="lg:col-span-3 w-full mt-8">
              <section className="bg-card-light dark:bg-card-dark p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Similar / Recommended Packages</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PACKAGE_DATA.similarPackages.map((pkg, index) => (
                    <PackageCards key={index} {...pkg} />
                  ))}
                </div>
              </section>
            </div>

          </div>
        </div>
      </UserLayout>
    </div>
  );
};

export default PackageDetailPage;