/// <reference path = "../libroPrimaria/EscenaDesdeMapa.ts" />


class EscenaCapySolo extends EscenaCapy {
	
	automata: CapySolo;
	
	static clasesDeActoresInvolucrados(): typeof ActorAnimado[] {
		return EscenaCapy.clasesDeActoresInvolucrados().concat([CapySolo, Guyra])
	};
	
	obtenerAutomata(): CapySolo {
		return new CapySolo();
	}

	estaResueltoElProblema(): boolean {
		return super.estaResueltoElProblema() && this.noHay("Guyra")
	}

	mapearIdentificadorAActor(id: string, nroFila: number, nroColumna: number): ActorAnimado {
		if (id === 'G') return new Guyra()
		
		return super.mapearIdentificadorAActor(id,nroFila,nroColumna)
	}

}