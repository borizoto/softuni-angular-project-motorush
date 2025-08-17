import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Create } from './features/listings/create/create';
import { Header } from "./shared/header/header";
import { Footer } from "./shared/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Create, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');
}