import { Component, ChangeDetectorRef } from '@angular/core';
import { SharedService } from './Shared/Services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'theme-park-app';
  sidenavOpen = false;
  loading: boolean;

  constructor(private sharedService: SharedService, private cdr: ChangeDetectorRef) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.sharedService.getLoading().subscribe((loading) => {
      this.loading = loading;
      this.cdr.detectChanges();
    });
  }

  toggleSidenav(): void {
    this.sidenavOpen = !this.sidenavOpen;
  }

  onSidenavClosed(): void {
    this.sidenavOpen = false;
  }
}
