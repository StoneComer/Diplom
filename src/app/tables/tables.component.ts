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
    tables_ides: {
      idGroup: string,
      tablesIdes: any[],
    }[],
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

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (resp: any) => {
        console.log(resp['tables']);
        if (!resp['tables']){
          this.table.postEmptyUserSlot().subscribe({
            next: resp => {
              location.reload();
            }
          });
        } else if (resp['tables'] !== 'empty') {
          // console.log(resp['tables']);
          if (resp.tables.tables)
          {
            let tables = resp.tables.tables;
            this.tables_ides = Object.keys(tables);
            this.tables_base.tables = Object.values(tables);
          }
          if (resp.tables.group)
          {
            let group = resp.tables.group;
            this.groups.groups_ides = Object.keys(group);
            let ingroup: any[] = Object.values(group);
            let i = 0;
            ingroup.forEach(item => {
              this.groups.names.push(item.name);
              if (item.tables){
                this.groups.tables_ides.push({idGroup: this.groups.groups_ides[i], tablesIdes: Object.keys(item.tables)});
                this.tables_base.groupsTables.push({
                  name: item.name,
                  tables: Object.values(item.tables),
                });
              } else {
                this.groups.tables_ides.push({idGroup: this.groups.groups_ides[i], tablesIdes: []})
                this.tables_base.groupsTables.push({
                  name: item.name,
                  tables: [],
                });
              }
              i++;
            });
          }
          console.log(this.groups);
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
  checkNames() {
    let bool = true;
    let i = 1;
    let empty: string = 'empty';
    let index = 1;
    if (this.tables_base.groupsTables[this.current_folder_index].tables)
    {
      while (bool) {
        if (this.current_folder){
          index = this.tables_base.groupsTables[this.current_folder_index].tables.findIndex(item => item.name === empty);
        } else {
          index = this.tables_base.tables.findIndex(item => item.name === empty);
        }
        if (index > -1) {
          empty = 'empty' + '(' + i + ')';
          i++;
        } else {
          bool = false;
        }
      }
    }
    return empty;
  }
  checkNamesGroup() {
    let bool = true;
    let i = 1;
    let empty: string = 'empty';
    while (bool) {
      let index = this.tables_base.groupsTables.findIndex(item => item.name === empty);
      if (index > -1) {
        empty = 'empty' + '(' + i + ')';
        i++;
      } else {
        bool = false;
      }
    }
    return empty;
  }
  add_empty_table() {
    let empty = this.checkNames();
    if (this.current_folder === 'folder') {
      this.table.postNewEmptyTableInGroup(this.groups.groups_ides[this.current_folder_index], empty).subscribe({
        next: resp => {
          document.location.reload();
        }
      });
    } else {
      this.table.postNewEmptyTable(empty).subscribe({
        next: resp => {
          document.location.reload();
        }
      });
    }
  }
  add_empty_group() {
    let empty = this.checkNamesGroup();
    this.table.postNewGroup(empty).subscribe({
      next: resp => {
        document.location.reload();
      }
    });;
  }
  deleteGroup() {
    this.table.deleteGroup(this.groups.groups_ides[this.current_folder_index]).subscribe({
      next: resp => {
        document.location.reload();
      }
    });
  }
  // ReadExcel(event: any, ) {
  //   let file = event.target.files[0];
  //   let fileReader = new FileReader();
  //   let excelD;
  //   fileReader.readAsBinaryString(file);
  //   fileReader.onload = (e) => {
  //     var workBook = XLSX.read(fileReader.result, {type:'binary'});
  //     var sheetNames = workBook.SheetNames;
  //       //excelD.push(XLSX.utils.sheet_to_json(workBook.Sheets[item]));
  //       this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
  //       console.log(XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]));
  //       var field = {
  //         name: this.excelData[0]['Название'],
  //         birza: this.excelData[0]['Биржа'],
  //         buyDate: this.excelData[0]['Дата Покупки'].toString(),
  //         buyPrice: this.excelData[0]['Цена Покупки'].toString(),
  //         saleDate: this.excelData[0]['Дата Продажи'].toString(),
  //         salePrice: this.excelData[0]['Цена Продажи'].toString(),
  //         dohod: '',
  //       }
  //       var table = {
  //         name: event.target.files[0].name,
  //         fields: [field],
  //       }
  //       if (this.current_folder === 'folder') {
  //         if (this.tables.groupsTables[this.current_folder_index].tables.findIndex(item => item.name === table.name) > -1) {
  //           table.name = table.name + '(1)'
  //         }
  //         this.tables.groupsTables[this.current_folder_index].tables.push(table);
  //       } else {
  //         if (this.tables.tables.findIndex(item => item.name === table.name) > -1) {
  //           table.name = table.name + '(1)'
  //         }
  //         this.tables.tables.push(table);
  //       }
  //       this.authtables.tables = this.tables;
  //   }
  // }
  editTable(index: number) {
    if (this.current_folder === 'none') {
      this.router.navigate(['/tables/edit/' + this.tables_ides[index]]);
    } else {
      this.router.navigate(['/tables/edit/' + this.groups.groups_ides[this.current_folder_index] + '--' + this.groups.tables_ides[this.current_folder_index].tablesIdes[index]]);
    }
  }
}
