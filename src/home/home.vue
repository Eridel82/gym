<!-- <script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useRutinaStore } from '../store/rutina';


const semanaActual = ref(1);
const rutinaStore = useRutinaStore();
const enviarADetalle = (ejercicios) => {
  rutinaStore.setEjercicios(ejercicios);
};

// Semana 1
const rutinaSemana1 = [
  {
    dia: 'Lunes',
    titulo: 'Día 1',
    ejercicios: [
      'Sentadilla con barra alta',
      'Press de banca plano con barra',
      'Remo con barra agarre prono',
      'Curl con barra recta',
      'Elevaciones laterales con mancuernas'
    ]
  },
  {
    dia: 'Miércoles',
    titulo: 'Día 2',
    ejercicios: [
      'Peso muerto sumo',
      'Press militar con barra de pie',
      'Dominadas con agarre prono',
      'Fondos',
      'Extensiones de codo con barra tumbado'
    ]
  },
  {
    dia: 'Viernes',
    titulo: 'Día 3',
    ejercicios: [
      'Hip thrust',
      'Press de banca inclinado con mancuernas',
      'Remo con mancuernas',
      'Zancada inversa con barra alta',
      'Elevación de talón unilateral con mancuerna'
    ]
  }
];

// Semana 2
const rutinaSemana2 = [
  {
    dia: 'Martes',
    titulo: 'Día 4',
    ejercicios: [
      'Peso muerto sumo',
      'Press militar con barra de pie',
      'Dominadas con agarre prono',
      'Extensiones de cuádriceps',
      'Elevaciones laterales con mancuernas'
    ]
  },
  {
    dia: 'Jueves',
    titulo: 'Día 5',
    ejercicios: [
      'Sentadilla con barra alta',
      'Press de banca plano con barra',
      'Remo con barra agarre prono',
      'Curl con mancuernas en banco inclinado',
      'Extensiones de codo con barra trasnuca'
    ]
  },
  {
    dia: 'Sábado',
    titulo: 'Día 6',
    ejercicios: [
      'Hip thrust',
      'Press de banca inclinado con mancuernas',
      'Remo vertical con barra',
      'Curl femoral tumbado',
      'Elevación de talón unilateral con mancuerna'
    ]
  }
];

// Saber qué semana estamos
Date.prototype.getWeekNumber = function () {
  const d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

const rutina = computed(() =>
  semanaActual.value === 1 ? rutinaSemana1 : rutinaSemana2
);

const cambiarSemana = () => {
  semanaActual.value = semanaActual.value === 1 ? 2 : 1;
};
</script>

<template>
 <div class="bg-light min-vh-100 d-flex flex-column align-items-center py-5">
    <h1 class="text-primary fw-bold mb-4">Rutina asignada - Semana {{ semanaActual }}</h1>

    <button class="btn btn-secondary mb-4" @click="cambiarSemana">
      Cambiar a Semana {{ semanaActual === 1 ? 2 : 1 }}
    </button>

    <div class="accordion w-100" style="max-width: 1200px;" id="rutinaAccordion">
      <div v-for="(diaItem, index) in rutina" :key="index" class="accordion-item rounded-3 mb-3 border-0 shadow-sm">
        <h2 class="accordion-header" :id="'heading' + index">
          <button class="accordion-button text-dark rounded-3" :class="{ collapsed: index !== 0 }" type="button"
            data-bs-toggle="collapse" :data-bs-target="'#collapse' + index"
            :aria-expanded="index === 0 ? 'true' : 'false'" :aria-controls="'collapse' + index">
            <img src="https://cdn-icons-png.flaticon.com/512/2871/2871250.png" alt="icono" width="24" height="24"
              class="me-2" />
            {{ diaItem.dia }} {{ diaItem.titulo }}
          </button>
        </h2>
        <div :id="'collapse' + index" class="accordion-collapse collapse" :class="{ show: index === 0 }"
          :aria-labelledby="'heading' + index" data-bs-parent="#rutinaAccordion">
          <div class="accordion-body">
            <strong class="d-block mb-2">Ejercicio</strong>
            <ul class="list-group">
              <li v-for="(ejercicio, idx) in diaItem.ejercicios" :key="idx" class="list-group-item">
                {{ ejercicio }}
              </li>
              <RouterLink :to="{ name: 'rutinas', params: { dia: diaItem.dia } }"
                class="btn btn-outline-primary btn-sm mt-4" @click="enviarADetalle(diaItem.ejercicios)">
                Más detalles
              </RouterLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion-button {
  font-size: 1.2rem;
}

.accordion-button:not(.collapsed) {
  background-color: #e9f7fe;
}

.accordion-item {
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
}

.accordion-item:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}
</style> -->

<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useRutinaStore } from '../store/rutina';

const semanaActual = ref(1);
const rutinaStore = useRutinaStore();
const diaActual = ref('');
const diasExpandidos = ref({});

const enviarADetalle = (ejercicios) => {
  rutinaStore.setEjercicios(ejercicios);
};

// Semana 1
const rutinaSemana1 = [
  {
    dia: 'Lunes',
    titulo: 'Día 1 - Piernas y Pecho',
    ejercicios: [
      'Sentadilla con barra alta',
      'Press de banca plano con barra',
      'Remo con barra agarre prono',
      'Curl con barra recta',
      'Elevaciones laterales con mancuernas'
    ]
  },
  {
    dia: 'Miércoles',
    titulo: 'Día 2 - Espalda y Hombros',
    ejercicios: [
      'Peso muerto sumo',
      'Press militar con barra de pie',
      'Dominadas con agarre prono',
      'Fondos',
      'Extensiones de codo con barra tumbado'
    ]
  },
  {
    dia: 'Viernes',
    titulo: 'Día 3 - Glúteos y Piernas',
    ejercicios: [
      'Hip thrust',
      'Press de banca inclinado con mancuernas',
      'Remo con mancuernas',
      'Zancada inversa con barra alta',
      'Elevación de talón unilateral con mancuerna'
    ]
  }
];

// Semana 2
const rutinaSemana2 = [
  {
    dia: 'Martes',
    titulo: 'Día 4 - Fuerza Total',
    ejercicios: [
      'Peso muerto sumo',
      'Press militar con barra de pie',
      'Dominadas con agarre prono',
      'Extensiones de cuádriceps',
      'Elevaciones laterales con mancuernas'
    ]
  },
  {
    dia: 'Jueves',
    titulo: 'Día 5 - Volumen',
    ejercicios: [
      'Sentadilla con barra alta',
      'Press de banca plano con barra',
      'Remo con barra agarre prono',
      'Curl con mancuernas en banco inclinado',
      'Extensiones de codo con barra trasnuca'
    ]
  },
  {
    dia: 'Sábado',
    titulo: 'Día 6 - Hipertrofia',
    ejercicios: [
      'Hip thrust',
      'Press de banca inclinado con mancuernas',
      'Remo vertical con barra',
      'Curl femoral tumbado',
      'Elevación de talón unilateral con mancuerna'
    ]
  }
];

const rutina = computed(() =>
  semanaActual.value === 1 ? rutinaSemana1 : rutinaSemana2
);

const cambiarSemana = () => {
  semanaActual.value = semanaActual.value === 1 ? 2 : 1;
  determinarDiaActual();
};

const determinarDiaActual = () => {
  const hoy = new Date().getDay();
  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  diaActual.value = diasSemana[hoy];
  
  // Inicializar todos como cerrados
  rutina.value.forEach(item => {
    diasExpandidos.value[item.dia] = false;
  });
  
  // Abrir solo el día actual si está en la rutina
  const diaEnRutina = rutina.value.find(item => item.dia === diaActual.value);
  if (diaEnRutina) {
    diasExpandidos.value[diaActual.value] = true;
  } else {
    // Si no es día de entrenamiento, abrir el primero
    diasExpandidos.value[rutina.value[0].dia] = true;
  }
};

const toggleDia = (dia) => {
  diasExpandidos.value[dia] = !diasExpandidos.value[dia];
};

onMounted(() => {
  determinarDiaActual();
});
</script>

<template>
  <div class="gym-app min-vh-100 d-flex flex-column align-items-center py-4 py-md-5">
    <div class="container-lg px-3">
      <div class="header-section text-center mb-4 mb-md-5">
        <h1 class="gym-title fw-bold mb-3">MI RUTINA <span class="badge gym-badge">Semana {{ semanaActual }}</span></h1>
        
        <button class="btn gym-switch-btn mb-3" @click="cambiarSemana">
          <i class="bi bi-arrow-repeat me-2"></i>
          Cambiar a Semana {{ semanaActual === 1 ? 2 : 1 }}
        </button>
        
        <div class="progress gym-progress mb-3">
          <div class="progress-bar gym-progress-bar" role="progressbar" 
               :style="{ width: semanaActual === 1 ? '50%' : '100%' }" 
               :aria-valuenow="semanaActual === 1 ? 50 : 100" 
               aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>

      <div class="row g-4">
        <div v-for="(diaItem, index) in rutina" :key="index" class="col-12">
          <div class="gym-card">
            <div 
              class="gym-card-header d-flex align-items-center justify-content-between cursor-pointer"
              @click="toggleDia(diaItem.dia)"
            >
              <div class="d-flex align-items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/2936/2936886.png" 
                     alt="icono" width="32" height="32" class="me-3" />
                <div>
                  <h3 class="gym-card-day mb-0">{{ diaItem.dia }}</h3>
                  <h4 class="gym-card-title">{{ diaItem.titulo }}</h4>
                </div>
              </div>
              <i 
                class="bi fs-4 transition-all"
                :class="diasExpandidos[diaItem.dia] ? 'bi-chevron-up' : 'bi-chevron-down'"
              ></i>
            </div>
            
            <div class="gym-card-body" v-if="diasExpandidos[diaItem.dia]">
              <h5 class="gym-exercise-title">
                <i class="bi bi-list-check me-2"></i>Ejercicios
              </h5>
              
              <ul class="gym-exercise-list">
                <li v-for="(ejercicio, idx) in diaItem.ejercicios" :key="idx" 
                    class="gym-exercise-item d-flex align-items-start">
                  <i class="bi bi-check-circle-fill gym-check-icon me-2 mt-1"></i>
                  <span>{{ ejercicio }}</span>
                </li>
              </ul>
              
              <RouterLink :to="{ name: 'rutinas', params: { dia: diaItem.dia } }"
                class="btn gym-details-btn w-100 mt-3" @click="enviarADetalle(diaItem.ejercicios)">
                <i class="bi bi-arrow-right-circle me-2"></i>Ver detalles completos
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos generales */
.gym-app {
  /* background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%); */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.gym-title {
  font-size: 2.5rem;
  background: linear-gradient(to right, #ff5e00, #ffbd00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.gym-badge {
  background-color: #ff5e00;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  color: white;
}

/* Botón de cambiar semana */
.gym-switch-btn {
  background-color: #00a1e0;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.gym-switch-btn:hover {
  background-color: #0088c0;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

/* Barra de progreso */
.gym-progress {
  height: 8px;
  border-radius: 4px;
  background-color: #e0e0e0;
  max-width: 300px;
  margin: 0 auto;
}

.gym-progress-bar {
  background: linear-gradient(to right, #ffbd00, #ff5e00);
  border-radius: 4px;
}

/* Tarjetas de rutina */
.gym-card {
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
}

.gym-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
}

.gym-card-header {
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: white;
  padding: 1.5rem;
  cursor: pointer;
}

.cursor-pointer {
  cursor: pointer;
}

.gym-card-day {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
}

.gym-card-title {
  font-size: 0.9rem;
  font-weight: 500;
  color: #ffbd00;
  margin-top: 0.25rem;
}

.gym-card-body {
  padding: 1.5rem;
}

/* Lista de ejercicios */
.gym-exercise-title {
  color: #ff5e00;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.gym-exercise-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.gym-exercise-item {
  margin-bottom: 0.75rem;
  color: #333333;
  line-height: 1.5;
}

.gym-check-icon {
  color: #00a1e0;
  font-size: 0.9rem;
}

/* Botón de detalles */
.gym-details-btn {
  background-color: #ff5e00;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gym-details-btn:hover {
  background-color: #e05500;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(255, 94, 0, 0.3);
}

.transition-all {
  transition: all 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .gym-title {
    font-size: 2rem;
  }
  
  .gym-card-header {
    padding: 1.25rem;
  }
  
  .gym-card-body {
    padding: 1.25rem;
  }
}

@media (max-width: 576px) {
  .gym-title {
    font-size: 1.75rem;
  }
  
  .gym-switch-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
  
  .gym-card-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .gym-card-day, .gym-card-title {
    text-align: left;
  }
}
</style>
