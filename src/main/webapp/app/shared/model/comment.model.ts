import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IPost } from 'app/shared/model/post.model';

export interface IComment {
  id?: number;
  description?: string | null;
  imageContentType?: string | null;
  image?: string | null;
  createdAt?: dayjs.Dayjs;
  updateAt?: dayjs.Dayjs;
  comment?: IUser | null;
  post?: IPost | null;
}

export const defaultValue: Readonly<IComment> = {};
