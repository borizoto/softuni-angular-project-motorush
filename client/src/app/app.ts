import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Create } from './features/listings/create/create';
import { Header } from "./shared/header/header";
import { Footer } from "./shared/footer/footer";
import { Home } from "./features/home/home";
import { Catalog } from "./features/listings/catalog/catalog";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Create, Header, Footer, Home, Catalog],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');
}