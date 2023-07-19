export type User = {
  id?: number;
  name: string;
  email: string;
  password?: string;
};

export type Checklist = {
  id?: number;
  task: string;
  isDone: boolean;
};
