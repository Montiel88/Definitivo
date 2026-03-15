import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import BaseLayout from '@/layouts/BaseLayout.vue';

import Login from '@/views/Login.vue';
import Registro from '@/views/Registro.vue';
import Inicio from '@/views/Inicio.vue'; // 👈 NUEVA
import Ecuador from '@/views/Ecuador.vue';
import Rickymorty from '@/views/Rickymorty.vue';
import Gps from '@/views/Gps.vue';
import Camara from '@/views/Camara.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/app',
    component: BaseLayout,
    children: [
      {
        path: '', // Ruta vacía = /app
        name: 'Inicio',
        component: Inicio
      },
      {
        path: 'ecuador',
        name: 'Ecuador',
        component: Ecuador
      },
      {
        path: 'rickymorty',
        name: 'Rickymorty',
        component: Rickymorty
      },
      {
        path: 'gps',
        name: 'Gps',
        component: Gps
      },
      {
        path: 'camara',
        name: 'Camara',
        component: Camara
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;