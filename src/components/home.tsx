import { MainHeader } from "./layout/main-header";
import { HeroSection } from "./home/hero-section";
import { FeaturesSection } from "./home/features-section";
import { Footer } from "./layout/footer";

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <MainHeader />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}

export default Home;
