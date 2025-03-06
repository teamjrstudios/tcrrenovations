import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
interface ProjectStatsProps {
    loading: boolean;
    projects: {
        id: string; // Or number, depending on your project's ID type
        completed_at: string | null; // Assuming completed_at is a date string or null
        // Add other project properties as needed
        [key: string]: any; // Allow for other project properties
    }[] | null; // Projects can be an array of project objects or null
}
const ProjectStats = ({ loading, projects }: ProjectStatsProps) => {
    return (
        <div className="py-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Total Projects
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            {loading ? <Skeleton className="h-10 w-16" /> : projects ? projects.length : 0}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Completed Projects
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            {loading ? (
                                <Skeleton className="h-10 w-16" />
                            ) : (
                                projects ? projects.filter(p => p.completed_at).length : 0
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            In Progress
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            {loading ? (
                                <Skeleton className="h-10 w-16" />
                            ) : (
                                projects ? projects.filter(p => !p.completed_at).length : 0
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProjectStats;