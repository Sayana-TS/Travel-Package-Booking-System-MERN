import {Route} from 'react-router-dom'
import AdminDashboard from './Pages/AdminDashboard';
import UserManagement from './Pages/UserManagement';
import PackageManagement from './Pages/PackageManagement';
import BookingsManagementPage from '../Agent/Pages/BookingManagementPage';
import BookingDetailsPage from '../Agent/Pages/BookingDetailPage';
import AdminProfilePage from './Pages/AdminProfilePage';
import SupportTicketsPage from '../Agent/Pages/SupportTicketsPage';

export const adminRoutes = (
  <>
    {/* To be replaced with real pages */}
    <Route path="/admin" element={<AdminDashboard/>} />
    <Route path="/admin/users" element={<UserManagement/>} />
    <Route path="/admin/packages" element={<PackageManagement/>} />
    <Route path="/admin/bookings" element={<BookingsManagementPage role='admin'/>} />
    <Route path="/admin/bookings/detail" element={<BookingDetailsPage role='admin'/>} />
    <Route path="/admin/profile" element={<AdminProfilePage/>} />
    <Route path="/admin/tickets" element={<SupportTicketsPage role='admin'/>} />
  </>
);