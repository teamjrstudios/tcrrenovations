// components/RecentProjects.jsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
interface Project {
    id: string;
    title: string;
    description: string;
    images?: string[];
    tags?: string[];
}

interface RecentProjectsProps {
    loading: boolean;
    projects: Project[];
    onEditClick: (project: Project) => void;
}

const RecentProjects = ({ loading, projects, onEditClick }:RecentProjectsProps) => {
    return (
        <div className="py-4 px-4 mb-8">
            <Card>
                <CardHeader>
                    <CardTitle>Recently Added</CardTitle>
                    <CardDescription>
                        The latest projects added to your portfolio
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="overflow-hidden">
                                    <div className="aspect-video relative bg-gray-100">
                                        <Skeleton className="h-full w-full" />
                                    </div>
                                    <div className="p-4">
                                        <Skeleton className="h-6 w-3/4 mb-2" />
                                        <Skeleton className="h-4 w-full mb-1" />
                                        <Skeleton className="h-4 w-2/3" />
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : projects && projects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {projects.slice(0, 3).map((project) => (
                                <Card key={project.id} className="overflow-hidden">
                                    <div className="aspect-video relative bg-gray-100">
                                        {project.images && project.images.length > 0 ? (
                                            <img
                                                src={project.images[0]}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400">
                                                No image
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-medium mb-1">{project.title}</h3>
                                        <p className="text-sm text-gray-500 mb-2">
                                            {project.description.substring(0, 100)}
                                            {project.description.length > 100 ? "..." : ""}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-wrap gap-1">
                                                {project.tags && project.tags.slice(0, 2).map((tag) => (
                                                    <Badge key={tag} variant="outline" className="text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                                {project.tags && project.tags.length > 2 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{project.tags.length - 2}
                                                    </Badge>
                                                )}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onEditClick(project)}
                                            >
                                                Edit
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No projects available
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default RecentProjects;

// components/StatusAlert.jsx


// components/ProjectFormFields.jsx
