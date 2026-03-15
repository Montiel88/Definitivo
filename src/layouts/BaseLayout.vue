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
            <ion-label>{{ userStore.userData?.usuario || 'Usuario' }}</ion-label>
            <ion-button slot="end" size="small" color="danger" @click="handleLogout">Salir</ion-button>
          </ion-item>

          <ion-item-divider>
            <ion-label color="primary">Mis Aplicaciones</ion-label>
          </ion-item-divider>

          <ion-menu-toggle>
            <ion-item button @click="navegar('/ecuador')">
              <ion-icon :icon="earthOutline" slot="start" color="success"></ion-icon>
              <ion-label>🇪🇨 Provincias Ecuador</ion-label>
            </ion-item>
          </ion-menu-toggle>

          <ion-menu-toggle>
            <ion-item button @click="navegar('/rickymorty')">
              <ion-icon :icon="planetOutline" slot="start" color="tertiary"></ion-icon>
              <ion-label>👽 Rick & Morty</ion-label>
            </ion-item>
          </ion-menu-toggle>

          <ion-menu-toggle>
            <ion-item button @click="navegar('/gps')">
              <ion-icon :icon="locationOutline" slot="start" color="warning"></ion-icon>
              <ion-label>📍 GPS / Ubicación</ion-label>
            </ion-item>
          </ion-menu-toggle>

          <ion-menu-toggle>
            <ion-item button @click="navegar('/camara')">
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
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonList, IonItem, IonAvatar, IonLabel, IonButton, IonButtons,
  IonMenuButton, IonItemDivider, IonIcon, IonMenuToggle
} from '@ionic/vue';
import { earthOutline, planetOutline, locationOutline, cameraOutline } from 'ionicons/icons';
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

function navegar(ruta: string) {
  router.push(ruta);
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
</style>