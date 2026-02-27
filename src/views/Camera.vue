<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Cámara</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <div class="camera-container">
        <div v-if="photo" class="preview-container">
          <ion-img :src="photo" class="photo-preview" />
          <ion-button expand="block" @click="resetPhoto" color="medium">
            <ion-icon :icon="trash" slot="start"></ion-icon>
            Nueva foto
          </ion-button>
        </div>

        <div v-else class="upload-container">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref="fileInput"
            @change="handleFileSelect"
            style="display: none"
          />
          
          <div class="upload-placeholder" @click="triggerFileInput">
            <ion-icon :icon="cameraOutline" size="large"></ion-icon>
            <h3>Tomar foto</h3>
            <p>Haz clic para usar la cámara</p>
          </div>

          <ion-button expand="block" @click="triggerFileInput">
            <ion-icon slot="start" :icon="camera"></ion-icon>
            Abrir cámara
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonImg, IonButton, IonIcon 
} from '@ionic/vue';
import { cameraOutline, camera, trash } from 'ionicons/icons';

const photo = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      photo.value = e.target?.result as string;
    };
    reader.readAsDataURL(input.files[0]);
  }
};

const resetPhoto = () => {
  photo.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};
</script>

<style scoped>
.camera-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 16px;
}

.upload-container {
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.upload-placeholder {
  border: 2px dashed #ccc;
  border-radius: 12px;
  padding: 40px 20px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-placeholder:hover {
  border-color: #3880ff;
  background-color: #f0f4ff;
}

.upload-placeholder ion-icon {
  font-size: 64px;
  color: #666;
  margin-bottom: 16px;
}

.preview-container {
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.photo-preview {
  width: 100%;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>