export type SectionDTO = {
  id: number;
  name: string;
};

export type TaskDTO = {
  id: number;
  sectionId: number;
  name: string;
};

export type Section = SectionDTO & {
  tasks: TaskDTO[];
};

export type List = {
  [key: string]: TaskDTO[];
};
