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
                    <!-- Información del usuario -->
                    <ion-item>
                        <ion-avatar aria-hidden="true" slot="start">
                            <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                        </ion-avatar>
                        <ion-label>{{ userStore.userData?.usuario || 'Usuario' }}</ion-label>
                        <ion-button slot="end" fill="solid" size="small" @click="handleLogout">Salir</ion-button>
                    </ion-item>

                    <ion-accordion-group>
                        <!-- ========================================== -->
                        <!-- ACORDEÓN 1: MIS APIS -->
                        <!-- ========================================== -->
                        <ion-accordion value="mis-apis">
                            <ion-item slot="header" color="light">
                                <ion-label>
                                    <h2>🚀 Mis APIs</h2>
                                    <p>Consumidas con Pinia</p>
                                </ion-label>
                            </ion-item>
                            <div slot="content">
                                <ion-list>
                                    <ion-item button @click="irAPaises">
                                        <ion-label>🌍 Países del Mundo</ion-label>
                                    </ion-item>
                                    <ion-item button @click="irARickymorty">
                                        <ion-label>👽 Rick & Morty</ion-label>
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
    IonItem, IonLabel, IonList, IonAvatar, IonButton
} from '@ionic/vue';
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