// hooks/useprojectstate.js
import { useState, useEffect } from 'react';
import { format } from "date-fns";
import {
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
} from '@/services/projectService';  // Updated import path

export const useProjectState = () => {
    // Projects data state
    const [projects, setProjects] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [selectedProject, setSelectedProject] = useState(null);

    // Form state
    const [formState, setFormState] = useState({
        title: '',
        description: '',
        location: '',
        selectedDate: undefined,
        imageInputs: [{ id: 0, value: '' }],
        selectedTags: [],
    });

    // API status state
    const [apiStatus, setApiStatus] = useState({
        loading: false,
        success: null,
        message: '',
    });

    // Fetch projects on component mount
    useEffect(() => {

        loadProjects();
    }, []);

    // Load projects
    const loadProjects = async () => {
        setLoading(true);
        try {
            const data = await fetchProjects();
            setProjects(data);
            setError(null);
        } catch (err) {
            setError(err);
            console.error("Error fetching projects:", err);
        } finally {
            setLoading(false);
        }
    };

    // Calculate pagination
    const itemsPerPage = 5;
    const totalPages = projects ? Math.ceil(projects.length / itemsPerPage) : 0;
    const displayedProjects = projects ? projects.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    ) : [];

    // Handler for form field changes
    const handleFormChange = (field, value) => {
        setFormState(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handler for date selection
    const handleDateChange = (date) => {
        setFormState(prev => ({
            ...prev,
            selectedDate: date
        }));
    };

    // Handler for tag selection
    const handleTagToggle = (tag) => {
        setFormState(prev => {
            const selectedTags = [...prev.selectedTags];
            if (selectedTags.includes(tag)) {
                return {
                    ...prev,
                    selectedTags: selectedTags.filter(t => t !== tag)
                };
            } else {
                return {
                    ...prev,
                    selectedTags: [...selectedTags, tag]
                };
            }
        });
    };

    // Handler for image inputs management
    const handleImageInputs = (action, payload) => {
        if (action === 'add') {
            setFormState(prev => ({
                ...prev,
                imageInputs: [...prev.imageInputs, { id: prev.imageInputs.length, value: '' }]
            }));
        } else if (action === 'remove') {
            setFormState(prev => ({
                ...prev,
                imageInputs: prev.imageInputs.filter(input => input.id !== payload)
            }));
        } else if (action === 'update') {
            const { id, value } = payload;
            setFormState(prev => ({
                ...prev,
                imageInputs: prev.imageInputs.map(input =>
                    input.id === id ? { ...input, value } : input
                )
            }));
        } else if (action === 'set') {
            setFormState(prev => ({
                ...prev,
                imageInputs: payload
            }));
        }
    };

    // Reset form state
    const resetForm = () => {
        setFormState({
            title: '',
            description: '',
            location: '',
            selectedDate: undefined,
            imageInputs: [{ id: 0, value: '' }],
            selectedTags: [],
        });
        setSelectedProject(null);
        setApiStatus({
            loading: false,
            success: null,
            message: '',
        });
    };

    // Handle create project
    const handleCreateProject = async () => {
        setApiStatus({ loading: true, success: null, message: '' });

        try {
            // Prepare images array (filter out empty strings)
            const images = formState.imageInputs
                .map(input => input.value)
                .filter(url => url.trim() !== '');

            // Create project request body
            const projectData = {
                title: formState.title,
                description: formState.description,
                images: images,
                tags: formState.selectedTags,
                location: formState.location,
                completed_at: formState.selectedDate ? format(formState.selectedDate, "yyyy-MM-dd'T'HH:mm:ss'Z'") : null
            };

            await createProject(projectData);
            await loadProjects(); // Refresh the projects list
            setApiStatus({ loading: false, success: true, message: 'Project created successfully!' });
            return true;
        } catch (err) {
            console.error("Error creating project:", err);
            setApiStatus({
                loading: false,
                success: false,
                message: err instanceof Error ? err.message : 'Failed to create project'
            });
            return false;
        }
    };

    // Handle update project
    const handleUpdateProject = async () => {
        if (!selectedProject) return false;

        setApiStatus({ loading: true, success: null, message: '' });

        try {
            // Prepare images array (filter out empty strings)
            const images = formState.imageInputs
                .map(input => input.value)
                .filter(url => url.trim() !== '');

            // Create project request body
            const projectData = {
                id: selectedProject.id,
                title: formState.title,
                description: formState.description,
                images: images,
                tags: formState.selectedTags,
                location: formState.location,
                completed_at: formState.selectedDate ? format(formState.selectedDate, "yyyy-MM-dd'T'HH:mm:ss'Z'") : null
            };

            await updateProject(selectedProject.id, projectData);
            await loadProjects(); // Refresh the projects list
            setApiStatus({ loading: false, success: true, message: 'Project updated successfully!' });
            return true;
        } catch (err) {
            console.error("Error updating project:", err);
            setApiStatus({
                loading: false,
                success: false,
                message: err instanceof Error ? err.message : 'Failed to update project'
            });
            return false;
        }
    };

    // Handle delete project
    const handleDeleteProject = async () => {
        if (!selectedProject) return false;

        setApiStatus({ loading: true, success: null, message: '' });

        try {
            await deleteProject(selectedProject.id);
            await loadProjects(); // Refresh the projects list
            setApiStatus({ loading: false, success: true, message: 'Project deleted successfully!' });
            return true;
        } catch (err) {
            console.error("Error deleting project:", err);
            setApiStatus({
                loading: false,
                success: false,
                message: err instanceof Error ? err.message : 'Failed to delete project'
            });
            return false;
        }
    };

    return {
        // Data
        projects,
        loading,
        error,
        page,
        setPage,
        totalPages,
        displayedProjects,
        selectedProject,
        setSelectedProject,

        // Form
        formState,
        apiStatus,

        // Handlers
        handleFormChange,
        handleDateChange,
        handleTagToggle,
        handleImageInputs,
        resetForm,

        // API actions
        handleCreateProject,
        handleUpdateProject,
        handleDeleteProject,
    };
};