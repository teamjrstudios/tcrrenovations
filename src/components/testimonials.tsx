"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QuoteIcon, Star, ArrowRight, Building, HomeIcon } from 'lucide-react';

// Expanded testimonials data
const testimonials = [
    {
        id: 1,
        name: "",
        role: "Homeowner",
        company: "Michael Beores",
        image: "/testimonials/1.jpg",
        quote: "Tom is a Great person! Fair, honest and does good work! \n" +
            "I recommend TCR Renovations!",
        rating: 5,
        project: "Kitchen Remodel",
        icon: <HomeIcon className="h-4 w-4" />
    },
    {
        id: 2,
        name: "Michael Townsend",
        role: "Property Manager",
        company: "Bucks County Properties",
        image: "/images/testimonial-2.jpg",
        quote: "We've partnered with TCR on multiple renovation projects, and they consistently deliver exceptional quality on time and within budget. Their project management and craftsmanship are unmatched in Southampton.",
        rating: 5,
        project: "Multi-Unit Renovations",
        icon: <Building className="h-4 w-4" />
    },
    {
        id: 3,
        name: "Sarah Johnson",
        role: "Homeowner",
        company: "",
        image: "/images/testimonial-3.jpg",
        quote: "The renovation of our master bathroom was handled with incredible care. They understood our vision and transformed our outdated bathroom into a spa-like retreat. We're already planning our next project with TCR!",
        rating: 5,
        project: "Bathroom Renovation",
        icon: <HomeIcon className="h-4 w-4" />
    },
    {
        id: 4,
        name: "David Chen",
        role: "Homeowner",
        company: "",
        image: "/images/testimonial-4.jpg",
        quote: "From the initial design consultation to the final walkthrough, the TCR team demonstrated exceptional professionalism. They turned our unfinished basement into an amazing entertainment space while respecting our budget.",
        rating: 5,
        project: "Basement Finishing",
        icon: <HomeIcon className="h-4 w-4" />
    },
    {
        id: 5,
        name: "Emily Rodriguez",
        role: "Homeowner",
        company: "",
        image: "/images/testimonial-5.jpg",
        quote: "TCR Renovations transformed our outdated kitchen into a modern cooking paradise. Their team was professional, clean, and completed the project ahead of schedule. We couldn't be happier with the results.",
        rating: 5,
        project: "Kitchen Renovation",
        icon: <HomeIcon className="h-4 w-4" />
    },
    {
        id: 6,
        name: "Robert Williams",
        role: "Business Owner",
        company: "Williams Family Dentistry",
        image: "/images/testimonial-6.jpg",
        quote: "The TCR team renovated our dental office with minimal disruption to our practice. Their attention to detail and ability to work within healthcare regulations was impressive. Our patients love the new look!",
        rating: 5,
        project: "Commercial Renovation",
        icon: <Building className="h-4 w-4" />
    }
];

// Partner logos remain the same
const partners = [
    { id: 1, name: "Bucks County Home Builders Association", logo: "/images/partner-1.svg" },
    { id: 2, name: "Southampton Chamber of Commerce", logo: "/images/partner-2.svg" },
    { id: 3, name: "Pennsylvania Remodelers Association", logo: "/images/partner-3.svg" },
    { id: 4, name: "Better Business Bureau", logo: "/images/partner-4.svg" },
    { id: 5, name: "Home Advisor", logo: "/images/partner-5.svg" }
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
        icon: React.ReactNode;
    };
    index: number;
}

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="h-full"
        >
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-emerald-100 h-full flex flex-col">
                <div className="mb-4 text-emerald-600">
                    <QuoteIcon className="h-8 w-8 opacity-30" />
                </div>

                <p className="text-base md:text-lg text-emerald-800 mb-6 leading-relaxed flex-grow">
                    &#34;{testimonial.quote}&#34;
                </p>

                <div className="mt-auto">
                    <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < testimonial.rating ? 'fill-emerald-500 text-emerald-500' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>

                    <div className="pt-4 border-t border-emerald-100">
                        <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 rounded-full overflow-hidden">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-semibold text-emerald-950">{testimonial.name}</h4>
                                <div className="flex items-center gap-1 text-sm text-emerald-700">
                                    <span>{testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}</span>
                                    <div className="w-1 h-1 bg-emerald-300 rounded-full mx-1"></div>
                                    <div className="flex items-center gap-1">
                                        {testimonial.icon}
                                        <span>{testimonial.project}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const TestimonialsSection = () => {
    return (
        <section className="py-20 bg-emerald-50 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200 rounded-full opacity-20 blur-3xl transform translate-x-1/2 -translate-y-1/2" />
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
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-2">Client Testimonials</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-4">What Our Clients Say</h2>
                        <p className="text-emerald-700 text-lg">Hear from our satisfied clients about their experiences working with TCR Renovations throughout Southampton and Bucks County.</p>
                    </motion.div>
                </div>

                {/* Testimonials Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                            index={index}
                        />
                    ))}
                </div>

                {/* CTA Button */}
                <div className="text-center mb-16">
                    <Button
                        className="bg-emerald-800 hover:bg-emerald-700 text-white"
                        size="lg"
                    >
                        View More Testimonials <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
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
                        <div className="inline-flex items-center justify-center bg-emerald-100 w-12 h-12 rounded-full mb-4">
                            <Star className="h-6 w-6 fill-emerald-600 text-emerald-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-emerald-950 mb-1">4.9 / 5</h3>
                        <p className="text-emerald-700 mb-2">Average Rating</p>
                        <div className="flex justify-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className="h-4 w-4 fill-emerald-500 text-emerald-500"
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
                        <div className="inline-flex items-center justify-center bg-emerald-100 w-12 h-12 rounded-full mb-4">
                            <Building className="h-6 w-6 text-emerald-700" />
                        </div>
                        <h3 className="text-3xl font-bold text-emerald-950 mb-1">200+</h3>
                        <p className="text-emerald-700">Satisfied Clients</p>
                    </motion.div>

                    <motion.div
                        className="bg-white p-6 rounded-xl border border-emerald-100 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center justify-center bg-emerald-100 w-12 h-12 rounded-full mb-4">
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
                        <div className="h-px w-20 bg-emerald-600 mx-auto"></div>
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