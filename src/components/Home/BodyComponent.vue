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
          <div class="w-60 bg-white rounded-lg shadow-md overflow-hidden podium-card">
            <img :class="`w-full h-40 object-scale-down bg-team-${drivers[1].teamId}`"
              :src="`src/assets/images/drivers/${drivers[1].id}.png`" alt="Card Image" />
            <div class="bg-zinc-800 flex items-center">
              <div class="position">
                2nd
              </div>
              <div class="driver">
                <h2 class="text-xl font-bold text-white"> {{ drivers[1].name }}</h2>
                <p class="text-white font-bold mt-2">
                  {{ drivers[1].points }} points
                </p>
              </div>
            </div>
          </div>

          <div class="w-75 bg-white rounded-lg shadow-md overflow-hidden m-10 podium-card">
            <img :class="`w-full h-40 object-scale-down bg-team-${drivers[0].teamId}`"
              :src="`src/assets/images/drivers/${drivers[0].id}.png`" alt="Card Image" />
            <div class="bg-zinc-800 flex items-center">
              <div class="position">
                1st
              </div>
              <div class="driver">
                <h2 class="text-xl font-bold text-white"> {{ drivers[0].name }}</h2>
                <p class="text-white font-bold mt-2">
                  {{ drivers[0].points }} points
                </p>
              </div>
            </div>
          </div>

          <div class="w-60 bg-white rounded-lg shadow-md overflow-hidden podium-card">
            <img :class="`w-full h-40 object-scale-down bg-team-${drivers[2].teamId}`"
              :src="`src/assets/images/drivers/${drivers[2].id}.png`" alt="Card Image" />
            <div class="bg-zinc-800 flex items-center">
              <div class="position">
                3rd
              </div>
              <div class="driver">
                <h2 class="text-xl font-bold text-white"> {{ drivers[2].name }}</h2>
                <p class="text-white font-bold mt-2">
                  {{ drivers[2].points }} points
                </p>
              </div>
            </div>
          </div>
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
        <div class="w-60 bg-white rounded-lg shadow-md overflow-hidden podium-card">
          <img :class="`w-full h-40 object-scale-down bg-team-${constructors[1].teamId}`"
            :src="`src/assets/images/constructors/${constructors[1].teamId}.png`" alt="Card Image" />
          <div class="bg-zinc-800 flex items-center">
            <div class="position">
              2nd
            </div>
            <div class="driver">
              <h2 class="text-xl font-bold text-white"> {{ constructors[1].teamName }}</h2>
              <p class="text-white font-bold mt-2">
                {{ constructors[1].points }} points
              </p>
            </div>
          </div>
        </div>

        <div class="w-75 bg-white rounded-lg shadow-md overflow-hidden m-10 podium-card">
          <img :class="`w-full h-40 object-scale-down bg-team-${constructors[0].teamId}`"
            :src="`src/assets/images/constructors/${constructors[0].teamId}.png`" alt="Card Image" />
          <div class="bg-zinc-800 flex items-center">
            <div class="position">
              1st
            </div>
            <div class="driver">
              <h2 class="text-xl font-bold text-white"> {{ constructors[0].teamName }}</h2>
              <p class="text-white font-bold mt-2">
                {{ constructors[0].points }} points
              </p>
            </div>
          </div>
        </div>

        <div class="w-60 bg-white rounded-lg shadow-md overflow-hidden podium-card">
          <img :class="`w-full h-40 object-scale-down bg-team-${constructors[2].teamId}`"
            :src="`src/assets/images/constructors/${constructors[2].teamId}.png`" alt="Card Image" />
          <div class="bg-zinc-800 flex items-center">
            <div class="position">
              3rd
            </div>
            <div class="driver">
              <h2 class="text-xl font-bold text-white"> {{ constructors[2].teamName }}</h2>
              <p class="text-white font-bold mt-2">
                {{ constructors[2].points }} points
              </p>
            </div>
          </div>
        </div>
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
