export interface Project {
    id: number;
    title: string;
    description: string;
    location: string;
    status: "Completed" | string; // Assuming status can have other values
    start_date: string;
    completion_date: string;
    budget: number;
    contractor: string;
    architect: string;
    images: string[];
    features: string[];
}
export interface User {
    id: number;
    username: string;
    password: string;
}
export interface ProjectFormState {
    title: string;
    description: string;
    location: string;
    completedAt: Date | null;
    tags: {
        residential: boolean;
        commercial: boolean;
        renovation: boolean;
        newConstruction: boolean;
        sustainable: boolean;
        interior: boolean;
        exterior: boolean;
        historical: boolean;
    };
    imageInputs: ImageInput[];
}

export interface ImageInput {
    id: number;
    value: string;
}

export interface ApiStatus {
    loading: boolean;
    success: boolean;
    error: string | null;
}