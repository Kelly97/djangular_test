import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router, private route: ActivatedRoute) { }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  relativeNavigate(route: string) {
    this.router.navigate([route], { relativeTo: this.route });
  }
}
