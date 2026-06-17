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

      {/* Content layer rises over the fixed walkthrough canvas. Backgrounds are
          translucent so the house reads as a transparent hero behind the site
          rather than a hard cut to a separate page. */}
      <div id="site-content" style={{ position: "relative", zIndex: 20 }}>
        <WhatYouAreSeeing />
        <HowItWorks />
        <Pricing />
        <Enquire />
        <Footer />
      </div>
    </main>
  );
}
