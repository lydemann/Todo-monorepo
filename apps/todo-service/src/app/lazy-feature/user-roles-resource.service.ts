import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const RESOURCE_URL = '/api/resource';

export interface UserRolesDTO {
    id: string;
}

@Injectable({ providedIn: 'root' })
export class UserRolesResourceService {
    constructor(private httpClient: HttpClient) {
    }

    get(): Observable<UserRolesDTO> {
        return this.httpClient.get<UserRolesDTO>(RESOURCE_URL)
    }
}
