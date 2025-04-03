<template>
    <header>
        <div class="wrap">
            <div class="logo">
                <img :src="`/assets/logo.png`" alt="Tiltados F1" title="Tiltados F1" />
            </div>
            <nav>
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/drivers">Drivers</router-link></li>
                    <li><router-link to="/constructors">Constructors</router-link></li>
                </ul>
            </nav>

            <button @click="clearAppCache"
                class="bg-transparent hover:bg-red-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-white-500 hover:border-transparent rounded">
                Update Data
            </button>
        </div>
    </header>
</template>

<style src="@/components/Header/HeaderComponent.css"></style>

<script lang="ts" setup>
import { clearCache } from "@/utils/CacheUtils";

function clearAppCache() {
    clearCache();
}
</script>
