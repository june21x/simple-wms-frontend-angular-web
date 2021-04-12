import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

interface Menu {
  name: string;
  routerLink: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Simple WMS';
  subTitle = '';
  description = '';

  menu: Menu[] = [
    {name: 'Warehouse', routerLink: '/warehouse'},
    {name: 'Delivery Order', routerLink: '/delivery-order'},
    {name: 'New Shipment', routerLink: '/shipment-order'},
    {name: 'History', routerLink: '/history'},
  ];

  constructor(private titleService: Title, private router: Router,
    private activatedRoute: ActivatedRoute) { }

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
}
