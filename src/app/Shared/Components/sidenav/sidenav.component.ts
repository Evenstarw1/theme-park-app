import { Component, Input, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnChanges {

  @Input() sidenavOpen: boolean = false; // Recibe el estado del sidenav desde el componente padre
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sidenavOpen']) {
      if (this.sidenav) {
        // Si sidenavOpen cambia, abre o cierra el sidenav según el valor
        if (this.sidenavOpen) {
          this.sidenav.open();
        } else {
          this.sidenav.close();
        }
      }
    }
  }

  login(): void {
    //this.router.navigateByUrl('login');
  }

  register(): void {
    this.router.navigateByUrl('register');
  }
}
