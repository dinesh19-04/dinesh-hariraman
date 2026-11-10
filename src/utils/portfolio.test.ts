import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactForm,
  filterProjects,
  filterSkillCategories,
  type ProjectItem,
  type SkillCategoryGroup,
} from './portfolio';

test('validateContactForm passes valid submission', () => {
  const result = validateContactForm({
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    subject: 'Collaboration opportunity',
    message: 'Hello Dinesh, I would love to connect about a machine learning role.',
  });
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('validateContactForm rejects empty inputs', () => {
  const result = validateContactForm({});
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.subject);
  assert.ok(result.errors.message);
});

test('validateContactForm catches invalid email format', () => {
  const result = validateContactForm({
    name: 'Dinesh',
    email: 'not-an-email',
    subject: 'Project inquiry',
    message: 'Valid length message about project inquiry here.',
  });
  assert.equal(result.isValid, false);
  assert.equal(result.errors.email, 'Please provide a valid email address');
});

test('filterProjects filters by category and search term correctly', () => {
  const sampleProjects: ProjectItem[] = [
    {
      id: 'p1',
      title: 'AI Smart Vehicle Safety',
      category: 'ml',
      description: 'Driver-state monitoring and computer vision',
      tags: ['Python', 'YOLO', 'OpenCV'],
    },
    {
      id: 'p2',
      title: 'Agricultural Rental',
      category: 'web',
      description: 'Web portal for farm machinery',
      tags: ['React', 'Node.js', 'PostgreSQL'],
    },
    {
      id: 'p3',
      title: 'Vehicle Accident Alert System',
      category: 'iot',
      description: 'Sensors and GPS alert system',
      tags: ['ESP32', 'C', 'IoT'],
    },
  ];

  // Category filter
  const mlProjects = filterProjects(sampleProjects, 'ml');
  assert.equal(mlProjects.length, 1);
  assert.equal(mlProjects[0].id, 'p1');

  // Search filter
  const searchResults = filterProjects(sampleProjects, 'all', 'esp32');
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].id, 'p3');

  // Multi-term query
  const rentalResults = filterProjects(sampleProjects, 'all', 'machinery');
  assert.equal(rentalResults.length, 1);
  assert.equal(rentalResults[0].id, 'p2');
});

test('filterSkillCategories searches skills across categories', () => {
  const sampleSkills: SkillCategoryGroup[] = [
    {
      id: 'programming',
      title: 'Programming',
      skills: [{ name: 'Python' }, { name: 'Java' }],
    },
    {
      id: 'ai',
      title: 'AI & Machine Learning',
      skills: [{ name: 'Computer Vision' }, { name: 'YOLO' }],
    },
  ];

  const filtered = filterSkillCategories(sampleSkills, 'vision');
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].title, 'AI & Machine Learning');
  assert.equal(filtered[0].skills[0].name, 'Computer Vision');
});

test('portfolio dataset includes Farmsha project, Ranipet location, and capitalized name', async () => {
  const { PERSONAL_INFO, PROJECTS } = await import('../data/portfolioData');
  assert.equal(PERSONAL_INFO.name, 'DINESH H');
  assert.ok(PERSONAL_INFO.location.includes('Ranipet'), 'Location should be Ranipet');
  assert.equal(PROJECTS.length, 6, 'Should have 6 featured projects');
  
  const farmsha = PROJECTS.find((p) => p.id === 'farmsha');
  assert.ok(farmsha, 'Farmsha project must exist');
  assert.equal(farmsha?.githubUrl, 'https://github.com/dinesh19-04/FARMSHA');
  assert.equal(farmsha?.category, 'web');
  assert.ok(farmsha?.features.length && farmsha.features.length >= 5);
});

test('hackathons dataset contains CICADA 2025 and SIH 2025 with verified details and links', async () => {
  const { HACKATHONS, ACHIEVEMENTS } = await import('../data/portfolioData');
  assert.equal(HACKATHONS.length, 2, 'Should have exactly 2 national hackathons');

  // 1. CICADA'25
  const cicada = HACKATHONS.find((h) => h.id === 'cicada-2025');
  assert.ok(cicada, 'CICADA 2025 hackathon must exist');
  assert.equal(cicada?.name, "CICADA'25");
  assert.ok(cicada?.organizer.includes('KPRIET ACM'));
  assert.ok(cicada?.institution.includes('KPR Institute of Engineering'));
  assert.equal(cicada?.representedInstitution, 'Saveetha Engineering College');
  assert.equal(cicada?.dates, 'October 31 – November 1, 2025');
  assert.equal(cicada?.recognition, 'Certificate of Participation');
  assert.equal(cicada?.teamName, '#MACROHARD');
  assert.equal(cicada?.linkedinUrl, 'https://lnkd.in/p/gs9VghJK');
  assert.ok(cicada?.gallery.length >= 4);

  // 2. Smart India Hackathon (SIH 2025)
  const sih = HACKATHONS.find((h) => h.id === 'sih-2025');
  assert.ok(sih, 'Smart India Hackathon must exist');
  assert.ok(sih?.name.includes('Smart India Hackathon 2025'));
  assert.equal(sih?.representedInstitution, 'Saveetha Engineering College');
  assert.ok(sih?.recognition.includes('Top 50 Out of 112 Teams'));
  assert.equal(sih?.teamName, 'Team Tide Techies');
  assert.ok(sih?.projectTitle.includes('OceanPulse'));
  assert.equal(sih?.accentTheme, 'tricolor');
  assert.equal(sih?.linkedinUrl, 'https://lnkd.in/p/g2zcpEcN');
  assert.ok(sih?.gallery.length >= 4);

  // 3. Distinction check
  assert.equal(ACHIEVEMENTS.length, 1);
  assert.ok(ACHIEVEMENTS[0].title.includes('Top 10 Finalist – Mini Project Competition'));
  assert.ok(ACHIEVEMENTS[0].description.includes('160'));
  assert.notEqual(ACHIEVEMENTS[0].title, sih?.recognition);
  assert.notEqual(ACHIEVEMENTS[0].title, cicada?.recognition);
});

test('favicon and PWA icon assets exist and manifest is configured', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');

  const publicDir = path.resolve('public');

  // 1. Verify all requested icon files exist with non-zero size
  const iconFiles = [
    'favicon.ico',
    'favicon.svg',
    'apple-touch-icon.png',
    'icon-192.png',
    'icon-512.png',
    'icon-maskable-512.png',
  ];

  for (const file of iconFiles) {
    const filePath = path.join(publicDir, file);
    assert.ok(fs.existsSync(filePath), `Icon file ${file} must exist in public/`);
    const stat = fs.statSync(filePath);
    assert.ok(stat.size > 0, `Icon file ${file} must not be empty`);
  }

  // 2. Verify manifest.json completeness and icon definitions
  const manifestPath = path.join(publicDir, 'manifest.json');
  assert.ok(fs.existsSync(manifestPath), 'manifest.json must exist');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  assert.equal(manifest.id, '/');
  assert.ok(manifest.name.includes('DINESH H'));
  assert.equal(manifest.display, 'standalone');
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length >= 3);

  const icon192 = manifest.icons.find((i: any) => i.sizes === '192x192');
  assert.ok(icon192, 'Manifest must declare 192x192 icon');
  assert.equal(icon192.purpose, 'any');

  const icon512 = manifest.icons.find(
    (i: any) => i.sizes === '512x512' && i.purpose === 'any'
  );
  assert.ok(icon512, 'Manifest must declare 512x512 icon for purpose any');

  const maskable512 = manifest.icons.find(
    (i: any) => i.sizes === '512x512' && i.purpose === 'maskable'
  );
  assert.ok(maskable512, 'Manifest must declare 512x512 maskable icon');
  assert.equal(maskable512.src, '/icon-maskable-512.png');

  // 3. Verify index.html head tags
  const indexPath = path.resolve('index.html');
  const indexHtml = fs.readFileSync(indexPath, 'utf8');

  assert.ok(indexHtml.includes('/favicon.ico'), 'index.html must reference /favicon.ico');
  assert.ok(indexHtml.includes('/favicon.svg'), 'index.html must reference /favicon.svg');
  assert.ok(
    indexHtml.includes('/apple-touch-icon.png'),
    'index.html must reference /apple-touch-icon.png'
  );
  assert.ok(indexHtml.includes('/manifest.json'), 'index.html must reference /manifest.json');
  assert.ok(indexHtml.includes('name="theme-color"'), 'index.html must specify theme-color');
});

test('all featured projects have valid preview image assets in public directory', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const { PROJECTS } = await import('../data/portfolioData');

  const publicDir = path.resolve('public');

  for (const project of PROJECTS) {
    assert.ok(project.image, `Project ${project.id} must define an image path`);
    assert.ok(
      project.image.startsWith('/assets/'),
      `Project ${project.id} image path (${project.image}) must start with /assets/`
    );

    // Remove leading slash and resolve against public directory
    const relativePath = project.image.replace(/^\//, '');
    const absolutePath = path.join(publicDir, relativePath);

    assert.ok(
      fs.existsSync(absolutePath),
      `Image file for ${project.id} does not exist at ${absolutePath}`
    );

    const stat = fs.statSync(absolutePath);
    assert.ok(
      stat.size > 1000,
      `Image file for ${project.id} is unexpectedly small or empty (${stat.size} bytes)`
    );
  }
});

test('responsive navigation and scroll margins are configured across sections', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');

  // Verify index.html scroll-smooth, scroll-pt, and viewport-fit
  const indexHtml = fs.readFileSync(path.resolve('index.html'), 'utf8');
  assert.ok(indexHtml.includes('scroll-smooth'), 'index.html must enable scroll-smooth');
  assert.ok(indexHtml.includes('scroll-pt'), 'index.html must configure scroll padding top');
  assert.ok(indexHtml.includes('viewport-fit=cover'), 'index.html must include viewport-fit=cover');
  assert.ok(indexHtml.includes('overflow-x-hidden'), 'index.html body must prevent horizontal overflow');

  // Verify Navbar has sticky/fixed positioning and ARIA attributes
  const navbarCode = fs.readFileSync(path.resolve('src/components/Navbar.tsx'), 'utf8');
  assert.ok(navbarCode.includes('fixed top-0'), 'Navbar must be fixed at top-0');
  assert.ok(navbarCode.includes('z-50'), 'Navbar must maintain z-50 above page content');
  assert.ok(navbarCode.includes('aria-expanded'), 'Navbar mobile hamburger button must include aria-expanded');
  assert.ok(navbarCode.includes('backdrop-blur'), 'Navbar must apply backdrop-blur');

  // Verify all sections declare scroll-mt to prevent header clipping
  const sectionFiles = [
    'src/components/Hero.tsx',
    'src/components/About.tsx',
    'src/components/Skills.tsx',
    'src/components/Projects.tsx',
    'src/components/Achievements.tsx',
    'src/components/Experience.tsx',
    'src/components/Contact.tsx',
  ];

  for (const file of sectionFiles) {
    const code = fs.readFileSync(path.resolve(file), 'utf8');
    assert.ok(
      code.includes('scroll-mt-'),
      `Section file ${file} must include scroll-mt to prevent sticky header clipping`
    );
  }
});

test('vercel.json has SPA rewrites and project overview modal deep-linking is supported', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');

  const vercelJson = JSON.parse(fs.readFileSync(path.resolve('vercel.json'), 'utf8'));
  assert.ok(Array.isArray(vercelJson.rewrites), 'vercel.json must define rewrites array');
  const hasSpaRewrite = vercelJson.rewrites.some(
    (r: { source: string; destination: string }) => r.destination === '/index.html'
  );
  assert.ok(hasSpaRewrite, 'vercel.json must contain rewrite to /index.html for SPA sub-routes');

  // Verify ProjectImage component exists and has vector fallback
  const projectImageCode = fs.readFileSync(path.resolve('src/components/ProjectImage.tsx'), 'utf8');
  assert.ok(projectImageCode.includes('allFailed'), 'ProjectImage must support fallback state');
  assert.ok(projectImageCode.includes('handleError'), 'ProjectImage must handle image error states');

  // Verify Projects.tsx supports hash, pathname, and query param deep linking
  const projectsCode = fs.readFileSync(path.resolve('src/components/Projects.tsx'), 'utf8');
  assert.ok(projectsCode.includes('checkTarget'), 'Projects.tsx must check deep-link target');
  assert.ok(projectsCode.includes('pathname.startsWith'), 'Projects.tsx must support pathname routing');
});



