import { Component, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Analisi } from '../../interfaces/Analisi';
import { AnalisiService } from '../../services/analisi.service';



interface  TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}



@Component({
  selector: 'app-analisi',
  templateUrl: './analisi.component.html',
  styleUrls: ['./analisi.component.scss']
})
export class  AnalisiComponent {
  customColumn = 'categoria';
  defaultColumns = [ 'date', 'descrizione', 'tipo', 'importo' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<Analisi>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<Analisi>,
              private analisiService: AnalisiService) {
                this.analisiService.getAnalisiData().subscribe( res => { 
                  this.data = res['data'];
                  this.dataSource = this.dataSourceBuilder.create(this.data);
              });
    
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  private data: TreeNode<Analisi>[] = [];
   /* {
      data: { categoria: 'Casa', date: '', descrizione:'' , tipo: '-', importo: '' },
      children: [
        { data: { categoria: 'Casa', date: '01/10/2019', descrizione: 'spesa' , tipo: 'Uscita', importo:'150 €' } },
        { data: { categoria: 'Casa', date: '27/10/2019', descrizione: 'stipendio' , tipo: 'E', importo: '1580 €' } },
        { data: { categoria: 'Casa', date: '30/10/2019', descrizione: 'Prelievo' , tipo: 'Trasferimento', importo: '150 €' } },
        { data: { categoria: 'Casa', date: '01/10/2019', descrizione: 'sepsa casa' , tipo: 'Uscita', importo: '52 €' } },
      ],
    },
    
  ];*/

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
}

