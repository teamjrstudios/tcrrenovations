"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Phone,
    Mail,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    ArrowRight,
    ChevronRight
} from 'lucide-react';
import {useContactInfo} from "@/components/contactcontext";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    // Animation variants
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const fadeInUp = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };
    const contactInfo = useContactInfo();
    return (
        <footer className="relative bg-gray-900 text-white overflow-hidden pt-24 pb-8">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent opacity-5" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600 rounded-full blur-[120px] opacity-10 transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500 rounded-full blur-[100px] opacity-5 transform -translate-x-1/2 translate-y-1/3" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Pre-footer CTA */}
                <div className="mb-20">
                    <motion.div
                        className="bg-gradient-to-r from-emerald-800 to-emerald-900 p-8 md:p-12 rounded-2xl shadow-lg overflow-hidden relative"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <div className="absolute right-0 bottom-0 w-64 h-64 bg-emerald-700/20 rounded-full blur-3xl" />
                        <div className="absolute left-20 top-0 w-32 h-32 bg-emerald-600/20 rounded-full blur-3xl" />

                        <div className="max-w-3xl relative z-10">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Space?</h3>
                            <p className="text-emerald-100 text-lg mb-8">Let&#39;s discuss your renovation project and bring your vision to life with TCR Renovations&#39; expert craftsmanship.</p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Input
                                    placeholder="Enter your email"
                                    className="bg-white/10 border-emerald-700 focus:border-emerald-400 text-white placeholder:text-emerald-200"
                                />
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
                                    Request a Free Quote
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Main footer content */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Column 1: About */}
                    <motion.div variants={fadeInUp}>
                        <div className="mb-6">
                            <Image
                                src="/logo.jpg"
                                alt="TCR Renovations Logo"
                                width={140}
                                height={40}
                                className="h-10 w-auto"
                            />
                        </div>
                        <p className="text-emerald-200 mb-6">
                            Southampton&#39;s premier renovation contractor delivering exceptional craftsmanship and transforming homes throughout Bucks County for over 15 years.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="h-9 w-9 bg-emerald-800 hover:bg-emerald-700 rounded-full flex items-center justify-center transition-colors duration-300">
                                <Facebook className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="h-9 w-9 bg-emerald-800 hover:bg-emerald-700 rounded-full flex items-center justify-center transition-colors duration-300">
                                <Twitter className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="h-9 w-9 bg-emerald-800 hover:bg-emerald-700 rounded-full flex items-center justify-center transition-colors duration-300">
                                <Instagram className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="h-9 w-9 bg-emerald-800 hover:bg-emerald-700 rounded-full flex items-center justify-center transition-colors duration-300">
                                <Linkedin className="h-4 w-4" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Column 2: Services */}
                    <motion.div variants={fadeInUp}>
                        <h4 className="text-white font-semibold text-lg mb-5 flex items-center">
                            <div className="h-5 w-1.5 bg-emerald-500 rounded-full mr-2"></div>
                            Our Services
                        </h4>
                        <ul className="space-y-3">
                            {[
                                "Kitchen Remodeling",
                                "Bathroom Renovation",
                                "Basement Finishing",
                                "Custom Carpentry",
                                "Home Additions",
                                "Whole Home Renovations"
                            ].map((service, index) => (
                                <li key={index}>
                                    <Link href="#" className="text-emerald-200 hover:text-emerald-300 flex items-center transition-colors duration-200">
                                        <ChevronRight className="h-3 w-3 mr-1 text-emerald-500" />
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 3: Quick Links */}
                    <motion.div variants={fadeInUp}>
                        <h4 className="text-white font-semibold text-lg mb-5 flex items-center">
                            <div className="h-5 w-1.5 bg-emerald-500 rounded-full mr-2"></div>
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {[
                                "About Us",
                                "Projects Portfolio",
                                "Testimonials",
                                "Our Process",
                                "Careers",
                                "Contact Us"
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link href="#" className="text-emerald-200 hover:text-emerald-300 flex items-center transition-colors duration-200">
                                        <ChevronRight className="h-3 w-3 mr-1 text-emerald-500" />
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 4: Contact */}
                    <motion.div variants={fadeInUp}>
                        <h4 className="text-white font-semibold text-lg mb-5 flex items-center">
                            <div className="h-5 w-1.5 bg-emerald-500 rounded-full mr-2"></div>
                            Contact Us
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
                                <span className="text-emerald-200">{contactInfo.address}</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                                <span className="text-emerald-200">{contactInfo.phone}</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                                <span className="text-emerald-200">{contactInfo.email}</span>
                            </li>
                        </ul>
                        <div className="mt-6 bg-emerald-900/50 p-4 rounded-lg border border-emerald-800/50">
                            <p className="text-emerald-100 text-sm">
                                <span className="block font-medium text-white mb-1">Business Hours:</span>
                                {contactInfo.hours}<br />
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-emerald-300">
                    <div className="mb-4 md:mb-0">
                        &copy; {currentYear} TCR Renovations. All Rights Reserved.
                    </div>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-emerald-300 transition-colors duration-200">Privacy Policy</Link>
                        <Link href="#" className="hover:text-emerald-300 transition-colors duration-200">Terms of Service</Link>
                        <Link href="#" className="hover:text-emerald-300 transition-colors duration-200">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;