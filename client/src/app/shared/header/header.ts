import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
	selector: 'app-header',
	imports: [RouterLink],
	templateUrl: './header.html',
	styleUrl: './header.css'
})
export class Header {
	private authService = inject(AuthService);
	private router = inject(Router);

	readonly isLoggedIn = this.authService.isLoggedIn;

	onLogout() {
		this.authService.logout();
		this.router.navigate(['/home']);
	}
}