<template>
  <div class="home-view h-screen">
    <!-- Botão para limpar o cache no topo -->
    <div class="p-6">
      <button @click="clearAppCache" class="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        Clear Cache
      </button>
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
  }
}

function clearAppCache() {
  clearCache(); // Chama a função para limpar o cache
  alert('Cache cleared!'); // Exibe um alerta informando que o cache foi limpo
}

onMounted(() => {
  loadDrivers();
});
</script>
