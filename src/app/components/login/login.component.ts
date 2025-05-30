import { Component, OnInit, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';

declare var grecaptcha: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = { 
    correo: '', 
    pass: '' 
  };
  
  errorMessage: string = '';
  successMessage: string = '';
  usuario: any;
  loading: boolean = false;
  recaptchaResponse: string | null = null;
  isBrowser: boolean;
  showPassword: boolean = false; // Nueva propiedad para controlar la visibilidad

  constructor(
    private userService: UsuariosService,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.loadRecaptchaScript();
      this.setupRecaptchaCallbacks();
    }
  }

  loadRecaptchaScript() {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoaded&render=explicit';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  setupRecaptchaCallbacks() {
    (window as any).onRecaptchaLoaded = () => {
      if (typeof grecaptcha !== 'undefined') {
        grecaptcha.render('recaptcha-container', {
          sitekey: '6LdHuFArAAAAAKuIsX3XRAE9AW7a_Yq3tuwMy8RT',
          callback: (response: string) => {
            this.ngZone.run(() => {
              this.recaptchaResponse = response;
            });
          },
          'expired-callback': () => {
            this.ngZone.run(() => {
              this.recaptchaResponse = null;
            });
          }
        });
      }
    };
  }

  login() {
    if (!this.recaptchaResponse) {
      this.errorMessage = 'Por favor, completa el reCAPTCHA';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Agregar el token de reCAPTCHA a las credenciales
    const credentialsWithRecaptcha = {
      ...this.credentials,
      recaptchaToken: this.recaptchaResponse
    };

    this.userService.loginUsuario(credentialsWithRecaptcha).subscribe(
      (response: any) => {
        this.successMessage = response.mensaje;
        this.usuario = response.usuario;
        this.loading = false;
        localStorage.setItem('userId', this.usuario.id);
        window.location.assign('/');
      },
      (siFalla) => {
        this.loading = false;
        if (siFalla.status === 401) {
          this.errorMessage = siFalla.error.mensajeError;
        } else {
          this.errorMessage = 'Error en el inicio de sesión';
        }
        // Resetear el reCAPTCHA en caso de error
        grecaptcha.reset();
        this.recaptchaResponse = null;
      }
    );
  }
}