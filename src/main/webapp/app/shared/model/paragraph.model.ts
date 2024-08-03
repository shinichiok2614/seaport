import dayjs from 'dayjs';
import { IPost } from 'app/shared/model/post.model';

export interface IParagraph {
  id?: number;
  imageContentType?: string | null;
  image?: string | null;
  caption?: string | null;
  content?: string | null;
  contentType?: string | null;
  createdAt?: dayjs.Dayjs;
  updatedAt?: dayjs.Dayjs;
  paragraph?: IPost | null;
}

export const defaultValue: Readonly<IParagraph> = {};
