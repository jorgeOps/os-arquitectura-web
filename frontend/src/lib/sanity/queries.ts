import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`*[_type == "project"] | order(year desc) {
  _id,
  title,
  slug,
  mainImage,
  gallery,
  description,
  excerpt,
  buildingType,
  workType,
  serviceScope,
  status,
  locationFilter,
  location,
  year,
  area,
  client,
  collaborators,
  awards,

  "tags": []
}`);

export const PROJECT_BY_SLUG_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  gallery,
  description,
  excerpt,
  buildingType,
  workType,
  serviceScope,
  status,
  locationFilter,
  location,
  year,
  area,
  client,
  collaborators,
  awards,
  "tags": []
}`);

// Featured projects for homepage
export const FEATURED_PROJECTS_QUERY = defineQuery(`*[_type == "project" && featured == true] | order(year desc) {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  buildingType,
  location,
  year
}`);

// Pool of projects for random Hero display
export const HERO_POOL_QUERY = defineQuery(`*[_type == "project" && defined(mainImage)] {
  _id,
  title,
  slug,
  mainImage
}`);

// Fallback: All projects if no featured projects exist
export const ALL_PROJECTS_FALLBACK_QUERY = defineQuery(`*[_type == "project"] | order(year desc) [0...5] {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  buildingType,
  location,
  year
}`);

// Ongoing projects for "Novedades y Publicaciones" section
export const ONGOING_PROJECTS_QUERY = defineQuery(`*[_type == "project" && status == "ongoing"] | order(publishedAt desc) [0...4] {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  buildingType,
  location,
  year,
  publishedAt
}`);

// Publications queries
export const PUBLICATIONS_QUERY = defineQuery(`*[_type == "publication"] | order(publishDate desc) {
  _id,
  title,
  slug,
  coverImage,
  content,
  publishDate,
  publisher,
  authors,
  pdfFile,
  externalLink,
  tags,
  featured
}`);

export const PUBLICATION_BY_SLUG_QUERY = defineQuery(`*[_type == "publication" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  coverImage,
  content,
  publishDate,
  publisher,
  authors,
  pdfFile,
  externalLink,
  tags,
  featured
}`);

// Awards queries
export const AWARDS_QUERY = defineQuery(`*[_type == "award"] | order(year desc) {
  _id,
  name,
  slug,
  year,
  organization,
  category,
  coverImage,
  description,
  relatedProject->{
    _id,
    title,
    slug
  },
  ceremonyGallery,
  certificate {
    asset->
  },
  video {
    asset->
  },
  externalLink,
  tags,
  featured
}`);

// Featured awards for homepage
export const FEATURED_AWARDS_QUERY = defineQuery(`*[_type == "award" && featured == true] | order(year desc) [0...3] {
  _id,
  name,
  slug,
  year,
  organization,
  coverImage,
  featured
}`);

export const AWARD_BY_SLUG_QUERY = defineQuery(`*[_type == "award" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  year,
  organization,
  category,
  coverImage,
  description,
  relatedProject->{
    _id,
    title,
    slug,
    mainImage
  },
  ceremonyGallery,
  certificate {
    asset->
  },
  video {
    asset->
  },
  externalLink,
  tags,
  featured,
  publishedAt
}`);

// Media Coverage queries
export const MEDIA_COVERAGE_QUERY = defineQuery(`*[_type == "mediaCoverage"] | order(startDate desc) {
  _id,
  title,
  slug,
  startDate,
  endDate,
  coverImage,
  description,
  coverageType,
  mediaOutlets,
  gallery,
  videos,
  documents[] {
    _key,
    title,
    asset-> {
      _id,
      url,
      originalFilename,
      size,
      extension
    }
  },
  externalLinks,
  tags,
  featured,
  publishedAt
}`);

export const MEDIA_COVERAGE_BY_SLUG_QUERY = defineQuery(`*[_type == "mediaCoverage" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  startDate,
  endDate,
  coverImage,
  description,
  coverageType,
  mediaOutlets,
  gallery,
  videos,
  documents[] {
    _key,
    title,
    asset-> {
      _id,
      url,
      originalFilename,
      size,
      extension
    }
  },
  externalLinks,
  tags,
  featured,
  publishedAt
}`);
