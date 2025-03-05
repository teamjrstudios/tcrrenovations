"use client"
import React, {JSX} from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Building,
    HomeIcon,
    Hammer,
    PencilRuler,
    Truck,
    Wrench,
    ChevronRight
} from 'lucide-react';
interface ServiceCardProps {
    icon: JSX.Element;
    title: string;
    description: string;
    delay?: number; // Optional, defaults to 0
}

const ServiceCard = ({ icon, title, description, delay = 0 }: ServiceCardProps) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <Card className="border border-emerald-100 hover:border-lime-300 transition-all duration-300 h-full overflow-hidden group">
                <div className="absolute h-1 w-0 bg-gradient-to-r from-lime-500 to-emerald-600 top-0 left-0 group-hover:w-full transition-all duration-500"></div>
                <CardHeader className="pb-3">
                    <div className="bg-lime-100 text-emerald-700 p-3 rounded-lg w-fit mb-4">
                        {icon}
                    </div>
                    <CardTitle className="text-emerald-950 text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                    <CardDescription className="text-emerald-700">{description}</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button
                        variant="ghost"
                        className="text-emerald-700 hover:text-emerald-900 hover:bg-lime-100 p-0 h-auto font-medium"
                    >
                        Learn More <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

const ServicesSection = () => {
    const sectionRef = React.useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

    const services = [
        {
            icon: <Building className="h-6 w-6" />,
            title: "Commercial Construction",
            description: "Full-service commercial building solutions from concept to completion, including office buildings, retail spaces, and industrial facilities.",
            delay: 0.1
        },
        {
            icon: <HomeIcon className="h-6 w-6" />,
            title: "Residential Building",
            description: "Custom home construction and major renovations with attention to detail and quality craftsmanship for your dream living space.",
            delay: 0.2
        },
        {
            icon: <Hammer className="h-6 w-6" />,
            title: "Renovation & Remodeling",
            description: "Transform your existing space with comprehensive renovation services, breathing new life into outdated structures.",
            delay: 0.3
        },
        {
            icon: <PencilRuler className="h-6 w-6" />,
            title: "Design & Planning",
            description: "Expert architectural design and planning services to bring your vision to life with practical, sustainable solutions.",
            delay: 0.4
        },
        {
            icon: <Truck className="h-6 w-6" />,
            title: "Infrastructure Development",
            description: "Roads, bridges, and civil engineering projects built to the highest standards of durability and sustainability.",
            delay: 0.5
        },
        {
            icon: <Wrench className="h-6 w-6" />,
            title: "Maintenance & Repair",
            description: "Ongoing maintenance and timely repairs to protect your investment and ensure the longevity of your property.",
            delay: 0.6
        }
    ];

    // Staggered animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-20 bg-gradient-to-b from-white via-emerald-50 to-white overflow-hidden"
        >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-full h-64 bg-[radial-gradient(circle_at_70%_-20%,_var(--tw-gradient-stops))] from-lime-200/40 via-transparent to-transparent opacity-70 pointer-events-none transform rotate-180" />

            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-lime-200 rounded-full opacity-20 blur-3xl pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-200 rounded-full opacity-20 blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section header */}
                <motion.div
                    className="max-w-3xl mx-auto text-center mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.div variants={itemVariants}>
                        <Badge className="bg-lime-100 text-emerald-700 hover:bg-lime-100 mb-2">Our Services</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-4">Comprehensive Construction Solutions</h2>
                        <p className="text-emerald-700 text-lg">From concept to completion, we offer a full range of services to meet your construction needs with excellence and precision.</p>
                    </motion.div>
                </motion.div>

                {/* Services grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                            delay={service.delay}
                        />
                    ))}
                </div>

                {/* CTA section */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    <Button
                        size="lg"
                        className="bg-emerald-800 hover:bg-emerald-700 text-white px-8"
                    >
                        View All Services
                    </Button>
                </motion.div>
            </div>

            {/* Bottom wave shape */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg
                    className="relative block w-full h-12 md:h-20"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    fill="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-white"
                    />
                </svg>
            </div>
        </section>
    );
};

export default ServicesSection;