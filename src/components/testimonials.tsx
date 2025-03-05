"use client";
import React, {useState, useEffect, JSX} from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QuoteIcon, Star, ArrowLeft, ArrowRight, Building, HomeIcon } from 'lucide-react';

// Testimonial data
const testimonials = [
    {
        id: 1,
        name: "Jennifer Richards",
        role: "Homeowner",
        company: "",
        image: "/images/testimonial-1.jpg",
        quote: "Working with this team on our custom home was a dream. Their attention to detail and communication throughout the process exceeded our expectations. Our forever home is even more beautiful than we imagined.",
        rating: 5,
        project: "Custom Home Construction",
        icon: <HomeIcon className="h-4 w-4" />
    },
    {
        id: 2,
        name: "Michael Townsend",
        role: "Operations Director",
        company: "Meridian Properties",
        image: "/images/testimonial-2.jpg",
        quote: "We've partnered with this construction company on multiple commercial projects, and they consistently deliver exceptional quality on time and within budget. Their project management is unmatched in the industry.",
        rating: 5,
        project: "Office Complex Development",
        icon: <Building className="h-4 w-4" />
    },
    {
        id: 3,
        name: "Sarah Johnson",
        role: "Restaurant Owner",
        company: "Harvest Table",
        image: "/images/testimonial-3.jpg",
        quote: "The renovation of our restaurant space was handled with incredible care. They understood our vision and worked diligently to minimize disruption to our business. The results transformed our space completely.",
        rating: 5,
        project: "Commercial Renovation",
        icon: <Building className="h-4 w-4" />
    },
    {
        id: 4,
        name: "David Chen",
        role: "Homeowner",
        company: "",
        image: "/images/testimonial-4.jpg",
        quote: "From the initial design consultation to the final walkthrough, this team demonstrated exceptional professionalism. They turned our outdated property into a modern, energy-efficient home while respecting our budget.",
        rating: 5,
        project: "Home Renovation",
        icon: <HomeIcon className="h-4 w-4" />
    }
];

// Partner logos
const partners = [
    { id: 1, name: "Architectural Digest", logo: "/images/partner-1.svg" },
    { id: 2, name: "BuildCon Association", logo: "/images/partner-2.svg" },
    { id: 3, name: "Green Building Council", logo: "/images/partner-3.svg" },
    { id: 4, name: "Construction Excellence", logo: "/images/partner-4.svg" },
    { id: 5, name: "Urban Development Institute", logo: "/images/partner-5.svg" }
];
interface TestimonialCardProps {
    testimonial: {
        id: number;
        name: string;
        role: string;
        company?: string;
        image: string;
        quote: string;
        rating: number;
        project: string;
        icon: JSX.Element;
    };
    isActive: boolean;
}

const TestimonialCard = ({ testimonial, isActive }: TestimonialCardProps) => {
    return (
        <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.9,
                x: isActive ? 0 : 100
            }}
            exit={{ opacity: 0, scale: 0.9, x: -100 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-emerald-100 h-full flex flex-col">
                <div className="mb-6 text-emerald-600">
                    <QuoteIcon className="h-10 w-10 opacity-30" />
                </div>

                <p className="text-lg md:text-xl text-emerald-800 mb-8 leading-relaxed flex-grow">
                    &#34;{testimonial.quote}&#34;
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative h-14 w-14 rounded-full overflow-hidden">
                            <Image
                                src={testimonial.image}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h4 className="font-semibold text-emerald-950">{testimonial.name}</h4>
                            <p className="text-sm text-emerald-700">{testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < testimonial.rating ? 'fill-lime-500 text-lime-500' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-emerald-100 flex items-center gap-2">
                    {testimonial.icon}
                    <span className="text-sm text-emerald-700">{testimonial.project}</span>
                </div>
            </div>
        </motion.div>
    );
};

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);

    // Autoplay functionality
    useEffect(() => {
        if (!isAutoplay) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [isAutoplay]);

    // Pause autoplay on hover
    const handleMouseEnter = () => setIsAutoplay(false);
    const handleMouseLeave = () => setIsAutoplay(true);

    // Navigation functions
    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    return (
        <section className="py-20 bg-emerald-50 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-lime-200 rounded-full opacity-20 blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-200 rounded-full opacity-20 blur-3xl transform -translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 md:px-6">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <Badge className="bg-lime-100 text-emerald-700 hover:bg-lime-100 mb-2">Client Testimonials</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-4">What Our Clients Say</h2>
                        <p className="text-emerald-700 text-lg">Hear from our satisfied clients about their experiences working with our team on various construction projects.</p>
                    </motion.div>
                </div>

                {/* Testimonials Carousel */}
                <div
                    className="max-w-4xl mx-auto relative h-96 md:h-80 mb-16"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <AnimatePresence mode="wait">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard
                                key={testimonial.id}
                                testimonial={testimonial}
                                isActive={index === currentIndex}
                            />
                        ))}
                    </AnimatePresence>

                    {/* Navigation controls */}
                    <div className="absolute -bottom-12 left-0 right-0 flex items-center justify-between">
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full border-emerald-200 text-emerald-700 hover:bg-lime-100 hover:text-emerald-800"
                                onClick={goToPrev}
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full border-emerald-200 text-emerald-700 hover:bg-lime-100 hover:text-emerald-800"
                                onClick={goToNext}
                            >
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex gap-1.5">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-8 h-2 rounded-full transition-colors ${
                                        index === currentIndex ? 'bg-lime-500' : 'bg-emerald-200 hover:bg-emerald-300'
                                    }`}
                                    onClick={() => setCurrentIndex(index)}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Review Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
                    <motion.div
                        className="bg-white p-6 rounded-xl border border-emerald-100 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center justify-center bg-lime-100 w-12 h-12 rounded-full mb-4">
                            <Star className="h-6 w-6 fill-lime-500 text-lime-500" />
                        </div>
                        <h3 className="text-3xl font-bold text-emerald-950 mb-1">4.9 / 5</h3>
                        <p className="text-emerald-700 mb-2">Average Rating</p>
                        <div className="flex justify-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className="h-4 w-4 fill-lime-500 text-lime-500"
                                />
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-white p-6 rounded-xl border border-emerald-100 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center justify-center bg-lime-100 w-12 h-12 rounded-full mb-4">
                            <Building className="h-6 w-6 text-emerald-700" />
                        </div>
                        <h3 className="text-3xl font-bold text-emerald-950 mb-1">150+</h3>
                        <p className="text-emerald-700">Satisfied Clients</p>
                    </motion.div>

                    <motion.div
                        className="bg-white p-6 rounded-xl border border-emerald-100 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center justify-center bg-lime-100 w-12 h-12 rounded-full mb-4">
                            <HomeIcon className="h-6 w-6 text-emerald-700" />
                        </div>
                        <h3 className="text-3xl font-bold text-emerald-950 mb-1">95%</h3>
                        <p className="text-emerald-700">Referral Rate</p>
                    </motion.div>
                </div>

                {/* Partner logos */}
                <div className="mt-20">
                    <div className="text-center mb-10">
                        <h3 className="text-lg font-medium text-emerald-800 mb-2">Trusted By Industry Leaders</h3>
                        <div className="h-px w-20 bg-lime-500 mx-auto"></div>
                    </div>

                    <motion.div
                        className="flex flex-wrap justify-center items-center gap-10 md:gap-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        {partners.map((partner) => (
                            <div key={partner.id} className="w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;