import { motion } from "framer-motion";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
interface ProjectTableProps {
    loading: boolean;
    error: Error | null; // Assuming error is an Error object or null
    projects: {
        id: string; // Or number, depending on your project's ID type
        title: string;
        description: string;
        tags: string[];
        location: string | null;
        completed_at: string | null; // Assuming completed_at is a date string or null
        [key: string]: any; // Allow for other project properties
    }[] | null;
    displayedProjects: {
        id: string;
        title: string;
        description: string;
        tags: string[];
        location: string | null;
        completed_at: string | null;
        [key: string]: any;
    }[];
    page: number;
    setPage: (page: number | ((prevPage: number) => number)) => void;
    totalPages: number;
    onEditClick: (project: {
        id: string;
        title: string;
        description: string;
        tags: string[];
        location: string | null;
        completed_at: string | null;
        [key: string]: any;
    }) => void;
    onDeleteClick: (project: {
        id: string;
        title: string;
        description: string;
        tags: string[];
        location: string | null;
        completed_at: string | null;
        [key: string]: any;
    }) => void;
}


// Animation variants for table rows
const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeOut"
        }
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const ProjectTable = ({
                          loading,
                          error,
                          projects,
                          displayedProjects,
                          page,
                          setPage,
                          totalPages,
                          onEditClick,
                          onDeleteClick
                      }: ProjectTableProps) => {
    const itemsPerPage = 5;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Manage Projects</CardTitle>
                <CardDescription>
                    View and manage your portfolio projects
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Project</TableHead>
                            <TableHead>Tags</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Completed</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            // Loading state with skeleton rows
                            Array.from({ length: itemsPerPage }).map((_, index) => (
                                <TableRow key={`skeleton-${index}`}>
                                    <TableCell>
                                        <div className="flex flex-col gap-2">
                                            <Skeleton className="h-6 w-48" />
                                            <Skeleton className="h-4 w-64" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            <Skeleton className="h-5 w-16" />
                                            <Skeleton className="h-5 w-20" />
                                        </div>
                                    </TableCell>
                                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Skeleton className="h-8 w-16" />
                                            <Skeleton className="h-8 w-16" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <div className="flex justify-center py-6 text-red-500">
                                        Error: {error.message}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : !projects || projects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <div className="flex justify-center py-6 text-gray-500">
                                        No projects found
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            // Loaded projects with framer motion animations
                            displayedProjects.map((project, index) => (
                                <motion.tr
                                    key={project.id}
                                    className="border-b transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-50"
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    custom={index}
                                    variants={tableRowVariants}
                                    layout
                                >
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span>{project.title}</span>
                                            <span className="text-sm text-gray-500">
                                                {project.description.substring(0, 60)}
                                                {project.description.length > 60 ? "..." : ""}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {project.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>{project.location || "—"}</TableCell>
                                    <TableCell>
                                        {project.completed_at
                                            ? format(new Date(project.completed_at), "MMM d, yyyy")
                                            : "In progress"}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => onEditClick(project)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => onDeleteClick(project)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </motion.tr>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="flex justify-center">
                {!loading && projects && projects.length > 0 && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }).map((_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        onClick={() => setPage(i + 1)}
                                        isActive={page === i + 1}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </CardFooter>
        </Card>
    );
};

export default ProjectTable;