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
      <h1 class="text-2xl font-bold mb-4 text-white">Races</h1>
      <div class="flex flex-wrap gap-4">
        <div v-for="(race) in races" :key="race.raceId" class="bg-white rounded-lg shadow-md card flex flex-col">
          <h2 class="text-lg font-bold text-zinc-800 mb-2">{{ race.raceName }}</h2>
          <div v-if="race.driverResults.length > 0" class="mb-4">
            <h3 class="text-md font-semibold text-zinc-700">Top Drivers:</h3>
            <div class="flex justify-center items-end gap-1">
              <div :class="['bg-white rounded-lg shadow-md overflow-hidden podium-card', positionClass(2)]">
                <img :class="`w-full h-20 object-scale-down bg-team-${race.driverResults[1].driverTeamId}`"
                  :src="`assets/images/drivers/${race.driverResults[1].driverId}.png`"
                  :alt="`assets/images/drivers/${race.driverResults[1].driverId}.png`" />
                <div class="bg-zinc-800 flex flex-col sm:flex-row items-center sm:items-center">
                  <div class="position flex items-center self-stretch">
                    <p class="w-full text-center">2nd</p>
                  </div>
                  <div class="driver mt-1 sm:mt-0">
                    <h6 class="text-base font-bold text-white line-clamp-2"
                      :title="`${race.driverResults[1].driverName}`">{{ race.driverResults[1].driverName }}</h6>
                  </div>
                </div>
              </div>
              <div :class="['bg-white rounded-lg shadow-md overflow-hidden podium-card', positionClass(1)]">
                <img :class="`w-full h-20 object-scale-down bg-team-${race.driverResults[0].driverTeamId}`"
                  :src="`assets/images/drivers/${race.driverResults[0].driverId}.png`"
                  :alt="`assets/images/drivers/${race.driverResults[0].driverId}.png`" />
                <div class="bg-zinc-800 flex flex-col sm:flex-row items-center sm:items-center">
                  <div class="position flex items-center self-stretch">
                    <p class="w-full text-center">1st</p>
                  </div>
                  <div class="driver mt-1 sm:mt-0">
                    <h2 class="text-base font-bold text-white line-clamp-2"
                      :title="`${race.driverResults[0].driverName}`">{{ race.driverResults[0].driverName }}</h2>
                  </div>
                </div>
              </div>
              <div :class="['bg-white rounded-lg shadow-md overflow-hidden podium-card', positionClass(3)]">
                <img :class="`w-full h-20 object-scale-down bg-team-${race.driverResults[2].driverTeamId}`"
                  :src="`assets/images/drivers/${race.driverResults[2].driverId}.png`"
                  :alt="`assets/images/drivers/${race.driverResults[2].driverId}.png`" />
                <div class="bg-zinc-800 flex flex-col sm:flex-row items-center sm:items-center">
                  <div class="position flex items-center self-stretch">
                    <p class="w-full text-center">3rd</p>
                  </div>
                  <div class="driver mt-1 sm:mt-0">
                    <h6 class="text-base font-bold text-white line-clamp-2"
                      :title="`${race.driverResults[2].driverName}`">{{ race.driverResults[2].driverName }}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="race.driverResults.length === 0" class="flex flex-1 items-center justify-center">
            <img :src="`assets/images/races/${race.raceLocation}.png`" class="h-7/10 w-7/10 object-contain" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@/components/Races/BodyComponent.css"></style>
<style src="@/components/Races/BodyMobileComponent.css"></style>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import RaceService from "@/services/RaceService";
import type RaceResultsModel from "@/models/RaceResultsModel";


const races = ref<RaceResultsModel[]>([]);

async function loadRaces() {
  try {
    const service = await RaceService.create();

    await service.getRacesResults().then((response) => {
      races.value = response;
    });

  } catch (error) {
    isError.value = true;
    console.error("Erro ao carregar corridas:", error);
  } finally {
    isLoading.value = false;
  }
}

const isLoading = ref(true);
const isError = ref(false);

const positionClass = (position: number) => {
  return position === 1 ? ['w-40', 'm-2'] : ['w-40'];
};

onMounted(() => {
  loadRaces();
});
</script>
