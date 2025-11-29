import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedListingsData from "@/components/home/FeaturedListingsData";
import BenefitsSection from "@/components/home/BenefitsSection";

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <FeaturedListingsData />
      <BenefitsSection />
    </Layout>
  );
};

export default Home;
