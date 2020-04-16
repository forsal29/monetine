import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CategoryService } from '../../services/category.service';
import {Category} from '../../classes/Category';
import {User} from '../../classes/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  private categories: Category[] = [];
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
      nome_category: {
        title: 'Descrizione',
        filter: false,
      },

      note: {
          title: 'Note',
          filter: false,
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(private categoryService: CategoryService, private userService: UserService) {
  //  this.categoryService.getCategories().subscribe(result => this.data = result['data']);
   // this.source.load(data);
   }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      response => {
          this.categories = response['data'];
          this.source.load(this.categories);
      }

  );
  }
  onDeleteConfirm(event): void {

    let l_catdel = new Category();
    l_catdel = event.data;
    if (window.confirm('Are you sure you want to delete?')) {
      this.categoryService.deleteCategory(l_catdel).subscribe(
        response => {
          //  alert(response['message']);
            event.confirm.resolve();
        } );
      
    } else {
      event.confirm.reject();
    }
  }
  onSaveConfirm(event) {
    let l_category = new Category();
    l_category = event.newData;
    this.categoryService.updateCategory(l_category).subscribe(response => {
      if (response['success']) {
        event.confirm.resolve();
      } else {
        event.confirm.reject();
        alert(response['message']);
      }
    });
    
  }

  onCreateConfirm(event) {
    let l_cat = new Category();
    l_cat = event.newData;
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
            l_cat.user_id = user[0].id;
            this.categoryService.createCategory(l_cat).subscribe(response => {
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
