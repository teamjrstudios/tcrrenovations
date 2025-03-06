const API_URL = 'http://localhost:5005';
const PROJECT_ENDPOINT = `${API_URL}/data/projects`;
const CREATE_PROJECT_ENDPOINT = `${API_URL}/api/projects/create`;
const EDIT_PROJECT_ENDPOINT = `${API_URL}/api/projects/edit`;
const DELETE_PROJECT_ENDPOINT = `${API_URL}/api/projects/delete`;


export const fetchProjects = async () => {

    try {
        const res = await fetch(PROJECT_ENDPOINT, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        let data = await res.json();

        // Process the data to ensure images and tags are parsed from JSON strings
        // This part depends on how your Go backend formats the data
        data = data.map((project: { images: string; tags: string; }    ) => ({
            ...project,
            images: typeof project.images === 'string' ? JSON.parse(project.images) : project.images,
            tags: typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags
        }));

        return data;
    } catch (error) {
        console.error("API Error fetching projects:", error);
        throw error;
    }
};

// Create a new project
export const createProject = async (projectData: { title: string; description: string; images: string[]; tags: never[]; location: string; completed_at: string | null; }) => {
    try {
        const res = await fetch(CREATE_PROJECT_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Include auth token if you have one
            },
            body: JSON.stringify(projectData)
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("API Error creating project:", error);
        throw error;
    }
};

// Update an existing project
export const updateProject = async (projectId: number, projectData: { id: number; title: string; description: string; images: string[]; tags: never[]; location: string; completed_at: string | null; }) => {
    try {
        const res = await fetch(`${EDIT_PROJECT_ENDPOINT}/${projectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Include auth token if you have one
            },
            body: JSON.stringify(projectData)
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("API Error updating project:", error);
        throw error;
    }
};

// Delete a project
export const deleteProject = async (projectId: number) => {
    try {
        const res = await fetch(`${DELETE_PROJECT_ENDPOINT}/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Include auth token if you have one
            }
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
        }

        return true;
    } catch (error) {
        console.error("API Error deleting project:", error);
        throw error;
    }
};