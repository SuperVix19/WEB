import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

declare var $: any;
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

  emailToRestorePassword = '';
  sentCode = false;
  newPassword = '';
  resetErrorMessage = '';
  resetCode = undefined;
  newPasswordError = '';

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

  isStrongPassword = (password: string) => {

    // Check for at least 10 characters
    if (password.length < 10) {
      return false;
    }
  
    // Check for at least one digit (number)
    if (!/\d/.test(password)) {
      return false;
    }
  
    // Check for at least one special character
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
      return false;
    }
  
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }
  
    // If all checks pass, the password is strong
    return true;
  }
  requestPasswordReset() {
    this.authService.requestPasswordReset(this.emailToRestorePassword).subscribe(
      {
        error: (err: any) => {
          this.resetErrorMessage = err.error;
        },
        next: (res: any) => {
          this.sentCode = true;
        },
      }
    )
  }

  resetPassword() {
    this.resetErrorMessage = '';
    this.newPasswordError = '';
    if (!this.isStrongPassword(this.newPassword)) {
      this.newPasswordError = 'La contraseña debe tener al menos 10 caracteres, un número, un carácter especial y una letra mayúscula';
      return;
    }
    this.authService.resetPassword(this.emailToRestorePassword, this.newPassword, this.resetCode).subscribe(
      {
        error: (err: any) => {
          this.resetErrorMessage = err.error;
        },
        next: (res: any) => {
          $('#resetPasswordModal').modal('hide');
          Swal.fire(
            'Contraseña actualizada',
            'La contraseña se ha actualizado correctamente',
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
              this.resetErrorMessage = '';
              this.newPasswordError = '';
              this.emailToRestorePassword = '';
              this.newPassword = '';
              this.resetCode = undefined;
              this.sentCode = false;
            }
          })
        },
      }
    )
  }

}
