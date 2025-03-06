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
import {Key} from "react";

interface ImageInput {
    id: Key | null | undefined;
    value: string | number | undefined;
}

interface FormState {
    title: string;
    description: string;
    imageInputs: ImageInput[];
    selectedTags: string;
    location: string;
    selectedDate?: Date;
}

interface ApiStatus {
    loading: boolean;
    error: string | null;
    success: boolean;
}

interface EditProjectDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    formState: FormState;
    apiStatus: ApiStatus;
    onFormChange: (field: keyof FormState, value: string) => void;
    onDateChange: (date?: Date) => void;
    onToggleTag: (tag: string) => void;
    onImageInputs: (
        action: "add" | "remove" | "update",
        payload?: ImageInput | Key | null | undefined
    ) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}


const EditProjectDialog = ({
                               isOpen,
                               setIsOpen,
                               formState,
                               apiStatus,
                               onFormChange,
                               onDateChange,
                               onToggleTag,
                               onImageInputs,
                               onSubmit
                           }:EditProjectDialogProps) => {

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Project</DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4 py-4">
                    {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                    {/*@ts-ignore*/}
                    <ProjectFormFields formState={formState} onFormChange={onFormChange} onImageInputs={onImageInputs}
                        onDateChange={onDateChange}
                        onToggleTag={onToggleTag}
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