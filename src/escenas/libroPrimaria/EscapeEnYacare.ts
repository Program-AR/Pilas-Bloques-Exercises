/// <reference path = "../libroPrimaria/EscenaDesdeMapa.ts" />

class ActorConEntregable extends ActorCompuesto{
  acomodarseEnCapy(capy: CapyConSeguidores): void{
    const entregable = this.subactores.pop()
    //capy.agregarSubactor(entregable)
    capy.posicionarEnMano(entregable)
  }
}

class TelescopioEntregable extends Telescopio{
  acomodarseEnCapy(capy: CapyConSeguidores): void{
    capy.posicionarEnMano(this)
  }
}

class ManicConPelota extends ActorConEntregable{
  constructor() {
    
    const manic = new Manic() 
    manic.escala *= 0.06;
    
    super(0,0, { subactores: [manic]});
 
    const pelota = new Pulpito()
    pelota.escala *= 0.02;
    pelota.x = manic.derecha + 10
    this.agregarSubactor(pelota)


  }
}

class ChuyConCargador extends ActorConEntregable{
  constructor() {    
    const chuy = new Chuy()
    chuy.escala *= 0.05;
    
    super(0,0, { subactores: [chuy]});
    
    const cargador = new Cargador()
    cargador.escala *= 0.02;
    cargador.x = chuy.derecha + 10
    
    this.agregarSubactor(cargador)
  }
}

class YvotySinEntregable extends ActorCompuesto {

  constructor() {
    const yvoty = new Yvoty()
    yvoty.escala *= 0.05;
    super(0,0, { subactores: [yvoty]});
  }

  acomodarseEnCapy(capy: CapyConSeguidores): void{
  
  }
}

class CapyConSeguidores extends ActorCompuesto{

  entregableEnMano: ActorAnimado

  constructor(){
    const capy = new Capy()
    capy.escala *= 0.06

    super(0,0, { subactores: [capy], puedoSostenerMasDeUno: true});
  }

  entregarSiPuede(){
    if (this.entregableEnMano){
      this.entregableEnMano.eliminar()
      this.subactores = this.subactores.filter(actor => actor !== this.entregableEnMano)
      this.entregableEnMano = null
    }
  }

  acomodarEntregable(){
    const actorConEntregable = this.subactores[this.subactores.length - 1]
    actorConEntregable.acomodarseEnCapy(this)
  }

  posicionarEnMano(entregable: ActorAnimado){
    this.entregableEnMano = entregable
  }

  entregar(): void{
    this.entregableEnMano.eliminar()
  }

  espejarSeguidor(seguidor, posicion){
    const x = posicion * 50 - 30

    if (!this.espejado){
      seguidor.x = this.subactores[0].izquierda - x
    } 

    else {
      seguidor.x = this.subactores[0].derecha + x
    }
  }

  espejarEntregableEnMano(){
    if (!this.espejado){
      this.entregableEnMano.x = this.subactores[0].derecha
    }
    else{
      this.entregableEnMano.x = this.subactores[0].izquierda
    }
  }

  tieneAlgoEnLaMano(): boolean{
    return false
  }

  actualizar(): void{
    super.actualizar()
    this.subactores.forEach((seguidor, indice) => {
      if(seguidor !== this.entregableEnMano && indice !== 0){
        this.espejarSeguidor(seguidor,indice)
      }
    })
    if(this.entregableEnMano){
      this.espejarEntregableEnMano()
    }
  }
}

class AgregarASeguidores extends Sostener {

  alInteractuar(): void{
    super.alInteractuar()
    this.receptor.entregarSiPuede()
    this.receptor.acomodarEntregable()
  }

  posicionHorizontalDeProximoSubactor(): number {
    return this.receptor.subactores[0].izquierda + 50 * this.receptor.subactores.length
  }  
}

class IrseEnYacare extends Escapar {
  iniciar(receptor){
    super.iniciar(receptor)
		this.argumentos.nombreAnimacion = "surfear"
    this.argumentos.direccion = new Direct(1)
    this.argumentos.escaparCon = "yacare"
    this.argumentos.idTransicion = "irse"
	}

  preAnimacion(){
    super.preAnimacion()
    this.receptor.eliminarUltimoSubactor()
  }
}

class EscapeEnYacare extends EscenaActividad {
	
	automata: CapySolo;
  telescopio: Telescopio
  manic: Manic
  chuy: Chuy
  yvoty: Yvoty
  yacare: Yacare
  
    iniciar() {
        this.fondo = new Fondo('fondo.capy.png', 0, 0);

        this.cuadricula = new Cuadricula(0,0,4,5,
            EscenaCapy.opsCuadricula(),
            EscenaCapy.opsCasilla());

        this.telescopio = new TelescopioEntregable();
        this.cuadricula.agregarActor(this.telescopio, 1, 4)

        this.manic = new ManicConPelota()
        this.cuadricula.agregarActor(this.manic, 0, 0);

        this.chuy = new ChuyConCargador()
        this.cuadricula.agregarActor(this.chuy,2,2);

        this.yvoty = new YvotySinEntregable();
        this.cuadricula.agregarActor(this.yvoty, 1, 2);

        this.automata = new CapyConSeguidores()
        this.cuadricula.agregarActor(this.automata, 3, 0);

        this.yacare = new Yacare();
        this.cuadricula.agregarActor(this.yacare, 3, 1);
        this.yacare.y -= 10;
        this.yacare.escala *= 1.2
        this.yacare.aprender(Flotar, { Desvio: 2 });

        this.construirFSM();
      }



    private construirFSM(){
        const builder= new BuilderStatePattern(this, 'inicial');
        builder.agregarEstado('telescopioEnMano');
        builder.agregarEstado('pelotaEnMano');
        builder.agregarEstado('cargadorEnMano');
        builder.agregarEstado('todosEntregados');
        builder.agregarEstadoAceptacion('montandoYacare');

        builder.agregarTransicion('inicial','telescopioEnMano','agarrarTelescopio');
        builder.agregarTransicion('telescopioEnMano','pelotaEnMano','entregarTelescopio');
        builder.agregarTransicion('pelotaEnMano','cargadorEnMano','entregarPelota');
        builder.agregarTransicion('cargadorEnMano','todosEntregados','entregarCargador');
        builder.agregarTransicion('todosEntregados','montandoYacare','irse');

        const estadosEnOrden = ['inicial','telescopioEnMano','pelotaEnMano','cargadorEnMano','montandoYacare']

        for (let i = 0; i < estadosEnOrden.length; i++) {
          if(estadosEnOrden[i]!='telescopioEnMano'){
            builder.agregarError(estadosEnOrden[i],'entregarTelescopio', 'Mañic necesita su telescopio.');
          }
          if(estadosEnOrden[i]!='pelotaEnMano'){
            builder.agregarError(estadosEnOrden[i],'entregarPelota','Chuy necesita su pelota.');
          }
          if(estadosEnOrden[i]!='cargadorEnMano'){
            builder.agregarError(estadosEnOrden[i],'entregarCargador','Yvoty necesita su cargador.');
          }
          if(estadosEnOrden[i]!='todosEntregados'){
            builder.agregarError(estadosEnOrden[i],'montarYacare','Para montar el yacare todos deben haber recuperado sus cosas.');
          }
        }

        this.estado=builder.estadoInicial();
      }

}