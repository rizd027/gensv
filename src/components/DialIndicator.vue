<template>
  <div class="dials-widget">
    <div class="widget-header">
      <h4 class="widget-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        Taste-Skill Design Dials
      </h4>
      <span class="badge">Active Preset: {{ presetName }}</span>
    </div>
    
    <div class="dials-grid">
      <!-- Variance Dial -->
      <div class="dial-item">
        <div class="dial-svg-wrapper">
          <svg class="dial-svg" viewBox="0 0 36 36">
            <path class="dial-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="dial-progress variance" :style="{ strokeDasharray: `${variancePercent}, 100` }" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <div class="dial-value">{{ variance }}<span class="max-val">/10</span></div>
        </div>
        <div class="dial-label">Variance</div>
        <div class="dial-desc">{{ varianceDesc }}</div>
      </div>
      
      <!-- Motion Dial -->
      <div class="dial-item">
        <div class="dial-svg-wrapper">
          <svg class="dial-svg" viewBox="0 0 36 36">
            <path class="dial-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="dial-progress motion" :style="{ strokeDasharray: `${motionPercent}, 100` }" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <div class="dial-value">{{ motion }}<span class="max-val">/10</span></div>
        </div>
        <div class="dial-label">Motion</div>
        <div class="dial-desc">{{ motionDesc }}</div>
      </div>
      
      <!-- Density Dial -->
      <div class="dial-item">
        <div class="dial-svg-wrapper">
          <svg class="dial-svg" viewBox="0 0 36 36">
            <path class="dial-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="dial-progress density" :style="{ strokeDasharray: `${densityPercent}, 100` }" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <div class="dial-value">{{ density }}<span class="max-val">/10</span></div>
        </div>
        <div class="dial-label">Density</div>
        <div class="dial-desc">{{ densityDesc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  theme: {
    type: String,
    required: true
  }
});

// Dial Preset values mapping from SKILL.md
const dials = computed(() => {
  switch (props.theme) {
    case 'Minimalist/Calm/Editorial':
      return { variance: 5, motion: 3, density: 2, name: 'Calm Editorial' };
    case 'Premium Consumer/Apple-y':
      return { variance: 7, motion: 6, density: 3, name: 'Premium DTC' };
    case 'Playful/Awwwards-style':
      return { variance: 9, motion: 9, density: 4, name: 'Artsy Kinetic' };
    case 'Modern SaaS/Portfolio (Default)':
      return { variance: 8, motion: 7, density: 4, name: 'Standard SaaS' };
    case 'Trust-first/Public Sector':
      return { variance: 3, motion: 2, density: 5, name: 'Accessibility First' };
    default:
      return { variance: 8, motion: 6, density: 4, name: 'Custom Dynamic' };
  }
});

const variance = computed(() => dials.value.variance);
const motion = computed(() => dials.value.motion);
const density = computed(() => dials.value.density);
const presetName = computed(() => dials.value.name);

const variancePercent = computed(() => variance.value * 10);
const motionPercent = computed(() => motion.value * 10);
const densityPercent = computed(() => density.value * 10);

const varianceDesc = computed(() => {
  if (variance.value <= 4) return 'Perfect Symmetry';
  if (variance.value <= 7) return 'Restrained Balance';
  return 'Artsy Chaos';
});

const motionDesc = computed(() => {
  if (motion.value <= 3) return 'Mostly Static';
  if (motion.value <= 6) return 'Micro-Interactions';
  return 'Cinematic / Physics';
});

const densityDesc = computed(() => {
  if (density.value <= 3) return 'Art Gallery / Airy';
  if (density.value <= 6) return 'Balanced Padding';
  return 'Cockpit / Packed';
});
</script>

<style scoped>
.dials-widget {
  padding: 16px 24px;
  background: rgba(0, 0, 0, 0.12);
  border-top: 1px solid var(--border-color);
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.widget-title {
  font-family: var(--display-font);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 6px;
}

.dials-grid {
  display: grid;
  grid-template-cols: repeat(3, 1fr);
  gap: 12px;
}

.dial-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.dial-svg-wrapper {
  position: relative;
  width: 68px;
  height: 68px;
  margin-bottom: 8px;
}

.dial-svg {
  width: 100%;
  height: 100%;
}

.dial-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.03);
  stroke-width: 2.8;
}

.dial-progress {
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  transition: stroke-dasharray 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.dial-progress.variance {
  stroke: #00f0ff; /* Cyan */
}

.dial-progress.motion {
  stroke: #a855f7; /* Purple */
}

.dial-progress.density {
  stroke: #10b981; /* Emerald */
}

.dial-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--display-font);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-main);
  display: flex;
  align-items: baseline;
}

.max-val {
  font-size: 0.65rem;
  color: var(--text-dim);
  font-weight: 400;
}

.dial-label {
  font-family: var(--display-font);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 2px;
}

.dial-desc {
  font-size: 0.65rem;
  color: var(--text-dim);
  font-weight: 500;
}
</style>
