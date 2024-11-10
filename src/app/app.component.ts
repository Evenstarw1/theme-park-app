import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'theme-park-app';
  sidenavOpen = false;
  
  toggleSidenav(): void {
    this.sidenavOpen = !this.sidenavOpen; // Cambia el estado de apertura/cierre
  }

  onSidenavClosed(): void {
    this.sidenavOpen = false; // Establece el estado a 'cerrado' cuando el sidenav se cierra
  }
}
