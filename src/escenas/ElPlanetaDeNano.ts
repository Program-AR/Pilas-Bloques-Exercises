/// <reference path = "EscenaActividad.ts" />

class ElPlanetaDeNano extends EscenaActividad {
  automata;
  cantidadFilas;
  cantidadColumnas;
  cuadricula;
  fondo;
  secuenciaCaminata;
  cantidadInicial: any;
  tablero;

  iniciar() {
    //this.recolector.izquierda = pilas.izquierda();
    this.cantidadFilas = 4
    this.cantidadColumnas = 5
    this.fondo = new Fondo('fondos.elPlanetaDeNano.png', 0, 0);

    this.cuadricula = new Cuadricula(0, 0, this.cantidadFilas, this.cantidadColumnas,
      { alto: 300, ancho: 300, separacionEntreCasillas: 3 },
      { grilla: 'casillas.elPlanetaDeNano.png' })

    this.automata = new NanoAnimado(0, 0);

    this.cuadricula.agregarActor(this.automata, this.cantidadFilas - 1, 0);
    this.automata.escala *= 1.8;
    this.automata.y += 15;

    this.secuenciaCaminata = new Secuencia({ 'secuencia': [new MoverACasillaIzquierda({})] })
    this.secuenciaCaminata.iniciar(this.automata);

    this.completarConBananas();
    this.cantidadInicial = this.contarActoresConEtiqueta('BananaAnimada');

    this.tablero = new Tablero(150, 220, { texto: "Bananas" });
  }

  actualizar() {
    super.actualizar();
    this.tablero.setearValor(this.cantidadRecolectadas());
  }

  private cantidadRecolectadas() {
    var cantidadActual: any = this.contarActoresConEtiqueta('BananaAnimada');
    return this.cantidadInicial - cantidadActual;
  }

  private completarConBananas() {
    var cantidad = [2, 4, 1, 3];
    for (var i = 0; i < this.cantidadFilas; i++) {
      for (var j = 1; j <= cantidad[i]; j++) {
        this.cuadricula.agregarActor(new BananaAnimada(0, 0), i, j);
      }
    }
  }

  estaResueltoElProblema() {
    return this.contarActoresConEtiqueta('BananaAnimada') == 0;
  }

}

class LasRocasDeNano extends EscenaActividad {

  iniciar(): void {
    this.fondo = new Fondo('fondos.elPlanetaDeNano.png', 0, 0);
    const matriz = [
      ['T', 'F', 'F', 'F', 'F'],
      ['T', 'T', 'T', 'T', 'T'],
      ['T', 'F', 'F', 'F', 'T'],
      ['T', 'T', 'T', 'T', 'T'],
    ]
    this.cuadricula = new CuadriculaEsparsa(0, 0, { alto: 300, ancho: 300, separacionEntreCasillas: 3 }, { grilla: 'casillas.nanoCaminoAlternativo.png' }, matriz)
    this.colorearCaminoPrincipal()
    this.agregarBanana()
    this.agregarObstaculoAleatorio()

    this.automata = new NanoAnimado(0, 0);

    this.cuadricula.agregarActor(this.automata, 0, 0);
    this.automata.escala *= 1.8;
    this.automata.y += 15;

  }


  estaResueltoElProblema() {
    return this.contarActoresConEtiqueta('BananaAnimada') == 0
  }

  private colorearCaminoPrincipal() { // El "camino principal" son las primeras casillas de cada fila.
    [0, 1, 2, 3].forEach((fila) => this.cuadricula.casilla(fila, 0).cambiarImagen('casillas.nanoCaminoPrincipal.png'))
  }

  private agregarBanana() {
    this.cuadricula.agregarActor(new BananaAnimada(0, 0), 3, 0)
  }

  private agregarObstaculoAleatorio() { // 2 Posiciones posibles del obstaculo
    const posicionAleatoria = (Math.random() < 0.5) ? { nroF: 1, nroC: 1, } : { nroF: 2, nroC: 0 }
    this.agregarObstaculoEn(posicionAleatoria.nroF, posicionAleatoria.nroC)
  }

  private agregarObstaculoEn(nroF: number, nroC: number) {
    this.cuadricula.agregarActor(new Obstaculo("obstaculo.duba1.png"), nroF, nroC, true); //Imagen de una roca
  }
}


class LosCaminosDeNano extends EscenaActividad {

  iniciar(): void {
    this.fondo = new Fondo('fondos.elPlanetaDeNano.png', 0, 0);
    const matriz = [
      ['T', 'F', 'F', 'F', 'F', 'F'],
      ['T', 'T', 'T', 'T', 'T', 'F'],
      ['T', 'F', 'F', 'F', 'T', 'F'],
      ['T', 'T', 'T', 'T', 'T', 'F'],
      ['T', 'F', 'F', 'F', 'F', 'F'],
      ['T', 'T', 'T', 'T', 'T', 'T'],
      ['F', 'T', 'F', 'F', 'F', 'T'],
      ['F', 'T', 'T', 'T', 'T', 'T']
    ]
    this.cuadricula = new CuadriculaEsparsa(0, 0, { alto: 300, ancho: 300, separacionEntreCasillas: 3 }, { grilla: 'casillas.nanoCaminoAlternativo.png' }, matriz)
    this.colorearCaminoPrincipal()
    this.agregarBanana()
    this.agregarObstaculosAleatorios()

    this.automata = new NanoAnimado(0, 0);

    this.cuadricula.agregarActor(this.automata, 0, 0);
    this.automata.escala *= 1.8;
    this.automata.y += 15;

  }


  estaResueltoElProblema() {
    return this.contarActoresConEtiqueta('BananaAnimada') == 0
  }

  private colorearCaminoPrincipal() {
    [0, 1, 2, 3, 4, 5].forEach((fila) => this.cuadricula.casilla(fila, 0).cambiarImagen('casillas.nanoCaminoPrincipal.png'));
    [5, 6, 7].forEach((fila) => this.cuadricula.casilla(fila, 1).cambiarImagen('casillas.nanoCaminoPrincipal.png'))
  }

  private agregarBanana() {
    this.cuadricula.agregarActor(new BananaAnimada(0, 0), 7, 1)
  }

  private agregarObstaculosAleatorios() {
    const posicionAleatoriaAlrededorDe = (fila, columna) => (Math.random() < 0.5) ? { nroF: fila + 1, nroC: columna, } : { nroF: fila, nroC: columna + 1 }

    const posicionPrimerObstaculo = posicionAleatoriaAlrededorDe(1, 0)
    const posicionSegundoObstaculo = posicionAleatoriaAlrededorDe(5, 1)

    this.agregarObstaculoEn(posicionPrimerObstaculo)
    this.agregarObstaculoEn(posicionSegundoObstaculo)
  }

  private agregarObstaculoEn({ nroF, nroC }: ({ nroF: number, nroC: number })) {
    this.cuadricula.agregarActor(new Obstaculo("obstaculo.duba1.png"), nroF, nroC, true); //Imagen de una roca
  }
}