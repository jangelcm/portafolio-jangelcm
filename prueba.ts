function numerosAleatorios(nroTiros: number): void {
  const posibilidades: number[] = [5, 6, 7, 8, 9, 10];

  let nroVeces7 = 0;
  //   for (let index = 0; index < 1000; index++) {
  //     let aleatorio = Math.floor(Math.random() * (nroTiros - 5 + 1) + 5);

  //     if (aleatorio === 7) {
  //       nroVeces7++;
  //     }
  //   }
  //   console.log(
  //     'Ha salido ',
  //     nroVeces7,
  //     'veces el número 7, en 1000 tiros de la ruleta'
  //   );
  let aleatorio = Math.floor(Math.random() * (10 - 5 + 1) + 5);
  Math.sin;
  console.log(aleatorio);
}

//numerosAleatorios(10);

function tirarRuletaConProbabilidadAdulterada({
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
const resultados: number[] = [];
for (let i = 0; i < 10; i++) {
  resultados.push(
    tirarRuletaConProbabilidadAdulterada({
      rangoMinimo: 5,
      rangoMaximo: 10,
      valorConMasProbabilidad: 7,
      porcentajeProbabilidadAdulterada: 90,
    })
  );
}
console.log(resultados);
