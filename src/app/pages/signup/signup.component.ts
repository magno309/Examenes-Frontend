import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/models/usuario.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private userService: UserService, private snack: MatSnackBar) { }

  user: Usuario = {};

  formSubmit() {
    //console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open("El nombre de usuario es requerido", "Aceptar", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }
    this.userService.registrarUsuario(this.user).subscribe(
      (data) => {
        //console.log(data);
        /*this.snack.open("Usuario guardado con éxito!", "Aceptar", {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });*/
        Swal.fire("Atención!", "Usuario guardado correctamente!", 'success');
        this.limpiarForm();
      }, (error) => {
        //console.log(error);
        this.snack.open(error.error.message, "Aceptar", {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
        //alert('Ha ocurrido un error!');
      }
    )
  }

  limpiarForm() {
    this.user = {};
  }
}
