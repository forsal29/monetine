import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ContoService } from '../../services/conto.service';
import {Conto} from '../../classes/Conto';
import {User} from '../../classes/User';
import { UserService } from 'src/app/services/user.service';
import { NbCheckboxComponent } from '@nebular/theme';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-conti',
  templateUrl: './conti.component.html',
  styleUrls: ['./conti.component.scss']
})
export class ContiComponent implements OnInit {

  private conti:Conto[] = [];
  settings = {
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
      nome_conto: {
        title: 'Descrizione'
      },
      saldo: {
          title: 'Saldo',
          valuePrepareFunction: (value) => { 
            return value === 'Total'? value : Intl.NumberFormat('it-IT',{style:'currency', currency: 'EUR'}).format(value)
          },
      },
      preview: {
        title: 'Preview',
        type: 'custom',
        filter: false,
        editor: {
          type: 'checkbox',
          config: { 
            true: 'True',
            false: 'False'
          }
        },
        width: '10px',
      //  valuePrepareFunction: (value) => { return value == 1 ? 'True' : 'False' },
        renderComponent: NbCheckboxComponent
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(private contoService: ContoService, private userService: UserService) {
  //  this.contoService.getCategories().subscribe(result => this.data = result['data']);
   // this.source.load(data);
   }

  ngOnInit() {
    this.contoService.getConti().subscribe(
      response => {
          this.conti = response['data'];
          this.source.load(this.conti);
      }

  );
  }
  onDeleteConfirm(event): void {

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
    }
  }
  onSaveConfirm(event) {
    let l_conto = new Conto();
    l_conto = event.newData;
    //l_conto.preview == 'True' ? l_conto.preview = 1 : l_conto.preview = 0;

    this.contoService.updateConto(l_conto).subscribe(response => {
      if (response['success']) {
        event.confirm.resolve();
      } else {
        event.confirm.reject();
        alert(response['message']);
      }
    });
    
  }

  onCreateConfirm(event) {
    let l_coadd = new Conto();
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
      }
 
  }

}
