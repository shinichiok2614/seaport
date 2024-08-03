import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IDepartment } from 'app/shared/model/department.model';

export interface IPerson {
  id?: number;
  name?: string;
  avatarContentType?: string;
  avatar?: string;
  coverContentType?: string;
  cover?: string;
  bio?: string | null;
  phone?: string | null;
  country?: string | null;
  address?: string | null;
  createdAt?: dayjs.Dayjs;
  updateAt?: dayjs.Dayjs;
  dateOfBirth?: dayjs.Dayjs | null;
  isAuthor?: boolean;
  user?: IUser | null;
  department?: IDepartment | null;
}

export const defaultValue: Readonly<IPerson> = {
  isAuthor: false,
};
