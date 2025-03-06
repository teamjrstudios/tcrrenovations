// components/deleteprojectdialog.jsx
import { AlertCircle } from "lucide-react";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DeleteProjectDialog = ({
                                 isOpen,
                                 setIsOpen,
                                 apiStatus,
                                 selectedProject,
                                 onDelete
                             }) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the project
                        <strong> {selectedProject?.title}</strong> and remove it from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {apiStatus.success === false && (
                    <Alert className="mt-4 bg-red-50 border-red-200">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertTitle className="text-red-800">Error</AlertTitle>
                        <AlertDescription className="text-red-700">
                            {apiStatus.message}
                        </AlertDescription>
                    </Alert>
                )}

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={apiStatus.loading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onDelete}
                        disabled={apiStatus.loading}
                        className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                    >
                        {apiStatus.loading ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteProjectDialog;