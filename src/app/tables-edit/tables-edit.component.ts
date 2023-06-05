import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tables } from '../auth.service';
import { profile_tables } from '../interfaces';
import { TablesComponent } from '../tables/tables.component';
import { FileSaverService } from 'ngx-filesaver';
import * as XLSXX from 'xlsx';
import { TablesService } from '../tables.service';
import { ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-tables-edit',
  templateUrl: './tables-edit.component.html',
  styleUrls: ['./tables-edit.component.css']
})
export class TablesEditComponent implements OnInit {
  constructor(private route: ActivatedRoute, private tablec: TablesComponent, private authtable: Tables, private fileSaver: FileSaverService, private tableservice: TablesService, private router: Router) {}
  isTable: boolean = false;
  groupId = '';
  tableId = '';
  new_name:string = '';
  fields: {
    name?: string,
    birza?: string,
    buyPrice?: string,
    buyDate?: string,
    salePrice?: string,
    saleDate?: string,
    number?: string,
    dohod?: string
  }[] = [];
  index = {
    indexTable: 0,
    group: false,
    indexGroup: 0,
  };
  table: {
    name: string,
    fields: any[],
  } = {
    name: '',
    fields: [],
  };
  itog_dohod = '';
  itog_dohod365 = '';

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'].indexOf('--');
    if (id > -1) {
      this.groupId = this.route.snapshot.params['id'].split('--')[0]; // 50ml
      this.tableId = this.route.snapshot.params['id'].split('--')[1];
      this.tableservice.getOneTable(this.tableId, this.groupId).subscribe({
        next: (resp:any) => {
          this.table = resp;
          this.new_name = resp.name;
          if (resp.fields) {
            this.fields = Object.values(resp.fields);
            this.fields.forEach(item => {
              if ((item.buyDate && item.buyDate !== '') && (item.buyPrice && item.buyPrice !== '') && (item.saleDate && item.saleDate !== '') && (item.salePrice && item.salePrice !== '') && (item.number && item.number !== '' && item.number !== '0')) {
                item.dohod = Math.pow(((Number(item.salePrice) * Number(item.number)) / (Number(item.buyPrice) * Number(item.number))), ( 1 / ((Date.parse(item.saleDate) - Date.parse(item.buyDate)) / 86400000))).toString();
              }
            });
          }
          console.log(resp);
          //console.log(fields);
        }
      }); // $100
    } else {
      this.tableservice.getOneTable(this.route.snapshot.params['id']).subscribe({
        next: (resp:any) => {
          this.table = resp;
          this.new_name = resp.name;
          if (resp.fields) {
            this.fields = Object.values(resp.fields);
            this.fields.forEach(item => {
              if ((item.buyDate && item.buyDate !== '') && (item.buyPrice && item.buyPrice !== '') && (item.saleDate && item.saleDate !== '') && (item.salePrice && item.salePrice !== '') && (item.number && item.number !== '' && item.number !== '0')) {
                item.dohod = Math.pow(((Number(item.salePrice) * Number(item.number)) / (Number(item.buyPrice) * Number(item.number))), ( 1 / ((Date.parse(item.saleDate) - Date.parse(item.buyDate)) / 86400000))).toString();
              }
            });
            let starts:number[] = [];
            let ends:number[] = [];
            this.fields.forEach(item => {
              if (item.saleDate && item.buyDate){
                let buy = (Number(item.buyPrice) * Number(item.number));
                let sumbuy = buy * (1 - Math.pow(Number(item.dohod), ((Date.parse(item.saleDate) - Date.parse(item.buyDate)) / 86400000) - 1)) / (1 - Number(item.dohod));
                let sell = (Number(item.buyPrice) * Number(item.number));
                let sumsell = sell * Number(item.dohod) * (1 - Math.pow(Number(item.dohod), ((Date.parse(item.saleDate) - Date.parse(item.buyDate)) / 86400000) - 1)) / (1 - Number(item.dohod));
                starts.push(sumbuy);
                ends.push(sumsell);
              }
            });
            if (this.fields[0].saleDate && this.fields[0].buyDate)
            console.log(starts);
            console.log(ends);
            let starts_sum:number = 0;
            starts.map(item => starts_sum += item);
            let ends_sum:number = 0;
            ends.map(item => ends_sum += item);
            this.itog_dohod = (ends_sum / starts_sum).toString();
            this.itog_dohod365 = (Math.pow((ends_sum / starts_sum), 365)).toString();
          }
          console.log(resp);
          //console.log(fields);
        }
      });
    }
  }
  excelExport() {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    let tablesJSON: any = [];
    let table = {
      name: this.new_name,
      fields: this.fields,
    }
    table.fields.forEach(item => {
      tablesJSON.push(
        {
          'Название': item.name,
          'Биржа': item.birza,
          'Дата Покупки': item.buyDate,
          'Цена Покупки': item.buyPrice,
          'Дата Продажи': item.saleDate,
          'Цена Продажи': item.salePrice,
          'Количество': item.number,
          'Доходноть в день': item.dohod,
        }
      );
    });
    const worksheet = XLSXX.utils.json_to_sheet(tablesJSON);
    const workBook = {
      Sheets:{
        'testingSheet':worksheet
      },
      SheetNames:['testingSheet']
    }
    const excelBuffer = XLSXX.write(workBook,{bookType: 'xlsx', type:'array'});
    const blobData = new Blob([excelBuffer], {type:EXCEL_TYPE});
    this.fileSaver.save(blobData, table.name);
  }
  saveTable() {
    let table = {name: this.new_name,fields: this.fields}
    if (this.groupId === '') {
      this.tableservice.patchFields(this.route.snapshot.params['id'], table).subscribe({
        next: resp => {
          location.reload();
        }
      });
    } else {
      this.tableservice.patchFields(this.tableId, table, this.groupId).subscribe({
        next: resp => {
          location.reload();
        }
      });
    }
  }
  deleteTable() {
    if (this.groupId === '') {
      this.tableservice.deleteTable(this.route.snapshot.params['id']).subscribe({
        next: resp => {
          this.router.navigate(['/tables']);
        }
      });
    } else {
      this.tableservice.deleteTable(this.tableId, this.groupId).subscribe({
        next: resp => {
          this.router.navigate(['/tables']);
        }
      });
    }
  }
  addEmptyString() {
    this.fields.push({
      name: '',
      birza: '',
      buyDate: '',
      buyPrice: '',
      saleDate: '',
      salePrice: '',
      dohod: 'empty',
    });
  }
  deleteString(index: number) {
    this.fields.splice(index, 1);
  }
}
