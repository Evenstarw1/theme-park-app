import { Component, Input, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/Shared/Services/sidenav.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() sidenavOpen: boolean = false;
  sidenavType: 'menu' | 'account' | null = null;
  private sidenavTypeSubscription!: Subscription;
  private sidenavOpenSubscription!: Subscription;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private router: Router, private sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.sidenavTypeSubscription = this.sidenavService.sidenavType$.subscribe((type: 'menu' | 'account' | null) => {
      this.sidenavType = type;
    });
  }

  ngAfterViewInit(): void {
    // Mueve la suscripción que maneja open/close a `ngAfterViewInit` para asegurar que sidenav esté disponible
    this.sidenavOpenSubscription = this.sidenavService.sidenavOpen$.subscribe(isOpen => {
      if (this.sidenav) {  // Asegúrate de que sidenav está definido
        if (isOpen) {
          this.sidenav.open();
        } else {
          this.sidenav.close();
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sidenavTypeSubscription) {
      this.sidenavTypeSubscription.unsubscribe();
    }
    if (this.sidenavOpenSubscription) {
      this.sidenavOpenSubscription.unsubscribe();
    }
  }

  login(): void {
    this.router.navigateByUrl('login');
    this.sidenavService.closeSidenav(); 
  }

  register(): void {
    this.router.navigateByUrl('register');
    this.sidenavService.closeSidenav();
  }

  home(): void {
    this.router.navigateByUrl('home');
    this.sidenavService.closeSidenav();
  }

  parksList(): void {
    this.router.navigateByUrl('');
    this.sidenavService.closeSidenav();
  }

  contact(): void {
    this.router.navigateByUrl('');
    this.sidenavService.closeSidenav();
  }
}
