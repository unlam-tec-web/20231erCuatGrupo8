import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
    public slides = 
      [
        { src: '../assets/img/carousel1.jpg', title: 'auto1' },
        { src: '../assets/img/carousel2.jpg', title: 'auto2'},
        { src: '../assets/img/carousel3.jpg', title: 'auto3'}
      ];

 
}


