/// <reference path = "../../node_modules/pilasweb/dist/pilasweb.d.ts" />
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/Cuadricula.ts" />
/// <reference path = "../actores/segundoCiclo/Capy/Capy.ts" />
/// <reference path = "../actores/NaveAnimada.ts" />
/// <reference path = "../actores/segundoCiclo/Capy/Papel.ts" />
/// <reference path = "../actores/segundoCiclo/Capy/Lata.ts" />
/// <reference path = "../actores/segundoCiclo/Capy/Tacho.ts" />
/// <reference path = "../actores/Tablero.ts" />
/// <reference path = "../actores/ObservadoAnimado.ts" />
/// <reference path = "../actores/ActorCompuesto.ts" />
/// <reference path = "EstadosDeEscena.ts" />
/// <reference path = "../habilidades/Flotar.ts" />

class LimpiandoElHumedal extends EscenaActividad {
  compus;
  fondo;
  cuadricula;
  papel;
  lata;
  tacho;
  yacare;

  iniciar() {
    this.fondo = new Fondo('fondo.capy.png', 0, 0);

    this.cuadricula = new Cuadricula(0, 0, 4, 5,
      { ancho: 380, alto: 380 },
      {
        grilla: 'casillas.capy.png',
        cantFilas: 1,
        cantColumnas: 16,
        bordesDecorados: true,
        relAspecto: 1
      });

    this.crearActores();
    this.crearTableros();
    this.crearEstado();
  }

  private crearActores() {
    this.crearAutomata();

    var elTacho = new Tacho();
    this.cuadricula.agregarActor(elTacho, this.cuadricula.cantFilas - 1, 0);
    this.tacho = new ActorCompuesto(0, 0, { subactores: [elTacho] });
    this.tacho.escala *= 0.7;
    this.tacho.y -= 20;

    this.yacare = new Yacare();
    this.cuadricula.agregarActor(this.yacare, this.cuadricula.cantFilas - 1, 2);
    this.yacare.escala *= 2;
    this.yacare.y -= 20;
    this.yacare.aprender(Flotar, { Desvio: 2 });

    this.lata = new Lata();
    this.lata.cantidad = 3;
    this.papel = new Papel();
    this.papel.cantidad = 3;
    this.cuadricula.agregarActor(this.lata, 0, 0);
    this.lata.aprender(Flotar, { Desvio: 2 });
    this.cuadricula.agregarActor(this.papel, 0, this.cuadricula.cantColumnas - 1);
    this.papel.aprender(Flotar, { Desvio: 2 });
  }

  private crearAutomata() {
    this.automata = new ActorCompuesto(0, 0, { subactores: [new Capy()] });
    this.cuadricula.agregarActorEnPerspectiva(this.automata, this.cuadricula.cantFilas - 1, 0, false);
    this.automata.escala = 0.8;
    this.automata.y += 50;
  }

  private crearTableros() {
    Trait.toObject(ObservadoConDisminuir, this.papel);
    Trait.toObject(ObservadoConDisminuir, this.lata);

    this.lata.registrarObservador(
      new Tablero(-150, 190, { texto: "Lata" }));
    this.papel.registrarObservador(
      new Tablero(150, 190, { texto: "Papel" }));

    this.papel.changed();
    this.lata.changed();
  }

  private crearEstado() {
    var builder = new BuilderStatePattern(this, 'faltanMateriales');
    builder.agregarEstado('tachoLleno');
    builder.agregarEstadoAceptacion('montandoYacare');
    builder.agregarError('faltanMateriales', 'montar', '¡No puedo montar el yacaré sin antes haber limpiado el humedal!');
    builder.agregarError('faltanMateriales', 'irse', '¡No puedo irme sin antes haber limpiado el humedal!');

    builder.agregarTransicion('faltanMateriales', 'tachoLleno', 'colocar',
      () => this.lata.cantidad == 0 && this.papel.cantidad == 0);
    builder.agregarTransicion('tachoLleno', 'montandoYacare','irse');

    this.estado = builder.estadoInicial();
  }

  actualizar(): void {
    super.actualizar();    
    if( this.tacho.nombreAnimacionActual() != "lleno" && 
        ( this.lata.cantidad != 3 || this.papel.cantidad != 3 ) &&
        this.automata.casillaActual() === this.tacho.subactores[0].casillaActual() )
      this.tacho.cargarAnimacion("lleno")
  }
}
