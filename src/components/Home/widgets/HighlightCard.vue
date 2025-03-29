<template>
    <div :class="['bg-white rounded-lg shadow-md overflow-hidden podium-card', positionClass]">
        <img :class="`w-full h-40 object-scale-down bg-team-${bgId}`" :src="bgImage"
            :alt="`src/assets/images/constructors/${bgId}.png`" />
        <div class="bg-zinc-800 flex items-center">
            <div class="position flex items-center self-stretch">
                <p>{{ position }}{{ positionSuffix }}</p>
            </div>
            <div class="driver">
                <h2 class="text-base font-bold text-white line-clamp-2" :title="`${name}`"> {{ name }}</h2>
                <p class="text-white font-bold mt-2 mb-2">{{ points }} points</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
    isDriver: {
        type: Boolean,
        default: true,
    },
    position: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },
    imageId: {
        type: Number,
        required: true,
    },
    bgId: {
        type: Number,
        required: true,
    },
});

const positionClass = computed(() => {
    return position === 1 ? ['w-75', 'm-10'] : ['w-60'];
});

const bgImage = computed(() => {
    if (props.isDriver) return `src/assets/images/drivers/${imageId}.png`;
    return `src/assets/images/constructors/${imageId}.png`;
});

const positionSuffix = computed(() => {
    if (position === 1) return 'st';
    if (position === 2) return 'nd';
    if (position === 3) return 'rd';
    return 'th';
});

const { position, name, points, imageId, bgId } = props;
</script>