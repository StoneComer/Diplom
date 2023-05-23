import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tables } from '../auth.service';
import { profile_tables } from '../interfaces';
import { TablesComponent } from '../tables/tables.component';
import { FileSaverService } from 'ngx-filesaver';
import * as XLSXX from 'xlsx';
import { TablesService } from '../tables.service';

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
  fields: any = [];
  sendfields: any;
  index = {
    indexTable: 0,
    group: false,
    indexGroup: 0,
  };
  table: {
    name: string,
    fields: any,
  } = {
    name: '',
    fields: null,
  };

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
            this.sendfields = this.fields;
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
            this.sendfields = this.fields;
          }
          console.log(resp);
          //console.log(fields);
        }
      });
    }
    // let id = this.route.snapshot.params['id'].findIndex('-');
    // if (id > -1) {

    // }
    // if (this.tables.tables.findIndex(item => item.id === this.route.snapshot.params['id']) > -1) {
    //   this.index.indexTable = this.tables.tables.findIndex(item => item.id === this.route.snapshot.params['id']);
    //   this.index.group = false;
    //   this.isTable = true;
    // } else {
    //   this.tables.groupsTables.forEach(item => {
    //     let i = 0;
    //     if (item.tables.findIndex(item => item.id === this.route.snapshot.params['id']) > -1) {
    //       this.index.indexTable = item.tables.findIndex(item => item.id === this.route.snapshot.params['id']);
    //       this.index.group = true;
    //       this.index.indexGroup = i;
    //       this.isTable = true;
    //     } else {
    //       this.index.indexTable = 0;
    //       this.index.group = false;
    //       this.index.indexGroup = 0;
    //       this.isTable = false;
    //     }
    //     i++;
    //   })
    // }
  }
  // excelExport() {
  //   const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
  //   const EXCEL_EXTENSION = '.xlsx';
  //   let tablesJSON: any = [];
  //   if (!this.index.group){
  //     this.tables.tables[this.index.indexTable].fields.forEach(item => {
  //       let bd = new Date(item.buyDate);
  //       let sd = new Date(item.saleDate)
  //       tablesJSON.push(
  //         {
  //           'Название': item.name,
  //           'Биржа': item.birza,
  //           'Дата Покупки': bd.toString,
  //           'Цена Покупки': item.buyPrice,
  //           'Дата Продажи': sd.toString,
  //           'Цена Продажи': item.salePrice,
  //           'Доходноть': item.dohod,
  //         }
  //       );
  //     });
  //   } else {
  //     this.tables.groupsTables[this.index.indexGroup].tables[this.index.indexTable].fields.forEach(item => {
  //       let bd = new Date(item.buyDate);
  //       let sd = new Date(item.saleDate)
  //       tablesJSON.push(
  //         {
  //           'Название': item.name,
  //           'Биржа': item.birza,
  //           'Дата Покупки': bd.toString,
  //           'Цена Покупки': item.buyPrice,
  //           'Дата Продажи': sd.toString,
  //           'Цена Продажи': item.salePrice,
  //           'Доходноть': item.dohod,
  //         }
  //       );
  //     });
  //   };
  //   const worksheet = XLSXX.utils.json_to_sheet(tablesJSON);
  //   const workBook = {
  //     Sheets:{
  //       'testingSheet':worksheet
  //     },
  //     SheetNames:['testingSheet']
  //   }
  //   const excelBuffer = XLSXX.write(workBook,{bookType: 'xlsx', type:'array'});
  //   const blobData = new Blob([excelBuffer], {type:EXCEL_TYPE});
  //   this.fileSaver.save(blobData,"demoFile")
  // }
  saveTable() {
    let table = {name: this.new_name,fields: this.sendfields}
    if (this.groupId === '') {
      this.tableservice.patchFields(this.tableId, table).subscribe();
    } else {
      this.tableservice.patchFields(this.tableId, table, this.groupId).subscribe();
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
