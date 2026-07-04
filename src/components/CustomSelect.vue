<template>
  <div class="custom-select-container" ref="selectRef" :class="{ disabled }">
    <!-- Trigger Combobox Input -->
    <div class="select-trigger" :class="{ open: isOpen }">
      <input
        type="text"
        ref="inputRef"
        class="combobox-input"
        :value="isFocused ? localInputValue : (selectedLabel || modelValue)"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.enter.prevent="handleEnter"
        :placeholder="placeholder"
        :disabled="disabled"
      />
      <div 
        v-if="modelValue && !disabled" 
        class="clear-btn" 
        @click.stop="clearValue" 
        @mousedown.prevent
        title="Bersihkan pilihan"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
      <div class="chevron-btn" @click.stop="toggleDropdown">
        <svg class="chevron-icon" :class="{ rotate: isOpen }" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>

    <!-- Dropdown Panel -->
    <Transition name="dropdown-slide">
      <div v-if="isOpen" class="select-dropdown" :class="{ 'position-top': calculatedPosition === 'top' }" @mousedown.prevent>
        <div 
          v-for="opt in filteredOptions" 
          :key="opt.value" 
          class="select-option-item"
          :class="{ selected: opt.value === modelValue }"
          @click="selectOption(opt.value)"
        >
          <span class="option-text">{{ opt.label }}</span>
          <svg v-if="opt.value === modelValue" class="check-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div v-if="filteredOptions.length === 0" class="no-options-item">
          <span>Ketik nilai kustom Anda sendiri...</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  options: { type: Array, required: true }, // Array of strings, or Array of objects like { label: '...', value: '...' }
  placeholder: { type: String, default: 'Pilih...' },
  disabled: { type: Boolean, default: false },
  dropdownPosition: { type: String, default: 'bottom' } // 'bottom' or 'top'
});

const emit = defineEmits(['update:modelValue', 'change']);

const isOpen = ref(false);
const isFocused = ref(false);
const isClearing = ref(false);
const localInputValue = ref('');
const selectRef = ref(null);
const inputRef = ref(null);
const calculatedPosition = ref(props.dropdownPosition);

const updateDropdownPosition = () => {
  if (!selectRef.value) return;
  const rect = selectRef.value.getBoundingClientRect();
  const spaceBelow = window.innerHeight - rect.bottom;
  const dropdownHeight = 240; // Max height is 220px + calc margin
  // If space below is less than dropdown height, and there is more space above, open upwards
  if (spaceBelow < dropdownHeight && rect.top > spaceBelow) {
    calculatedPosition.value = 'top';
  } else {
    calculatedPosition.value = 'bottom';
  }
};

const parsedOptions = computed(() => {
  return (props.options || []).map(opt => {
    if (typeof opt === 'object' && opt !== null) {
      return { label: opt.label, value: opt.value };
    }
    return { label: opt, value: opt };
  });
});

const selectedLabel = computed(() => {
  const found = parsedOptions.value.find(o => o.value === props.modelValue);
  return found ? found.label : '';
});

const filteredOptions = computed(() => {
  const query = String(localInputValue.value || '').toLowerCase().trim();
  if (!query || !isFocused.value) return parsedOptions.value;
  return parsedOptions.value.filter(opt =>
    opt.label.toLowerCase().includes(query) || opt.value.toString().toLowerCase().includes(query)
  );
});

const toggleDropdown = () => {
  if (props.disabled) return;
  if (isOpen.value) {
    isOpen.value = false;
    inputRef.value?.blur();
  } else {
    updateDropdownPosition();
    isOpen.value = true;
    inputRef.value?.focus();
  }
};

const handleFocus = () => {
  if (props.disabled) return;
  isFocused.value = true;
  if (!isClearing.value) {
    localInputValue.value = String(props.modelValue || '');
  }
  updateDropdownPosition();
  isOpen.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
  // Small delay to allow click event to register on options
  setTimeout(() => {
    isOpen.value = false;
  }, 150);
};

const handleInput = (e) => {
  localInputValue.value = e.target.value;
  emit('update:modelValue', localInputValue.value);
  emit('change', localInputValue.value);
};

const handleEnter = () => {
  inputRef.value?.blur();
};

const selectOption = (val) => {
  emit('update:modelValue', val);
  emit('change', val);
  isOpen.value = false;
  inputRef.value?.blur();
};

const clearValue = () => {
  isClearing.value = true;
  localInputValue.value = '';
  emit('update:modelValue', '');
  emit('change', '');
  isOpen.value = true;
  inputRef.value?.focus();
  setTimeout(() => {
    isClearing.value = false;
  }, 50);
};

const handleClickOutside = (e) => {
  if (selectRef.value && !selectRef.value.contains(e.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.custom-select-container {
  position: relative;
  width: 100%;
  user-select: none;
}

.select-trigger {
  width: 100%;
  padding: 10px 14px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-main);
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  justify-content: space-between;
  align-items: center;
  cursor: text;
  transition: all 0.15s ease;
}

.select-trigger:hover {
  background: var(--bg-hover);
  border-color: var(--border-color);
}

.select-trigger.open {
  border-color: var(--accent-color);
  background: var(--bg-input-focus);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

.combobox-input {
  flex: 1 1 0% !important;
  min-width: 0 !important;
  width: 100% !important;
  background: transparent !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  color: var(--text-main);
  font-family: var(--sans-font);
  font-size: var(--text-base);
  line-height: var(--lh-base);
  padding: 0;
}

.combobox-input::placeholder {
  color: var(--text-dim);
  opacity: 0.6;
}

.chevron-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 2px;
  margin-left: 8px;
  flex-shrink: 0;
}

.clear-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 4px;
  color: var(--text-muted);
  border-radius: 50%;
  transition: all 0.15s ease;
  flex-shrink: 0;
  margin-left: 4px;
}

.clear-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.chevron-icon {
  color: var(--text-muted);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}

.chevron-icon.rotate {
  transform: rotate(180deg);
  color: var(--accent-color);
}

/* Dropdown Menu Panel */
.select-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  min-width: 100%;
  width: max-content;
  max-width: min(340px, calc(100vw - 40px));
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.25), 0 0 15px var(--accent-glow);
  z-index: 100;
  max-height: 220px;
  overflow-y: auto;
  backdrop-filter: blur(16px);
}

/* Scrollbar styling for custom dropdown list */
.select-dropdown::-webkit-scrollbar {
  width: 4px;
}
.select-dropdown::-webkit-scrollbar-track {
  background: transparent;
}
.select-dropdown::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
}
.select-dropdown::-webkit-scrollbar-thumb:hover {
  background: var(--accent-color);
}

.select-option-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  color: var(--text-muted);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all 0.12s ease;
  white-space: nowrap;
}

.select-option-item:hover {
  background: var(--bg-hover);
  color: var(--text-main);
}

.select-option-item.selected {
  background: var(--accent-glow);
  color: var(--accent-color);
  font-weight: 600;
}

.check-icon {
  color: var(--accent-color);
  flex-shrink: 0;
  margin-left: 8px;
}

.no-options-item {
  padding: 8px 12px;
  color: var(--text-dim);
  font-size: var(--text-xs);
  font-style: italic;
  text-align: center;
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
}

/* Slide up and fade transition */
.dropdown-slide-enter-active,
.dropdown-slide-leave-active {
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-slide-enter-from,
.dropdown-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

.select-dropdown.position-top {
  top: auto;
  bottom: calc(100% + 6px);
  box-shadow: 0 -12px 36px rgba(0, 0, 0, 0.25), 0 0 15px var(--accent-glow);
}

.select-dropdown.position-top.dropdown-slide-enter-from,
.select-dropdown.position-top.dropdown-slide-leave-to {
  transform: translateY(8px) scale(0.98);
}
</style>
