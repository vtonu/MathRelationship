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
    </UContainer>
    <UContainer class="m-4"><URange v-model="value" size="lg" /></UContainer>
    <UAlert color="lime" variant="subtle" class="m-4">
      <template #description>
        <div>
          <!-- <h1>Color mode: {{ $colorMode.value }}</h1> -->
          <select v-model="$colorMode.preference">
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="sepia">Sepia</option>
          </select>
        </div>
        <canvas id="fireworks" ref="fireworksCanvas"></canvas>
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
const { $anime } = useNuxtApp();
onMounted(() => {
  $anime({ targets: '.title', translateX: 250, duration: 800 });
});

// Fireworks
function animateParticules(canvasEl, x, y) {
  var ctx = canvasEl.getContext('2d');
  var numberOfParticules = 30;
  var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

  function setParticuleDirection(p) {
    var angle = (anime.random(0, 360) * Math.PI) / 180;
    var value = anime.random(50, 180);
    var radius = [-1, 1][anime.random(0, 1)] * value;
    return {
      x: p.x + radius * Math.cos(angle),
      y: p.y + radius * Math.sin(angle),
    };
  }

  function createParticule(x, y) {
    var p = {};
    p.x = x;
    p.y = y;
    p.color = colors[anime.random(0, colors.length - 1)];
    p.radius = anime.random(16, 32);
    p.endPos = setParticuleDirection(p);
    p.draw = function () {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = p.color;
      ctx.fill();
    };
    return p;
  }

  function createCircle(x, y) {
    var p = {};
    p.x = x;
    p.y = y;
    p.color = '#FFF';
    p.radius = 0.1;
    p.alpha = 0.5;
    p.lineWidth = 6;
    p.draw = function () {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.lineWidth = p.lineWidth;
      ctx.strokeStyle = p.color;
      ctx.stroke();
      ctx.globalAlpha = 1;
    };
    return p;
  }

  function renderParticule(anim) {
    for (var i = 0; i < anim.animatables.length; i++) {
      anim.animatables[i].target.draw();
    }
  }

  function startFirework(x, y) {
    var circle = createCircle(x, y);
    var particules = [];
    for (var i = 0; i < numberOfParticules; i++) {
      particules.push(createParticule(x, y));
    }
    anime
      .timeline()
      .add({
        targets: particules,
        x: function (p) {
          return p.endPos.x;
        },
        y: function (p) {
          return p.endPos.y;
        },
        radius: 0.1,
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule,
      })
      .add({
        targets: circle,
        radius: anime.random(80, 160),
        lineWidth: 0,
        alpha: {
          value: 0,
          easing: 'linear',
          duration: anime.random(600, 800),
        },
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule,
        offset: 0,
      });
  }

  function autoClick(canvasEl) {
    if (window.human) return;
    var centerX = canvasEl.width / 2;
    var centerY = canvasEl.height / 2;
    startFirework(
      anime.random(centerX - 50, centerX + 50),
      anime.random(centerY - 50, centerY + 50)
    );
    anime({ duration: 200 }).finished.then(function () {
      autoClick(canvasEl);
    });
  }

  autoClick(canvasEl);
}
</script>

<style></style>
