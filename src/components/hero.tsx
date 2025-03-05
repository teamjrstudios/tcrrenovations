"use client"
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimation, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import AboutSection from "@/components/about";

const HeroSection = () => {
    const controls = useAnimation();
    const ref = useRef(null);
    const heroContainerRef = useRef(null);
    const isInView = useInView(ref, { once: true });
    const nextSectionRef = useRef<HTMLElement | null>(null);
    // For sticky scroll effect
    const { scrollYProgress } = useScroll({
        target: heroContainerRef,
        offset: ["start start", "end start"]
    });

    // Transform values for fade effects
    const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const heroOpacity = useTransform(scrollYProgress, [0.75, 0.95], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0.8, 0.95], [1, 0.92]);

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [controls, isInView]);

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
        hidden: { y: 60, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9],
            },
        },
    };

    const gradientBackgroundVariants = {
        hidden: { opacity: 0, scale: 1.2 },
        visible: {
            opacity: 0.8,
            scale: 1,
            transition: {
                duration: 2,
                ease: [0.25, 0.25, 0.25, 0.75],
            },
        },
    };

    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: "easeInOut",
                delay: 0.3,
            },
        },
    };

    const shapeVariants = {
        hidden: { opacity: 0, scale: 0.4, rotate: -20 },
        visible: {
            opacity: 0.15,
            scale: 1,
            rotate: 0,
            transition: {
                duration: 1.2,
                ease: [0.34, 1.56, 0.64, 1],
            },
        },
    };

    const floatingAnimation = {
        y: [0, -10, 0],
        transition: {
            y: {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }
        }
    };


    return (
        <>
        <div ref={heroContainerRef} className="relative h-[200vh]">
            {/* Sticky container */}
            <motion.section
                ref={ref}
                className="sticky top-0 min-h-screen overflow-hidden bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-900 flex items-center justify-center z-10"
                style={{
                    opacity: heroOpacity,
                    scale: heroScale,
                }}
            >
                {/* Dynamic background elements */}
                <motion.div
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-600/20 via-emerald-800/30 to-transparent"
                    variants={gradientBackgroundVariants}
                    initial="hidden"
                    animate={controls}
                />

                {/* Decorative shapes */}
                <motion.div
                    className="absolute -top-20 right-20 w-96 h-96 bg-gradient-to-br from-lime-300 to-green-500 rounded-full blur-3xl"
                    variants={shapeVariants}
                    initial="hidden"
                    animate={controls}
                />

                <motion.div
                    className="absolute -bottom-32 -left-16 w-80 h-80 bg-gradient-to-tr from-emerald-400 to-green-300 rounded-full blur-3xl"
                    variants={shapeVariants}
                    initial="hidden"
                    animate={controls}
                />

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10" />

                {/* Content Container */}
                <div className="container relative z-10 px-4 mx-auto max-w-6xl">
                    <motion.div
                        className="flex flex-col items-center text-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate={controls}
                        style={{ opacity: textOpacity }}
                    >
                        {/* Pre-heading */}
                        <motion.div
                            className="inline-flex items-center justify-center mb-4 px-4 py-1.5 bg-green-600/20 border border-green-500/30 rounded-full text-green-200 text-sm font-medium backdrop-blur-sm"
                            variants={fadeInUp}
                        >
                            <span className="inline-block w-2 h-2 mr-2 bg-lime-400 rounded-full animate-pulse"></span>
                            Sustainable Construction Solutions
                        </motion.div>

                        {/* Main heading with animated SVG underline */}
                        <motion.h1
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
                            variants={fadeInUp}
                        >
                            Building
                            <span className="bg-gradient-to-r from-lime-300 via-green-300 to-emerald-400 bg-clip-text text-transparent"> Green </span>
                            Futures
                        </motion.h1>

                        <div className="relative w-64 h-8 mb-8">
                            <svg width="100%" height="100%" viewBox="0 0 300 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <motion.path
                                    d="M8 21C49.3333 8.33333 149.2 -5.4 292 21"
                                    stroke="url(#paint0_linear)"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    variants={pathVariants}
                                    initial="hidden"
                                    animate={controls}
                                />
                                <defs>
                                    <linearGradient id="paint0_linear" x1="8" y1="16" x2="292" y2="16" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#84cc16" />
                                        <stop offset="0.5" stopColor="#4ade80" />
                                        <stop offset="1" stopColor="#10b981" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>

                        {/* Subheadline */}
                        <motion.p
                            className="text-xl text-emerald-100 mb-10 max-w-3xl mx-auto font-light"
                            variants={fadeInUp}
                        >
                            Transforming spaces with innovative design and sustainable construction practices.
                            Building with integrity, precision, and a commitment to environmental responsibility.
                        </motion.p>

                        {/* Animated dots */}
                        <motion.div
                            className="flex justify-center space-x-1 mb-8"
                            variants={fadeInUp}
                        >
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 rounded-full bg-lime-400"
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                            variants={fadeInUp}
                        >
                            <Button
                                size="lg"
                                className="relative overflow-hidden group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium px-8 py-6 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-700/30"
                            >
                                    <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                                Start Your Project
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="border-green-400/30 text-green-100 hover:bg-green-900/30 font-medium px-8 py-6 rounded-xl transition-all duration-300 backdrop-blur-sm bg-black"
                            >
                                Explore Our Services
                            </Button>
                        </motion.div>

                        {/* Awards & Recognition */}
                        <motion.div
                            className="mt-16 px-6 py-4 bg-gradient-to-r from-emerald-900/50 to-green-900/50 border border-emerald-800/50 rounded-2xl backdrop-blur-md"
                            variants={fadeInUp}
                        >
                            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-lime-300/20 flex items-center justify-center">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 15L8.5 9.5L15.5 9.5L12 15Z" fill="#a3e635" />
                                        </svg>
                                    </div>
                                    <span className="text-green-200 text-sm font-medium">LEED Certified</span>
                                </div>
                                <div className="w-px h-6 bg-green-700/50"></div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-lime-300/20 flex items-center justify-center">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 15L8.5 9.5L15.5 9.5L12 15Z" fill="#a3e635" />
                                        </svg>
                                    </div>
                                    <span className="text-green-200 text-sm font-medium">Top Builder 2024</span>
                                </div>
                                <div className="w-px h-6 bg-green-700/50"></div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-lime-300/20 flex items-center justify-center">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 15L8.5 9.5L15.5 9.5L12 15Z" fill="#a3e635" />
                                        </svg>
                                    </div>
                                    <span className="text-green-200 text-sm font-medium">15+ Years Experience</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Animated Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 0.6 }}
                    style={{ opacity: textOpacity }}
                >
                    <motion.div
                        animate={floatingAnimation}
                        className="flex flex-col items-center"
                    >
                        <span className="text-xs text-green-300 mb-2 uppercase tracking-widest">Scroll Down</span>
                        <div className="w-10 h-10 rounded-full border border-green-400/30 flex items-center justify-center">
                            <ChevronDown className="text-green-400 h-5 w-5" />
                        </div>
                    </motion.div>
                </motion.div>
            </motion.section>

            {/*
        This transparent div creates space for scroll-triggered effects.
        The hero section has height: 200vh which means it takes twice the viewport height in the document flow.
        The sticky positioning keeps the visual part fixed at the top during this scroll distance.
      */}
            <div className="h-screen w-full" />
        </div>
    {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
    {/* @ts-expect-error */}
    <AboutSection nextRef={nextSectionRef} />
    </>
    );
};

export default HeroSection;