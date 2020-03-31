import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Spese } from 'src/app/classes/Spese';
import { Category } from 'src/app/classes/Category';
import { FormControl } from '@angular/forms';
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-spese-dialog',
  templateUrl: './spese-dialog.component.html',
  styleUrls: ['./spese-dialog.component.scss']
})
export class SpeseDialogComponent implements OnInit {
  private __spesa: Spese;
  categories: Category[];
  @Input() set spesa(spesa: Spese){
    this.__spesa = spesa;
    console.log("test");
}
  constructor(protected ref: NbDialogRef<SpeseDialogComponent>,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      response => {
        this.categories = response['data'];
      }
  );

  }
  cancel() {
    this.ref.close();
  }

  submit(name) {
    this.ref.close(name);
  }

saveSpesa(spesa) {
  //console.log(spesa);
  this.ref.close(spesa);

}
resetForm(){}
}
