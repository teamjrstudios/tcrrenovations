"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import AboutSection from "@/components/about";

const HeroSection = () => {
    const nextSectionRef = React.useRef<HTMLElement | null>(null);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const fadeInUp = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <>
            <section className="relative overflow-hidden bg-emerald-950 min-h-screen">
                {/* Background image with overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero.jpg"
                        alt="Beautiful kitchen renovation by TCR Renovations"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 to-emerald-900/75 mix-blend-multiply" />
                </div>

                {/* Content container */}
                <div className="container relative z-10 mx-auto px-4 md:px-6 h-screen flex items-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Left column with text content */}
                        <motion.div
                            className="max-w-xl"
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            {/* Trust indicators */}
                            <motion.div
                                className="flex flex-wrap gap-4 mb-6"
                                variants={fadeInUp}
                            >
                                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
                                    <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
                                    <span className="text-sm text-white font-medium">Licensed & Insured</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
                                    <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
                                    <span className="text-sm text-white font-medium">15+ Years Experience</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
                                    <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
                                    <span className="text-sm text-white font-medium">5-Star Rated</span>
                                </div>
                            </motion.div>

                            {/* Main headline */}
                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
                                variants={fadeInUp}
                            >
                                From Outdated to <span className="text-emerald-400">Outstanding</span>: Renovations That Inspire
                            </motion.h1>

                            {/* Subheadline */}
                            <motion.p
                                className="text-xl text-emerald-100 mb-8"
                                variants={fadeInUp}
                            >
                                Southampton's premier renovation team, delivering expert craftsmanship, transparent pricing, and stunning transformations for your home.
                            </motion.p>

                            {/* CTA buttons */}
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4"
                                variants={fadeInUp}
                            >
                                <Button
                                    size="lg"
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-6 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-900/30"
                                >
                                    Get a Free Quote
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>

                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-emerald-500/50 text-emerald-100 hover:bg-white bg-emerald-800 font-medium px-8 py-6 rounded-xl transition-all duration-300"
                                >
                                    View Our Portfolio
                                </Button>
                            </motion.div>

                            {/* Testimonial snippet */}
                            <motion.div
                                className="mt-10 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-emerald-800/50 max-w-md"
                                variants={fadeInUp}
                            >
                                <div className="flex gap-2 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-white italic text-sm">"TCR completely transformed our outdated kitchen into a modern masterpiece. Their attention to detail and quality craftsmanship exceeded our expectations!"</p>
                                <p className="text-emerald-300 text-sm mt-2 font-medium">— Jennifer R., Southampton</p>
                            </motion.div>
                        </motion.div>

                        {/* Right column with before/after slider on desktop only */}
                        <motion.div
                            className="hidden lg:block relative h-[500px] w-full rounded-xl overflow-hidden shadow-2xl"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            {/* This would ideally be a before/after slider component */}
                            <div className="relative h-full w-full">
                                <div className="absolute inset-0 flex">
                                    <div className="w-1/2 h-full relative">
                                        <Image
                                            src="/before.jpg"
                                            alt="Before renovation"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center py-2">
                                            Before
                                        </div>
                                    </div>
                                    <div className="w-1/2 h-full relative">
                                        <Image
                                            src="/after.jpg"
                                            alt="After renovation"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-emerald-800/70 text-white text-center py-2">
                                            After
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <AboutSection nextRef={nextSectionRef} />
        </>
    );
};

export default HeroSection;