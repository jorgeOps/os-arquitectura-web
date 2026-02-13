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
export const FEATURED_PROJECTS_QUERY = defineQuery(`*[_type == "project"] | order(year desc) [0...3] {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  buildingType,
  location,
  year
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
