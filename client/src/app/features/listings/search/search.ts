import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-search',
	imports: [ReactiveFormsModule],
	templateUrl: './search.html',
	styleUrl: './search.css'
})
export class Search implements OnInit {
	form!: FormGroup;

	brandOptions = ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'BMW'];

	modelOptions: Record<string, string[]> = {
		Honda: ['Cbr', 'Hornet', 'Rebel'],
		Yamaha: ['XSR', 'R1', 'FZ6'],
		Suzuki: ['GSXR', 'GSXF'],
		Kawasaki: ['Ninja', 'Vulcan'],
		BMW: ['R12', 'S1000RR'],
	};

	constructor(private fb: FormBuilder) { }

	ngOnInit(): void {
		this.form = this.fb.group({
			make: [''],
			model: [''],
			year: [''],
			color: [''],
			fuel: [''],
			mileage: [''],
			cubicCapacity: [''],
			hp: [''],
			transmission: [''],
			condition: [''],
			location: [''],
			price: [''],
			currency: [''],
		});

		this.form.get('make')?.valueChanges.subscribe(() => {
			this.form.get('model')?.reset('');
		});
	}

	onSubmit(): void {
		console.log('Search filters:', this.form.value);
		// later call API to search bikes
	}
}