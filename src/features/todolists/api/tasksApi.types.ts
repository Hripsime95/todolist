import { TaskPriority, TaskStatus } from '@/common/enums';
import * as z from 'zod';

export const domainTaskSchema = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
  id: z.string(),
  todoListId: z.string(),
  order: z.int(),
  addedDate: z.iso.datetime({ local: true }),
});

export type DomainTask = z.infer<typeof domainTaskSchema>;

export type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: DomainTask[];
};

export type UpdateTaskModel = Partial<
  Omit<DomainTask, 'todoListId' | 'id' | 'addedDate'>
>;
