<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="danger">
        <ion-title>📸 Cámara</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <video ref="video" autoplay class="video"></video>
      
      <div class="buttons">
        <ion-button expand="block" @click="takePhoto">
          Tomar foto
        </ion-button>
      </div>

      <img v-if="photo" :src="photo" class="photo" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';

const video = ref<HTMLVideoElement>();
const photo = ref('');

onMounted(async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  if (video.value) {
    video.value.srcObject = stream;
  }
});

const takePhoto = () => {
  const canvas = document.createElement('canvas');
  canvas.width = video.value!.videoWidth;
  canvas.height = video.value!.videoHeight;
  canvas.getContext('2d')?.drawImage(video.value!, 0, 0);
  photo.value = canvas.toDataURL('image/jpeg');
};
</script>

<style scoped>
.video {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 16px;
}

.buttons {
  margin-bottom: 16px;
}

.photo {
  width: 100%;
  border-radius: 8px;
}
</style>