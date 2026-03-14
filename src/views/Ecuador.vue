<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="transparent">
        <ion-title>🇪🇨 Provincias de Ecuador</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ecuador-content">
      <div class="search-container">
        <ion-searchbar
          v-model="searchTerm"
          placeholder="Buscar provincia..."
          animated
          class="custom-searchbar"
          @ionInput="filterProvinces"
        ></ion-searchbar>
      </div>

      <div class="stats-card">
        <ion-card class="stats-card-content">
          <ion-card-content>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-value">{{ provinces.length }}</span>
                <span class="stat-label">Provincias</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ totalCantones }}</span>
                <span class="stat-label">Cantones</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ totalPoblacion.toLocaleString() }}</span>
                <span class="stat-label">Habitantes</span>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
      </div>

      <div class="provinces-grid">
        <ion-card
          v-for="province in filteredProvinces"
          :key="province.id"
          class="province-card"
          button
          @click="showProvinceDetails(province)"
        >
          <div class="card-header" :style="{ backgroundColor: province.color }">
            <div class="province-flag">
              <span class="flag-emoji">{{ province.flagEmoji }}</span>
            </div>
          </div>
          <ion-card-content>
            <h2>{{ province.name }}</h2>
            <p class="capital"><ion-icon :icon="businessOutline"></ion-icon> Capital: {{ province.capital }}</p>
            <p class="population"><ion-icon :icon="peopleOutline"></ion-icon> Población: {{ province.population.toLocaleString() }}</p>
            <p class="cantones"><ion-icon :icon="gridOutline"></ion-icon> Cantones: {{ province.cantones }}</p>
          </ion-card-content>
        </ion-card>
      </div>

      <div v-if="filteredProvinces.length === 0" class="empty-state">
        <ion-icon :icon="searchOutline" class="empty-icon"></ion-icon>
        <h3>No se encontraron provincias</h3>
        <p>Intenta con otro término de búsqueda</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonCard, IonCardContent, IonIcon, alertController
} from '@ionic/vue';
import { searchOutline, peopleOutline, businessOutline, gridOutline } from 'ionicons/icons';

interface Province {
  id: number;
  name: string;
  capital: string;
  population: number;
  area: number;
  cantones: number;
  founded: string;
  region: string;
  color: string;
  flagEmoji: string;
  description: string;
  demonym: string;
}

// Datos de las 24 provincias de Ecuador [citation:1][citation:4][citation:10]
const provincesData: Province[] = [
  { 
    id: 1, 
    name: 'Azuay', 
    capital: 'Cuenca', 
    population: 801609, 
    area: 8310, 
    cantones: 15, 
    founded: '25 de junio de 1824', 
    region: 'Sierra', 
    color: '#4CAF50',
    flagEmoji: '🟢⚪🔴',
    description: 'Conocida por su arquitectura colonial y su cultura. Cuenca es Patrimonio Cultural de la Humanidad.',
    demonym: 'Azuayo/a'
  },
  { 
    id: 2, 
    name: 'Bolívar', 
    capital: 'Guaranda', 
    population: 199078, 
    area: 3945, 
    cantones: 7, 
    founded: '23 de abril de 1884', 
    region: 'Sierra', 
    color: '#FF9800',
    flagEmoji: '🟡🔴🟢',
    description: 'Tierra de las siete colinas y famosa por su carnaval.',
    demonym: 'Bolivarense'
  },
  { 
    id: 3, 
    name: 'Cañar', 
    capital: 'Azogues', 
    population: 227578, 
    area: 3231, 
    cantones: 7, 
    founded: '3 de noviembre de 1880', 
    region: 'Sierra', 
    color: '#9C27B0',
    flagEmoji: '🟡🔵🟢',
    description: 'Hogar de las ruinas incas de Ingapirca, el complejo arqueológico más importante de Ecuador.',
    demonym: 'Cañari'
  },
  { 
    id: 4, 
    name: 'Carchi', 
    capital: 'Tulcán', 
    population: 172828, 
    area: 3780, 
    cantones: 6, 
    founded: '19 de noviembre de 1880', 
    region: 'Sierra', 
    color: '#F44336',
    flagEmoji: '🔵⚪🔵',
    description: 'Frontera con Colombia, famosa por sus cementerios y el puente internacional Rumichaca.',
    demonym: 'Carchense'
  },
  { 
    id: 5, 
    name: 'Chimborazo', 
    capital: 'Riobamba', 
    population: 471933, 
    area: 6500, 
    cantones: 10, 
    founded: '25 de junio de 1824', 
    region: 'Sierra', 
    color: '#00BCD4',
    flagEmoji: '🔴🟡🟢',
    description: 'El volcán Chimborazo es el punto más cercano al sol desde la Tierra.',
    demonym: 'Chimboracense'
  },
  { 
    id: 6, 
    name: 'Cotopaxi', 
    capital: 'Latacunga', 
    population: 470210, 
    area: 6108, 
    cantones: 7, 
    founded: '1 de abril de 1851', 
    region: 'Sierra', 
    color: '#3F51B5',
    flagEmoji: '🔴🟡🔴',
    description: 'El volcán Cotopaxi es uno de los más altos y activos del mundo.',
    demonym: 'Cotopaxense'
  },
  { 
    id: 7, 
    name: 'El Oro', 
    capital: 'Machala', 
    population: 714592, 
    area: 5767, 
    cantones: 14, 
    founded: '23 de abril de 1884', 
    region: 'Costa', 
    color: '#FFC107',
    flagEmoji: '🟡🟢⚪',
    description: 'Capital bananera del mundo. Importante zona minera y portuaria.',
    demonym: 'Orense'
  },
  { 
    id: 8, 
    name: 'Esmeraldas', 
    capital: 'Esmeraldas', 
    population: 553900, 
    area: 15809, 
    cantones: 7, 
    founded: '20 de noviembre de 1847', 
    region: 'Costa', 
    color: '#4CAF50',
    flagEmoji: '🟢🟡🔴',
    description: 'Cultura afroecuatoriana, playas hermosas y la refinería de petróleo más grande del país.',
    demonym: 'Esmeraldeño/a'
  },
  { 
    id: 9, 
    name: 'Galápagos', 
    capital: 'Puerto Baquerizo Moreno', 
    population: 28583, 
    area: 8010, 
    cantones: 3, 
    founded: '18 de febrero de 1973', 
    region: 'Insular', 
    color: '#009688',
    flagEmoji: '🔵⚪🔵',
    description: 'Provincia insular, Patrimonio Natural de la Humanidad. Inspiró la teoría de la evolución de Darwin.',
    demonym: 'Galapagueño/a'
  },
  { 
    id: 10, 
    name: 'Guayas', 
    capital: 'Guayaquil', 
    population: 4391923, 
    area: 15515, 
    cantones: 25, 
    founded: '25 de junio de 1824', 
    region: 'Costa', 
    color: '#E91E63',
    flagEmoji: '🟡🔵🔴',
    description: 'La provincia más poblada. Guayaquil es el principal puerto y ciudad más grande del país.',
    demonym: 'Guayasense'
  },
  { 
    id: 11, 
    name: 'Imbabura', 
    capital: 'Ibarra', 
    population: 469879, 
    area: 4712, 
    cantones: 6, 
    founded: '25 de junio de 1824', 
    region: 'Sierra', 
    color: '#673AB7',
    flagEmoji: '🟢⚪🟢',
    description: 'Provincia de los lagos, artesanías y cultura indígena. Conocida como la provincia de los lagos.',
    demonym: 'Imbabureño/a'
  },
  { 
    id: 12, 
    name: 'Loja', 
    capital: 'Loja', 
    population: 485421, 
    area: 11063, 
    cantones: 16, 
    founded: '25 de junio de 1824', 
    region: 'Sierra', 
    color: '#FF5722',
    flagEmoji: '🔴🟡🔴',
    description: 'Centro cultural y musical del sur. Conocida como la "Capital Musical y Cultural del Ecuador".',
    demonym: 'Lojano/a'
  },
  { 
    id: 13, 
    name: 'Los Ríos', 
    capital: 'Babahoyo', 
    population: 898652, 
    area: 7205, 
    cantones: 13, 
    founded: '6 de octubre de 1860', 
    region: 'Costa', 
    color: '#FF9800',
    flagEmoji: '🟢⚪🟢',
    description: 'Tierra de ríos y producción agrícola. Importante zona arrocera y bananera.',
    demonym: 'Fluminense'
  },
  { 
    id: 14, 
    name: 'Manabí', 
    capital: 'Portoviejo', 
    population: 1592840, 
    area: 19428, 
    cantones: 22, 
    founded: '25 de junio de 1824', 
    region: 'Costa', 
    color: '#3F51B5',
    flagEmoji: '🔴🟢⚪',
    description: 'Playas espectaculares, cultura montuvia y la ciudad de Manta, importante puerto pesquero.',
    demonym: 'Manabita'
  },
  { 
    id: 15, 
    name: 'Morona Santiago', 
    capital: 'Macas', 
    population: 192508, 
    area: 25690, 
    cantones: 13, 
    founded: '10 de noviembre de 1953', 
    region: 'Amazonía', 
    color: '#8BC34A',
    flagEmoji: '🟢🟡🔵',
    description: 'Puerta de entrada a la Amazonía. Rica en biodiversidad y cultura shuar.',
    demonym: 'Moronense'
  },
  { 
    id: 16, 
    name: 'Napo', 
    capital: 'Tena', 
    population: 131672, 
    area: 12543, 
    cantones: 5, 
    founded: '10 de noviembre de 1959', 
    region: 'Amazonía', 
    color: '#FFC107',
    flagEmoji: '🟢🟡🟢',
    description: 'Capital de la biodiversidad. Ríos cristalinos y turismo ecológico.',
    demonym: 'Napense'
  },
  { 
    id: 17, 
    name: 'Orellana', 
    capital: 'El Coca', 
    population: 182166, 
    area: 21692, 
    cantones: 4, 
    founded: '30 de julio de 1998', 
    region: 'Amazonía', 
    color: '#FF5722',
    flagEmoji: '🟢⚫🟢',
    description: 'Principal zona petrolera del país. Puerta de entrada al Parque Nacional Yasuní.',
    demonym: 'Orellanense'
  },
  { 
    id: 18, 
    name: 'Pastaza', 
    capital: 'Puyo', 
    population: 111915, 
    area: 29641, 
    cantones: 4, 
    founded: '10 de noviembre de 1959', 
    region: 'Amazonía', 
    color: '#4CAF50',
    flagEmoji: '🟢🔵🟢',
    description: 'La provincia más extensa de la Amazonía. Cascadas, selva y comunidades indígenas.',
    demonym: 'Pastazense'
  },
  { 
    id: 19, 
    name: 'Pichincha', 
    capital: 'Quito', 
    population: 3089473, 
    area: 9536, 
    cantones: 8, 
    founded: '25 de junio de 1824', 
    region: 'Sierra', 
    color: '#E91E63',
    flagEmoji: '🔴🔵🔴',
    description: 'La capital de la república, Quito, primer Patrimonio Cultural de la Humanidad de la UNESCO.',
    demonym: 'Pichinchano/a'
  },
  { 
    id: 20, 
    name: 'Santa Elena', 
    capital: 'Santa Elena', 
    population: 385735, 
    area: 3690, 
    cantones: 3, 
    founded: '7 de noviembre de 2007', 
    region: 'Costa', 
    color: '#9C27B0',
    flagEmoji: '🟡🔵⚪',
    description: 'Playas, la península y el balneario de Salinas. Restos arqueológicos de la cultura Valdivia.',
    demonym: 'Santaelenense'
  },
  { 
    id: 21, 
    name: 'Santo Domingo de los Tsáchilas', 
    capital: 'Santo Domingo', 
    population: 492969, 
    area: 3770, 
    cantones: 2, 
    founded: '6 de noviembre de 2007', 
    region: 'Costa', 
    color: '#00BCD4',
    flagEmoji: '🟡🔵🟢',
    description: 'Pueblo Tsáchila con su cultura y tradiciones únicas. Centro de comercio y agricultura.',
    demonym: 'Santodomingueño/a'
  },
  { 
    id: 22, 
    name: 'Sucumbíos', 
    capital: 'Nueva Loja', 
    population: 199014, 
    area: 18084, 
    cantones: 7, 
    founded: '13 de febrero de 1989', 
    region: 'Amazonía', 
    color: '#FF9800',
    flagEmoji: '🟢🟡🟢',
    description: 'Zona fronteriza con Colombia. Importante producción petrolera y biodiversidad.',
    demonym: 'Sucumbiense'
  },
  { 
    id: 23, 
    name: 'Tungurahua', 
    capital: 'Ambato', 
    population: 563532, 
    area: 3386, 
    cantones: 9, 
    founded: '3 de julio de 1860', 
    region: 'Sierra', 
    color: '#F44336',
    flagEmoji: '🔴🟡🔴',
    description: 'Ciudad de las flores y las frutas. El volcán Tungurahua es uno de los más activos.',
    demonym: 'Tungurahuense'
  },
  { 
    id: 24, 
    name: 'Zamora Chinchipe', 
    capital: 'Zamora', 
    population: 110973, 
    area: 10556, 
    cantones: 9, 
    founded: '10 de noviembre de 1953', 
    region: 'Amazonía', 
    color: '#8BC34A',
    flagEmoji: '🟢🟡🟢',
    description: 'Puerta de entrada al Parque Nacional Podocarpus. Riqueza en oro y biodiversidad.',
    demonym: 'Zamorano/a'
  }
];

const searchTerm = ref('');
const provinces = ref<Province[]>(provincesData);

const filteredProvinces = computed(() => {
  if (!searchTerm.value) return provinces.value;
  return provinces.value.filter(p => 
    p.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    p.capital.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    p.region.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const totalCantones = computed(() => {
  return provinces.value.reduce((sum, p) => sum + p.cantones, 0);
});

const totalPoblacion = computed(() => {
  return provinces.value.reduce((sum, p) => sum + p.population, 0);
});

const filterProvinces = () => {
  // El computed se encarga automáticamente
};

const showProvinceDetails = async (province: Province) => {
  const alert = await alertController.create({
    header: province.name,
    subHeader: `Capital: ${province.capital}`,
    message: `
      <div style="text-align: left">
        <p><strong>Gentilicio:</strong> ${province.demonym}</p>
        <p><strong>Región:</strong> ${province.region}</p>
        <p><strong>Población:</strong> ${province.population.toLocaleString()} habitantes</p>
        <p><strong>Superficie:</strong> ${province.area.toLocaleString()} km²</p>
        <p><strong>Cantones:</strong> ${province.cantones}</p>
        <p><strong>Fundación:</strong> ${province.founded}</p>
        <p><strong>Descripción:</strong> ${province.description}</p>
        <p style="font-size: 2rem; text-align: center; margin: 10px 0">${province.flagEmoji}</p>
      </div>
    `,
    buttons: ['Cerrar']
  });
  await alert.present();
};
</script>

<style scoped>
.ecuador-content {
  --background: linear-gradient(145deg, #2E7D32 0%, #1B5E20 100%);
}

.search-container {
  padding: 16px;
}

.custom-searchbar {
  --background: rgba(255, 255, 255, 0.95);
  --border-radius: 12px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  padding: 0;
}

.stats-card {
  padding: 0 16px 16px;
}

.stats-card-content {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  margin: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2E7D32;
}

.stat-label {
  font-size: 0.7rem;
  color: #666;
}

.provinces-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 16px;
}

.province-card {
  margin: 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
  background: white;
}

.province-card:hover {
  transform: translateY(-5px);
}

.card-header {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.province-flag {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flag-emoji {
  font-size: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

ion-card-content {
  padding: 12px;
}

ion-card-content h2 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px;
}

ion-card-content p {
  font-size: 0.8rem;
  color: #666;
  margin: 4px 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

ion-card-content .capital {
  color: #2E7D32;
  font-weight: 500;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  color: white;
  text-align: center;
  padding: 20px;
}

.empty-icon {
  font-size: 80px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin: 0 0 10px;
}

.empty-state p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

/* Ajustes para toolbar */
ion-toolbar {
  --background: transparent;
  --border-color: transparent;
}

ion-title {
  color: white;
  font-weight: 600;
}
</style>