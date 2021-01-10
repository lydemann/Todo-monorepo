import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const RESOURCE_URL = '<%= url %>';

export interface <%= classify(name) %>DTO {
    id: string;
}

@Injectable({ providedIn: 'root' })
export class <%= classify(name) %>ResourceService {
    constructor(private httpClient: HttpClient) {
    }

    get(): Observable<<%= classify(name) %>DTO> {
        return this.httpClient.get<<%= classify(name) %>DTO>(RESOURCE_URL)
    }
}
