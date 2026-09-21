import { BrowserRouter, Routes, Route } from "react-router-dom";

// Customer
import Discover from "./pages/Discover";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import MyBookings from "./pages/MyBookings";

// Owner
import OwnerDashboard from "./pages/owner/Dashboard";
import OwnerBookings from "./pages/owner/Bookings";
import OwnerRestaurant from "./pages/owner/Restaurant";
import OwnerTables from "./pages/owner/Tables";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminRestaurants from "./pages/admin/Restaurants";
import AdminBookings from "./pages/admin/Bookings";

// Layouts
import CustomerLayout from "./layouts/CustomerLayout";
import OwnerLayout from "./layouts/OwnerLayout";
import AdminLayout from "./layouts/AdminLayout";

// Protection
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ConfirmReservation from "./pages/ConfirmReservation";
import BookingSucess from "./components/BookingSucess";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Customer */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Discover />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:id" element={<RestaurantDetails />} />

          <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/confirm-reservation" element={<ConfirmReservation />}/>
            <Route path="/booking-success" element={<BookingSucess />}/>
          </Route>
        </Route>

        {/* Owner */}
        <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
          <Route path="/owner" element={<OwnerLayout />}>
            <Route path="dashboard" element={<OwnerDashboard />} />
            <Route path="bookings" element={<OwnerBookings />} />
            <Route path="restaurant" element={<OwnerRestaurant />} />
            <Route path="tables" element={<OwnerTables />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="restaurants" element={<AdminRestaurants />} />
            <Route path="bookings" element={<AdminBookings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
