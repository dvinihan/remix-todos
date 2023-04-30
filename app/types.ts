export type Counter = {
  name: string;
  value: number;
};

export type Task = {
  id: number;
  section: string;
  text: string;
};

export type TaskList = {
  [key: string]: Task[];
};
