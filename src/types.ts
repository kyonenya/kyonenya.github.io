export type datarable = {
  id: number;
  index: number;
  date: string;
  title: string;
  text: string;
  plainText: string;
  tags: string[];
};

export type pagable = {
  body: string;
  suffix: string;
  description: string;
  title: string;
  archiveHeader: string;
};
