import { defineStore } from "pinia";
import { ref } from "vue";

export const usePaisesStore = defineStore('paises', () => {
    // Estado
    const paises = ref<any[]>([]);
    const cargando = ref(false);
    const error = ref<string | null>(null);

    // Acción para consumir la API (con campos específicos)
    const cargarPaises = async () => {
        cargando.value = true;
        error.value = null;

        try {
            // Solicitar SOLO los campos que necesitamos
            const respuesta = await fetch(
                'https://restcountries.com/v3.1/all?fields=name,capital,population,flags,cca3'
            );
            
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }
            
            const datos = await respuesta.json();

            // Guardar en el store
            paises.value = datos;

            // Guardar en localStorage
            localStorage.setItem('paises', JSON.stringify(datos.slice(0, 50)));
        } catch (e) {
            error.value = 'Error al cargar países. Usando datos de respaldo.';
            console.error(e);
            
            // Datos de respaldo en caso de error
            paises.value = [
                { 
                    cca3: 'mex', 
                    name: { common: 'México' }, 
                    capital: ['Ciudad de México'], 
                    population: 128000000, 
                    flags: { png: 'https://flagcdn.com/mx.svg' } 
                },
                { 
                    cca3: 'esp', 
                    name: { common: 'España' }, 
                    capital: ['Madrid'], 
                    population: 47000000, 
                    flags: { png: 'https://flagcdn.com/es.svg' } 
                },
                { 
                    cca3: 'arg', 
                    name: { common: 'Argentina' }, 
                    capital: ['Buenos Aires'], 
                    population: 45000000, 
                    flags: { png: 'https://flagcdn.com/ar.svg' } 
                },
                { 
                    cca3: 'col', 
                    name: { common: 'Colombia' }, 
                    capital: ['Bogotá'], 
                    population: 51000000, 
                    flags: { png: 'https://flagcdn.com/co.svg' } 
                },
                { 
                    cca3: 'chl', 
                    name: { common: 'Chile' }, 
                    capital: ['Santiago'], 
                    population: 19000000, 
                    flags: { png: 'https://flagcdn.com/cl.svg' } 
                }
            ];
        } finally {
            cargando.value = false;
        }
    };

    // Cargar desde localStorage al iniciar (si existe)
    const paisesGuardados = localStorage.getItem('paises');
    if (paisesGuardados) {
        try {
            paises.value = JSON.parse(paisesGuardados);
        } catch (e) {
            console.error('Error al cargar países del localStorage');
        }
    }

    return {
        paises,
        cargando,
        error,
        cargarPaises
    };
});