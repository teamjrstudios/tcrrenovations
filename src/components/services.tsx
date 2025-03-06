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
    Droplet,
    Wrench,
    ChevronRight, UtensilsCrossed, Home, TreesIcon
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
            <Card className="border border-emerald-100 hover:border-emerald-300 transition-all duration-300 h-full overflow-hidden group">
                <CardHeader className="pb-3">
                    <div className="bg-emerald-100 text-emerald-700 p-3 rounded-lg w-fit mb-4">
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
                        className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 p-0 h-auto font-medium"
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
            icon: <UtensilsCrossed className="h-6 w-6" />,
            title: "Kitchen Remodeling",
            description: "Transform your kitchen with custom cabinets, modern appliances, and beautiful countertops.",
            delay: 0.1
        },
        {
            icon: <Droplet className="h-6 w-6" />,
            title: "Bathroom Renovation",
            description: "Complete bathroom makeovers including tiling, fixtures, and luxury upgrades.",
            delay: 0.2
        },
        {
            icon: <Home className="h-6 w-6" />,
            title: "Home Additions",
            description: "Expand your living space with custom room additions and home extensions.",
            delay: 0.3
        },
        {
            icon: <PencilRuler className="h-6 w-6" />,
            title: "Interior Renovation",
            description: "Full interior updates including flooring, painting, and custom built-ins.",
            delay: 0.4
        },
        {
            icon: <Home className="h-6 w-6" />,
            title: "Basement Finishing",
            description: "Convert your basement into a functional living space with expert finishing.",
            delay: 0.5
        },
        {
            icon: <TreesIcon className="h-6 w-6" />,
            title: "Outdoor Living",
            description: "Create beautiful outdoor spaces with decks, patios, and landscaping.",
            delay: 0.6
        },
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
            <div className="absolute top-0 right-0 w-full h-64 bg-[radial-gradient(circle_at_70%_-20%,_var(--tw-gradient-stops))] from-emerald-200/40 via-transparent to-transparent opacity-70 pointer-events-none transform rotate-180" />

            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-200 rounded-full opacity-20 blur-3xl pointer-events-none" />
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
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-2">Our Services</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-4">Comprehensive Renovation Solutions</h2>
                        <p className="text-emerald-700 text-lg">TCR Renovations offers expert craftsmanship and premium materials to transform your Southampton home with our full range of renovation services.</p>
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