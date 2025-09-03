<template>
  <div v-if="isLoading" class="home-view flex content-center items-center justify-center">
    <button type="button"
      class="inline-flex cursor-not-allowed items-center rounded-md bg-red-500 px-4 py-2 text-sm leading-6 font-semibold text-white transition duration-150 ease-in-out hover:bg-indigo-400">
      <svg class="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>Processing…</button>
  </div>

  <div v-if="isError" class="home-view flex content-center items-center justify-center">
    <div class="error">
      <h1 class="text-2xl font-bold text-red-500">Error</h1>
      <p>An error occurred while loading the data.</p>
      <p>Please try again later.</p>
    </div>
  </div>

  <div v-if="!isLoading && !isError" class="home-view">
    <div class="wrap-page">
      <h1 class="text-2xl font-bold mb-4 ml-74 text-white">Drivers</h1>
      <div class="flex flex-wrap justify-center gap-8">
        <div v-for="(driver) in drivers" :key="driver.driverId" class="card flex flex-col">
          <div class="driver-card relative w-full h-full min-h-[250px] rounded-lg overflow-hidden flex items-end">
            <div :class="`absolute inset-0 w-full h-full bg-team-${driver.driverTeamId}`"></div>
            <img class="relative z-10 ml-60" :src="`assets/images/drivers/${driver.driverId}.png`"
              :alt="`assets/images/drivers/${driver.driverId}.png`" />
            <div class="absolute top-0 left-0 w-full p-2 z-20 text-sm">
              <span class="text-white">Grand Prix Wins: {{ driver.driverWins }}</span>
              <br />
              <span class="text-white">Grand Prix Podiums: {{ driver.driverPodiums }}</span>
              <br />
              <span class="text-white">Grand Prix Poles: {{ driver.driverPoles }}</span>
            </div>
            <div class="absolute bottom-0 left-0 w-full p-2 bg-black/40 z-20">
              <span class="text-white text-lg">{{ driver.driverName }}</span>
              <br />
              <span class="text-white text-lg">{{ driver.driverTeamName }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@/components/Drivers/BodyComponent.css"></style>
<style src="@/components/Drivers/BodyMobileComponent.css"></style>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import DriversService from "@/services/DriversService";
import type DriverHistoryModel from "@/models/DriverHistoryModel";


const drivers = ref<DriverHistoryModel[]>([]);

async function loadDrivers() {
  try {
    const service = await DriversService.create();

    await service.getDriversResults().then((response) => {
      drivers.value = response;
    });

  } catch (error) {
    isError.value = true;
    console.error("Erro ao carregar pilotos:", error);
  } finally {
    isLoading.value = false;
  }
}

const isLoading = ref(true);
const isError = ref(false);

onMounted(() => {
  loadDrivers();
});
</script>
