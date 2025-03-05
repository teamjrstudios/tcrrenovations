"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Expand } from 'lucide-react';

// Project data
const projects = [
    {
        id: 1,
        title: "Oakridge Office Complex",
        category: "commercial",
        description: "A modern, sustainable office complex with LEED certification and innovative workspace design.",
        imageUrl: "/1.jpg",
        completionDate: "2023",
        location: "Portland, OR"
    },
    {
        id: 2,
        title: "Riverside Luxury Residences",
        category: "residential",
        description: "Premium waterfront condominiums featuring panoramic views and high-end finishes.",
        imageUrl: "/2.jpg",
        completionDate: "2022",
        location: "Seattle, WA"
    },
    {
        id: 3,
        title: "Greenway Shopping Center",
        category: "commercial",
        description: "A modern retail space with eco-friendly design and expansive community areas.",
        imageUrl: "/3.jpg",
        completionDate: "2023",
        location: "Denver, CO"
    },
    {
        id: 4,
        title: "Historic Downtown Renovation",
        category: "renovation",
        description: "Careful restoration of a century-old building while preserving its historical character.",
        imageUrl: "/4.jpg",
        completionDate: "2021",
        location: "Boston, MA"
    },
    {
        id: 5,
        title: "Hillside Custom Home",
        category: "residential",
        description: "A contemporary home designed to harmonize with its natural surroundings and maximize views.",
        imageUrl: "/5.jpg",
        completionDate: "2022",
        location: "Aspen, CO"
    },
    {
        id: 6,
        title: "Metro Transit Hub",
        category: "infrastructure",
        description: "A multi-modal transportation center connecting light rail, bus, and pedestrian pathways.",
        imageUrl: "/6.jpeg",
        completionDate: "2023",
        location: "Chicago, IL"
    }
];

// Filter categories
const categories = [
    { id: "all", name: "All Projects" },
    { id: "commercial", name: "Commercial" },
    { id: "residential", name: "Residential" },
    { id: "renovation", name: "Renovation" },
    { id: "infrastructure", name: "Infrastructure" }
];
interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    imageUrl: string;
    completionDate: string;
    location: string;
}
interface ProjectCardProps {
    project: {
        id: number;
        title: string;
        category: string;
        description: string;
        imageUrl: string;
        completionDate: string;
        location: string;
    };
    onClick: (project: {
        id: number;
        title: string;
        category: string;
        description: string;
        imageUrl: string;
        completionDate: string;
        location: string;
    }) => void;
}


const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden rounded-xl"
            onClick={() => onClick(project)}
        >
            <div className="aspect-square relative overflow-hidden rounded-xl cursor-pointer">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                    <div className="flex justify-between items-end">
                        <div>
                            <Badge className="bg-lime-500 text-emerald-950 mb-2">{project.category.charAt(0).toUpperCase() + project.category.slice(1)}</Badge>
                            <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                            <p className="text-emerald-100 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">{project.location} | {project.completionDate}</p>
                        </div>
                        <Button
                            size="icon"
                            variant="outline"
                            className="bg-white/10 border-white/20 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            <Expand className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const PortfolioSection = () => {
    const [activeFilter, setActiveFilter] = useState("all");
    const [, setSelectedProject] = useState(null);

    // Filter projects based on active category
    const filteredProjects = activeFilter === "all"
        ? projects
        : projects.filter(project => project.category === activeFilter);

    // Handle project click
    const handleProjectClick = (project: Project) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setSelectedProject(project);
        // In a real implementation, this would open a modal or navigate to project details
        console.log("Project clicked:", project.title);
    };


    return (
        <section className="py-20 bg-emerald-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-emerald-50 to-transparent" />
            <div className="absolute top-40 -right-32 w-64 h-64 bg-lime-100 rounded-full opacity-30 blur-3xl" />
            <div className="absolute bottom-40 -left-32 w-64 h-64 bg-emerald-100 rounded-full opacity-30 blur-3xl" />

            <div className="container mx-auto px-4 md:px-6">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <Badge className="bg-lime-100 text-emerald-700 hover:bg-lime-100 mb-2">Our Portfolio</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-4">Showcasing Excellence in Construction</h2>
                        <p className="text-emerald-700 text-lg">Explore our diverse portfolio of successful projects, each reflecting our commitment to quality and innovation.</p>
                    </motion.div>
                </div>

                {/* Filter Categories */}
                <motion.div
                    className="flex flex-wrap justify-center gap-2 mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            variant={activeFilter === category.id ? "default" : "outline"}
                            className={`rounded-full px-6 ${
                                activeFilter === category.id
                                    ? "bg-emerald-800 hover:bg-emerald-700 text-white"
                                    : "text-emerald-700 hover:bg-lime-100 border-emerald-200"
                            }`}
                            onClick={() => setActiveFilter(category.id)}
                        >
                            {category.name}
                        </Button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={handleProjectClick}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <Button
                        size="lg"
                        className="bg-emerald-800 hover:bg-emerald-700 text-white px-8"
                    >
                        View Complete Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </motion.div>
            </div>

            {/* Featured Case Study */}
            <div className="mt-24 bg-emerald-50 py-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="rounded-xl overflow-hidden relative aspect-[4/3]"
                        >
                            {/* Before/After Slider would go here */}
                            <div className="grid grid-cols-2 h-full">
                                <div className="relative overflow-hidden">
                                    <Image
                                        src="/before.jpg"
                                        alt="Before renovation"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/70 text-white text-center text-sm">Before</div>
                                </div>
                                <div className="relative overflow-hidden">
                                    <Image
                                        src="/after.jpg"
                                        alt="After renovation"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-emerald-800/70 text-white text-center text-sm">After</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Badge className="bg-lime-100 text-emerald-700 hover:bg-lime-100 mb-2">Featured Case Study</Badge>
                            <h3 className="text-2xl font-bold text-emerald-950 mb-4">Historic Victorian Restoration</h3>

                            <div className="mb-6 space-y-4 text-emerald-800">
                                <p>
                                    This landmark 1890s Victorian home required extensive structural repairs while preserving its historic character. Our team meticulously restored original features while integrating modern systems for comfort and efficiency.
                                </p>
                                <p>
                                    The challenging 8-month project included foundation reinforcement, custom millwork replication, and energy-efficient upgrades that respected the building&#39;s historic significance.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-sm text-emerald-600 font-medium">Challenge</p>
                                    <p className="text-emerald-950">Structural damage with historic preservation requirements</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-sm text-emerald-600 font-medium">Outcome</p>
                                    <p className="text-emerald-950">Award-winning restoration with modern functionality</p>
                                </div>
                            </div>

                            <Button
                                className="bg-emerald-800 hover:bg-emerald-700 text-white"
                            >
                                Read Full Case Study
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PortfolioSection;