// components/editprojectdialog.jsx
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import ProjectFormFields from "./projectformfields";
import StatusAlert from "./statusalert";

const EditProjectDialog = ({
                               isOpen,
                               setIsOpen,
                               formState,
                               apiStatus,
                               onFormChange,
                               onDateChange,
                               onToggleTag,
                               onImageInputs,
                               selectedProject,
                               onSubmit
                           }) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Project</DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4 py-4">
                    <ProjectFormFields
                        formState={formState}
                        onFormChange={onFormChange}
                        onDateChange={onDateChange}
                        onToggleTag={onToggleTag}
                        onImageInputs={onImageInputs}
                    />

                    {/* Status alert */}
                    <StatusAlert apiStatus={apiStatus} />

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            disabled={apiStatus.loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={apiStatus.loading}
                        >
                            {apiStatus.loading ? 'Updating...' : 'Update Project'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProjectDialog;