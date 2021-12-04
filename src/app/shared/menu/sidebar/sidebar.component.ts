import { Component, OnInit } from '@angular/core';
import { MenuItemsAdmin, MenuItemsCustomer, Menu } from './sidebar-items';
import { Router, ActivatedRoute } from "@angular/router";
import * as $ from 'jquery';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: Menu[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    public auth: AuthService) {
  }

  ngOnInit() {
    $.getScript('./assets/js/sidebar-menu.js');

    let role = this.auth.user.role;

    if (role === 0) {
      this.menuItems = MenuItemsAdmin.filter(menuItem => menuItem);
    }

    if (role === 1) {
      this.menuItems = MenuItemsCustomer.filter(menuItem => menuItem);
    }

  }

}
