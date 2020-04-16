import { Component, OnInit, OnDestroy} from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { LayoutService } from '../services/layout.service';
import { User } from '../classes/User';
import { NbAuthOAuth2JWTToken, NbAuthService } from '@nebular/auth';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  items = [
    {
      title: 'Logout',
      link: 'auth/logout',
    },
  ];
  userPictureOnly: boolean = false;
  user: User;
  userMenu = [ 
              { title: 'Profile' }, 
              { title: 'Log out', link: 'auth/logout', } 
            ];
  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private layoutService: LayoutService,
              private authService: NbAuthService,
              private breakpointService: NbMediaBreakpointsService,
              private themeService: NbThemeService
              ) { }

  ngOnInit() {
    /*this.userService.getUsers()
    .pipe(takeUntil(this.destroy$))
    .subscribe((users: any) => this.user = users.nick);*/
    this.user = new User();
    this.authService.onTokenChange()
    .subscribe((token: NbAuthOAuth2JWTToken) => {
    if (token.isValid()) {
      this.user = token.getPayload();
      localStorage.setItem('user' , JSON.stringify(this.user));
    }
  });
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);
  }
  ngOnDestroy() {

      localStorage.removeItem('user');
  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }
  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
