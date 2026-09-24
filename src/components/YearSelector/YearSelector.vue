<template>
  <select class="ml-1 text-sm px-2 py-1 border rounded bg-[#131313] text-white" v-model="selectedSeason">
    <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
  </select>
</template>

<script lang="ts" setup>
import { selectedSeason } from "@/stores/SeasonStore";

const years = [2025, 2026];
</script>
