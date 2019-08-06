/// <reference path = "./EscenaActividad.ts" />

class ReparandoLaNave extends EscenaActividad {
  private carbon: any
  private hierro: any
  private nave: NaveAnimada

  public iniciar(): void {
    this.setFondo(new Fondo('fondos.reparandoLaNave.png', 0, 0))
    this.setCuadricula(new Cuadricula(0, 0, 4, 5, { ancho: 323, alto: 261 }, { grilla: 'invisible.png', cantColumnas: 1 }))
    this.crearActores()
    this.crearTableros()
    this.crearEstado()
  }

  private crearActores(): void {

    this.crearAutomata()

    this.nave = new NaveAnimada()
    this.getCuadricula().agregarActor(this.nave, this.getCuadricula().cantFilas - 1, 0)
    this.nave = new ActorCompuesto(0, 0, { subactores: [this.nave] })
    this.nave.escala = 2.5
    this.nave.y += 10

    this.hierro = new HierroAnimado(0, 0)
    this.hierro.cantidad = 3
    this.carbon = new CarbonAnimado(0, 0)
    this.carbon.cantidad = 3
    this.getCuadricula().agregarActor(this.hierro, 0, 0)
    this.hierro.aprender(Flotar, { Desvio: 2 })
    this.getCuadricula().agregarActor(this.carbon, 0, this.getCuadricula().cantColumnas - 1)
    this.carbon.aprender(Flotar, { Desvio: 2 })
  }

  private crearAutomata(): void {
    this.setAutomata(new ActorCompuesto(0, 0, { subactores: [new MarcianoAnimado(0, 0)] }))
    this.getCuadricula().agregarActorEnPerspectiva(this.getAutomata(), this.getCuadricula().cantFilas - 1, 0, false)
    this.getAutomata().escala = 0.8
    this.getAutomata().y += 50
  }

  private crearTableros(): void {
    Trait.toObject(ObservadoConDisminuir, this.carbon)
    Trait.toObject(ObservadoConDisminuir, this.hierro)

    this.carbon.registrarObservador(new Tablero(150, 190, { texto: "Carbón" }))
    this.hierro.registrarObservador(new Tablero(-150, 190, { texto: "Hierro" }))

    this.carbon.changed()
    this.hierro.changed()
  }

  private crearEstado() {
    var builder = new BuilderStatePattern(this, 'faltanMateriales')
    builder.agregarEstado('naveReparada')
    builder.agregarEstadoAceptacion('haEscapado')
    builder.agregarError('faltanMateriales', 'escapar', '¡No puedo escaparme sin antes haber reparado la nave!')
    builder.agregarTransicion('faltanMateriales', 'naveReparada', 'depositar', () => this.hierro.cantidad == 0 && this.carbon.cantidad == 0)
    builder.agregarTransicion('naveReparada', 'haEscapado', 'escapar')
    this.setEstado(builder.estadoInicial())
  }
}
