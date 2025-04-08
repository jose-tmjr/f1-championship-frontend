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

            <!-- Navbar normal (desktop) -->
            <nav class="desktop-nav">
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/drivers">Drivers</router-link></li>
                    <li><router-link to="/constructors">Constructors</router-link></li>
                </ul>
            </nav>

            <!-- Navbar mobile -->
            <nav class="mobile-nav" v-if="isMenuOpen">
                <ul>
                    <li><router-link @click="toggleMenu" to="/">Home</router-link></li>
                    <li><router-link @click="toggleMenu" to="/drivers">Drivers</router-link></li>
                    <li><router-link @click="toggleMenu" to="/constructors">Constructors</router-link></li>
                </ul>
            </nav>

            <button @click="clearAppCache"
                class="bg-transparent hover:bg-red-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-white-500 hover:border-transparent rounded update-button ">
                Update Data
            </button>
        </div>
    </header>
</template>


<style src="@/components/Header/HeaderComponent.css"></style>
<style src="@/components/Header/HeaderMobileComponent.css"></style>

<script lang="ts" setup>
import { ref } from "vue";
import { clearCache } from "@/utils/CacheUtils";

const isMenuOpen = ref(false);

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
}

function clearAppCache() {
    clearCache();
}
</script>
