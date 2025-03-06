// components/ProjectNavbar.jsx
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
interface ProjectNavbarProps {
    onCreateClick: () => void;
}
const ProjectNavbar = ({ onCreateClick }:ProjectNavbarProps) => {
    return (
        <header className="sticky top-0 z-40 border-b bg-white">
            <div className="flex h-16 items-center justify-between py-4 px-4">
                <h1 className="text-2xl font-bold">Project Management</h1>

                <Button onClick={onCreateClick}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Project
                </Button>
            </div>
        </header>
    );
};

export default ProjectNavbar;

