<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="primary">
        <ion-title>Bienvenido</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="inicio-content">
      <div class="welcome-container">
        <div class="avatar-circle">
          <ion-icon :icon="personCircle" size="large"></ion-icon>
        </div>
        <h1>Hola, {{ userStore.userData?.usuario || 'Usuario' }}</h1>
        <p class="subtitle">Selecciona una opción del menú para comenzar</p>

        <div class="features-grid">
          <div class="feature-card" @click="navegar('/app/ecuador')">
            <ion-icon :icon="earthOutline" class="feature-icon ec"></ion-icon>
            <h3>Provincias Ecuador</h3>
            <p>Explora las 24 provincias</p>
          </div>

          <div class="feature-card" @click="navegar('/app/rickymorty')">
            <ion-icon :icon="planetOutline" class="feature-icon rm"></ion-icon>
            <h3>Rick & Morty</h3>
            <p>Personajes de la serie</p>
          </div>

          <div class="feature-card" @click="navegar('/app/gps')">
            <ion-icon :icon="locationOutline" class="feature-icon gps"></ion-icon>
            <h3>GPS</h3>
            <p>Tu ubicación actual</p>
          </div>

          <div class="feature-card" @click="navegar('/app/camara')">
            <ion-icon :icon="cameraOutline" class="feature-icon cam"></ion-icon>
            <h3>Cámara</h3>
            <p>Toma fotografías</p>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/vue';
import { personCircle, earthOutline, planetOutline, locationOutline, cameraOutline } from 'ionicons/icons';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

function navegar(ruta: string) {
  router.push(ruta);
}
</script>

<style scoped>
.inicio-content {
  --background: linear-gradient(145deg, #667eea 0%, #764ba2 100%);
}

.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 20px;
  color: white;
  text-align: center;
}

.avatar-circle {
  background: rgba(255, 255, 255, 0.2);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.avatar-circle ion-icon {
  font-size: 60px;
  color: white;
}

h1 {
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 10px;
}

.subtitle {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 40px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 20px 10px;
  cursor: pointer;
  transition: transform 0.3s, background 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.25);
}

.feature-icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.feature-icon.ec { color: #4caf50; }
.feature-icon.rm { color: #ff9800; }
.feature-icon.gps { color: #2196f3; }
.feature-icon.cam { color: #f44336; }

.feature-card h3 {
  font-size: 1rem;
  margin: 0 0 5px;
  color: white;
}

.feature-card p {
  font-size: 0.8rem;
  opacity: 0.8;
  margin: 0;
  color: white;
}
</style>