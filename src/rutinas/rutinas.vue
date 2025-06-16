<script setup>
import { useRoute } from 'vue-router';
import { useRutinaStore } from '../store/rutina';
import { ref, onMounted } from 'vue';
import { ejerciciosInfo } from '../store/bd';

const route = useRoute();
const dia = route.params.dia;

const rutinaStore = useRutinaStore();
const ejercicios = rutinaStore.ejercicios;
const ejercicioActual = ref(0);

// Estado para peso base y repeticiones por ejercicio
const pesos = ref({});
const reps = ref({});

onMounted(() => {

  const pesosLS = JSON.parse(localStorage.getItem('pesos')) || {};
  const repsLS = JSON.parse(localStorage.getItem('reps')) || {};

  ejercicios.forEach(ejercicio => {
    if (!ejerciciosInfo[ejercicio]) {
      console.warn(`❗ Ejercicio no encontrado en ejerciciosInfo: ${ejercicio}`);
    }
    pesos.value[ejercicio] = ejerciciosInfo[ejercicio]?.peso || 20;
    reps.value[ejercicio] = ejerciciosInfo[ejercicio]?.reps || 10;
  });
});

const guardarLocalStorage = () => {
  localStorage.setItem('pesos', JSON.stringify(pesos.value));
  localStorage.setItem('reps', JSON.stringify(reps.value));
};


// Funciones para ajustar peso y reps
const bajarPeso = (ejercicio) => {
  const base = pesos.value[ejercicio] || 20;
  pesos.value[ejercicio] = Math.max(0, base - 2.5);
  guardarLocalStorage();
};

const subirPeso = (ejercicio) => {
  const base = pesos.value[ejercicio] || 20;
  pesos.value[ejercicio] = base + 2.5;
  guardarLocalStorage();
};

const actualizarReps = (ejercicio, valor) => {
  reps.value[ejercicio] = Math.max(0, parseInt(valor) || 0);
  guardarLocalStorage();
};

const actualizarPesoBase = (ejercicio, valor) => {
  pesos.value[ejercicio] = Math.max(0, parseFloat(valor) || 0);
  guardarLocalStorage();
};

const siguienteEjercicio = () => {
  if (ejercicioActual.value < ejercicios.length - 1) {
    ejercicioActual.value++;
  }
};

const anteriorEjercicio = () => {
  if (ejercicioActual.value > 0) {
    ejercicioActual.value--;
  }
};
</script>

<template>
  <div class="gym-detail-container">
    <div class="gym-detail-header">
      <h1 class="gym-detail-title">Detalles de Entrenamiento</h1>
      <h2 class="gym-detail-subtitle">{{ dia }} - Ejercicio {{ ejercicioActual + 1 }} de {{ ejercicios.length }}</h2>
      <div class="gym-progress-container">
        <div class="gym-progress-bar" :style="{width: `${(ejercicioActual + 1) / ejercicios.length * 100}%`}"></div>
      </div>
    </div>

    <div class="gym-exercise-container">
      <div class="gym-exercise-card" v-if="ejercicios.length > 0">
        <div class="gym-exercise-media">
          <img
            :src="ejerciciosInfo[ejercicios[ejercicioActual]]?.img || 'https://via.placeholder.com/500x300?text=Ejercicio'"
            class="gym-exercise-image"
            alt="Imagen ejercicio"
          />
        </div>
        
        <div class="gym-exercise-content">
          <div class="gym-exercise-header">
            <h3 class="gym-exercise-name">{{ ejercicios[ejercicioActual] }}</h3>
            <div class="gym-exercise-muscles">
              <span v-if="ejerciciosInfo[ejercicios[ejercicioActual]]?.musculos">
                {{ ejerciciosInfo[ejercicios[ejercicioActual]].musculos }}
              </span>
              <span v-else>Músculos principales no especificados</span>
            </div>
          </div>
          
          <p class="gym-exercise-description">
            {{ ejerciciosInfo[ejercicios[ejercicioActual]]?.desc || 'Descripción detallada no disponible.' }}
          </p>
          
          <div class="gym-exercise-stats">
            <div class="gym-stat-box">
              <span class="gym-stat-label">Peso Actual</span>
              <div class="gym-stat-value">
                <button class="gym-stat-btn minus" @click="bajarPeso(ejercicios[ejercicioActual])">-</button>
                <input 
                  type="number" 
                  class="gym-stat-input" 
                  v-model.number="pesos[ejercicios[ejercicioActual]]" 
                  @change="actualizarPesoBase(ejercicios[ejercicioActual], pesos[ejercicios[ejercicioActual]])"
                >
                <span class="gym-stat-unit">kg</span>
                <button class="gym-stat-btn plus" @click="subirPeso(ejercicios[ejercicioActual])">+</button>
              </div>
            </div>
            
            <div class="gym-stat-box">
              <span class="gym-stat-label">Repeticiones</span>
              <div class="gym-stat-value">
                <button class="gym-stat-btn minus" @click="actualizarReps(ejercicios[ejercicioActual], (reps[ejercicios[ejercicioActual]] || 0) - 1)">-</button>
                <input 
                  type="number" 
                  class="gym-stat-input" 
                  v-model.number="reps[ejercicios[ejercicioActual]]" 
                  @change="actualizarReps(ejercicios[ejercicioActual], reps[ejercicios[ejercicioActual]])"
                >
                <button class="gym-stat-btn plus" @click="actualizarReps(ejercicios[ejercicioActual], (reps[ejercicios[ejercicioActual]] || 0) + 1)">+</button>
              </div>
            </div>
          </div>
          
          <div class="gym-exercise-actions">
            <button class="gym-action-btn difficulty" @click="bajarPeso(ejercicios[ejercicioActual])">
              <i class="bi bi-emoji-frown"></i> Muy difícil
            </button>
            <button class="gym-action-btn success" @click="subirPeso(ejercicios[ejercicioActual])">
              <i class="bi bi-emoji-smile"></i> Fácil
            </button>
          </div>
        </div>
      </div>

      <div class="gym-navigation-buttons">
        <button 
          class="gym-nav-btn prev" 
          @click="anteriorEjercicio"
          :disabled="ejercicioActual === 0"
        >
          <i class="bi bi-arrow-left"></i> Anterior
        </button>
        <button 
          class="gym-nav-btn next" 
          @click="siguienteEjercicio"
          :disabled="ejercicioActual === ejercicios.length - 1"
        >
          Siguiente <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos base */
.gym-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Segoe UI', Roboto, sans-serif;
}

/* Encabezado */
.gym-detail-header {
  text-align: center;
  margin-bottom: 3rem;
}

.gym-detail-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #ff5e00, #ffbd00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.gym-detail-subtitle {
  font-size: 1.8rem;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 1.5rem;
}

.gym-progress-container {
  height: 8px;
  background-color: #ecf0f1;
  border-radius: 4px;
  max-width: 400px;
  margin: 0 auto;
}

.gym-progress-bar {
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(to right, #ffbd00, #ff5e00);
}

/* Contenedor de ejercicio */
.gym-exercise-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Tarjeta de ejercicio */
.gym-exercise-card {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

@media (min-width: 768px) {
  .gym-exercise-card {
    flex-direction: row;
  }
}

.gym-exercise-media {
  height: 300px;
  overflow: hidden;
}

@media (min-width: 768px) {
  .gym-exercise-media {
    width: 45%;
    height: auto;
  }
}

.gym-exercise-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gym-exercise-content {
  padding: 2rem;
}

@media (min-width: 768px) {
  .gym-exercise-content {
    width: 55%;
  }
}

.gym-exercise-header {
  margin-bottom: 1.5rem;
}

.gym-exercise-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.gym-exercise-muscles {
  font-size: 1rem;
  color: #7f8c8d;
  font-weight: 500;
}

.gym-exercise-description {
  color: #34495e;
  line-height: 1.6;
  margin-bottom: 2rem;
}

/* Estadísticas */
.gym-exercise-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.gym-stat-box {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}

.gym-stat-label {
  display: block;
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.gym-stat-value {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.gym-stat-input {
  width: 70px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
}

.gym-stat-unit {
  font-size: 0.9rem;
  color: #7f8c8d;
}

.gym-stat-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.gym-stat-btn.minus {
  background-color: #e74c3c;
  color: white;
}

.gym-stat-btn.plus {
  background-color: #2ecc71;
  color: white;
}

.gym-stat-btn:hover {
  transform: scale(1.1);
}

.gym-stat-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Botones de acción */
.gym-exercise-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.gym-action-btn {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.gym-action-btn.difficulty {
  background-color: #f1c40f;
  color: #2c3e50;
}

.gym-action-btn.success {
  background-color: #2ecc71;
  color: white;
}

.gym-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Navegación */
.gym-navigation-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.gym-nav-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.gym-nav-btn.prev {
  background-color: #3498db;
  color: white;
}

.gym-nav-btn.next {
  background-color: #ff5e00;
  color: white;
}

.gym-nav-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.gym-nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .gym-detail-title {
    font-size: 2rem;
  }
  
  .gym-detail-subtitle {
    font-size: 1.5rem;
  }
  
  .gym-exercise-name {
    font-size: 1.5rem;
  }
}

@media (max-width: 576px) {
  .gym-detail-title {
    font-size: 1.8rem;
  }
  
  .gym-detail-subtitle {
    font-size: 1.3rem;
  }
  
  .gym-exercise-stats {
    grid-template-columns: 1fr;
  }
  
  .gym-navigation-buttons {
    flex-direction: column;
  }
}
</style>
