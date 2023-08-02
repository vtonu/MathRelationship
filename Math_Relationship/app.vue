<template>
  <UContainer class="m-4 mx-4 border border-1 border-gray-300 rounded-lg">
    <UContainer class="m-8">
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
        class="m-8"
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
    <UContainer class="m-8"><URange v-model="value" size="sm" /></UContainer>
    <div>
      <h1>Color mode: {{ $colorMode.value }}</h1>
      <select v-model="$colorMode.preference">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="sepia">Sepia</option>
      </select>
    </div>
  </UContainer>
</template>

<script setup>
const selected = ref(false);
const value = ref(20);

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
</script>
