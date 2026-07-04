<template>
  <div class="container-layout">
    <!-- Header -->
    <header class="app-header">
      <div class="header-brand">
        <!-- Hamburger Menu Toggle Button (Visible only on mobile) -->
        <button v-if="activeMobileTab !== 'output'" type="button" class="btn-menu-toggle" @click="inputFormRef ? inputFormRef.isSideNavOpen = true : null" aria-label="Open menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div class="logo-mark">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
        </div>
        <div class="brand-text">
          <h1 class="brand-name">GENSV</h1>
          <p class="brand-tagline">AI Art Direction & Design Prompt Studio</p>
        </div>
      </div>

      <div class="header-actions">
        <!-- Brief Output Toggle Button (Paling kanan di header) -->
        <button 
          type="button" 
          class="btn-toggle-output-header" 
          :class="{ active: isOutputActive, loading: loading }" 
          @click="toggleOutput" 
          :title="isOutputActive ? 'Sembunyikan Output' : 'Tampilkan Output'"
        >
          <!-- Spinner icon if loading -->
          <span class="loader-spinner button-spinner" v-if="loading"></span>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tab-icon">
            <!-- If output is active, show split/close icon (X), otherwise show chat bubble -->
            <line v-if="isOutputActive" x1="18" y1="6" x2="6" y2="18"></line>
            <line v-if="isOutputActive" x1="6" y1="6" x2="18" y2="18"></line>
            <path v-else d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span class="btn-text">{{ toggleButtonText }}</span>
          <span v-if="loading && !isOutputActive" class="pulse-dot-btn"></span>
        </button>
      </div>
    </header>

    <!-- Main Dashboard Grid -->
    <main class="dashboard-grid">
      <!-- Left Column: Inputs & Stats -->
      <div 
        class="dashboard-column left-pane" 
        :class="{ 
          expanded: isOutputCollapsed, 
          'mobile-show': activeMobileTab === 'input', 
          'mobile-hide': activeMobileTab !== 'input' 
        }"
      >
        <InputForm 
          ref="inputFormRef"
          :loading="loading" 
          :current-theme="theme"
          @submit-brief="generateBrief"
          @theme-changed="updateTheme"
          @open-settings="showSettings = true"
          @toggle-theme="toggleTheme"
          @preview-skill="handlePreviewSkill"
        />
      </div>

      <!-- Right Column: Brief Output -->
      <div 
        class="dashboard-column right-pane" 
        :class="{ 
          collapsed: isOutputCollapsed, 
          'mobile-show': activeMobileTab === 'output', 
          'mobile-hide': activeMobileTab !== 'output' 
        }"
      >
        <BriefOutput 
          :brief="brief" 
          :prompt-data="promptData"
          :loading="loading" 
          :form-data="activeFormData"
          :preview-skill="activePreviewSkill"
          @close-preview="closeSkillPreview"
        />
      </div>
    </main>

    <!-- Settings Modal Backdrop -->
    <Transition name="fade">
      <div v-if="showSettings" class="modal-backdrop" @click.self="showSettings = false">
        <Transition name="slide-up" appear>
          <SystemSettings 
            @close="showSettings = false"
            @config-updated="handleConfigUpdate"
          />
        </Transition>
      </div>
    </Transition>

    <!-- Error Toast Notification -->
    <div v-if="errorMsg" class="error-toast">
      <div class="toast-content">
        <svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <span class="toast-message">{{ errorMsg }}</span>
      </div>
      <button @click="errorMsg = ''" class="toast-close">&times;</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import InputForm from './components/InputForm.vue';
import BriefOutput from './components/BriefOutput.vue';
import SystemSettings from './components/SystemSettings.vue';
import { generateBrief as generateBriefService } from './services/aiService.js';

const loading = ref(false);
const brief = ref('');
const promptData = ref(null);
const selectedTheme = ref('Premium Consumer/Apple-y');
const showSettings = ref(false);
const isOutputCollapsed = ref(false);
const errorMsg = ref('');
const activeFormData = ref(null);
const activeMobileTab = ref('input');
const inputFormRef = ref(null);

const activePreviewSkill = ref(null);

const handlePreviewSkill = (skill) => {
  activePreviewSkill.value = skill;
  activeMobileTab.value = 'output';
  isOutputCollapsed.value = false;
};

const closeSkillPreview = () => {
  activePreviewSkill.value = null;
  if (isMobile.value) {
    activeMobileTab.value = 'input';
    isOutputCollapsed.value = true;
  }
};

const theme = ref('dark');

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme.value);
  localStorage.setItem('theme', theme.value);
};

const isMobile = ref(false);
const checkMobile = () => {
  isMobile.value = window.innerWidth < 1023; // Align with max-width: 1023px media query in CSS
};

onMounted(() => {
  const storedTheme = localStorage.getItem('theme') || 'dark';
  theme.value = storedTheme;
  document.documentElement.setAttribute('data-theme', storedTheme);
  
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

const isOutputActive = computed(() => {
  if (isMobile.value) {
    return activeMobileTab.value === 'output';
  }
  return !isOutputCollapsed.value;
});

const toggleButtonText = computed(() => {
  if (loading.value) {
    return 'Memproses...';
  }
  if (isMobile.value) {
    return activeMobileTab.value === 'output' ? 'Close Output' : 'Open Output';
  }
  return isOutputCollapsed.value ? 'Open Output' : 'Close Output';
});

const toggleOutput = () => {
  if (isMobile.value) {
    if (activeMobileTab.value === 'output') {
      activeMobileTab.value = 'input';
      isOutputCollapsed.value = true;
    } else {
      activeMobileTab.value = 'output';
      isOutputCollapsed.value = false;
    }
  } else {
    if (isOutputCollapsed.value) {
      isOutputCollapsed.value = false;
      activeMobileTab.value = 'output';
    } else {
      isOutputCollapsed.value = true;
      activeMobileTab.value = 'input';
    }
  }
};

const updateTheme = (theme) => {
  selectedTheme.value = theme;
};

const handleConfigUpdate = (config) => {
  errorMsg.value = '';
};

const generateBrief = async (formData) => {
  activePreviewSkill.value = null; // Clear active design skill preview
  activeMobileTab.value = 'output';
  isOutputCollapsed.value = false;
  loading.value = true;
  errorMsg.value = '';
  brief.value = '';
  promptData.value = null;
  activeFormData.value = { ...formData };

  try {
    const result = await generateBriefService(formData);
    brief.value = result.brief;
    promptData.value = result.promptData;
  } catch (err) {
    console.error(err);
    if (err.name === 'AbortError') {
      errorMsg.value = 'Request timeout (30 detik). Model terlalu lambat — coba gambar yang lebih kecil.';
    } else {
      errorMsg.value = err.message || 'Gagal menghasilkan brief. Silakan periksa koneksi atau API Key Anda.';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style>
/* Global App Layout styles */
.app-header {
  height: 60px;
  padding: 0 24px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 10;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-mark {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  background: var(--accent-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-on-accent);
  box-shadow: 0 0 10px var(--accent-glow);
}

.logo-mark svg {
  width: 16px;
  height: 16px;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-family: var(--display-font);
  font-size: var(--text-xl) !important; /* 1.375rem — φ-step above md */
  font-weight: 800;
  letter-spacing: var(--ls-tight);      /* -0.02em — condensed */
  color: var(--text-main);
  margin: 0 !important;
  line-height: var(--lh-tight);
}

.brand-tagline {
  font-size: var(--text-xs);            /* 0.625rem — 2 φ-steps below brand */
  font-weight: 500;
  color: var(--text-dim);
  letter-spacing: var(--ls-wide);       /* 0.05em — airy on small text */
  line-height: var(--lh-base);
}

.btn-toggle-output-header {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-main);
  font-family: var(--display-font);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
  height: 34px;
  box-sizing: border-box;
}

.btn-toggle-output-header:hover {
  background: var(--bg-hover);
  border-color: var(--border-color-focus);
}

.btn-toggle-output-header.active {
  color: var(--accent-color);
  background: var(--accent-glow);
  border-color: var(--accent-color);
  box-shadow: 0 0 10px var(--accent-glow);
}

.btn-toggle-output-header .button-spinner {
  width: 14px;
  height: 14px;
  border-width: 1.5px;
  margin-right: 4px;
}

.btn-toggle-output-header .pulse-dot-btn {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--accent-color);
  box-shadow: 0 0 8px var(--accent-color);
  animation: pulseGlow 1.2s infinite ease-in-out;
}

.btn-toggle-output-header .btn-text {
  opacity: 1 !important;
  display: inline-block !important;
}

.dashboard-grid {
  display: flex;
  flex-grow: 1;
  height: calc(100vh - 60px);
  padding: 0;
  gap: 0;
  max-width: 100%;
  width: 100%;
  margin: 0;
  overflow: hidden;
}

.dashboard-column {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.left-pane {
  flex: 0 0 680px;
  background: var(--bg-card);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  transition: flex-basis 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.left-pane.expanded {
  flex: 1 1 auto;
  border-right: none;
}

.left-pane > :first-child {
  flex: 1;
  min-height: 0;
}

.right-pane {
  flex: 1;
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

/* Modal backdrop and transition styling */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

/* Toast error styling */
.error-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #1f1215;
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  z-index: 200;
  max-width: 480px;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fca5a5;
}

.toast-icon {
  flex-shrink: 0;
}

.toast-message {
  font-size: 0.85rem;
  line-height: 1.4;
}

.toast-close {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.2rem;
  cursor: pointer;
}

.toast-close:hover {
  color: var(--text-main);
}

/* Mobile tab navigation styles - hidden on desktop */
.mobile-tab-wrapper-header,
.btn-menu-toggle {
  display: none;
}

/* Desktop collapsed state */
@media (min-width: 1024px) {
  .right-pane.collapsed {
    display: none !important;
  }
}

/* Responsive breakdowns */
@media (min-width: 1440px) {
  .left-pane {
    flex: 0 0 780px;
  }
}

@media (min-width: 1920px) {
  .left-pane {
    flex: 0 0 880px;
  }
}

@media (max-width: 1023px) {
  .container-layout {
    height: 100dvh !important;
    overflow: hidden !important;
  }

  .app-header {
    padding: 0 16px;
    flex-shrink: 0;
  }

  /* Hamburger toggle button visible on mobile header */
  .btn-menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--text-main);
    cursor: pointer;
    padding: 6px;
    margin-right: 6px;
    border-radius: 6px;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .btn-menu-toggle:hover {
    background: var(--bg-hover);
    color: var(--accent-color);
  }

  /* Mobile segmented tabs inside header */
  .mobile-tab-wrapper-header {
    display: flex;
    background: var(--bg-input);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    padding: 3px;
    width: 100%;
    max-width: 180px;
    height: 34px;
    align-items: center;
    margin-left: 12px;
    margin-right: auto; /* push settings actions to the right */
    flex-shrink: 0;
  }
  
  .mobile-tab-btn {
    flex: 1;
    height: 100%;
    border-radius: 16px;
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-family: var(--display-font);
    font-size: 0.75rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    outline: none;
  }
  
  .mobile-tab-btn.active {
    color: var(--text-on-accent);
    background: var(--accent-gradient);
    box-shadow: 0 2px 8px var(--accent-glow);
  }
  
  .mobile-tab-btn .tab-icon {
    opacity: 0.7;
    transition: transform 0.2s;
  }
  
  .mobile-tab-btn.active .tab-icon {
    opacity: 1;
    transform: scale(1.05);
  }
  
  .mobile-tab-btn .pulse-dot {
    position: absolute;
    top: 4px;
    right: 8px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: var(--accent-color);
    box-shadow: 0 0 6px var(--accent-color);
    animation: pulseGlow 1.2s infinite ease-in-out;
  }
  
  .mobile-tab-btn.active .pulse-dot {
    background-color: var(--text-on-accent);
    box-shadow: 0 0 6px var(--text-on-accent);
  }
  
  .dashboard-grid {
    flex-direction: row !important;
    height: calc(100dvh - 60px) !important;
    overflow: hidden !important;
  }
  
  .dashboard-column {
    height: 100% !important;
    width: 100% !important;
    overflow: hidden !important;
  }
  
  .left-pane, .right-pane {
    width: 100% !important;
    flex: 1 1 100% !important;
    height: 100% !important;
    border-right: none !important;
    border-bottom: none !important;
  }
  
  .left-pane > :first-child {
    height: 100% !important;
  }

  .mobile-hide {
    display: none !important;
  }

  .mobile-show {
    display: flex !important;
    flex-direction: column !important;
  }
}

@media (max-width: 639px) {
  .brand-tagline {
    display: none;
  }
  
  .brand-name {
    font-size: var(--text-lg) !important;
  }
  
  .logo-mark {
    display: none !important;
  }
  
  .btn-toggle-output-header {
    padding: 6px 10px;
    gap: 4px;
  }
}

@media (max-width: 520px) {
  .btn-menu-toggle {
    width: 34px;
    height: 34px;
    padding: 0 !important;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  
  .header-actions {
    gap: var(--space-xs);
  }
}

@keyframes pulseGlow {
  0% { transform: scale(0.9); opacity: 0.6; }
  50% { transform: scale(1.25); opacity: 1; box-shadow: 0 0 12px var(--accent-color); }
  100% { transform: scale(0.9); opacity: 0.6; }
}
</style>
