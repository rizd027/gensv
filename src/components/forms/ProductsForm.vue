<template>
  <div class="form-body">
    <!-- SECTION 1 — INFORMASI PRODUK -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">1</span>
        <h4 class="section-title">INFORMASI PRODUK</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Nama & Kategori Produk</label>
        <div class="input-wrapper">
          <input type="text" v-model="formDataProducts.namaProduk" class="input-text" placeholder="E.g. Botol Serum Wajah (Skincare), Sneakers Kulit..." />
          <button v-if="formDataProducts.namaProduk" @click="formDataProducts.namaProduk = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
        </div>
      </div>
      <div class="form-group" style="margin-top: 8px; margin-bottom: var(--space-md);">
        <button type="button" @click="autoFillProducts" class="btn-title-fill" :disabled="autoFilling || loading">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
            stroke-linejoin="round" style="margin-right: 5px;">
            <path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/>
            <path d="M17.8 11.8 19 13"/><path d="M15 9h0"/><path d="M17.8 6.2 19 5"/>
            <path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/>
          </svg>
          AI Fill Product Studio Data
        </button>
      </div>
      <div class="form-group">
        <label class="form-label">Gaya Komposisi Kamera</label>
        <CustomSelect v-model="formDataProducts.gayaKomposisi" :options="gayaKomposisiOptions" />
      </div>

      <div class="form-group">
        <label class="form-label">Bahan Kemasan / Material Produk</label>
        <CustomSelect v-model="formDataProducts.kemasanMaterial" :options="materialKemasanOptions" />
      </div>
    </div>

    <!-- SECTION 2 — PROPERTIS STUDIO & CAHAYA -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">2</span>
        <h4 class="section-title">PROPERTI & PENCAHAYAAN STUDIO</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Elemen Pendukung Studio (Pedestal/Prop)</label>
        <CustomSelect v-model="formDataProducts.elemenStudio" :options="elemenStudioOptions" />
      </div>
      <div class="form-group">
        <label class="form-label">Jenis Cahaya & Atmosfer</label>
        <CustomSelect v-model="formDataProducts.pencahayaan" :options="pencahayaanOptions" />
      </div>
      <div class="form-group">
        <label class="form-label">Nuansa Warna Studio</label>
        <div class="input-wrapper">
          <input type="text" v-model="formDataProducts.warna" class="input-text" placeholder="E.g. Warm Beige (#f5ebe0) & Sand" />
          <button v-if="formDataProducts.warna" @click="formDataProducts.warna = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
        </div>
      </div>

      <div class="field-grid-2" style="margin-top: 12px;">
        <div class="form-group">
          <label class="form-label">Bukaan Lensa (Aperture / DOF)</label>
          <CustomSelect v-model="formDataProducts.bukaanLensa" :options="bukaanLensaOptions" />
        </div>
        <div class="form-group">
          <label class="form-label">Permukaan Dasar Studio</label>
          <CustomSelect v-model="formDataProducts.permukaanDasar" :options="permukaanDasarOptions" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Efek Atmosfer Studio</label>
        <CustomSelect v-model="formDataProducts.efekAtmosfer" :options="efekAtmosferOptions" />
      </div>
    </div>

    <!-- SECTION 3 — RATIO & PREVIEW -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">3</span>
        <h4 class="section-title">SPESIFIKASI DIMENSI</h4>
      </div>
      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Orientasi / Rasio Foto</label>
          <CustomSelect v-model="formDataProducts.orientasi" :options="orientasiOptions" @change="setProductsOrientasiDefault" />
        </div>
        <div class="form-group">
          <label class="form-label">Ukuran / Dimensi Output</label>
          <div class="input-wrapper">
            <input type="text" v-model="formDataProducts.dimensi" class="input-text" placeholder="E.g. 1080x1080 px" />
            <button v-if="formDataProducts.dimensi" @click="formDataProducts.dimensi = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
          </div>
        </div>
      </div>

      <!-- Real-Time SVG Aspect Ratio Preview Card for Products -->
      <div class="canvas-preview-section">
        <div class="canvas-preview-box">
          <div class="canvas-preview-shape" :class="formDataProducts.orientasi.toLowerCase()">
            <svg class="spiral-svg" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <line x1="38.2" y1="0" x2="38.2" y2="100" stroke-dasharray="2,3" opacity="0.25"></line>
              <line x1="61.8" y1="0" x2="61.8" y2="100" stroke-dasharray="2,3" opacity="0.25"></line>
              <line x1="0" y1="38.2" x2="100" y2="38.2" stroke-dasharray="2,3" opacity="0.25"></line>
              <line x1="0" y1="61.8" x2="100" y2="61.8" stroke-dasharray="2,3" opacity="0.25"></line>
              <path d="M 61.8 38.2 A 23.6 23.6 0 0 0 38.2 61.8 A 38.2 38.2 0 0 0 76.4 100 A 61.8 61.8 0 0 0 100 0 A 100 100 0 0 0 0 100" opacity="0.18" stroke-width="1.5"></path>
            </svg>
            <div class="canvas-ratio-label">{{ getProductsRatioLabel() }}</div>
          </div>
          <div class="canvas-preview-details">
            <span class="preview-tag">CANVAS RATIO PREVIEW</span>
            <span class="preview-dimension">{{ formDataProducts.dimensi || '-' }}</span>
            <span class="preview-desc">Golden spiral ratio untuk menyeimbangkan fokus produk hero.</span>
          </div>
        </div>
      </div>

      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Model Generator</label>
          <CustomSelect v-model="formDataProducts.mjVersion" :options="mjVersionOptions" />
        </div>
        <div class="form-group">
          <label class="form-label">Parameter Style</label>
          <CustomSelect v-model="formDataProducts.mjStyle" :options="mjStyleOptions" />
        </div>
      </div>
    </div>

    <!-- SECTION 4 — INSTRUKSI KHUSUS -->
    <div class="form-section last-section">
      <div class="section-header">
        <span class="section-num">4</span>
        <h4 class="section-title">INSTRUKSI KHUSUS CAHAYA & MATERIAL</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Detail Tambahan / Efek <span class="label-note">(Opsional)</span></label>
        <textarea v-model="formDataProducts.instruksi" class="input-textarea large-textarea" rows="4"
          placeholder="E.g. Berikan efek tetesan embun segar di badan botol, pantulan cahaya halus di podium, daun kelapa bergoyang di background..."></textarea>
        <p class="field-hint">Tambahkan petunjuk khusus tentang material kemasan, pantulan cermin, embun, asap, atau efek studio.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomSelect from '../CustomSelect.vue';
import { getApiConfig } from '../../utils/api.js';
import {
  gayaKomposisiOptions,
  materialKemasanOptions,
  elemenStudioOptions,
  pencahayaanOptions,
  bukaanLensaOptions,
  permukaanDasarOptions,
  efekAtmosferOptions,
  orientasiOptions,
  mjVersionOptions,
  mjStyleOptions
} from '../../constants/formOptions.js';

const props = defineProps({
  formDataProducts: Object,
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

const getProductsRatioLabel = () => {
  if (props.formDataProducts.orientasi === 'Landscape') return '16:9';
  if (props.formDataProducts.orientasi === 'Portrait') return '9:16';
  return '1:1';
};

const setProductsOrientasiDefault = () => {
  if (props.formDataProducts.orientasi === 'Landscape') {
    props.formDataProducts.dimensi = '1920x1080 px';
  } else if (props.formDataProducts.orientasi === 'Portrait') {
    props.formDataProducts.dimensi = '1080x1350 px (Instagram)';
  } else {
    props.formDataProducts.dimensi = '1080x1080 px (Square)';
  }
};

const autoFillProducts = async () => {
  emit('update-autofill-status', { autoFilling: true, error: '' });

  const model  = 'llama-3.3-70b-versatile';

  const systemPrompt = `[ROLE / PERSONA]
You are a creative commercial product photographer and art director.

[CONTEXT]
You are helping an e-commerce shop owner generate aesthetic photo studio descriptions to create high-end product presentation prompts.

[TASK]
Generate a fictional premium product, composition styles, and background scenery properties.

[INSTRUCTION]
Return ONLY a valid JSON object matching the requested keys. Use visual, detailed photography descriptors.

[PARAMETERS / CONSTRAINTS]
Output must be valid JSON with exact specified keys. Descriptions must be in Indonesian.`;

  const userPrompt = `Generate a product photo profile.
Return ONLY a valid JSON object with EXACTLY these keys:
{
  "namaProduk": "aesthetic premium product name (e.g. Skin Serum Bottle, Organic Scented Candle)",
  "gayaKomposisi": "one of: 'Eye-Level Front View (Standard)', 'Flat Lay / Top-Down View', 'Floating / Levitating Object', 'Close-Up Macro Details', 'Dynamic Diagonal Angle'",
  "elemenStudio": "one of: 'Podium Batu Alam & Air Tenang', 'Arch Geometris & Bayangan Daun Palem', 'Gundukan Pasir Gurun & Ranting Kering', 'Tatakan Kayu Ek & Bunga Kering', 'Background Studio Minimalis Solid'",
  "pencahayaan": "one of: 'Golden Hour Sunlight (Warm)', 'Studio Soft Box Lighting (Neutral)', 'High Contrast Spotlight (Dramatic)', 'Neon Cyberpunk Glow (Vibrant)'",
  "warna": "2-3 dominant color tones in Indonesian",
  "orientasi": "one of: 'Landscape', 'Portrait', 'Square'",
  "dimensi": "photo dimensions (e.g. 1080x1080 px (Square), 1080x1350 px (Instagram))",
  "instruksi": "1-2 sentence Indonesian lighting/texture description (water droplets, glass reflections, shadow angles)"
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

    props.formDataProducts.namaProduk    = parsed.namaProduk    || 'Botol Serum Wajah';
    props.formDataProducts.gayaKomposisi = parsed.gayaKomposisi || 'Eye-Level Front View (Standard)';
    props.formDataProducts.elemenStudio  = parsed.elemenStudio  || 'Podium Batu Alam & Air Tenang';
    props.formDataProducts.pencahayaan   = parsed.pencahayaan   || 'Studio Soft Box Lighting (Neutral)';
    props.formDataProducts.warna         = parsed.warna         || 'Cream & Olive Green';
    props.formDataProducts.orientasi     = parsed.orientasi     || 'Square';
    props.formDataProducts.dimensi       = parsed.dimensi       || '1080x1080 px (Square)';
    props.formDataProducts.bukaanLensa   = bukaanLensaOptions[Math.floor(Math.random() * bukaanLensaOptions.length)];
    props.formDataProducts.permukaanDasar = permukaanDasarOptions[Math.floor(Math.random() * permukaanDasarOptions.length)];
    props.formDataProducts.efekAtmosfer  = efekAtmosferOptions[Math.floor(Math.random() * efekAtmosferOptions.length)];
    props.formDataProducts.instruksi     = parsed.instruksi     || '';

    emit('update-autofill-status', { autoFilling: false, error: '' });
  } catch (err) {
    console.error(err);
    emit('update-autofill-status', { autoFilling: false, error: 'Gagal generate product data.' });
  }
};

const autoFill = () => {
  autoFillProducts();
};

defineExpose({
  autoFill
});
</script>
