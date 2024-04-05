import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Categoria1Component } from './categoria1/categoria1.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ControlComponent } from './control/control.component';
import { AudifonosComponent } from './audifonos/audifonos.component';
import { CorsairComponent } from './corsair/corsair.component';
import { IphoneComponent } from './iphone/iphone.component';
import { LaptopComponent } from './laptop/laptop.component';
import { ParedComponent } from './pared/pared.component';
import { SillaComponent } from './silla/silla.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { ProductoComponent } from './producto/producto.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  // { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'categoria1', component: Categoria1Component },
  { path: 'carrito', component: CarritoComponent },  
  { path: 'control', component: ControlComponent},    
  { path: 'audifonos', component: AudifonosComponent},
  { path: 'corsair', component: CorsairComponent},
  { path: 'iphone', component: IphoneComponent},
  { path: 'laptop', component: LaptopComponent},
  { path: 'pared', component: ParedComponent},
  { path: 'silla', component: SillaComponent},
  { path: '',  component: InicioComponent, canActivate: [AuthGuard]},
  { path: 'registro',  component: RegistroComponent},
  { path: 'inicio-sesion',  component: InicioSesionComponent},
  { path: 'producto', component: ProductoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
