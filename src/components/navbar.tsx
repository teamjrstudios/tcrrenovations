"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
    Menu,
    Phone,
    X,
    ChevronDown,
    ChevronRight
} from 'lucide-react';

interface NavItem {
    name: string;
    href: string;
    children?: {
        name: string;
        href: string;
        description?: string;
    }[];
}

const navItems: NavItem[] = [
    { name: 'Home', href: '/' },
    {
        name: 'Services',
        href: '/services',
        children: [
            { name: 'Kitchen Remodeling', href: '/services/kitchen', description: 'Transform your kitchen with custom designs' },
            { name: 'Bathroom Renovation', href: '/services/bathroom', description: 'Luxury bathroom upgrades and remodels' },
            { name: 'Basement Finishing', href: '/services/basement', description: 'Convert your unfinished basement into livable space' },
            { name: 'Custom Carpentry', href: '/services/carpentry', description: 'Bespoke built-ins and custom woodwork' },
            { name: 'Home Additions', href: '/services/additions', description: 'Expand your living space with custom additions' },
        ]
    },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    // Handle scroll event to change navbar style and visibility
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide navbar at the very top of the page, show when scrolled down
            if (currentScrollY === 0) {
                setVisible(false);
                setIsScrolled(false);
            } else if (currentScrollY < 100) {
                setVisible(true);
                setIsScrolled(false);
            } else {
                setVisible(true);
                setIsScrolled(true);
            }

            setLastScrollY(currentScrollY);
        };

        // Initialize navbar state (hidden at top)
        if (window.scrollY === 0) {
            setVisible(false);
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // Close mobile menu when window is resized to desktop size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mobileMenuOpen]);

    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    // Animation variants
    const navbarVariants = {
        visible: {
            opacity: 1,
            y: 0,
            backgroundColor: 'rgba(6, 78, 59, 1)',
            height: isScrolled ? '80px' : '100px',
            boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : '0 0 0 rgba(0, 0, 0, 0)',
            transition: {
                y: { duration: 0.3, ease: 'easeOut' },
                opacity: { duration: 0.3, ease: 'easeOut' },
                height: { duration: 0.3, ease: 'easeInOut' },
                boxShadow: { duration: 0.3, ease: 'easeInOut' }
            }
        },
        hidden: {
            opacity: 0,
            y: -100,
            backgroundColor: 'rgba(6, 78, 59, 1)',
            transition: {
                y: { duration: 0.3, ease: 'easeIn' },
                opacity: { duration: 0.2, ease: 'easeIn' }
            }
        }
    };

    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            x: '100%',
            transition: {
                type: 'tween',
                duration: 0.3,
                ease: 'easeInOut'
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'tween',
                duration: 0.3,
                ease: 'easeInOut',
                staggerChildren: 0.07,
                delayChildren: 0.1
            }
        }
    };

    const mobileNavItemVariants = {
        closed: { opacity: 0, x: 50 },
        open: { opacity: 1, x: 0 }
    };

    const dropdownVariants = {
        closed: {
            opacity: 0,
            y: -5,
            height: 0,
            transition: {
                duration: 0.2,
                ease: 'easeInOut'
            }
        },
        open: {
            opacity: 1,
            y: 0,
            height: 'auto',
            transition: {
                duration: 0.3,
                ease: 'easeInOut'
            }
        }
    };

    // When mobile menu is open, always show the header regardless of scroll
    const navbarState = mobileMenuOpen ? "visible" : (visible ? "visible" : "hidden");

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <motion.nav
                className="w-full transition-all duration-300"
                initial="visible"
                animate={navbarState}
                variants={navbarVariants}
            >
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-full">
                    {/* Logo */}
                    <Link href="/" className="relative z-50">
                        <motion.div
                            className="flex items-center"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Image
                                src="/logo.jpg"
                                alt="TCR Renovations"
                                width={40}
                                height={40}
                                className="h-10 w-auto mr-3"
                            />
                            <div className="text-white font-semibold text-xl">
                                TCR Renovations
                            </div>
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <motion.div
                        className="hidden lg:flex items-center space-x-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {navItems.map((item) => (
                            <div key={item.name} className="relative group">
                                {item.children ? (
                                    <button
                                        onClick={() => toggleDropdown(item.name)}
                                        className="flex items-center px-4 py-2 text-emerald-100 hover:text-white font-medium text-sm"
                                    >
                                        {item.name}
                                        <ChevronDown className="ml-1 h-4 w-4" />
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="px-4 py-2 text-emerald-100 hover:text-white font-medium text-sm"
                                    >
                                        {item.name}
                                    </Link>
                                )}

                                {/* Dropdown for items with children */}
                                {item.children && (
                                    <AnimatePresence>
                                        {activeDropdown === item.name && (
                                            <motion.div
                                                initial="closed"
                                                animate="open"
                                                exit="closed"
                                                variants={dropdownVariants}
                                                className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-lg overflow-hidden mt-2"
                                            >
                                                <div className="py-2">
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.name}
                                                            href={child.href}
                                                            className="block px-4 py-3 hover:bg-emerald-50 transition-colors"
                                                            onClick={() => setActiveDropdown(null)}
                                                        >
                                                            <div className="font-medium text-emerald-900">{child.name}</div>
                                                            {child.description && (
                                                                <div className="text-sm text-emerald-700 mt-1">{child.description}</div>
                                                            )}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}
                    </motion.div>

                    {/* Contact Button (Desktop) */}
                    <motion.div
                        className="hidden lg:block"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            <Phone className="h-4 w-4 mr-2" />
                            (267) 650-0283
                        </Button>
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="lg:hidden relative z-50 p-2 text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </motion.button>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                className="fixed inset-0 bg-emerald-950 z-40 lg:hidden flex flex-col"
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={mobileMenuVariants}
                            >
                                <div className="h-20 border-b border-emerald-800" />

                                <div className="flex-1 overflow-y-auto px-4 py-8">
                                    <nav className="flex flex-col space-y-2">
                                        {navItems.map((item) => (
                                            <motion.div
                                                key={item.name}
                                                variants={mobileNavItemVariants}
                                                className="border-b border-emerald-800 pb-2"
                                            >
                                                {item.children ? (
                                                    <div>
                                                        <button
                                                            onClick={() => toggleDropdown(item.name)}
                                                            className="flex items-center justify-between w-full py-3 text-emerald-100 hover:text-white font-medium"
                                                        >
                                                            <span>{item.name}</span>
                                                            {activeDropdown === item.name ? (
                                                                <ChevronDown className="h-5 w-5" />
                                                            ) : (
                                                                <ChevronRight className="h-5 w-5" />
                                                            )}
                                                        </button>

                                                        <AnimatePresence>
                                                            {activeDropdown === item.name && (
                                                                <motion.div
                                                                    initial="closed"
                                                                    animate="open"
                                                                    exit="closed"
                                                                    variants={dropdownVariants}
                                                                    className="pl-4 space-y-1 mb-2"
                                                                >
                                                                    {item.children.map((child) => (
                                                                        <motion.div
                                                                            key={child.name}
                                                                            variants={mobileNavItemVariants}
                                                                        >
                                                                            <Link
                                                                                href={child.href}
                                                                                className="block py-2 text-emerald-200 hover:text-white"
                                                                                onClick={() => setMobileMenuOpen(false)}
                                                                            >
                                                                                {child.name}
                                                                            </Link>
                                                                        </motion.div>
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                ) : (
                                                    <Link
                                                        href={item.href}
                                                        className="block py-3 text-emerald-100 hover:text-white font-medium"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                )}
                                            </motion.div>
                                        ))}
                                    </nav>
                                </div>

                                <div className="p-6 border-t border-emerald-800">
                                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6">
                                        <Phone className="h-4 w-4 mr-2" />
                                        Call Now: (215) 555-7890
                                    </Button>
                                    <div className="mt-4 text-center text-emerald-300 text-sm">
                                        Or <Link href="/contact" className="underline text-white" onClick={() => setMobileMenuOpen(false)}>request a free quote</Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.nav>
        </header>
    );
};

export default Navbar;