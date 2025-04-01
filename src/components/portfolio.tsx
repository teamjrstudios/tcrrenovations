"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectImage from "@/components/ui/portfolioimage";
import {encodeToBase64} from "next/dist/build/webpack/loaders/utils";

// Updated Project interface to match API response structure
interface Project {
    id: number;
    title: string;
    description: string;
    serverImagePaths?: string[]; // From API
    images?: string[]; // Processed images with full paths
    tags: string[];
    location: string;
    completed_at?: string;
}

interface ProjectCardProps {
    project: Project;
    onClick: (project: Project) => void;
    preloadImages?: boolean;
}

const ProjectCard = ({ project, onClick, preloadImages = false }: ProjectCardProps) => {
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

    // Preload all project images if requested
    useEffect(() => {
        if (preloadImages && project.images && project.images.length > 0) {
            // Silently preload all other images of this project in the background
            project.images.forEach((imgSrc, index) => {
                if (index > 0) { // Skip the first one as it's already loaded in the card
                    const img = new Image();
                    img.src = imgSrc;
                }
            });
        }
    }, [preloadImages, project.images]);

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
                <ProjectImage
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

// Project Modal component with image preloading
interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imagesPreloaded, setImagesPreloaded] = useState(false);

    // Reset image index when project changes
    useEffect(() => {
        setCurrentImageIndex(0);
        setImagesPreloaded(false);
    }, [project?.id]);

    // Preload all images when modal opens
    useEffect(() => {
        if (isOpen && project?.images && project.images.length > 0 && !imagesPreloaded) {
            Promise.all(
                project.images.map((src) => {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.onload = () => resolve(src);
                        img.onerror = () => resolve(null);
                        img.src = src;
                    });
                })
            ).then(() => {
                setImagesPreloaded(true);
            });
        }
    }, [isOpen, project, imagesPreloaded]);

    if (!project) return null;

    const imageCount = project.images?.length || 0;

    const handlePrevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + imageCount) % imageCount);
    };

    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % imageCount);
    };

    const formattedDate = project.completed_at
        ? new Date(project.completed_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : "In Progress";

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex justify-end bg-black/50"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="bg-white w-full max-w-xl h-screen overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 z-10 bg-white p-4 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold text-emerald-950">{project.title}</h2>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={onClose}
                                className="rounded-full hover:bg-emerald-100"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Image gallery with preloaded images */}
                            {project.images && project.images.length > 0 && (
                                <div className="relative aspect-video bg-emerald-100 rounded-lg overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentImageIndex}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="h-full w-full"
                                        >
                                            <ProjectImage
                                                src={project.images[currentImageIndex]}
                                                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Image navigation */}
                                    {imageCount > 1 && (
                                        <>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md"
                                                onClick={handlePrevImage}
                                            >
                                                <ChevronLeft className="h-5 w-5" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md"
                                                onClick={handleNextImage}
                                            >
                                                <ChevronRight className="h-5 w-5" />
                                            </Button>

                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1">
                                                {project.images.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setCurrentImageIndex(idx);
                                                        }}
                                                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}`}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, idx) => (
                                    <Badge
                                        key={idx}
                                        className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold text-emerald-950 mb-2">Project Description</h3>
                                <p className="text-emerald-700">{project.description}</p>
                            </div>

                            {/* Project details */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-emerald-50 p-4 rounded-lg">
                                    <p className="text-sm font-medium text-emerald-600">Location</p>
                                    <p className="text-emerald-950">{project.location}</p>
                                </div>
                                <div className="bg-emerald-50 p-4 rounded-lg">
                                    <p className="text-sm font-medium text-emerald-600">Completed</p>
                                    <p className="text-emerald-950">{formattedDate}</p>
                                </div>
                            </div>

                            {/* CTA */}
                            <Button
                                className="w-full bg-emerald-800 hover:bg-emerald-700 text-white"
                                onClick={() => {
                                    onClose();
                                    window.location.href = "/contact?iq="+encodeToBase64(Object(`Hey I was looking at the ${project?.title} project,  `)).toString();
                                }}
                            >
                                Request Similar Project <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const PortfolioSection = () => {
    const [activeFilter, setActiveFilter] = useState("all");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<{id: string; name: string}[]>([{ id: "all", name: "All Projects" }]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);

    // Fetch projects from API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/admin/projects');

                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }

                const data = await response.json();

                // Process the projects data
                const processedProjects = data.map((project: Project) => {
                    // Convert serverImagePaths to use our mediator route
                    const images = project.serverImagePaths
                        ? project.serverImagePaths.map((path: string) => `/api/images/${path}`)
                        : [];

                    return {
                        ...project,
                        images: images,
                        // If completed_at is not provided, set it to null or current date
                        completed_at: project.completed_at || null
                    };
                });

                setProjects(processedProjects);

                // Extract unique categories from project tags
                const allTags = processedProjects.flatMap((project: { tags: any; }) => project.tags || []);
                const uniqueTags = [...new Set(allTags)];

                // Create categories array with "All Projects" as the first option
                const categoryOptions = [
                    { id: "all", name: "All Projects" },
                    ...uniqueTags.map(tag => ({ id: tag, name: tag }))
                ];

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setCategories(categoryOptions);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError(err instanceof Error ? err.message : "Failed to load projects");
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Filter projects based on active category
    const filteredProjects = activeFilter === "all"
        ? projects
        : projects.filter(project =>
            project.tags && Array.isArray(project.tags) && project.tags.includes(activeFilter)
        );

    // Handle projects click - optimized to prevent unnecessary re-renders
    const handleProjectClick = useCallback((project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    }, []);

    // Close modal
    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        // Don't clear the selected project immediately to keep it in memory
        // This helps when reopening the same project
    }, []);

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
                            <div
                                key={project.id}
                                onMouseEnter={() => setHoveredProjectId(project.id)}
                                onMouseLeave={() => setHoveredProjectId(null)}
                            >
                                <ProjectCard
                                    project={project}
                                    onClick={handleProjectClick}
                                    preloadImages={hoveredProjectId === project.id}
                                />
                            </div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Project Modal */}
                <ProjectModal
                    project={selectedProject}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />

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
                        onClick={() => window.location.href = "#contact"}
                    >
                        Contact us for more <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </motion.div>
            </div>

            {/* Featured Case Study */}
            {/*{projects.length > 0 && (*/}
            {/*    <div className="mt-24 bg-white py-16">*/}
            {/*        <div className="container mx-auto px-4 md:px-6">*/}
            {/*            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">*/}
            {/*                <motion.div*/}
            {/*                    initial={{ opacity: 0, x: -30 }}*/}
            {/*                    whileInView={{ opacity: 1, x: 0 }}*/}
            {/*                    transition={{ duration: 0.6 }}*/}
            {/*                    viewport={{ once: true }}*/}
            {/*                    className="rounded-xl overflow-hidden relative aspect-[4/3]"*/}
            {/*                >*/}
            {/*                    /!* Featured projects images *!/*/}
            {/*                    <div className="grid grid-cols-2 h-full">*/}
            {/*                        <div className="relative overflow-hidden">*/}
            {/*                            <ProjectImage*/}
            {/*                                src={projects[0].images && projects[0].images.length > 0 ? projects[0].images[0] : "/placeholder.jpg"}*/}
            {/*                                alt={`${projects[0].title} image`}*/}
            {/*                                fill*/}
            {/*                                className="object-cover"*/}
            {/*                            />*/}
            {/*                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/70 text-white text-center text-sm">Before</div>*/}
            {/*                        </div>*/}
            {/*                        <div className="relative overflow-hidden">*/}
            {/*                            <ProjectImage*/}
            {/*                                src={projects[0].images && projects[0].images.length > 1 ? projects[0].images[1] : (projects[0].images && projects[0].images.length > 0 ? projects[0].images[0] : "/placeholder.jpg")}*/}
            {/*                                alt={`${projects[0].title} image`}*/}
            {/*                                fill*/}
            {/*                                className="object-cover"*/}
            {/*                            />*/}
            {/*                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-emerald-800/70 text-white text-center text-sm">After</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </motion.div>*/}

            {/*                <motion.div*/}
            {/*                    initial={{ opacity: 0, x: 30 }}*/}
            {/*                    whileInView={{ opacity: 1, x: 0 }}*/}
            {/*                    transition={{ duration: 0.6 }}*/}
            {/*                    viewport={{ once: true }}*/}
            {/*                >*/}
            {/*                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-2">Featured Case Study</Badge>*/}
            {/*                    <h3 className="text-2xl font-bold text-emerald-950 mb-4">{projects[0].title}</h3>*/}

            {/*                    <div className="mb-6 space-y-4 text-emerald-800">*/}
            {/*                        <p>{projects[0].description}</p>*/}
            {/*                    </div>*/}

            {/*                    <div className="grid grid-cols-2 gap-4 mb-6">*/}
            {/*                        <div className="bg-emerald-50 p-4 rounded-lg shadow-sm">*/}
            {/*                            <p className="text-sm text-emerald-600 font-medium">Location</p>*/}
            {/*                            <p className="text-emerald-950">{projects[0].location}</p>*/}
            {/*                        </div>*/}
            {/*                        <div className="bg-emerald-50 p-4 rounded-lg shadow-sm">*/}
            {/*                            <p className="text-sm text-emerald-600 font-medium">Completed</p>*/}
            {/*                            <p className="text-emerald-950">*/}
            {/*                                {projects[0].completed_at*/}
            {/*                                    ? new Date(projects[0].completed_at).toLocaleDateString('en-US', {*/}
            {/*                                        year: 'numeric',*/}
            {/*                                        month: 'long'*/}
            {/*                                    })*/}
            {/*                                    : "In Progress"}*/}
            {/*                            </p>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}

            {/*                    <Button*/}
            {/*                        className="bg-emerald-800 hover:bg-emerald-700 text-white"*/}
            {/*                        onClick={() => {*/}
            {/*                            setSelectedProject(projects[0]);*/}
            {/*                            setIsModalOpen(true);*/}
            {/*                        }}*/}
            {/*                    >*/}
            {/*                        View Full Case Study*/}
            {/*                    </Button>*/}
            {/*                </motion.div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
        </section>
    );
};

export default PortfolioSection;