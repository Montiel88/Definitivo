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
                        <ion-avatar aria-hidden="true" slot="start">
                            <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                        </ion-avatar>
                        <ion-label>{{ userStore.userData?.usuario || 'Usuario' }}</ion-label>
                        <ion-button slot="end" fill="solid" size="small" @click="handleLogout">Salir</ion-button>
                    </ion-item>

                    <ion-accordion-group>
                        <!-- ========================================== -->
                        <!-- ACORDEÓN 1: MIS APIS (TUS APLICACIONES) -->
                        <!-- ========================================== -->
                        <ion-accordion value="mis-apis">
                            <ion-item slot="header" color="light">
                                <ion-label>
                                    <h2>🚀 Mis APIs</h2>
                                    <p>Aplicaciones desarrolladas</p>
                                </ion-label>
                            </ion-item>
                            <div slot="content">
                                <ion-list>
                                    <ion-item button @click="irAPaises" detail>
                                        <ion-icon :icon="globeOutline" slot="start" color="primary"></ion-icon>
                                        <ion-label>
                                            <h2>🌍 Países del Mundo</h2>
                                            <p>RestCountries API</p>
                                        </ion-label>
                                    </ion-item>
                                    <ion-item button @click="irARickymorty" detail>
                                        <ion-icon :icon="rocketOutline" slot="start" color="success"></ion-icon>
                                        <ion-label>
                                            <h2>👽 Rick & Morty</h2>
                                            <p>Personajes de la serie</p>
                                        </ion-label>
                                    </ion-item>
                                    <!-- NUEVAS OPCIONES DE HARDWARE -->
                                    <ion-item button @click="irACamera" detail>
                                        <ion-icon :icon="cameraOutline" slot="start" color="warning"></ion-icon>
                                        <ion-label>
                                            <h2>📷 Cámara</h2>
                                            <p>Tomar fotos con el dispositivo</p>
                                        </ion-label>
                                    </ion-item>
                                    <ion-item button @click="irAGps" detail>
                                        <ion-icon :icon="locateOutline" slot="start" color="tertiary"></ion-icon>
                                        <ion-label>
                                            <h2>📍 GPS / Ubicación</h2>
                                            <p>Obtener coordenadas actuales</p>
                                        </ion-label>
                                    </ion-item>
                                </ion-list>
                            </div>
                        </ion-accordion>

                        <!-- ========================================== -->
                        <!-- ACORDEÓN 2: DEL PROFESOR (First Accordion) -->
                        <!-- ========================================== -->
                        <ion-accordion value="first">
                            <ion-item slot="header" color="light">
                                <ion-label>First Accordion</ion-label>
                            </ion-item>
                            <div slot="content">
                                <ion-list>
                                    <ion-item>
                                        <ion-label>Pokémon Yellow</ion-label>
                                    </ion-item>
                                    <ion-item>
                                        <ion-label>Mega Man X</ion-label>
                                    </ion-item>
                                    <ion-item>
                                        <ion-label>The Legend of Zelda</ion-label>
                                    </ion-item>
                                    <ion-item>
                                        <ion-label>Pac-Man</ion-label>
                                    </ion-item>
                                    <ion-item>
                                        <ion-label>Super Mario World</ion-label>
                                    </ion-item>
                                </ion-list>
                            </div>
                        </ion-accordion>

                        <!-- ========================================== -->
                        <!-- ACORDEÓN 3: DEL PROFESOR (Second Accordion) -->
                        <!-- ========================================== -->
                        <ion-accordion value="second">
                            <ion-item slot="header" color="light">
                                <ion-label>Second Accordion</ion-label>
                            </ion-item>
                            <div slot="content">
                                <ion-list>
                                    <ion-item>
                                        <ion-label>Pokémon Yellow</ion-label>
                                    </ion-item>
                                    <ion-item>
                                        <ion-label>Mega Man X</ion-label>
                                    </ion-item>
                                    <ion-item>
                                        <ion-label>The Legend of Zelda</ion-label>
                                    </ion-item>
                                    <ion-item>
                                        <ion-label>Pac-Man</ion-label>
                                    </ion-item>
                                    <ion-item>
                                        <ion-label>Super Mario World</ion-label>
                                    </ion-item>
                                </ion-list>
                            </div>
                        </ion-accordion>

                        <!-- ========================================== -->
                        <!-- ACORDEÓN 4: DEL PROFESOR (Third Accordion) -->
                        <!-- ========================================== -->
                        <ion-accordion value="third">
                            <ion-item slot="header" color="light">
                                <ion-label>Third Accordion</ion-label>
                            </ion-item>
                            <div slot="content">
                                <ion-list>
                                    <ion-item>
                                        <ion-label>Pokémon Yellow</ion-label>
                                    </ion-item>
                                    <ion-item>
                                        <ion-label>Mega Man X</ion-label>
                                    </ion-item>
                                    <ion-item>
                                        <ion-label>The Legend of Zelda</ion-label>
                                    </ion-item>
                                    <ion-item>
                                        <ion-label>Pac-Man</ion-label>
                                    </ion-item>
                                    <ion-item>
                                        <ion-label>Super Mario World</ion-label>
                                    </ion-item>
                                </ion-list>
                            </div>
                        </ion-accordion>
                    </ion-accordion-group>
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

        <ion-content id="main-content" class="ion-padding">
            <router-view />
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton,
    IonPage, IonTitle, IonToolbar, IonAccordion, IonAccordionGroup,
    IonItem, IonLabel, IonList, IonAvatar, IonButton, IonIcon
} from '@ionic/vue';
import { cameraOutline, locateOutline, globeOutline, rocketOutline } from 'ionicons/icons';
import { useUserStore } from '@/stores/user';
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

// Título dinámico según la página
const tituloPagina = computed(() => {
    switch (route.name) {
        case 'Paises': return '🌍 Países del Mundo';
        case 'Rickymorty': return '👽 Rick & Morty';
        case 'Camera': return '📷 Cámara';
        case 'Gps': return '📍 GPS / Ubicación';
        default: return 'Inicio';
    }
});

async function handleLogout() {
    await userStore.$setLogin(null);
    router.push('/login');
}

function irAPaises() {
    router.push('/paises');
}

function irARickymorty() {
    router.push('/rickymorty');
}

function irACamera() {
    router.push('/camera');
}

function irAGps() {
    router.push('/gps');
}
</script>

<style scoped>
ion-menu::part(backdrop) {
    background-color: rgba(255, 0, 255, 0.5);
}

ion-menu::part(container) {
    border-radius: 0 20px 20px 0;
    box-shadow: 4px 0px 16px rgba(255, 0, 255, 0.18);
}

ion-accordion {
    margin: 5px 0;
}

ion-accordion ion-item[slot="header"] {
    --background: #f4f5f8;
    --border-radius: 8px;
}
</style>