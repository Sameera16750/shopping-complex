export type ContractorTableDataModel ={
  id:number;
  contractorName:string;
  contactNo:string;
  emailAddress:string;
  address:string;
}

export type ContractorResponse={
  id:number
  name:string
  contactNo:string
  email:string
  address:string
  status:number
}

export type ContractorRequest=Omit<ContractorResponse, "id">
