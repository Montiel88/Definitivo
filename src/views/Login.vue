<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar color="transparent">
                <ion-title>👋 Bienvenido</ion-title>
            </ion-toolbar>
        </ion-header>
        
        <ion-content class="login-content">
            <div class="login-container">
                <!-- Animación de entrada -->
                <div class="logo-container">
                    <div class="logo-circle">
                        <ion-icon :icon="logInOutline" class="logo-icon"></ion-icon>
                    </div>
                    <h1>Iniciar Sesión</h1>
                    <p>Ingresa tus credenciales para continuar</p>
                </div>

                <ion-progress-bar v-if="loading" type="indeterminate" class="custom-progress"></ion-progress-bar>

                <!-- Tarjeta de login con sombra y blur -->
                <ion-card class="login-card">
                    <ion-card-content>
                        <!-- Campo Usuario con icono -->
                        <ion-item lines="none" class="input-item">
                            <ion-icon :icon="personOutline" slot="start" class="input-icon"></ion-icon>
                            <ion-input 
                                label="Usuario"
                                label-placement="floating"
                                :disabled="loading"
                                fill="outline"
                                v-model="userStore.login.username"
                                placeholder="Ingresa tu usuario">
                            </ion-input>
                        </ion-item>

                        <!-- Campo Contraseña con icono -->
                        <ion-item lines="none" class="input-item">
                            <ion-icon :icon="lockClosedOutline" slot="start" class="input-icon"></ion-icon>
                            <ion-input 
                                label="Contraseña"
                                label-placement="floating"
                                :disabled="loading"
                                fill="outline"
                                placeholder="Ingresa tu contraseña"
                                v-model="userStore.login.password"
                                @keyup.enter="handleLogin"
                                type="password">
                            </ion-input>
                        </ion-item>

                        <!-- Checkbox "Recordar mis datos" -->
                        <div class="checkbox-container">
                            <ion-checkbox v-model="rememberMe" class="custom-checkbox"></ion-checkbox>
                            <ion-label class="checkbox-label">Recordar mis datos</ion-label>
                        </div>

                        <!-- Botón de login con efecto hover -->
                        <ion-button 
                            expand="block" 
                            @click="handleLogin"
                            :disabled="loading"
                            class="login-button">
                            <span v-if="!loading">Ingresar</span>
                            <ion-spinner v-if="loading" name="crescent"></ion-spinner>
                        </ion-button>
                    </ion-card-content>
                </ion-card>

                <!-- Enlace a registro -->
                <div class="register-link">
                    <p>¿No tienes cuenta? 
                        <ion-button fill="clear" @click="router.push({ name: 'Registro'})" class="register-button">
                            Regístrate aquí
                        </ion-button>
                    </p>
                </div>

                <!-- Mensaje de demostración -->
                <div class="demo-info">
                    <p>Demo: usuario / 123456</p>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, alertController, 
    IonItem, IonInput, IonButton, IonLabel, IonButtons, IonSpinner, IonProgressBar,
    IonCard, IonCardContent, IonIcon, IonCheckbox } from '@ionic/vue';
import { logInOutline, personOutline, lockClosedOutline } from 'ionicons/icons';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const userStore = useUserStore();
const router = useRouter();
const loading = ref(false);
const rememberMe = ref(false);

// Cargar datos guardados al iniciar
onMounted(() => {
    const savedUser = localStorage.getItem('savedUser');
    if (savedUser) {
        const { username, password } = JSON.parse(savedUser);
        userStore.login.username = username;
        userStore.login.password = password;
        rememberMe.value = true;
    }
});

function handleLogin() {
    loading.value = true;
    userStore.$login().then( res => {
        loading.value = false;
        
        // Guardar datos si "Recordar" está marcado
        if (rememberMe.value) {
            localStorage.setItem('savedUser', JSON.stringify({
                username: userStore.login.username,
                password: userStore.login.password
            }));
        } else {
            localStorage.removeItem('savedUser');
        }
        
        router.push('/app');
    }).catch( error => {
        alertController.create({
            header: 'Error de inicio de sesión',
            message: error.response?.data?.message || 'Usuario o contraseña incorrectos',
            buttons: ['Continuar'],
        }).then(alert => alert.present());
        loading.value = false;
    })
}
</script>

<style scoped>
.login-content {
    --background: linear-gradient(145deg, #667eea 0%, #764ba2 100%);
}

.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100%;
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
}

/* Animación del logo */
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

.logo-container {
    text-align: center;
    margin-bottom: 30px;
    animation: fadeInDown 0.8s ease;
}

.logo-circle {
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
    transition: transform 0.3s;
}

.logo-circle:hover {
    transform: scale(1.05);
}

.logo-icon {
    font-size: 50px;
    color: white;
}

.logo-container h1 {
    color: white;
    font-size: 2rem;
    font-weight: 600;
    margin: 0 0 10px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.logo-container p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1rem;
    margin: 0;
}

.login-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 24px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    animation: fadeInUp 0.8s ease;
    margin-bottom: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.input-item {
    --background: transparent;
    --padding-start: 0;
    --inner-padding-end: 0;
    margin-bottom: 20px;
    --border-radius: 12px;
}

.input-icon {
    color: #667eea;
    font-size: 24px;
    margin-right: 10px;
}

/* Estilo para los inputs */
ion-input {
    --padding-start: 12px;
    --padding-end: 12px;
    --padding-top: 16px;
    --padding-bottom: 16px;
    --border-radius: 12px;
    --background: rgba(255, 255, 255, 0.9);
    --border-color: #e0e0e0;
    --border-width: 1px;
    --border-style: solid;
    font-size: 1rem;
}

ion-input:focus {
    --border-color: #667eea;
    --border-width: 2px;
}

.checkbox-container {
    display: flex;
    align-items: center;
    margin: 16px 0;
    gap: 10px;
}

.custom-checkbox {
    --size: 22px;
    --background-checked: #667eea;
    --border-color-checked: #667eea;
    --border-radius: 6px;
}

.checkbox-label {
    color: #333;
    font-size: 0.95rem;
}

.login-button {
    --background: linear-gradient(145deg, #667eea, #764ba2);
    --background-hover: linear-gradient(145deg, #764ba2, #667eea);
    --border-radius: 12px;
    --padding-top: 16px;
    --padding-bottom: 16px;
    --box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: transform 0.3s;
}

.login-button:hover {
    transform: translateY(-2px);
}

.register-link {
    text-align: center;
    animation: fadeInUp 0.8s ease;
}

.register-link p {
    color: white;
    font-size: 0.95rem;
}

.register-button {
    --color: white;
    font-weight: 600;
    text-decoration: underline;
}

.demo-info {
    text-align: center;
    margin-top: 20px;
    animation: fadeInUp 0.8s ease;
}

.demo-info p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.85rem;
    background: rgba(0, 0, 0, 0.2);
    padding: 8px 16px;
    border-radius: 20px;
    display: inline-block;
}

.custom-progress {
    --progress-background: linear-gradient(145deg, #ffd700, #ffa500);
    margin-bottom: 10px;
}
</style>