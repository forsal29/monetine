import { Component, OnInit } from '@angular/core';
import { Saldo } from 'src/app/classes/Saldo';
import { SaldoService} from '../../services/saldo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  saldo: Saldo[] = [];
  on = true;
  constructor(private saldoService: SaldoService) { }

  ngOnInit() {
    this.saldoService.getSaldoData().subscribe(
      response => {
          this.saldo = response['data'];
          }

  );
  }

}
