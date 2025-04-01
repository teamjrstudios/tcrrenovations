"use client";

import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send
} from 'lucide-react';
import {useSearchParams} from "next/navigation";
import {encodeToBase64} from "next/dist/build/webpack/loaders/utils";
import {useContactInfo} from "@/components/contactcontext";

const Contact = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    const staggerChildren = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    const searchParams = useSearchParams();
    const iq = searchParams.get('iq');
    const message = iq ? atob(iq) : "";

    const [formData, setFormData] = useState({
        messageText: message,
        name: "",
        email: "",
        phone: "",
        service: ""
    });

    interface LocalStorage {
        formData: {
            messageText: string;
            name: string;
            email: string;
            phone: string;
            service: string;
        };
    }

    function removeFirstLast(str: string) {
        if (str.length <= 1) {
            return "";
        }
        return str.slice(1, -1);
    }

    const contactInfo = useContactInfo();

    useEffect(() => {
        if (localStorage.getItem("formData")) {
            try {
                const savedData: LocalStorage = JSON.parse(localStorage.getItem("formData") as string);
                let decodedMessage = "";

                // Handle message text separately due to encoding
                if (savedData.formData.messageText) {
                    decodedMessage = atob(savedData.formData.messageText);
                    if (decodedMessage.includes('\\n')) {
                        decodedMessage = decodedMessage.replaceAll('\\n', '');
                    }
                    decodedMessage = removeFirstLast(decodedMessage);
                }

                setFormData({
                    ...savedData.formData,
                    messageText: decodedMessage
                });
            } catch (error) {
                console.error("Error loading form data from localStorage:", error);
            }
        }
    }, []);

    // Save data to localStorage whenever form data changes
    useEffect(() => {
        const dataToSave = {
            formData: {
                ...formData,
                messageText: encodeToBase64(Object(formData.messageText))
            }
        };

        localStorage.setItem("formData", JSON.stringify(dataToSave));
    }, [formData]);

    // Handle form field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <AnimatePresence>
                    <h1 className="text-3xl md:text-4xl font-bold text-emerald-600 mb-4">{'Get In Touch'.split(' ').map((w,i)=> {
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 1, paddingLeft: 0, paddingRight: 0 }}
                                animate={{ opacity: 1, scale: 1.3, paddingLeft: 8, paddingRight: 8 }}
                                exit={{ opacity: 0, scale: 1, paddingLeft: 0, paddingRight: 0 }}
                                transition={{ duration: 0.2, delay: 0.4*i }}
                                className="text-center inline-flex items-center justify-between "
                            >
                            <motion.span

                            >
                                {w}&nbsp;
                            </motion.span>
                            </motion.div>
                        )
                    })}</h1>
                    </AnimatePresence>
                    <p className="text-gray-600 max-w-xl mx-auto">Have a project in mind or questions about our services? We&#39;re here to help turn your construction vision into reality.</p>
                </motion.div>

                <div className="grid md:grid-cols-12 gap-10">
                    {/* Contact Info */}
                    <motion.div
                        variants={staggerChildren}
                        initial="initial"
                        animate="animate"
                        className="md:col-span-5 bg-emerald-50 rounded-lg p-8"
                    >
                        <h2 className="text-2xl font-semibold text-forest-green mb-6">Contact Information</h2>

                        <motion.div variants={fadeIn} className="flex items-start mb-6">
                            <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
                                <MapPin className="h-5 w-5 text-forest-green" />
                            </div>
                            <div>
                                <h3 className="font-medium text-forest-green mb-1">Our Location</h3>
                                <p className="text-gray-600">{contactInfo.address}</p>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeIn} className="flex items-start mb-6">
                            <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
                                <Phone className="h-5 w-5 text-forest-green" />
                            </div>
                            <div>
                                <h3 className="font-medium text-forest-green mb-1">Phone Number</h3>
                                <p className="text-gray-600">
                                    <a href={`tel:+${contactInfo.phoneRaw}`} className="hover:text-emerald-600 transition-colors">{contactInfo.phone}</a>
                                </p>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeIn} className="flex items-start mb-6">
                            <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
                                <Mail className="h-5 w-5 text-forest-green" />
                            </div>
                            <div>
                                <h3 className="font-medium text-forest-green mb-1">Email Address</h3>
                                <p className="text-gray-600">
                                    <a href={`mailto:${contactInfo.email}`} className="hover:text-forest-green transition-colors">{contactInfo.email}</a>
                                </p>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeIn} className="flex items-start">
                            <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
                                <Clock className="h-5 w-5 text-forest-green" />
                            </div>
                            <div>
                                <h3 className="font-medium text-forest-green mb-1">Working Hours</h3>
                                <p className="text-gray-600">{contactInfo.hours}</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-7 bg-white rounded-lg p-8 shadow-sm border border-gray-100"
                    >
                        <h2 className="text-2xl font-semibold text-forest-green mb-6">Send Us a Message</h2>

                        <form>
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-transparent transition"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-transparent transition"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="service" className="block text-gray-700 mb-2 font-medium">Service Interested In</label>
                                    <select
                                        id="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-transparent transition"
                                    >
                                        <option value="" disabled>Select a service</option>
                                        <option value="residential">Residential Construction</option>
                                        <option value="commercial">Commercial Construction</option>
                                        <option value="renovation">Renovation</option>
                                        <option value="consultation">Consultation</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="messageText" className="block text-gray-700 mb-2 font-medium">Your Message</label>
                                <textarea
                                    id="messageText"
                                    rows={5}
                                    value={formData.messageText}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-green focus:border-transparent transition resize-none"
                                    required
                                ></textarea>
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center cursor-pointer px-6 py-3 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 transition-colors"
                            >
                                Send Message
                                <Send className="ml-2 h-4 w-4" />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;