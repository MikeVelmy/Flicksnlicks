import About from "@/components/About";
import CashNotice from "@/components/CashNotice";
import FAQ from "@/components/FAQ";
import FeaturedItems from "@/components/FeaturedItems";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import LocationHours from "@/components/LocationHours";
import Menu from "@/components/Menu";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedItems />
        <Menu />
        <HowItWorks />
        <CashNotice />
        <LocationHours />
        <Testimonials />
        <About />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
