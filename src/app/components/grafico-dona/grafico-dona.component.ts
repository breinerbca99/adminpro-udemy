import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: [
  ]
})
export class GraficoDonaComponent implements OnInit {

  // Donas
  @Input('ChartLabels') public doughtChartLabels: string[] = [];
  @Input('ChartData') public doughtChartData: number[] = [];
  @Input('ChartType') public doughtChartType: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
