<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-title>📍 GPS</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="loading" class="loading">
        <ion-spinner name="crescent"></ion-spinner>
        <p>Obteniendo ubicación...</p>
      </div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <ion-button expand="block" @click="getLocation">Reintentar</ion-button>
      </div>

      <div v-else-if="location">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Tu ubicación</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p><strong>Latitud:</strong> {{ location.latitude }}</p>
            <p><strong>Longitud:</strong> {{ location.longitude }}</p>
            <p><strong>Precisión:</strong> {{ location.accuracy }}m</p>
          </ion-card-content>
        </ion-card>
      </div>

      <ion-button v-else expand="block" @click="getLocation">
        Obtener ubicación
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, 
         IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonSpinner } from '@ionic/vue';

const location = ref<any>(null);
const loading = ref(false);
const error = ref('');

const getLocation = () => {
  loading.value = true;
  error.value = '';
  
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      location.value = pos.coords;
      loading.value = false;
    },
    (err) => {
      error.value = 'Error: ' + err.message;
      loading.value = false;
    }
  );
};
</script>

<style scoped>
.loading, .error {
  text-align: center;
  margin-top: 50px;
}
</style>