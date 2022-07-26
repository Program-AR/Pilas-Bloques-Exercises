/// <reference path = "../DibujandoFiguras.ts" />
/// <reference path = "../../actores/libroPrimaria/Coty.ts" />
/// <reference path = "../../actores/libroPrimaria/Charco.ts" />
/// <reference path = "../../habilidades/EstallarAlSalirDePantalla.ts"/>

type ArgsDibujando = {
  posX: number, 
  posY: number, 
  pathFondo?: string,
  longitudSegmento?: number
}

class DibujandoFigurasSegmentado extends DibujandoFiguras {
  _pathFondo: string;
  _puntosEsperados: PuntoSimple[] | PuntoSimple[][];
  dibujoPreexistente: DibujoLineal;
  pizarraDibujoPreexistente: Pizarra;
  posX: number;
  posY: number;
  longitudSegmento: number; // usado por comportamiento DibujarLinea

  constructor(dibujoPreexistente: PuntoSimple[] | PuntoSimple[][] = [], puntosEsperados: PuntoSimple[] | PuntoSimple[][] = [], argumentos: ArgsDibujando) {
    super();
    this._puntosEsperados = puntosEsperados;
    this._pathFondo = argumentos.pathFondo;
    this.dibujoPreexistente = DibujoLineal.desdePuntosSimples(dibujoPreexistente);
    this.sanitizarArgumentos(argumentos);
  }

  sanitizarArgumentos(argumentos: ArgsDibujando) {
    this.posX = argumentos.posX || 0;
    this.posY = argumentos.posY || 0;
    this.longitudSegmento = argumentos.longitudSegmento || 50;
  }

  iniciar() {
    super.iniciar();
    this.automata.aprender(EstallarAlSalirDePantalla, {});
  }

  hacerDibujoEsperado() {
    this.pizarraFantasma = new Pizarra();
    this.dibujoEsperado.dibujarEn(this.pizarraFantasma, this.colorDibujoEsperado(), this.anchoLinea, true);
  }

  hacerDibujoPreexistente() {
    this.pizarraDibujoPreexistente = new Pizarra();
    this.dibujoPreexistente.dibujarEn(this.pizarraDibujoPreexistente, createjs.Graphics.getRGB(41, 105, 165), this.anchoLinea);
  }

  puntosEsperados() {
    return this._puntosEsperados;
  }

  colorDibujo() {
    return pilas.colores.rgb(35, 105, 166);
  }

  colorDibujoEsperado() {
    return pilas.colores.gris;
  }
}
