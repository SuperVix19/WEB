import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';  

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})

export class InicioSesionComponent implements OnInit{

  user = {
    email: '',
    password: '',
  }

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    
  }

  logIn(){
    var miFormulario = this.formBuilder.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.min(10)]]
    })

    if (miFormulario.value.email == "" || miFormulario.value.password == ""){
      Swal.fire(
        'Ingrese todos los campos',
        'Llene y/o seleccione todos los campos obligatorios',
        'warning'
        )
    } else {
      this.authService.logIn(this.user).subscribe(
        {
          error: (err: any) => {
            if (err?.error === "El correo no existe") {
              Swal.fire(
                'Correo no existente',
                'El correo no se encuentra registado',
                'warning'
              )
            }
            if (err?.error === "Contraseña incorrecta") {
              Swal.fire(
                'La contraseña es incorrecta',
                'Por favor, ingrese la contraseña correcta',
                'warning'
              )
            }
          },
          next: (res: any) => {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/inicio']);
          },
        }
      )
    }
  }

}
