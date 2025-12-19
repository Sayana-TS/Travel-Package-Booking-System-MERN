import { useState } from 'react';
import UserLayout from '../layouts/UserLayout';
import SectionTitle from '../Components/SectionTitle';
import HostPackageCard from '../Components/HostPackageCard';
import HostReviewCard from '../Components/HostReviewCard';

// --- Dummy Data ---
const PACKAGES_DATA = [
  { id: 1, img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80", title: "Barcelona City Break", desc: "Explore vibrant city life and iconic landmarks." },
  { id: 2, img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80", title: "Andalusian Adventure", desc: "Discover history from Seville to Granada." },
  { id: 3, img: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80", title: "Catalan Coastline", desc: "Stunning coastal scenery and charming towns." },
  { id: 4, img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80", title: "Pyrenees Expedition", desc: "Adventure through breathtaking mountains." },
];

const REVIEWS_DATA = [
  { id: 1, name: "Clara Bennett", date: "May 15, 2023", rating: 5, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", likes: "12", comment: "Incredible experience! Her knowledge of the city made the trip unforgettable." },
  { id: 2, name: "John Miller", date: "April 2, 2023", rating: 4, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80", likes: "8", comment: "The Andalusian tour was well organized. Elena is a great communicator." },
  { id: 3, name: "Sarah Lee", date: "March 10, 2023", rating: 5, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80", likes: "15", comment: "Best host I've ever had. Every detail was perfect!" },
];

const SOCIALS = [
  { name: 'Instagram', icon: <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" /> },
  { name: 'Facebook', icon: <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z" /> },
  { name: 'Twitter', icon: <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z" /> },
  { name: 'WhatsApp', icon: <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z" /> },
];

const SIMILAR_HOSTS = [
  { id: 1, name: "Mateo Garcia", loc: "Barcelona, Spain", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" },
  { id: 2, name: "Sophia Rossi", loc: "Rome, Italy", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80" },
  { id: 3, name: "Lucas Müller", loc: "Berlin, Germany", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80" },
  { id: 4, name: "Elena V.", loc: "Madrid, Spain", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" },
];

const GALLERY_CONTENT = {
  'Landscapes': [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80"
  ],
  'Activities': [
    "https://images.unsplash.com/photo-1502680399488-6ade6653f26e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80"
  ],
  'Cuisine': [
    "https://images.unsplash.com/photo-1515443961218-1523674a2751?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1534080564503-6ac7ae7a49ca?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80"
  ],
  'Accommodations': [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1551882547-ff43c63ef53e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80"
  ],
};

const HostProfilePage = () => {
  const [activeTab, setActiveTab] = useState('Landscapes');
  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <UserLayout>
      <div className="min-h-screen bg-background-dark flex justify-center py-5 md:py-10 font-display">
        <main className="w-full max-w-[1000px] flex flex-col gap-4 md:gap-8 px-4 sm:px-6 md:px-0">
          
          {/* HOST HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 p-4 bg-card-dark/20 rounded-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24 md:size-32 border-2 border-card-dark" 
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80")' }}
              />
              <div className="flex flex-col">
                <h1 className="text-white text-2xl md:text-3xl font-bold leading-tight">Elena Rodriguez</h1>
                <p className="text-subtext-dark text-base">Verified Host · Based in Barcelona, Spain</p>
                <p className="text-primary text-sm font-semibold mt-1">★ 4.8 · 234 reviews</p>
              </div>
            </div>
            <button className="w-full sm:w-auto flex min-w-[140px] cursor-pointer items-center justify-center rounded-xl h-12 px-6 bg-primary text-white text-sm font-bold hover:opacity-90 transition-all">
              Message Host
            </button>
          </div>

          {/* ALL PACKAGES */}
          <div className="flex flex-col">
            <SectionTitle>All Packages by This Host</SectionTitle>
            <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 snap-x snap-mandatory">
              {PACKAGES_DATA.map(pkg => (
                <div key={pkg.id} className="snap-start">
                  <HostPackageCard {...pkg} />
                </div>
              ))}
            </div>
          </div>

          {/* PHOTO GALLERY */}
          <div className="flex flex-col">
            <SectionTitle>Photo Gallery</SectionTitle>
            <div className="flex overflow-x-auto border-b border-card-dark scrollbar-hide mb-6">
              {Object.keys(GALLERY_CONTENT).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 min-w-[120px] h-11 text-sm font-medium border-b-2 transition-all ${
                    activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-subtext-dark'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {GALLERY_CONTENT[activeTab].map((url, idx) => (
                <div 
                   key={idx} 
                   className="aspect-square bg-cover bg-center rounded-xl bg-card-dark hover:brightness-110 transition-all cursor-pointer shadow-inner" 
                   style={{ backgroundImage: `url("${url}")` }} 
                />
              ))}
            </div>
          </div>

          {/* ABOUT */}
          <div className="flex flex-col">
            <SectionTitle>About the Host</SectionTitle>
            <p className="text-white text-base md:text-lg font-normal leading-relaxed px-4 opacity-90">
              Elena Rodriguez is a passionate travel expert based in Barcelona. With over 10 years of experience, she is committed to providing authentic and responsible travel options across Spain.
            </p>
          </div>

          {/* REVIEWS */}
          <div className="flex flex-col">
            <SectionTitle>Reviews & Ratings</SectionTitle>
            <div className="flex flex-col gap-6 md:gap-8 p-4">
              {REVIEWS_DATA.map(review => (
                <HostReviewCard key={review.id} {...review} />
              ))}
              
              <div className="mt-2">
                <button 
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="w-full flex items-center justify-center rounded-xl h-12 bg-card-dark text-white font-bold hover:bg-white/10 transition-all"
                >
                  {showReviewForm ? 'Cancel' : 'Write a review'}
                </button>
                {showReviewForm && (
                  <div className="mt-4 p-4 rounded-2xl bg-card-dark flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
                    <textarea 
                      className="w-full bg-background-dark border border-white/10 rounded-xl p-4 text-white outline-none focus:border-primary transition-colors" 
                      placeholder="Share your experience with Elena..." 
                      rows="4" 
                    />
                    <button className="bg-primary text-white font-bold h-12 rounded-xl hover:brightness-110">Post Review</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CONTACT & SOCIAL LINKS */}
          <div className="flex flex-col">
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 font-display">
              Contact & Social Links
            </h2>
            <div className="flex justify-stretch">
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
                <button className="flex-1 sm:flex-none min-w-[140px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary text-white text-sm font-bold tracking-[0.015em] hover:opacity-90">
                  <span className="truncate">Message Host</span>
                </button>
                <button className="flex-1 sm:flex-none min-w-[140px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-card-dark text-white text-sm font-bold tracking-[0.015em] hover:bg-white/10">
                  <span className="truncate">Email</span>
                </button>
              </div>
            </div>

            <div className="@container">
              <div className="gap-2 px-4 flex flex-wrap justify-start">
                {SOCIALS.map((social) => (
                  <div key={social.name} className="flex flex-col items-center gap-2 bg-transparent py-2.5 text-center w-20 group cursor-pointer">
                    <div className="rounded-full bg-card-dark p-2.5 group-hover:bg-primary group-hover:scale-110 transition-all">
                      <div className="text-white">
                        <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px">
                          {social.icon}
                        </svg>
                      </div>
                    </div>
                    <p className="text-white text-xs md:text-sm font-medium opacity-80 group-hover:opacity-100">{social.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIMILAR HOSTS */}
          <div className="flex flex-col pb-10">
            <SectionTitle>Other hosts in Barcelona</SectionTitle>
            <div className="flex overflow-x-auto scrollbar-hide px-4 gap-6 snap-x">
              {SIMILAR_HOSTS.map((host) => (
                <div key={host.id} className="flex flex-col gap-3 min-w-[160px] cursor-pointer group snap-start">
                  <div 
                    className="w-full aspect-square bg-cover rounded-2xl group-hover:brightness-110 group-hover:scale-[1.02] transition-all border border-card-dark shadow-lg" 
                    style={{ backgroundImage: `url("${host.img}")` }} 
                  />
                  <div>
                    <p className="text-white text-base font-semibold group-hover:text-primary transition-colors">{host.name}</p>
                    <p className="text-subtext-dark text-sm">{host.loc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </UserLayout>
  );
};

export default HostProfilePage;