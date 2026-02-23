<template>
    <ion-grid>
        <ion-row>
            <ion-col size="6" size-md="4" size-lg="3" 
                     v-for="personaje in personajes" :key="personaje.id">
                <ion-card>
                    <ion-img :src="personaje.image" :alt="personaje.name"></ion-img>
                    <ion-card-header>
                        <ion-card-title>{{ personaje.name }}</ion-card-title>
                        <ion-card-subtitle>
                            {{ personaje.species }} - {{ personaje.status }}
                        </ion-card-subtitle>
                    </ion-card-header>
                </ion-card>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script lang="ts" setup>
import { IonGrid, IonRow, IonCol, IonCard, IonImg, 
         IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';
import { useRickymortyStore } from '@/stores/rickymorty';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const rickymortyStore = useRickymortyStore();
const { personajes } = storeToRefs(rickymortyStore);
const { cargarPersonajes } = rickymortyStore;

onMounted(() => {
    cargarPersonajes();
});
</script>