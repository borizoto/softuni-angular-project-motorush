import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ListingService } from '../../../core/services/listings.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-create',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './create.html',
	styleUrl: './create.css'
})
export class Create implements OnInit {
	form!: FormGroup;

	brandOptions = [
		'Honda',
		'Yamaha',
		'Suzuki',
		'Kawasaki',
		'BMW',
	];

	modelOptions: Record<string, string[]> = {
		Honda: ['Cbr', 'Hornet', 'Rebel'],
		Yamaha: ['XSR', 'R1', 'FZ6', 'MT-07'],
		Suzuki: ['GSXR', 'GSXF'],
		Kawasaki: ['Ninja', 'Vulcan'],
		BMW: ['R12', 'S1000RR'],
	};

	constructor(private fb: FormBuilder, private listingsService: ListingService, private router: Router) { }

	ngOnInit(): void {
		this.form = this.fb.group({
			make: ['', Validators.required],
			model: ['', Validators.required],
			year: ['', [Validators.required, Validators.min(1900), Validators.max(2025)]],
			color: ['', Validators.required],
			fuel: ['', Validators.required],
			mileage: ['', Validators.required],
			cubicCapacity: ['', Validators.required],
			hp: ['', Validators.required],
			transmission: ['', Validators.required],
			condition: ['', Validators.required],
			location: ['', Validators.required],
			price: ['', [Validators.required, Validators.min(1)]],
			currency: ['', Validators.required],
			information: [''],
			imageUrl1: ['', Validators.required],
			imageUrl2: ['', Validators.required],
			imageUrl3: ['', Validators.required],
		});

		this.form.get('make')?.valueChanges.subscribe(() => {
			this.form.get('model')?.reset('');
		});
	}

	onSubmit(): void {
		if (this.form.valid) {
			this.listingsService.create(this.form.value).subscribe({
				next: (bike) => {
					console.log('Created listing:', bike);
					this.router.navigate(['/listings']);
				},
				error: (err) => {
					console.error('Failed to create listing:', err);
				}
			});
		}
	}
}
