import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { error } from 'console';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})

export class InicioSesionComponent implements OnInit {

  user = {
    email: '',
    password: '',
  }

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private cookieService: CookieService) { }

  ngOnInit(): void {

  }

  logIn() {
    var miFormulario = this.formBuilder.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.min(10)]]
    })

    if (miFormulario.value.email == "" || miFormulario.value.password == "") {
      Swal.fire(
        'Ingrese todos los campos',
        'Llene y/o seleccione todos los campos obligatorios',
        'warning'
      )
    } else {
      this.authService.logIn(this.user).subscribe(
        {
          error: (err: any) => {
            if (err?.error === "El usuario no esta registrado") {
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
            this.cookieService.set('token', res.token);
            this.cookieService.set('userRole', res.userRole);
            this.router.navigate(['/']);
          },
        }
      )
    }
  }

  //pendiente configurar
  resetPasswordModal() {
    Swal.fire({
      title: 'Ingrese su correo',
      input: 'email',
      inputLabel: 'Correo',
      inputPlaceholder: 'Ingrese su correo',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return this.authService.requestPasswordReset(email)
          .subscribe({
            error: (error) => {
              Swal.showValidationMessage(
                `Solicitud fallida: ${error}`
              )
            },
            next: (response) => {
              console.log('%c⧭', 'color: #1d5673', response);
            },
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

}
