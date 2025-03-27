<script setup lang="ts">
import { RouterView } from 'vue-router'
import './components/Home/BodyComponent.css';
import HeaderComponent from './components/Header/HeaderComponent.vue';
</script>

<template>
  <HeaderComponent />

  <RouterView />
</template>
