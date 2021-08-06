import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IStudents } from "../students/students";

/*
export interface Students {
    id!: number;
    name!: string;
    startYear!: number;
    endYear!: number;
    gpaRecord!: [];
} */

@Injectable({
    providedIn: 'root'
})
export class StudentApiService {

    private STUDENT_REST_API = "http://apitest.sertifi.net/api/Students";

    constructor(private httpclient: HttpClient) { }

    public getStudents():Observable<any> {
        console.log("hit service");
        return this.httpclient.get<any>(this.STUDENT_REST_API);
    }

}