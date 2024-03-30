import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-inicio',
  standalone: false,
  // imports: [RouterModule, AppModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  title = 'web';

  productos = [
    {
      description: 'Descripción del producto.',
      price: '$19.99',
      priceTwo: '$39.99'
    }
  ]

}
