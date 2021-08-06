import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-year-details',
  templateUrl: './year-details.component.html',
  styleUrls: ['./year-details.component.scss']
})
export class YearDetailsComponent implements OnInit {

  @Input() completeNamesAttendedArray!: any[];
  @Input() yearGpaBeforeAvgArray!: any[];
  @Input() yearListArray!: any[];
  //nameArrayFromSummary!: any[];
  //gpaArrayFromSummary!: any[];
  //yearArrayFromSummary!: any[];

  constructor() { }

  nameArrayCick = <any>[];
  gpaArrayCick = <any>[];
  yearArrayCick = <any>[];

  ngOnInit(): void {
    console.log('8888888888888888888888888888888888888888888888888888888888888888888888');
    this.nameArrayCick.push(this.completeNamesAttendedArray);
    console.log(this.completeNamesAttendedArray);
    this.gpaArrayCick.push(this.yearGpaBeforeAvgArray);
    console.log(this.yearGpaBeforeAvgArray);
    this.yearArrayCick.push(this.yearListArray);
    console.log(this.yearListArray);
  }

}
