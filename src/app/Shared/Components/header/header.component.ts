import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private router: Router) { }

  // Métodos para manejar la navegación
  dashboard(): void {
    //this.router.navigateByUrl('dashboard');
  }

  openSidenav(): void {
    this.sidenavToggle.emit();
  }
}
