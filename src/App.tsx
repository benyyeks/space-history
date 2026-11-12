import { Routes, Route } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LandingPage } from "@/pages/LandingPage";
import { MarsHub } from "@/pages/MarsHub";
import { LunarHub } from "@/pages/LunarHub";
import { MissionPage } from "@/pages/MissionPage";

export default function App() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mars-exploration" element={<MarsHub />} />
        <Route path="/lunar-exploration" element={<LunarHub />} />
        <Route path="/missions/:slug" element={<MissionPage />} />
      </Routes>
      <SiteFooter />
    </div>
  );
}
