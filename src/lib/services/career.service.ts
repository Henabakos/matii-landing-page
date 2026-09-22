import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export interface FormattedJobPosition {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  shortDescription: string;
  content: string;
  order: number;
  isActive: boolean;
  isFeatured: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  translations?: Record<string, {
    title?: string;
    department?: string;
    location?: string;
    type?: string;
    experience?: string;
    salary?: string;
    shortDescription?: string;
    content?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
  applicationCount?: number;
}

export interface FormattedJobApplication {
  id: string;
  jobId: string | null;
  jobTitle: string;
  job?: { id: string; title: string; slug: string } | null;
  fullName: string;
  email: string;
  phone: string | null;
  resumeUrl: string | null;
  portfolioUrl: string | null;
  linkedinUrl: string | null;
  coverNote: string | null;
  status: string; // NEW, REVIEWING, INTERVIEW, OFFER, REJECTED, ARCHIVED
  createdAt: Date;
  date: string;
}

function formatApplication(app: any): FormattedJobApplication {
  const dateFormatted = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(app.createdAt));

  return {
    ...app,
    date: dateFormatted,
  };
}

function parseJobPosition(job: any): FormattedJobPosition {
  let translations: Record<string, any> = {};
  try {
    translations = job.translations ? (typeof job.translations === "string" ? JSON.parse(job.translations) : job.translations) : {};
  } catch {
    translations = {};
  }
  return {
    ...job,
    translations,
  };
}

export const getAllJobPositions = unstable_cache(
  async (): Promise<FormattedJobPosition[]> => {
    const raw = await db.jobPosition.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return raw.map(parseJobPosition);
  },
  ["careers-all"],
  { tags: ["careers"], revalidate: 3600 }
);

export const getJobPositionBySlug = unstable_cache(
  async (slug: string): Promise<FormattedJobPosition | null> => {
    const raw = await db.jobPosition.findUnique({
      where: { slug },
    });
    if (!raw || !raw.isActive) return null;
    return parseJobPosition(raw);
  },
  ["career-by-slug"],
  { tags: ["career-by-slug"], revalidate: 3600 }
);

export async function getAdminAllJobPositions(): Promise<FormattedJobPosition[]> {
  const raw = await db.jobPosition.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: {
      _count: {
        select: { applications: true },
      },
    },
  });

  return raw.map((job) => ({
    ...parseJobPosition(job),
    applicationCount: job._count?.applications || 0,
  }));
}

export async function getAdminAllApplications(
  jobId?: string,
  status?: string
): Promise<FormattedJobApplication[]> {
  const where: any = {};
  if (jobId) where.jobId = jobId;
  if (status && status !== "ALL") where.status = status;

  const raw = await db.jobApplication.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      job: {
        select: { id: true, title: true, slug: true },
      },
    },
  });

  return raw.map(formatApplication);
}
