/// <reference path = "EscenaActividad.ts" />

abstract class NanoCondicional extends EscenaActividad {

  iniciar(): void {
    this.fondo = new Fondo('fondos.elPlanetaDeNano.png', 0, 0);
    this.cuadricula = new CuadriculaEsparsa(0, 0, { alto: 300, ancho: 300, separacionEntreCasillas: 3 }, { grilla: 'casillas.nanoCaminoAlternativo.png' }, this.matriz())
    this.colorearCaminoPrincipal() //Por default se colorea todo con el color alternativo y se colorea el principal porque es el mas corto.
    this.agregarBanana()
    this.completarConObstaculos()

    this.automata = new NanoAnimado(0, 0);

    this.cuadricula.agregarActor(this.automata, 0, 0);
    this.automata.escala *= 1.8;
    this.automata.y += 15;
  }


  estaResueltoElProblema(): boolean {
    return this.contarActoresConEtiqueta('BananaAnimada') == 0
  }

  private completarConObstaculos(): void {
    this.posicionesDeObstaculos().forEach(posicion => this.agregarObstaculoEn(posicion))
  }

  private agregarBanana(): void {
    const posicion = this.posicionDeBanana()
    this.cuadricula.agregarActor(new BananaAnimada(0, 0), posicion.y, posicion.x)
  }


  private agregarObstaculoEn(posicion: punto): void {
    this.cuadricula.agregarActor(new Obstaculo("obstaculo.duba1.png"), posicion.y, posicion.x, true); //Imagen de una roca
  }

  abstract posicionesDeObstaculos(): punto[]
  abstract posicionDeBanana(): punto
  abstract colorearCaminoPrincipal(): void
  abstract matriz(): any
}

class LasRocasDeNano extends NanoCondicional {

  matriz() {
    return [
      ['T', 'F', 'F', 'F', 'F'],
      ['T', 'T', 'T', 'T', 'T'],
      ['T', 'F', 'F', 'F', 'T'],
      ['T', 'T', 'T', 'T', 'T'],
    ]
  }

  colorearCaminoPrincipal() { // El "camino principal" son las primeras casillas de cada fila.
    [0, 1, 2, 3].forEach((fila) => this.cuadricula.casilla(fila, 0).cambiarImagen('casillas.nanoCaminoPrincipal.png'))
  }

  posicionDeBanana() {
    return { x: 0, y: 3 }
  }

  posicionesDeObstaculos() { // 2 Posiciones posibles del obstaculo
    const posicionAleatoria = (Math.random() < 0.5) ? { x: 1, y: 1, } : { x: 0, y: 2 }
    return [posicionAleatoria]
  }

}


class LosCaminosDeNano extends NanoCondicional {

  matriz() {
    return [
      ['T', 'F', 'F', 'F', 'F', 'F'],
      ['T', 'T', 'T', 'T', 'T', 'F'],
      ['T', 'F', 'F', 'F', 'T', 'F'],
      ['T', 'T', 'T', 'T', 'T', 'F'],
      ['T', 'F', 'F', 'F', 'F', 'F'],
      ['T', 'T', 'T', 'T', 'T', 'T'],
      ['F', 'T', 'F', 'F', 'F', 'T'],
      ['F', 'T', 'T', 'T', 'T', 'T']
    ]
  }

  posicionDeBanana() {
    return { y: 7, x: 1 }
  }

  colorearCaminoPrincipal() {
    [0, 1, 2, 3, 4, 5].forEach((fila) => this.cuadricula.casilla(fila, 0).cambiarImagen('casillas.nanoCaminoPrincipal.png'));
    [5, 6, 7].forEach((fila) => this.cuadricula.casilla(fila, 1).cambiarImagen('casillas.nanoCaminoPrincipal.png'))
  }


  posicionesDeObstaculos() {
    const posicionAleatoriaAlrededorDe = (fila, columna) => (Math.random() < 0.5) ? { x: columna, y: fila + 1 } : { x: columna + 1, y: fila }

    const posicionPrimerObstaculo = posicionAleatoriaAlrededorDe(1, 0)
    const posicionSegundoObstaculo = posicionAleatoriaAlrededorDe(5, 1)

    return [posicionPrimerObstaculo, posicionSegundoObstaculo]

  }

}