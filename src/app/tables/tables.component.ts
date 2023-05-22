import { Component, OnInit } from '@angular/core';
import { profile_tables } from '../interfaces';
import * as XLSX from 'xlsx';
import { AuthService, Tables } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TablesService } from '../tables.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  constructor(private authtables: Tables, private route: ActivatedRoute, private table: TablesService, private router: Router) {}
  excelData: any;
  current_folder: 'none' | 'folder' = 'none';
  current_folder_index: number = 0;
  groups: {
    groups_ides: string[],
    names: any[],
    tables_ides: any[],
  } = {
    groups_ides: [],
    names:[],
    tables_ides: [],
  };
  tables_test: any;
  tables_ides: string[] = [];
  tables_base: profile_tables = {
    tables: [],
    groupsTables: [],
  };
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
    this.tables = this.authtables.tables;
    this.route.data.subscribe({
      next: (resp: any) => {
        console.log(resp['tables']);
        if (!resp['tables']){
          this.table.postEmptyUserSlot().subscribe({});
        } else if (resp['tables'] !== 'empty') {
          // console.log(resp['tables']);
          let tables = resp.tables.tables;
          this.tables_ides = Object.keys(tables);
          this.tables_base.tables = Object.values(tables);
          let group = resp.tables.group;
          this.groups.groups_ides = Object.keys(group);
          let ingroup: any[] = Object.values(group);
          ingroup.forEach(item => {
            this.groups.names.push(item.name);
            if (item.tables){
              this.groups.tables_ides.push(Object.keys(item.tables));
              this.tables_base.groupsTables.push({
                name: item.name,
                tables: Object.values(item.tables),
              });
            } else {
              this.tables_base.groupsTables.push({
                name: item.name,
                tables: [],
              });
            }
          });
          console.log(this.tables_base);
        }
      },
    });
  }
  openFolder(name: string) {
    this.current_folder = 'folder';
    this.current_folder_index = this.tables_base.groupsTables.findIndex(item => item.name === name);
  }
  closeFolder() {
    this.current_folder = 'none';
    this.current_folder_index = 0;
  }
  add_empty_table() {
    this.table.postNewEmptyTable().subscribe({
      next: resp => {
        document.location.reload();
      }
    });
  }
  add_empty_group() {
    this.table.postNewGroup().subscribe({
      next: resp => {
        document.location.reload();
      }
    });;
  }
  ReadExcel(event: any, ) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    let excelD;
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, {type:'binary'});
      var sheetNames = workBook.SheetNames;
        //excelD.push(XLSX.utils.sheet_to_json(workBook.Sheets[item]));
        this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
        console.log(XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]));
        var field = {
          name: this.excelData[0]['Название'],
          birza: this.excelData[0]['Биржа'],
          buyDate: this.excelData[0]['Дата Покупки'].toString(),
          buyPrice: this.excelData[0]['Цена Покупки'].toString(),
          saleDate: this.excelData[0]['Дата Продажи'].toString(),
          salePrice: this.excelData[0]['Цена Продажи'].toString(),
          dohod: '',
        }
        var table = {
          name: event.target.files[0].name,
          fields: [field],
        }
        if (this.current_folder === 'folder') {
          if (this.tables.groupsTables[this.current_folder_index].tables.findIndex(item => item.name === table.name) > -1) {
            table.name = table.name + '(1)'
          }
          this.tables.groupsTables[this.current_folder_index].tables.push(table);
        } else {
          if (this.tables.tables.findIndex(item => item.name === table.name) > -1) {
            table.name = table.name + '(1)'
          }
          this.tables.tables.push(table);
        }
        this.authtables.tables = this.tables;
    }
  }
}
