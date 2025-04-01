import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from "next/image";

// Create a new PrismaClient instance
const prisma = new PrismaClient();

// Define types
interface Image {
    id: string;
    url: string;
    alt: string | null;
    description: string | null;
    isCover: boolean;
    order: number;
}

interface Tag {
    name: string;
}

interface TagOnProject {
    tag: Tag;
}

interface Project {
    id: string;
    title: string;
    description: string;
    location: string | null;
    startDate: Date | null;
    endDate: Date | null;
    status: string;
    featured: boolean;
    images: Image[];
    tags: TagOnProject[];
}

// Generate static params for all projects
export async function generateStaticParams() {
    try {
        const projects = await prisma.project.findMany({
            select: { id: true },
        });

        return projects.map((project) => ({
            id: project.id,
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

// Fetch project data
async function getProject(id: string): Promise<Project | null> {
    try {
        const project = await prisma.project.findUnique({
            where: { id },
            include: {
                images: {
                    orderBy: {
                        order: 'asc',
                    },
                },
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        return project;
    } catch (error) {
        console.error('Error fetching project:', error);
        return null;
    }
}

// Format date for display
function formatDate(date: Date | null) {
    if (!date) return 'TBD';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

// Get status badge styling
function getStatusBadge(status: string) {
    const statusMap: Record<string, { color: string; label: string }> = {
        PLANNED: { color: 'bg-blue-100 text-blue-800', label: 'Planned' },
        ONGOING: { color: 'bg-green-100 text-green-800', label: 'Ongoing' },
        COMPLETED: { color: 'bg-purple-100 text-purple-800', label: 'Completed' },
        ON_HOLD: { color: 'bg-yellow-100 text-yellow-800', label: 'On Hold' },
        CANCELLED: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
    };

    return statusMap[status] || { color: 'bg-gray-100 text-gray-800', label: status };
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
    const project = await getProject(params.id);

    if (!project) {
        notFound();
    }

    // Get cover image
    const coverImage = project.images.find((img) => img.isCover) || project.images[0];

    // Group non-cover images
    const galleryImages = project.images.filter((img) => img !== coverImage);

    // Get status badge
    const { color, label } = getStatusBadge(project.status);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link href="/projects" className="text-green-600 hover:text-green-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Projects
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Cover image */}
                {coverImage && (
                    <div className="relative h-80 w-full">
                        <Image
                            width={1920}
                            height={1080}
                            src={coverImage.url}
                            alt={coverImage.alt || project.title}
                            className="w-full h-full object-cover"
                        />

                        {/* Status badge */}
                        <div className="absolute top-4 right-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${color}`}>
                {label}
              </span>
                        </div>

                        {/* Featured badge */}
                        {project.featured && (
                            <div className="absolute top-4 left-4">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                  Featured Project
                </span>
                            </div>
                        )}
                    </div>
                )}

                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

                    {/* Project details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {/* Location */}
                        {project.location && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700">Location</h2>
                                <p className="text-gray-600">{project.location}</p>
                            </div>
                        )}

                        {/* Timeline */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700">Timeline</h2>
                            <p className="text-gray-600">
                                {formatDate(project.startDate)} - {formatDate(project.endDate)}
                            </p>
                        </div>

                        {/* Tags */}
                        {project.tags.length > 0 && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700">Categories</h2>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(({ tag }, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {tag.name}
                    </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">About This Project</h2>
                        <div className="prose max-w-none text-gray-700">
                            {project.description.split('\n').map((paragraph, index) => (
                                <p key={index} className="mb-4">{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    {/* Gallery */}
                    {galleryImages.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Project Gallery</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {galleryImages.map((image) => (
                                    <div key={image.id} className="rounded-lg overflow-hidden shadow-md">
                                        <Image
                                            src={image.url}
                                            alt={image.alt || 'Project image'}
                                            className="w-full h-48 object-cover"
                                            width={1920}
                                            height={1080}
                                        />
                                        {image.description && (
                                            <div className="p-3 bg-gray-50">
                                                <p className="text-sm text-gray-600">{image.description}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}