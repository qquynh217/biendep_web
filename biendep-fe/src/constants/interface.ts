export interface ILisencePlate {
  id: string;
  plateCode: string;
  formattedPlate: string;
  price: number;
  createdAt: number;
  updatedAt: number;
  provinceCode: string;
  luckyDigit: number;
  isVip: boolean;
  isHide?: boolean;
  types: Array<String>;
  typePoint: number;
  digitPoint: number;
}

export type SearchParams = {
  char?: string;
  key?: string;
  luckyDigit?: number;
  price?: number;
  province?: string;
  sort?: "asc" | "desc";
  type?: string[];
  limit?: number;
  page?: number;
};

export type T = any;

export type ModalTypeType = "" | "create" | "edit";

export type ModalType<T> = {
  type: ModalTypeType;
  item: T;
};
