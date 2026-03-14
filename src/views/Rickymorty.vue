<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="transparent">
        <ion-title>👽 Rick & Morty</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="rick-content">
      <div class="search-container">
        <ion-searchbar
          v-model="searchTerm"
          placeholder="Buscar personaje..."
          animated
          class="custom-searchbar"
          @ionInput="filterCharacters"
        ></ion-searchbar>
      </div>

      <div class="characters-grid" v-if="filteredCharacters.length > 0">
        <ion-card
          v-for="character in filteredCharacters"
          :key="character.id"
          class="character-card"
          button
          @click="showCharacterDetails(character)"
        >
          <img :src="character.image" :alt="character.name" class="character-image" />
          <ion-card-content>
            <h2>{{ character.name }}</h2>
            <div class="status-badge" :class="character.status.toLowerCase()">
              {{ character.status }}
            </div>
            <p>{{ character.species }}</p>
          </ion-card-content>
        </ion-card>
      </div>

      <div v-else class="empty-state">
        <ion-icon :icon="searchOutline" class="empty-icon"></ion-icon>
        <h3>No se encontraron personajes</h3>
        <p>Intenta con otro término de búsqueda</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonCard, IonCardContent, IonIcon, alertController
} from '@ionic/vue';
import { searchOutline } from 'ionicons/icons';
import axios from 'axios';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  origin: { name: string };
  location: { name: string };
}

const characters = ref<Character[]>([]);
const filteredCharacters = ref<Character[]>([]);
const searchTerm = ref('');

const fetchCharacters = async () => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    characters.value = response.data.results;
    filteredCharacters.value = response.data.results;
  } catch (error) {
    console.error('Error fetching characters:', error);
  }
};

const filterCharacters = () => {
  const term = searchTerm.value.toLowerCase();
  filteredCharacters.value = characters.value.filter(character =>
    character.name.toLowerCase().includes(term)
  );
};

const showCharacterDetails = async (character: Character) => {
  const alert = await alertController.create({
    header: character.name,
    message: `
      <strong>Estado:</strong> ${character.status}<br>
      <strong>Especie:</strong> ${character.species}<br>
      <strong>Origen:</strong> ${character.origin.name}<br>
      <strong>Ubicación:</strong> ${character.location.name}<br>
      <img src="${character.image}" style="width: 100%; margin-top: 10px; border-radius: 8px;">
    `,
    buttons: ['Cerrar']
  });
  await alert.present();
};

onMounted(fetchCharacters);
</script>

<style scoped>
.rick-content {
  --background: linear-gradient(145deg, #43e97b 0%, #38f9d7 100%);
}

.search-container {
  padding: 16px;
}

.custom-searchbar {
  --background: rgba(255, 255, 255, 0.95);
  --border-radius: 12px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0;
}

.characters-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 16px;
}

.character-card {
  margin: 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
  background: white;
}

.character-card:hover {
  transform: translateY(-5px);
}

.character-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

ion-card-content {
  padding: 12px;
}

ion-card-content h2 {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.status-badge.alive {
  background: #c8e6c9;
  color: #2e7d32;
}

.status-badge.dead {
  background: #ffcdd2;
  color: #c62828;
}

.status-badge.unknown {
  background: #e0e0e0;
  color: #616161;
}

ion-card-content p {
  font-size: 0.8rem;
  color: #666;
  margin: 0;
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