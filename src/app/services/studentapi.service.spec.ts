import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';


import { StudentApiService } from './studentapi.service'

describe('StudentApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule,
            ],
            providers: [
                StudentApiService,
            ],
        }).compileComponents();;
    });

    it('should get users', async(inject([HttpTestingController, StudentApiService],
        (httpMock: HttpTestingController, apiService: StudentApiService) => {
            expect(apiService).toBeTruthy();
        }
    )
    )
    );
});