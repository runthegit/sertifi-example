import { Component, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentApiService } from './services/studentapi.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @Output() nameArrayFromSummaryOut = new EventEmitter<any>();
  @Output() gpaArrayFromSummaryOut = new EventEmitter<any>();
  @Output() yearArrayFromSummaryOut = new EventEmitter<any>();

  constructor(
    private _studentApiService: StudentApiService,
    private _route: ActivatedRoute,
    private _router: Router
    ){}


  studentList!: any;
  
  mappedMinYearArray!: any[];
  mappedMaxYearArray!: any[];
  minYear!: number;
  maxYear!: number;
  yearListArray!: any[];
  yearAttendenceArray = <any>[];
  yearCount!: number;

  nameAttended!: string;
  namesAttendedArray = <any>[];
  completeNamesAttendedArray = <any>[];

  gpaIndex!: number;
  yearGpaArray = <any>[];
  yearGpaBeforeAvgArray = <any>[];
  yearGpaAfterAvgArray = <any>[];
  yearGpaAvgCalcNum!: number;
  yearGpaAvgCalcSumNum!: number;
  yearAvgGPA = <any>[];
  
  nameArrayFromSummary = <any>[];
  gpaArrayFromSummary = <any>[];
  yearArrayFromSummary = <any>[];
 

  ngOnInit() {

    this._studentApiService.getStudents()
      .subscribe(data => {
        console.log(data);
        this.studentList = data;

        this.mappedMinYearArray = this.studentList.reduce((map: { set: (arg0: any, arg1: any) => any; }, obj: { StartYear: any; }) => map.set(obj.StartYear, obj), new Map());
        this.mappedMaxYearArray = this.studentList.reduce((map: { set: (arg0: any, arg1: any) => any; }, obj: { EndYear: any; }) => map.set(obj.EndYear, obj), new Map());

        this.minYear = Math.min(...this.mappedMinYearArray.keys());
        this.maxYear = Math.max(...this.mappedMaxYearArray.keys());
        this.yearListArray = _.range(this.minYear, this.maxYear + 1);

        this.yearArrayFromSummary =[];
        this.gpaArrayFromSummary = [];
        this.nameArrayFromSummary =[];

        //**************attendance for year and gpa loops begin**********************

        for (let i = 0; i < this.yearListArray.length; i++) 
        {
          this.yearCount = 0;
          this.nameAttended = "";

          for (let index = 0; index < this.studentList.length; index++) 
          {

            if (this.studentList[index].StartYear <= this.yearListArray[i] && this.studentList[index].EndYear >= this.yearListArray[i]) 
            {
              this.yearCount = this.yearCount + 1;

              this.nameAttended = this.studentList[index].Name;
              this.namesAttendedArray.push(this.nameAttended);

              this.gpaIndex = this.yearListArray[i] - this.studentList[index].StartYear;
              this.yearGpaArray.push(this.studentList[index].GPARecord[this.gpaIndex]);

            }

            this.gpaIndex = 0;

          }

          this.completeNamesAttendedArray.push(this.namesAttendedArray);
          this.namesAttendedArray = [];
          this.nameAttended = "";

          this.yearGpaBeforeAvgArray.push(this.yearGpaArray);
          this.yearGpaArray = [];
 
          this.yearAttendenceArray.push(this.yearCount);
          this.yearCount = 0;
        
        }
        //**************attendance for year and gpa loops begin**********************
        //**************************overall gpa calc begin************************************************** */

        for (var indBef = 0; indBef < this.yearGpaBeforeAvgArray.length; indBef++) 
        {
          this.yearGpaAvgCalcNum = 0;
          this.yearGpaAvgCalcSumNum = 0;

          for (var indDur = 0; indDur < this.yearGpaBeforeAvgArray[indBef].length; indDur++) 
          {
            this.yearAvgGPA.push(this.yearGpaBeforeAvgArray[indBef]);
            this.yearGpaAvgCalcSumNum = (this.yearGpaAvgCalcSumNum + (this.yearAvgGPA[0][indDur]));
          }

          this.yearAvgGPA = [];
          this.yearGpaAvgCalcNum = Math.round((this.yearGpaAvgCalcSumNum / this.yearGpaBeforeAvgArray[indBef].length) * 10) / 10;
          this.yearGpaAfterAvgArray.push(this.yearGpaAvgCalcNum);
        }
        //**************************overall gpa calc end************************************************** */
      });
  }

  sendNameArray(completeNamesAttendedArray: any) {
    this.nameArrayFromSummary.push(completeNamesAttendedArray);
    this.nameArrayFromSummaryOut.emit(completeNamesAttendedArray);
  }

  sendGpaArray(yearGpaBeforeAvgArray: any) {
    this.gpaArrayFromSummary.push(yearGpaBeforeAvgArray);
    this.gpaArrayFromSummaryOut.emit(yearGpaBeforeAvgArray);
  }
  
  sendYearArray(yearListArray : any){
    this.yearArrayFromSummary.push(yearListArray);
    this.yearArrayFromSummaryOut.emit(yearListArray);
  }

  isHomeRoute() { 
    return this._router.url.includes("/home");
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

}
