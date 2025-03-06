import { NextResponse } from "next/server";
type Project = {
    id: string;
    title: string;
    description: string;
    images: string[];
    tags: string[];
    location?: string;
    dateCompleted?: Date;
    createdAt: Date;
};
const mockProjects: Project[] = [
    {
        id: "1",
        title: "Downtown Office Complex",
        description: "A 12-story office building with modern amenities",
        images: ["/api/placeholder/800/600"],
        tags: ["Commercial", "New Construction"],
        location: "New York, NY",
        dateCompleted: new Date("2023-10-15"),
        createdAt: new Date("2023-01-10"),
    },
    {
        id: "2",
        title: "Riverfront Apartments",
        description: "Luxury residential apartments with riverside views",
        images: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
        tags: ["Residential", "New Construction"],
        location: "Chicago, IL",
        dateCompleted: new Date("2023-08-22"),
        createdAt: new Date("2022-11-05"),
    },
    {
        id: "3",
        title: "Heritage Building Renovation",
        description: "Historical building restoration with modern upgrades",
        images: ["/api/placeholder/800/600"],
        tags: ["Commercial", "Renovation", "Historical"],
        location: "Boston, MA",
        dateCompleted: new Date("2023-12-01"),
        createdAt: new Date("2023-03-15"),
    },
    {
        id: "4",
        title: "Community Center",
        description: "Multi-purpose community facility with sports amenities",
        images: ["/api/placeholder/800/600"],
        tags: ["Public", "New Construction"],
        location: "Seattle, WA",
        createdAt: new Date("2023-06-01"),
    },
    {
        id: "5",
        title: "Hospital Wing Addition",
        description: "State-of-the-art medical facility expansion",
        images: ["/api/placeholder/800/600"],
        tags: ["Healthcare", "Addition"],
        location: "Austin, TX",
        dateCompleted: new Date("2024-01-30"),
        createdAt: new Date("2023-04-10"),
    },
];
export async function GET() {

    return NextResponse.json(mockProjects);
}