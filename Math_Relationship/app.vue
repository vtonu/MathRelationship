<template>
  <UContainer class="m-4 mx-6 border border-1 border-gray-300 rounded-lg">
    <UContainer class="m-4">
      <UButton
        icon="i-heroicons-arrow-right-20-solid"
        size="sm"
        color="primary"
        variant="solid"
        label="TEST"
        :trailing="true"
        class="m-2"
      />

      <UButton
        icon="i-heroicons-arrow-path-rounded-square-solid"
        size="sm"
        color="primary"
        variant="solid"
        label="RESET"
        :trailing="true"
        class="m-2"
      />
      <UToggle
        class="m-2"
        size="sm"
        on-icon="i-heroicons-check-20-solid"
        off-icon="i-heroicons-x-mark-20-solid"
        v-model="selected"
      />
      <UDropdown
        class="m-2"
        :items="items"
        :popper="{ placement: 'bottom-start' }"
      >
        <UButton
          color="white"
          label="Color Mode"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        />
      </UDropdown>
      <!--       <div>
        <h1>Color mode: {{ $colorMode.value }}</h1>
        <select v-model="$colorMode.preference">
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="sepia">Sepia</option>
        </select>
      </div> -->
    </UContainer>
    <UContainer class="m-4"><URange v-model="value" size="lg" /></UContainer>
    <UAlert color="lime" variant="subtle" class="m-4">
      <template #description>
        <h1 class="title">Nuxt Anime</h1>
        <canvas id="title" ref="fireworksCanvas"></canvas>
      </template>
    </UAlert>
  </UContainer>
</template>

<script setup>
// Toggle
const selected = ref(true);
// Range slider
const value = ref(20);

// Dropdown for color mode
const items = [
  [
    {
      label: 'Light',
      icon: 'i-heroicons-beaker',
      click: () => {
        console.log('This should set light mode.');
      },
    },
    {
      label: 'Dark',
      icon: 'i-heroicons-beaker-solid',
      click: () => {
        console.log('This should set dark mode.');
      },
    },
  ],
  [
    {
      label: 'Sepia',
      icon: 'i-heroicons-beaker-20-solid',
      click: () => {
        console.log('This should set sepia mode.');
      },
    },
  ],
];

// Animejs
import anime from 'animejs/lib/anime.es.js';
const { $anime } = useNuxtApp();
onMounted(() => {
  $anime({ targets: '.title', translateX: 250, duration: 800 });
});
</script>
