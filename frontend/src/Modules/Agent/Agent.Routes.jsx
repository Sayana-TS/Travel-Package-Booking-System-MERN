import { Route } from "react-router-dom";
import AgentOnboarding from "./Pages/AgentOnboarding";
import AgentDashboard from "./Pages/AgentDashboard";
import ManageHotels from "./Pages/ManageHotels";
import HotelDetailsPage from "./Pages/HotelDetailsPage";
import HotelForm from "./Pages/HotelForm";
import RoomManagementPage from "./Pages/RoomManagementPage";
import BookingsManagementPage from "./Pages/BookingManagementPage";
import BookingDetailsPage from "./Pages/BookingDetailPage";
import ManageImagesPage from "./Pages/ManageImagePage";
import ManagePricingPage from "./Pages/ManagePricingPage";
import SupportTicketsPage from "./Pages/SupportTicketsPage";
import MyPackagesPage from "./Pages/MyPackagesPage";

export const agentRoutes = (
  <>
    {/* To be replaced later */}
    <Route path="/agent/onboarding" element={<AgentOnboarding/>} />
    <Route path="/agent" element={<AgentDashboard/>} />
    <Route path="/hotels" element={<ManageHotels/>} />
    <Route path="/hotelDetails" element={<HotelDetailsPage/>} />
    <Route path="/hotels/add" element={<HotelForm/>} />
    <Route path="/agent/hotels/edit/:id" element={<HotelForm/>} />
    <Route path="/agent/rooms" element={<RoomManagementPage/>} />
    <Route path="/agent/bookings" element={<BookingsManagementPage/>} />
    <Route path="/agent/bookings/detail" element={<BookingDetailsPage/>} />
    <Route path="/agent/images" element={<ManageImagesPage/>} />
    <Route path="/agent/pricing" element={<ManagePricingPage/>} />
    <Route path="/agent/tickets" element={<SupportTicketsPage/>} />
    <Route path="/agent/packages" element={<MyPackagesPage/>} />
  </>
);
