<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Drivers</h1>
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-gray-800 text-white">
          <th class="p-3 border border-gray-700">Name</th>
          <th class="p-3 border border-gray-700">Team</th>
          <th class="p-3 border border-gray-700">Points</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="driver in drivers"
          :key="driver.id"
          class="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          <td class="p-3 border border-gray-300 text-gray-900">{{ driver.name }}</td>
          <td class="p-3 border border-gray-300 text-gray-900">{{ driver.teamName }}</td>
          <td class="p-3 border border-gray-300 text-gray-900">{{ driver.points }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Constructors</h1>
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-gray-800 text-white">
          <th class="p-3 border border-gray-700">Team</th>
          <th class="p-3 border border-gray-700">Drivers</th>
          <th class="p-3 border border-gray-700">Points</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="constructor in constructors"
          :key="constructor.teamId"
          class="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          <td class="p-3 border border-gray-300 text-gray-900">{{ constructor.teamName }}</td>
          <td class="p-3 border border-gray-300 text-gray-900">{{ constructor.driversName }}</td>
          <td class="p-3 border border-gray-300 text-gray-900">{{ constructor.points }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
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
    console.error("Erro ao carregar motoristas:", error);
  }
}

onMounted(() => {
  loadDrivers();
});
</script>

<style scoped>
h1 {
  margin-bottom: 16px;
}
</style>
