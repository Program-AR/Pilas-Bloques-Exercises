/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/Frank.ts" />
/// <reference path = "../actores/Bruja.ts" />
/// <reference path = "../habilidades/Flotar.ts" />
/// <reference path = "../comportamientos/SecuenciaAnimada.ts" />
/// <reference path = "../comportamientos/Interactuar.ts" />


class BuscandoLasEstrellas extends EscenaActividad {
  telescopios = [];
  amigos = [];

  iniciar() {
    this.fondo = new Fondo('fondo.fiestadracula.png', 0, 0);
    this.cuadricula = new Cuadricula(0, 200, 1, 3,
      { alto: 100 },
      { grilla: 'invisible.png', cantColumnas: 1 });

    this.agregarAutomata();
    this.agregarTelescopios();
    this.crearEstado();
  }

  agregarAutomata() {
    this.automata = new Manic();
    this.cuadricula.agregarActor(this.automata, 0, 0, false);
    this.automata.y -= 120;
    this.automata.aprender(Flotar, { Desvio: 10 });
  }

  agregarTelescopios() {
    this.telescopios.push(new TelescopioAnimado());
    this.telescopios.push(new TelescopioAnimado());
    this.telescopios.push(new TelescopioAnimado());
    this.cuadricula.agregarActor(this.telescopios[0], 0, 0, false);
    this.cuadricula.agregarActor(this.telescopios[1], 0, 1, false);
    this.cuadricula.agregarActor(this.telescopios[2], 0, 2, false);
    this.telescopios.forEach(f => f.y -= 30);
  }

  agregarAmigos() {
    this.amigos.push(new Chuy());
    this.amigos.push(new Capy());
    this.amigos.push(new Yvoty());
    this.amigos.forEach(b => {b.escala = 0.7; b.vivo = false});
  }

  private crearEstado() {
    var builder = new BuilderStatePattern(this, 'nadieObserva');
    builder.agregarEstadoAceptacion('todosObservando');
    builder.agregarTransicion('nadieObserva', 'todosObservando', 'observarCielo');
    this.estado = builder.estadoInicial();
  }
}

class MoverTelescopio extends Interactuar {

  sanitizarArgumentos() {
    this.argumentos.etiqueta = "Telescopios";
    super.sanitizarArgumentos();
  }

  protected alInteractuar(): void {
    (this.interactuado() as TelescopioAnimado).mover();
  }

}

class TodosObservando extends SecuenciaAnimada {
  sanitizarArgumentos() {
    super.sanitizarArgumentos();
    pilas.escena_actual().amigos.forEach(a => {
      a.vivo = true;
      this.argumentos.secuencia = [
        new Desaparecer({}),
        new ComportamientoConVelocidad({ receptor: a, nombreAnimacion: "aparecer" }),
      ];
    }
    );
  }

  configurarVerificaciones() {
    super.configurarVerificaciones();
    this.agregarVerificacionTelescopio(0, 5, "primer");
    this.agregarVerificacionTelescopio(1, 8, "segundo");
    this.agregarVerificacionTelescopio(2, 9, "tercer");
  }

  agregarVerificacionTelescopio(i, veces, ordinal) {
    this.verificacionesPre.push(
      new Verificacion(() => pilas.escena_actual().telescopios[i].nombreAnimacionActual() === "mover" + veces,
        "¡El " + ordinal + " telescopio debe moverse " + veces + " veces!"));
  }

  postAnimacion() {
    super.postAnimacion();
    pilas.escena_actual().amigos.forEach(b => b.cargarAnimacion("parado"));
  }
}
