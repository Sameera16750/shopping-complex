import { ContractorResponse } from './contractor.model';

export type MaintenanceTableDataModel = {
  id: number;
  location: string;
  contractor: string;
  maintenanceType: string;
  duration: string;
  totalCharge: number;
  advanceFee: number;
  pendingBalance: number;
};

export type MaintenanceResponse = {
  id: number;
  maintenanceType: string;
  location: string;
  contractorNavigation: ContractorResponse;
  startDate: string|undefined;
  endDate: string|undefined;
  totalCharge: number;
  advancedValue: number;
  status: number;
};

export type MaintenanceRequest= Omit<MaintenanceResponse, "id"|"contractorNavigation"> &{
  contractor:number;
}
