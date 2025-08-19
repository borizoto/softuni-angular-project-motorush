import { Routes } from '@angular/router';
import { noAuthGuard } from './core/guards/noAuth.guard';
import { authGuard } from './core/guards/auth.guard';
import { NotFound } from './shared/not-found/not-found';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('../app/features/home/home').then(comp => comp.Home) },
    { path: 'login', loadComponent: () => import('../app/features/auth/login/login').then(comp => comp.Login), canActivate: [noAuthGuard] },
    { path: 'register', loadComponent: () => import('../app/features/auth/register/register').then(comp => comp.Register), canActivate: [noAuthGuard] },
    { path: 'listings', loadComponent: () => import('../app/features/listings/catalog/catalog').then(comp => comp.Catalog) },
    { path: 'listings/:listingId/details', loadComponent: () => import('../app/features/listings/listing-details/listing-details').then(comp => comp.ListingDetails) },
    { path: 'listings/:listingId/edit', loadComponent: () => import('../app/features/listings/edit/edit').then(comp => comp.Edit), canActivate: [authGuard] },
    { path: 'listings/create', loadComponent: () => import('../app/features/listings/create/create').then(comp => comp.Create), canActivate: [authGuard] },
    { path: 'search', loadComponent: () => import('../app/features/listings/search/search').then(comp => comp.Search) },
    { path: '**', component: NotFound }
];
