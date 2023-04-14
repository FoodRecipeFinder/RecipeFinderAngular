import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner-black',
  templateUrl: './spinner-black.component.html',
  styleUrls: ['./spinner-black.component.css']
})
export class SpinnerBlackComponent implements OnInit { 
  foods = ["🍕","🥤","🍺","🧃","🍰","☕","🥩","🍗","🍖","🍩","🥫"]
  food1!: string;
  food2!: string;
  ngOnInit(): void {
    this.food1 = this.foods[Math.floor(Math.random() * this.foods.length)]
    this.food2 = this.foods[Math.floor(Math.random() * this.foods.length)]
  }
}
