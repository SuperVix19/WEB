import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


type product = {
  name: string,
  price: string,
  description: string,
  imageLink: string,
}

@Component({
  selector: 'app-inicio',
  standalone: false,
  // imports: [RouterModule, AppModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent implements OnInit {
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router){}

  ngOnInit(): void {
    this.getProducts();
  }

  title = 'web';

  products: Array<product> = [];

  product = {
    name: '',
    price: '',
    description: '',
    imageLink: '',
  }

  loggedIn(){
    this.authService.loggedIn();
  }

  signOut(){
    this.authService.signOut();
  }

  userIsAdmin(){
    return this.authService.userIsAdmin();
  }

  userIsCliente(){
    return this.authService.userIsCliente();
  }

  getProducts(){
    this.authService.getProducts().subscribe(
      {
        error: (err: any) => {
          Swal.fire(
            'Error',
            'Error al obtener los productos',
            'warning'
          )
        },
        next: (res: any) => {
          this.products = res;
        },
      }
    )
  }

  addProduct(){
    let productForm = this.formBuilder.group({
      name: [this.product.name, [Validators.required]],
      price: [this.product.price, [Validators.required]],
      description: [this.product.description, [Validators.required]],
      imageLink: [this.product.imageLink, [Validators.required]]
    })

    if (productForm.value.name == "" || productForm.value.price == "" || productForm.value.description == "" || productForm.value.imageLink == "") {
      Swal.fire(
        'Ingrese todos los campos',
        'Llene y/o seleccione todos los campos obligatorios',
        'warning'
      )
    } else {
      this.authService.addProduct(this.product).subscribe(
        {
          error: (err: any) => {
            Swal.fire(
              'Error',
              'Error al agregar el producto',
              'warning'
            )
          },
          next: (res: any) => {
            this.products.push(this.product);
          },
        }
      )
    }

    this.authService.addProduct(this.product);
  }

  redirectProductPage(product: product){
    this.router.navigate(['/producto'], { state: { product } });
  }

  clearAddProductForm(){
    this.product.name = '';
    this.product.price = '';
    this.product.description = '';
    this.product.imageLink = '';
  }
}
