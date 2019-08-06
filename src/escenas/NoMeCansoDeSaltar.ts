/// <reference path = "./EscenaActividad.ts" />

/**
 * @class NoMeCansoDeSaltar
 *
 * Objetivos: Introducir Repetición
 * Enunciado: Repetir salto.
 */
class NoMeCansoDeSaltar extends EscenaActividad {
  private saltosFaltantes: number = 30

  public iniciar(): void {
    this.setFondo(new Fondo('fondo.noMeCansoDeSaltar.png', 0, 0))
    this.setAutomata(new GatoAnimado(0, -17))
  }

  public fraseAlSaltar(): string {
    this.saltosFaltantes--
    if (this.saltosFaltantes > 0) return "Faltan " + this.saltosFaltantes + " saltos"
    if (this.saltosFaltantes == 0) return "¡Ya salté todo lo necesario!"
    throw new ActividadError("¡Uy! Salté mucho... ¡Me pasé!")
  }

  public estaResueltoElProblema(): boolean {
    return this.saltosFaltantes == 0
  }

}
