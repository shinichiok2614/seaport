import dayjs from 'dayjs';
import { ICategory } from 'app/shared/model/category.model';
import { IUser } from 'app/shared/model/user.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IPost {
  id?: number;
  name?: string;
  summary?: string;
  imageContentType?: string;
  image?: string;
  status?: keyof typeof Status;
  view?: number;
  remark?: string | null;
  createdAt?: dayjs.Dayjs;
  updateAt?: dayjs.Dayjs;
  approvedAt?: dayjs.Dayjs | null;
  modifiedAt?: dayjs.Dayjs | null;
  category?: ICategory | null;
  post?: IUser | null;
}

export const defaultValue: Readonly<IPost> = {};
