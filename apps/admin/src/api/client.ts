import type { JobStatus } from './types';

const BASE = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {};
  if (options?.body) {
    headers['Content-Type'] = 'application/json';
  }
  const res = await fetch(`${BASE}${path}`, {
    headers,
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error ?? res.statusText);
  }
  return res.json();
}

export interface CreateJobInput {
  sourceUrl: string;
  platform?: string;
  templateId?: string;
  generateText?: boolean;
  brandKit?: {
    bg?: string;
    text?: string;
    accent?: string;
    fontSerif?: string;
    fontSans?: string;
    logoUrl?: string;
  };
}

export interface JobSummary {
  id: string;
  status: JobStatus;
  sourceUrl: string;
  sourceType: string;
  platform: string;
  templateId: string;
  slideCount: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface JobDetail extends JobSummary {
  errorPayload: { stage: string; reason: string; details: string } | null;
  contentPayload: unknown;
  assets: {
    id: string;
    formatType: string;
    slideIndex: number | null;
    storageUrl: string | null;
    contentText: string | null;
  }[];
}

export interface JobsListResponse {
  jobs: JobSummary[];
  total: number;
  page: number;
  limit: number;
}

export interface StatsResponse {
  total: number;
  queued: number;
  processing: number;
  complete: number;
  failed: number;
  needsReview: number;
}

export interface DownloadResponse {
  jobId: string;
  status: string;
  platform: string;
  slideCount: number;
  slides?: { index: number; url: string; storageKey: string }[];
  linkedin?: string;
  twitter?: string;
}

export const api = {
  createJob: (input: CreateJobInput) =>
    request<{ jobId: string; status: string }>('/jobs', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  getJobs: (params: { page?: number; limit?: number; status?: string; search?: string } = {}) => {
    const qs = new URLSearchParams();
    if (params.page) qs.set('page', String(params.page));
    if (params.limit) qs.set('limit', String(params.limit));
    if (params.status) qs.set('status', params.status);
    if (params.search) qs.set('search', params.search);
    return request<JobsListResponse>(`/jobs?${qs.toString()}`);
  },

  getJob: (id: string) => request<JobDetail>(`/jobs/${id}`),

  downloadJob: (id: string, format: 'slides' | 'linkedin' | 'twitter' | 'all' = 'all') =>
    request<DownloadResponse>(`/jobs/${id}/download?format=${format}`),

  retryJob: (id: string) =>
    request<{ jobId: string; status: string }>(`/jobs/${id}/retry`, {
      method: 'POST',
    }),

  getStats: () => request<StatsResponse>('/stats'),

  purgeAll: () =>
    request<{ jobsDeleted: number; outboxDeleted: number; queuesCleared: number }>(
      '/admin/purge',
      { method: 'DELETE' },
    ),
};
