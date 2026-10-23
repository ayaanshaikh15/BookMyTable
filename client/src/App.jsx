import { BrowserRouter, Routes, Route } from "react-router-dom";

// Customer
import Discover from "./pages/Discover";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import MyBookings from "./pages/MyBookings";

// Owner
import OwnerDashboard from "./pages/owner/Dashboard";

import OwnerRestaurant from "./pages/owner/Restaurant";
import OwnerTables from "./pages/owner/Tables";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";
import AdminRestaurants from "./pages/admin/Restaurants";


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
import ForgetPassword from "./components/ForgetPassword";
import { GuestRoute } from "./components/GuestRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
      <Route
  path="/login"
  element={
    <GuestRoute>
      <Login />
    </GuestRoute>
  }
/>

<Route
  path="/signup"
  element={
    <GuestRoute>
      <Signup />
    </GuestRoute>
  }
/>
        <Route path="/forgot-password" element={<ForgetPassword />} />
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
            <Route path="restaurant" element={<OwnerRestaurant />} />
            <Route path="tables" element={<OwnerTables />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="restaurants" element={<AdminRestaurants />} />
           </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
