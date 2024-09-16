export interface Module {
  id: number;
  name: string;
  slug: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ModuleResponse extends Module {
  posts: Post[];
}

export interface PostResponse extends Post {
  module: Module;
}
