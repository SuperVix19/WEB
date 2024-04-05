import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';

declare var $ : any;

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit{
  oldProduct = history.state.product;

  // obtener producto desde el navigate
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  product = {
    _id: this.oldProduct._id,
    name: this.oldProduct.name,
    price: this.oldProduct.price,
    description: this.oldProduct.description,
    imageLink: this.oldProduct.imageLink
  }

  ngOnInit(): void {
  }

  
  userIsAdmin(){
    return this.authService.userIsAdmin();
  }

  userIsCliente(){
    return this.authService.userIsCliente();
  }
  
  closeUpdateProductModal(){
    //hide bootstrap modal
    var myModal = document.getElementById('updateProductModal');

    if (myModal) myModal.ariaModal = 'false';

  }

  editProduct(){
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
      this.authService.updateProduct(this.product._id, this.product).subscribe(
        {
          error: (err: any) => {
            if (err.error === "No existe el producto") {
              Swal.fire(
                'Producto ya existente',
                'El producto ya se encuentra registrado',
                'warning'
              )
            } else {
              Swal.fire(
                'Error',
                'Error al actualizar el producto',
                'warning'
              )
            }
          },
          next: (res: any) => {
            this.oldProduct = res;
            
            Swal.fire(
              'Producto actualizado',
              'El producto se ha actualizado correctamente',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                $('#editProductModal').modal('hide');

                this.router.navigate(['/']);
              }
            })
          },
        }
      )
    }
  }

  deleteProduct(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteProduct(this.product._id).subscribe(
          {
            error: (err: any) => {
              console.log('%c⧭', 'color: #731d6d', err);
              if (err.error === "No existe el producto") {
                Swal.fire(
                  'Producto no encontrado',
                  'El producto no se encuentra registrado',
                  'warning'
                )
              } else {
                Swal.fire(
                  'Error',
                  'Error al eliminar el producto',
                  'warning'
                )
              }
            },
            next: (res: any) => {
              Swal.fire(
                'Producto eliminado',
                'El producto se ha eliminado correctamente',
                'success'
              ).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/']);
                }
              })
            },
          }
        )
      }
    })
  }

}
