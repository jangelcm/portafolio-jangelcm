import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CvViewerComponent } from './components/cv-viewer/cv-viewer.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from 'emailjs-com';
import { environment } from './environment/enviroment';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CvViewerComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  contactForm: FormGroup;
  successMessageVisible = false;

  isDark = new FormControl(false);

  showProfile = true;
  showBackend = false;
  showFrontend = false;
  showBD = false;
  showControladorVersiones = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const resultados: number[] = [];
    for (let i = 0; i < 10; i++) {
      resultados.push(
        this.tirarRuletaConProbabilidadAdulterada({
          rangoMinimo: 5,
          rangoMaximo: 10,
          valorConMasProbabilidad: 7,
          porcentajeProbabilidadAdulterada: 90,
        })
      );
    }
    console.log('resultado:', resultados);
  }

  ir(nameTab: string) {
    switch (nameTab) {
      case 'frontend':
        this.showFrontend = true;
        this.showProfile = false;
        this.showBackend = false;
        this.showBD = false;
        this.showControladorVersiones = false;
        break;
      case 'profile':
        this.showFrontend = false;
        this.showProfile = true;
        this.showBackend = false;
        this.showBD = false;
        this.showControladorVersiones = false;
        break;

      default:
        break;
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      emailjs
        .send(
          environment.emailJs.serviceId,
          environment.emailJs.templateId,
          this.contactForm.value,
          environment.emailJs.publicKey
        )
        .then(() => {
          this.successMessageVisible = true;
          this.contactForm.reset();
          // Ocultar después de 5 segundos
          setTimeout(() => {
            this.successMessageVisible = false;
          }, 4000);
        })
        .catch((error) => {
          console.error('Error al enviar email:', error);
        });
    }
  }

  tirarRuletaConProbabilidadAdulterada({
    rangoMinimo,
    rangoMaximo,
    valorConMasProbabilidad,
    porcentajeProbabilidadAdulterada,
  }: {
    rangoMinimo: number;
    rangoMaximo: number;
    valorConMasProbabilidad?: number;
    porcentajeProbabilidadAdulterada?: number;
  }): number {
    const valores: number[] = [];
    const pesos: number[] = [];

    const cantidadValores = rangoMaximo - rangoMinimo + 1;

    const probabilidadFavorecida =
      valorConMasProbabilidad && porcentajeProbabilidadAdulterada
        ? porcentajeProbabilidadAdulterada / 100
        : 1 / cantidadValores;

    const cantidadRestante = valorConMasProbabilidad
      ? cantidadValores - 1
      : cantidadValores;

    const probabilidadRestante = valorConMasProbabilidad
      ? (1 - probabilidadFavorecida) / cantidadRestante
      : 1 / cantidadValores;

    for (let i = rangoMinimo; i <= rangoMaximo; i++) {
      valores.push(i);

      if (i === valorConMasProbabilidad) {
        pesos.push(probabilidadFavorecida);
      } else {
        pesos.push(probabilidadRestante);
      }
    }

    // Construir distribución acumulada
    const acumulados: number[] = [];
    let suma = 0;

    for (const peso of pesos) {
      suma += peso;
      acumulados.push(suma);
    }

    const r = Math.random();
    for (let i = 0; i < acumulados.length; i++) {
      if (r < acumulados[i]) {
        return valores[i];
      }
    }

    return valores[valores.length - 1];
  }

  // Simular 10 tiros
}
