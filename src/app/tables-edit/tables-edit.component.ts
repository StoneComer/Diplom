import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private route: ActivatedRoute, private tablec: TablesComponent, private authtable: Tables, private fileSaver: FileSaverService, private tableservice: TablesService) {}
  isTable: boolean = false;
  index = {
    indexTable: 0,
    group: false,
    indexGroup: 0,
  };
  table: any;
  tables: profile_tables = {
    tables: [{
      name: 'test_1',
      fields: [{
        name: 'Газпром',
        birza: 'Сбербанк Инвестиции',
        buyDate: '2023-04-08',
        buyPrice: '',
        saleDate: '2023-05-08',
        salePrice: '',
        dohod: '',
      }],
    }],
    groupsTables: [
      {
      name: 'test_group_1',
      tables: [{
        name: 'test_2',
        fields: [{
          name: 'Башнефть',
          birza: 'Тинькофф Инвестиции',
          buyDate: '2023-04-08',
          buyPrice: '',
          saleDate: '2023-04-08',
          salePrice: '',
          dohod: '',
        }],
      }],
      }
    ],
  };

  ngOnInit(): void {
    this.tables = this.authtable.tables;
    let id = this.route.snapshot.params['id'].findIndex('-');
    if (id > -1) {
      let group = this.route.snapshot.params['id'].split('+')[0]; // 50ml
      let table = this.route.snapshot.params['id'].split('+')[1];
      this.tableservice.getOneTable(table, group).subscribe({
        next: resp => {
          table = resp;
          console.log(table);
        }
      }); // $100
    }
    console.log(this.tablec.tables);
    console.log(this.tables);
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
  renameTable(new_name: string) {
    if (this.index.group) {
      this.tables.groupsTables[this.index.indexGroup].tables[this.index.indexTable].name = new_name;
    } else {
      this.tables.tables[this.index.indexTable].name = new_name;
    }
  }
  saveTable() {

  }
  deleteTable() {
  }
}
