import { useEffect } from "react";
import "@/App.css";
import { SCHEDULE_ORDER_URL, BERGEN_SITE_URL, NEW_BRIDGE_SITE_URL } from "@/lib/brand";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";

function RedirectToExternalBooking() {
  useEffect(() => {
    window.location.replace(SCHEDULE_ORDER_URL);
  }, []);
  return (
    <div className="container-pad py-14 text-center text-slate-600 text-sm">
      Opening our booking partner…
    </div>
  );
}

function RedirectToBergen() {
  useEffect(() => {
    window.location.replace(BERGEN_SITE_URL);
  }, []);
  return (
    <div className="container-pad py-14 text-center text-slate-600 text-sm">
      Redirecting to Bergen Laundry Service…
    </div>
  );
}

function RedirectToNewBridge() {
  useEffect(() => {
    window.location.replace(NEW_BRIDGE_SITE_URL);
  }, []);
  return (
    <div className="container-pad py-14 text-center text-slate-600 text-sm">
      Redirecting to New Bridge Laundromat…
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <Toaster position="top-right" richColors />
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/bergen-laundry-service" element={<RedirectToBergen />} />
            {/* Legacy WordPress on same host: singhlaundry.com/bergenlaundryservice-com/ */}
            <Route path="/bergenlaundryservice-com" element={<RedirectToBergen />} />
            <Route path="/bergenlaundryservice-com/*" element={<RedirectToBergen />} />
            <Route path="/new-bridge-laundromat" element={<RedirectToNewBridge />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/schedule-pickup"
              element={<RedirectToExternalBooking />}
            />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/locations" element={<Navigate to="/services" replace />} />
            <Route
              path="/services/self-service"
              element={<Navigate to="/services#self-serve" replace />}
            />
            <Route
              path="/services/wash-fold"
              element={<Navigate to="/services#wash-fold" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </div>
  );
}
