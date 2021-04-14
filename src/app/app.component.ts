import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { TooltipPosition } from '@angular/material/tooltip';

interface Menu {
  name: string;
  routerLink: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Simple WMS';
  subTitle = '';
  description = '';
  isMenuOpen = false;
  contentMargin = 240;

  menuList: Menu[] = [
    { name: 'Warehouse', routerLink: '/warehouse', icon: 'home' },
    { name: 'Delivery Order', routerLink: '/delivery-order', icon: 'file_download' },
    { name: 'New Shipment', routerLink: '/shipment-order', icon: 'file_upload' },
    { name: 'History', routerLink: '/history', icon: 'history' },
  ];

  constructor(private titleService: Title, private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  setDocTitle(title: string) {
    console.log('current title:::::' + this.titleService.getTitle());
    this.titleService.setTitle(title);
  }


  ngOnInit() {
    const appTitle = this.titleService.getTitle();

    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          if (child.snapshot.data['subTitle']) {
            return child.snapshot.data['subTitle'];
          }
          return appTitle;
        })
      ).subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
        this.subTitle = ttl.toUpperCase();
      });

    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          if (child.snapshot.data['description']) {
            return child.snapshot.data['description'];
          }
          return appTitle;
        })
      ).subscribe((desc: string) => {
        this.description = desc;
      });
  }

  onToolbarMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.contentMargin = 80;
    } else {
      this.contentMargin = 240;
    }
  }
}
