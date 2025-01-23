import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./Shared/Menu/menu/menu.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet,
    ReactiveFormsModule, MenuComponent]
})
export class AppComponent {
  title = 'EventsApps';
}
