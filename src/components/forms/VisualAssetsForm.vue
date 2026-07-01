<template>
  <div class="form-body">
    <!-- SECTION 1 — IDENTITAS BISNIS -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">1</span>
        <h4 class="section-title">IDENTITAS BISNIS</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Nama Brand / Bisnis</label>
        <div class="input-wrapper">
          <input type="text" v-model="formDataAssets.namaBrand" class="input-text" placeholder="E.g. Warung Santai, Klinik Ceria..." />
          <button v-if="formDataAssets.namaBrand" @click="formDataAssets.namaBrand = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
        </div>
      </div>

      <div class="form-group" style="margin-top: 8px; margin-bottom: var(--space-md);">
        <button type="button" @click="autoFillAssetsFromBrand" class="btn-title-fill" :disabled="autoFilling || loading || !formDataAssets.namaBrand">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
            stroke-linejoin="round" style="margin-right: 5px;">
            <path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/>
            <path d="M17.8 11.8 19 13"/><path d="M15 9h0"/><path d="M17.8 6.2 19 5"/>
            <path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/>
          </svg>
          {{ autoFilling ? 'Generating...' : 'AI Fill From Brand Name' }}
        </button>
      </div>
      <div class="form-group">
        <label class="form-label">Tagline / Slogan</label>
        <div class="input-wrapper">
          <input type="text" v-model="formDataAssets.tagline" class="input-text" placeholder="E.g. Enak, Murah, Kenyang!" />
          <button v-if="formDataAssets.tagline" @click="formDataAssets.tagline = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Deskripsi Bisnis</label>
        <textarea v-model="formDataAssets.deskripsi" class="input-textarea" rows="3" placeholder="Jelaskan bisnis/brand secara singkat, produk atau jasa yang ditawarkan..."></textarea>
      </div>
    </div>

    <!-- SECTION 2 — JENIS & GAYA ASET -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">2</span>
        <h4 class="section-title">JENIS & GAYA ASET</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Jenis Aset Visual</label>
        <CustomSelect v-model="formDataAssets.jenisAset" :options="jenisAsetOptions" />
      </div>
      <div class="form-group">
        <label class="form-label">Gaya Desain</label>
        <CustomSelect v-model="formDataAssets.gayaDesain" :options="gayaDesainOptions" placeholder="Pilih Gaya Desain" />
      </div>
      <div class="form-group">
        <label class="form-label">Gaya Rendering / Visual</label>
        <CustomSelect v-model="formDataAssets.gayaRendering" :options="gayaRenderingOptions" placeholder="Pilih Gaya Rendering (Opsional)" />
      </div>
      <div class="form-group">
        <label class="form-label">Referensi Gaya / Inspirasi <span class="label-note">(Opsional)</span></label>
        <div class="input-wrapper">
          <input type="text" v-model="formDataAssets.referensiGaya" class="input-text" placeholder="E.g. Seperti brand Muji, Japanese vintage, Art Deco..." />
          <button v-if="formDataAssets.referensiGaya" @click="formDataAssets.referensiGaya = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
        </div>
      </div>

      <div class="field-grid-2" style="margin-top: 8px;">
        <div class="form-group">
          <label class="form-label">Tingkat Kompleksitas</label>
          <CustomSelect v-model="formDataAssets.kompleksitas" :options="kompleksitasOptions" />
        </div>
        <div class="form-group">
          <label class="form-label">Target Segment / Industri</label>
          <CustomSelect v-model="formDataAssets.targetSegment" :options="targetSegmentOptions" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Efek Finishing / Tekstur</label>
        <CustomSelect v-model="formDataAssets.efekFinishing" :options="efekFinishingOptions" />
      </div>

      <div class="form-group" style="margin-top: var(--space-md);">
        <label class="form-label">Karakter / Kepribadian Brand <span class="label-note">(Pilih beberapa)</span></label>
        <div class="color-chips">
          <div 
            v-for="o in brandPersonalityOptions" 
            :key="o" 
            class="color-chip"
            :class="{ active: formDataAssets.brandPersonality.includes(o) }"
            @click="toggleBrandPersonality(o)"
          >
            {{ o }}
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Komposisi / Tata Letak Logo</label>
        <CustomSelect v-model="formDataAssets.komposisi" :options="komposisiLogoOptions" />
      </div>
    </div>

    <!-- SECTION 3 — SPESIFIKASI VISUAL -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">3</span>
        <h4 class="section-title">SPESIFIKASI VISUAL</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Warna Dominan Brand</label>
        <div class="input-wrapper">
          <input type="text" v-model="formDataAssets.warna" class="input-text" placeholder="E.g. Navy Blue, Emas, Putih Krem" />
          <button v-if="formDataAssets.warna" @click="formDataAssets.warna = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
        </div>
        <div class="visual-color-presets">
          <div v-for="p in colorPresets" :key="p.name" class="visual-preset-card"
            :class="{ active: formDataAssets.warna === p.value }"
            @click="formDataAssets.warna = p.value">
            <div class="preset-colors">
              <span v-for="(c, i) in p.colors" :key="i" class="preset-color-dot" :style="{ backgroundColor: c }"></span>
            </div>
            <span class="preset-name">{{ p.name }}</span>
          </div>
        </div>
      </div>
      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Format File Target</label>
          <CustomSelect v-model="formDataAssets.formatFile" :options="formatFileOptions" />
        </div>
        <div class="form-group">
          <label class="form-label">Background</label>
          <CustomSelect v-model="formDataAssets.background" :options="backgroundOptions" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Kategori Font Family</label>
        <CustomSelect v-model="formDataAssets.kategoriFont" :options="kategoriFontOptions" />
      </div>
      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Orientasi / Rasio Aspek</label>
          <CustomSelect v-model="formDataAssets.orientasi" :options="orientasiOptions" @change="setAssetsOrientasiDefault" />
        </div>
        <div class="form-group">
          <label class="form-label">Ukuran / Dimensi</label>
          <div class="input-wrapper">
            <input type="text" v-model="formDataAssets.dimensi" class="input-text" placeholder="E.g. 1024x1024 px" />
            <button v-if="formDataAssets.dimensi" @click="formDataAssets.dimensi = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
          </div>
        </div>
      </div>

      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Model Generator</label>
          <CustomSelect v-model="formDataAssets.mjVersion" :options="mjVersionOptions" />
        </div>
        <div class="form-group">
          <label class="form-label">Parameter Style</label>
          <CustomSelect v-model="formDataAssets.mjStyle" :options="mjStyleOptions" />
        </div>
      </div>
      <!-- Real-Time SVG Aspect Ratio Preview Card for Assets -->
      <div class="canvas-preview-section">
        <div class="canvas-preview-box">
          <div class="canvas-preview-shape" :class="formDataAssets.orientasi.toLowerCase()">
            <svg class="spiral-svg" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <line x1="38.2" y1="0" x2="38.2" y2="100" stroke-dasharray="2,3" opacity="0.25"></line>
              <line x1="61.8" y1="0" x2="61.8" y2="100" stroke-dasharray="2,3" opacity="0.25"></line>
              <line x1="0" y1="38.2" x2="100" y2="38.2" stroke-dasharray="2,3" opacity="0.25"></line>
              <line x1="0" y1="61.8" x2="100" y2="61.8" stroke-dasharray="2,3" opacity="0.25"></line>
              <path d="M 61.8 38.2 A 23.6 23.6 0 0 0 38.2 61.8 A 38.2 38.2 0 0 0 76.4 100 A 61.8 61.8 0 0 0 100 0 A 100 100 0 0 0 0 100" opacity="0.18" stroke-width="1.5"></path>
            </svg>
            <div class="canvas-ratio-label">{{ getAssetsRatioLabel() }}</div>
          </div>
          <div class="canvas-preview-details">
            <span class="preview-tag">CANVAS RATIO PREVIEW</span>
            <span class="preview-dimension">{{ formDataAssets.dimensi || '-' }}</span>
            <span class="preview-desc">Rasio & kisi Golden Ratio spiral diterapkan pada aset visual.</span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Upload Referensi Visual <span class="label-note">(Maks. 5, Opsional)</span></label>
        <input type="file" id="assets-reference-input" class="hidden-input" accept="image/*" multiple @change="handleAssetsReferenceChange" />
        <div class="photo-upload-grid">
          <div v-for="(ref, index) in formDataAssets.referenceImages" :key="'ar-' + index" class="photo-cell filled">
            <img :src="ref.url" :alt="ref.name" class="photo-cell-img" />
            <button type="button" @click="clearAssetsReference(index)" class="btn-remove-cell">&times;</button>
          </div>
          <div v-if="formDataAssets.referenceImages.length < 5" class="photo-cell add-cell" @click="triggerAssetsReferenceInput">
            <div class="upload-icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
            <span>Add</span>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION 4 — INSTRUKSI TAMBAHAN -->
    <div class="form-section last-section">
      <div class="section-header">
        <span class="section-num">4</span>
        <h4 class="section-title">INSTRUKSI TAMBAHAN</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Instruksi Khusus <span class="label-note">(Opsional)</span></label>
        <textarea v-model="formDataAssets.instruksi" class="input-textarea large-textarea" rows="4"
          placeholder="E.g. Logo harus terlihat elegan di kemasan hitam, icon harus terlihat jelas di ukuran 32x32px..."></textarea>
        <p class="field-hint">Jelaskan kebutuhan spesifik yang harus diperhatikan AI dalam menghasilkan prompt aset visual.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CustomSelect from '../CustomSelect.vue';
import { getApiConfig } from '../../utils/api.js';
import {
  jenisAsetOptions,
  gayaDesainOptions,
  gayaRenderingOptions,
  kompleksitasOptions,
  targetSegmentOptions,
  brandPersonalityOptions,
  komposisiLogoOptions,
  formatFileOptions,
  backgroundOptions,
  orientasiOptions,
  mjVersionOptions,
  mjStyleOptions,
  efekFinishingOptions,
  kategoriFontOptions
} from '../../constants/formOptions.js';

const props = defineProps({
  formDataAssets: Object,
  loading: Boolean,
  autoFilling: Boolean,
  colorPresets: Array
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

const getAssetsRatioLabel = () => {
  if (props.formDataAssets.orientasi === 'Landscape') return '16:9';
  if (props.formDataAssets.orientasi === 'Portrait') return '9:16';
  return '1:1';
};

const setAssetsOrientasiDefault = () => {
  if (props.formDataAssets.orientasi === 'Landscape') {
    props.formDataAssets.dimensi = '1792x1024 px';
  } else if (props.formDataAssets.orientasi === 'Portrait') {
    props.formDataAssets.dimensi = '1024x1792 px';
  } else {
    props.formDataAssets.dimensi = '1024x1024 px';
  }
};

const toggleBrandPersonality = (val) => {
  const idx = props.formDataAssets.brandPersonality.indexOf(val);
  if (idx > -1) {
    props.formDataAssets.brandPersonality.splice(idx, 1);
  } else {
    props.formDataAssets.brandPersonality.push(val);
  }
};

// ─── Upload Referensi Visual Handlers ──────────────────────
const triggerAssetsReferenceInput = () => document.getElementById('assets-reference-input').click();
const handleAssetsReferenceChange = (e) => {
  const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
  const remaining = 5 - props.formDataAssets.referenceImages.length;
  files.slice(0, remaining).forEach(f =>
    props.formDataAssets.referenceImages.push({ name: f.name, url: URL.createObjectURL(f) })
  );
};
const clearAssetsReference = (i) => {
  URL.revokeObjectURL(props.formDataAssets.referenceImages[i].url);
  props.formDataAssets.referenceImages.splice(i, 1);
};

// ─── AI Autofill Method ─────────────────────────────────────
const autoFillAssetsFromBrand = async () => {
  if (!props.formDataAssets.namaBrand) return;
  emit('update-autofill-status', { autoFilling: true, error: '' });

  const model  = 'llama-3.3-70b-versatile';

  const systemPrompt = `[ROLE / PERSONA]
You are a professional brand strategist and visual identity expert for Indonesian businesses.

[CONTEXT]
You are helping a designer establish a core visual brand identity for a new client based only on their brand name.

[TASK]
Generate realistic, creative, and highly cohesive brand identity data for visual asset creation (logo, icons, branding assets).

[INSTRUCTION]
1. Create tagline and brand description that perfectly fits the brand name's tone.
2. Return ONLY a single, valid JSON object without markdown or explanations.

[PARAMETERS / CONSTRAINTS]
1. Output MUST be valid JSON with exact specified keys.
2. All generated descriptions and instructions MUST be in natural, professional Indonesian language.`;

  const userPrompt = `[INPUT DETAILS]
Brand Name: "${props.formDataAssets.namaBrand}"

[FEW-SHOT EXAMPLE]
Brand Name: "Neko Bakery"
Output JSON:
{
  "tagline": "Warm Breads, Happy Purrs!",
  "deskripsi": "Toko roti artisan khas Jepang yang menyajikan kue-kue bertekstur lembut dan berwajah kucing menggemaskan. Dipanggang segar setiap pagi dengan bahan organik pilihan.",
  "gayaDesain": "Playful & Colorful",
  "warna": "Pastel Pink, Putih Salju, Cokelat Roti Hangat",
  "kategoriFont": "Creative / Display Font",
  "instruksi": "Desain maskot kucing bulat memeluk roti baguette panjang. Gunakan garis outlines tebal bergaya ilustrasi kawaii."
}

[EXECUTION]
Now, process the brand name and generate the exact JSON object with EXACTLY these keys:
{
  "tagline": "short punchy brand tagline (4-7 words, Indonesian or English)",
  "deskripsi": "2-3 sentence brand description in Indonesian, covering products/services offered",
  "gayaDesain": "one of: 'Modern & Minimalis', 'Premium & Elegan', 'Playful & Colorful', 'Retro / Vintage', 'Tegas & Profesional', 'Organik & Natural', 'Teknologi & Futuristik', 'Tradisional / Etnik'",
  "warna": "2-3 dominant brand colors with descriptive names (e.g. Navy Blue, Putih Krem, Emas)",
  "kategoriFont": "one of: 'Geometric Sans-serif (Satoshi/Inter)', 'Elegant Editorial Serif', 'Modern Tech Monospace', 'Creative / Display Font', 'Retro Bold Serif (Cooper/Windsor)', 'Elegant Hand-written Script', 'Cyberpunk Tech Display Font', 'Neo-Grotesque Swiss Sans'",
  "instruksi": "1-2 specific visual asset notes (Indonesian) — e.g. how the logo should look, feel, or be used"
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
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || `API error ${response.status}`);
    }

    const data = await response.json();
    let parsed;
    try {
      let rawContent = (data.choices[0].message.content || '').trim();
      if (rawContent.startsWith('```')) {
        rawContent = rawContent.replace(/^```[a-zA-Z]*\s*/, '').replace(/\s*```$/, '').trim();
      }
      parsed = JSON.parse(rawContent);
    } catch {
      throw new Error('Gagal mem-parse respons JSON dari AI.');
    }

    const validGaya = ['Modern & Minimalis', 'Premium & Elegan', 'Playful & Colorful', 'Retro / Vintage', 'Tegas & Profesional', 'Organik & Natural', 'Teknologi & Futuristik', 'Tradisional / Etnik'];

    props.formDataAssets.tagline    = parsed.tagline    || '';
    props.formDataAssets.deskripsi  = parsed.deskripsi  || '';
    props.formDataAssets.gayaDesain = validGaya.includes(parsed.gayaDesain) ? parsed.gayaDesain : '';
    props.formDataAssets.warna      = parsed.warna      || '';
    props.formDataAssets.kategoriFont = kategoriFontOptions.includes(parsed.kategoriFont) ? parsed.kategoriFont : 'Geometric Sans-serif (Satoshi/Inter)';
    props.formDataAssets.kompleksitas = kompleksitasOptions[Math.floor(Math.random() * kompleksitasOptions.length)];
    props.formDataAssets.targetSegment = targetSegmentOptions[Math.floor(Math.random() * targetSegmentOptions.length)];
    props.formDataAssets.efekFinishing = efekFinishingOptions[Math.floor(Math.random() * efekFinishingOptions.length)];
    props.formDataAssets.instruksi  = parsed.instruksi  || '';

    emit('update-autofill-status', { autoFilling: false, error: '' });
  } catch (err) {
    console.error('[AutoFillAssetsFromBrand]', err);
    emit('update-autofill-status', { autoFilling: false, error: err.message || 'Gagal generate data. Coba lagi.' });
  }
};

const autoFill = () => {
  // If user calls RANDOM FILL in parent header, we can randomize a brand name and fill it
  const RANDOM_BRANDS = ['Warung Santai', 'Klinik Ceria', 'Toko Kue Fluffy', 'Sobat Barber', 'SaaS KasirHub', 'Batik Luhur'];
  props.formDataAssets.namaBrand = RANDOM_BRANDS[Math.floor(Math.random() * RANDOM_BRANDS.length)];
  autoFillAssetsFromBrand();
};

defineExpose({
  autoFill
});
</script>
