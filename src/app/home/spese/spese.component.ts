import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Spese } from 'src/app/classes/Spese';
import { ContoService } from '../../services/conto.service';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/User';
import { Category } from '../../classes/Category';
import { CategoryService } from '../../services/category.service';
import { SpeseService } from '../../services/spese.service';
import { Conto } from '../../classes/Conto';
import { DatePipe } from "@angular/common";
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { SpeseDialogComponent } from './spese-dialog/spese-dialog.component';
import { ConfermaDialogComponent } from '../../conferma-dialog/conferma-dialog.component';
import { element } from 'protractor';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';


@Component({
  selector: 'app-spese',
  templateUrl: './spese.component.html',
  styleUrls: ['./spese.component.scss']
})
export class SpeseComponent implements OnInit {
  public ch_ripetute:boolean = false;
  public ch_future:boolean = false;
  private spesa: Spese;
  private spese: Spese[] = [];
  settings = {
    mode: "external",
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
        valuePrepareFunction: (value) => {
          return this.datePipe.transform(new Date(value), 'dd-MM-yyyy');
        }
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
        valuePrepareFunction: (value) => { return value === 'Total' ? value : Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value) }
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
  categories: Category[];
  conti: Conto[];
  source: LocalDataSource = new LocalDataSource();
  constructor(private speseService: SpeseService, private contoService: ContoService,
    private userSerice: UserService, private categoryService: CategoryService,
    private datePipe: DatePipe,
    private dialogService: NbDialogService
  ) {

  }

  ngOnInit() {
    // controllo se ci sono spese future
    var speseScadute: Spese[] = [];
    var speseRipetute: Spese[] = [];
    var speseRipIns: Spese[] = [];

    this.speseService.getSpeseScadute().subscribe(
      response => {
        speseScadute = response['data'];
        if (speseScadute.length > 0) {
          this.dialogService.open(ConfermaDialogComponent, {
            context: {
              text: 'Ci sono transazioni future da inserire, vuoi procedere?',
            },
          }).onClose.subscribe(res => {

            if (res === "OK") {
              this.speseService.updateSpeseScadute(speseScadute);
              speseScadute.forEach(element => {
                this.source.add(element);
              });
              this.source.setSort([
                { field: 'data', direction: 'desc' }
              ]);
              this.source.refresh();
            }
          });
        }
      });

    // spese ripetute
    this.speseService.getSpeseRipetute().subscribe(
      response => {
        speseRipetute = response['data'];
        speseRipetute.forEach(element => {
          if(element.datafutura){
            if(new Date(element.datafutura) < new Date()){
              speseRipIns.push(element);
            }                    
          }
        });
                if (speseRipIns && speseRipIns.length > 0){   
          this.dialogService.open(ConfermaDialogComponent, {
            context: { text : 'Ci sono transazioni ripetute da inserire, vuoi procedere?',
          },
        }).onClose.subscribe(res => {

            if(res === "OK"){
              this.speseService.createSpeseRipetute(speseRipIns);
         /*     speseRipIns.forEach(element => {
                this.source.add(element);
              });*/
              this.source.setSort([
                { field: 'data', direction: 'desc' }
              ]);
              this.source.refresh();
            }
          } );
        }
  });
 // leggi le categorie
    this.categoryService.getCategories().subscribe(
    response => {
      this.categories = response['data'];
    });
this.contoService.getConti().subscribe(
  response => {
    this.conti = response['data'];
  });
this.speseService.getSpese().subscribe(
  response => {
    this.spese = response['data'];
    this.source.load(this.spese);
  }

);
  }
onDelete(event): void {
  let l_spesa = new Spese();
  l_spesa = event.data;
  if(window.confirm('Sei sicuro di voler cancellare?')) {
  this.speseService.deleteSpesa(l_spesa).subscribe(
    response => {
      if (response['success']) {
        this.source.remove(l_spesa);
        this.source.refresh();
      } else {
        alert(response['message']);
      }
    });
} 
  }

onEdit(event) {
  let l_spesa = new Spese();
  let selTab: string;
  l_spesa = event.data;
  if (l_spesa.conto_da > 0 && l_spesa.conto_a > 0)
    selTab = 't'; //trasferimento
  else if (l_spesa.conto_da > 0)
    selTab = 'u'; //entrate
  else if (l_spesa.conto_a > 0)
    selTab = 'e'; //uscite

  this.dialogService.open(SpeseDialogComponent, {
    context: {
      title: 'Modifica Spesa',
      mySpesa: l_spesa,
      tbSelected: selTab,
    },
  }).onClose.subscribe(spesa => {
    if (spesa) {
      this.Save(spesa, event.index);

    }
  });

}


onCreate(event){
  let l_spesa = new Spese();
  this.dialogService.open(SpeseDialogComponent, {
    context: {
      title: 'Crea Spesa',
      mySpesa: l_spesa,
    },
  }).onClose.subscribe(spesa => {
    if (spesa) {
      this.Save(spesa);
    }
  });

}
Save(spesa: Spese, id ?: number) {
  this.spesa = spesa;
  const data = JSON.parse(localStorage.getItem('user'));
  let user = new User();
  if (data) {
    user.name = data['user_name'];
    user.email = data['email'];
  }
  this.userSerice.getUserByMail(user.email).subscribe(
    response => {
      let user = response['data'];
      this.spesa.user_id = user[0].id;
      this.updateSpesa(this.spesa, id);

    });


}
updateSpesa(spesa: Spese, id ?: number) {

  //converto data
  var lSpesa = new Spese();
  var mydate = new Date(spesa.data);  
  if (spesa.datafutura) {
    var dateParts = spesa.datafutura.split("/");
    var mydateFut = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    mydateFut.setHours(mydateFut.getHours() + (mydateFut.getTimezoneOffset() / -60));
    spesa.datafutura = mydateFut.toJSON().slice(0, 10).replace('T', ' ');
  }
  var methodName = "createSpesa";
  mydate.setHours(mydate.getHours() + (mydate.getTimezoneOffset() / -60));
  spesa.data = mydate.toJSON().slice(0, 10).replace('T', ' ');


  if (!spesa.rip_time) spesa.rip_time = "0";
  if (!spesa.ripetuta) spesa.ripetuta = "0";
  if (!spesa.futura) spesa.futura = "0";
  spesa.id ? methodName = "updateSpesa" : "createSpesa";
  this.speseService[methodName](spesa).subscribe(response => {
    if (response['success']) {
      lSpesa = response['data'];
      if (lSpesa.conto_da != null && lSpesa.conto_a != null)
        lSpesa.category = 7;
      if (lSpesa.category != null)
        lSpesa.category_desc = this.categories.find(element => element.id.toString() === lSpesa.category.toString()).nome_category;
      if (lSpesa.conto_da != null)
        lSpesa.conto_da_desc = this.conti.find(ele_co => ele_co.id.toString() === lSpesa.conto_da.toString()).nome_conto;
      if (lSpesa.conto_a != null)
        lSpesa.conto_a_desc = this.conti.find(ele_co => ele_co.id.toString() === lSpesa.conto_a.toString()).nome_conto;
      if (spesa.id === null || spesa.id === 0) {
        this.source.add(lSpesa);
        this.source.setSort([
          { field: 'data', direction: 'desc' }
        ]);
      } else {
        var data = this.source['data'];
        data[id] = lSpesa;
        this.source.load(data);
      }
      this.source.refresh();

    } else {
      alert(response['message']);
    }
  });
}
toggle(checked: boolean) {
  this.ch_ripetute = false;
  if (checked) {
    this.speseService.getSpeseFuture().subscribe(
      response => {
        this.spese = response['data'];
        this.source.load(this.spese);
      });
  } else {
    this.speseService.getSpese().subscribe(
      response => {
        this.spese = response['data'];
        this.source.load(this.spese);
      });
    this.source.refresh();
  }
}
toggleRipetute(checked: boolean) {
  this.ch_future = false;
  if (checked) {
    this.speseService.getSpeseRipetute().subscribe(
      response => {
        this.spese = response['data'];
        this.source.load(this.spese);
      });
  } else {
    this.speseService.getSpese().subscribe(
      response => {
        this.spese = response['data'];
        this.source.load(this.spese);
      });
    this.source.refresh();
  }
}
}
