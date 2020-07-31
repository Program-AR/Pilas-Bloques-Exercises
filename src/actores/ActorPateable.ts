/// <reference path = "../actores/ActorAnimado.ts" />
/// <reference path = "../habilidades/Rotar.ts" />

class ActorPateable extends ActorAnimado {

    private aceleracion: number
    private alturaOriginal: number
    private contador: number
    private elevacionMaxima: number
    private pateado: boolean
    private tiempoEnElAire: number

    /**
     * ¿El actor fue pateado?
     */
    fuePateado(): boolean {
        return this.pateado
    }

    actualizarPosicion(): void {
        this.alturaOriginal = this.y
    }

    estoyFueraDePantalla(): boolean {
        return this.izquierda >= pilas.derecha()
    }

    /**
     * El actor es pateado.
     * 
     * @param aceleracion - La aceleracion que tendra al ser pateado.
     * @param elevacionMaxima - La elevación maxima que tendra al ser pateado.
     * @param gradosDeAumentoStep - Los grados de aumento.
     * @param tiempoEnElAire - El tiempo que permanecera en el aire.
     */
    serPateado(aceleracion: number, elevacionMaxima: number, gradosDeAumentoStep: number, tiempoEnElAire: number): void {

        if (!this.fuePateado()) {
            this.pateado = true
            this.aceleracion = aceleracion
            this.elevacionMaxima = elevacionMaxima
            this.tiempoEnElAire = tiempoEnElAire
            this.contador = Math.random() * 3
            this.actualizarPosicion()
            this.cargarAnimacion("patear")
            this.aprender(RotarContinuamente, { gradosDeAumentoStep })
        }

        else {
            this.contador = (this.contador + this.aceleracion) % 256 // para evitar overflow

            if (this.y < this.alturaOriginal + this.elevacionMaxima && this.tiempoEnElAire > 0) {
                //subiendo
                this.y += this.contador
            }

            if (this.tiempoEnElAire > 0) {
                //en el aire
                this.tiempoEnElAire -= 1
            }

            if (this.tiempoEnElAire <= 0) {
                //bajando
                if (this.y > this.alturaOriginal) {
                    this.y -= this.contador
                }
            }
            this.x += this.contador

            if (this.estoyFueraDePantalla()) {
                this.eliminar()
            }
        }
    }

}