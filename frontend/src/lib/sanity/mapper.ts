import { SanityProject } from "./types";
import { Project } from "@/components/projects/ProjectCard";
import { urlFor } from "./image"; // Assuming you will create this or have a way to build image URLs

// Helper to handle "other" values mapping to "category_other"
const mapValue = (value: string | undefined, prefix: string, otherKey: string) => {
    if (!value) return null;
    if (value === 'other') return otherKey; // e.g. 'building_other'
    return value; // e.g. 'office'
};

// Mappings for specific overrides (if Sanity value != Frontend ID)
const BUILDING_TYPE_MAP: Record<string, string> = {
    'office': 'office',
    'commercial': 'commercial',
    'institutional': 'institutional',
    'residential_collective': 'residential_collective',
    'residential_single': 'residential_single',
    'industrial': 'industrial',
    'other': 'building_other'
};

const WORK_TYPE_MAP: Record<string, string> = {
    'new': 'new_build',
    'renovation': 'renovation',
    'other': 'work_other'
};

const SERVICE_SCOPE_MAP: Record<string, string> = {
    'full': 'full_mission',
    'previous': 'previous_projects',
    'pm': 'pm',
    'consulting': 'consulting',
    'other': 'service_other'
};

const STATUS_MAP: Record<string, string> = {
    'study': 'study',
    'ongoing': 'ongoing',
    'finished': 'finished',
    'other': 'status_other'
};

const LOCATION_MAP: Record<string, string> = {
    'madrid': 'madrid',
    'barcelona': 'barcelona',
    'other': 'location_other'
};

export function mapSanityProjectToProject(sanityProject: SanityProject): Project {
    const tags: string[] = [];

    // 1. Building Type
    if (sanityProject.buildingType && BUILDING_TYPE_MAP[sanityProject.buildingType]) {
        tags.push(BUILDING_TYPE_MAP[sanityProject.buildingType]);
    }

    // 2. Work Type
    if (sanityProject.workType && WORK_TYPE_MAP[sanityProject.workType]) {
        tags.push(WORK_TYPE_MAP[sanityProject.workType]);
    }

    // 3. Service Scope
    if (sanityProject.serviceScope && SERVICE_SCOPE_MAP[sanityProject.serviceScope]) {
        tags.push(SERVICE_SCOPE_MAP[sanityProject.serviceScope]);
    }

    // 4. Status
    if (sanityProject.status && STATUS_MAP[sanityProject.status]) {
        tags.push(STATUS_MAP[sanityProject.status]);
    }

    // 5. Location
    if (sanityProject.locationFilter && LOCATION_MAP[sanityProject.locationFilter]) {
        tags.push(LOCATION_MAP[sanityProject.locationFilter]);
    }

    // Generate Image URL (Placeholder logic until urlFor is verified)
    const imageUrl = sanityProject.mainImage ? urlFor(sanityProject.mainImage).url() : '/images/placeholder.jpg';

    return {
        id: sanityProject._id,
        title: typeof sanityProject.title === 'object' ? (sanityProject.title as any).es || 'Sin título' : sanityProject.title || 'Sin título', // Handle localized string
        location: sanityProject.location?.city || 'Ubicación desconocida',
        year: sanityProject.year?.toString() || '',
        area: sanityProject.area ? `${sanityProject.area} m²` : '',
        image: imageUrl,
        tags: tags,
        description: (sanityProject.description as any)?.es || sanityProject.description,
        gallery: sanityProject.gallery?.map((img: any) => urlFor(img).url()) || [],
        client: sanityProject.client,
        collaborators: sanityProject.collaborators,
        awards: sanityProject.awards,
        excerpt: typeof sanityProject.excerpt === 'object' ? (sanityProject.excerpt as any).es : sanityProject.excerpt
    };
}
