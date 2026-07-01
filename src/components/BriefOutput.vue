<template>
  <div class="brief-output-container glow-card">

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-badge">
        <span class="loading-dot"></span>
        <span class="loading-dot"></span>
        <span class="loading-dot"></span>
        <span class="loading-label">AI sedang membuat prompt...</span>
      </div>
      <div class="skeleton-title"></div>
      <div class="skeleton-line" style="width:90%"></div>
      <div class="skeleton-line" style="width:85%"></div>
      <div class="skeleton-line" style="width:70%;margin-bottom:28px"></div>
      <div class="skeleton-title" style="width:45%"></div>
      <div class="skeleton-line" style="width:95%"></div>
      <div class="skeleton-line" style="width:88%"></div>
      <div class="skeleton-line" style="width:60%;margin-bottom:28px"></div>
      <!-- JSON block skeleton -->
      <div class="json-skeleton">
        <div class="json-skel-header"></div>
        <div class="json-skel-line" style="width:55%"></div>
        <div class="json-skel-line" style="width:75%"></div>
        <div class="json-skel-line" style="width:60%"></div>
        <div class="json-skel-line" style="width:80%"></div>
        <div class="json-skel-line" style="width:65%"></div>
        <div class="json-skel-long"></div>
      </div>
    </div>

    <!-- Design Skill Preview View -->
    <div v-else-if="previewSkill" class="preview-skill-container">
      <div class="preview-header">
        <div class="preview-header-left">
          <span class="preview-badge">{{ previewSkill.category }}</span>
          <h4 class="preview-title">{{ previewSkill.name }}</h4>
        </div>
        <button type="button" class="btn-close-preview" @click="$emit('close-preview')" aria-label="Close preview">
          &times;
        </button>
      </div>

      <div class="preview-body-scroll">
        <!-- Visual Screenshot from GitHub -->
        <div class="preview-image-wrapper">
          <img 
            :src="'https://raw.githubusercontent.com/bergside/awesome-design-skills/main/registry-examples/' + previewSkill.slug + '-marketing.png'"
            class="design-preview-image" 
            alt="Design Skill Visual Preview" 
            @error="handleImageError"
          />
          <div v-if="imageLoadError" class="preview-image-fallback">
            <span class="fallback-icon">🎨</span>
            <p>Visual preview not available in registry. Displaying theme specs below.</p>
          </div>
        </div>

        <!-- Specs Card -->
        <div class="specs-card">
          <h5 class="specs-heading">Visual Specifications</h5>
          
          <!-- Color Swatches -->
          <div class="spec-section">
            <span class="spec-label">Dominant Color Palette</span>
            <div class="color-swatches">
              <div 
                v-for="(color, idx) in previewSkill.colors" 
                :key="idx" 
                class="color-swatch-item"
              >
                <div class="color-dot" :style="{ backgroundColor: getColorCode(color) }"></div>
                <span class="color-name">{{ color }}</span>
              </div>
            </div>
          </div>

          <!-- Typography -->
          <div class="spec-section">
            <span class="spec-label">Recommended Typography</span>
            <div class="typography-preview-box">
              <span class="typo-font-family">{{ previewSkill.typography }}</span>
              <div class="typo-scale">
                <span class="typo-h1">Aa Heading 1</span>
                <span class="typo-body">Aa Body text paragraph preview</span>
              </div>
            </div>
          </div>

          <!-- Agent Rules -->
          <div class="spec-section">
            <span class="spec-label">AI Agent Instructions (SKILL.md)</span>
            <div class="rules-block">
              <p class="rules-text">“{{ previewSkill.rules }}”</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Output Content (Brief Present) -->
    <div v-else-if="brief" class="output-wrapper-full">
      <!-- Tabs Header -->
      <div class="output-tabs">
        <div class="tabs-list">
          <button 
            @click="activeTab = 'prompt'" 
            class="tab-btn" 
            :class="{ active: activeTab === 'prompt' }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            PROMPT FINAL
          </button>
          <button 
            @click="activeTab = 'json'" 
            class="tab-btn" 
            :class="{ active: activeTab === 'json' }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2 2H1V7h15z"/></svg>
            JSON
          </button>
        </div>
        <div class="tabs-actions">
          <button v-if="activeTab === 'prompt'" @click="copyPromptFinal" class="btn-primary-action active-primary" :class="{ copied: finalCopied }">
            {{ finalCopied ? '✓ PROMPT COPIED' : 'COPY PROMPT FINAL' }}
          </button>
          <button v-else-if="activeTab === 'json'" @click="copyJson" class="btn-primary-action active-primary" :class="{ copied: jsonCopied }">
            {{ jsonCopied ? '✓ JSON COPIED' : 'COPY JSON' }}
          </button>
        </div>
      </div>

      <div class="output-content" ref="contentPane">
        <!-- Tab 1: PROMPT FINAL -->
        <div v-if="activeTab === 'prompt'" class="pane-content-wrapper">
          <div class="card-content-scroll">
            <!-- Formatted Design Brief Concept -->
            <div class="markdown-content" v-html="proseHtml"></div>

            <!-- Prompt Final Card -->
            <div v-if="parsedPromptData" class="prompt-json-card" style="margin-top: 24px;">
              <!-- Meta Grid -->
              <div class="prompt-meta-grid">
                <div class="prompt-meta-item">
                  <span class="meta-key">MOOD / VIBE</span>
                  <span class="meta-val">{{ parsedPromptData.mood }}</span>
                </div>
                <div class="prompt-meta-item">
                  <span class="meta-key">RESOLUSI</span>
                  <span class="meta-val">{{ parsedPromptData.resolusi }}</span>
                </div>
                <div class="prompt-meta-item">
                  <span class="meta-key">FORMAT OUTPUT</span>
                  <span class="meta-val">{{ parsedPromptData.format_output }}</span>
                </div>
                <div class="prompt-meta-item">
                  <span class="meta-key">KUALITAS CETAK</span>
                  <span class="meta-val">{{ parsedPromptData.kualitas_cetak }}</span>
                </div>
              </div>

              <!-- Negative Prompts Row -->
              <div class="negative-prompt-row">
                <span class="meta-key">NEGATIVE PROMPT</span>
                <div class="neg-tags">
                  <span v-for="(tag, idx) in parsedPromptData.negative_prompt" :key="idx" class="neg-tag">
                    {{ tag }}
                  </span>
                </div>
              </div>

              <!-- Design Principles Row -->
              <div v-if="parsedPromptData.design_principles" class="design-principles-row">
                <span class="meta-key">PRINSIP DESAIN & GOLDEN RATIO</span>
                <div class="principles-content markdown-content" v-html="designPrinciplesHtml"></div>
              </div>

              <!-- Prompt Final Block -->
              <div class="prompt-final-block">
                <div class="prompt-final-label">
                  <span class="meta-key">PROMPT FINAL TEXT</span>
                  <span class="prompt-final-tip">(Klik teks untuk menyalin)</span>
                </div>
                <div @click="copyPromptFinal" class="prompt-final-text">
                  {{ parsedPromptData.prompt_final }}
                </div>
                <button @click="copyPromptFinal" class="btn-copy-final-big" :class="{ copied: finalCopied }">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  {{ finalCopied ? '✓ Prompt Copied!' : 'Copy Prompt Final' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 2: JSON -->
        <div v-else-if="activeTab === 'json'" class="pane-content-wrapper">
          <div class="json-content-scroll">
            <pre class="raw-json">{{ jsonString }}</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div class="empty-icon-circle">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      </div>
      <h4>Generate Design Prompt</h4>
      <p>Isi data klien di sebelah kiri lalu klik <strong>Generate Design Prompt</strong>.<br>
        Output berupa prompt AI dan JSON parameter yang terpisah.</p>

      <!-- How-to tips -->
      <div class="howto-cards">
        <div class="howto-card">
          <span class="howto-num">1</span>
          <p>Isi semua field form — judul, produk, harga, kontak</p>
        </div>
        <div class="howto-card">
          <span class="howto-num">2</span>
          <p>Klik <strong>Generate</strong> untuk membuat brief lengkap & prompt gambar</p>
        </div>
        <div class="howto-card">
          <span class="howto-num">3</span>
          <p>Buka tab <strong>PROMPT FINAL</strong> untuk menyalin prompt, atau <strong>JSON</strong> untuk menyalin data terstruktur</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Marked } from 'marked';

const props = defineProps({
  brief: { type: String, default: '' },
  promptData: { type: Object, default: null },
  loading: { type: Boolean, default: false },
  formData: { type: Object, default: null },
  previewSkill: { type: Object, default: null }
});

const emit = defineEmits(['close-preview']);

const imageLoadError = ref(false);

watch(() => props.previewSkill, () => {
  imageLoadError.value = false;
});

const handleImageError = () => {
  imageLoadError.value = true;
};

const getColorCode = (colorName) => {
  const map = {
    'Biru Cyan': '#06b6d4',
    'Putih Transparan': 'rgba(255, 255, 255, 0.4)',
    'Ungu Neon': '#a855f7',
    'Kuning Lemon': '#facc15',
    'Hitam Pekat': '#090d16',
    'Biru Cobalt': '#1d4ed8',
    'Pink Fluorescent': '#ec4899',
    'Cyan Neon': '#22d3ee',
    'Putih Salju': '#f8fafc',
    'Hitam Murni': '#000000',
    'Abu-Abu Muted': '#64748b',
    'Abu-Abu Lembut': '#e2e8f0',
    'Krem Sand': '#f5f5f4',
    'Putih Bersih': '#ffffff',
    'Biru Sega': '#0055ff',
    'Kuning Sonic': '#ffe600',
    'Merah Arcade': '#ff0033',
    'Risograph Red': '#ff4848',
    'Riso Teal': '#00a3a3',
    'Kuning Mustard': '#e1ad01',
    'Clay Terracotta': '#d97706',
    'Sand Krem': '#e7e5e4',
    'Olive Green': '#65a30d',
    'Kertas Menguning': '#fef08a',
    'Biru Tinta': '#1e3a8a',
    'Abu Graphite': '#475569',
    
    // Additional colors:
    'Deep Obsidian': '#0f172a',
    'Electric Teal': '#14b8a6',
    'Pure White': '#ffffff',
    'Ant Blue': '#1890ff',
    'Neutral Slate': '#1e293b',
    'Warm White': '#fafafa',
    'Roku Purple': '#662d91',
    'Dark Charcoal': '#1f1f1f',
    'Steel Gray': '#7f8c8d',
    'Canvas Beige': '#f5f5dc',
    'Charcoal Ink': '#2c3e50',
    'Terracotta Red': '#e056fd',
    'Dark Slate': '#0f172a',
    'Cobalt Blue': '#0052cc',
    'Cyber Green': '#00ff66',
    'Jet Black': '#0a0a0a',
    'Amber Yellow': '#ffbf00',
    'Espresso Brown': '#3e2723',
    'Warm Sepia': '#795548',
    'Oat Cream': '#ede0d4',
    'Soft Clay Pink': '#ffccd5',
    'Lavender Mist': '#e8e8ff',
    'Pastel Mint': '#d8f3dc',
    'Ivory White': '#fffff0',
    'Charcoal Grey': '#333333',
    'Soft Amber': '#ffbf00',
    'Muted Slate': '#475569',
    'Sky Blue Tint': '#e0f2fe',
    'Terminal Dark': '#181818',
    'Syntax Green': '#a6e22e',
    'Code Amber': '#fd971f',
    'Cyan Blue': '#00d2ff',
    'Magenta Pink': '#f368e0',
    'Sunshine Yellow': '#ffff00',
    'Off-White Canvas': '#fcfcfc',
    'Sophisticated Tan': '#d2b48c',
    'Navy Blue': '#0a192f',
    'Office Slate': '#2d3748',
    'Ice Gray': '#f7fafc',
    'Nebula Purple': '#8b5cf6',
    'Cosmic Blue': '#1e1b4b',
    'Starlight Cyan': '#22d3ee',
    'Vibrant Orange': '#ff6b6b',
    'Cream Beige': '#f8f1e5',
    'Slate Grey': '#57606f',
    'Primary Blue': '#1e90ff',
    'Success Green': '#2ed573',
    'Classic B&W': '#000000',
    'Dither Slate': '#2f3542',
    'Lime Console': '#2ecc71',
    'Notebook Yellow': '#fffde7',
    'Graphite Black': '#212121',
    'Eraser Pink': '#ff80ab',
    'Teal Crimson': '#006266',
    'Dark Obsidian': '#111111',
    'Paper Ivory': '#fdfaf2',
    'Ink Charcoal': '#1b1b1b',
    'Warm Olive': '#556b2f',
    'Midnight Black': '#000000',
    'Safety Orange': '#ff5e00',
    'Indigo Glow': '#3f51b5',
    'Pulse Red': '#ff4757',
    'Google Blue': '#4285f4',
    'Paper White': '#fcfcfc',
    'Boundary Grey': '#dcdde1',
    'Neon Lime': '#00ff00',
    'Deep Violet': '#1e0030',
    'Electric Pink': '#ff007f',
    'Gold Ochre': '#cc9900',
    'Parchment Tan': '#edd6b1',
    'Ink Black': '#050505',
    'Telemetry Cyan': '#00f3ff',
    'Scanner Yellow': '#ffea00',
    'Solid Teal': '#008080',
    'Flat Gray': '#95a5a6',
    'Snow White': '#ffffff',
    'Pastel Yellow': '#fff9c4',
    'Soft Peach': '#ffecb3',
    'Muted Coral': '#ff8a80',
    'Cyber Purple': '#d63031',
    'Scanner Cyan': '#00cec9',
    'Volt Green': '#55efc4',
    'Clear Glass': 'rgba(255, 255, 255, 0.1)',
    'Frosted White': 'rgba(255, 255, 255, 0.7)',
    'Deep Sky Blue': '#0984e3',
    'Sunset Orange': '#ff7675',
    'Ocean Blue': '#74b9ff',
    'Aurora Purple': '#a29bfe',
    'Overlaid Black': 'rgba(0, 0, 0, 0.85)',
    'Accent Sky': '#81ecec',
    'Luxury Gold': '#d4af37',
    'Champagne Ivory': '#f9f6f0',
    'Onyx Black': '#353b48',
    'Soft Slate': '#718093',
    'Shadow Muted': 'rgba(0, 0, 0, 0.15)',
    'Tech Slate': '#4b6584',
    'Code Charcoal': '#2c3e50',
    'Accent Mint': '#2bcbba',
    'Caution Orange': '#fa8231',
    'Industrial Black': '#1e272e',
    'Material Indigo': '#3f51b5',
    'Teal Accent': '#009688',
    'Matrix Green': '#00ff00',
    'Phosphor Lime': '#3ae374',
    'Minimal Grey': '#a4b0be',
    'SaaS Indigo': '#5f27cd',
    'Ice Blue': '#c8d6e5',
    'Slate Black': '#1a1a2e',
    'Slate Ivory': '#eaeaea',
    'Line Orange': '#e67e22',
    'Canvas Cream': '#fdf6e3',
    'Draft Pencil Grey': '#535c68',
    'Grid Blue': '#70a1ff',
    'Brushed Silver': '#d1d8e0',
    'Leather Brown': '#845c36',
    'Glossy Cyan': '#00d2d3',
    'Gloss Obsidian': '#0c2461',
    'Chrome Cyan': '#82ccdd',
    'Clear Snow White': '#f1f2f6',
    'Coal Black': '#2f3640',
    'Creative Orange': '#e58e26',
    'Story Black': '#0a3d62',
    'Soft Ivory': '#f8f9fa',
    'Sand Cream': '#f1f2f6',
    'Olive Leaf': '#2f3542',
    'Tetris Blue': '#0984e3',
    'Tetris Red': '#d63031',
    'Tetris Yellow': '#f1c40f',
    'Saturated Lime': '#2ecc71',
    'Electric Indigo': '#3c6382',
    'Pure Magenta': '#e84118',
    'Typewriter Ink': '#2f3640',
    'Aging Parchment': '#fdf6e3',
    'Faded Red': '#e74c3c'
  };
  return map[colorName] || '#64748b';
};

const activeTab = ref('prompt'); // 'prompt' (PROMPT FINAL) or 'json'

const jsonCopied   = ref(false);
const finalCopied  = ref(false);
const contentPane  = ref(null);
const marked       = new Marked();

const jsonBlockRegex = /```json\s*([\s\S]*?)```/i;

// ─── Prose HTML parsing ──────────────────────────────────────────────────────
const proseHtml = computed(() => {
  if (!props.brief) return '';
  const withoutJson = props.brief.replace(jsonBlockRegex, '');
  return marked.parse(withoutJson);
});

const parsedPromptData = computed(() => props.promptData);

const designPrinciplesHtml = computed(() => {
  if (!parsedPromptData.value?.design_principles) return '';
  return marked.parse(parsedPromptData.value.design_principles);
});

// ─── JSON String ─────────────────────────────────────────────────────────────
const jsonString = computed(() => {
  if (!parsedPromptData.value) return '';
  const copy = { ...parsedPromptData.value };
  delete copy.design_principles;

  if (!props.formData) return JSON.stringify(copy, null, 2);

  const type = props.formData.formType;

  if (type === 'assets') {
    // ── Aset Visual: brand identity fields ──────────────────────────────────
    const clientDetails = {
      nama_brand:         props.formData.namaBrand      || '',
      tagline:            props.formData.tagline        || '',
      deskripsi_bisnis:   props.formData.deskripsi      || '',
      jenis_aset:         props.formData.jenisAset      || '',
      gaya_desain:        props.formData.gayaDesain     || '',
      gaya_rendering:     props.formData.gayaRendering  || '',
      referensi_gaya:     props.formData.referensiGaya  || '',
      tingkat_kompleksitas: props.formData.kompleksitas   || '',
      target_industri:      props.formData.targetSegment  || '',
      efek_finishing:       props.formData.efekFinishing  || '',
      brand_personality:  props.formData.brandPersonality || [],
      komposisi:          props.formData.komposisi      || '',
      warna_brand:        props.formData.warna          || '',
      format_file_target: props.formData.formatFile     || '',
      background:         props.formData.background     || '',
      reference_images_count: props.formData.referenceImages?.length || 0,
      instruksi_khusus:   props.formData.instruksi      || '',
    };

    return JSON.stringify({
      brand_details: clientDetails,
      ai_parameters: copy
    }, null, 2);

  } else if (type === 'portrait') {
    // ── Pas Foto & Portrait fields ──────────────────────────────────────────
    const clientDetails = {
      nama_subjek:        props.formData.namaSubjek     || '',
      gender_usia:        props.formData.genderUsia     || '',
      tipe_foto:          props.formData.tipeFoto       || '',
      background:         props.formData.background     || '',
      pakaian:            props.formData.pakaian        || '',
      ekspresi:           props.formData.ekspresi       || '',
      shot_type:          props.formData.shotType       || '',
      pencahayaan:        props.formData.pencahayaan    || '',
      kamera_fokus:       props.formData.kameraFokus    || '',
      arah_hadap_wajah:   props.formData.arahHadap      || '',
      tekstur_kulit:      props.formData.teksturWajah   || '',
      orientasi:          props.formData.orientasi      || '',
      dimensi:            props.formData.dimensi        || '',
      instruksi:          props.formData.instruksi      || '',
    };

    return JSON.stringify({
      portrait_details: clientDetails,
      ai_parameters: copy
    }, null, 2);

  } else if (type === 'uiux') {
    // ── Mockup UI/UX fields ─────────────────────────────────────────────────
    const clientDetails = {
      nama_aplikasi:      props.formData.namaAplikasi   || '',
      jenis_ui:           props.formData.jenisUI        || '',
      tema_desain:        props.formData.temaDesain     || '',
      skema_warna:        props.formData.warna          || '',
      widgets:            props.formData.widgets        || [],
      device_frame:       props.formData.deviceFrame    || '',
      sudut_pandang:      props.formData.sudutPandang   || '',
      kepadatan_data:     props.formData.kepadatanData  || '',
      kategori_font:      props.formData.kategoriFont   || '',
      efek_bayangan:      props.formData.shadowDepth    || '',
      orientasi:          props.formData.orientasi      || '',
      dimensi:            props.formData.dimensi        || '',
      instruksi:          props.formData.instruksi      || '',
    };

    return JSON.stringify({
      uiux_details: clientDetails,
      ai_parameters: copy
    }, null, 2);

  } else if (type === 'products') {
    // ── Foto Produk Studio fields ───────────────────────────────────────────
    const clientDetails = {
      nama_produk:        props.formData.namaProduk     || '',
      gaya_komposisi:     props.formData.gayaKomposisi  || '',
      kemasan_material:   props.formData.kemasanMaterial || '',
      elemen_studio:      props.formData.elemenStudio   || '',
      pencahayaan:        props.formData.pencahayaan    || '',
      skema_warna:        props.formData.warna          || '',
      props_tambahan:     props.formData.propsTambahan  || [],
      bukaan_lensa:       props.formData.bukaanLensa    || '',
      permukaan_dasar:    props.formData.permukaanDasar || '',
      efek_atmosfer:      props.formData.efekAtmosfer   || '',
      orientasi:          props.formData.orientasi      || '',
      dimensi:            props.formData.dimensi        || '',
      instruksi:          props.formData.instruksi      || '',
    };

    return JSON.stringify({
      product_details: clientDetails,
      ai_parameters: copy
    }, null, 2);

  } else if (type === 'scan') {
    // ── Scan Image fields ───────────────────────────────────────────
    const clientDetails = {
      image_name:         props.formData.imageName      || '',
      image_attached:     !!props.formData.imageUrl,
      target_output:      props.formData.targetOutput   || '',
      mj_version:         props.formData.mjVersion      || '',
      mj_style:           props.formData.mjStyle        || '',
      instruksi:          props.formData.instruksi      || '',
    };

    return JSON.stringify({
      scan_details: clientDetails,
      ai_parameters: copy
    }, null, 2);

  } else {
    // ── Media Promosi: banner/poster fields ──────────────────────────────────
    const clientDetails = {
      judul:                props.formData.judul          || '',
      subjudul:             props.formData.subjudul       || '',
      deskripsi:            props.formData.deskripsi      || '',
      slogan:               props.formData.slogan         || '',
      whatsapp:             props.formData.whatsapp       || '',
      instagram:            props.formData.instagram      || '',
      youtube:              props.formData.youtube        || '',
      tiktok:               props.formData.tiktok         || '',
      facebook:             props.formData.facebook       || '',
      alamat:               props.formData.alamat         || '',
      kontak_lain:          props.formData.kontakLain     || '',
      logo_attached:        !!props.formData.logoName,
      logo_name:            props.formData.logoName       || '',
      product_photos_count: props.formData.productPhotos?.length || 0,
      daftar_produk:        props.formData.daftarProduk   || '',
      elemen:               props.formData.elemen         || '',
      format_media:         props.formData.formatMedia    || '',
      orientasi:            props.formData.orientasi      || 'Landscape',
      dimensi:              props.formData.dimensi        || '',
      warna:                props.formData.warna          || '',
      tema:                 props.formData.tema           || '',
      cta:                  props.formData.cta            || '',
      mood:                 props.formData.mood           || '',
      gaya_visual:          props.formData.gayaVisual     || '',
      reference_images_count: props.formData.referenceImages?.length || 0,
      instruksi:            props.formData.instruksi      || '',
    };

    return JSON.stringify({
      client_details: clientDetails,
      ai_parameters: copy
    }, null, 2);
  }
});

// ─── Copy helpers ─────────────────────────────────────────────────────────────
const copyText = async (text) => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch { return false; }
};

const withFlag = async (text, flag, ms = 2000) => {
  const ok = await copyText(text);
  if (ok) { flag.value = true; setTimeout(() => flag.value = false, ms); }
};

const copyJson        = () => withFlag(jsonString.value, jsonCopied);
const copyPromptFinal = () => {
  const t = parsedPromptData.value?.prompt_final || '';
  withFlag(t, finalCopied);
};
</script>

<style scoped>
/* ─── Container ─────────────────────────────────────────── */
.brief-output-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 0;
  overflow: hidden;
}

/* ─── Header ────────────────────────────────────────────── */
.output-header {
  flex-shrink: 0;
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-md);
}

.output-title {
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

/* ─── Tabs Bar ──────────────────────────────────────────── */
.output-tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.005);
  border-bottom: none;
  padding: 12px 16px;
  gap: 8px;
  flex-shrink: 0;
}

.tabs-list {
  display: flex;
  gap: 8px;
  align-items: center;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.tabs-list::-webkit-scrollbar {
  display: none;
}

.tabs-actions {
  display: flex;
  align-items: center;
}

.tab-btn {
  background: var(--bg-btn-secondary);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  color: var(--text-dim);
  font-family: var(--display-font);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: var(--ls-wide);
  padding: 8px 16px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.tab-btn:hover {
  color: var(--text-main);
  background: var(--bg-hover);
}

.tab-btn.active {
  color: var(--text-on-accent);
  background: var(--accent-gradient);
  box-shadow: 0 4px 12px var(--accent-glow);
  border-color: transparent;
}

/* ─── Pane layout ───────────────────────────────────────── */
.pane-content-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  gap: var(--space-md);
}

.pane-action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  padding-bottom: var(--space-sm);
  border-bottom: none;
}

.pane-title-tag {
  font-family: var(--mono-font);
  font-size: var(--text-xs);
  color: var(--accent-color);
  letter-spacing: var(--ls-widest);
  opacity: 0.85;
}

.pane-actions {
  display: flex;
  gap: var(--space-xs);
}

.btn-secondary-action,
.btn-primary-action {
  padding: 6px 14px;
  font-family: var(--display-font);
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: var(--ls-wide);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-secondary-action {
  background: rgba(255,255,255,0.03);
  color: var(--text-muted);
  border: 1px solid rgba(255,255,255,0.07);
}
.btn-secondary-action:hover {
  background: rgba(255,255,255,0.07);
  color: var(--text-main);
}

.btn-primary-action {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-main);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.btn-primary-action:hover {
  background: rgba(255, 255, 255, 0.14);
}
.btn-primary-action:active {
  transform: scale(0.94);
}

.btn-primary-action.active-primary {
  background: var(--accent-gradient);
  color: var(--text-on-accent);
  border: none;
}
.btn-primary-action.active-primary:hover {
  box-shadow: 0 0 12px var(--accent-glow);
  transform: translateY(-1px);
}
.btn-primary-action.active-primary.copied {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.4) !important;
  transform: scale(0.96);
}

.markdown-content-scroll,
.card-content-scroll,
.json-content-scroll {
  flex: 1 1 0;
  overflow-y: auto;
  min-height: 0;
  padding: 0 7.5px 0 20px;
}

/* ─── Empty state ───────────────────────────────────────── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl) var(--space-lg);
  text-align: center;
  flex-grow: 1;
  gap: var(--space-md);
}

.empty-icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--accent-glow);
  border: 1px solid var(--accent-border-dashed);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-color);
  box-shadow: 0 0 20px var(--accent-glow);
}

.empty-state h4 {
  font-family: var(--display-font);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--text-main);
}

.empty-state p {
  font-size: var(--text-base);
  color: var(--text-muted);
  max-width: 420px;
  line-height: var(--lh-base);
}

.howto-cards {
  display: flex;
  gap: var(--space-sm);
  margin-top: var(--space-sm);
  flex-wrap: wrap;
  justify-content: center;
}

.howto-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: var(--space-md);
  width: 140px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.howto-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--accent-gradient);
  color: var(--text-on-accent);
  font-family: var(--display-font);
  font-size: var(--text-xs);
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.howto-card p {
  font-size: var(--text-xs);
  color: var(--text-dim);
  line-height: var(--lh-base);
  margin: 0;
}

/* ─── Loading state ─────────────────────────────────────── */
.loading-state {
  padding: var(--space-xl) var(--space-lg);
  flex-grow: 1;
  overflow-y: auto;
}

.loading-badge {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.loading-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-color);
  animation: dotBounce 1.2s ease-in-out infinite;
}
.loading-dot:nth-child(2) { animation-delay: 0.2s; }
.loading-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes dotBounce {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50%       { transform: translateY(-5px); opacity: 1; }
}

.loading-label {
  font-family: var(--mono-font);
  font-size: var(--text-xs);
  color: var(--accent-color);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
}

.json-skeleton {
  margin-top: var(--space-lg);
  background: var(--accent-glow);
  border: 1px solid var(--accent-border-dashed);
  border-radius: 10px;
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.json-skel-header {
  height: 20px;
  width: 60%;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--bg-hover) 25%, var(--accent-glow) 37%, var(--bg-hover) 63%);
  background-size: 400% 100%;
  animation: skeletonLoad 1.4s ease infinite;
  margin-bottom: var(--space-sm);
}

.json-skel-line {
  height: 10px;
  border-radius: 3px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.02) 25%, rgba(255, 255, 255, 0.06) 37%, rgba(255, 255, 255, 0.02) 63%);
  background-size: 400% 100%;
  animation: skeletonLoad 1.4s ease infinite;
}

.json-skel-long {
  height: 60px;
  width: 100%;
  border-radius: 6px;
  background: linear-gradient(90deg, var(--bg-hover) 25%, var(--accent-glow) 37%, var(--bg-hover) 63%);
  background-size: 400% 100%;
  animation: skeletonLoad 1.4s ease infinite;
  margin-top: var(--space-sm);
}

/* ─── Output content ────────────────────────────────────── */
.output-content {
  flex-grow: 1;
  min-height: 0;
  overflow: hidden;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  animation: fadeIn 0.3s ease forwards;
}

/* ─── JSON Prompt Card ──────────────────────────────────── */
.prompt-json-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

/* ─── Meta grid ─────────────────────────────────────────── */
.prompt-meta-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  background: transparent;
  border-bottom: none;
  padding: 16px;
}

.prompt-meta-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 16px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: background 0.2s ease;
}
.prompt-meta-item:hover {
  background: var(--bg-hover);
}

.meta-key {
  font-family: var(--mono-font);
  font-size: var(--text-xs);
  color: var(--accent-color);
  letter-spacing: var(--ls-wide);
  opacity: 0.7;
}

.meta-val {
  font-family: var(--sans-font);
  font-size: var(--text-sm);
  color: var(--text-muted);
  line-height: var(--lh-base);
}

/* ─── Negative prompts ──────────────────────────────────── */
.negative-prompt-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-bottom: none;
}

.neg-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.neg-tag {
  font-family: var(--mono-font);
  font-size: 0.72rem;
  background: rgba(239, 68, 68, 0.05);
  border: none;
  color: #fca5a5;
  padding: 4px 10px;
  border-radius: 6px;
}

/* ─── Design Principles ─────────────────────────────────── */
.design-principles-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  padding: 16px;
  border-bottom: none;
  background: transparent;
}

.principles-content {
  font-size: var(--text-xs);
  color: var(--text-muted);
  line-height: var(--lh-loose);
}

.principles-content :deep(h2) {
  font-family: var(--display-font);
  font-size: var(--text-sm);
  font-weight: 800;
  color: var(--accent-color);
  margin-top: var(--space-md);
  margin-bottom: var(--space-xs);
  text-transform: uppercase;
  letter-spacing: var(--ls-wide);
}

.principles-content :deep(p) {
  margin-bottom: var(--space-xs);
}

.principles-content :deep(ul) {
  padding-left: var(--space-md);
  margin-bottom: var(--space-sm);
}

.principles-content :deep(li) {
  margin-bottom: 4px;
}

.principles-content :deep(hr) {
  border: 0;
  border-top: 1px solid var(--border-color);
  margin: var(--space-sm) 0;
}

.principles-content :deep(blockquote) {
  border-left: 3px solid var(--accent-color);
  background: var(--accent-glow);
  padding: var(--space-xs) var(--space-sm);
  border-radius: 0 6px 6px 0;
  margin: var(--space-sm) 0;
}

/* ─── prompt_final block ────────────────────────────────── */
.prompt-final-block {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  border-top: none;
}

.prompt-final-label {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.prompt-final-tip {
  font-size: var(--text-nano);
  color: var(--accent-color);
  opacity: 0.6;
  font-style: italic;
}

.prompt-final-text {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 18px;
  font-family: var(--sans-font);
  font-size: var(--text-sm);
  color: var(--text-muted);
  line-height: var(--lh-loose);
  white-space: pre-wrap;
  word-break: break-word;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  max-height: 280px;
  overflow-y: auto;
}
.prompt-final-text:hover {
  background: var(--bg-hover);
  color: var(--text-main);
  border-color: var(--accent-color);
  box-shadow: 0 0 15px var(--accent-glow), inset 0 0 8px var(--accent-glow);
}

.btn-copy-final-big {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-lg);
  background: var(--accent-gradient);
  color: var(--text-on-accent);
  font-family: var(--display-font);
  font-size: var(--text-sm);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: var(--ls-wide);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  align-self: stretch;
}
.btn-copy-final-big:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 20px var(--accent-glow);
}
.btn-copy-final-big:active {
  transform: scale(0.96);
}
.btn-copy-final-big.copied {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.4) !important;
  transform: scale(0.98);
}



.raw-json {
  margin: 0;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 18px;
  font-family: var(--mono-font);
  font-size: var(--text-sm);
  color: var(--text-json);
  white-space: pre-wrap;
  word-break: break-word;
  max-height: none;
  overflow-y: visible;
  line-height: var(--lh-base);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.raw-json:hover {
  border-color: var(--accent-color);
  box-shadow: 0 0 15px var(--accent-glow), inset 0 0 8px var(--accent-glow);
}

/* ─── Responsive Adjustments ────────────────────────────── */
@media (max-width: 639px) {
  .output-header {
    padding: var(--space-sm) var(--space-md);
  }
  
  .output-tabs {
    padding: 10px 12px;
    overflow-x: visible;
    white-space: normal;
  }
  
  .tab-btn {
    padding: 8px 12px;
    font-size: 0.72rem;
  }
  
  .output-content {
    padding: 0;
    gap: var(--space-md);
  }
  
  .prompt-meta-grid {
    grid-template-columns: 1fr;
  }
  
  .prompt-final-block {
    padding: var(--space-sm) var(--space-md);
  }
  
  .generator-btns {
    gap: 4px;
  }
  
  .gen-btn {
    padding: 4px 8px;
    font-size: 0.65rem;
  }
}

/* ─── Design Skill Preview ────────────────────────────── */
.preview-skill-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-card);
}

.preview-header-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.preview-badge {
  font-size: 9px;
  background: var(--accent-glow);
  color: var(--accent-color);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--accent-border-dashed);
  width: fit-content;
  text-transform: uppercase;
  font-weight: 600;
}

.preview-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
}

.btn-close-preview {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 24px;
  cursor: pointer;
  padding: 4px 8px;
  line-height: 1;
  transition: color 0.2s ease;
}

.btn-close-preview:hover {
  color: var(--text-main);
}

.preview-body-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.preview-image-wrapper {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  position: relative;
}

.design-preview-image {
  width: 100%;
  height: auto;
  max-height: 600px;
  object-fit: contain;
  display: block;
}

.preview-image-fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  text-align: center;
  color: var(--text-muted);
}

.fallback-icon {
  font-size: 36px;
  margin-bottom: 12px;
}

.specs-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.specs-heading {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main);
  margin: 0;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 8px;
}

.spec-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.spec-label {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.color-swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.color-swatch-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  padding: 6px 12px;
  border-radius: 20px;
}

.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
}

.color-name {
  font-size: 12px;
  color: var(--text-main);
}

.typography-preview-box {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.typo-font-family {
  font-family: monospace;
  font-size: 11px;
  color: var(--accent-color);
  margin-bottom: 4px;
  display: block;
}

.typo-scale {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.typo-h1 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-main);
}

.typo-body {
  font-size: 12px;
  color: var(--text-muted);
}

.rules-block {
  background: var(--bg-color);
  border-left: 3px solid var(--accent-color);
  border-radius: 0 8px 8px 0;
  padding: 10px 16px;
}

.rules-text {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0;
  font-style: italic;
}

</style>

