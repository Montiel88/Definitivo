<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="transparent">
        <ion-title>📍 GPS / Ubicación</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="gps-content">
      <div class="gps-container">
        <div v-if="location" class="location-card">
          <div class="icon-circle">
            <ion-icon :icon="locate" class="location-icon"></ion-icon>
          </div>
          
          <h2>Ubicación actual</h2>
          
          <div class="coordinates-grid">
            <div class="coordinate-item">
              <span class="coordinate-label">Latitud</span>
              <span class="coordinate-value">{{ location.latitude.toFixed(6) }}</span>
            </div>
            <div class="coordinate-item">
              <span class="coordinate-label">Longitud</span>
              <span class="coordinate-value">{{ location.longitude.toFixed(6) }}</span>
            </div>
          </div>

          <div class="details-list">
            <div class="detail-item">
              <span class="detail-label">Precisión:</span>
              <span class="detail-value">{{ location.accuracy.toFixed(1) }} metros</span>
            </div>
            <div class="detail-item" v-if="location.altitude">
              <span class="detail-label">Altitud:</span>
              <span class="detail-value">{{ location.altitude.toFixed(1) }} metros</span>
            </div>
          </div>

          <div class="action-buttons">
            <ion-button expand="block" @click="getCurrentLocation" class="primary-button">
              <ion-icon :icon="refresh" slot="start"></ion-icon>
              Actualizar ubicación
            </ion-button>
            
            <ion-button expand="block" @click="openInMaps" class="secondary-button">
              <ion-icon :icon="map" slot="start"></ion-icon>
              Ver en Google Maps
            </ion-button>
          </div>
        </div>

        <div v-else class="empty-state">
          <div class="icon-circle">
            <ion-icon :icon="locate" class="empty-icon"></ion-icon>
          </div>
          <h2>Sin ubicación</h2>
          <p>Haz clic en "Obtener Ubicación" para ver tus coordenadas</p>
          
          <ion-button expand="block" @click="getCurrentLocation" :disabled="loading" class="primary-button">
            <ion-icon :icon="locate" slot="start"></ion-icon>
            {{ loading ? 'Obteniendo ubicación...' : 'Obtener Ubicación' }}
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/vue';
import { locate, map, refresh } from 'ionicons/icons';
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
.gps-content {
  --background: linear-gradient(145deg, #4facfe 0%, #00f2fe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.gps-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.empty-state {
  text-align: center;
  color: white;
  animation: fadeIn 0.6s ease;
}

.location-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 30px 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.6s ease;
}

.icon-circle {
  background: rgba(255, 255, 255, 0.2);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.location-icon, .empty-icon {
  font-size: 50px;
  color: white;
}

.empty-state h2, .location-card h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0 0 10px;
  color: #333;
}

.empty-state h2 {
  color: white;
}

.empty-state p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 30px;
}

.coordinates-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 20px 0;
}

.coordinate-item {
  background: #f5f5f5;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
}

.coordinate-label {
  display: block;
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 4px;
}

.coordinate-value {
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  color: #4facfe;
}

.details-list {
  background: #f5f5f5;
  border-radius: 12px;
  padding: 12px;
  margin: 20px 0;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  color: #666;
  font-size: 0.9rem;
}

.detail-value {
  font-weight: 600;
  color: #333;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.primary-button {
  --background: linear-gradient(145deg, #4facfe, #00f2fe);
  --color: white;
  --border-radius: 12px;
  --box-shadow: 0 8px 20px rgba(79, 172, 254, 0.4);
  --padding-top: 16px;
  --padding-bottom: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.secondary-button {
  --background: white;
  --color: #4facfe;
  --border-radius: 12px;
  --box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  --padding-top: 16px;
  --padding-bottom: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Ajustes para toolbar */
ion-toolbar {
  --background: transparent;
  --border-color: transparent;
}

ion-title {
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
}
</style>