import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, type CreateJobInput, type JobDetail, type JobsListResponse, type StatsResponse } from './client';
import { toast } from 'sonner';

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: api.getStats,
    refetchInterval: 10_000,
  });
}

export function useJobs(params: { page?: number; limit?: number; status?: string; search?: string } = {}) {
  return useQuery<JobsListResponse>({
    queryKey: ['jobs', params],
    queryFn: () => api.getJobs(params),
    refetchInterval: 10_000,
  });
}

export function useJob(id: string) {
  return useQuery<JobDetail>({
    queryKey: ['job', id],
    queryFn: () => api.getJob(id),
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status && !['complete', 'failed', 'needs_review'].includes(status)) {
        return 5_000;
      }
      return false;
    },
  });
}

export function useCreateJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateJobInput) => api.createJob(input),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['jobs'] });
      qc.invalidateQueries({ queryKey: ['stats'] });
      toast.success(`Job created: ${data.jobId.slice(0, 8)}…`);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}

export function useRetryJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.retryJob(id),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['jobs'] });
      qc.invalidateQueries({ queryKey: ['stats'] });
      qc.invalidateQueries({ queryKey: ['job', data.jobId] });
      toast.success('Job restarted');
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
