import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WhySkillMart from "../components/home/WhySkillMart";
import TopSellers from "../components/home/TopSellers";
import HowItWorks from "../components/home/HowItWorks";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import Footer from "../components/home/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <WhySkillMart />
      <TopSellers />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}

export default Home;