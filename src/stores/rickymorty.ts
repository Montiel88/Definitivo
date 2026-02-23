import { defineStore } from "pinia";
import { ref } from "vue";

export const useRickymortyStore = defineStore('rickymorty', () => {
    // Estado
    const personajes = ref<any[]>([]);
    const cargando = ref(false);
    const error = ref<string | null>(null);

    // Acción para consumir la API
    const cargarPersonajes = async () => {
        cargando.value = true;
        error.value = null;
        
        try {
            const respuesta = await fetch('https://rickandmortyapi.com/api/character');
            const datos = await respuesta.json();
            
            // Guardar en el store
            personajes.value = datos.results;
            
            // Guardar en localStorage
            localStorage.setItem('personajes', JSON.stringify(datos.results));
        } catch (e) {
            error.value = 'Error al cargar personajes';
            console.error(e);
        } finally {
            cargando.value = false;
        }
    };

    // Cargar desde localStorage al iniciar
    const personajesGuardados = localStorage.getItem('personajes');
    if (personajesGuardados) {
        personajes.value = JSON.parse(personajesGuardados);
    }

    return {
        personajes,
        cargando,
        error,
        cargarPersonajes
    };
});