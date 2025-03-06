import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarIcon, ImagePlus, Trash2 } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Key } from "react";

// Available tags for projects
const availableTags = [
    "web",
    "development",
    "golang",
    "react",
    "nextjs",
    "design",
    "mobile",
    "backend"
];

interface ProjectFormFieldsProps {
    formState: {
        title: string;
        description: string;
        imageInputs: { id: Key | null | undefined; value: string | number | readonly string[] | undefined }[];
        selectedTags: string[];
        location: string;
        selectedDate: Date | undefined;
    };
    onFormChange: (field: string, value: string) => void;
    onDateChange: (date: Date | undefined) => void;
    onToggleTag: (tag: string) => void;
    onImageInputs: (
        action: "add" | "remove" | "update",
        payload?: { id?: Key | null | undefined; value?: string | number | readonly string[] | undefined } | Key | null | undefined
    ) => void;
}


const ProjectFormFields = ({
                               formState,
                               onFormChange,
                               onDateChange,
                               onToggleTag,
                               onImageInputs
                           }:ProjectFormFieldsProps) => {
    return (
        <>
            <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                    Project Title
                </label>
                <Input
                    id="title"
                    value={formState.title}
                    onChange={(e) => onFormChange('title', e.target.value)}
                    placeholder="Enter project title"
                    required
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                    Description
                </label>
                <Textarea
                    id="description"
                    value={formState.description}
                    onChange={(e) => onFormChange('description', e.target.value)}
                    placeholder="Enter project description"
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Images (URLs)
                </label>
                <div className="space-y-2">
                    {formState.imageInputs.map((input: { id: Key | null | undefined; value: string | number | readonly string[] | undefined; }) => (
                        <div key={input.id} className="flex items-center gap-2">
                            <Input
                                type="text"
                                value={input.value}
                                onChange={(e) => onImageInputs('update', { id: input.id, value: e.target.value })}
                                placeholder="Enter image URL"
                                className="flex-1"
                            />
                            {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                            {/*@ts-ignore*/}
                            {input.id > 0 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => onImageInputs('remove', input.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => onImageInputs('add')}
                    className="w-full"
                >
                    <ImagePlus className="mr-2 h-4 w-4" />
                    Add Another Image URL
                </Button>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Tags
                </label>
                <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                        <Badge
                            key={tag}
                            variant={formState.selectedTags.includes(tag) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => onToggleTag(tag)}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                    Location
                </label>
                <Input
                    id="location"
                    value={formState.location}
                    onChange={(e) => onFormChange('location', e.target.value)}
                    placeholder="Enter project location"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Completion Date
                </label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formState.selectedDate ? format(formState.selectedDate, "PPP") : "Select a date"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={formState.selectedDate}
                            onSelect={onDateChange}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </>
    );
};

export default ProjectFormFields;