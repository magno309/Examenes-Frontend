import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private userService: UserService) { }

  user: Usuario = {};
  errorMsg: string = '';

  formSubmit() {
    //console.log(this.user);
    if (this.user.username === '' || this.user.username === null) {
      alert('El nombre de usuario es requerido!');
      return;
    }
    this.userService.registrarUsuario(this.user).subscribe(
      (data) => {
        //console.log(data);
        alert('Usuario guardado con éxito!');
        this.limpiarForm();
      }, (error) => {
        //console.log(error);
        this.errorMsg = error.error.message;
        alert('Ha ocurrido un error!');
      }
    )
  }

  limpiarForm() {
    this.user = {};
    this.errorMsg = '';
  }
}
