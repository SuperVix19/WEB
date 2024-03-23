import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Employee } from '../models/employee/employee';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  // employeeArray: Employee[] = [
  //   {id: 1, name: 'Victoria', email: 'victoria@gmail.com', tel: '6140000000'},
  // ]

}
