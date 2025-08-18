import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('../app/features/home/home').then(comp => comp.Home) },
    { path: 'login', loadComponent: () => import('../app/features/auth/login/login').then(comp => comp.Login) },
    { path: 'register', loadComponent: () => import('../app/features/auth/register/register').then(comp => comp.Register) },
    { path: 'listings', loadComponent: () => import('../app/features/listings/catalog/catalog').then(comp => comp.Catalog) },
    { path: 'listings/:listingId/details', loadComponent: () => import('../app/features/listings/listing-details/listing-details').then(comp => comp.ListingDetails) },
    { path: 'listings/:listingId/edit', loadComponent: () => import('../app/features/listings/edit/edit').then(comp => comp.Edit) },
    { path: 'listings/create', loadComponent: () => import('../app/features/listings/create/create').then(comp => comp.Create) },
    { path: 'search', loadComponent: () => import('../app/features/listings/search/search').then(comp => comp.Search) }
];
