<template>

  <div v-if="loading" class="home-view h-screen flex content-center items-center justify-center">
    <div role="status">
      <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor" />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill" />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>



  <div v-if="!loading" class="home-view h-screen">
    <!-- Botão para limpar o cache no topo -->
    <div class="p-6">
      <button @click="clearAppCache" class="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        Clear Cache
      </button>
    </div>

    <div class="flex justify-center items-center items-end gap-0">
      <div class="w-60 bg-white rounded-lg shadow-md overflow-hidden">
        <img class="w-full h-40 object-scale-down" :src="`src/assets/images/${drivers[1].id}.png`" alt="Card Image" />
        <div class="p-4 bg-zinc-800">
          <h2 class="text-xl font-bold text-white"> {{ drivers[1].name }}</h2>
          <p class="text-white font-bold mt-2">
            {{ drivers[1].points }} points
          </p>
        </div>
      </div>

      <div class="w-75 bg-white rounded-lg shadow-md overflow-hidden m-10">
        <img class="w-full h-48 object-scale-down" :src="`src/assets/images/${drivers[0].id}.png`" alt="Card Image" />
        <div class="p-4 bg-zinc-800">
          <h2 class="text-xl font-bold text-white"> {{ drivers[0].name }}</h2>
          <p class="text-white font-bold mt-2">
            {{ drivers[0].points }} points
          </p>
        </div>
      </div>

      <div class="w-60 bg-white rounded-lg shadow-md overflow-hidden">
        <img class="w-full h-40 object-scale-down" :src="`src/assets/images/${drivers[2].id}.png`" alt="Card Image" />
        <div class="p-4 bg-zinc-800">
          <h2 class="text-xl font-bold text-white"> {{ drivers[2].name }}</h2>
          <p class="text-white font-bold mt-2">
            {{ drivers[2].points }} points
          </p>
        </div>
      </div>
    </div>

    <div class="p-6 container">
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
          <tr v-for="(driver, index) in drivers" :key="driver.id" class="table-row">
            <td class="p-3">{{ index + 1 }}</td>
            <td class="p-3">{{ driver.name }}</td>
            <td class="p-3">{{ driver.teamName }}</td>
            <td class="p-3">{{ driver.points }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="p-6 container">
      <h1 class="text-2xl font-bold mb-4 text-white">Constructors</h1>
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-dark text-white">
            <th class="p-3">POS</th>
            <th class="p-3">Team</th>
            <th class="p-3">Drivers</th>
            <th class="p-3">Points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(constructor, index) in constructors" :key="constructor.teamId" class="table-row ">
            <td class="p-3">{{ index + 1 }}</td>
            <td class="p-3">{{ constructor.teamName }}</td>
            <td class="p-3">{{ constructor.driversName }}</td>
            <td class="p-3">{{ constructor.points }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import HomeService from "@/services/HomeService";
import type DriverModel from "@/models/driverModel";
import type ConstructorModel from "@/models/constructorModel";
import { clearCache } from "@/utils/CacheUtils";

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
    console.error("Erro ao carregar motoristas:", error);
  } finally {
    loading.value = false;
  }
}

function clearAppCache() {
  clearCache(); // Chama a função para limpar o cache
  alert('Cache cleared!'); // Exibe um alerta informando que o cache foi limpo
}

const loading = ref(true);

onMounted(() => {
  loadDrivers();
});
</script>
