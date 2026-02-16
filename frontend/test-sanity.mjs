import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vnp9hjul',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function test() {
  try {
    console.log('Testing Sanity connection...\n');

    // Test 1: Get all projects
    const allProjects = await client.fetch('*[_type == "project"] { _id, title, featured, status }');
    console.log(`✅ Total projects: ${allProjects.length}`);
    console.log('Projects:', JSON.stringify(allProjects, null, 2));

    // Test 2: Get featured projects
    const featured = await client.fetch('*[_type == "project" && featured == true]');
    console.log(`\n✅ Featured projects: ${featured.length}`);

    // Test 3: Get ongoing projects
    const ongoing = await client.fetch('*[_type == "project" && status == "ongoing"]');
    console.log(`✅ Ongoing projects: ${ongoing.length}`);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

test();
