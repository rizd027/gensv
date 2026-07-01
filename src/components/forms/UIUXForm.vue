<template>
  <div class="form-body">
    <!-- SECTION 1 — DETAIL PRODUK DIGITAL -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">1</span>
        <h4 class="section-title">DETAIL PRODUK DIGITAL</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Nama Aplikasi / Layanan</label>
        <div class="input-wrapper">
          <input type="text" v-model="formDataUIUX.namaAplikasi" class="input-text" placeholder="E.g. PayWise, KasirHub, Travelia App..." />
          <button v-if="formDataUIUX.namaAplikasi" @click="formDataUIUX.namaAplikasi = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
        </div>
      </div>
      <div class="form-group" style="margin-top: 8px; margin-bottom: var(--space-md);">
        <button type="button" @click="autoFillUIUX" class="btn-title-fill" :disabled="autoFilling || loading">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
            stroke-linejoin="round" style="margin-right: 5px;">
            <path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/>
            <path d="M17.8 11.8 19 13"/><path d="M15 9h0"/><path d="M17.8 6.2 19 5"/>
            <path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/>
          </svg>
          AI Fill UI/UX Data
        </button>
      </div>
      <div class="form-group">
        <label class="form-label">Jenis Antarmuka UI</label>
        <CustomSelect v-model="formDataUIUX.jenisUI" :options="jenisUIOptions" />
      </div>
    </div>

    <!-- SECTION 2 — STYLE & WARNA -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">2</span>
        <h4 class="section-title">GAYA VISUAL & WARNA</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Vibe Desain (Design System)</label>
        <CustomSelect v-model="formDataUIUX.temaDesain" :options="temaDesainUIOptions" />
      </div>
      <div class="form-group">
        <label class="form-label">Aksen & Skema Warna UI</label>
        <div class="input-wrapper">
          <input type="text" v-model="formDataUIUX.warna" class="input-text" placeholder="E.g. Emerald Green (#10b981) & Slate Grey" />
          <button v-if="formDataUIUX.warna" @click="formDataUIUX.warna = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
        </div>
      </div>

      <div class="form-group" style="margin-top: var(--space-md);">
        <label class="form-label">Komponen Utama Halaman <span class="label-note">(Pilih beberapa)</span></label>
        <div class="color-chips">
          <div 
            v-for="o in uiWidgetsOptions" 
            :key="o" 
            class="color-chip"
            :class="{ active: formDataUIUX.widgets.includes(o) }"
            @click="toggleUIWidget(o)"
          >
            {{ o }}
          </div>
        </div>
      </div>

      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Bingkai / Frame Mockup</label>
          <CustomSelect v-model="formDataUIUX.deviceFrame" :options="deviceFrameOptions" />
        </div>
        <div class="form-group">
          <label class="form-label">Sudut Pandang / View Angle</label>
          <CustomSelect v-model="formDataUIUX.sudutPandang" :options="uiuxSudutPandangOptions" />
        </div>
      </div>

      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Kepadatan Data Spacing</label>
          <CustomSelect v-model="formDataUIUX.kepadatanData" :options="kepadatanDataOptions" />
        </div>
        <div class="form-group">
          <label class="form-label">Kategori Font Family</label>
          <CustomSelect v-model="formDataUIUX.kategoriFont" :options="kategoriFontOptions" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Efek Bayangan & Kedalaman</label>
        <CustomSelect v-model="formDataUIUX.shadowDepth" :options="shadowDepthOptions" />
      </div>
    </div>

    <!-- SECTION 3 — DIMENSI & PREVIEW -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">3</span>
        <h4 class="section-title">SPESIFIKASI LAYOUT</h4>
      </div>
      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Orientasi / Target Devais</label>
          <CustomSelect v-model="formDataUIUX.orientasi" :options="orientasiOptions" @change="setUIUXOrientasiDefault" />
        </div>
        <div class="form-group">
          <label class="form-label">Resolusi Mockup</label>
          <div class="input-wrapper">
            <input type="text" v-model="formDataUIUX.dimensi" class="input-text" placeholder="E.g. 1920x1080 px" />
            <button v-if="formDataUIUX.dimensi" @click="formDataUIUX.dimensi = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
          </div>
        </div>
      </div>

      <!-- Real-Time SVG Aspect Ratio Preview Card for UI/UX -->
      <div class="canvas-preview-section">
        <div class="canvas-preview-box">
          <div class="canvas-preview-shape" :class="formDataUIUX.orientasi.toLowerCase()">
            <svg class="spiral-svg" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <line x1="38.2" y1="0" x2="38.2" y2="100" stroke-dasharray="2,3" opacity="0.25"></line>
              <line x1="61.8" y1="0" x2="61.8" y2="100" stroke-dasharray="2,3" opacity="0.25"></line>
              <line x1="0" y1="38.2" x2="100" y2="38.2" stroke-dasharray="2,3" opacity="0.25"></line>
              <line x1="0" y1="61.8" x2="100" y2="61.8" stroke-dasharray="2,3" opacity="0.25"></line>
              <path d="M 61.8 38.2 A 23.6 23.6 0 0 0 38.2 61.8 A 38.2 38.2 0 0 0 76.4 100 A 61.8 61.8 0 0 0 100 0 A 100 100 0 0 0 0 100" opacity="0.18" stroke-width="1.5"></path>
            </svg>
            <div class="canvas-ratio-label">{{ getUIUXRatioLabel() }}</div>
          </div>
          <div class="canvas-preview-details">
            <span class="preview-tag">CANVAS RATIO PREVIEW</span>
            <span class="preview-dimension">{{ formDataUIUX.dimensi || '-' }}</span>
            <span class="preview-desc">Rasio area layar devais target.</span>
          </div>
        </div>
      </div>

      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Model Generator</label>
          <CustomSelect v-model="formDataUIUX.mjVersion" :options="mjVersionOptions" />
        </div>
        <div class="form-group">
          <label class="form-label">Parameter Style</label>
          <CustomSelect v-model="formDataUIUX.mjStyle" :options="mjStyleOptions" />
        </div>
      </div>
    </div>

    <!-- SECTION 4 — DETAIL WIDGET -->
    <div class="form-section last-section">
      <div class="section-header">
        <span class="section-num">4</span>
        <h4 class="section-title">WIDGET & KEBUTUHAN KHUSUS</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Detail Widget / Isi Halaman <span class="label-note">(Opsional)</span></label>
        <textarea v-model="formDataUIUX.instruksi" class="input-textarea large-textarea" rows="4"
          placeholder="E.g. Tampilkan tabel transaksi di bagian kiri, grafik tren garis biru bercahaya di kanan..."></textarea>
        <p class="field-hint">Sebutkan konten penting, tombol, navigasi, atau grafik yang harus ada di dalam antarmuka UI.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomSelect from '../CustomSelect.vue';
import { getApiConfig } from '../../utils/api.js';
import {
  jenisUIOptions,
  temaDesainUIOptions,
  uiWidgetsOptions,
  deviceFrameOptions,
  uiuxSudutPandangOptions,
  kepadatanDataOptions,
  kategoriFontOptions,
  shadowDepthOptions,
  orientasiOptions,
  mjVersionOptions,
  mjStyleOptions
} from '../../constants/formOptions.js';

const props = defineProps({
  formDataUIUX: Object,
  loading: Boolean,
  autoFilling: Boolean
});

const emit = defineEmits(['update-autofill-status']);

const fetchAI = async (body, options = {}) => {
  const { url, headers } = getApiConfig(body.model);
  return fetch(url, {
    method: 'POST',
    headers: { ...headers, ...options.headers },
    signal: options.signal,
    body: JSON.stringify(body)
  });
};

const getUIUXRatioLabel = () => {
  if (props.formDataUIUX.orientasi === 'Landscape') return '16:9';
  if (props.formDataUIUX.orientasi === 'Portrait') return '9:16';
  return '1:1';
};

const setUIUXOrientasiDefault = () => {
  if (props.formDataUIUX.orientasi === 'Landscape') {
    props.formDataUIUX.dimensi = '1920x1080 px (Desktop)';
  } else if (props.formDataUIUX.orientasi === 'Portrait') {
    props.formDataUIUX.dimensi = '1080x1920 px (Mobile)';
  } else {
    props.formDataUIUX.dimensi = '1080x1080 px (Square)';
  }
};

const toggleUIWidget = (val) => {
  const idx = props.formDataUIUX.widgets.indexOf(val);
  if (idx > -1) {
    props.formDataUIUX.widgets.splice(idx, 1);
  } else {
    props.formDataUIUX.widgets.push(val);
  }
};

const autoFillUIUX = async () => {
  emit('update-autofill-status', { autoFilling: true, error: '' });

  const model  = 'llama-3.3-70b-versatile';

  const systemPrompt = `[ROLE / PERSONA]
You are a creative copywriter and UI/UX product designer.

[CONTEXT]
You are helping a designer generate a mock digital application profile to auto-populate layout mockup prompts.

[TASK]
Generate a realistic, specific app identity and visual layout guidelines.

[INSTRUCTION]
Return ONLY a valid JSON object matching the requested keys. Use professional tech terminology.

[PARAMETERS / CONSTRAINTS]
Output must be valid JSON with exact specified keys. Descriptions must be in Indonesian.`;

  const userPrompt = `Generate a mockup app UI profile.
Return ONLY a valid JSON object with EXACTLY these keys:
{
  "namaAplikasi": "realistic fictional tech startup name (e.g. KasirHub, FinGo)",
  "jenisUI": "one of: 'Web Landing Page (SaaS/Product)', 'Admin Dashboard Analytics', 'Mobile App Screen UI', 'E-Commerce Storefront', 'Portfolio Website'",
  "temaDesain": "one of: 'Modern Minimalist SaaS (Clean & Airy)', 'Dark Mode Glassmorphism (Futuristic)', 'Neo-Brutalism (Bold Colors & High Contrast)', 'Retro / Vintage Web (Cyberpunk/90s)', 'Premium Luxury Brand'",
  "warna": "2 dominant UI colors with hex hints",
  "orientasi": "one of: 'Landscape', 'Portrait', 'Square'",
  "dimensi": "mockup resolution (e.g. 1920x1080 px (Desktop), 1080x1920 px (Mobile))",
  "instruksi": "1-2 sentence Indonesian visual UI guidelines (layout split, cards, specific buttons, widgets)"
}`;

  try {
    const response = await fetchAI({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userPrompt },
      ],
      temperature: 0.9,
      max_tokens: 500,
      response_format: { type: 'json_object' },
    });

    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }

    const data = await response.json();
    const parsed = JSON.parse(data.choices[0].message.content || '{}');

    props.formDataUIUX.namaAplikasi = parsed.namaAplikasi || 'KasirHub';
    props.formDataUIUX.jenisUI      = parsed.jenisUI      || 'Web Landing Page (SaaS/Product)';
    props.formDataUIUX.temaDesain   = parsed.temaDesain   || 'Modern Minimalist SaaS (Clean & Airy)';
    props.formDataUIUX.warna        = parsed.warna        || 'Biru Cyan & Slate Grey';
    props.formDataUIUX.orientasi    = parsed.orientasi    || 'Landscape';
    props.formDataUIUX.dimensi      = parsed.dimensi      || '1920x1080 px (Desktop)';
    props.formDataUIUX.kepadatanData = kepadatanDataOptions[Math.floor(Math.random() * kepadatanDataOptions.length)];
    props.formDataUIUX.kategoriFont = kategoriFontOptions[Math.floor(Math.random() * kategoriFontOptions.length)];
    props.formDataUIUX.shadowDepth = shadowDepthOptions[Math.floor(Math.random() * shadowDepthOptions.length)];
    props.formDataUIUX.sudutPandang = uiuxSudutPandangOptions[Math.floor(Math.random() * uiuxSudutPandangOptions.length)];
    props.formDataUIUX.instruksi    = parsed.instruksi    || '';

    emit('update-autofill-status', { autoFilling: false, error: '' });
  } catch (err) {
    console.error(err);
    emit('update-autofill-status', { autoFilling: false, error: 'Gagal generate UI/UX data.' });
  }
};

const autoFill = () => {
  autoFillUIUX();
};

defineExpose({
  autoFill
});
</script>
