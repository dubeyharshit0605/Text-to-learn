import { Routes, Route } from "react-router";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Course from "./pages/Course";
import Lesson from "./pages/Lesson";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/course/:id"
            element={
              <ProtectedRoute>
                <Course />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lesson/:id"
            element={
              <ProtectedRoute>
                <Lesson />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;