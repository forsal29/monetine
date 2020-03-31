import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Spese } from 'src/app/classes/Spese';
import {ContoService} from '../../services/conto.service';
import { UserService } from '../../services/user.service';
import {User} from '../../classes/User';
import { Category } from '../../classes/Category';
import { CategoryService } from '../../services/category.service';
import { SpeseService } from '../../services/spese.service';
import {Conto} from '../../classes/Conto';
import {DatePipe} from "@angular/common";
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { SpeseDialogComponent } from './spese-dialog/spese-dialog.component';

@Component({
  selector: 'app-spese',
  templateUrl: './spese.component.html',
  styleUrls: ['./spese.component.scss']
})
export class SpeseComponent implements OnInit {
  @Output() onSelectSpese = new EventEmitter();
private spesa:Spese;
  private spese:Spese[] = [];
  settings = {
    mode : "external",
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      data: {
        title: 'Data',
   /*     valuePrepareFunction: (value) => {
            var raw = new Date(value);
            var formatted = this.datePipe.transform(raw, 'dd-MM-yyyy');
            return formatted;
        }*/
    },
    nome_spesa: {
      title: 'Descrizione'
    },
      category_desc: {
          title: 'Categoria'
      },


      conto_da_desc: {
          title: 'Conto da'
      },
      conto_a_desc: {
          title: 'Conto a'
      },

      importo: {
          title: 'Importo',
         // valuePrepareFunction: (value) => { return value === 'Total'? value : Intl.NumberFormat('it-IT',{style:'currency', currency: 'EUR'}).format(value)}
      }
    },
  attr: {
    class: 'table table-striped'
  },

    orderby: {
      title: 'Data',
      filter: true
    }
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(private speseService: SpeseService, private contoService: ContoService,
    private userSerice: UserService, private categoryService : CategoryService,
   // private datePipe: DatePipe
   private dialogService: NbDialogService
   ) {
  //  this.contoService.getCategories().subscribe(result => this.data = result['data']);
   // this.source.load(data);
   }

  ngOnInit() {
    this.speseService.getSpese().subscribe(
      response => {
          this.spese = response['data'];
          this.source.load(this.spese);
      }

  );
  }
  onDeleteConfirm(event): void {
/*
    let l_codel = new Conto();
    l_codel = event.data;
    if (window.confirm('Sei sicuro di voler cancellare?')) {
      this.contoService.deleteConto(l_codel).subscribe(
        response => {
          //  alert(response['message']);
            event.confirm.resolve();
        } );
      
    } else {
      event.confirm.reject();
    }*/
  }
  onSaveConfirm(event) {
   /* let l_conto = new Conto();
    l_conto = event.newData;
    //l_conto.preview == 'True' ? l_conto.preview = 1 : l_conto.preview = 0;

    this.contoService.updateConto(l_conto).subscribe(response => {
      if (response['success']) {
        event.confirm.resolve();
      } else {
        event.confirm.reject();
        alert(response['message']);
      }
    });*/
    
  }

  onCreateConfirm(event) {
 /*   let l_coadd = new Conto();
    l_coadd = event.newData;
    const data = JSON.parse(localStorage.getItem('user'));
    //console.log(data);

    let user = new User();
    if(data){
        user.name = data['user_name'];
        user.email = data['email'];
    }
    if(user.email != ''){
    this.userService.getUserByMail(user.email).subscribe(
        response => {
            user = response['data'];
            l_coadd.user_id = user[0].id;
            this.contoService.createConto(l_coadd).subscribe(response => {
              if (response['success']) {
                //  alert('Categoria ' + category.nome_category + ' creata correttamente');
                event.confirm.resolve();
              } else {
                  alert(response['message']);
                  event.confirm.reject();
              }
      
          });
        });
      }*/
 
  }
  onCreate(event){
   // const modalRef = this.modalService.open(SpeseDetailComponent);
   // modalRef.componentInstance.myUpdateSpesa = this.myMethodFunc;

    this.spesa = new Spese();
    this.onSelectSpese.emit(this.spesa);
    this.dialogService.open(SpeseDialogComponent).onClose.subscribe(spesa => console.log(spesa));
    
  }

}
