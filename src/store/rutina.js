import { defineStore } from 'pinia';

export const useRutinaStore = defineStore('rutina', {
  state: () => ({
    ejercicios: []
  }),
  actions: {
    /**
     * Carga la lista de ejercicios con nombre, peso y reps.
     * @param {Array} lista - Array de objetos { nombre, peso, reps }.
     */
    setEjercicios(lista) {
      this.ejercicios = lista;
    },

    /**
     * Actualiza peso y reps de un ejercicio por nombre.
     * @param {String} nombre - Nombre del ejercicio.
     * @param {Object} data - { peso: Number, reps: Number }
     */
    actualizarEjercicio(nombre, data) {
      const ejercicio = this.ejercicios.find(e => e.nombre === nombre);
      if (ejercicio) {
        if (data.peso !== undefined) ejercicio.peso = data.peso;
        if (data.reps !== undefined) ejercicio.reps = data.reps;
      }
    },

    /**
     * Ajusta el peso de un ejercicio sumando o restando un valor.
     * @param {String} nombre - Nombre del ejercicio.
     * @param {Number} delta - Valor a sumar/restar al peso.
     */
    ajustarPeso(nombre, delta) {
      const ejercicio = this.ejercicios.find(e => e.nombre === nombre);
      if (ejercicio) {
        ejercicio.peso += delta;
      }
    }
  }
});
