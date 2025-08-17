import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-home',
	imports: [RouterLink],
	templateUrl: './home.html',
	styleUrl: './home.css'
})
export class Home {
	listings = [
		{ img: 'assets/moto1.jpg', title: 'Honda CBR500R', category: 'Sport Bike', price: 7500, _id: 1 },
		{ img: 'assets/moto2.jpg', title: 'Yamaha MT-07', category: 'Naked Bike', price: 8200, _id: 2 },
		{ img: 'assets/moto3.jpg', title: 'BMW R1250GS', category: 'Adventure', price: 15000, _id: 3 }
	];
}