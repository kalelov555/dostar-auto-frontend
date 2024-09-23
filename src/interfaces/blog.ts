import { IMetaReponse } from ".";

export interface IBlog {
  id: string;
  created_at: string;
  description: string;
  image_url: string;
  title: string;
}

export interface IBlogsResponse {
  data: IBlog[];
  meta: IMetaReponse;
}

export interface IBlogResponse {
  data: IBlog;
}
