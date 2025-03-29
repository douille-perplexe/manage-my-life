import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface User {
  userId?: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: number;
  teamId?: number;
}

export interface Team {}

export interface Attachment {
  id: number;
  fileUrl: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  startDate?: string;
  dueDate?: string;
  status?: Status;
  tags?: string[];
  projectId: number;
  authorUserId?: number;
  assigneeUserId?: number;
  priority?: Priority;
  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
  points?: number;
}

export enum Status {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "/api/";
const baseUrl = apiBaseUrl.endsWith("/") ? apiBaseUrl : `${apiBaseUrl}/`;

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    responseHandler: async (response) => {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().catch((error) => {
          console.error("JSON parsing error:", error);
          throw new Error("Response is not a valid JSON");
        });
      }

      const text = await response.text();
      console.error("Non-JSON response received:", text.substring(0, 500));
      throw new Error(`Unexpected response format (${contentType})`);
    },
  }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks"],
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),
    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),
    getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => {
        if (!projectId || isNaN(Number(projectId))) {
          throw new Error("Invalid project ID");
        }
        return `tasks?projectId=${projectId}`;
      },
      transformResponse: (response: Task[] | null) => {
        return response || [];
      },
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({
              type: "Tasks" as const,
              id,
            }))
          : [{ type: "Tasks" as const }],
    }),
    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useCreateTaskMutation,
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
} = api;
