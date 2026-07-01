<template>
  <div class="form-body">
    <!-- SECTION 1 — DETAIL PROJEK WEBSITE -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">1</span>
        <h4 class="section-title">DETAIL PROJEK WEBSITE</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Nama Projek / Website</label>
        <div class="input-wrapper">
          <input type="text" v-model="formDataWebGen.namaProject" class="input-text" placeholder="E.g. Nusantara Trip Planner, GENSV Studio..." />
          <button v-if="formDataWebGen.namaProject" @click="formDataWebGen.namaProject = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
        </div>
      </div>
      <div class="form-group" style="margin-top: 8px; margin-bottom: var(--space-md);">
        <button type="button" @click="autoFillWebGen" class="btn-title-fill" :disabled="autoFilling || loading || !formDataWebGen.namaProject">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
            stroke-linejoin="round" style="margin-right: 5px;">
            <path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/>
            <path d="M17.8 11.8 19 13"/><path d="M15 9h0"/><path d="M17.8 6.2 19 5"/>
            <path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/>
          </svg>
          {{ autoFilling ? 'Generating...' : 'FILL FROM Nama Projek / Website' }}
        </button>
      </div>
      <div class="form-group">
        <label class="form-label">Subjudul / Tagline</label>
        <div class="input-wrapper">
          <input type="text" v-model="formDataWebGen.subjudul" class="input-text" placeholder="E.g. Solusi Perjalanan Lengkap dan Terpercaya" />
          <button v-if="formDataWebGen.subjudul" @click="formDataWebGen.subjudul = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Slogan</label>
        <div class="input-wrapper">
          <input type="text" v-model="formDataWebGen.slogan" class="input-text" placeholder="E.g. Jelajah Indonesia dengan Mudah" />
          <button v-if="formDataWebGen.slogan" @click="formDataWebGen.slogan = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Deskripsi & Tujuan Proyek</label>
        <textarea v-model="formDataWebGen.deskripsi" class="input-textarea" rows="3"
          placeholder="E.g. Platform pariwisata terintegrasi yang memudahkan turis merencanakan liburan..."></textarea>
      </div>
    </div>

    <!-- SECTION 2 — TECH STACK & ARSITEKTUR -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">2</span>
        <h4 class="section-title">TECH STACK & ARSITEKTUR</h4>
      </div>
      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Frontend Framework</label>
          <CustomSelect v-model="formDataWebGen.techStack" :options="webFrameworkOptions" />
          <p v-if="techStackNote" class="select-note-hint">{{ techStackNote }}</p>
        </div>
        <div class="form-group">
          <label class="form-label">Backend / Integration</label>
          <CustomSelect v-model="formDataWebGen.backendTech" :options="webBackendOptions" />
          <p v-if="backendTechNote" class="select-note-hint">{{ backendTechNote }}</p>
        </div>
      </div>
      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Database & Auth</label>
          <CustomSelect v-model="formDataWebGen.databaseTech" :options="webDatabaseOptions" />
          <p v-if="databaseTechNote" class="select-note-hint">{{ databaseTechNote }}</p>
        </div>
        <div class="form-group">
          <label class="form-label">Media & Storage</label>
          <CustomSelect v-model="formDataWebGen.mediaStorage" :options="webStorageOptions" />
          <p v-if="mediaStorageNote" class="select-note-hint">{{ mediaStorageNote }}</p>
        </div>
      </div>
      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">UI Component Kit</label>
          <CustomSelect v-model="formDataWebGen.uiKit" :options="webUiKitOptions" />
          <p v-if="uiKitNote" class="select-note-hint">{{ uiKitNote }}</p>
        </div>
        <div class="form-group">
          <label class="form-label">State Management</label>
          <CustomSelect v-model="formDataWebGen.stateManagement" :options="webStateOptions" />
          <p v-if="stateManagementNote" class="select-note-hint">{{ stateManagementNote }}</p>
        </div>
      </div>
    </div>

    <!-- SECTION 3 — FITUR & PRINSIP UI/UX -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">3</span>
        <h4 class="section-title">FITUR & PRINSIP DESAIN</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Fitur Utama <span class="label-note">(Pilih dari daftar - Klik tag untuk deskripsi fungsi)</span></label>
        <CustomSelect v-model="tempFeature" :options="webFeatureOptions" placeholder="Pilih Fitur Utama..." @change="addFeature" />
        
        <!-- Selected tags container -->
        <div v-if="formDataWebGen.fiturUtama.length > 0" class="selected-tags-container">
          <div 
            v-for="tag in formDataWebGen.fiturUtama" 
            :key="tag" 
            class="selected-tag"
            @click.stop="toggleTooltip(tag)"
          >
            <span class="tag-text">{{ tag }}</span>
            <button type="button" class="btn-remove-tag" @click.stop="removeFeature(tag)" aria-label="Hapus">&times;</button>
            <Transition name="fade-tooltip">
              <div v-if="activeTooltip === tag" class="tag-tooltip">
                {{ getTooltipText(tag) }}
                <div class="tooltip-arrow"></div>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <div class="form-group" style="margin-top: var(--space-md);">
        <label class="form-label">Prinsip UI/UX Vibe Coding <span class="label-note">(Pilih dari daftar - Klik tag untuk deskripsi fungsi)</span></label>
        <CustomSelect v-model="tempPrinciple" :options="webUiPrinciples" placeholder="Pilih Prinsip Desain..." @change="addPrinciple" />
        
        <!-- Selected tags container -->
        <div v-if="formDataWebGen.prinsipUI.length > 0" class="selected-tags-container">
          <div 
            v-for="tag in formDataWebGen.prinsipUI" 
            :key="tag" 
            class="selected-tag"
            @click.stop="toggleTooltip(tag)"
          >
            <span class="tag-text">{{ tag }}</span>
            <button type="button" class="btn-remove-tag" @click.stop="removePrinciple(tag)" aria-label="Hapus">&times;</button>
            <Transition name="fade-tooltip">
              <div v-if="activeTooltip === tag" class="tag-tooltip">
                {{ getTooltipText(tag) }}
                <div class="tooltip-arrow"></div>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <div class="form-group" style="margin-top: var(--space-md);">
        <label class="form-label">Library Tambahan <span class="label-note">(Pilih dari daftar - Klik tag untuk deskripsi fungsi)</span></label>
        <CustomSelect v-model="tempExtraLib" :options="webExtraLibOptions" placeholder="Pilih Library..." @change="addExtraLib" />
        
        <!-- Selected tags container -->
        <div v-if="formDataWebGen.libraryTambahan.length > 0" class="selected-tags-container">
          <div 
            v-for="tag in formDataWebGen.libraryTambahan" 
            :key="tag" 
            class="selected-tag"
            @click.stop="toggleTooltip(tag)"
          >
            <span class="tag-text">{{ tag }}</span>
            <button type="button" class="btn-remove-tag" @click.stop="removeExtraLib(tag)" aria-label="Hapus">&times;</button>
            <Transition name="fade-tooltip">
              <div v-if="activeTooltip === tag" class="tag-tooltip">
                {{ getTooltipText(tag) }}
                <div class="tooltip-arrow"></div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION 4 — KEBUTUHAN KHUSUS -->
    <div class="form-section last-section">
      <div class="section-header">
        <span class="section-num">4</span>
        <h4 class="section-title">INSTRUKSI TAMBAHAN</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Detail Kebutuhan / Integrasi <span class="label-note">(Opsional)</span></label>
        <textarea v-model="formDataWebGen.instruksi" class="input-textarea large-textarea" rows="4"
          placeholder="E.g. Gunakan folder terpisah untuk admin dan client frontend, sediakan file setup Supabase SQL di folder backend..."></textarea>
        <p class="field-hint">Tulis instruksi khusus yang perlu dimasukkan ke dalam prompt kode final.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import CustomSelect from '../CustomSelect.vue';
import { getApiConfig } from '../../utils/api.js';
import {
  webFrameworkOptions,
  webBackendOptions,
  webDatabaseOptions,
  webStorageOptions,
  webUiKitOptions,
  webStateOptions,
  webFeatureOptions,
  webUiPrinciples,
  webExtraLibOptions
} from '../../constants/formOptions.js';

const props = defineProps({
  formDataWebGen: Object,
  loading: Boolean,
  autoFilling: Boolean
});

const techStackNote = computed(() => {
  switch (props.formDataWebGen.techStack) {
    case 'Vue 3 + Vite / Nuxt 3': return 'Vue + Vite: Rekomendasi utama, performa sangat cepat, ekosistem modern, dan mudah dikembangkan.';
    case 'Vue 3 + Vite': return 'Vue 3: Ideal untuk Single Page Application (SPA) yang super ringan dan cepat dibuild.';
    case 'Nuxt 3': return 'Nuxt 3: Sempurna untuk Server-Side Rendering (SSR) agar SEO maksimal dan indexing cepat.';
    case 'SvelteKit': return 'SvelteKit: Performa paling kencang dengan ukuran bundle paling kecil, namun komunitasnya lebih kecil.';
    case 'React + Vite': return 'React: Komunitas paling besar di dunia, library melimpah, namun performa bundle sedikit lebih berat dibanding Vue.';
    case 'Next.js': return 'Next.js: Standar industri React untuk SSR/SEO skala enterprise, tapi konfigurasi dan size cukup besar.';
    case 'SolidJS': return 'SolidJS: Sangat mirip React tapi tanpa Virtual DOM, menghasilkan performa rendering super kencang.';
    case 'Astro (Static/Content-driven)': return 'Astro: Sempurna untuk web kaya konten (blog, landing) karena mengirimkan 0% Javascript secara default.';
    case 'Angular (Enterprise)': return 'Angular: Framework lengkap dari Google, sangat terstruktur untuk tim skala besar.';
    case 'Remix (React Framework)': return 'Remix: React framework modern berfokus pada web standard, optimasi UX, dan transisi halaman cepat.';
    case 'Qwik (Resumable)': return 'Qwik: Framework dengan fitur resumability, membuat waktu load instan terlepas dari ukuran app.';
    case 'HTML5 + Vanilla JS': return 'HTML5 + JS: Tanpa framework, performa instan murni, tapi kurang cocok untuk sistem kompleks.';
    default: return '';
  }
});

const backendTechNote = computed(() => {
  switch (props.formDataWebGen.backendTech) {
    case 'Node.js + Fastify': return 'Fastify: Node.js framework super cepat dengan overhead sangat kecil, lebih unggul dari Express.';
    case 'Node.js + Express': return 'Express: Framework paling legendaris dan populer, namun performanya kalah cepat dibanding Fastify.';
    case 'NestJS (TypeScript Node)': return 'NestJS: Node.js framework modular terstruktur mirip Angular, sangat cocok untuk TypeScript.';
    case 'Bun + Elysia (Super Fast)': return 'Bun + Elysia: Server runtime JavaScript modern ultra cepat dengan tipe data terintegrasi murni.';
    case 'Golang + Fiber/Gin': return 'Golang: Bahasa compiled, performa konkurensi tingkat dewa untuk backend skala raksasa.';
    case 'Python + FastAPI': return 'FastAPI: Pilihan terbaik untuk integrasi AI/Data Science, development cepat dengan auto-documentation.';
    case 'Laravel / PHP (Monolith/API)': return 'Laravel: Framework PHP paling produktif di dunia, lengkap dengan database, auth, dan queue bawaan.';
    case 'Ruby on Rails': return 'Rails: Pionir framework MVC yang sangat cepat untuk meluncurkan produk startup (prototyping kilat).';
    case 'Spring Boot / Java': return 'Spring Boot: Standard industri Java enterprise, sangat tangguh, aman, dan andal untuk transaksi skala masif.';
    case 'Rust + Axum (Ultra Performance)': return 'Rust + Axum: Performa ekstrim, konsumsi memory super minim, dan keamanan konkurensi tingkat tinggi.';
    case 'Supabase Serverless': return 'Supabase: Membangun web tanpa coding backend sama sekali, database langsung terhubung via API klien.';
    default: return '';
  }
});

const databaseTechNote = computed(() => {
  switch (props.formDataWebGen.databaseTech) {
    case 'Supabase (PostgreSQL)': return 'Supabase: Paling direkomendasikan. Sudah siap pakai dengan Database, Auth, dan Realtime Sync terintegrasi.';
    case 'PostgreSQL': return 'PostgreSQL: Database relasional standard enterprise, andal untuk query kompleks dan data terstruktur.';
    case 'MySQL': return 'MySQL: Database relasional terpopuler, sangat aman, dan didukung hampir semua hosting cloud.';
    case 'MongoDB': return 'MongoDB: Database NoSQL berbasis dokumen, sangat fleksibel untuk data skema dinamis.';
    case 'SQLite': return 'SQLite: Database serverless super ringan, cocok untuk aplikasi lokal, testing, dan mockup cepat.';
    case 'Firebase Firestore': return 'Firebase: Layanan cloud database NoSQL real-time dan auth instan siap pakai dari Google.';
    case 'PlanetScale (Serverless MySQL)': return 'PlanetScale: Database MySQL serverless skala enterprise dengan skema branching dan scaling otomatis.';
    case 'Prisma ORM Client': return 'Prisma: ORM modern untuk Node.js/TypeScript yang membuat interaksi database terasa intuitif dan aman.';
    case 'Redis (Caching & Key-Value)': return 'Redis: Database in-memory ultra cepat, biasanya digunakan sebagai cache atau session storage.';
    case 'DynamoDB (AWS NoSQL)': return 'DynamoDB: Database NoSQL serverless fully managed dari AWS dengan performa latensi milidetik.';
    default: return '';
  }
});

const mediaStorageNote = computed(() => {
  switch (props.formDataWebGen.mediaStorage) {
    case 'Cloudinary': return 'Cloudinary: Solusi media terbaik. Meng-host gambar/video secara otomatis dengan optimasi ukuran dan CDN global.';
    case 'Supabase Storage': return 'Supabase Storage: Penyimpanan file yang menyatu langsung dengan akun database dan auth Supabase.';
    case 'Firebase Storage': return 'Firebase Storage: Penyimpanan file cloud aman dari Google yang terintegrasi langsung dengan Firebase SDK.';
    case 'Vercel Blob': return 'Vercel Blob: Solusi penyimpanan file instan khusus untuk aplikasi yang dideploy di Vercel.';
    case 'AWS S3': return 'AWS S3: Standar industri storage global untuk file berukuran sangat besar dengan keandalan tinggi.';
    case 'Google Cloud Storage': return 'GCS: Penyimpanan awan Google dengan performa transfer data sangat cepat.';
    case 'Azure Blob Storage': return 'Azure Blob: Storage cloud enterprise dari Microsoft untuk menyimpan data file tidak terstruktur skala besar.';
    case 'Local Disk': return 'Local Disk: Menyimpan file langsung di folder server lokal, gratis namun kurang cocok untuk server skala terdistribusi.';
    default: return '';
  }
});

const uiKitNote = computed(() => {
  switch (props.formDataWebGen.uiKit) {
    case 'shadcn/ui': return 'shadcn/ui: Komponen modern terpopuler. Code di-copy langsung ke project sehingga bisa dikustomisasi 100% secara bebas.';
    case 'Headless UI': return 'Headless UI: Pilihan tepat untuk komponen unstyled yang ramah aksesibilitas (A11y).';
    case 'Naive UI': return 'Naive UI: UI kit premium khusus untuk Vue 3, memiliki desain yang rapi dan performa responsif.';
    case 'Vuetify (Vue Material Design)': return 'Vuetify: Framework UI Vue terlengkap berbasis Google Material Design dengan komponen siap pakai.';
    case 'daisyui': return 'daisyui: Plugin Tailwind CSS yang menyediakan komponen siap pakai dengan kelas utilitas murni.';
    case 'Mantine (React Component Library)': return 'Mantine: Library komponen React dengan puluhan komponen fungsional dan hook penunjang.';
    case 'Chakra UI (React/Vue)': return 'Chakra UI: Pilihan tepat untuk membangun antarmuka web modular yang ramah aksesibilitas (A11y).';
    case 'Ant Design (Enterprise UI)': return 'Ant Design: UI Kit standard enterprise yang sangat lengkap untuk dashboard admin internal skala besar.';
    case 'PrimeVue (Vue UI Components)': return 'PrimeVue: Koleksi komponen UI Vue 3 premium terlengkap dengan puluhan tema visual menarik.';
    case 'Tailwind CSS': return 'Tailwind CSS: Styling murni dari nol dengan kelas utilitas, fleksibilitas desain tanpa batas.';
    default: return '';
  }
});

const stateManagementNote = computed(() => {
  switch (props.formDataWebGen.stateManagement) {
    case 'Zustand + TanStack Query': return 'Zustand + Query: Kombinasi terbaik untuk caching data server otomatis dan manajemen state lokal yang bersih.';
    case 'Pinia': return 'Pinia: State management resmi untuk Vue 3 yang sangat intuitif, rapi, dan terintegrasi dengan devtools.';
    case 'Redux Toolkit': return 'Redux: State management klasik untuk React, sangat kuat dan terstruktur tapi memerlukan banyak boilerplate code.';
    case 'VueUse': return 'VueUse: Koleksi utility function Vue Composition API untuk interaksi browser dan sensor instan.';
    case 'Context API': return 'Context API: State management bawaan React, cocok untuk state skala kecil-menengah tanpa library tambahan.';
    case 'Recoil (React State)': return 'Recoil: State management berbasis graf (atoms & selectors) khusus untuk React.';
    case 'Jotai (React Atom State)': return 'Jotai: State management berbasis atom, alternatif yang sangat ringan dibanding Redux.';
    case 'MobX': return 'MobX: State management berbasis reactive programming yang menyederhanakan sinkronisasi data state.';
    case 'Signal (Preact/Solid/Vue)': return 'Signal: Konsep reactivity modern untuk update elemen UI instan tanpa re-render komponen secara penuh.';
    case 'XState (State Machine)': return 'XState: Manajemen state berbasis teori finite state machine, cocok untuk alur logika/proses yang sangat kompleks.';
    default: return '';
  }
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

const activeTooltip = ref('');

const toggleTooltip = (tag) => {
  if (activeTooltip.value === tag) {
    activeTooltip.value = '';
  } else {
    activeTooltip.value = tag;
  }
};

const closeTooltip = () => {
  activeTooltip.value = '';
};

onMounted(() => {
  window.addEventListener('click', closeTooltip);
});

onUnmounted(() => {
  window.removeEventListener('click', closeTooltip);
});

const tooltipDictionary = {
  // Features
  'Authentication (Login/Register)': 'Menyediakan alur pendaftaran, login, dan pembatasan akses halaman aman untuk user.',
  'Responsive Layout (Mobile & Desktop)': 'Memastikan layout web secara otomatis menyesuaikan ukuran layar HP, tablet, dan monitor.',
  'Dark Mode Priority': 'Memberikan skema warna gelap untuk kenyamanan mata pengguna dan efisiensi baterai.',
  'PWA Offline-First (Service Worker & Cache)': 'Memungkinkan website diakses tanpa koneksi internet dengan caching service worker.',
  'Multi-step Dynamic Input Form': 'Memecah input formulir panjang menjadi beberapa langkah interaktif agar ramah pengguna.',
  'Realtime Sync & Subscription': 'Sinkronisasi data langsung tanpa reload halaman saat ada perubahan di database.',
  'Payment Gateway Integration': 'Integrasi sistem transaksi digital untuk menerima pembayaran e-wallet, VA, atau kartu.',
  'Interactive Map (Leaflet/Google Maps)': 'Menampilkan peta interaktif dengan pin lokasi, koordinat, dan rute perjalanan.',
  'Internationalization (i18n Multi-language)': 'Mendukung pengalihan bahasa antarmuka web secara dinamis untuk pasar global.',
  'File Upload & Media Management': 'Mengunggah gambar atau dokumen langsung ke storage cloud dengan validasi ukuran/tipe.',
  'Dashboard & Analytics Chart': 'Menampilkan visualisasi data berupa grafik batang, tren garis, atau diagram lingkaran.',
  'Zod Form Schema Validation': 'Validasi data input sisi klien sebelum submit untuk menghindari error format.',

  // Principles
  'Minimalis Modern': 'Desain modern yang bersih, fokus pada konten utama, dan tidak padat elemen.',
  'Dark Mode Prioritas': 'Memprioritaskan kenyamanan visual malam hari dengan warna abu-abu/hitam pekat.',
  'Whitespace Lega (Clean)': 'Memberikan jarak pernapasan antar komponen agar layout terlihat premium dan elegan.',
  'Borderless & Minim Box': 'Mengurangi kotak pembatas tebal, menggunakan spasi kosong sebagai pembatas visual.',
  'Separate Input UI/UX (Multi-step)': 'Mengelompokkan input sejenis di langkah terpisah agar user tidak kelelahan mengisi data.',
  'Animasi Super Ringan (Native CSS)': 'Gunakan transisi CSS murni yang hemat resource untuk animasi interaksi mikro.',
  'Touch-friendly (Mobile target 44x44px)': 'Ukuran tombol sentuh minimal 44x44 piksel agar mudah ditekan di HP Android & iOS.',

  // Libraries
  'zod (Validation)': 'Library skema validasi data JS untuk memastikan data input sesuai tipe sebelum dikirim.',
  'vueuse (Vue composables)': 'Koleksi utility function siap pakai untuk mengontrol sensor browser dan fungsi reaktif.',
  'i18next / vue-i18n (Multi-language)': 'Library standard untuk memetakan kamus bahasa dan menerjemahkan teks di website.',
  'Leaflet (Maps)': 'Library peta interaktif open-source yang sangat ringan dibanding Google Maps SDK.',
  'ApexCharts / Chart.js': 'Library visualisasi grafik data interaktif yang responsif dengan animasi transisi.',
  'Lucide Icons / Heroicons': 'Kumpulan ikon vektor (SVG) modern yang ringan dan mudah diubah ukuran/warnanya.'
};

const getTooltipText = (tag) => {
  return tooltipDictionary[tag] || 'Penjelasan fungsi belum ditambahkan.';
};

const tempFeature = ref('');
const tempPrinciple = ref('');
const tempExtraLib = ref('');

const addFeature = (val) => {
  if (val && !props.formDataWebGen.fiturUtama.includes(val)) {
    props.formDataWebGen.fiturUtama.push(val);
  }
  tempFeature.value = '';
};

const removeFeature = (val) => {
  const idx = props.formDataWebGen.fiturUtama.indexOf(val);
  if (idx > -1) {
    props.formDataWebGen.fiturUtama.splice(idx, 1);
  }
};

const addPrinciple = (val) => {
  if (val && !props.formDataWebGen.prinsipUI.includes(val)) {
    props.formDataWebGen.prinsipUI.push(val);
  }
  tempPrinciple.value = '';
};

const removePrinciple = (val) => {
  const idx = props.formDataWebGen.prinsipUI.indexOf(val);
  if (idx > -1) {
    props.formDataWebGen.prinsipUI.splice(idx, 1);
  }
};

const addExtraLib = (val) => {
  if (val && !props.formDataWebGen.libraryTambahan.includes(val)) {
    props.formDataWebGen.libraryTambahan.push(val);
  }
  tempExtraLib.value = '';
};

const removeExtraLib = (val) => {
  const idx = props.formDataWebGen.libraryTambahan.indexOf(val);
  if (idx > -1) {
    props.formDataWebGen.libraryTambahan.splice(idx, 1);
  }
};

const autoFillWebGen = async () => {
  if (!props.formDataWebGen.namaProject) return;
  emit('update-autofill-status', { autoFilling: true, error: '' });

  const model  = 'llama-3.3-70b-versatile';

  const systemPrompt = `[ROLE / PERSONA]
You are a creative web copywriter and systems architect.

[CONTEXT]
You are helping a developer generate a mock web application project configuration to auto-populate the brief and prompt.

[TASK]
Generate a realistic, specific project identity and technical specs.

[INSTRUCTION]
Return ONLY a valid JSON object matching the requested keys. Use modern, popular web technologies.

[PARAMETERS / CONSTRAINTS]
Output must be valid JSON with exact specified keys. Descriptions, titles, slogans must be in Indonesian.`;

  const userPrompt = `Generate a web project profile for a project named: "${props.formDataWebGen.namaProject}".
Return ONLY a valid JSON object with EXACTLY these keys:
{
  "namaProject": "${props.formDataWebGen.namaProject}",
  "subjudul": "short tagline (Indonesian, e.g. Jelajah Kuliner Nusantara)",
  "slogan": "catchy slogan (Indonesian, e.g. Makan Enak Tiap Hari)",
  "deskripsi": "2-3 sentence project description in Indonesian explaining target audience and core service value",
  "techStack": "one of: 'Vue 3 + Vite / Nuxt 3', 'Vue 3 + Vite', 'Nuxt 3', 'SvelteKit', 'React + Vite', 'Next.js'",
  "backendTech": "one of: 'Node.js + Fastify', 'Node.js + Express', 'Golang + Fiber/Gin', 'Python + FastAPI', 'Supabase Serverless'",
  "databaseTech": "one of: 'Supabase (PostgreSQL)', 'PostgreSQL', 'MySQL', 'MongoDB', 'SQLite'",
  "mediaStorage": "one of: 'Cloudinary', 'Supabase Storage', 'AWS S3', 'Google Cloud Storage', 'Local Disk'",
  "uiKit": "one of: 'shadcn/ui', 'Headless UI', 'Naive UI', 'daisyui', 'Tailwind CSS'",
  "stateManagement": "one of: 'Zustand + TanStack Query', 'Pinia', 'Redux Toolkit', 'VueUse', 'Context API'",
  "fiturUtama": ["array of 2-4 features from: 'Authentication (Login/Register)', 'Responsive Layout (Mobile & Desktop)', 'Dark Mode Priority', 'Multi-step Dynamic Input Form', 'Realtime Sync & Subscription', 'Payment Gateway Integration'"],
  "prinsipUI": ["array of 2-4 UI principles from: 'Minimalis Modern', 'Dark Mode Prioritas', 'Whitespace Lega (Clean)', 'Borderless & Minim Box'"],
  "libraryTambahan": ["array of 2-3 libraries from: 'zod (Validation)', 'vueuse (Vue composables)', 'i18next / vue-i18n (Multi-language)', 'Leaflet (Maps)'"],
  "instruksi": "1-2 sentence Indonesian additional developer instructions"
}`;

  try {
    const response = await fetchAI({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userPrompt },
      ],
      temperature: 0.9,
      max_tokens: 600,
      response_format: { type: 'json_object' },
    });

    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }

    const data = await response.json();
    const parsed = JSON.parse(data.choices[0].message.content || '{}');

    props.formDataWebGen.namaProject     = parsed.namaProject || props.formDataWebGen.namaProject;
    props.formDataWebGen.subjudul        = parsed.subjudul || 'Jelajahi Indonesia';
    props.formDataWebGen.slogan          = parsed.slogan || 'Jelajah Dengan Kami';
    props.formDataWebGen.deskripsi       = parsed.deskripsi || '';
    props.formDataWebGen.techStack       = parsed.techStack || 'Vue 3 + Vite / Nuxt 3';
    props.formDataWebGen.backendTech     = parsed.backendTech || 'Node.js + Fastify';
    props.formDataWebGen.databaseTech    = parsed.databaseTech || 'Supabase (PostgreSQL)';
    props.formDataWebGen.mediaStorage    = parsed.mediaStorage || 'Cloudinary';
    props.formDataWebGen.uiKit           = parsed.uiKit || 'shadcn/ui';
    props.formDataWebGen.stateManagement = parsed.stateManagement || 'Zustand + TanStack Query';
    props.formDataWebGen.fiturUtama      = parsed.fiturUtama || ['Authentication (Login/Register)'];
    props.formDataWebGen.prinsipUI       = parsed.prinsipUI || ['Minimalis Modern', 'Dark Mode Prioritas'];
    props.formDataWebGen.libraryTambahan = parsed.libraryTambahan || ['zod (Validation)'];
    props.formDataWebGen.instruksi       = parsed.instruksi || '';

    emit('update-autofill-status', { autoFilling: false, error: '' });
  } catch (err) {
    console.error(err);
    emit('update-autofill-status', { autoFilling: false, error: 'Gagal generate Website data.' });
  }
};

const autoFill = () => {
  const RANDOM_PROJECTS = ['Nusantara Trip Planner', 'Travelgo', 'KasirKite', 'PeduliSehat', 'EcoCycle', 'RumahKuliner'];
  props.formDataWebGen.namaProject = RANDOM_PROJECTS[Math.floor(Math.random() * RANDOM_PROJECTS.length)];
  autoFillWebGen();
};

defineExpose({
  autoFill
});
</script>

<style scoped>
.select-note-hint {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 5px;
  line-height: 1.4;
  font-style: italic;
  opacity: 0.85;
}

.selected-tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
  padding: 4px 0;
}

.selected-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(14, 165, 233, 0.12);
  border: 1px solid rgba(14, 165, 233, 0.25);
  color: #38bdf8;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
  user-select: none;
}

.selected-tag:hover {
  border-color: rgba(14, 165, 233, 0.5);
  background: rgba(14, 165, 233, 0.18);
}

.btn-remove-tag {
  background: none;
  border: none;
  color: #38bdf8;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  opacity: 0.7;
}

.btn-remove-tag:hover {
  color: #ff4d4d;
  opacity: 1;
}

/* Tag Tooltip styling */
.tag-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0; /* Align left edge of tooltip with left edge of tag to prevent sidebar clipping */
  background: #151f32;
  border: 1px solid rgba(14, 165, 233, 0.6);
  color: #f8fafc;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 11px;
  width: 220px;
  white-space: normal;
  text-align: left;
  z-index: 100;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  line-height: 1.4;
  font-weight: 400;
}

.tooltip-arrow {
  position: absolute;
  top: 100%;
  left: 20px; /* Position the arrow pointer left-aligned near the start of the tag */
  border-width: 6px;
  border-style: solid;
  border-color: rgba(14, 165, 233, 0.6) transparent transparent transparent;
}

.tooltip-arrow::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: #151f32 transparent transparent transparent;
}

/* Tooltip Vue transition animations */
.fade-tooltip-enter-active,
.fade-tooltip-leave-active {
  transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-tooltip-enter-from,
.fade-tooltip-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
