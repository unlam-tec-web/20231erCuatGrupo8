import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
    public slides = 
      [
        { src: '../assets/img/logo.png', title: 'Ford focus' },
        { src: '../assets/img/signup.jpg', title: 'Amarok'},
        { src: 'https://placehold.co/250x150', title: 'Fiat Palio 1.4'}
      ];

 
}


