export const LAST_UPDATED = '2025-11-01';

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'UTC'
  });
};

export const SITE_URL = 'https://yashkumarlaldas.vercel.app';
export const SITE_NAME = 'Yash Kumar Lal Das - Software Engineer | Cloud-Native & DevOps (Python)';
export const SITE_DESCRIPTION = 'Software Engineer with 3+ years production support experience. Specializing in Python automation, AWS infrastructure, Kubernetes, CI/CD, observability, and incident response. Cloud/DevOps Engineer focused on reliability and operations.';