<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>GPS / Ubicación</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="gps-container">
        <ion-card v-if="location">
          <ion-card-header>
            <ion-card-title>Ubicación actual</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p><strong>Latitud:</strong> {{ location.latitude }}</p>
            <p><strong>Longitud:</strong> {{ location.longitude }}</p>
            <p><strong>Precisión:</strong> {{ location.accuracy }} metros</p>
            <p><strong>Altitud:</strong> {{ location.altitude || 'No disponible' }}</p>
          </ion-card-content>
        </ion-card>

        <ion-card v-else>
          <ion-card-header>
            <ion-card-title>Sin ubicación</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>Haz clic en "Obtener Ubicación" para ver tus coordenadas.</p>
          </ion-card-content>
        </ion-card>

        <ion-button expand="block" @click="getCurrentLocation" :disabled="loading">
          <ion-icon slot="start" :icon="locate"></ion-icon>
          {{ loading ? 'Obteniendo ubicación...' : 'Obtener Ubicación' }}
        </ion-button>

        <ion-button v-if="location" expand="block" color="secondary" @click="openInMaps" class="ion-margin-top">
          <ion-icon slot="start" :icon="map"></ion-icon>
          Ver en Google Maps
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon } from '@ionic/vue';
import { locate, map } from 'ionicons/icons';
import { Geolocation } from '@capacitor/geolocation';

const location = ref<any>(null);
const loading = ref(false);

const getCurrentLocation = async () => {
  loading.value = true;
  try {
    const coordinates = await Geolocation.getCurrentPosition();
    location.value = coordinates.coords;
  } catch (error) {
    console.error('Error obteniendo ubicación:', error);
    alert('No se pudo obtener la ubicación. Asegúrate de tener permisos activados.');
  } finally {
    loading.value = false;
  }
};

const openInMaps = () => {
  if (location.value) {
    const url = `https://www.google.com/maps?q=${location.value.latitude},${location.value.longitude}`;
    window.open(url, '_blank');
  }
};
</script>

<style scoped>
.gps-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

ion-card {
  margin: 0;
}
</style>