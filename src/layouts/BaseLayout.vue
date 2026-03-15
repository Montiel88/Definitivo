<template>
  <ion-page>
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar color="tertiary">
          <ion-title>Menú Principal</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-avatar slot="start">
              <img src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </ion-avatar>
            <ion-label>{{ userStore.userData?.usuario || 'Montiel88' }}</ion-label>
            <ion-button slot="end" size="small" color="danger" @click="handleLogout">Salir</ion-button>
          </ion-item>

          <ion-item-divider>
            <ion-label color="primary">Mis Aplicaciones</ion-label>
          </ion-item-divider>

          <ion-menu-toggle>
            <ion-item button @click="navegar('/app/ecuador')">
              <ion-icon :icon="earthOutline" slot="start" color="success"></ion-icon>
              <ion-label>🇪🇨 Provincias Ecuador</ion-label>
            </ion-item>
          </ion-menu-toggle>

          <ion-menu-toggle>
            <ion-item button @click="navegar('/app/rickymorty')">
              <ion-icon :icon="planetOutline" slot="start" color="tertiary"></ion-icon>
              <ion-label>👽 Rick & Morty</ion-label>
            </ion-item>
          </ion-menu-toggle>

          <ion-menu-toggle>
            <ion-item button @click="navegar('/app/gps')">
              <ion-icon :icon="locationOutline" slot="start" color="warning"></ion-icon>
              <ion-label>📍 GPS / Ubicación</ion-label>
            </ion-item>
          </ion-menu-toggle>

          <ion-menu-toggle>
            <ion-item button @click="navegar('/app/camara')">
              <ion-icon :icon="cameraOutline" slot="start" color="danger"></ion-icon>
              <ion-label>📸 Cámara</ion-label>
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ tituloPagina }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content id="main-content">
      <router-view />
      
      <!-- 🔥 BOTÓN SIGUIENTE en la esquina inferior DERECHA color AZUL -->
      <div class="siguiente-flotante">
        <ion-button 
          class="siguiente-btn"
          @click="irASiguiente">
          <ion-icon :icon="arrowForwardOutline" slot="start"></ion-icon>
          SIGUIENTE
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonList, IonItem, IonAvatar, IonLabel, IonButton, IonButtons,
  IonMenuButton, IonItemDivider, IonIcon, IonMenuToggle
} from '@ionic/vue';
import { earthOutline, planetOutline, locationOutline, cameraOutline, arrowForwardOutline } from 'ionicons/icons';
import { useUserStore } from '@/stores/user';
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const tituloPagina = computed(() => {
  if (route.path.includes('ecuador')) return 'Provincias Ecuador';
  if (route.path.includes('rickymorty')) return 'Rick & Morty';
  if (route.path.includes('gps')) return 'GPS / Ubicación';
  if (route.path.includes('camara')) return 'Cámara';
  return 'Inicio';
});

// Determinar la página actual
const paginaActual = computed(() => {
  if (route.path.includes('ecuador')) return 1;
  if (route.path.includes('rickymorty')) return 2;
  if (route.path.includes('gps')) return 3;
  if (route.path.includes('camara')) return 4;
  return 0;
});

function navegar(ruta: string) {
  router.push(ruta);
}

// 🔥 Función para el botón siguiente secuencial
function irASiguiente() {
  switch(paginaActual.value) {
    case 1: // Ecuador -> Rick & Morty
      router.push('/app/rickymorty');
      break;
    case 2: // Rick & Morty -> GPS
      router.push('/app/gps');
      break;
    case 3: // GPS -> Cámara
      router.push('/app/camara');
      break;
    case 4: // Cámara -> Ecuador (vuelve al inicio)
      router.push('/app/ecuador');
      break;
    default: // Cualquier otra -> Ecuador
      router.push('/app/ecuador');
  }
}

async function handleLogout() {
  await userStore.$setLogin(null);
  router.push('/login');
}
</script>

<style scoped>
ion-item-divider {
  margin-top: 16px;
  margin-bottom: 8px;
}

ion-item {
  --padding-start: 16px;
  --border-radius: 8px;
  margin: 4px 8px;
}

ion-item:hover {
  --background: rgba(98, 0, 234, 0.08);
}

/* 🔥 BOTÓN FLOTANTE EN ESQUINA INFERIOR DERECHA COLOR AZUL */
.siguiente-flotante {
  position: fixed;
  bottom: 20px;
  right: 20px;  /* 👈 Cambiado de left a right */
  z-index: 100;
  animation: fadeInUp 0.5s ease;
}

.siguiente-btn {
  --background: linear-gradient(145deg, #4a90e2, #357abd);  /* 👈 AZUL */
  --background-hover: linear-gradient(145deg, #357abd, #2a5f8a);
  --border-radius: 50px;
  --padding-top: 14px;
  --padding-bottom: 14px;
  --padding-start: 24px;
  --padding-end: 24px;
  --box-shadow: 0 8px 20px rgba(74, 144, 226, 0.4);
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0;
  transition: transform 0.3s, box-shadow 0.3s;
}

.siguiente-btn:hover {
  transform: translateY(-2px);
  --box-shadow: 0 12px 28px rgba(74, 144, 226, 0.6);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>