import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Spese } from 'src/app/classes/Spese';
import { Conto } from 'src/app/classes/Conto';
import { Category } from 'src/app/classes/Category';
import { FormControl } from '@angular/forms';
import {CategoryService} from '../../../services/category.service';
import {ContoService} from '../../../services/conto.service';
import {SpeseService} from '../../../services/spese.service';



@Component({
  selector: 'app-spese-dialog',
  templateUrl: './spese-dialog.component.html',
  styleUrls: ['./spese-dialog.component.scss']
})
export class SpeseDialogComponent implements OnInit, OnDestroy {
  mySpesa: Spese;
  title: String;
  tbSelected: String;

  tbEntSel = false;
  tbEntDis = false;
  tbUscSel = false;
  tbUscDis = false;
  tbTrasfSel = false;
  tbTrasfDis = false;
  categories: Category[];
  conti: Conto[];
  checked = false;

  constructor(protected ref: NbDialogRef<SpeseDialogComponent>,
              private categoryService: CategoryService,
              private contoService: ContoService,
              private spesaService: SpeseService) { }

  ngOnInit(): void {
    let l_data;
    this.checked = false;
    // inizializzo variabili per visualizzaione tab
    switch ( this.tbSelected ) {
      case 'e': {
        this.tbEntSel = true;
        this.tbUscDis = true;
        this.tbTrasfDis = true;
        break;
      }
      case 'u': {
        this.tbUscSel = true;
        this.tbEntDis = true;
        this.tbTrasfDis = true;
        break;
      }
    case 't': {
      this.tbTrasfSel = true;
      this.tbEntDis = true;
      this.tbUscDis = true;
      break;
     }
    }

    this.mySpesa.data ? l_data = new Date(this.mySpesa.data) : l_data = new Date();
    this.mySpesa.data = l_data;

    if (this.mySpesa.futura === '0') { this.mySpesa.futura = ''; }
    if ( this.mySpesa.ripetuta === '0' || this.mySpesa.ripetuta === '' ) { this.mySpesa.ripetuta = ''; } else { this.checked = true; }

    this.categoryService.getCategories().subscribe(
      response => {
        this.categories = response['data'];
      } );
    this.contoService.getConti().subscribe(
        response => {
          this.conti = response['data'];
      });

  }

  ngOnDestroy(): void {
    delete this.mySpesa;

  }


  cancel() {
    this.ref.close();
  }


  saveSpesa(spesa) {
    if ( spesa.value.ripetuta){
      spesa.value.datafutura = this.calcNextDate(spesa.value.rip_time);
    }
    if (spesa.value.importo === 0 ) {
      alert('Attenzione importo pari a zero');
    } else if (spesa.value.descrizione === '') {
      alert('Inserire la descrizione');
    } else {
      this.ref.close(spesa.value);
    }
  }

  resetForm() {}

  toggle(checked: boolean) {
    this.checked = checked;
  }

  showFormControls(form: any) {

    const invalid = [];
    const controls = form.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
  }
  onDateCalc(changed) {
    this.mySpesa.datafutura = this.calcNextDate(changed);
  }
  calcNextDate(changed){
    return this.spesaService.calcolaDataFutura(this.mySpesa.data,changed);
  }
  dataChanged(newObj) {
    if(this.mySpesa.ripetuta){
      this.mySpesa.datafutura = this.spesaService.calcolaDataFutura(newObj,this.mySpesa.rip_time);
    } 
    // here comes the object as parameter
}
}
