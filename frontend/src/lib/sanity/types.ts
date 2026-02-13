
export interface SanityProject {
    _id: string;
    title: any; // LocalizedString
    slug: { current: string } | null;
    mainImage: any;
    gallery?: any[];
    description?: any; // Blocks
    excerpt?: any; // LocalizedString
    buildingType?: 'office' | 'commercial' | 'institutional' | 'residential_collective' | 'residential_single' | 'industrial' | 'other';
    workType?: 'new' | 'renovation' | 'other';
    serviceScope?: 'full' | 'previous' | 'pm' | 'consulting' | 'other';
    status?: 'study' | 'ongoing' | 'finished' | 'other';
    locationFilter?: 'madrid' | 'barcelona' | 'other';
    location?: { city: string; country: string };
    year: number;
    area: number;
    client?: string;
    collaborators?: { name: string; role: string }[];
    awards?: { name: string; year: number; organization: string }[];
}

export interface SanityPublication {
    _id: string;
    title: any; // LocalizedString
    slug: { current: string } | null;
    coverImage?: any;
    content: any; // LocalizedBlockContent
    publishDate?: string;
    publisher?: string;
    authors?: string[];
    pdfFile?: any;
    externalLink?: string;
    tags?: string[];
    featured?: boolean;
}

export interface SanityAward {
    _id: string;
    name: any; // LocalizedString
    slug: { current: string } | null;
    year: number;
    organization: string;
    category?: string;
    coverImage: any;
    description: any; // LocalizedBlockContent
    relatedProject?: {
        _id: string;
        title: any; // LocalizedString
        slug: { current: string };
        mainImage?: any;
    };
    ceremonyGallery?: any[];
    certificate?: any;
    video?: any;
    externalLink?: string;
    tags?: string[];
    featured?: boolean;
    publishedAt?: string;
}
