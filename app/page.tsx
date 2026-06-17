import Navbar from "@/components/Navbar";
import WalkthroughPlayer from "@/components/WalkthroughPlayer";
import WhatYouAreSeeing from "@/components/WhatYouAreSeeing";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Enquire from "@/components/Enquire";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "#0A0A0A" }}>
      <Navbar />

      {/* Scroll-scrubbed cinematic walkthrough — provides its own scroll height */}
      <WalkthroughPlayer />

      {/* Content layer scrolls up over the fixed walkthrough canvas */}
      <div style={{ position: "relative", zIndex: 20, background: "#0A0A0A" }}>
        <WhatYouAreSeeing />
        <HowItWorks />
        <Pricing />
        <Enquire />
        <Footer />
      </div>
    </main>
  );
}
