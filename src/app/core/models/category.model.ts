export type CategoryTableModel = {
  id: number;
  categoryName: string;
  status: string;
  totalSpaces: number;
};

export type StoreCategoryResponse = {
  id: number;
  categoryName: string;
  status: number;
};

export type StoreCategoryRequest= Omit<StoreCategoryResponse,'id'>;
