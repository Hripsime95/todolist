import { instance } from '@/common/instance';
import {
  DomainTask,
  GetTasksResponse,
  UpdateTaskModel,
} from './tasksApi.types';
import { BaseResponse } from '@/common/types/types';

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`);
  },
  createTask(args: { todolistId: string; title: string }) {
    const { todolistId, title } = args;
    return instance.post<BaseResponse<{ item: DomainTask }>>(
      `/todo-lists/${todolistId}/tasks`,
      { title },
    );
  },
  updateTask(args: {
    todolistId: string;
    taskId: string;
    payload: UpdateTaskModel;
  }) {
    const { todolistId, taskId, payload } = args;
    return instance.put<BaseResponse<{ item: DomainTask }>>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
      payload,
    );
  },
};
