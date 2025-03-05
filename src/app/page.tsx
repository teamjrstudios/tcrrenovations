import React from 'react';
import HeroSection from "@/components/hero";
import ServicesSection from "@/components/services";
import PortfolioSection from "@/components/portfolio";
import TestimonialsSection from "@/components/testimonials";
import Footer from "@/components/footer";

const Home = () => {
    return (
        <div>
          <HeroSection/>

            <ServicesSection/>
            <PortfolioSection/>
            <TestimonialsSection/>
            <Footer/>
        </div>
    );
};

export default Home;
