import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpResponseModel } from '../models/http-response.model';
import { ContractorRepository } from '../../data/repositories/contractor.repository';
import {ContractorRequest, ContractorResponse} from '../models/contractor.model';

@Injectable({
  providedIn: 'root',
})
export class ContractorService {
  constructor(private contractorRepo: ContractorRepository) {}

  // get all Contractor categories
  getAllContractors(): Observable<ContractorResponse[]> {
    return this.contractorRepo.getAllContractor().pipe(
      map((res: any) => {
        return res.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          contactNo: item.contactNo,
          email: item.email,
          address: item.address,
          status: item.status,
        })) as ContractorResponse[];
      })
    );
  }

  //  for save Contractor
  saveContractor(
    contractorData: ContractorRequest
  ): Observable<{ msg: string; typ: number }> {
    return this.contractorRepo.saveContractor(contractorData).pipe(
      map((response: HttpResponseModel) => {
        return {
          msg: response.message,
          typ: response.statusCode == 200 ? 1 : 2,
        };
      })
    );
  }

  // for get Contractor by id
  getContractorById(id: number): Observable<ContractorResponse> {
    return this.contractorRepo.getContractorByID(id).pipe(
      map((response: HttpResponseModel) => {
        const responseData = response.data;
        return {
          id:responseData.id,
          name:responseData.name,
          address:responseData.address,
          contactNo:responseData.contactNo,
          email:responseData.email,
          status:responseData.status
        } as ContractorResponse;
      })
    );
  }

  // for update  Contractor details
  updateContractor(
    id: number,
    ContractorData: ContractorRequest
  ): Observable<{ msg: string; typ: number }> {
    return this.contractorRepo.updateContractor(id, ContractorData).pipe(
      map((response: HttpResponseModel) => {
        return {
          msg: response.message,
          typ: response.statusCode == 200 ? 1 : 2,
        };
      })
    );
  }

  // for delete Contractor details
  deleteContractor(id: number): Observable<{ msg: string; typ: number }> {
    return this.contractorRepo.deleteContractor(id).pipe(
      map((response: HttpResponseModel) => {
        return {
          msg: response.message,
          typ: response.statusCode == 200 ? 1 : 2,
        };
      })
    );
  }
}
