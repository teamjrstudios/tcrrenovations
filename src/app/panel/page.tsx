"use client";

// Main Page Component
import { useState } from "react";
import ProjectNavbar from "@/components/projectnavbar";
import ProjectTable from "@/components/projecttable";
import ProjectStats from "@/components/projectstats";
import RecentProjects from "@/components/recentprojects";
import CreateProjectDialog from "@/components/createprojectdialog";
import EditProjectDialog from "@/components/editprojectdialog";
import DeleteProjectDialog from "@/components/deleteprojectdialog";
import { useProjectState } from "@/hooks/useprojectstate";

const ProjectsAdminPage = () => {
    const {
        projects,
        loading,
        error,
        page,
        setPage,
        totalPages,
        displayedProjects,
        selectedProject,
        setSelectedProject,
        formState,
        apiStatus,
        handleFormChange,
        handleDateChange,
        handleTagToggle,
        handleImageInputs,
        resetForm,
        handleCreateProject,
        handleUpdateProject,
        handleDeleteProject,
    } = useProjectState();

    // Dialog states
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // Open create dialog
    const openCreateDialog = () => {
        resetForm();
        setIsCreateDialogOpen(true);
    };

    // Open edit dialog with project data

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const openEditDialog = (project) => {
        setSelectedProject(project);
        handleFormChange('title', project.title);
        handleFormChange('description', project.description);
        handleFormChange('location', project.location || '');

        // Reset tags first, then set selected ones
        resetForm(); // This clears all form state including tags

        // Set tags
        if (project.tags && Array.isArray(project.tags)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            project.tags.forEach(tag => handleTagToggle(tag));
        }

        // Handle completion date
        if (project.completed_at) {
            handleDateChange(new Date(project.completed_at));
        }

        // Set image inputs
        if (project.images && project.images.length > 0) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            handleImageInputs('set', project.images.map((image, index) => ({
                id: index,
                value: image
            })));
        }

        setIsEditDialogOpen(true);
    };

    // Open delete confirmation dialog
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const openDeleteDialog = (project) => {
        setSelectedProject(project);
        setIsDeleteDialogOpen(true);
    };

    // Form submission handlers
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const onCreateSubmit = async (e) => {
        e.preventDefault();
        const success = await handleCreateProject();

        if (success) {
            // Close the dialog after a short delay
            setTimeout(() => {
                setIsCreateDialogOpen(false);
                resetForm();
            }, 1500);
        }
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const onUpdateSubmit = async (e) => {
        e.preventDefault();

        if (!selectedProject) return;

        const success = await handleUpdateProject();

        if (success) {
            // Close the dialog after a short delay
            setTimeout(() => {
                setIsEditDialogOpen(false);
                resetForm();
            }, 1500);
        }
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const onDeleteSubmit = async (e) => {
        e.preventDefault();

        if (!selectedProject) return;

        const success = await handleDeleteProject();

        if (success) {
            setIsDeleteDialogOpen(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            {/* Navbar */}
            <ProjectNavbar onCreateClick={openCreateDialog} />

            {/* Main content */}
            <main className="flex-1 py-6 px-4">
                <ProjectTable
                    loading={loading}
                    error={error}
                    projects={projects}
                    displayedProjects={displayedProjects}
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                    onEditClick={openEditDialog}
                    onDeleteClick={openDeleteDialog}
                />
            </main>

            {/* Statistics Section */}
            <ProjectStats
                loading={loading}
                projects={projects}
            />

            {/* Recently Added Projects */}
            <RecentProjects
                loading={loading}
                projects={projects}
                onEditClick={openEditDialog}
            />

            {/* Project Dialogs */}
            <CreateProjectDialog
                isOpen={isCreateDialogOpen}
                setIsOpen={setIsCreateDialogOpen}
                formState={formState}
                apiStatus={apiStatus}
                onFormChange={handleFormChange}
                onDateChange={handleDateChange}
                onToggleTag={handleTagToggle}
                onImageInputs={handleImageInputs}
                onSubmit={onCreateSubmit}
            />

            <EditProjectDialog
                isOpen={isEditDialogOpen}
                setIsOpen={setIsEditDialogOpen}
                formState={formState}
                apiStatus={apiStatus}
                onFormChange={handleFormChange}
                onDateChange={handleDateChange}
                onToggleTag={handleTagToggle}
                onImageInputs={handleImageInputs}
                selectedProject={selectedProject}
                onSubmit={onUpdateSubmit}
            />

            <DeleteProjectDialog
                isOpen={isDeleteDialogOpen}
                setIsOpen={setIsDeleteDialogOpen}
                apiStatus={apiStatus}
                selectedProject={selectedProject}
                onDelete={onDeleteSubmit}
            />
        </div>
    );
};

export default ProjectsAdminPage;