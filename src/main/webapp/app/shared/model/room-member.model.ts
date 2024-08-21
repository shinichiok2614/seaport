import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IRoom } from 'app/shared/model/room.model';

export interface IRoomMember {
  id?: number;
  name?: string | null;
  joinedAt?: dayjs.Dayjs;
  roommember?: IUser | null;
  room?: IRoom | null;
}

export const defaultValue: Readonly<IRoomMember> = {};
