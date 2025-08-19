import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ListingService } from '../../../core/services/listings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Motorbike } from '../../../models';

@Component({
	selector: 'app-edit',
	imports: [ReactiveFormsModule],
	templateUrl: './edit.html',
	styleUrl: './edit.css'
})
export class Edit implements OnInit {
	form!: FormGroup;
	listingId!: string;
	isOwner = false;
	listing!: Motorbike;

	brandOptions = [
		'Honda',
		'Yamaha',
		'Suzuki',
		'Kawasaki',
		'BMW',
	];

	modelOptions: Record<string, string[]> = {
		Honda: ['Cbr', 'Hornet', 'Rebel'],
		Yamaha: ['XSR', 'R1', 'FZ6'],
		Suzuki: ['GSXR', 'GSXF'],
		Kawasaki: ['Ninja', 'Vulcan'],
		BMW: ['R12', 'S1000RR'],
	};

	constructor(private fb: FormBuilder, private authService: AuthService, private listingsService: ListingService, private route: ActivatedRoute, private router: Router) {
		this.listingId = this.route.snapshot.paramMap.get('listingId')!;
	}

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

		this.listingsService.getOne(this.listingId).subscribe(listing => {
			this.listing = listing;
			const currentUser = this.authService.currentUser();

			if (currentUser?._id !== listing._ownerId) {
				this.router.navigate(['/listings']);
				return;
			}

			this.form.patchValue(listing);
		});
	}

	onSubmit(): void {
		if (this.form.valid) {
			console.log('Created offer:', this.form.value);
		}
	}
}
