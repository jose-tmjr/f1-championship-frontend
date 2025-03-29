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
    <div class="main-top">
      <div class="highlight-banners">
        <div class="wrap flex justify-center items-end gap-0">
          <HighlightCard :position="2" :name="drivers[1].name" :points="drivers[1].points" :imageId="drivers[1].id"
            :bgId="drivers[1].teamId" />

          <HighlightCard :position="1" :name="drivers[0].name" :points="drivers[0].points" :imageId="drivers[0].id"
            :bgId="drivers[0].teamId" />

          <HighlightCard :position="3" :name="drivers[2].name" :points="drivers[2].points" :imageId="drivers[2].id"
            :bgId="drivers[2].teamId" />
        </div>
      </div>
      <div class="p-6 wrap">
        <h1 class="text-2xl font-bold mb-4 text-white">Drivers</h1>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-dark text-white">
              <th class="p-3">POS</th>
              <th class="p-3">Name</th>
              <th class="p-3">Team</th>
              <th class="p-3">Points</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(driver, index) in drivers" :key="driver.id">
              <td class="p-3">{{ index + 1 }}</td>
              <td class="p-3">{{ driver.name }}</td>
              <td class="p-3">{{ driver.teamName }}</td>
              <td class="p-3">{{ driver.points }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="main-bottom bg-zinc-800">
      <div class="wrap flex justify-center items-end gap-0">
        <HighlightCard :is-driver="false" :position="2" :name="constructors[1].teamName"
          :points="constructors[1].points" :imageId="constructors[1].teamId" :bgId="constructors[1].teamId" />

        <HighlightCard :is-driver="false" :position="1" :name="constructors[0].teamName"
          :points="constructors[0].points" :imageId="constructors[0].teamId" :bgId="constructors[0].teamId" />

        <HighlightCard :is-driver="false" :position="3" :name="constructors[2].teamName"
          :points="constructors[2].points" :imageId="constructors[2].teamId" :bgId="constructors[2].teamId" />
      </div>

      <div class="p-6 wrap">
        <h1 class="text-2xl font-bold mb-4 text-white">Constructors</h1>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-dark text-white">
              <th class="p-3">POS</th>
              <th class="p-3">Team</th>
              <th class="p-3">Drivers</th>
              <th class="p-3"></th>
              <th class="p-3">Points</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(constructor, index) in constructors" :key="constructor.teamId">
              <td class="p-3">{{ index + 1 }}</td>
              <td class="p-3">{{ constructor.teamName }}</td>
              <td class="p-3">{{ constructor.driversName }}</td>
              <td class="p-3"><img class="w-20 h-auto object-contain"
                  :src="`src/assets/images/cars/${constructor.teamId}.png`" alt="Card Image" /></td>
              <td class="p-3">{{ constructor.points }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import './bodyComponent.css';
import { ref, onMounted } from "vue";
import HomeService from "@/services/HomeService";
import type DriverModel from "@/models/driverModel";
import type ConstructorModel from "@/models/constructorModel";
import HighlightCard from './widgets/HighlightCard.vue';

const drivers = ref<DriverModel[]>([]);
const constructors = ref<ConstructorModel[]>([]);

async function loadDrivers() {
  try {
    const service = await HomeService.create();

    await service.getHomeData().then((response) => {
      drivers.value = response.drivers;
      constructors.value = response.constructors;
    });

  } catch (error) {
    isError.value = true;
    console.error("Erro ao carregar motoristas:", error);
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
