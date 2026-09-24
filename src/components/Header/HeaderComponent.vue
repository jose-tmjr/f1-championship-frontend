<template>
    <header>
        <div class="wrap">
            <!-- Botão do menu hambúrguer -->
            <button class="hamburger" @click="toggleMenu" aria-label="Menu">
                <span :class="{ open: isMenuOpen }"></span>
                <span :class="{ open: isMenuOpen }"></span>
                <span :class="{ open: isMenuOpen }"></span>
            </button>

            <div class="logo">
                <img :src="`/assets/logo.png`" alt="Tiltados F1" title="Tiltados F1" />
            </div>

            <!-- Navbar desktop -->
            <nav class="desktop-nav">
                <ul>
                    <li v-for="item in menuItems" :key="item.path">
                        <router-link :to="item.path">{{ item.label }}</router-link>
                    </li>
                </ul>
            </nav>

            <!-- Navbar mobile -->
            <nav class="mobile-nav" v-if="isMenuOpen">
                <ul>
                    <li v-for="item in menuItems" :key="item.path">
                        <router-link @click="toggleMenu" :to="item.path">{{ item.label }}</router-link>
                    </li>
                </ul>
            </nav>

            <div class="ml-4 flex items-center">
                <YearSelector />
            </div>
        </div>
    </header>
</template>

<style src="@/components/Header/HeaderComponent.css"></style>
<style src="@/components/Header/HeaderMobileComponent.css"></style>

<script lang="ts" setup>
import { ref } from "vue";
import YearSelector from "@/components/YearSelector/YearSelector.vue";

const menuItems = ref([
    { path: "/", label: "Home" },
    { path: "/drivers", label: "Drivers" },
    { path: "/races", label: "Races" }
]);

const isMenuOpen = ref(false);

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
}
</script>
