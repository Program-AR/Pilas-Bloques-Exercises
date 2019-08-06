/// <reference path = "./EscenaActividad.ts" />

class LaFiestaDeDracula extends EscenaActividad {
  private focos: Array<Foco> = []
  private bailarines: Array<ActorAnimado> = []

  public iniciar(): void {
    this.setFondo(new Fondo('fondo.fiestadracula.png', 0, 0))
    this.setCuadricula(new Cuadricula(0, 200, 1, 3, { alto: 100 }, { grilla: 'invisible.png', cantColumnas: 1 }))
    this.agregarAutomata()
    this.agregarFocos()
    this.agregarBailarines()
    this.buildState()
  }

  public agregarAutomata(): void {
    this.setAutomata(new Murcielago())
    this.getCuadricula().agregarActor(this.getAutomata(), 0, 0, false)
    this.getAutomata().setY(this.getAutomata().getY() - 120)
    this.getAutomata().aprender(Flotar, { Desvio: 10 })
  }

  public agregarFocos(): void {
    this.focos.push(new Foco())
    this.focos.push(new Foco())
    this.focos.push(new Foco())
    this.getCuadricula().agregarActor(this.focos[0], 0, 0, false)
    this.getCuadricula().agregarActor(this.focos[1], 0, 1, false)
    this.getCuadricula().agregarActor(this.focos[2], 0, 2, false)
    this.focos.forEach(foco => foco.setY(foco.getY() - 30))
  }

  public agregarBailarines(): void {
    this.bailarines.push(new Frank(-150, -150))
    this.bailarines.push(new Bruja(-50, -150))
    var tito = new Tito(50, -150)
    tito.definirAnimacion("parado", [0], 6, true)
    this.bailarines.push(tito)
    this.bailarines.push(new Dracula(150, -150))
    this.bailarines.forEach(bailarin => bailarin.setEscala(0.7))
  }

  private buildState(): void {
    var stateBuilder = new BuilderStatePattern(this, 'nadieBaila')
    stateBuilder.agregarEstadoAceptacion('todosBailando')
    stateBuilder.agregarTransicion('nadieBaila', 'todosBailando', 'empezarFiesta')
    this.setEstado(stateBuilder.estadoInicial())
  }
}

class CambiarColor extends Interactuar {

  public sanitizarArgumentos(): void {
    this.argumentos.etiqueta = "Foco"
    super.sanitizarArgumentos()
  }

  protected alInteractuar(): void {
    (this.interactuado() as Foco).cambiarColor()
  }

}

class EmpezarFiesta extends SecuenciaAnimada {
  sanitizarArgumentos() {
    super.sanitizarArgumentos()
    var dracula = pilas.escena_actual().bailarines[pilas.escena_actual().bailarines.length - 1]
    this.argumentos.secuencia = [
      new Desaparecer({}),
      new ComportamientoConVelocidad({ receptor: dracula, nombreAnimacion: "aparecer" }),
    ]
  }

  configurarVerificaciones() {
    super.configurarVerificaciones()
    this.agregarVerificacionFoco(0, 5, "primer")
    this.agregarVerificacionFoco(1, 8, "segundo")
    this.agregarVerificacionFoco(2, 12, "tercer")
  }

  agregarVerificacionFoco(i, veces, ordinal) {
    this.verificacionesPre.push(
      new Verificacion(() => pilas.escena_actual().focos[i].nombreAnimacionActual() === "color" + veces,
        "¡El " + ordinal + " foco debe cambiarse de color " + veces + " veces!"))
  }

  postAnimacion() {
    super.postAnimacion()
    pilas.escena_actual().bailarines.forEach(b => b.cargarAnimacion("bailando"))
  }
}
