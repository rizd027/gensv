<template>
  <div class="input-form-container glow-card">
    <!-- Backdrop Overlay for Mobile Drawer Sidenav -->
    <div v-if="isSideNavOpen" class="sidenav-backdrop" @click="isSideNavOpen = false"></div>

    <!-- ─ Sidebar Navigation Panel / Collapsible Mobile Drawer ───────────────────────── -->
    <div class="form-side-nav" :class="{ open: isSideNavOpen }">
      <div class="nav-header">
        <div class="nav-logo-mark">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        </div>
        <span class="nav-header-title">Studio Brief</span>
        <button type="button" class="btn-close-sidenav" @click="isSideNavOpen = false" aria-label="Close navigation panel">
          &times;
        </button>
      </div>

      <div class="nav-menu">
        <button type="button" class="nav-menu-btn" :class="{ active: activeTab === 'media' }" @click="activeTab = 'media'; isSideNavOpen = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
          </svg>
          <span class="btn-text">Media Promosi</span>
        </button>
        <button type="button" class="nav-menu-btn" :class="{ active: activeTab === 'assets' }" @click="activeTab = 'assets'; isSideNavOpen = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
          </svg>
          <span class="btn-text">Aset Visual</span>
        </button>
        <button type="button" class="nav-menu-btn" :class="{ active: activeTab === 'portrait' }" @click="activeTab = 'portrait'; isSideNavOpen = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          <span class="btn-text">Pas Foto & Portrait</span>
        </button>
        <button type="button" class="nav-menu-btn" :class="{ active: activeTab === 'uiux' }" @click="activeTab = 'uiux'; isSideNavOpen = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          <span class="btn-text">Mockup UI/UX</span>
        </button>
        <button type="button" class="nav-menu-btn" :class="{ active: activeTab === 'products' }" @click="activeTab = 'products'; isSideNavOpen = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
          </svg>
          <span class="btn-text">Foto Produk Studio</span>
        </button>
        <button type="button" class="nav-menu-btn" :class="{ active: activeTab === 'scan' }" @click="activeTab = 'scan'; isSideNavOpen = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/>
            <polyline points="10 9 12 7 14 9"/>
            <line x1="12" y1="7" x2="12" y2="17"/>
          </svg>
          <span class="btn-text">Scan Image</span>
        </button>
        <button type="button" class="nav-menu-btn" :class="{ active: activeTab === 'webgen' }" @click="activeTab = 'webgen'; isSideNavOpen = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
          <span class="btn-text">Website Generator</span>
        </button>
        <button type="button" class="nav-menu-btn" :class="{ active: activeTab === 'appgen' }" @click="activeTab = 'appgen'; isSideNavOpen = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
            <line x1="12" y1="18" x2="12.01" y2="18"/>
          </svg>
          <span class="btn-text">App / APK Generator</span>
        </button>
        <button type="button" class="nav-menu-btn" :class="{ active: activeTab === 'designskills' }" @click="activeTab = 'designskills'; isSideNavOpen = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span class="btn-text">Design Skills</span>
        </button>

        <div class="nav-menu-divider"></div>

        <button type="button" class="nav-menu-btn btn-settings-sidebar" @click="$emit('open-settings'); isSideNavOpen = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          <span class="btn-text">Konfigurasi API</span>
        </button>

        <button type="button" class="nav-menu-btn btn-theme-toggle-sidebar" @click="$emit('toggle-theme'); isSideNavOpen = false">
          <svg v-if="currentTheme === 'dark'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
          <span class="btn-text">{{ currentTheme === 'dark' ? 'Mode Terang' : 'Mode Gelap' }}</span>
        </button>
      </div>

      <!-- Generator Links -->
      <div class="sidebar-generator-links">
        <span class="generator-links-label">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          JALANKAN PROMPT DI:
        </span>
        <div class="generator-btns">
          <a href="https://copilot.microsoft.com" target="_blank" rel="noopener" class="gen-btn gen-copilot" title="Microsoft Copilot — DALL-E 3">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
            Copilot
          </a>
          <a href="https://ideogram.ai" target="_blank" rel="noopener" class="gen-btn gen-ideogram" title="Ideogram — Render Teks Terbaik">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            Ideogram
          </a>
          <a href="https://gemini.google.com" target="_blank" rel="noopener" class="gen-btn gen-gemini" title="Google Gemini — Imagen 3">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/></svg>
            Gemini
          </a>
          <a href="https://firefly.adobe.com" target="_blank" rel="noopener" class="gen-btn gen-firefly" title="Adobe Firefly — Komersial">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            Firefly
          </a>
          <a href="https://leonardo.ai" target="_blank" rel="noopener" class="gen-btn gen-leonardo" title="Leonardo.ai — 150 Kredit/Hari">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            Leonardo
          </a>
          <a href="https://dezgo.com" target="_blank" rel="noopener" class="gen-btn gen-dezgo" title="Dezgo — Tanpa Akun">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            Dezgo
          </a>
        </div>
      </div>
    </div>

    <!-- ─ Main Content Area ──────────────────────────────── -->
    <div class="form-main-area">

      <!-- ─ Form Header ─────────────────────────────────────── -->
      <div class="form-header">
        <h3 class="form-title">
          <svg class="title-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <span class="title-text">{{ activeTabLabel }}</span>
        </h3>
        <div class="form-header-actions">
          <button type="button" @click="autoFill" class="btn-ai-fill" :disabled="autoFilling || loading" v-if="!['scan', 'designskills'].includes(activeTab)">
            {{ autoFilling ? 'Generating...' : 'RANDOM FILL' }}
          </button>
        </div>
      </div>

      <!-- ─ Tab 1: Media Promosi ─────────────────────── -->
      <MediaPromosiForm
        ref="mediaFormRef"
        v-if="activeTab === 'media'"
        :formData="formData"
        :loading="loading"
        :autoFilling="autoFilling"
        :colorPresets="colorPresets"
        @theme-changed="(theme) => $emit('theme-changed', theme)"
        @update-autofill-status="handleAutofillStatus"
      />

      <!-- ─ Tab 2: Aset Visual ──────────────────────── -->
      <VisualAssetsForm
        ref="assetsFormRef"
        v-if="activeTab === 'assets'"
        :formDataAssets="formDataAssets"
        :loading="loading"
        :autoFilling="autoFilling"
        :colorPresets="colorPresets"
        @update-autofill-status="handleAutofillStatus"
      />

      <!-- ─ Tab 3: Pas Foto & Portrait ─────────────────────── -->
      <PortraitForm
        ref="portraitFormRef"
        v-if="activeTab === 'portrait'"
        :formDataPortrait="formDataPortrait"
        :loading="loading"
        :autoFilling="autoFilling"
        @update-autofill-status="handleAutofillStatus"
      />

      <!-- ─ Tab 4: Mockup UI/UX ────────────────────────────── -->
      <UIUXForm
        ref="uiuxFormRef"
        v-if="activeTab === 'uiux'"
        :formDataUIUX="formDataUIUX"
        :loading="loading"
        :autoFilling="autoFilling"
        @update-autofill-status="handleAutofillStatus"
      />

      <!-- ─ Tab 5: Foto Produk Studio ─────────────────────── -->
      <ProductsForm
        ref="productsFormRef"
        v-if="activeTab === 'products'"
        :formDataProducts="formDataProducts"
        :loading="loading"
        :autoFilling="autoFilling"
        @update-autofill-status="handleAutofillStatus"
      />

      <!-- ─ Tab 6: Scan Image ─────────────────────────────── -->
      <ScanImageForm
        ref="scanFormRef"
        v-if="activeTab === 'scan'"
        :formDataScan="formDataScan"
        :loading="loading"
      />

      <!-- ─ Tab 7: Website Generator ────────────────────────── -->
      <WebsiteGeneratorForm
        ref="webgenFormRef"
        v-if="activeTab === 'webgen'"
        :formDataWebGen="formDataWebGen"
        :loading="loading"
        :autoFilling="autoFilling"
        @update-autofill-status="handleAutofillStatus"
      />

      <!-- ─ Tab 9: App / APK Generator ────────────────────────── -->
      <AppGeneratorForm
        ref="appgenFormRef"
        v-if="activeTab === 'appgen'"
        :formDataAppGen="formDataAppGen"
        :loading="loading"
        :autoFilling="autoFilling"
        @update-autofill-status="handleAutofillStatus"
      />

      <!-- ─ Tab 8: Design Skills Explorer ───────────────────── -->
      <DesignSkillsForm
        v-if="activeTab === 'designskills'"
        @preview-skill="$emit('preview-skill', $event)"
      />

      <!-- AutoFill loading overlay on the form body -->
      <Transition name="fade-toast">
        <div v-if="autoFilling" class="autofill-overlay">
          <div class="autofill-overlay-inner">
            <div class="autofill-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/>
                <path d="M17.8 11.8 19 13"/><path d="M15 9h0"/><path d="M17.8 6.2 19 5"/>
                <path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/>
              </svg>
            </div>
            <p class="autofill-overlay-text">AI sedang membuat data bisnis acak...</p>
            <p class="autofill-overlay-sub">Groq Llama-3.3 · JSON Mode</p>
          </div>
        </div>
      </Transition>

      <!-- AutoFill error message -->
      <Transition name="fade-toast">
        <div v-if="autoFillError" class="autofill-error">
          ⚠ {{ autoFillError }}
        </div>
      </Transition>

      <!-- ─ Sticky Generate Button ──────────────────────────── -->
      <div class="form-footer" v-if="activeTab !== 'designskills'">
        <button type="button" class="btn-generate w-full" :disabled="loading || autoFilling" @click="handleSubmit">
          <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          <span class="loader-spinner" v-else></span>
          {{ loading ? 'Generating Master Brief...' : 'Generate Design Prompt →' }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import MediaPromosiForm from './forms/MediaPromosiForm.vue';
import VisualAssetsForm from './forms/VisualAssetsForm.vue';
import PortraitForm from './forms/PortraitForm.vue';
import UIUXForm from './forms/UIUXForm.vue';
import ProductsForm from './forms/ProductsForm.vue';
import ScanImageForm from './forms/ScanImageForm.vue';
import WebsiteGeneratorForm from './forms/WebsiteGeneratorForm.vue';
import AppGeneratorForm from './forms/AppGeneratorForm.vue';
import DesignSkillsForm from './forms/DesignSkillsForm.vue';

const props = defineProps({
  loading: Boolean,
  currentTheme: { type: String, default: 'dark' }
});
const emit = defineEmits(['submit-brief', 'theme-changed', 'open-settings', 'toggle-theme', 'preview-skill']);

const activeTab = ref('media');
const isSideNavOpen = ref(false);
const activeTabLabel = computed(() => {
  switch (activeTab.value) {
    case 'media': return 'Media Promosi';
    case 'assets': return 'Aset Visual';
    case 'portrait': return 'Pas Foto & Portrait';
    case 'uiux': return 'Mockup UI/UX';
    case 'products': return 'Foto Produk Studio';
    case 'scan': return 'Scan Image';
    case 'webgen': return 'Website Generator';
    case 'appgen': return 'App / APK Generator';
    case 'designskills': return 'Design Skills';
    default: return 'Design Brief';
  }
});

const autoFilling = ref(false);
const autoFillError = ref('');

// Refs for form components to dispatch parent "RANDOM FILL" header clicks
const mediaFormRef = ref(null);
const assetsFormRef = ref(null);
const portraitFormRef = ref(null);
const uiuxFormRef = ref(null);
const productsFormRef = ref(null);
const webgenFormRef = ref(null);
const appgenFormRef = ref(null);

const handleAutofillStatus = (status) => {
  autoFilling.value = status.autoFilling;
  if (status.error) {
    autoFillError.value = status.error;
    setTimeout(() => { autoFillError.value = ''; }, 4000);
  }
};

const autoFill = () => {
  if (activeTab.value === 'media' && mediaFormRef.value) {
    mediaFormRef.value.autoFill();
  } else if (activeTab.value === 'assets' && assetsFormRef.value) {
    assetsFormRef.value.autoFill();
  } else if (activeTab.value === 'portrait' && portraitFormRef.value) {
    portraitFormRef.value.autoFill();
  } else if (activeTab.value === 'uiux' && uiuxFormRef.value) {
    uiuxFormRef.value.autoFill();
  } else if (activeTab.value === 'products' && productsFormRef.value) {
    productsFormRef.value.autoFill();
  } else if (activeTab.value === 'webgen' && webgenFormRef.value) {
    webgenFormRef.value.autoFill();
  } else if (activeTab.value === 'appgen' && appgenFormRef.value) {
    appgenFormRef.value.autoFill();
  }
};

// ─── Shared Reactive States & Presets ──────────────────────────────────
const colorPresets = [
  { 
    name: 'Matte & Copper', 
    value: 'Hitam Matte, Aksen Tembaga, Abu Slate', 
    colors: ['#121318', '#c87a53', '#4b5563'] 
  },
  { 
    name: 'Monochrome', 
    value: 'Putih Bersih, Hitam Karbon, Aksen Kobalt', 
    colors: ['#f3f4f6', '#111827', '#2563eb'] 
  },
  { 
    name: 'Cold Luxury', 
    value: 'Abu Perak, Chrome, Smoke', 
    colors: ['#9ca3af', '#374151', '#4b5563'] 
  },
  { 
    name: 'Forest Amber', 
    value: 'Hijau Pinus Tua, Bone Cream, Aksen Amber', 
    colors: ['#064e3b', '#f5f5f4', '#d97706'] 
  },
];

const formData = reactive({
  judul: '',
  subjudul: '',
  deskripsi: '',
  slogan: '',
  whatsapp: '',
  instagram: '',
  youtube: '',
  tiktok: '',
  facebook: '',
  alamat: '',
  kontakLain: '',
  logoName: '',
  logoUrl: '',
  productPhotos: [],
  daftarProduk: '',
  elemen: '',
  formatMedia: 'Spanduk / Banner Horizontal',
  orientasi: 'Landscape',
  dimensi: '300x120 cm',
  warna: 'Kuning Hangat, Coklat Tua, Putih Krem',
  tema: '',
  cta: 'Beli Sekarang',
  mood: 'Fun & Playful',
  gayaVisual: '',
  referenceImages: [],
  mjVersion: '--v 6.0',
  mjStyle: '',
  instruksi: '',
  kategoriFont: 'Geometric Sans-serif (Satoshi/Inter)',
});

const formDataAssets = reactive({
  namaBrand: '',
  tagline: 'Kualitas & Kepercayaan',
  deskripsi: '',
  jenisAset: 'Logo Lengkap (Logotype + Logomark)',
  gayaDesain: '',
  gayaRendering: '',
  referensiGaya: '',
  warna: 'Navy Blue, Emas, Putih Krem',
  formatFile: 'PNG Transparan',
  background: 'Transparan',
  orientasi: 'Square',
  dimensi: '1024x1024 px',
  mjVersion: '--v 6.0',
  mjStyle: '',
  brandPersonality: ['Modern', 'Terjangkau / Friendly'],
  komposisi: 'Centered Flat Vector Icon',
  kompleksitas: 'Balanced Detail',
  targetSegment: 'Technology / Startup',
  efekFinishing: 'Clean Vector Paths',
  instruksi: '',
  referenceImages: [],
  kategoriFont: 'Geometric Sans-serif (Satoshi/Inter)',
});

const formDataPortrait = reactive({
  namaSubjek: '',
  genderUsia: 'Pria Dewasa (20-30 tahun)',
  tipeFoto: 'Pas Foto Resmi (KTP/Ijazah/Visa)',
  background: 'Latar Merah (KTP Indonesia)',
  pakaian: 'Jas Hitam Formal & Dasi',
  orientasi: 'Portrait',
  dimensi: '4x6 cm (Standard)',
  mjVersion: '--v 6.0',
  mjStyle: '',
  ekspresi: 'Senyum Ramah (Warm Smile)',
  shotType: 'Headshot Close-Up',
  pencahayaan: 'Studio Soft Box (Neutral)',
  kameraFokus: 'Sharp Focus (Deep DOF)',
  arahHadap: 'Menghadap Lurus (Frontal)',
  teksturWajah: 'Natural Skin Pores',
  instruksi: '',
});

const formDataUIUX = reactive({
  namaAplikasi: '',
  jenisUI: 'Web Landing Page (SaaS/Product)',
  temaDesain: 'Modern Minimalist SaaS (Clean & Airy)',
  warna: 'Biru Cyan & Slate Grey',
  orientasi: 'Landscape',
  dimensi: '1920x1080 px (Desktop)',
  mjVersion: '--v 6.0',
  mjStyle: '',
  widgets: ['Hero Section', 'Analytics Charts & Graphs'],
  deviceFrame: 'Flat 2D UI Design (Hanya Antarmuka)',
  sudutPandang: 'Flat 2D (Front View)',
  kepadatanData: 'Clean & Minimal Spacing',
  kategoriFont: 'Geometric Sans-serif (Satoshi/Inter)',
  shadowDepth: 'Flat 2D / No Shadow',
  instruksi: '',
});

const formDataProducts = reactive({
  namaProduk: '',
  gayaKomposisi: 'Eye-Level Front View (Standard)',
  elemenStudio: 'Podium Batu Alam & Air Tenang',
  pencahayaan: 'Studio Soft Box Lighting (Neutral)',
  warna: 'Cream & Olive Green',
  orientasi: 'Square',
  dimensi: '1080x1080 px (Square)',
  mjVersion: '--v 6.0',
  mjStyle: '',
  kemasanMaterial: 'Kaca Transparan (Clear Glass)',
  propsTambahan: ['Tetesan Embun Air'],
  bukaanLensa: 'f/1.8 (Extreme Bokeh)',
  permukaanDasar: 'Podium Travertine Batu Alam',
  efekAtmosfer: 'Tanpa Efek / Bersih',
  instruksi: '',
});

const formDataScan = reactive({
  imageName: '',
  imageUrl: '',
  imageBase64: '',
  targetOutput: 'Media Promosi',
  mjVersion: '--v 6.0',
  mjStyle: '',
  instruksi: '',
});

const formDataWebGen = reactive({
  namaProject: '',
  subjudul: '',
  slogan: '',
  deskripsi: '',
  techStack: 'Vue 3 + Vite / Nuxt 3',
  backendTech: 'Node.js + Fastify',
  databaseTech: 'Supabase (PostgreSQL)',
  mediaStorage: 'Cloudinary',
  uiKit: 'shadcn/ui',
  stateManagement: 'Zustand + TanStack Query',
  fiturUtama: ['Authentication (Login/Register)', 'Responsive Layout (Mobile & Desktop)'],
  prinsipUI: ['Minimalis Modern', 'Dark Mode Prioritas', 'Whitespace Lega (Clean)', 'Borderless & Minim Box'],
  libraryTambahan: ['zod (Validation)', 'vueuse (Vue composables)'],
  instruksi: '',
});

const formDataAppGen = reactive({
  namaApp: '',
  subjudul: '',
  slogan: '',
  deskripsi: '',
  techStack: 'Flutter',
  backendTech: 'Supabase Serverless',
  databaseTech: 'SQLite',
  mediaStorage: 'Local Storage',
  uiKit: 'Material Design 3',
  stateManagement: 'Bloc',
  fiturUtama: ['Push Notifications (FCM/APNS)', 'Biometric Authentication (FaceID/Fingerprint)'],
  prinsipUI: ['Native Gesture Navigation', 'Adaptive Dark Mode'],
  libraryTambahan: ['Lottie (Animations)'],
  targetPlatform: 'Universal',
  instruksi: '',
});

// ─── Preset Data Loader ──────────────────────────────────────────────
const loadPresetData = () => {
  formData.judul       = 'Promo Makan Hemat';
  formData.subjudul    = 'Diskon Hingga 40%';
  formData.deskripsi   = 'Paket spesial makan siang tersedia setiap hari mulai pukul 11.00 – 15.00.';
  formData.slogan      = 'Enak, Murah, Kenyang!';
  formData.whatsapp    = '0812-3456-7890';
  formData.instagram   = '@warung_santai';
  formData.youtube     = '';
  formData.tiktok      = '@warung_santai';
  formData.facebook    = 'WarungSantaiOfficial';
  formData.alamat      = 'Jl. Anggrek No. 12, Jakarta';
  formData.kontakLain  = 'warungsantai.com';
  formData.daftarProduk = 'Nasi Ayam Sambal Matah 20K\nNasi Iga Ayam Sambal Tahu Asin 22K\nNasi Iga Ayam Sambal Cabe Ijo 20K';
  formData.elemen      = 'Ornamen daun pisang, tampilan tradisional, warna hangat';
  formData.formatMedia = 'Spanduk / Banner Horizontal';
  formData.orientasi   = 'Landscape';
  formData.dimensi     = '300x120 cm';
  formData.warna       = 'Kuning Hangat, Coklat Tua, Putih Krem';
  formData.tema        = 'Minimalist/Calm/Editorial';
  formData.instruksi   = 'Kesan tradisional namun modern, mudah dibaca dari jarak jauh.';

  // Clear images inline
  if (formData.logoUrl) URL.revokeObjectURL(formData.logoUrl);
  formData.logoName = '';
  formData.logoUrl  = '';
  formData.productPhotos.forEach(p => URL.revokeObjectURL(p.url));
  formData.productPhotos = [];
  formData.referenceImages.forEach(r => URL.revokeObjectURL(r.url));
  formData.referenceImages = [];

  emit('theme-changed', formData.tema);
};

// ─── Submit Brief ────────────────────────────────────────────────────
const handleSubmit = () => {
  if (activeTab.value === 'assets') {
    emit('submit-brief', { ...formDataAssets, formType: 'assets' });
  } else if (activeTab.value === 'portrait') {
    emit('submit-brief', { ...formDataPortrait, formType: 'portrait' });
  } else if (activeTab.value === 'uiux') {
    emit('submit-brief', { ...formDataUIUX, formType: 'uiux' });
  } else if (activeTab.value === 'products') {
    emit('submit-brief', { ...formDataProducts, formType: 'products' });
  } else if (activeTab.value === 'scan') {
    emit('submit-brief', { ...formDataScan, formType: 'scan' });
  } else if (activeTab.value === 'webgen') {
    emit('submit-brief', { ...formDataWebGen, formType: 'webgen' });
  } else if (activeTab.value === 'appgen') {
    emit('submit-brief', { ...formDataAppGen, formType: 'appgen' });
  } else {
    emit('submit-brief', { ...formData, formType: 'media' });
  }
};

defineExpose({
  isSideNavOpen
});
</script>

<style>
/* ─── Container & General Layout ────────────────────────── */
.input-form-container {
  display: flex;
  flex-direction: row; /* Desktop side-nav layout */
  height: 100%;
  min-height: 0;
  overflow: hidden;
  position: relative; /* anchor for autofill overlay */
}

/* Close & toggle buttons default hidden on desktop */
.btn-menu-toggle,
.btn-close-sidenav {
  display: none;
}

/* ─── Side Navigation Panel ─────────────────────────────── */
.form-side-nav {
  width: 60px; /* Collapsed by default */
  flex-shrink: 0;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  padding: var(--space-md) 0;
  gap: var(--space-md);
  /* transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1); */
  overflow-y: auto;
  overflow-x: hidden;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.form-side-nav::-webkit-scrollbar {
  display: none;
}


/* Auto-expand on hover */
.form-side-nav:hover {
  width: 220px;
}

.nav-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 18px; /* Perfectly centered logo when collapsed */
  margin-bottom: var(--space-xs);
  /* transition: padding 0.3s cubic-bezier(0.16, 1, 0.3, 1); */
}

.form-side-nav:hover .nav-header {
  padding: 0 var(--space-md);
}

.nav-logo-mark {
  background: var(--accent-gradient);
  color: var(--text-on-accent);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  box-shadow: 0 0 10px var(--accent-glow);
}

.nav-logo-mark svg {
  width: 12px;
  height: 12px;
}

.nav-header-title {
  font-family: var(--display-font);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: var(--ls-widest);
  color: var(--text-dim);
  text-transform: uppercase;
  white-space: nowrap;
  opacity: 0;
  /* transition: opacity 0.2s ease; */
}

.form-side-nav:hover .nav-header-title {
  opacity: 1;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 8px;
}

.nav-menu-divider {
  height: 1px;
  background: var(--border-color);
  margin: 6px 8px;
  opacity: 0.6;
}

.nav-menu-btn {
  background: transparent;
  border: none;
  border-radius: 8px;
  color: var(--text-muted);
  font-family: var(--display-font);
  font-size: 0.8125rem;
  font-weight: 600;
  text-align: left;
  padding: 10px 15px; /* Centers icon when collapsed */
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.15s ease, color 0.15s ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}

.form-side-nav:hover .nav-menu-btn {
  padding: 10px 12px;
}

.nav-menu-btn:hover {
  color: var(--text-main);
  background: var(--bg-hover);
}

.nav-menu-btn.active {
  color: var(--accent-color);
  background: var(--accent-glow);
  font-weight: 700;
}

/* Vertical active indicator bar */
.nav-menu-btn.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 20%;
  height: 60%;
  width: 3px;
  background: var(--accent-gradient);
  border-radius: 0 4px 4px 0;
}

.nav-menu-btn svg {
  flex-shrink: 0;
  opacity: 0.7;
  transition: transform 0.2s;
}

.nav-menu-btn.active svg {
  opacity: 1;
  transform: scale(1.05);
}

.nav-menu-btn .btn-text {
  opacity: 0;
  /* transition: opacity 0.2s ease; */
  white-space: nowrap;
}

.form-side-nav:hover .nav-menu-btn .btn-text {
  opacity: 1;
}

/* ─── Form Main Area ────────────────────────────────────── */
.form-main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  overflow: hidden;
}

/* ─── Header ────────────────────────────────────────────── */
.form-header {
  flex-shrink: 0;
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-title {
  font-family: var(--display-font);
  font-size: var(--text-lg);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: var(--ls-wide);
  color: var(--text-main);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.btn-preset-reset {
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--text-xs);
  font-family: var(--display-font);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: var(--ls-wide);
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-preset-reset:hover { background: rgba(255, 255, 255, 0.07); color: var(--text-main); }
.btn-preset-reset:disabled { opacity: 0.4; cursor: not-allowed; }

/* ─── AI Auto Fill Button ───────────────────────────────── */
.form-header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.btn-ai-fill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--text-xs);
  font-family: var(--display-font);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: var(--ls-wide);
  color: var(--text-on-accent);
  background: var(--accent-gradient);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}
.btn-ai-fill::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
  transform: translateX(-100%);
  transition: transform 0s;
}
.btn-ai-fill:hover::before {
  transform: translateX(100%);
  transition: transform 0.5s ease;
}
.btn-ai-fill:hover {
  box-shadow: 0 0 16px var(--accent-glow);
  transform: translateY(-1px);
}
.btn-ai-fill:active { transform: scale(0.98); }
.btn-ai-fill:disabled {
  background: var(--text-dim);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-title-fill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  font-size: var(--text-xs);
  font-family: var(--display-font);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: var(--ls-wide);
  color: var(--accent-color);
  background: var(--accent-glow);
  border: 1px dashed var(--accent-border-dashed);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.btn-title-fill:hover:not(:disabled) {
  background: var(--bg-hover);
  border-color: var(--accent-color);
  box-shadow: 0 0 12px var(--accent-glow);
  transform: translateY(-1px);
}
.btn-title-fill:active:not(:disabled) {
  transform: scale(0.99);
}
.btn-title-fill:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  border-color: rgba(255, 255, 255, 0.1);
  color: var(--text-dim);
}

.ai-fill-icon {
  display: flex;
  align-items: center;
}

.ai-fill-spinner {
  display: inline-block;
  width: 11px;
  height: 11px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: var(--text-on-accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

/* ─── AutoFill Error Toast ──────────────────────────────── */
.autofill-error {
  margin: 0 var(--space-lg) var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 6px;
  color: #fca5a5;
  font-size: var(--text-xs);
  line-height: var(--lh-base);
  animation: fadeIn 0.25s ease;
}

/* ─── Scrollable Body ───────────────────────────────────── */
.form-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 0;
}

/* ─── Sections ──────────────────────────────────────────── */
.form-section {
  padding: var(--space-lg);
  border-bottom: 1px solid var(--border-color);
}
.last-section { border-bottom: none; }

.section-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.section-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--accent-gradient);
  color: var(--text-on-accent);
  font-family: var(--display-font);
  font-size: var(--text-xs);
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.section-title {
  font-family: var(--display-font);
  font-size: var(--text-sm);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: var(--ls-widest);
  color: var(--text-muted);
}

.section-badge {
  margin-left: auto;
  font-family: var(--mono-font);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: var(--ls-wide);
  color: var(--accent-color);
  background: rgba(0, 240, 255, 0.06);
  border: 1px solid rgba(0, 240, 255, 0.2);
  padding: 3px 8px;
  border-radius: 4px;
}

/* ─── 2-column grid ─────────────────────────────────────── */
.field-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  align-items: start;
}

.field-grid-2 > * {
  min-width: 0;
}

/* ─── Social dots ───────────────────────────────────────── */
.social-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.social-dot.wa   { background: #25d366; }
.social-dot.ig   { background: #e1306c; }
.social-dot.yt   { background: #ff0000; }
.social-dot.tt   { background: #69c9d0; }
.social-dot.fb   { background: #1877f2; }
.social-dot.addr { background: #f59e0b; }

.kontak-plus {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1.5px solid var(--text-dim);
  color: var(--text-dim);
  font-size: 0.65rem;
  line-height: 1;
}

/* ─── Upload: Logo dropzone ─────────────────────────────── */
.hidden-input { display: none !important; }

.upload-dropzone {
  border: 1px dashed var(--border-color);
  border-radius: 8px;
  background: var(--bg-input);
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
.upload-dropzone:hover {
  border-color: var(--accent-color);
  background: var(--accent-glow);
}

.upload-icon-wrap {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px dashed var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-dim);
  margin-bottom: var(--space-xs);
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: var(--text-dim);
  font-size: var(--text-xs);
  font-family: var(--sans-font);
}

.upload-preview-single {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  width: 100%;
  padding: 0 var(--space-sm);
  position: relative;
  padding-right: 30px;
}

.preview-img-logo {
  height: 40px;
  width: 40px;
  object-fit: contain;
  border-radius: 4px;
  background: rgba(0,0,0,0.25);
  border: 1px solid var(--border-color);
  padding: 2px;
}

.preview-filename {
  font-size: var(--text-xs);
  color: var(--text-main);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.btn-remove-file {
  position: absolute;
  right: var(--space-sm);
  background: transparent;
  border: none;
  color: var(--error-color);
  font-size: 1.2rem;
  cursor: pointer;
  line-height: 1;
}

/* ─── Photo grid ────────────────────────────────────────── */
.photo-upload-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.photo-cell {
  width: 76px;
  height: 76px;
  border-radius: 8px;
  border: 1px dashed var(--border-color);
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.photo-cell.add-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  background: var(--bg-input);
  color: var(--text-dim);
  font-size: 0.75rem;
  font-family: var(--sans-font);
  transition: all 0.2s ease;
}
.photo-cell.add-cell:hover {
  border-color: var(--accent-color);
  background: var(--accent-glow);
  color: var(--accent-color);
}
.photo-cell.add-cell .upload-icon-wrap { margin-bottom: 0; }

.photo-cell.filled { border-style: solid; border-color: var(--border-color); }

.photo-cell-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-remove-cell {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(239,68,68,0.9);
  color: #fff;
  border: none;
  font-size: 0.65rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ─── Labels and hints ──────────────────────────────────── */
.label-note {
  font-family: var(--sans-font);
  font-size: 0.75rem;
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
  color: var(--text-dim);
  margin-left: 4px;
}

.field-hint {
  font-size: 0.75rem;
  color: var(--text-dim);
  line-height: var(--lh-base);
  margin-top: var(--space-xs);
  font-style: italic;
}

/* ─── Color chips ───────────────────────────────────────── */
.color-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-top: var(--space-xs);
}

.color-chip {
  font-size: var(--text-nano);
  font-family: var(--display-font);
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 4px;
  padding: 2px var(--space-xs);
  color: var(--text-dim);
  cursor: pointer;
  transition: all 0.15s ease;
  letter-spacing: var(--ls-wide);
}
.color-chip:hover {
  background: rgba(255,255,255,0.07);
  color: var(--text-main);
}
.color-chip.active {
  background: rgba(0, 240, 255, 0.12);
  border-color: var(--accent-color);
  color: var(--accent-color);
}

/* ─── Sticky footer / Generate button ──────────────────── */
.form-footer {
  flex-shrink: 0;
  padding: var(--space-md) var(--space-lg);
  border-top: 1px solid var(--border-color);
  background: var(--bg-card);
}

.btn-generate {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-lg);
  background: var(--accent-gradient);
  color: var(--text-on-accent);
  font-family: var(--display-font);
  font-size: var(--text-sm);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: var(--ls-wide);
  line-height: var(--lh-tight);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.btn-generate:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 20px var(--accent-glow);
}
.btn-generate:active { transform: scale(0.99); }
.btn-generate:disabled {
  background: var(--text-dim);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.w-full { width: 100%; }

/* ─── Spinner ───────────────────────────────────────────── */
.loader-spinner {
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top: 2px solid var(--text-on-accent);
  border-radius: 50%;
  width: 14px;
  height: 14px;
  animation: spin 0.8s linear infinite;
  display: inline-block;
}
@keyframes spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* ─── AutoFill Overlay ──────────────────────────────────── */
.autofill-overlay {
  position: absolute;
  inset: 0;
  z-index: 50;
  background: var(--bg-overlay);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
}

.autofill-overlay-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  text-align: center;
}

.autofill-pulse {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--accent-glow);
  border: 1.5px solid var(--accent-border-dashed);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-color);
  animation: overlayPulse 1.4s ease-in-out infinite;
  box-shadow: 0 0 0 0 var(--accent-glow);
}

@keyframes overlayPulse {
  0%   { box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.3);  }
  60%  { box-shadow: 0 0 0 14px rgba(0, 240, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 240, 255, 0);    }
}

.autofill-overlay-text {
  font-family: var(--display-font);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
}

.autofill-overlay-sub {
  font-family: var(--mono-font);
  font-size: var(--text-nano);
  color: var(--accent-color);
  letter-spacing: var(--ls-widest);
  opacity: 0.7;
}

/* ─── Fade-toast transition ─────────────────────────────── */
.fade-toast-enter-active,
.fade-toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-toast-enter-from,
.fade-toast-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
/* ─── AI Word Count Validation Badges ───────────────────── */
.word-counter-badge {
  font-family: var(--display-font);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  margin-top: 4px;
  display: inline-flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 4px;
  max-width: 100%;
  letter-spacing: 0.02em;
  line-height: 1.3;
}

.badge-success {
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.2);
  color: var(--text-success);
}

.badge-warning {
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.2);
  color: var(--text-warning);
}

.badge-danger {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: var(--text-danger);
}

/* ─── Visual Color Palette Preset Picker ────────────────── */
.visual-color-presets {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-top: var(--space-sm);
}

.visual-preset-card {
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 8px 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
  text-align: center;
}

.visual-preset-card:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-color);
}

.visual-preset-card.active {
  background: var(--accent-glow);
  border-color: var(--accent-color);
  box-shadow: 0 0 12px var(--accent-glow);
  transform: scale(1.02);
}

.preset-colors {
  display: flex;
  gap: 4px;
}

.preset-color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.preset-name {
  font-family: var(--display-font);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-muted);
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.visual-preset-card.active .preset-name {
  color: var(--accent-color);
}

/* ─── Drag & Drop Animation Effects ─────────────────────── */
.upload-dropzone {
  transition: all 0.2s ease;
}

.upload-dropzone.dragging {
  border-color: var(--accent-color) !important;
  background: var(--accent-glow) !important;
  box-shadow: 0 0 18px var(--accent-glow) !important;
}

.upload-dropzone.dragging .upload-icon-wrap {
  transform: scale(1.2);
  color: var(--accent-color);
}

/* ─── Real-Time SVG Aspect Ratio Preview ────────────────── */
.canvas-preview-section {
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: var(--space-lg);
  display: flex;
  align-items: center;
  gap: 16px;
}

.canvas-preview-box {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.canvas-preview-shape {
  width: 100px;
  height: 100px;
  background: var(--bg-input);
  border: 1px solid var(--accent-border-dashed);
  box-shadow: 0 0 12px var(--accent-glow);
  border-radius: 6px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-color);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  flex-shrink: 0;
}

.canvas-preview-shape.landscape {
  width: 100px;
  height: 56px;
}

.canvas-preview-shape.portrait {
  width: 56px;
  height: 100px;
}

.canvas-preview-shape.square {
  width: 80px;
  height: 80px;
}

.spiral-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  color: var(--accent-border-dashed);
}

.canvas-ratio-label {
  font-family: var(--mono-font);
  font-size: var(--text-xs);
  font-weight: 700;
  z-index: 2;
  background: var(--bg-card);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  color: var(--accent-color);
}

.canvas-preview-details {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.preview-tag {
  font-family: var(--mono-font);
  font-size: var(--text-nano);
  color: var(--accent-color);
  letter-spacing: var(--ls-widest);
  opacity: 0.85;
}

.preview-dimension {
  font-family: var(--display-font);
  font-size: var(--text-md);
  font-weight: 700;
  color: var(--text-main);
}

.preview-desc {
  font-size: var(--text-xs);
  color: var(--text-dim);
}

/* ─── Sidebar Generator Links ─────────────────────────── */
.sidebar-generator-links {
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  /* transition: opacity 0.25s ease, visibility 0.25s ease; */
  padding: 0 12px;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-side-nav:hover .sidebar-generator-links,
.form-side-nav.open .sidebar-generator-links {
  opacity: 1;
  pointer-events: auto;
  visibility: visible;
}

.sidebar-generator-links .generator-links-label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: var(--mono-font);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: var(--ls-widest);
  color: var(--accent-color);
  text-transform: uppercase;
}

.sidebar-generator-links .generator-btns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
}

.sidebar-generator-links .gen-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 4px;
  border-radius: 6px;
  font-family: var(--display-font);
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  text-decoration: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}

.sidebar-generator-links .gen-btn::after {
  content: '↗';
  font-size: 0.55rem;
  opacity: 0.6;
  margin-left: 1px;
}

.sidebar-generator-links .gen-btn:hover {
  transform: translateY(-2px);
}

.sidebar-generator-links .gen-btn svg {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
}

/* Copilot — blue */
.sidebar-generator-links .gen-copilot {
  background: rgba(0, 120, 212, 0.12);
  border-color: rgba(0, 120, 212, 0.3);
  color: #60a5fa;
}
.sidebar-generator-links .gen-copilot:hover {
  background: rgba(0, 120, 212, 0.22);
  border-color: rgba(0, 120, 212, 0.6);
  box-shadow: 0 0 12px rgba(0, 120, 212, 0.25);
}

/* Ideogram — violet */
.sidebar-generator-links .gen-ideogram {
  background: rgba(139, 92, 246, 0.12);
  border-color: rgba(139, 92, 246, 0.3);
  color: #c4b5fd;
}
.sidebar-generator-links .gen-ideogram:hover {
  background: rgba(139, 92, 246, 0.22);
  border-color: rgba(139, 92, 246, 0.6);
  box-shadow: 0 0 12px rgba(139, 92, 246, 0.25);
}

/* Gemini — cyan-blue */
.sidebar-generator-links .gen-gemini {
  background: rgba(66, 133, 244, 0.12);
  border-color: rgba(66, 133, 244, 0.3);
  color: #93c5fd;
}
.sidebar-generator-links .gen-gemini:hover {
  background: rgba(66, 133, 244, 0.22);
  border-color: rgba(66, 133, 244, 0.6);
  box-shadow: 0 0 12px rgba(66, 133, 244, 0.25);
}

/* Firefly — orange-red */
.sidebar-generator-links .gen-firefly {
  background: rgba(255, 90, 31, 0.12);
  border-color: rgba(255, 90, 31, 0.3);
  color: #fdba74;
}
.sidebar-generator-links .gen-firefly:hover {
  background: rgba(255, 90, 31, 0.22);
  border-color: rgba(255, 90, 31, 0.6);
  box-shadow: 0 0 12px rgba(255, 90, 31, 0.25);
}

/* Leonardo — gold */
.sidebar-generator-links .gen-leonardo {
  background: rgba(234, 179, 8, 0.12);
  border-color: rgba(234, 179, 8, 0.3);
  color: #fde047;
}
.sidebar-generator-links .gen-leonardo:hover {
  background: rgba(234, 179, 8, 0.22);
  border-color: rgba(234, 179, 8, 0.6);
  box-shadow: 0 0 12px rgba(234, 179, 8, 0.25);
}

/* Dezgo — teal */
.sidebar-generator-links .gen-dezgo {
  background: rgba(20, 184, 166, 0.12);
  border-color: rgba(20, 184, 166, 0.3);
  color: #5eead4;
}
.sidebar-generator-links .gen-dezgo:hover {
  background: rgba(20, 184, 166, 0.22);
  border-color: rgba(20, 184, 166, 0.6);
  box-shadow: 0 0 12px rgba(20, 184, 166, 0.25);
}

/* Light Theme Overrides for Generator Links */
:root[data-theme="light"] .sidebar-generator-links .gen-copilot {
  background: rgba(0, 120, 212, 0.08);
  border-color: rgba(0, 120, 212, 0.25);
  color: #005699;
}
:root[data-theme="light"] .sidebar-generator-links .gen-copilot:hover {
  background: rgba(0, 120, 212, 0.16);
  border-color: rgba(0, 120, 212, 0.5);
  box-shadow: 0 0 12px rgba(0, 120, 212, 0.15);
}

:root[data-theme="light"] .sidebar-generator-links .gen-ideogram {
  background: rgba(139, 92, 246, 0.08);
  border-color: rgba(139, 92, 246, 0.25);
  color: #6d28d9;
}
:root[data-theme="light"] .sidebar-generator-links .gen-ideogram:hover {
  background: rgba(139, 92, 246, 0.16);
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow: 0 0 12px rgba(139, 92, 246, 0.15);
}

:root[data-theme="light"] .sidebar-generator-links .gen-gemini {
  background: rgba(66, 133, 244, 0.08);
  border-color: rgba(66, 133, 244, 0.25);
  color: #1a73e8;
}
:root[data-theme="light"] .sidebar-generator-links .gen-gemini:hover {
  background: rgba(66, 133, 244, 0.16);
  border-color: rgba(66, 133, 244, 0.5);
  box-shadow: 0 0 12px rgba(66, 133, 244, 0.15);
}

:root[data-theme="light"] .sidebar-generator-links .gen-firefly {
  background: rgba(234, 88, 12, 0.08);
  border-color: rgba(234, 88, 12, 0.25);
  color: #c2410c;
}
:root[data-theme="light"] .sidebar-generator-links .gen-firefly:hover {
  background: rgba(234, 88, 12, 0.16);
  border-color: rgba(234, 88, 12, 0.5);
  box-shadow: 0 0 12px rgba(234, 88, 12, 0.15);
}

:root[data-theme="light"] .sidebar-generator-links .gen-leonardo {
  background: rgba(217, 119, 6, 0.08);
  border-color: rgba(217, 119, 6, 0.25);
  color: #b45309;
}
:root[data-theme="light"] .sidebar-generator-links .gen-leonardo:hover {
  background: rgba(217, 119, 6, 0.16);
  border-color: rgba(217, 119, 6, 0.5);
  box-shadow: 0 0 12px rgba(217, 119, 6, 0.15);
}

:root[data-theme="light"] .sidebar-generator-links .gen-dezgo {
  background: rgba(13, 148, 136, 0.08);
  border-color: rgba(13, 148, 136, 0.25);
  color: #0f766e;
}
:root[data-theme="light"] .sidebar-generator-links .gen-dezgo:hover {
  background: rgba(13, 148, 136, 0.16);
  border-color: rgba(13, 148, 136, 0.5);
  box-shadow: 0 0 12px rgba(13, 148, 136, 0.15);
}

/* ─── Responsive Adjustments ────────────────────────────── */
@media (max-width: 1023px) {
  .input-form-container {
    flex-direction: column;
  }
  
  /* Sidenav Backdrop */
  .sidenav-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 140;
    /* animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; */
  }
  
  /* Menu Trigger Buttons */
  .btn-menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--text-main);
    cursor: pointer;
    padding: 6px;
    margin-right: 8px;
    border-radius: 6px;
    transition: all 0.2s;
  }
  
  .btn-menu-toggle:hover {
    background: rgba(255, 255, 255, 0.08);
    color: var(--accent-color);
  }
  
  .btn-close-sidenav {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--text-dim);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 4px;
    margin-left: auto;
    transition: all 0.2s;
    line-height: 1;
  }
  
  .btn-close-sidenav:hover {
    color: var(--error-color);
  }
  
  /* Sidenav drawer styled */
  .form-side-nav {
    position: fixed !important;
    top: 0;
    left: 0;
    height: 100dvh !important;
    width: 280px !important;
    background: var(--bg-sidebar-mobile) !important;
    backdrop-filter: blur(20px);
    border-right: 1px solid rgba(0, 240, 255, 0.15) !important;
    border-bottom: none !important;
    z-index: 150 !important;
    transform: translateX(-100%);
    transition: none !important;
    display: flex !important;
    flex-direction: column !important;
    padding: var(--space-md) 0 !important;
    gap: var(--space-md) !important;
  }
  
  .form-side-nav.open {
    transform: translateX(0) !important;
    box-shadow: 10px 0 35px rgba(0, 0, 0, 0.6);
  }
  
  .form-side-nav:hover {
    width: 280px !important;
  }
  
  .nav-header {
    display: flex !important;
    align-items: center !important;
    padding: 0 20px !important;
    margin-bottom: var(--space-xs);
  }
  
  .nav-header-title {
    opacity: 1 !important;
    display: block !important;
    font-size: var(--text-md) !important;
  }
  
  .nav-menu {
    flex-direction: column !important;
    padding: 0 12px !important;
    gap: 8px !important;
    overflow-y: auto !important;
    overflow-x: visible !important;
  }
  
  .nav-menu::-webkit-scrollbar {
    width: 2px;
  }
  
  .nav-menu-btn {
    border-radius: 8px !important;
    border-bottom: none !important;
    padding: 12px 16px !important;
    font-size: 0.85rem !important;
    width: 100% !important;
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
    color: var(--text-muted) !important;
    background: transparent !important;
    transition: all 0.2s ease !important;
  }
  
  .nav-menu-btn:hover {
    background: rgba(255, 255, 255, 0.05) !important;
    color: var(--text-main) !important;
  }
  
  .nav-menu-btn.active {
    color: var(--accent-color) !important;
    background: var(--accent-glow) !important;
    font-weight: 700;
  }
  
  .nav-menu-btn.active::before {
    display: block !important;
    content: "" !important;
    background: var(--accent-gradient) !important;
    border-radius: 0 4px 4px 0 !important;
    width: 3px !important;
    height: 50% !important;
    position: absolute !important;
    top: 25% !important;
    left: 0 !important;
  }
  
  .nav-menu-btn .btn-text {
    opacity: 1 !important;
    display: block !important;
  }
  
  .sidebar-generator-links {
    opacity: 1 !important;
    pointer-events: auto !important;
    visibility: visible !important;
    padding: 0 16px !important;
    margin-top: auto !important;
    margin-bottom: var(--space-md) !important;
  }
}

@media (max-width: 639px) {
  .form-header {
    padding: var(--space-sm) var(--space-md);
  }
  
  .form-section {
    padding: var(--space-md);
  }
  
  .field-grid-2 {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }
  
  .visual-color-presets {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .form-footer {
    padding: var(--space-sm) var(--space-md);
  }
  
  .btn-generate {
    padding: var(--space-sm) var(--space-md);
  }
}

@media (max-width: 479px) {
  .canvas-preview-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 12px;
    gap: 12px;
  }
  
  .canvas-preview-box {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}

</style>
