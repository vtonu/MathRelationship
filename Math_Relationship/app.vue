<template>
  <div class="flex items-center justify-center">
    <UContainer class="m-4 mx-4 border border-gray-200 rounded-lg py-2">
      <UContainer class="flex place-content-center">
        <UButton
          @click="playAnimation"
          icon="i-heroicons-arrow-right-20-solid"
          size="sm"
          color="primary"
          variant="solid"
          label="PUSH"
          :trailing="true"
          title="Push Button"
          class="m-2 active:scale-[0.98]" />
        <UButton
          @click="pullAnimation"
          icon="i-heroicons-arrow-left-20-solid"
          size="sm"
          color="primary"
          variant="solid"
          label="PULL"
          :trailing="true"
          title="Pull Button"
          class="m-2 active:scale-[0.98]" />
        <UButton
          @click="resetAnimationIcon"
          icon="i-heroicons-arrow-path-rounded-square-solid"
          size="sm"
          color="primary"
          variant="outline"
          title="Reset Icon"
          class="m-2 active:scale-[0.98]" />
        <UDropdown
          class="m-2"
          :items="items"
          :popper="{ placement: 'bottom-start' }"
          title="Color Mode Dropdown">
          <UButton
            color="white"
            label="Color Mode"
            trailing-icon="i-heroicons-chevron-down-20-solid" />
        </UDropdown>
      </UContainer>
      <UAlert
        icon="i-heroicons-command-line"
        color="primary"
        variant="outline"
        class="my-4"
        description="Push & Pull the numbers!"
        title="" />
      <UAlert color="primary" variant="subtle" class="my-4" title="">
        <template #description>
          <div class="numbers">
            <h1 class="number">1<br /><br /></h1>
            <h1 class="number">2<br /><br /></h1>
            <h1 class="number">3<br /><br /></h1>
          </div>
        </template>
      </UAlert>
    </UContainer>
  </div>
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
  /*   [
    {
      label: 'Sepia',
      icon: 'i-heroicons-beaker-20-solid',
      click: () => {
        $colorMode.preference = 'sepia'; // Set the color mode to 'sepia'
      },
    },
  ], */
];

// Animejs
const { $anime } = useNuxtApp();

// Play animation when TEST button is clicked
const playAnimation = () => {
  // Use Anime.js keyframes to create the animation
  $anime({
    targets: '.number',
    translateX: 320,
    direction: 'alternate',
    duration: 2000,
    loop: true,
    easing: function (el, i, total) {
      return function (t) {
        return Math.pow(Math.sin(t * (i + 1)), total);
      };
    },
  });
};

// Animation when the pull button is clicked
const pullAnimation = () => {
  $anime({
    targets: '.number',
    translateX: 0,
    direction: 'alternate',
    loop: true,
    easing: 'cubicBezier(.5, .05, .1, .3)',
  });
};

// Stop animation when reset icon is clicked
const resetAnimationIcon = () => {
  // Use Anime.js keyframes to create the animation
  $anime({
    targets: '.number',
    translateX: 0,
    direction: 'alternate',
    duration: 2000,
  });
};
</script>
