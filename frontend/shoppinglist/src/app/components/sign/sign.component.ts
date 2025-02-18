import { Component, input, signal } from '@angular/core';
import { LoginComponent } from "../../pages/login/login.component";
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-sign',
  imports: [LoginComponent, ButtonComponent],
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.css'
})
export class SignComponent {
  class= input();
  loginTitle = "S’identifier";
  loginContent = "Merci de vous connecter avec vos informations personnelles";
  registerTitle = "S’enregistrer";
  registerContent = "Pour accéder au contenu, merci de vous enregistrer";

  rightPanelActive = signal(false); // Signal pour gérer l'état de la classe

  togglePanel() {
    this.rightPanelActive.set(!this.rightPanelActive());
  }
}
