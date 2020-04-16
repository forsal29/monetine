import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-conferma-dialog',
  templateUrl: './conferma-dialog.component.html',
  styleUrls: ['./conferma-dialog.component.scss']
})
export class ConfermaDialogComponent implements OnInit {
text:string;
  constructor(protected ref: NbDialogRef<ConfermaDialogComponent>) { }

  ngOnInit(): void {
  }
  
  cancel() {
    this.ref.close();
  }
  conferma() {
    this.ref.close("OK");
  }
}
