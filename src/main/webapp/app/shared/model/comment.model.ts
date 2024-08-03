import dayjs from 'dayjs';
import { IPost } from 'app/shared/model/post.model';
import { IUser } from 'app/shared/model/user.model';

export interface IComment {
  id?: number;
  description?: string | null;
  imageContentType?: string | null;
  image?: string | null;
  createdAt?: dayjs.Dayjs;
  updateAt?: dayjs.Dayjs;
  post?: IPost | null;
  comment?: IUser | null;
}

export const defaultValue: Readonly<IComment> = {};
