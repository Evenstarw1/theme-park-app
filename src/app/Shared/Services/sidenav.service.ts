import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sidenavTypeSource = new BehaviorSubject<'menu' | 'account' | null>(null);
  sidenavType$ = this.sidenavTypeSource.asObservable();

  private sidenavOpenSource = new BehaviorSubject<boolean>(false);
  sidenavOpen$ = this.sidenavOpenSource.asObservable();

  toggleSidenav(type: 'menu' | 'account') {
    const isCurrentlyOpen = this.sidenavOpenSource.getValue();
    const currentType = this.sidenavTypeSource.getValue();

    if (isCurrentlyOpen && currentType === type) {
      this.closeSidenav();
    } else {
      this.setSidenavType(type);
      this.openSidenav();
    }
  }

  setSidenavType(type: 'menu' | 'account' | null) {
    this.sidenavTypeSource.next(type);
  }

  openSidenav() {
    this.sidenavOpenSource.next(true);
  }

  closeSidenav() {
    this.sidenavOpenSource.next(false);
  }
}
