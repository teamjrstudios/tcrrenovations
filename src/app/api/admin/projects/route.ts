// app/api/admin/projects/route.ts
import { NextResponse } from 'next/server';

// Define the TypeScript type
type Project = {
    id: number;
    title: string;
    description: string;
    tags: string[];
    serverImagePaths: string[];
    location: string;
};

// GET: Fetch all public projects
export async function GET() {
    try {
        // Fetch the data from the remote API
        const response = await fetch("http://147.135.31.124:8000/api/projects");

        // Check if the response is ok
        if (!response.ok) {
            return new Response(`HTTP error! Status: ${response.status}`, {status: 500});
        }

        // Parse the response as JSON
        const data: Project[] = await response.json();

        // Return the data with the appropriate headers
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error fetching projects:", error);

        // Return an error response
        return NextResponse.json(
            { error: "Failed to fetch projects" },
            { status: 500 }
        );
    }
}