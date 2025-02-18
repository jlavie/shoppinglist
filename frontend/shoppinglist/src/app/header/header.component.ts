import { Component, ElementRef, inject, input, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../pages/login/login.service';
import { ButtonComponent } from '../components/button/button.component';
import { SignComponent } from "../components/sign/sign.component";

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ButtonComponent, SignComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  loginService = inject(LoginService);
  myClass: string = 'modal-box';

  @ViewChild('signModal') signModal!: ElementRef<HTMLDialogElement>;

  onCloseModal() {
    console.log("Fermeture de la modal détectée !");
    if (this.signModal?.nativeElement) {
      console.log("Modal trouvée, fermeture...");
      this.signModal.nativeElement.close();
    } else {
      console.log("Erreur: this.signModal est undefined");
    }
  }
}
