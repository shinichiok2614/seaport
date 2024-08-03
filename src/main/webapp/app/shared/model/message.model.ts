import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';

export interface IMessage {
  id?: number;
  content?: string | null;
  imageContentType?: string | null;
  image?: string | null;
  createdAt?: dayjs.Dayjs;
  sender?: IUser | null;
  receiver?: IUser | null;
}

export const defaultValue: Readonly<IMessage> = {};
