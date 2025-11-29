import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedListings from "@/components/home/FeaturedListings";
import BenefitsSection from "@/components/home/BenefitsSection";

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <FeaturedListings />
      <BenefitsSection />
    </Layout>
  );
};

export default Home;
