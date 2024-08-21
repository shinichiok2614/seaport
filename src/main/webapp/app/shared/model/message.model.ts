import dayjs from 'dayjs';
import { IRoomMember } from 'app/shared/model/room-member.model';
import { IRoom } from 'app/shared/model/room.model';

export interface IMessage {
  id?: number;
  content?: string | null;
  imageContentType?: string | null;
  image?: string | null;
  isActive?: boolean;
  createdAt?: dayjs.Dayjs;
  sender?: IRoomMember | null;
  message?: IRoom | null;
}

export const defaultValue: Readonly<IMessage> = {
  isActive: false,
};
