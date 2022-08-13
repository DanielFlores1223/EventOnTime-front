import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stars-generate',
  templateUrl: './stars-generate.component.html',
  styleUrls: ['./stars-generate.component.scss']
})
export class StarsGenerateComponent implements OnInit {

  @Input() amount = 0;

  filledStars: Array<any> = [];
  emptyStars: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
    this.generateArray();
  }

  generateArray() {

    this.filledStars = [];
    this.emptyStars = [];

    const totalStars = 5;
    const starsWithoutFill = totalStars - this.amount;

    for (let i = 1; i <= this.amount; i++) {
      this.filledStars = [ ...this.filledStars, i ];
    }

    for (let i = 0; i < starsWithoutFill; i++) {
      this.emptyStars = [ ...this.emptyStars, i ];
    }
    
  }

}
