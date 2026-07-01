<template>
  <div class="form-body">
    <!-- SECTION 1 — DATA IDENTITAS SUBJEK -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">1</span>
        <h4 class="section-title">IDENTITAS SUBJEK</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Nama Subjek / Placeholder</label>
        <div class="input-wrapper">
          <input type="text" v-model="formDataPortrait.namaSubjek" class="input-text" placeholder="E.g. Andi Pratama, Maria Victoria..." />
          <button v-if="formDataPortrait.namaSubjek" @click="formDataPortrait.namaSubjek = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
        </div>
      </div>
      <div class="form-group" style="margin-top: 8px; margin-bottom: var(--space-md);">
        <button type="button" @click="autoFillPortrait" class="btn-title-fill" :disabled="autoFilling || loading">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
            stroke-linejoin="round" style="margin-right: 5px;">
            <path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/>
            <path d="M17.8 11.8 19 13"/><path d="M15 9h0"/><path d="M17.8 6.2 19 5"/>
            <path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/>
          </svg>
          AI Fill Portrait Data
        </button>
      </div>
      <div class="form-group">
        <label class="form-label">Gender & Estimasi Usia</label>
        <CustomSelect v-model="formDataPortrait.genderUsia" :options="subjekOptions" />
      </div>
    </div>

    <!-- SECTION 2 — STYLE & LATAR BELAKANG -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">2</span>
        <h4 class="section-title">STYLE & LATAR BELAKANG</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Tipe Foto Portrait</label>
        <CustomSelect v-model="formDataPortrait.tipeFoto" :options="tipeFotoOptions" />
      </div>
      <div class="form-group">
        <label class="form-label">Pakaian / Attire</label>
        <CustomSelect v-model="formDataPortrait.pakaian" :options="pakaianOptions" />
      </div>
      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Warna Background / Studio</label>
          <CustomSelect v-model="formDataPortrait.background" :options="pasFotoBackgroundOptions" />
        </div>
        <div class="form-group">
          <label class="form-label">Pencahayaan / Studio Lighting</label>
          <CustomSelect v-model="formDataPortrait.pencahayaan" :options="portraitPencahayaanOptions" />
        </div>
      </div>

      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Ekspresi Wajah</label>
          <CustomSelect v-model="formDataPortrait.ekspresi" :options="ekspresiOptions" />
        </div>
        <div class="form-group">
          <label class="form-label">Tipe Shot Kamera</label>
          <CustomSelect v-model="formDataPortrait.shotType" :options="shotTypeOptions" />
        </div>
      </div>

      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Fokus Kamera (DOF)</label>
          <CustomSelect v-model="formDataPortrait.kameraFokus" :options="kameraFokusOptions" />
        </div>
        <div class="form-group">
          <label class="form-label">Arah Hadap Wajah</label>
          <CustomSelect v-model="formDataPortrait.arahHadap" :options="arahHadapOptions" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Tekstur & Detail Kulit</label>
        <CustomSelect v-model="formDataPortrait.teksturWajah" :options="teksturWajahOptions" />
      </div>
    </div>

    <!-- SECTION 3 — RATIO & DIMENSI -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">3</span>
        <h4 class="section-title">SPESIFIKASI DIMENSI</h4>
      </div>
      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Rasio Aspek</label>
          <CustomSelect v-model="formDataPortrait.orientasi" :options="orientasiOptions" @change="setPortraitOrientasiDefault" />
        </div>
        <div class="form-group">
          <label class="form-label">Dimensi / Ukuran</label>
          <div class="input-wrapper">
            <input type="text" v-model="formDataPortrait.dimensi" class="input-text" placeholder="E.g. 4x6 cm (Standard)" />
            <button v-if="formDataPortrait.dimensi" @click="formDataPortrait.dimensi = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
          </div>
        </div>
      </div>
      
      <!-- Real-Time SVG Aspect Ratio Preview Card for Portrait -->
      <div class="canvas-preview-section">
        <div class="canvas-preview-box">
          <div class="canvas-preview-shape" :class="formDataPortrait.orientasi.toLowerCase()">
            <svg class="spiral-svg" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <line x1="38.2" y1="0" x2="38.2" y2="100" stroke-dasharray="2,3" opacity="0.25"></line>
              <line x1="61.8" y1="0" x2="61.8" y2="100" stroke-dasharray="2,3" opacity="0.25"></line>
              <line x1="0" y1="38.2" x2="100" y2="38.2" stroke-dasharray="2,3" opacity="0.25"></line>
              <line x1="0" y1="61.8" x2="100" y2="61.8" stroke-dasharray="2,3" opacity="0.25"></line>
              <path d="M 61.8 38.2 A 23.6 23.6 0 0 0 38.2 61.8 A 38.2 38.2 0 0 0 76.4 100 A 61.8 61.8 0 0 0 100 0 A 100 100 0 0 0 0 100" opacity="0.18" stroke-width="1.5"></path>
            </svg>
            <div class="canvas-ratio-label">{{ getPortraitRatioLabel() }}</div>
          </div>
          <div class="canvas-preview-details">
            <span class="preview-tag">CANVAS RATIO PREVIEW</span>
            <span class="preview-dimension">{{ formDataPortrait.dimensi || '-' }}</span>
            <span class="preview-desc">Golden spiral ratio ideal untuk komposisi portrait wajah.</span>
          </div>
        </div>
      </div>

      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Model Generator</label>
          <CustomSelect v-model="formDataPortrait.mjVersion" :options="mjVersionOptions" />
        </div>
        <div class="form-group">
          <label class="form-label">Parameter Style</label>
          <CustomSelect v-model="formDataPortrait.mjStyle" :options="mjStyleOptions" />
        </div>
      </div>
    </div>

    <!-- SECTION 4 — DETAIL KHUSUS -->
    <div class="form-section last-section">
      <div class="section-header">
        <span class="section-num">4</span>
        <h4 class="section-title">INSTRUKSI KHUSUS</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Detail Wajah / Pose <span class="label-note">(Opsional)</span></label>
        <textarea v-model="formDataPortrait.instruksi" class="input-textarea large-textarea" rows="4"
          placeholder="E.g. Memakai kacamata frame hitam, senyum percaya diri, rambut hitam lurus rapi..."></textarea>
        <p class="field-hint">Tulis instruksi khusus wajah, rambut, aksesoris, atau pose subjek pas foto.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomSelect from '../CustomSelect.vue';
import { getApiConfig } from '../../utils/api.js';
import {
  subjekOptions,
  tipeFotoOptions,
  pakaianOptions,
  pasFotoBackgroundOptions,
  portraitPencahayaanOptions,
  ekspresiOptions,
  shotTypeOptions,
  kameraFokusOptions,
  arahHadapOptions,
  teksturWajahOptions,
  orientasiOptions,
  mjVersionOptions,
  mjStyleOptions
} from '../../constants/formOptions.js';

const props = defineProps({
  formDataPortrait: Object,
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

const getPortraitRatioLabel = () => {
  if (props.formDataPortrait.orientasi === 'Landscape') return '16:9';
  if (props.formDataPortrait.orientasi === 'Portrait') return '9:16';
  return '1:1';
};

const setPortraitOrientasiDefault = () => {
  if (props.formDataPortrait.orientasi === 'Landscape') {
    props.formDataPortrait.dimensi = '1920x1080 px';
  } else if (props.formDataPortrait.orientasi === 'Portrait') {
    props.formDataPortrait.dimensi = '1080x1350 px (Instagram)';
  } else {
    props.formDataPortrait.dimensi = '1080x1080 px (Square)';
  }
};

const autoFillPortrait = async () => {
  emit('update-autofill-status', { autoFilling: true, error: '' });

  const model  = 'llama-3.3-70b-versatile';

  const systemPrompt = `[ROLE / PERSONA]
You are a creative copywriter and portrait photography director.

[CONTEXT]
You are helping a user generate professional placeholder data for formal passport photos and corporate LinkedIn headshots.

[TASK]
Generate a matching realistic Indonesian person identity and matching photography settings.

[INSTRUCTION]
Return ONLY a valid JSON object matching the requested keys. Keep descriptions specific and professional.

[PARAMETERS / CONSTRAINTS]
Output MUST be valid JSON with exact specified keys. The name must be a realistic Indonesian name.`;

  const userPrompt = `Generate a portrait identity details.
Return ONLY a valid JSON object with EXACTLY these keys:
{
  "namaSubjek": "realistic full Indonesian name",
  "genderUsia": "one of: 'Pria Dewasa (20-30 tahun)', 'Pria Dewasa (30-40 tahun)', 'Wanita Dewasa (20-30 tahun)', 'Wanita Dewasa (30-40 tahun)'",
  "tipeFoto": "one of: 'Pas Foto Resmi (KTP/Ijazah/Visa)', 'Professional Headshot (LinkedIn/CV)', 'Portrait Casual / Model'",
  "background": "one of: 'Latar Merah (KTP Indonesia)', 'Latar Biru (Resmi)', 'Latar Putih Bersih (Visa/Paspor)', 'Latar Belakang Kantor (Corporate Blur)', 'Latar Belakang Studio Abu-Abu (Classic)', 'Latar Belakang Outdoor Taman (Soft Bokeh)'",
  "pakaian": "one of: 'Jas Hitam Formal & Dasi', 'Blazer Profesional Wanita', 'Kemeja Putih Polos', 'Batik Lengan Panjang', 'Pakaian Kasual (Kaos/Sweater)', 'Busana Muslim / Hijab'",
  "orientasi": "one of: 'Landscape', 'Portrait', 'Square'",
  "dimensi": "photo dimensions (e.g. 4x6 cm (Standard), 3x4 cm, 1080x1080 px)",
  "instruksi": "1-2 sentence Indonesian portrait description (face expression, details like glasses, hair, look)"
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

    props.formDataPortrait.namaSubjek = parsed.namaSubjek || 'Andi Pratama';
    props.formDataPortrait.genderUsia = parsed.genderUsia || 'Pria Dewasa (20-30 tahun)';
    props.formDataPortrait.tipeFoto   = parsed.tipeFoto   || 'Pas Foto Resmi (KTP/Ijazah/Visa)';
    props.formDataPortrait.background = parsed.background || 'Latar Merah (KTP Indonesia)';
    props.formDataPortrait.pakaian    = parsed.pakaian    || 'Jas Hitam Formal & Dasi';
    props.formDataPortrait.orientasi  = parsed.orientasi  || 'Portrait';
    props.formDataPortrait.dimensi    = parsed.dimensi    || '4x6 cm (Standard)';
    props.formDataPortrait.kameraFokus = kameraFokusOptions[Math.floor(Math.random() * kameraFokusOptions.length)];
    props.formDataPortrait.arahHadap  = arahHadapOptions[Math.floor(Math.random() * arahHadapOptions.length)];
    props.formDataPortrait.teksturWajah = teksturWajahOptions[Math.floor(Math.random() * teksturWajahOptions.length)];
    props.formDataPortrait.instruksi  = parsed.instruksi  || '';

    emit('update-autofill-status', { autoFilling: false, error: '' });
  } catch (err) {
    console.error(err);
    emit('update-autofill-status', { autoFilling: false, error: 'Gagal generate portrait data.' });
  }
};

const autoFill = () => {
  autoFillPortrait();
};

defineExpose({
  autoFill
});
</script>
