export interface IDepartment {
  id?: number;
  name?: string;
  imageContentType?: string | null;
  image?: string | null;
}

export const defaultValue: Readonly<IDepartment> = {};
