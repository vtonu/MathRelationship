<template>
  <UContainer class="m-4 mx-8 border border-1 border-gray-200 rounded-lg">
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
      <!--       <UToggle
        class="m-2"
        size="sm"
        on-icon="i-heroicons-check-20-solid"
        off-icon="i-heroicons-x-mark-20-solid"
        v-model="selected"
      /> -->
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
      <URange v-model="value" size="sm" />
    </UContainer>
    <UAlert color="primary" variant="subtle" class="my-4">
      <template #description>
        <h1 class="title">1 <br /><br /></h1>
        <h1 class="title">2 <br /><br /></h1>
        <h1 class="title">3 <br /><br /></h1>
        <h1 class="title">4 <br /><br /></h1>
        <h1 class="title">5 <br /><br /></h1>
        <h1 class="title">6 <br /><br /></h1>
        <h1 class="title">7 <br /><br /></h1>
        <h1 class="title">8 <br /><br /></h1>
        <h1 class="title">9 <br /><br /></h1>
        <h1 class="title">10 <br /><br /></h1>
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
import { ref } from 'vue';
const { $colorMode } = useNuxtApp();

const items = [
  [
    {
      label: 'Light',
      value: 'light',
      icon: 'i-heroicons-beaker',
      click: () => {
        console.log('This should set light mode.');
        $colorMode.preference = 'light'; // Set the color mode to 'light'
      },
    },
    {
      label: 'Dark',
      icon: 'i-heroicons-beaker-solid',
      click: () => {
        console.log('This should set dark mode.');
        $colorMode.preference = 'dark'; // Set the color mode to 'dark'
      },
    },
  ],
  [
    {
      label: 'Sepia',
      icon: 'i-heroicons-beaker-20-solid',
      click: () => {
        console.log('This should set sepia mode.');
        $colorMode.preference = 'sepia'; // Set the color mode to 'sepia'
      },
    },
  ],
];

// Animejs
const { $anime } = useNuxtApp();
// Keyframes for the animation
const keyframes = [
  { translateX: 0 }, // Starting point
  { translateX: 300 }, // Ending point
];
// Play animation when TEST button is clicked
const playAnimation = () => {
  // Use Anime.js keyframes to create the animation
  $anime({
    targets: '.title',
    keyframes,
    duration: 1000,
    direction: 'alternate',
    loop: true,
    delay: function (el, i, l) {
      return i * 100;
    },
    endDelay: function (el, i, l) {
      return (l - i) * 10;
    },
  });
};
</script>
