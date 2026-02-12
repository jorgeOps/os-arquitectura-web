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
