import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ruleta',
  imports: [CommonModule, FormsModule],
  templateUrl: './ruleta.component.html',
  styleUrls: ['./ruleta.component.css'],
})
export class RuletaComponent {
  jugadores = [
    { nombre: 'Jugador 1', vivo: true, icono: '🧑' },
    { nombre: 'Jugador 2', vivo: true, icono: '👨‍🦱' },
    { nombre: 'Jugador 3', vivo: true, icono: '👩' },
    { nombre: 'Jugador 4', vivo: true, icono: '🧔' },
    { nombre: 'Jugador 5', vivo: true, icono: '🧙' },
  ];

  enJuego = false;
  mostrandoAnimacion = false;
  mensajeFinal = '';
  sonido = new Audio('sonido-disparo.mp3');
  gifUrl = 'pistola.gif'; // Asegúrate de colocar el GIF en esta ruta

  mostrarFormulario = false;
  nombrePersonalizado: string = '';
  iconoSeleccionado: string | null = null;

  iconosDisponibles = [
    '🧑',
    '👩',
    '👨‍🦱',
    '🧔',
    '👩‍🎤',
    '👨‍🎓',
    '🧙',
    '🦸',
    '🤠',
    '🤖',
  ];
  agregarJugadorPersonalizado() {
    this.jugadores.push({
      nombre: this.nombrePersonalizado.trim() || 'Yo',
      vivo: true,
      icono: this.iconoSeleccionado!,
    });

    // Resetear estado
    this.mostrarFormulario = false;
    this.iconoSeleccionado = null;
    this.nombrePersonalizado = '';
  }

  comenzarRonda() {
    if (this.enJuego || this.jugadores.filter((j) => j.vivo).length <= 1)
      return;

    this.enJuego = true;
    this.mensajeFinal = '';
    this.mostrandoAnimacion = true;

    setTimeout(() => {
      this.mostrandoAnimacion = false;
      this.sonido.play();

      const eliminado = this.tirarRuleta();
      if (eliminado !== null) {
        this.jugadores[eliminado].vivo = false;
      }

      if (this.jugadores.filter((j) => j.vivo).length === 1) {
        const sobreviviente = this.jugadores.find((j) => j.vivo);
        this.mensajeFinal = `🎉 Felicidades ${sobreviviente?.nombre}, eres el sobreviviente jeje`;
        setTimeout(() => {
          this.jugadores.forEach((element) => (element.vivo = true));
          this.mensajeFinal = '';
        }, 2000);
      }

      this.enJuego = false;
    }, 2000);
  }

  tirarRuleta(): number | null {
    const vivos = this.jugadores
      .map((j, i) => ({ ...j, index: i }))
      .filter((j) => j.vivo);
    if (vivos.length <= 1) return null;

    const valores = vivos.map((j) => j.index);
    const pesos = vivos.map((j) =>
      j.nombre === 'Jugador 1' ? 0.1 : (1 - 0.1) / (vivos.length - 1)
    );

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
}
