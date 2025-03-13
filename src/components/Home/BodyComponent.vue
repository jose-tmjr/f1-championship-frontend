<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Drivers</h1>
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-gray-800 text-white">
          <th class="p-3 border border-gray-700">ID</th>
          <th class="p-3 border border-gray-700">Name</th>
          <th class="p-3 border border-gray-700">Team</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="driver in drivers"
          :key="driver.driver_id"
          class="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          <td class="p-3 border border-gray-300 text-gray-900">{{ driver.driver_id }}</td>
          <td class="p-3 border border-gray-300 text-gray-900">{{ driver.driver_name }}</td>
          <td class="p-3 border border-gray-300 text-gray-900">{{ driver.team_id }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import HomeService from "@/services/HomeService";
import type { Driver } from "@/Interfaces/Driver";

const drivers = ref<Driver[]>([]);

async function loadDrivers() {
  try {
    drivers.value = await HomeService.getDrivers();
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
