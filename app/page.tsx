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

      {/* Fixed cinematic walkthrough sits behind the scrolling content */}
      <WalkthroughPlayer />

      {/* Spacer reveals the fixed walkthrough before content scrolls over it */}
      <div style={{ height: "100vh" }} aria-hidden />

      {/* Content layer scrolls up over the fixed player */}
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
