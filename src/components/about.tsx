"use client"
import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Award, Clock, Users } from 'lucide-react';
interface AboutSectionProps {
    nextRef: React.RefObject<HTMLElement>;
}

const AboutSection = ({nextRef}: AboutSectionProps) => {

    const isInView = useInView(nextRef, { once: false, amount: 0.3 });

    const { scrollYProgress } = useScroll({
        target: nextRef,
        offset: ["start end", "end start"]
    });

    // Parallax effects
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3, 1], [0, 1, 1, 1]);

    // Content animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
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
        <section ref={nextRef} className="relative py-16 md:py-24 overflow-hidden bg-white">
            {/* Decorative elements */}
            <div className="absolute -top-16 left-0 w-full h-32 bg-gradient-to-b from-emerald-900/20 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-32 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-lime-500/20 via-transparent to-transparent opacity-70 pointer-events-none" />

            {/* Transition element from hero section */}
            <motion.div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10 w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <motion.div
                    className="text-lime-500"
                    animate={{
                        y: [0, 5, 0],
                        rotateZ: [0, 5, 0, -5, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                    <Award size={40} />
                </motion.div>
            </motion.div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image column with parallax effect */}
                    <motion.div
                        className="relative order-2 lg:order-1"
                        style={{ y, opacity }}
                    >
                        <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
                            <div className="absolute inset-0 bg-gradient-to-tr from-lime-500/20 to-emerald-900/20 mix-blend-multiply z-10 rounded-xl" />
                            <Image
                                src="/team.jpeg"
                                alt="Our professional team"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded-xl"
                            />
                        </div>

                        {/* Floating certification badge */}
                        <motion.div
                            className="absolute -right-6 md:right-8 bottom-8 bg-white p-4 rounded-lg shadow-xl z-20 flex items-center gap-3"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <div className="bg-lime-100 p-2 rounded-full">
                                <Award className="h-8 w-8 text-amber-500" />
                            </div>
                            <div>
                                <p className="font-semibold text-emerald-950">Certified Excellence</p>
                                <p className="text-sm text-emerald-800">Industry Recognized</p>
                            </div>
                        </motion.div>

                        {/* Experience badge */}
                        <motion.div
                            className="absolute left-6 top-10 bg-emerald-900 text-white p-4 rounded-lg shadow-xl z-20 flex items-center gap-3"
                            initial={{ scale: 0.8, opacity: 0, x: -20 }}
                            animate={isInView ? { scale: 1, opacity: 1, x: 0 } : { scale: 0.8, opacity: 0, x: -20 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <div className="bg-lime-500/20 p-2 rounded-full">
                                <Clock className="h-8 w-8 text-amber-500" />
                            </div>
                            <div>
                                <p className="font-semibold text-white">15+ Years</p>
                                <p className="text-sm text-emerald-100">Of Experience</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Content column */}
                    <motion.div
                        className="lg:order-2 order-1"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <motion.div variants={itemVariants}>
                            <Badge className="bg-lime-100 text-emerald-700 hover:bg-lime-100 mb-2">About Us</Badge>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Building Excellence With Passion & Precision</h2>
                        </motion.div>

                        <motion.p
                            className="text-slate-600 mb-6"
                            variants={itemVariants}
                        >
                            Founded in 2008, we&#39;ve built our reputation on a foundation of quality craftsmanship, integrity, and exceptional client service. Our team of industry experts brings decades of collective experience to every project, ensuring superior results that stand the test of time.
                        </motion.p>

                        <motion.p
                            className="text-slate-600 mb-8"
                            variants={itemVariants}
                        >
                            We believe in transparent communication, meticulous attention to detail, and delivering on our promises. From residential renovations to commercial developments, we approach each project with the same level of dedication and excellence.
                        </motion.p>

                        {/* USP Section */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                            variants={itemVariants}
                        >
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 bg-lime-100 p-2 rounded-full">
                                    <Users className="h-5 w-5 text-emerald-700" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Expert Team</h3>
                                    <p className="text-sm text-slate-600">Skilled professionals with specialized expertise</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 bg-amber-100 p-2 rounded-full">
                                    <Clock className="h-5 w-5 text-amber-700" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">On-Time Delivery</h3>
                                    <p className="text-sm text-slate-600">Projects completed within promised timeframes</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 bg-amber-100 p-2 rounded-full">
                                    <Award className="h-5 w-5 text-amber-700" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Quality Assurance</h3>
                                    <p className="text-sm text-slate-600">Rigorous standards for exceptional results</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 bg-amber-100 p-2 rounded-full">
                                    <Users className="h-5 w-5 text-amber-700" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Client-Centered</h3>
                                    <p className="text-sm text-slate-600">Your vision and satisfaction are our priority</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Button
                                size="lg"
                                className="bg-emerald-800 hover:bg-emerald-700 text-white"
                            >
                                Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;