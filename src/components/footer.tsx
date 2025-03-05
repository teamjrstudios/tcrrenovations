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

    return (
        <footer className="relative bg-emerald-950 text-white overflow-hidden pt-24 pb-8">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent opacity-5" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400 rounded-full blur-[120px] opacity-10 transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400 rounded-full blur-[100px] opacity-5 transform -translate-x-1/2 translate-y-1/3" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Pre-footer CTA */}
                <div className="mb-20">
                    <motion.div
                        className="bg-gradient-to-r from-emerald-800 to-green-800 p-8 md:p-12 rounded-2xl shadow-lg overflow-hidden relative"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <div className="absolute right-0 bottom-0 w-64 h-64 bg-lime-400/20 rounded-full blur-3xl" />
                        <div className="absolute left-20 top-0 w-32 h-32 bg-emerald-300/20 rounded-full blur-3xl" />

                        <div className="max-w-3xl relative z-10">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Space?</h3>
                            <p className="text-emerald-100 text-lg mb-8">Let&#39;s discuss your project and bring your vision to life with our sustainable construction solutions.</p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Input
                                    placeholder="Enter your email"
                                    className="bg-white/10 border-emerald-700 focus:border-lime-400 text-white placeholder:text-emerald-200"
                                />
                                <Button className="bg-lime-500 hover:bg-lime-600 text-emerald-950 font-medium">
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
                                src="/logo-white.svg"
                                alt="Company Logo"
                                width={140}
                                height={40}
                                className="h-10 w-auto"
                            />
                        </div>
                        <p className="text-emerald-200 mb-6">
                            Committed to excellence in sustainable construction, creating spaces that inspire and endure with minimal environmental impact.
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
                            <div className="h-5 w-1.5 bg-lime-500 rounded-full mr-2"></div>
                            Our Services
                        </h4>
                        <ul className="space-y-3">
                            {[
                                "Commercial Construction",
                                "Residential Building",
                                "Green Building Solutions",
                                "Renovation & Remodeling",
                                "Design & Planning",
                                "Infrastructure Development"
                            ].map((service, index) => (
                                <li key={index}>
                                    <Link href="#" className="text-emerald-200 hover:text-lime-300 flex items-center transition-colors duration-200">
                                        <ChevronRight className="h-3 w-3 mr-1 text-lime-500" />
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 3: Quick Links */}
                    <motion.div variants={fadeInUp}>
                        <h4 className="text-white font-semibold text-lg mb-5 flex items-center">
                            <div className="h-5 w-1.5 bg-lime-500 rounded-full mr-2"></div>
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
                                    <Link href="#" className="text-emerald-200 hover:text-lime-300 flex items-center transition-colors duration-200">
                                        <ChevronRight className="h-3 w-3 mr-1 text-lime-500" />
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 4: Contact */}
                    <motion.div variants={fadeInUp}>
                        <h4 className="text-white font-semibold text-lg mb-5 flex items-center">
                            <div className="h-5 w-1.5 bg-lime-500 rounded-full mr-2"></div>
                            Contact Us
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 text-lime-500 mt-0.5 mr-3 flex-shrink-0" />
                                <span className="text-emerald-200">123 Green Building St, Portland, OR 97201, United States</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 text-lime-500 mr-3 flex-shrink-0" />
                                <span className="text-emerald-200">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 text-lime-500 mr-3 flex-shrink-0" />
                                <span className="text-emerald-200">info@greenconstructionco.com</span>
                            </li>
                        </ul>
                        <div className="mt-6 bg-emerald-900/50 p-4 rounded-lg border border-emerald-800/50">
                            <p className="text-emerald-100 text-sm">
                                <span className="block font-medium text-white mb-1">Business Hours:</span>
                                Monday - Friday: 8:00 AM - 6:00 PM<br />
                                Saturday: 9:00 AM - 2:00 PM
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Certification logos */}
                {/*<motion.div*/}
                {/*    className="mb-12 py-8 border-t border-b border-emerald-900 grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center"*/}
                {/*    initial={{ opacity: 0 }}*/}
                {/*    whileInView={{ opacity: 1 }}*/}
                {/*    transition={{ duration: 0.6 }}*/}
                {/*    viewport={{ once: true }}*/}
                {/*>*/}
                {/*    {[1, 2, 3, 4, 5].map((logo) => (*/}
                {/*        <div key={logo} className="flex justify-center">*/}
                {/*            <div className="h-12 w-full max-w-[120px] relative opacity-60 hover:opacity-100 transition-opacity duration-300">*/}
                {/*                <Image*/}
                {/*                    src={`/certification-${logo}.svg`}*/}
                {/*                    alt={`Certification Logo ${logo}`}*/}
                {/*                    fill*/}
                {/*                    className="object-contain filter invert"*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</motion.div>*/}

                {/* Bottom bar */}
                <div className="pt-8 border-t border-emerald-900 flex flex-col md:flex-row justify-between items-center text-sm text-emerald-300">
                    <div className="mb-4 md:mb-0">
                        &copy; {currentYear} Green Construction Co. All Rights Reserved.
                    </div>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-lime-300 transition-colors duration-200">Privacy Policy</Link>
                        <Link href="#" className="hover:text-lime-300 transition-colors duration-200">Terms of Service</Link>
                        <Link href="#" className="hover:text-lime-300 transition-colors duration-200">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;