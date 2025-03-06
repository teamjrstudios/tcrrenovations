"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Expand } from 'lucide-react';

// Filter categories - we'll populate this dynamically based on fetched data
interface Project {
    id: number;
    title: string;
    description: string;
    images: string[];
    tags: string[];
    location: string;
    completed_at: string;
}

interface ProjectCardProps {
    project: Project;
    onClick: (project: Project) => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
    // Get the first image for the card
    const imageUrl = project.images && project.images.length > 0
        ? project.images[0]
        : "/placeholder.jpg";

    // Get the first tag as category for display
    const category = project.tags && project.tags.length > 0
        ? project.tags[0]
        : "project";

    // Format the completion date (year only)
    const completionYear = project.completed_at
        ? new Date(project.completed_at).getFullYear().toString()
        : "Ongoing";

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
                    src={imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                    <div className="flex justify-between items-end">
                        <div>
                            <Badge className="bg-emerald-600 text-white mb-2">{category.charAt(0).toUpperCase() + category.slice(1)}</Badge>
                            <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                            <p className="text-emerald-100 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">{project.location} | {completionYear}</p>
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
    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState([{ id: "all", name: "All Projects" }]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch('http://localhost:5005/data/projects');
                console.log(response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }


                const data = await response.json();

                // Process the data to ensure images and tags are parsed from JSON strings if needed
                const processedData = data.map((project: { images: string; tags: string; }) => ({
                    ...project,
                    images: typeof project.images === 'string' ? JSON.parse(project.images) : project.images,
                    tags: typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags
                }));

                setProjects(processedData);

                // Extract unique tags to create dynamic categories
                const allTags = new Set();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                processedData.forEach(project => {
                    if (project.tags && Array.isArray(project.tags)) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        project.tags.forEach(tag => allTags.add(tag));
                    }
                });

                // Create categories from unique tags
                const newCategories = [{ id: "all", name: "All Projects" }];
                allTags.forEach(tag => {
                    newCategories.push({
                        id: tag as string,
                        name: (tag as string).charAt(0).toUpperCase() + (tag as string).slice(1)
                    });
                });

                setCategories(newCategories);
                setLoading(false);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
            } catch (err) {
                console.error("Error fetching projects:", err);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setError(err.message);
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    // Filter projects based on active category
    const filteredProjects = activeFilter === "all"
        ? projects
        : projects.filter(project =>
            project.tags && Array.isArray(project.tags) && project.tags.includes(activeFilter)
        );

    // Handle project click
    const handleProjectClick = (project: Project) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setSelectedProject(project);
        // In a real implementation, this would open a modal or navigate to project details
        console.log("Project clicked:", project.title);
    };

    if (loading) {
        return (
            <section className="py-20 bg-emerald-50 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-4">Loading Projects...</h2>
                    </div>
                    {/* Loading skeleton grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="aspect-square bg-emerald-100/50 rounded-xl animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 bg-emerald-50 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-4">Error Loading Projects</h2>
                        <p className="text-emerald-700 text-lg">There was a problem loading the projects: {error}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-emerald-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent" />
            <div className="absolute top-40 -right-32 w-64 h-64 bg-emerald-100 rounded-full opacity-30 blur-3xl" />
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
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-2">Our Portfolio</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-4">Showcasing Our Finest Work</h2>
                        <p className="text-emerald-700 text-lg">Explore our diverse portfolio of successful projects throughout Bucks County, each reflecting our commitment to quality craftsmanship.</p>
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
                                    : "text-emerald-700 hover:bg-emerald-100 border-emerald-200"
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
            {projects.length > 0 && (
                <div className="mt-24 bg-white py-16">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="rounded-xl overflow-hidden relative aspect-[4/3]"
                            >
                                {/* Featured project images */}
                                <div className="grid grid-cols-2 h-full">
                                    <div className="relative overflow-hidden">
                                        <Image
                                            src={projects[0].images[0] || "/before.jpg"}
                                            alt={`${projects[0].title} image`}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/70 text-white text-center text-sm">Before</div>
                                    </div>
                                    <div className="relative overflow-hidden">
                                        <Image
                                            src={projects[0].images.length > 1 ? projects[0].images[1] : projects[0].images[0] || "/after.jpg"}
                                            alt={`${projects[0].title} image`}
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
                                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-2">Featured Case Study</Badge>
                                <h3 className="text-2xl font-bold text-emerald-950 mb-4">{projects[0].title}</h3>

                                <div className="mb-6 space-y-4 text-emerald-800">
                                    <p>{projects[0].description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-emerald-50 p-4 rounded-lg shadow-sm">
                                        <p className="text-sm text-emerald-600 font-medium">Location</p>
                                        <p className="text-emerald-950">{projects[0].location}</p>
                                    </div>
                                    <div className="bg-emerald-50 p-4 rounded-lg shadow-sm">
                                        <p className="text-sm text-emerald-600 font-medium">Completed</p>
                                        <p className="text-emerald-950">
                                            {projects[0].completed_at
                                                ? new Date(projects[0].completed_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long'
                                                })
                                                : "In Progress"}
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    className="bg-emerald-800 hover:bg-emerald-700 text-white"
                                >
                                    View Full Case Study
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default PortfolioSection;