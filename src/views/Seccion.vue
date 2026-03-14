<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="transparent">
        <ion-title>Inicio</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="welcome-content">
      <div class="welcome-container">
        <div class="hero-section">
          <div class="icon-wrapper">
            <ion-icon :icon="rocketOutline" class="hero-icon"></ion-icon>
          </div>
          <h1 class="welcome-title">¡Bienvenido!</h1>
          <p class="welcome-subtitle">Explora las increíbles funcionalidades de la app</p>
        </div>

        <div class="features-grid">
          <!-- ECUADOR (reemplaza a países) -->
          <div class="feature-card" @click="router.push('/ecuador')">
            <ion-icon :icon="flagOutline" class="feature-icon ecuador"></ion-icon>
            <h3>🇪🇨 Provincias Ecuador</h3>
            <p>24 provincias y capitales</p>
          </div>

          <!-- RICK & MORTY -->
          <div class="feature-card" @click="router.push('/rickymorty')">
            <ion-icon :icon="rocketOutline" class="feature-icon rick"></ion-icon>
            <h3>👽 Rick & Morty</h3>
            <p>Personajes de la serie</p>
          </div>

          <!-- CÁMARA -->
          <div class="feature-card" @click="router.push('/camera')">
            <ion-icon :icon="cameraOutline" class="feature-icon camera"></ion-icon>
            <h3>📷 Cámara</h3>
            <p>Toma fotos con tu dispositivo</p>
          </div>

          <!-- GPS -->
          <div class="feature-card" @click="router.push('/gps')">
            <ion-icon :icon="locateOutline" class="feature-icon gps"></ion-icon>
            <h3>📍 GPS</h3>
            <p>Obtén tu ubicación actual</p>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/vue';
import { rocketOutline, cameraOutline, locateOutline, flagOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>
.welcome-content {
  --background: linear-gradient(145deg, #667eea 0%, #764ba2 100%);
}

.welcome-container {
  padding: 20px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-section {
  text-align: center;
  margin-bottom: 40px;
  animation: fadeInDown 0.6s ease;
}

.icon-wrapper {
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

.hero-icon {
  font-size: 50px;
  color: white;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 10px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.welcome-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  animation: fadeInUp 0.8s ease;
}

.feature-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 20px 12px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.feature-icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.feature-icon.ecuador {
  color: #2E7D32;
}

.feature-icon.rick {
  color: #66bb6a;
}

.feature-icon.camera {
  color: #ffa726;
}

.feature-icon.gps {
  color: #ab47bc;
}

.feature-card h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 5px;
}

.feature-card p {
  font-size: 0.8rem;
  color: #666;
  margin: 0;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
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
}
</style>