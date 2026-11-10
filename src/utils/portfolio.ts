export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

export function validateContactForm(data: Partial<ContactFormData>): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  const name = (data.name || '').trim();
  const email = (data.email || '').trim();
  const subject = (data.subject || '').trim();
  const message = (data.message || '').trim();

  if (!name) {
    errors.name = 'Full name is required';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = 'Email address is required';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Please provide a valid email address';
  }

  if (!subject) {
    errors.subject = 'Subject is required';
  } else if (subject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters';
  }

  if (!message) {
    errors.message = 'Message content is required';
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'ml' | 'web' | 'iot' | 'data' | 'all';
  description: string;
  tags: string[];
  featured?: boolean;
}

export function filterProjects<T extends ProjectItem>(
  projects: T[],
  selectedCategory: string,
  searchQuery: string = ''
): T[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'all' || project.category === selectedCategory;

    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const inTitle = project.title.toLowerCase().includes(normalizedQuery);
    const inDesc = project.description.toLowerCase().includes(normalizedQuery);
    const inTags = project.tags.some((t) => t.toLowerCase().includes(normalizedQuery));

    return inTitle || inDesc || inTags;
  });
}

export interface SkillItem {
  name: string;
  levelDescription?: string;
  highlight?: string;
}

export interface SkillCategoryGroup {
  id: string;
  title: string;
  description?: string;
  skills: SkillItem[];
}

export function filterSkillCategories(
  categories: SkillCategoryGroup[],
  query: string = ''
): SkillCategoryGroup[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return categories;

  return categories
    .map((cat) => ({
      ...cat,
      skills: cat.skills.filter(
        (s) =>
          s.name.toLowerCase().includes(normalized) ||
          (s.highlight && s.highlight.toLowerCase().includes(normalized)) ||
          cat.title.toLowerCase().includes(normalized)
      ),
    }))
    .filter((cat) => cat.skills.length > 0);
}
