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
