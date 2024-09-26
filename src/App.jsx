// src/App.js or wherever you define your routes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import ListedBooks from "./Pages/Listedbooks.jsx";
import ProtectedRoute from "./components/custom/Protected.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Home from "./Pages/Home.jsx";
import ProfilePage from "./Pages/Profile.jsx";
import Register from "./Pages/Register.jsx";
import { Toaster } from "sonner";

function App() {
  return (
    <AuthProvider>
      <Toaster richColors closeButton />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route
            path='/listed-books'
            element={<ProtectedRoute element={<ListedBooks />} />}
          />
          <Route
            path='/profile'
            element={<ProtectedRoute element={<ProfilePage />} />}
          />
          {/* <Route path='/listed-books' element={<ListedBooks />} /> */}
          {/* <Route path='/profile' element={<ProfilePage />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
