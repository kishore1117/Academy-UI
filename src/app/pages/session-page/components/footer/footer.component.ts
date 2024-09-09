import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  name: string = 'LCA';
  startYear: number = 2023; // Change to the actual start year

  currentYear: number = new Date().getFullYear();
}
