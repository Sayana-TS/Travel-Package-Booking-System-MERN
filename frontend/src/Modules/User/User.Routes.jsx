import { Route } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import UserHomePage from "./Pages/UserHomePage";
import PackagesPage from "./Pages/PackagesPage";
import PackageDetailPage from "./Pages/PackageDetailPage";
import BookingPage from "./Pages/BookingPage";
import BookingConfirmationPage from "./Pages/BookingConfirmationPage";
import BookingHistoryPage from "./Pages/BookingHistoryPage";
import BookingDetailPage from "./Pages/BookingDetailPage";

export const userRoutes = (
  <>
    <Route path="/login" element={<AuthPage />} />
    <Route path="/register" element={<AuthPage />} />
    <Route path="/" element={<UserHomePage />} />
    <Route path="/packages" element={<PackagesPage />} />
    <Route path="/packageDetail" element={<PackageDetailPage/>} />
    <Route path="/booking" element={<BookingPage/>} />
    <Route path="/bookingConfirm" element={<BookingConfirmationPage/>} />
    <Route path="/bookingHistory" element={<BookingHistoryPage/>} />
    <Route path="/bookingDetail" element={<BookingDetailPage/>} />
  </>
);
