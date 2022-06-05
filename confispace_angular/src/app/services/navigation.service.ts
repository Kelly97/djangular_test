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

  goBackRelative(steps: number = 1, route: ActivatedRoute) {
    let backRoute: string = '../';
    for (let index = 1; index < steps; index++) {
      backRoute = backRoute + '../';
    }
    this.router.navigate([backRoute], { relativeTo: route });
  }

  relativeNavigate(commands: any[], route: ActivatedRoute) {
    this.router.navigate(commands, { relativeTo: route });
  }
}
