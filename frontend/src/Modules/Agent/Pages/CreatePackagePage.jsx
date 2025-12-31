import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AgentLayout from '../../../Shared/layouts/AgentLayout';
import { BasicInfo } from '../Components/BasicInfo';
import { FormSection } from '../Components/FormSection';
import { HotelManager } from '../Components/HotelManager'; 
import { AmenitiesManager } from '../Components/AmentiesManager';
import { ActivitiesManager } from '../Components/ActivitiesManager';
import { ItineraryManager } from '../Components/ItineraryManager';
import { TransportManager } from '../Components/TransportManager';
import { ItemsManager } from '../Components/ItemsManager';
import { LocationManager } from '../Components/LocationManager';
import { WeatherManager } from '../Components/WeatherManager';
import { PricingManager } from '../Components/PricingManager';
import { HighlightsManager } from '../Components/HighlightsManager';
import { TaggingManager } from '../Components/TaggingManager';
import { MediaManager } from '../Components/MediaManager';

const CreatePackagePage = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(isEditMode);
  const [progress, setProgress] = useState(0);

  const [packageData, setPackageData] = useState({
    status: 'pending', // ✅ IMPORTANT
    packageName: "",
    destination: "",
    startDate: "",
    endDate: "",
    travelers: null,
    description: "",
    highlights: ["", "", ""],
    hotels: [],
    amenities: [],
    activities: [],
    itinerary: [],
    transportation: [],
    inclusions: [],
    exclusions: [],
    location: { overview: "", mapUrl: "", latitude: "", longitude: "" },
    weather: { days: [], avgTemp: "", seasonalNotes: "" },
    pricing: {
      basePrice: 0,
      priceType: "Per Person",
      currency: "INR",
      discount: 0,
      validDateRange: "",
      seasonalRates: []
    },
    tags: [],
    media: [],
    thumbnailId: null,
  });

  /* ---------------- FETCH PACKAGE (EDIT MODE) ---------------- */
  useEffect(() => {
    if (!isEditMode) return;

    const fetchPackage = async () => {
      try {
        setIsLoading(true);

        // const response = await api.get(`/packages/${id}`);
        // const data = response.data;

        const data = {
          status: "pending", // change to "active" to test lock
          packageName: "Goa Beach Escape",
          destination: "Goa",
          startDate: 1735689600000,
          endDate: 1736121600000,
          travelers: 2,
          description: "Relaxing beach vacation",
          highlights: ["Beach", "Sunset", "Cruise"],
          hotels: [],
          amenities: [],
          activities: [],
          itinerary: [],
          transportation: [],
          inclusions: [],
          exclusions: [],
          location: { overview: "", mapUrl: "", latitude: "", longitude: "" },
          weather: { days: [], avgTemp: "", seasonalNotes: "" },
          pricing: {
            basePrice: 12000,
            priceType: "Per Person",
            currency: "INR",
            discount: 10,
            seasonalRates: []
          },
          tags: ["beach", "summer"],
          media: [],
          thumbnailId: null,
        };

        setPackageData(data);
      } catch (err) {
        console.error("Failed to fetch package", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackage();
  }, [id, isEditMode]);

  /* ---------------- BLOCK ACTIVE PACKAGE EDIT ---------------- */
  useEffect(() => {
    if (!isEditMode) return;

    if (packageData.status === 'active') {
      navigate('/agent/packages', { replace: true });
    }
  }, [isEditMode, packageData.status, navigate]);

  /* ---------------- VALIDATION ---------------- */
  const validation = {
    basic: !!packageData.packageName && !!packageData.destination,
    highlights:
      !!packageData.description &&
      packageData.highlights.filter(h => h.trim().length > 0).length >= 3,
    tags: packageData.tags.length > 0,
    hotels: packageData.hotels.length > 0 && !!packageData.hotels[0]?.name,
    amenities: packageData.amenities.length > 0,
    activities:
      packageData.activities.length > 0 &&
      packageData.activities.every(a => a.name && a.description && a.duration),
    itinerary:
      packageData.itinerary.length > 0 &&
      packageData.itinerary.every(i => i.title && i.description),
    transport:
      packageData.transportation.length > 0 &&
      !!packageData.transportation[0]?.vehicleType,
    items: packageData.inclusions.length > 0,
    location: !!packageData.location.overview,
    weather:
      packageData.weather.days.length > 0 &&
      !!packageData.weather.days[0]?.temp,
    pricing: packageData.pricing.basePrice > 0,
    media: packageData.media.length > 0 && !!packageData.thumbnailId,
  };

  /* ---------------- PROGRESS ---------------- */
  useEffect(() => {
    const total = Object.values(validation).length;
    const completed = Object.values(validation).filter(Boolean).length;
    setProgress(Math.round((completed / total) * 100));
  }, [validation]);

  /* ---------------- UPDATE HANDLER ---------------- */
  const handleUpdate = (field, value) => {
    setPackageData(prev => ({ ...prev, [field]: value }));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = () => {
    if (isEditMode) {
      console.log("Updating Package:", id, packageData);
      // await api.put(`/packages/${id}`, packageData);
    } else {
      console.log("Creating New Package:", packageData);
      // await api.post('/packages', packageData);
    }
    navigate('/agent/packages');
  };

  /* ---------------- LOADING ---------------- */
  if (isLoading) {
    return (
      <AgentLayout>
        <div className="flex h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        </div>
      </AgentLayout>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <AgentLayout>
      <main className="flex-1 bg-background-light dark:bg-background-dark min-h-screen p-4 md:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">

          <div className="mb-10">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              {isEditMode ? 'Edit Travel Package' : 'Create Travel Package'}
            </h1>

            <div className="mt-6 p-6 bg-white dark:bg-card-dark rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-subtext-dark">
                  Package Completion
                </span>
                <span className="text-primary font-black">{progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 pb-32">
            <FormSection title="Package Basic Info" isCompleted={validation.basic}>
              <BasicInfo data={packageData} update={handleUpdate} />
            </FormSection>

            <FormSection title="Package Description & Highlights" isCompleted={validation.highlights}>
              <HighlightsManager
                description={packageData.description}
                highlights={packageData.highlights}
                update={handleUpdate}
              />
            </FormSection>

            <FormSection title="Tagging & Categorization" isCompleted={validation.tags}>
              <TaggingManager tags={packageData.tags} update={handleUpdate} />
            </FormSection>

            <FormSection title="Hotels & Rooms" isCompleted={validation.hotels}>
              <HotelManager data={packageData.hotels} update={handleUpdate} />
            </FormSection>

            <FormSection title="Amenities" isCompleted={validation.amenities}>
              <AmenitiesManager data={packageData.amenities} update={handleUpdate} />
            </FormSection>

            <FormSection title="Activities / Experiences" isCompleted={validation.activities}>
              <ActivitiesManager data={packageData.activities} update={handleUpdate} />
            </FormSection>

            <FormSection title="Tour Itinerary" isCompleted={validation.itinerary}>
              <ItineraryManager data={packageData.itinerary} update={handleUpdate} />
            </FormSection>

            <FormSection title="Transportation" isCompleted={validation.transport}>
              <TransportManager data={packageData.transportation} update={handleUpdate} />
            </FormSection>

            <FormSection title="Included & Excluded Items" isCompleted={validation.items}>
              <ItemsManager
                inclusions={packageData.inclusions}
                exclusions={packageData.exclusions}
                update={handleUpdate}
              />
            </FormSection>

            <FormSection title="Location Overview & Map" isCompleted={validation.location}>
              <LocationManager data={packageData.location} update={handleUpdate} />
            </FormSection>

            <FormSection title="Weather Forecast" isCompleted={validation.weather}>
              <WeatherManager data={packageData.weather} update={handleUpdate} />
            </FormSection>

            <FormSection title="Pricing & Discounts" isCompleted={validation.pricing}>
              <PricingManager data={packageData.pricing} update={handleUpdate} />
            </FormSection>

            <FormSection title="Images & Gallery" isCompleted={validation.media}>
              <MediaManager
                media={packageData.media}
                thumbnailId={packageData.thumbnailId}
                update={handleUpdate}
              />
            </FormSection>
          </div>
        </div>

        <footer className="fixed bottom-0 left-0 md:left-64 right-0 p-5 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 z-50">
          <div className="max-w-4xl mx-auto flex justify-end gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 rounded-lg font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={progress < 100}
              className={`px-8 py-2.5 rounded-lg font-bold transition-all ${
                progress === 100
                  ? 'bg-primary text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isEditMode ? 'Update Package' : 'Submit Package'}
            </button>
          </div>
        </footer>
      </main>
    </AgentLayout>
  );
};

export default CreatePackagePage;
