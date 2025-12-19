// src/pages/YosemitePackagePage.jsx
import React, {useState} from 'react';
import MaterialIcon from '../Components/MaterialIcon';
import StarRating from '../Components/StarRating';
import Breadcrumb from '../Components/Breadcrumb';
import PackageSummary from '../Components/PackageSummary';
import HighlightsGrid from '../Components/HighlightsGrid';
import InclusionsExclusions from '../Components/InclusionsExclusions';
import ActivityCard from '../Components/ActivityCard';
import BookingSidebar from '../Components/BookingSidebar';
import PackageCards from '../Components/PackageCards';
import UserLayout from '../Layouts/UserLayout'


// --- Dummy Data (Derived from HTML) ---
const PACKAGE_DATA = {
  title: "Yosemite National Park Adventure",
  price: 1200,
  rating: 4.8,
  reviewCount: 125,
  details: {
    duration: "5 Days / 4 Nights",
    location: "Yosemite, CA",
    season: "June - Sep"
  },
  gallery: {
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbHfgAua5tZL8hYWjCL07bOC4OKR5WBc4oEfhjhSsMDJ_yny8pKRtTSeeX1dcFufaZTx_ZLEGLELSgFY7c_VcoZdhE_4__cfngBVTCz6GW3Mr18uO4UXd_22f8mqn_kcSJT8IFjJPkB9zwy0EoKYVlhYq08PGJeBEbiz0VPgvRXWeU1oEWFU1_SujrhiawhyAok-UAOtOInHfNRTzVQibVHR9zYcrbZX71P25TocOy4zfwvLCoiidIeUnIiLZ7XlRxSxEiXKZMDBs",
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfguLCzCxAd0CJ8pdpAtmu61ajuA1vRNQeT_gfUO0ltIdD_skxg3oSDQUTJfh0gRE3eT6XN1JZ8LkbwxezVmKoTJDw2vECao-nVN-R_y49k_Vr5CucREhx3JXduUGSP8a8hR5hxU_6cXLupp_mYKq3kq1wrHw2ZccILnXvSCwZfizAkr9g-ejPbrvEt1ralqDen7rh1p7YyrLGvuOqpnZ_INEx_Uxk4qB66j4TtZM371ksprx1CdevF4_a7AmWPqWuhK1TvN5OPBY",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0KXRh1Dypk34TOJyselGL3CHfBl4XWiezQQ3x3kTGJBhGNVzZwxKt4K--btToFhZnGSUNrBghLN8-MWdc8eNm9QsyhGsuecTtqJXYoJtog0F81bw30o8klk8663B5Sq_AY6X0BKgdX9mcGXvoKyOoTk52rOQd6jxW9u8rHn4qMYL6Fmhr8xkGDCO3k_GeBJ9v3RtuZG6srNRKnlPQxxmgDpjeIA-mHA_Bgld-nVGTzufrmXNNSmMWz6plBAOYSdl_KfmRLe7KTTI",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCvlyucXZ-L50sCPM6wW8YPU2OBk2endd4utLg3a3y_zHRs7GqtM7VK8HGGcQpgPqfy2MTzp8kw-ayRVclGYsHfNoRLZ68oAPVbhM2tcThi6y2nrq-TAHjSudDxR_CNDO7TWskJoZEI6zN4bfW1A-dYaF-hgw2kREvLqk3tiOS_20HmSXTP4G3K2dDCG5k2HPF7XjS45wHnKHl4DBBfpoV-rCJ0QOauiSsQvn3KqagKFrQesYvWuyTNpu0fWp2QhY4mCXdmWYrSXJk"
    ]
  },
  highlights: [
    { icon: "hiking", text: "Guided Hikes" },
    { icon: "park", text: "Giant Sequoias" },
    { icon: "directions_boat", text: "River Boating" },
    { icon: "photo_camera", text: "Scenic Views" }
  ],
  activities: [
    { title: "Guided Yosemite Hikes", imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk3h0o_SBKzKHEP6XWEAz0NKEHFfBYHFQJM3PwfTOhPlPjtoDJ7Wrt62hxM-urwSB1BkQ66ydYDmin_dru9eeUeBsd46a2O4-Ly7lnQtgmK9mSLWhNGPHkH3DeXsdFgtT-O9sPl3UFY-qF7Irt4YcXzSvCxglTnvl7H1Cvti7u5GuMChs8rjbuOl6zJqoAUeW19L_7MTGO_PiKjs6f6MplWDZ-i-7gYyindiyXAQRR8U6JhMsRMK68AWz3VlYT3he4Sxxn8jEtOZg", description: "Explore famous trails like the Mist Trail and John Muir Trail with our expert guides leading the way.", link: "#" },
    { title: "Mariposa Grove Tour", imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBELK7VvPN2AxkfYhe4im9vNy9b2M7ehxuMV8FZc64xpaX4yuiKf8a3GZVOxoDK0uDPxGYds97pwqKKVBB-IGO_JuS9MfG6McZE5q4BC_tVC8xblHlxdYGg9NL1Gp8PIu5psFIl-ffHy6Dke4Ai7sXPCk6YVIme7hOe6ncolNyASx9nCOc8MNTDDFdpP5J6TCFls6jK-P8jBMaa2uMWrXURZYvE5Dc8Cs71oOSoNSOQWNahdXzZugGagy_2nR2lbcDpAcOULWU-gnw", description: "Stand in awe of the ancient Giant Sequoias, some of the largest living things on Earth.", link: "#" },
    { title: "Merced River Boating", imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAI985wQnmGbBerrBObDQEhdrSvemuHnOgd5PVxn2IVftqWwW6JdrluxERxAF1zokbF2Iy9rWVvPncqI_AEgG_KpB5iDM2sUELxx2WzhNK--z8NFqwoo-EH3wr7LdTGU1PPheW2oV1u7s-Abfpurank3qq8vpcnrHdm9n2cdwEC3kxh9IqO-wcs5gY_ogYGpPOmeBcra7G7jnsC6_r-ncixmBHpsDTFysK6FMZByOnk110_CPFFXxzHOwOAqpVSwnyzuJhgOGshuts", description: "Enjoy a relaxing float or an exciting paddle down the scenic Merced River, offering unique views.", link: "#" },
  ],
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
  const [showReviewForm, setShowReviewForm] = useState(false);
  // --- Hotel Details Section (Inline for simplicity) ---
  const HotelDetails = () => (
    <section className="bg-card-light dark:bg-card-dark p-6 rounded-lg">
      <h3 className="text-2xl font-bold mb-4">Hotel Details: Cozy Mountain Lodge</h3>
      <p className="text-subtext-dark mb-4">Nestled in the heart of Yosemite, offering stunning views and world-class amenities. Enjoy comfort and nature at your doorstep.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* Main Hotel Image */}
          <div className="relative group">
            <img alt="A cozy hotel room with a made bed" className="w-full h-48 object-cover rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvlyucXZ-L50sCPM6wW8YPU2OBk2endd4utLg3a3y_zHRs7GqtM7VK8HGGcQpgPqfy2MTzp8kw-ayRVclGYsHfNoRLZ68oAPVbhM2tcThi6y2nrq-TAHjSudDxR_CNDO7TWskJoZEI6zN4bfW1A-dYaF-hgw2kREvLqk3tiOS_20HmSXTP4G3K2dDCG5k2HPF7XjS45wHnKHl4DBBfpoV-rCJ0QOauiSsQvn3KqagKFrQesYvWuyTNpu0fWp2QhY4mCXdmWYrSXJk" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-between px-2">
              <button className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"><MaterialIcon name="arrow_back_ios" className="text-4xl" /></button>
              <button className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"><MaterialIcon name="arrow_forward_ios" className="text-4xl" /></button>
            </div>
          </div>
          {/* Thumbnails */}
          <div className="flex space-x-2 mt-2">
            {PACKAGE_DATA.gallery.thumbnails.map((src, index) => (
              <img key={index} alt={`Hotel thumbnail ${index + 1}`} className={`w-1/3 h-16 object-cover rounded-md cursor-pointer ${index === 0 ? 'border-2 border-primary' : ''}`} src={src} />
            ))}
          </div>
        </div>
        {/* Amenities */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Amenities</h4>
          <div className="grid grid-cols-2 gap-3 text-sm mb-4">
            {['wifi', 'pool', 'local_parking', 'restaurant', 'fitness_center', 'spa'].map((icon, index) => (
              <span key={index} className="flex items-center">
                <MaterialIcon name={icon} className="text-primary mr-2" />
                {icon.charAt(0).toUpperCase() + icon.slice(1).replace('_', ' ')}
              </span>
            ))}
          </div>
          <h4 className="text-xl font-semibold mb-3">Room Details</h4>
          <p className="text-sm text-subtext-dark">Standard rooms with double beds. Options to upgrade to Deluxe or Suite available.</p>
        </div>
      </div>
    </section>
  );

  // --- Itinerary Section (Inline for simplicity) ---
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

  // --- Hosted By Section (Inline for simplicity) ---
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
          <button className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors">Contact Agent</button>
          <a className="text-center text-primary text-sm font-medium hover:underline" href="#">View All Packages</a>
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

          {/* === Left Column (Main Content) === */}
          <div className="lg:col-span-2 space-y-8">

            {/* Package Gallery & Summary */}
            <section>
              {/* Gallery */}
              <div className="relative">
                <img
                  alt="A stunning view of Yosemite National Park with El Capitan and Half Dome"
                  className="w-full h-[500px] object-cover rounded-lg mb-6"
                  src={PACKAGE_DATA.gallery.mainImage}
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">20% OFF</div>
                <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <button key={i} className={`w-2 h-2 bg-white rounded-full ${i === 1 ? 'opacity-100' : 'opacity-50 hover:opacity-100 focus:opacity-100'}`}></button>
                  ))}
                </div>
              </div>

              {/* Summary */}
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
                  <ActivityCard key={index} {...activity} />
                ))}
              </div>
            </section>

            <HotelDetails />

            <ItineraryAccordion />

            {/* Location & Weather */}
            <section className="bg-card-light dark:bg-card-dark p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Location */}
                <div className="md:col-span-3">
                  <h3 className="text-2xl font-bold mb-4">Location Overview</h3>
                  <p className="text-subtext-dark mb-4">Yosemite National Park, California’s Sierra Nevada jewel, is renowned for its giant sequoias and iconic vistas like Tunnel View, Bridalveil Fall, El Capitan, and Half Dome.</p>
                  <img alt="A stylized map showing mountains and a book" className="w-full h-64 object-cover rounded-lg shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCm8zzgdyEh3625Gs1DQwMQUjeBvl5v2m2OChMuYX6YdvoUK7F3gfon-LgsTeof4zxDUVAUc8GIQ3jMPVIJBB4HNOYPcM3znFpIk--bzcGU2__ljrgpzXgod6B3eCmRK0m8PZrWQYcGVHNvK24EW3MmFH0_XZP9BgZqtsSVj6TDASToofD3LaqsTQdToo__cHrfaG6atiM4mnwcdL0hBPvIeKvJOTR1W-gF2M4bCbNVjRPRJVPjYeeZpnkMQf7Iw2v_rdnP_ZKAfE0" />
                </div>
                {/* Weather */}
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold mb-4">Weather Forecast</h3>
                  <div className="space-y-3">
                    {/* Weather Items */}
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

            {/* Reviews */}
            <section className="bg-card-light dark:bg-card-dark p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Reviews & Ratings</h3>
              <div className="flex items-center mb-6">
                <p className="text-4xl font-bold mr-4">{PACKAGE_DATA.rating.toFixed(1)}</p>
                <div>
                  <StarRating rating={PACKAGE_DATA.rating} />
                  <p className="text-sm text-subtext-dark">Based on {PACKAGE_DATA.reviewCount} reviews</p>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-border-dark pt-6 space-y-6">
                {PACKAGE_DATA.reviews.map((review, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <img alt={`Avatar of ${review.name}`} className="w-12 h-12 rounded-full object-cover" src={review.avatar} />
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <StarRating rating={review.rating} size="sm" />
                      <p className="text-subtext-dark">{review.text}</p>
                    </div>
                  </div>
                ))}
                {/* Button to toggle the form visibility */}
                                <button 
                    className="w-full mt-6 bg-primary/20 text-primary hover:bg-primary hover:text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    onClick={() => setShowReviewForm(prev => !prev)}
                >
                    {/* Change button text based on state */}
                    {showReviewForm ? "Cancel Submission" : "Submit Your Review"}
                </button>

                {/* Conditional Review Form */}
                {showReviewForm && (
                    <div className="mt-6 border border-primary/30 p-4 rounded-lg bg-background-light dark:bg-background-dark">
                        <h4 className="font-semibold mb-3">Share Your Experience</h4>
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                {/* Using a placeholder avatar for the reviewer */}
                                <img alt="Your avatar" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvrlwqCjrlzqS7F_ybxRTku1r7XVLpt5FkQQnYVE2YrsGh0ELhX7GsQGqpmp-ijY9kdIbwmqaJoS6hjeKTwLRETIW2lwEJPLrX9OqO0DWJ8dFT8-IjkyOabq2HdTMIY30BsI7s4fCl72zEGbeNHUKHoqMTlg80jQh11H6LuRuW8puFYy7f75aVKq6eKxvGZE3tZ5Z4C5Srxq49HJD37Bar5lRKzzCMekIUppdnAfM_o7YAv62gnR_nlAfUNWN7zt7H-aPUIHRAdE4" />
                            </div>
                            <div className="flex-grow">
                                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                                    {/* Rating Input */}
                                    <div>
                                        <label className="text-sm font-medium block mb-1 text-text-light dark:text-white">Your Rating:</label>
                                        {/* Dummy Rating Selection */}
                                        <div className="flex items-center space-x-1 text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <MaterialIcon key={i} name="star" className="cursor-pointer text-2xl hover:text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                    {/* Review Textarea */}
                                    <textarea 
                                        className="w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-3 focus:ring-primary focus:border-primary transition-colors text-text-light dark:text-white" 
                                        placeholder="Write your detailed review here..." 
                                        rows="5"
                                    ></textarea>
                                    
                                    <div className="flex justify-end">
                                        <button 
                                            className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors" 
                                            type="submit"
                                            // In a real app, this would submit data. For now, it hides the form.
                                            onClick={() => setShowReviewForm(false)}
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

            {/* Q&A */}
            <section className="bg-card-light dark:bg-card-dark p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Customer Q&A</h3>
              <div className="space-y-6">
                {PACKAGE_DATA.qna.map((item, index) => (
                  <div key={index} className="bg-background-light dark:bg-background-dark p-4 rounded-lg">
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
                  <h4 className="font-semibold mb-3">Ask a Question</h4>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <img alt="Your avatar" className="w-10 h-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvrlwqCjrlzqS7F_ybxRTku1r7XVLpt5FkQQnYVE2YrsGh0ELhX7GsQGqpmp-ijY9kdIbwmqaJoS6hjeKTwLRETIW2lwEJPLrX9OqO0DWJ8dFT8-IjkyOabq2HdTMIY30BsI7s4fCl72zEGbeNHUKHoqMTlg80jQh11H6LuRuW8puFYy7f75aVKq6eKxvGZE3tZ5Z4C5Srxq49HJD37Bar5lRKzzCMekIUppdnAfM_o7YAv62gnR_nlAfUNWN7zt7H-aPUIHRAdE4" />
                    </div>
                    <div className="flex-grow">
                      <form>
                        <textarea className="w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded-lg p-3 focus:ring-primary focus:border-primary transition-colors" placeholder="Type your question here..." rows="3"></textarea>
                        <div className="flex justify-end mt-2">
                          <button className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors" type="submit">Submit</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <HostedByAgent />
          </div>

          {/* === Right Column (Sidebar) === */}
          <div className="lg:col-span-1">
            <BookingSidebar
              price={PACKAGE_DATA.price.toLocaleString()}
              rating={PACKAGE_DATA.rating}
              reviewCount={PACKAGE_DATA.reviewCount}
            />
          </div>

          {/* === Full Width Bottom Section (Similar Packages) === */}
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