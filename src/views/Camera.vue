<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="transparent">
        <ion-title>📷 Cámara</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="camera-content">
      <div class="camera-container">
        <div v-if="photo" class="preview-container">
          <div class="photo-wrapper">
            <img :src="photo" class="photo-preview" />
          </div>
          
          <div class="action-buttons">
            <ion-button expand="block" @click="takePicture" class="primary-button">
              <ion-icon :icon="camera" slot="start"></ion-icon>
              Tomar otra foto
            </ion-button>
            
            <ion-button expand="block" @click="resetPhoto" class="secondary-button">
              <ion-icon :icon="trash" slot="start"></ion-icon>
              Eliminar foto
            </ion-button>
          </div>
        </div>

        <div v-else class="empty-state">
          <div class="icon-circle">
            <ion-icon :icon="camera" class="empty-icon"></ion-icon>
          </div>
          <h2>Sin fotos</h2>
          <p>Toma una foto para verla aquí</p>
          
          <ion-button expand="block" @click="takePicture" class="primary-button">
            <ion-icon :icon="camera" slot="start"></ion-icon>
            Abrir cámara
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/vue';
import { camera, trash } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const photo = ref<string | null>(null);

const takePicture = async () => {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt // ← ESTO ES CLAVE: fuerza a usar la cámara, no la galería
    });
    photo.value = image.webPath!;
  } catch (error) {
    console.error('Error al tomar foto', error);
  }
};

const resetPhoto = () => {
  photo.value = null;
};
</script>

<style scoped>
.camera-content {
  --background: linear-gradient(145deg, #ff6b6b 0%, #feca57 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.camera-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.empty-state {
  text-align: center;
  color: white;
  animation: fadeIn 0.6s ease;
}

.icon-circle {
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
}

.empty-icon {
  font-size: 50px;
  color: white;
}

.empty-state h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0 0 10px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.empty-state p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 30px;
}

.preview-container {
  animation: fadeIn 0.6s ease;
}

.photo-wrapper {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 10px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
}

.photo-preview {
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.primary-button {
  --background: white;
  --color: #ff6b6b;
  --border-radius: 12px;
  --box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  --padding-top: 16px;
  --padding-bottom: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.secondary-button {
  --background: rgba(255, 255, 255, 0.2);
  --color: white;
  --border-radius: 12px;
  --box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  --padding-top: 16px;
  --padding-bottom: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Ajustes para toolbar */
ion-toolbar {
  --background: transparent;
  --border-color: transparent;
}

ion-title {
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
}
</style>