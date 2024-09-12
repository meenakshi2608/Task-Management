import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  items: MenuItem[] = [
    {
      label: 'Tasks',
      routerLink: '/tasks',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'About',
      routerLink: '/about',
      routerLinkActiveOptions: { exact: true },
    },
  ];
  activeRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen to route changes and set the active route
    this.router.events.subscribe(() => {
      this.activeRoute = this.router.url;
    });
  }

  isActive(link: string): boolean {
    return this.activeRoute === link;
  }
}
