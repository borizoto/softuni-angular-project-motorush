import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-search',
	imports: [ReactiveFormsModule],
	templateUrl: './search.html',
	styleUrl: './search.css',
	standalone: true
})
export class Search implements OnInit {
	form!: FormGroup;

	brandOptions = ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'BMW'];

	modelOptions: Record<string, string[]> = {
		Honda: ['Cbr', 'Hornet', 'Rebel'],
		Yamaha: ['XSR', 'R1', 'FZ6', 'MT-07'],
		Suzuki: ['GSXR', 'GSXF'],
		Kawasaki: ['Ninja', 'Vulcan'],
		BMW: ['R12', 'S1000RR'],
	};

	constructor(private fb: FormBuilder, private router: Router) { }

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
		const searchData = this.form.value;
		this.router.navigate(['/search/results'], { state: searchData });
	}
}
