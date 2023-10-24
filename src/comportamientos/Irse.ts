/// <reference path = "../comportamientos/MovimientoAnimado.ts" />

// Si se pasa por argumento "irseCon" entonces el receptor debe ser actor compuesto
class Irse extends MovimientoAnimado {

	iniciar(receptor){
		this.argumentos.idTransicion = "irse";
		super.iniciar(receptor);
	}

	preAnimacion(){
      	this.argumentos.direccion = new Direct(1);
	    this.argumentos.distancia = 600;
	    this.argumentos.velocidad = 8;
	    this.argumentos.cantPasos = 40;

		if (this.argumentos.irseCon) {

        	if (typeof this.argumentos.irseCon == 'string') {
          		this.argumentos.irseCon = eval("pilas.escena_actual()." + this.argumentos.irseCon);
        	}
        this.receptor.agregarSubactor(this.argumentos.irseCon);
      	}
	    super.preAnimacion();
	}

	configurarVerificaciones() {
		super.configurarVerificaciones();
		this.verificacionesPre.push(new Verificacion(() => {
			return this.estaEnTransporte();
		}, "Para irse hace falta un transporte"));
	}

	estaEnTransporte(){
		if (typeof this.argumentos.irseCon == 'string') {
			this.argumentos.irseCon = eval("pilas.escena_actual()." + this.argumentos.irseCon);
		}

		let noTieneQueirseConNingunActor = (!this.argumentos.irseCon);
		let colisionaConElActorParaIrse = this.receptor.colisiona_con(this.argumentos.irseCon);

		return (noTieneQueirseConNingunActor || colisionaConElActorParaIrse);
	}
}
