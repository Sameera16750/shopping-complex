export type StoreOwnerTableDataModel = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  contactNo: string;
  email: string;
  nic: string;
};

export type StoreOwnerResponse = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  contactNo: string;
  email: string;
  nic: string;
  Status: number;
};

export type StoreOwnerRequest=Omit<StoreOwnerResponse, 'id'>;
