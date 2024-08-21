import dayjs from 'dayjs';

export interface IRoom {
  id?: number;
  name?: string;
  isPrivate?: boolean;
  createdAt?: dayjs.Dayjs;
}

export const defaultValue: Readonly<IRoom> = {
  isPrivate: false,
};
