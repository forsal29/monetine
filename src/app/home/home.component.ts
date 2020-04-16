import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { User } from '../classes/User';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user:User;

   menu: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'home-outline',
      link: '/home/dashboard',
      home: true,
    },
    {
      title: 'Spese',
      icon: 'shopping-cart-outline',
      link: '/home/spese',
    },
    {
      title: 'Analisi',
      icon: 'pantone-outline',
      link: '/home/analisi',
    },
    {
      title: 'Impostazioni',
      icon: 'options-2-outline',
      children: [
        {
          title: 'Categorie',
          icon: 'browser-outline',
          link: '/home/categorie',
        },
        {
          title: 'Conti',
          icon: 'grid-outline',
          link: '/home/conti',
        },
      ],
    },
  ];
  constructor(private dialogService: NbDialogService) { }

  ngOnInit() { }

  openDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

}
