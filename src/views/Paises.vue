<template>
    <ion-list>
        <ion-item v-for="pais in paises.slice(0, 20)" :key="pais.cca3">
            <ion-avatar slot="start">
                <img :src="pais.flags.png" :alt="pais.name.common">
            </ion-avatar>
            <ion-label>
                <h2>{{ pais.name.common }}</h2>
                <p>Capital: {{ pais.capital?.[0] || 'No tiene' }}</p>
                <p>Población: {{ pais.population.toLocaleString() }}</p>
            </ion-label>
        </ion-item>
    </ion-list>
</template>

<script lang="ts" setup>
import { IonList, IonItem, IonLabel, IonAvatar } from '@ionic/vue';
import { usePaisesStore } from '@/stores/paises';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const paisesStore = usePaisesStore();
const { paises } = storeToRefs(paisesStore);
const { cargarPaises } = paisesStore;

onMounted(() => {
    cargarPaises();
});
</script>