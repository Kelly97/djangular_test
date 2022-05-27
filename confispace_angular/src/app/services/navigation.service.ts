import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router, private location: Location) { }

  goBack() {
    this.location.back();
  }

  relativeNavigate(commands: any[], route: ActivatedRoute) {
    this.router.navigate(commands, { relativeTo: route });
  }
}
