<template>
  <UContainer class="m-6 mx-8 border border-1 border-gray-200 rounded-lg py-6">
    <UContainer>
      <UButton
        @click="playAnimation"
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
    </UContainer>
    <UAlert color="primary" variant="subtle" class="my-6">
      <template #description>
        <div>
          <h1 class="title">1 <br /><br /></h1>
          <h1 class="title">2 <br /><br /></h1>
          <h1 class="title">3 <br /><br /></h1>
        </div>
      </template>
    </UAlert>
    <URange v-model="value" size="sm" />
  </UContainer>
</template>

<script setup>
// Toggle
const selected = ref(true);
// Range slider
const value = ref(30);
// Dropdown for color mode
import { ref } from 'vue';
const { $colorMode } = useNuxtApp();

const items = [
  [
    {
      label: 'Light',
      value: 'light',
      icon: 'i-heroicons-beaker',
      click: () => {
        $colorMode.preference = 'light'; // Set the color mode to 'light'
      },
    },
    {
      label: 'Dark',
      icon: 'i-heroicons-beaker-solid',
      click: () => {
        $colorMode.preference = 'dark'; // Set the color mode to 'dark'
      },
    },
  ],
  [
    {
      label: 'Sepia',
      icon: 'i-heroicons-beaker-20-solid',
      click: () => {
        $colorMode.preference = 'sepia'; // Set the color mode to 'sepia'
      },
    },
  ],
];

// Animejs
const { $anime } = useNuxtApp();

// Play animation when TEST button is clicked
const playAnimation = () => {
  // Use Anime.js keyframes to create the animation
  $anime({
    targets: '.title',
    translateX: 280,
    direction: 'alternate',
    loop: true,
    easing: 'cubicBezier(.5, .05, .1, .3)',
  });
};
</script>
