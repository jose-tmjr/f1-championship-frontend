<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/Header/HeaderComponent.vue';
import FooterComponent from './components/Footer/FooterComponent.vue';
</script>

<template>
  <HeaderComponent />
  <RouterView />
  <FooterComponent />
</template>
