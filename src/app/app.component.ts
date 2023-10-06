import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { initialState, selectStocks, updateCOPRate, updateUSDRate } from './store';
import { TranslateService } from '@ngx-translate/core';
import * as AOS from 'aos'
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedCurrency = 'usd'
  selectedLang = 'en'
  currencies = [
    {value: 'usd', viewValue: 'USD'},
    {value: 'cop', viewValue: 'COP'},
  ];
  appleStock = 0;
  googleStock = 0;
  microsoftStock = 0;

  barChartData: ChartData;
  pieChartData: ChartData;
  pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }
  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective> | undefined;

  constructor(
    private store: Store<any>,
    private translate: TranslateService) {

  }

  ngOnInit(): void {

    AOS.init()
    window.addEventListener('load', AOS.refresh)
    this.configCharts();

    this.store.select(selectStocks).subscribe((state : any) => {
      this.appleStock= state.state.appleStock
      this.googleStock= state.state.googleStock
      this.microsoftStock = state.state.microsoftStock
    })
  }

  onCurrencyChange(event : any) {
    if(event.value === 'cop') {
      this.store.dispatch(updateCOPRate())
    } else
    {
      this.store.dispatch(updateUSDRate())
    }
  }

  onToggleChange(event: any) {
    this.translate.use(event.value)
  }

  configCharts(){
    this.barChartData = {
      labels: [''],
      datasets: this.barChartRandomData()
    };

    this.pieChartData = {
      labels: ['JavaScript', 'C#', 'Java', 'Phyton'],
      datasets: this.pieChartRandomData()
    };

    setInterval(() => {
      this.barChartData.datasets = this.barChartRandomData()
      this.pieChartData.datasets = this.pieChartRandomData()
      this.charts.forEach(chart => chart.update());
    }, 4000)



  }

  barChartRandomData() : any {
    return [
        { data: [ Math.round(Math.random() * 100)], label: 'Angular' },
        { data: [ Math.round(Math.random() * 100)], label: 'React' },
        { data: [ Math.round(Math.random() * 100)], label: 'Vue' },
        { data: [ Math.round(Math.random() * 100)], label: 'Svelte' },
    ]
  }

  pieChartRandomData() : any {
    return [
          { data: [ Math.round(Math.random() * 1000), Math.round(Math.random() * 1000), Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)] }
        ]
  }
}
