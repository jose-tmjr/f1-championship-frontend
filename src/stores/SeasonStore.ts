import { ref, watch } from "vue";

const SEASON_STORAGE_KEY = "selectedYear";
const CURRENT_YEAR = new Date().getFullYear();

function readStoredSeason(): number {
  const stored = localStorage.getItem(SEASON_STORAGE_KEY);
  const parsed = stored ? Number.parseInt(stored, 10) : Number.NaN;
  return Number.isFinite(parsed) ? parsed : CURRENT_YEAR;
}

const selectedSeason = ref<number>(readStoredSeason());
const dataVersion = ref(0);

watch(selectedSeason, (season) => {
  localStorage.setItem(SEASON_STORAGE_KEY, String(season));
});

function setSeason(year: number) {
  selectedSeason.value = year;
}

function refreshData() {
  dataVersion.value++;
}

export { selectedSeason, dataVersion, setSeason, refreshData };
