import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/Shared/Services/sidenav.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() sidenavToggle = new EventEmitter<void>();
  searchQuery: string = '';

  constructor(private router: Router, private sidenavService: SidenavService) { }

  dashboard(): void {
    this.router.navigateByUrl('home');
  }

  openSidenav(type: 'menu' | 'account'): void {
    this.sidenavService.toggleSidenav(type);
  }

  // Añadir la lógica de búsqueda cuando esté implementado la parte de parques
  // performSearch(): void {
  //   console.log('Performing search for:', this.searchQuery);
  //  
  // }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    console.log('Search query:', this.searchQuery);
  }

}
