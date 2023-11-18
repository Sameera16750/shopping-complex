import { StoreOwnerResponse } from './store-owner.model';
import { StoreCategoryResponse } from './category.model';
import { SpaceResponse } from './room.model';

export type StoreTableDataModel = {
  id: number;
  shopName: string;
  shopCategory: string;
  ownerName: string;
  rentalTimeDuration: string;
  spaceNumber: string;
};
export type PendingPaymentTableDataModel = {
  id: number;
  shopName: string;
  year: string;
  month: string;
  totalPayment: string;
};

export type StoreResponse = {
  id: number;
  storeName: string;
  storeOwnerNavigation: StoreOwnerResponse;
  storeCategoryNavigation: StoreCategoryResponse;
  spaceNavigation: SpaceResponse;
  monthlyCharge: number;
  keyMoney: number;
  rentalDate: string|undefined;
  rentalEndDate: string|undefined;
  status: number;
};

export type StoreRequest = Omit<
  StoreResponse,
  'storeOwnerNavigation' | 'storeCategoryNavigation' | 'spaceNavigation'|'id'
> & {
  storeOwner: number;
  storeCategory: number;
  space: number;
};
