<template>
  <div class="form-body">
    <!-- ══════════════════════════════════════════════════
         SECTION 1 — DATA INFORMASI (TEKS)
    ══════════════════════════════════════════════════ -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">1</span>
        <h4 class="section-title">DATA INFORMASI (TEKS)</h4>
      </div>

      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Judul Utama</label>
          <div class="input-wrapper">
            <input type="text" v-model="formData.judul" class="input-text" placeholder="E.g. Promo Makan Hemat" />
            <button v-if="formData.judul" @click="formData.judul = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Sub Judul</label>
          <div class="input-wrapper">
            <input type="text" v-model="formData.subjudul" class="input-text" placeholder="E.g. Diskon Hingga 40%" />
            <button v-if="formData.subjudul" @click="formData.subjudul = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
          </div>
        </div>
      </div>

      <div class="form-group" style="margin-top: 8px; margin-bottom: var(--space-md);">
        <button type="button" @click="autoFillFromTitle" class="btn-title-fill" :disabled="autoFilling || loading || !formData.judul">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
            stroke-linejoin="round" style="margin-right: 5px;">
            <path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/>
            <path d="M17.8 11.8 19 13"/><path d="M15 9h0"/><path d="M17.8 6.2 19 5"/>
            <path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/>
          </svg>
          AI FILL From title
        </button>
      </div>

      <div class="form-group">
        <label class="form-label">Informasi Data / Deskripsi</label>
        <textarea v-model="formData.deskripsi" class="input-textarea" rows="3"
          placeholder="E.g. Paket spesial makan siang tersedia setiap hari mulai pukul 11.00 – 15.00."></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Slogan</label>
        <div class="input-wrapper">
          <input type="text" v-model="formData.slogan" class="input-text" placeholder="E.g. Enak, Murah, Kenyang!" />
          <button v-if="formData.slogan" @click="formData.slogan = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
        </div>
      </div>

      <div class="field-grid-2" style="margin-top: var(--space-md);">
        <div class="form-group">
          <label class="form-label">Call to Action (CTA)</label>
          <CustomSelect v-model="formData.cta" :options="ctaOptions" />
        </div>
        <div class="form-group">
          <label class="form-label">Vibe & Mood Audiens</label>
          <CustomSelect v-model="formData.mood" :options="moodOptions" />
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════
         SECTION 2 — PANEL KONTAK & ALAMAT
    ══════════════════════════════════════════════════ -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">2</span>
        <h4 class="section-title">PANEL KONTAK & ALAMAT</h4>
      </div>

      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">
            <span class="social-dot wa"></span> WhatsApp
          </label>
          <div class="input-wrapper">
            <input type="text" v-model="formData.whatsapp" class="input-text" placeholder="E.g. 0812-3456-7890" />
            <button v-if="formData.whatsapp" @click="formData.whatsapp = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">
            <span class="social-dot ig"></span> Instagram
          </label>
          <div class="input-wrapper">
            <input type="text" v-model="formData.instagram" class="input-text" placeholder="E.g. @warung_santai" />
            <button v-if="formData.instagram" @click="formData.instagram = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
          </div>
        </div>
      </div>

      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">
            <span class="social-dot yt"></span> Youtube
          </label>
          <div class="input-wrapper">
            <input type="text" v-model="formData.youtube" class="input-text" placeholder="E.g. Warung Santai Channel" />
            <button v-if="formData.youtube" @click="formData.youtube = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">
            <span class="social-dot tt"></span> TikTok
          </label>
          <div class="input-wrapper">
            <input type="text" v-model="formData.tiktok" class="input-text" placeholder="E.g. @warung_santai" />
            <button v-if="formData.tiktok" @click="formData.tiktok = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
          </div>
        </div>
      </div>

      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">
            <span class="social-dot fb"></span> Facebook
          </label>
          <div class="input-wrapper">
            <input type="text" v-model="formData.facebook" class="input-text" placeholder="E.g. WarungSantaiOfficial" />
            <button v-if="formData.facebook" @click="formData.facebook = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">
            <span class="social-dot addr"></span> Alamat
          </label>
          <div class="input-wrapper">
            <input type="text" v-model="formData.alamat" class="input-text" placeholder="E.g. Jl. Anggrek No. 12, Jakarta" />
            <button v-if="formData.alamat" @click="formData.alamat = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">
          <span class="kontak-plus">+</span> Kontak Lain / Tambahan
        </label>
        <div class="input-wrapper">
          <input type="text" v-model="formData.kontakLain" class="input-text" placeholder="E.g. warungsantai.com" />
          <button v-if="formData.kontakLain" @click="formData.kontakLain = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════
         SECTION 3 — BAHAN VISUAL
    ══════════════════════════════════════════════════ -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">3</span>
        <h4 class="section-title">BAHAN VISUAL</h4>
        <span class="section-badge">PNG/JPG</span>
      </div>

      <!-- Logo Upload -->
      <div class="form-group">
        <label class="form-label">Upload Logo</label>
        <input type="file" id="logo-upload-input" class="hidden-input" accept="image/*"
          @change="handleLogoChange" />
        <div class="upload-dropzone" 
          :class="{ dragging: isLogoDragging }"
          @click="triggerLogoInput" 
          @dragover.prevent="isLogoDragging = true"
          @dragleave.prevent="isLogoDragging = false"
          @drop.prevent="handleLogoDrop">
          <div v-if="!formData.logoUrl" class="upload-placeholder">
            <div class="upload-icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
            <span>Add</span>
          </div>
          <div v-else class="upload-preview-single">
            <img :src="formData.logoUrl" alt="Logo" class="preview-img-logo" />
            <span class="preview-filename">{{ formData.logoName }}</span>
            <button type="button" @click.stop="clearLogo" class="btn-remove-file">&times;</button>
          </div>
        </div>
      </div>

      <!-- Foto Produk -->
      <div class="form-group">
        <label class="form-label">
          Foto Produk
          <span class="label-note">(Maks. 5, Sangat Disarankan)</span>
        </label>
        <input type="file" id="product-upload-input" class="hidden-input" accept="image/*" multiple
          @change="handleProductChange" />

        <div class="photo-upload-grid">
          <!-- Existing photos -->
          <div v-for="(photo, index) in formData.productPhotos" :key="'ph-' + index"
            class="photo-cell filled">
            <img :src="photo.url" :alt="photo.name" class="photo-cell-img" />
            <button type="button" @click="clearProductPhoto(index)"
              class="btn-remove-cell">&times;</button>
          </div>
          <!-- Add slot -->
          <div v-if="formData.productPhotos.length < 5" class="photo-cell add-cell"
            @click="triggerProductInput">
            <div class="upload-icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
            <span>Add</span>
          </div>
        </div>
      </div>

      <!-- Daftar Nama Produk -->
      <div class="form-group">
        <label class="form-label">
          Daftar Nama Produk
          <span class="label-note">(Bila foto tidak ada/kurang)</span>
        </label>
        <textarea v-model="formData.daftarProduk" class="input-textarea" rows="3"
          placeholder="E.g. Nasi Ayam Sambal Matah 20K&#10;Nasi Iga Sambal Ijo 22K"></textarea>
        <p class="field-hint">Di sini kamu bisa tuliskan nama produk / menu beserta harga atau detail lain bila foto tidak tersedia.</p>
      </div>

      <!-- Elemen Pendukung -->
      <div class="form-group">
        <label class="form-label">Elemen Pendukung Lain</label>
        <div class="input-wrapper">
          <input type="text" v-model="formData.elemen" class="input-text" placeholder="E.g. Ornamen daun pisang, tampilan tradisional, warna hangat" />
          <button v-if="formData.elemen" @click="formData.elemen = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════
         SECTION 4 — SPESIFIKASI & REFERENSI
    ══════════════════════════════════════════════════ -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">4</span>
        <h4 class="section-title">SPESIFIKASI & REFERENSI</h4>
      </div>

      <div class="field-grid-2" style="margin-bottom: var(--space-md);">
        <div class="form-group">
          <label class="form-label">Format Desain / Media</label>
          <CustomSelect
            v-model="formData.formatMedia"
            :options="formatMediaOptions"
            @change="handleFormatMediaChange"
          />
        </div>
        <div class="form-group">
          <label class="form-label">Gaya Visual / Art Style</label>
          <CustomSelect
            v-model="formData.gayaVisual"
            :options="gayaVisualOptions"
          />
        </div>
      </div>

      <!-- Real-Time SVG Aspect Ratio Preview Card -->
      <div class="canvas-preview-section">
        <div class="canvas-preview-box">
          <div class="canvas-preview-shape" :class="formData.orientasi.toLowerCase()">
            <svg class="spiral-svg" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <line x1="38.2" y1="0" x2="38.2" y2="100" stroke-dasharray="2,3" opacity="0.25"></line>
              <line x1="61.8" y1="0" x2="61.8" y2="100" stroke-dasharray="2,3" opacity="0.25"></line>
              <line x1="0" y1="38.2" x2="100" y2="38.2" stroke-dasharray="2,3" opacity="0.25"></line>
              <line x1="0" y1="61.8" x2="100" y2="61.8" stroke-dasharray="2,3" opacity="0.25"></line>
              <path d="M 61.8 38.2 A 23.6 23.6 0 0 0 38.2 61.8 A 38.2 38.2 0 0 0 76.4 100 A 61.8 61.8 0 0 0 100 0 A 100 100 0 0 0 0 100" opacity="0.18" stroke-width="1.5"></path>
            </svg>
            <div class="canvas-ratio-label">{{ getRatioLabel() }}</div>
          </div>
          <div class="canvas-preview-details">
            <span class="preview-tag">CANVAS RATIO PREVIEW</span>
            <span class="preview-dimension">{{ formData.dimensi || '-' }}</span>
            <span class="preview-desc">Rasio & kisi Golden Ratio spiral diterapkan.</span>
          </div>
        </div>
      </div>

      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Orientasi</label>
          <CustomSelect
            v-model="formData.orientasi"
            :options="orientasiOptions"
            @change="setOrientasiDefault"
          />
        </div>
        <div class="form-group">
          <label class="form-label">Ukuran / Dimensi</label>
          <div class="input-wrapper">
            <input type="text" v-model="formData.dimensi" class="input-text" placeholder="E.g. 300x120 cm" />
            <button v-if="formData.dimensi" @click="formData.dimensi = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
          </div>
        </div>
      </div>

      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Model Generator</label>
          <CustomSelect v-model="formData.mjVersion" :options="mjVersionOptions" />
        </div>
        <div class="form-group">
          <label class="form-label">Parameter Style</label>
          <CustomSelect v-model="formData.mjStyle" :options="mjStyleOptions" />
        </div>
      </div>

      <!-- Warna Dominan -->
      <div class="form-group">
        <label class="form-label">Warna Dominan</label>
        <div class="input-wrapper">
          <input type="text" v-model="formData.warna" class="input-text" placeholder="E.g. Kuning Hangat, Coklat Tua, Putih Krem" />
          <button v-if="formData.warna" @click="formData.warna = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
        </div>
        
        <div class="visual-color-presets">
          <div 
            v-for="p in colorPresets" 
            :key="p.name" 
            class="visual-preset-card"
            :class="{ active: formData.warna === p.value }"
            @click="formData.warna = p.value"
          >
            <div class="preset-colors">
              <span 
                v-for="(c, index) in p.colors" 
                :key="index" 
                class="preset-color-dot" 
                :style="{ backgroundColor: c }"
              ></span>
            </div>
            <span class="preset-name">{{ p.name }}</span>
          </div>
        </div>
      </div>

      <!-- Tema Desain -->
      <div class="form-group">
        <label class="form-label">Tema Desain</label>
        <CustomSelect
          v-model="formData.tema"
          :options="temaOptions"
          placeholder="Pilih Tema (Opsional)"
          @change="$emit('theme-changed', formData.tema)"
        />
      </div>

      <!-- Kategori Font Family -->
      <div class="form-group">
        <label class="form-label">Kategori Font Family</label>
        <CustomSelect
          v-model="formData.kategoriFont"
          :options="kategoriFontOptions"
        />
      </div>

      <!-- Referensi Desain Upload -->
      <div class="form-group">
        <label class="form-label">
          Upload Referensi Desain
          <span class="label-note">(Boleh lebih dari 2)</span>
        </label>
        <input type="file" id="reference-upload-input" class="hidden-input" accept="image/*" multiple
          @change="handleReferenceChange" />

        <div class="photo-upload-grid">
          <div v-for="(ref, index) in formData.referenceImages" :key="'ref-' + index"
            class="photo-cell filled">
            <img :src="ref.url" :alt="ref.name" class="photo-cell-img" />
            <button type="button" @click="clearReferenceImage(index)"
              class="btn-remove-cell">&times;</button>
          </div>
          <div v-if="formData.referenceImages.length < 8" class="photo-cell add-cell"
            @click="triggerReferenceInput">
            <div class="upload-icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
            <span>Add</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════
         SECTION 5 — PROMPT PENDUKUNG & PERINTAH KHUSUS
    ══════════════════════════════════════════════════ -->
    <div class="form-section last-section">
      <div class="section-header">
        <span class="section-num">5</span>
        <h4 class="section-title">PROMPT PENDUKUNG & PERINTAH KHUSUS</h4>
      </div>

      <div class="form-group">
        <label class="form-label">Instruksi Tambahan (Opsional)</label>
        <textarea v-model="formData.instruksi" class="input-textarea large-textarea" rows="5"
          placeholder="E.g. Gunakan style ala poster film 90-an, atau tambahkan kesan mewah dengan alam emas..."></textarea>
        <p class="field-hint">Tulis instruksi spesifik untuk membantu menghasilkan prompt yang lebih presisi dan sesuai kebutuhan.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CustomSelect from '../CustomSelect.vue';
import { getApiConfig } from '../../utils/api.js';
import {
  formatMediaOptions,
  gayaVisualOptions,
  orientasiOptions,
  mjVersionOptions,
  mjStyleOptions,
  temaOptions,
  ctaOptions,
  moodOptions,
  kategoriFontOptions
} from '../../constants/formOptions.js';

const props = defineProps({
  formData: Object,
  loading: Boolean,
  autoFilling: Boolean,
  colorPresets: Array
});

const emit = defineEmits(['theme-changed', 'update-autofill-status']);

const isLogoDragging = ref(false);

const fetchAI = async (body, options = {}) => {
  const { url, headers } = getApiConfig(body.model);
  return fetch(url, {
    method: 'POST',
    headers: { ...headers, ...options.headers },
    signal: options.signal,
    body: JSON.stringify(body)
  });
};

const getRatioLabel = () => {
  if (props.formData.orientasi === 'Landscape') return '16:9';
  if (props.formData.orientasi === 'Portrait') return '9:16';
  return '1:1';
};

const handleFormatMediaChange = () => {
  if (props.formData.formatMedia === 'Spanduk / Banner Horizontal') {
    props.formData.orientasi = 'Landscape';
    props.formData.dimensi = '300x120 cm';
  } else if (props.formData.formatMedia === 'Poster / Flyer / Brosur') {
    props.formData.orientasi = 'Portrait';
    props.formData.dimensi = 'A4 (21x29.7 cm)';
  } else if (props.formData.formatMedia === 'Roll-up / X-Banner') {
    props.formData.orientasi = 'Portrait';
    props.formData.dimensi = '60x160 cm';
  } else if (props.formData.formatMedia === 'Instagram Post / Social Media Feed') {
    props.formData.orientasi = 'Square';
    props.formData.dimensi = '1080x1080 px';
  } else if (props.formData.formatMedia === 'Billboard / Baliho Raksasa') {
    props.formData.orientasi = 'Landscape';
    props.formData.dimensi = '4x3 m';
  }
};

const setOrientasiDefault = () => {
  if (props.formData.orientasi === 'Landscape') props.formData.dimensi = '300x120 cm';
  else if (props.formData.orientasi === 'Portrait') props.formData.dimensi = '60x160 cm';
  else props.formData.dimensi = '1080x1080 px';
};

// ─── Upload Logo Handlers ─────────────────────────────────
const triggerLogoInput = () => document.getElementById('logo-upload-input').click();
const handleLogoChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  if (props.formData.logoUrl) URL.revokeObjectURL(props.formData.logoUrl);
  props.formData.logoName = file.name;
  props.formData.logoUrl  = URL.createObjectURL(file);
};
const handleLogoDrop = (e) => {
  isLogoDragging.value = false;
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    if (props.formData.logoUrl) URL.revokeObjectURL(props.formData.logoUrl);
    props.formData.logoName = file.name;
    props.formData.logoUrl  = URL.createObjectURL(file);
  }
};
const clearLogo = () => {
  if (props.formData.logoUrl) URL.revokeObjectURL(props.formData.logoUrl);
  props.formData.logoName = '';
  props.formData.logoUrl  = '';
  const el = document.getElementById('logo-upload-input');
  if (el) el.value = '';
};

// ─── Product Photo Handlers ──────────────────────────────
const triggerProductInput = () => document.getElementById('product-upload-input').click();
const handleProductChange = (e) => {
  const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
  const remaining = 5 - props.formData.productPhotos.length;
  files.slice(0, remaining).forEach(f =>
    props.formData.productPhotos.push({ name: f.name, url: URL.createObjectURL(f) })
  );
};
const clearProductPhoto = (i) => {
  URL.revokeObjectURL(props.formData.productPhotos[i].url);
  props.formData.productPhotos.splice(i, 1);
};

// ─── Reference Image Handlers ────────────────────────────
const triggerReferenceInput = () => document.getElementById('reference-upload-input').click();
const handleReferenceChange = (e) => {
  const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
  const remaining = 8 - props.formData.referenceImages.length;
  files.slice(0, remaining).forEach(f =>
    props.formData.referenceImages.push({ name: f.name, url: URL.createObjectURL(f) })
  );
};
const clearReferenceImage = (i) => {
  URL.revokeObjectURL(props.formData.referenceImages[i].url);
  props.formData.referenceImages.splice(i, 1);
};

// ─── AI Autofill Methods ─────────────────────────────────
const VALID_THEMES = ['Modern SaaS/Portfolio', 'Premium Consumer/Apple-y', 'Minimalist/Calm/Editorial', 'Playful/Awwwards-style', 'Trust-first/Public Sector'];
const VALID_ORIENTS = ['Landscape', 'Portrait', 'Square'];
const VALID_FORMATS = ['Spanduk / Banner Horizontal', 'Poster / Flyer / Brosur', 'Roll-up / X-Banner', 'Instagram Post / Social Media Feed', 'Billboard / Baliho Raksasa'];
const VALID_CTAS = ['Beli Sekarang', 'Hubungi WhatsApp Kami', 'Daftar Hari Ini (Gratis)', 'Kunjungi Website Kami', 'Pesan Sekarang'];
const VALID_MOODS = ['Fun & Playful', 'Professional & Trustworthy', 'Elegant & Luxurious', 'Cyberpunk & Bold'];

const BUSINESS_TYPES = [
  'toko kue artisan', 'salon kecantikan premium', 'barbershop modern', 'klinik kecantikan',
  'konveksi pakaian custom', 'bisnis kuliner seafood', 'coffee shop aesthetic', 'toko baju batik premium',
  'jasa laundry kiloan', 'studio foto profesional', 'event organizer', 'catering pernikahan',
  'toko elektronik', 'apotek modern', 'bengkel motor', 'toko bunga & florist',
  'gym & fitness center', 'les privat bahasa Inggris', 'travel agent lokal', 'toko mainan anak',
];

const autoFill = async () => {
  emit('update-autofill-status', { autoFilling: true, error: '' });

  const model  = 'llama-3.3-70b-versatile';

  const bizType = BUSINESS_TYPES[Math.floor(Math.random() * BUSINESS_TYPES.length)];
  const themes  = ['Modern SaaS/Portfolio', 'Premium Consumer/Apple-y', 'Minimalist/Calm/Editorial', 'Playful/Awwwards-style', 'Trust-first/Public Sector'];

  const systemPrompt = `[ROLE / PERSONA]
You are a creative copywriter and brand strategist for Indonesian small businesses.

[CONTEXT]
You are assisting a graphic designer by generating a complete fictional, highly creative, and realistic business profile in Indonesia for testing design layout placeholders.

[TASK]
Generate a complete fictional Indonesian business profile matching the specified business type.

[INSTRUCTION]
1. Ensure all elements (name, slogan, description, address, menu items) are highly cohesive and realistic for that business type.
2. Return ONLY a single, valid JSON object without explanations or markdown styling.

[PARAMETERS / CONSTRAINTS]
1. Output MUST be valid JSON with exact specified keys.
2. The phone number MUST follow the Indonesian format: 08xx-xxxx-xxxx.
3. The generated texts MUST be in natural, professional Indonesian language.`;

  const userPrompt = `[INPUT DETAILS]
Business Type: "${bizType}"

[FEW-SHOT EXAMPLE]
Business Type: "coffee shop aesthetic"
Output JSON:
{
  "judul": "Aroma Teduh Coffee & Eatery",
  "subjudul": "Tempat Ternyaman Menemukan Inspirasi",
  "deskripsi": "Kedai kopi dengan konsep arsitektur industrial hangat yang menyajikan kopi specialty grade dan hidangan penutup premium. Cocok untuk bekerja santai maupun berkumpul bersama teman.",
  "slogan": "Secangkir Kopi, Sejuta Cerita",
  "whatsapp": "0813-4455-6677",
  "instagram": "@aromateduh.co",
  "youtube": "Aroma Teduh TV",
  "tiktok": "@aromateduh.co",
  "facebook": "Aroma Teduh Coffee",
  "alamat": "Ruko Sentra Niaga Blok B-12, Dago, Bandung",
  "kontakLain": "www.aromateduhcoffee.com",
  "daftarProduk": "Ice Latte Aren Specialty 25K\\nManual Brew V60 Flores 28K\\nCroissant Almond Butter 22K",
  "elemen": "Cangkir keramik kerajinan tangan, kepulan uap hangat minimalis, aksen kayu ek tua",
  "formatMedia": "Poster / Flyer / Brosur",
  "orientasi": "Portrait",
  "dimensi": "A4 (21x29.7 cm)",
  "warna": "Hijau Sage, Abu-Abu Beton, Putih Hangat",
  "tema": "${themes[Math.floor(Math.random() * themes.length)]}",
  "cta": "Beli Sekarang",
  "mood": "Fun & Playful",
  "instruksi": "Susun teks headline besar di bagian atas dengan logo kecil berada di bawahnya agar seimbang."
}

[EXECUTION]
Now, generate a complete fictional profile matching the business type "${bizType}" and return the exact JSON object with EXACTLY these keys:
{
  "judul": "catchy main headline (5-8 words, Indonesian)",
  "subjudul": "supporting sub-headline (4-7 words)",
  "deskripsi": "2-3 sentence product/service description in Indonesian",
  "slogan": "short punchy tagline (3-6 words)",
  "whatsapp": "Indonesian phone number format 08xx-xxxx-xxxx",
  "instagram": "@username_realistic",
  "youtube": "Channel Name or empty string",
  "tiktok": "@tiktok_username or empty string",
  "facebook": "Facebook Page Name",
  "alamat": "realistic Indonesian street address",
  "kontakLain": "website URL or empty string",
  "daftarProduk": "3-5 product/menu names with prices, one per line",
  "elemen": "2-4 visual supporting elements for the design",
  "formatMedia": "one of: 'Spanduk / Banner Horizontal', 'Poster / Flyer / Brosur', 'Roll-up / X-Banner', 'Instagram Post / Social Media Feed', 'Billboard / Baliho Raksasa'",
  "orientasi": "one of: 'Landscape', 'Portrait', 'Square'",
  "dimensi": "dimension matching the format (e.g. 300x120 cm, A4 (21x29.7 cm), 60x160 cm, 1080x1080 px, 4x3 m)",
  "warna": "2-3 dominant colors with descriptive names",
  "tema": "${VALID_THEMES[Math.floor(Math.random() * VALID_THEMES.length)]}",
  "cta": "one of: 'Beli Sekarang', 'Hubungi WhatsApp Kami', 'Daftar Hari Ini (Gratis)', 'Kunjungi Website Kami', 'Pesan Sekarang'",
  "mood": "one of: 'Fun & Playful', 'Professional & Trustworthy', 'Elegant & Luxurious', 'Cyberpunk & Bold'",
  "kategoriFont": "one of: 'Geometric Sans-serif (Satoshi/Inter)', 'Elegant Editorial Serif', 'Modern Tech Monospace', 'Creative / Display Font', 'Retro Bold Serif (Cooper/Windsor)', 'Elegant Hand-written Script', 'Cyberpunk Tech Display Font', 'Neo-Grotesque Swiss Sans'",
  "instruksi": "1-2 specific design execution notes"
}`;

  try {
    const response = await fetchAI({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userPrompt },
      ],
      temperature: 0.95,
      max_tokens: 800,
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

    props.formData.formatMedia  = VALID_FORMATS.includes(parsed.formatMedia) ? parsed.formatMedia : 'Spanduk / Banner Horizontal';
    props.formData.judul        = parsed.judul        || '';
    props.formData.subjudul     = parsed.subjudul     || '';
    props.formData.deskripsi    = parsed.deskripsi    || '';
    props.formData.slogan       = parsed.slogan       || '';
    props.formData.whatsapp     = parsed.whatsapp     || '';
    props.formData.instagram    = parsed.instagram    || '';
    props.formData.youtube      = parsed.youtube      || '';
    props.formData.tiktok       = parsed.tiktok       || '';
    props.formData.facebook     = parsed.facebook     || '';
    props.formData.alamat       = parsed.alamat       || '';
    props.formData.kontakLain   = parsed.kontakLain   || '';
    props.formData.daftarProduk = parsed.daftarProduk || '';
    props.formData.elemen       = parsed.elemen       || '';
    props.formData.orientasi    = VALID_ORIENTS.includes(parsed.orientasi) ? parsed.orientasi : 'Landscape';
    props.formData.dimensi      = parsed.dimensi      || '300x120 cm';
    props.formData.warna        = parsed.warna        || '';
    props.formData.tema         = VALID_THEMES.includes(parsed.tema) ? parsed.tema : '';
    props.formData.cta          = VALID_CTAS.includes(parsed.cta) ? parsed.cta : 'Beli Sekarang';
    props.formData.mood         = VALID_MOODS.includes(parsed.mood) ? parsed.mood : 'Fun & Playful';
    props.formData.kategoriFont = kategoriFontOptions.includes(parsed.kategoriFont) ? parsed.kategoriFont : 'Geometric Sans-serif (Satoshi/Inter)';
    props.formData.instruksi    = parsed.instruksi    || '';

    emit('theme-changed', props.formData.tema);
    emit('update-autofill-status', { autoFilling: false, error: '' });
  } catch (err) {
    console.error('[AutoFill]', err);
    emit('update-autofill-status', { autoFilling: false, error: err.message || 'Gagal generate data. Coba lagi.' });
  }
};

const autoFillFromTitle = async () => {
  if (!props.formData.judul) return;
  emit('update-autofill-status', { autoFilling: true, error: '' });

  const model  = 'llama-3.3-70b-versatile';

  const themes  = ['Modern SaaS/Portfolio', 'Premium Consumer/Apple-y', 'Minimalist/Calm/Editorial', 'Playful/Awwwards-style', 'Trust-first/Public Sector'];

  const systemPrompt = `[ROLE / PERSONA]
You are a creative copywriter and brand strategist for Indonesian small businesses.

[CONTEXT]
You are helping a small business owner automatically generate high-quality, realistic, and creative fictional business profiles for design placeholders based on a single provided promo Title and optional Subtitle.

[TASK]
Generate a complete set of matching realistic fictional Indonesian business data for the design.

[INSTRUCTION]
1. Keep the generated data relevant to the industry implied by the Title/Subtitle.
2. Return ONLY a single, valid JSON object. Do not include markdown formatting or explanations.

[PARAMETERS / CONSTRAINTS]
1. Output MUST be valid JSON with exact specified keys.
2. The phone number MUST follow the Indonesian format: 08xx-xxxx-xxxx.
3. The generated texts MUST be in natural, professional Indonesian language.`;

  const userPrompt = `[INPUT DETAILS]
Title (Judul Utama): "${props.formData.judul}"
Subtitle (Sub Judul): "${props.formData.subjudul || '(none)'}"

[FEW-SHOT EXAMPLE]
Input: Title: "Kopi Susu Gula Aren", Subtitle: "Beli 1 Gratis 1"
Output JSON:
{
  "deskripsi": "Kopi susu kekinian yang diracik dari biji kopi arabika pilihan dan gula aren murni alami. Disajikan dingin menyegarkan untuk menemani aktivitas harianmu.",
  "slogan": "Manis Alami, Segarnya Asli!",
  "whatsapp": "0812-9876-5432",
  "instagram": "@kopisusu.aren.id",
  "youtube": "",
  "tiktok": "@kopisusu.aren",
  "facebook": "Kopi Susu Aren Indonesia",
  "alamat": "Jl. Melati No. 45, Kebayoran Baru, Jakarta Selatan",
  "kontakLain": "www.kopisusuaren.com",
  "daftarProduk": "Kopi Susu Aren Original 18K\\nKopi Susu Double Shot 22K\\nKopi Susu Caramel 24K",
  "elemen": "Biji kopi panggang berserakan, tumpahan cairan aren karamel, daun mint segar",
  "formatMedia": "Instagram Post / Social Media Feed",
  "orientasi": "Square",
  "dimensi": "1080x1080 px",
  "warna": "Cokelat Aren, Krem Susu, Hitam Espresso",
  "tema": "${themes[Math.floor(Math.random() * themes.length)]}",
  "cta": "Beli Sekarang",
  "mood": "Fun & Playful",
  "instruksi": "Gunakan kontras tinggi antara latar belakang cokelat tua and teks krem terang agar mudah dibaca."
}

[EXECUTION]
Now, process the input details and generate the exact JSON object with EXACTLY these keys:
{
  "deskripsi": "2-3 sentence product/service description in Indonesian matching the business theme",
  "slogan": "short punchy tagline (3-6 words)",
  "whatsapp": "Indonesian phone number format 08xx-xxxx-xxxx",
  "instagram": "@username_realistic",
  "youtube": "Channel Name or empty string",
  "tiktok": "@tiktok_username or empty string",
  "facebook": "Facebook Page Name",
  "alamat": "realistic Indonesian street address",
  "kontakLain": "website URL or empty string",
  "daftarProduk": "3-5 product/menu names with prices, one per line",
  "elemen": "2-4 visual supporting elements for the design",
  "formatMedia": "one of: 'Spanduk / Banner Horizontal', 'Poster / Flyer / Brosur', 'Roll-up / X-Banner', 'Instagram Post / Social Media Feed', 'Billboard / Baliho Raksasa'",
  "orientasi": "one of: 'Landscape', 'Portrait', 'Square'",
  "dimensi": "dimension matching the format (e.g. 300x120 cm, A4 (21x29.7 cm), 60x160 cm, 1080x1080 px, 4x3 m)",
  "warna": "2-3 dominant colors with descriptive names",
  "tema": "${themes[Math.floor(Math.random() * themes.length)]}",
  "cta": "one of: 'Beli Sekarang', 'Hubungi WhatsApp Kami', 'Daftar Hari Ini (Gratis)', 'Kunjungi Website Kami', 'Pesan Sekarang'",
  "mood": "one of: 'Fun & Playful', 'Professional & Trustworthy', 'Elegant & Luxurious', 'Cyberpunk & Bold'",
  "kategoriFont": "one of: 'Geometric Sans-serif (Satoshi/Inter)', 'Elegant Editorial Serif', 'Modern Tech Monospace', 'Creative / Display Font', 'Retro Bold Serif (Cooper/Windsor)', 'Elegant Hand-written Script', 'Cyberpunk Tech Display Font', 'Neo-Grotesque Swiss Sans'",
  "instruksi": "1-2 specific design execution notes"
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

    props.formData.deskripsi    = parsed.deskripsi    || '';
    props.formData.slogan       = parsed.slogan       || '';
    props.formData.whatsapp     = parsed.whatsapp     || '';
    props.formData.instagram    = parsed.instagram    || '';
    props.formData.youtube      = parsed.youtube      || '';
    props.formData.tiktok       = parsed.tiktok       || '';
    props.formData.facebook     = parsed.facebook     || '';
    props.formData.alamat       = parsed.alamat       || '';
    props.formData.kontakLain   = parsed.kontakLain   || '';
    props.formData.daftarProduk = parsed.daftarProduk || '';
    props.formData.elemen       = parsed.elemen       || '';
    props.formData.formatMedia  = VALID_FORMATS.includes(parsed.formatMedia) ? parsed.formatMedia : props.formData.formatMedia;
    props.formData.orientasi    = VALID_ORIENTS.includes(parsed.orientasi) ? parsed.orientasi : props.formData.orientasi;
    props.formData.dimensi      = parsed.dimensi      || props.formData.dimensi;
    props.formData.warna        = parsed.warna        || props.formData.warna;
    props.formData.tema         = VALID_THEMES.includes(parsed.tema) ? parsed.tema : props.formData.tema;
    props.formData.cta          = VALID_CTAS.includes(parsed.cta) ? parsed.cta : props.formData.cta;
    props.formData.mood         = VALID_MOODS.includes(parsed.mood) ? parsed.mood : props.formData.mood;
    props.formData.kategoriFont = kategoriFontOptions.includes(parsed.kategoriFont) ? parsed.kategoriFont : props.formData.kategoriFont;
    props.formData.instruksi    = parsed.instruksi    || '';

    emit('theme-changed', props.formData.tema);
    emit('update-autofill-status', { autoFilling: false, error: '' });
  } catch (err) {
    console.error('[AutoFillFromTitle]', err);
    emit('update-autofill-status', { autoFilling: false, error: err.message || 'Gagal generate data. Coba lagi.' });
  }
};

defineExpose({
  autoFill
});
</script>
