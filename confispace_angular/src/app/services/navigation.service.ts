import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  goBack(route: ActivatedRoute) {
    this.router.navigate(['../'], { relativeTo: route });
  }

  relativeNavigate(commands: any[], route: ActivatedRoute) {
    this.router.navigate(commands, { relativeTo: route });
  }
}
