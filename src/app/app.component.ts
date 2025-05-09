import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RidlixGameEmbedComponent } from './components/ridlix-game-embed.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RidlixGameEmbedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Ridlix Games embed example';
}
