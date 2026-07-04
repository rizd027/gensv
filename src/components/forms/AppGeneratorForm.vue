<template>
  <div class="form-body">
    <!-- SECTION 1 — DETAIL APLIKASI -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">1</span>
        <h4 class="section-title">DETAIL APLIKASI / MOBILE IDENTITY</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Nama Aplikasi / Mobile App</label>
        <div class="input-wrapper">
          <input type="text" v-model="formDataAppGen.namaApp" class="input-text" placeholder="E.g. GoRide Clone, Habit Tracker Mobile, OjekOnline..." />
          <button v-if="formDataAppGen.namaApp" @click="formDataAppGen.namaApp = ''; saranAI = '';" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
        </div>
      </div>
      <div class="form-group" style="margin-top: 8px; margin-bottom: var(--space-md);">
        <button type="button" @click="autoFillAppGen" class="btn-title-fill" :disabled="autoFilling || loading || !formDataAppGen.namaApp">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
            stroke-linejoin="round" style="margin-right: 5px;">
            <path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/>
            <path d="M17.8 11.8 19 13"/><path d="M15 9h0"/><path d="M17.8 6.2 19 5"/>
            <path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/>
          </svg>
          {{ autoFilling ? 'Generating...' : 'FILL FROM Nama Aplikasi' }}
        </button>
      </div>

      <!-- AI Recommendation / Kotak Saran Box -->
      <Transition name="fade-slide">
        <div v-if="saranAI" class="ai-advice-box">
          <div class="advice-header">
            <svg class="advice-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
              <path d="M9 18h6"/><path d="M10 22h4"/>
            </svg>
            <span class="advice-title">Rekomendasi Arsitektur & Strategi AI</span>
          </div>
          <p class="advice-content">{{ saranAI }}</p>
        </div>
      </Transition>

      <div class="form-group">
        <label class="form-label">Subjudul / Tagline Mobile</label>
        <div class="input-wrapper">
          <input type="text" v-model="formDataAppGen.subjudul" class="input-text" placeholder="E.g. Pesan Ojek Cepat & Terpercaya" />
          <button v-if="formDataAppGen.subjudul" @click="formDataAppGen.subjudul = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Slogan Aplikasi</label>
        <div class="input-wrapper">
          <input type="text" v-model="formDataAppGen.slogan" class="input-text" placeholder="E.g. Selangkah Lebih Cepat" />
          <button v-if="formDataAppGen.slogan" @click="formDataAppGen.slogan = ''" class="btn-clear-input" type="button" aria-label="Clear input">&times;</button>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Deskripsi & Tujuan Aplikasi</label>
        <textarea v-model="formDataAppGen.deskripsi" class="input-textarea" rows="3"
          placeholder="E.g. Aplikasi ojek online khusus perkotaan yang menghubungkan pengemudi lokal dengan penumpang lewat peta realtime..."></textarea>
      </div>
    </div>

    <!-- SECTION 2 — MOBILE TECH STACK -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">2</span>
        <h4 class="section-title">MOBILE TECH STACK & CONFIGURATION</h4>
      </div>
      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Mobile Framework</label>
          <CustomSelect v-model="formDataAppGen.techStack" :options="appFrameworkOptions" />
          <p v-if="techStackNote" class="select-note-hint">{{ techStackNote }}</p>
        </div>
        <div class="form-group">
          <label class="form-label">Backend / Integration</label>
          <CustomSelect v-model="formDataAppGen.backendTech" :options="appBackendOptions" />
          <p v-if="backendTechNote" class="select-note-hint">{{ backendTechNote }}</p>
        </div>
      </div>
      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Local Database</label>
          <CustomSelect v-model="formDataAppGen.databaseTech" :options="appDatabaseOptions" />
          <p v-if="databaseTechNote" class="select-note-hint">{{ databaseTechNote }}</p>
        </div>
        <div class="form-group">
          <label class="form-label">Media & Cloud Storage</label>
          <CustomSelect v-model="formDataAppGen.mediaStorage" :options="appStorageOptions" />
          <p v-if="mediaStorageNote" class="select-note-hint">{{ mediaStorageNote }}</p>
        </div>
      </div>
      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Native UI Kit Style</label>
          <CustomSelect v-model="formDataAppGen.uiKit" :options="appUiKitOptions" />
          <p v-if="uiKitNote" class="select-note-hint">{{ uiKitNote }}</p>
        </div>
        <div class="form-group">
          <label class="form-label">State Management</label>
          <CustomSelect v-model="formDataAppGen.stateManagement" :options="appStateOptions" />
          <p v-if="stateManagementNote" class="select-note-hint">{{ stateManagementNote }}</p>
        </div>
      </div>
    </div>

    <!-- SECTION 3 — SENSOR & FITUR NATIVE -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">3</span>
        <h4 class="section-title">NATIVE FEATURES & MOBILE DESIGN</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Fitur & Sensor Native <span class="label-note">(Pilih dari daftar - Klik tag untuk penjelasan)</span></label>
        <CustomSelect v-model="tempFeature" :options="appFeatureOptions" placeholder="Pilih Fitur Mobile..." @change="addFeature" />
        
        <!-- Selected tags container -->
        <div v-if="formDataAppGen.fiturUtama.length > 0" class="selected-tags-container">
          <div 
            v-for="tag in formDataAppGen.fiturUtama" 
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
        <label class="form-label">Prinsip UI/UX Mobile <span class="label-note">(Pilih dari daftar - Klik tag untuk penjelasan)</span></label>
        <CustomSelect v-model="tempPrinciple" :options="appUiPrinciples" placeholder="Pilih Prinsip Mobile..." @change="addPrinciple" />
        
        <!-- Selected tags container -->
        <div v-if="formDataAppGen.prinsipUI.length > 0" class="selected-tags-container">
          <div 
            v-for="tag in formDataAppGen.prinsipUI" 
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
        <label class="form-label">Library Tambahan Mobile <span class="label-note">(Pilih dari daftar - Klik tag untuk penjelasan)</span></label>
        <CustomSelect v-model="tempExtraLib" :options="appExtraLibOptions" placeholder="Pilih Library Mobile..." @change="addExtraLib" />
        
        <!-- Selected tags container -->
        <div v-if="formDataAppGen.libraryTambahan.length > 0" class="selected-tags-container">
          <div 
            v-for="tag in formDataAppGen.libraryTambahan" 
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

    <!-- SECTION 4 — TARGET BUILD & KEBUTUHAN KHUSUS -->
    <div class="form-section last-section">
      <div class="section-header">
        <span class="section-num">4</span>
        <h4 class="section-title">TARGET PLATFORM & INSTRUKSI</h4>
      </div>
      <div class="field-grid-2" style="margin-bottom: var(--space-md);">
        <div class="form-group">
          <label class="form-label">Target Build Platform</label>
          <CustomSelect v-model="formDataAppGen.targetPlatform" :options="targetPlatformOptions" />
        </div>
        <div class="form-group">
          <label class="form-label">Tipe Output File</label>
          <div class="input-wrapper">
            <input type="text" :value="getTargetOutputLabel()" class="input-text" disabled style="opacity: 0.65; background: rgba(255,255,255,0.01);" />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Detail Integrasi Mobile <span class="label-note">(Opsional)</span></label>
        <textarea v-model="formDataAppGen.instruksi" class="input-textarea large-textarea" rows="4"
          placeholder="E.g. Sediakan file konfigurasi Firebase google-services.json di folder android/app, setup info.plist untuk akses kamera di iOS..."></textarea>
        <p class="field-hint">Tulis instruksi khusus yang perlu dimasukkan ke dalam prompt rancangan mobile app.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import CustomSelect from '../CustomSelect.vue';
import { getApiConfig } from '../../utils/api.js';
import {
  appFrameworkOptions,
  appBackendOptions,
  appDatabaseOptions,
  appStorageOptions,
  appUiKitOptions,
  appStateOptions,
  appFeatureOptions,
  appUiPrinciples,
  appExtraLibOptions,
  targetPlatformOptions
} from '../../constants/formOptions.js';

const props = defineProps({
  formDataAppGen: Object,
  loading: Boolean,
  autoFilling: Boolean
});

const emit = defineEmits(['update-autofill-status']);

const getTargetOutputLabel = () => {
  if (props.formDataAppGen.targetPlatform === 'Android') return 'APK / AAB (Google Play Store)';
  if (props.formDataAppGen.targetPlatform === 'iOS') return 'IPA / TestFlight (Apple App Store)';
  return 'APK/AAB & IPA Bundle (Universal Build)';
};

const techStackNote = computed(() => {
  switch (props.formDataAppGen.techStack) {
    case 'Flutter': return 'Flutter (Dart): Performa tinggi murni compiled, satu codebase untuk Android & iOS, animasi 60fps lancar.';
    case 'React Native / Expo': return 'React Native: Cepat dikembangkan menggunakan JS/TS, Expo memangkas setup gradle/xcode native.';
    case 'Swift (iOS)': return 'Swift: Performa native Apple terbaik, integrasi penuh dengan sensor iOS terbaru, widget eksklusif.';
    case 'Kotlin (Android)': return 'Kotlin: Standar resmi Google, akses API tingkat rendah (low-level OS) maksimal dan ukuran paket optimal.';
    case 'Ionic / Capacitor': return 'Ionic: Web-based hybrid app, sangat cepat dibuat jika sudah memiliki frontend web html/css/js.';
    case 'Svelte Native': return 'Svelte Native: Alternatif eksperimental menggunakan Svelte compiler untuk menghasilkan native view.';
    default: return '';
  }
});

const backendTechNote = computed(() => {
  switch (props.formDataAppGen.backendTech) {
    case 'Supabase Serverless': return 'Supabase: Autentikasi mobile instan, database tersinkronisasi realtime lewat WebSockets.';
    case 'Firebase BaaS': return 'Firebase: Pilihan standar industri mobile. Mendukung FCM push notifications, analytics, dan Auth instan.';
    case 'Node.js + Fastify': return 'Fastify: Backend mandiri super cepat, cocok jika aplikasi memiliki proses data yang intens.';
    case 'Golang + Fiber/Gin': return 'Golang: Performa konkurensi luar biasa, ideal untuk app ride-sharing/ojek online berskala masif.';
    case 'None': return 'Standalone App: Aplikasi berjalan sepenuhnya luring (offline) tanpa integrasi server luar.';
    default: return '';
  }
});

const databaseTechNote = computed(() => {
  switch (props.formDataAppGen.databaseTech) {
    case 'SQLite': return 'SQLite: Database relasional luring terbaik untuk menyimpan data profil, history, dan transaksi di memori HP.';
    case 'Hive': return 'Hive: Database NoSQL key-value ultra cepat khusus Flutter, sangat ringan untuk menyimpan settings/cache.';
    case 'Realm': return 'Realm: Alternatif SQLite NoSQL modern untuk mobile dengan sinkronisasi cloud bawaan otomatis.';
    case 'Supabase (PostgreSQL)': return 'Supabase DB: Akses cloud database PostgreSQL langsung dari SDK mobile Anda.';
    case 'Firebase Firestore': return 'Firestore: Cloud NoSQL real-time document store dari Google, sangat mudah disinkronkan di Android/iOS.';
    default: return '';
  }
});

const mediaStorageNote = computed(() => {
  switch (props.formDataAppGen.mediaStorage) {
    case 'Supabase Storage': return 'Supabase Storage: Penyimpanan file cloud aman untuk avatar, foto struk, dll.';
    case 'Firebase Storage': return 'Firebase Storage: Storage cloud aman Google dengan kemampuan resume upload jika koneksi HP terputus.';
    case 'Cloudinary': return 'Cloudinary: Unggah media dengan kompresi otomatis untuk efisiensi kuota internet pengguna HP.';
    case 'Local Storage': return 'Local: File disimpan langsung di direktori internal HP (App Documents Directory).';
    default: return '';
  }
});

const uiKitNote = computed(() => {
  switch (props.formDataAppGen.uiKit) {
    case 'Material Design 3': return 'MD3: Mengikuti bahasa desain Android 12+, warna dinamis menyesuaikan wallpaper, ramah pengguna.';
    case 'Cupertino Widgets': return 'Cupertino: UI mirip iOS bawaan Apple, memberikan kesan premium dan familiar bagi pengguna iPhone.';
    case 'Tailwind RN': return 'Tailwind RN: Menulis styling utilitas Tailwind yang dikompilasi menjadi stylesheet native React Native.';
    case 'React Native Paper': return 'RN Paper: Koleksi komponen Material Design siap pakai dengan animasi ripple yang mulus.';
    case 'Custom Native UI': return 'Custom: Mendesain UI dari nol tanpa library komponen, memberikan kontrol visual penuh.';
    default: return '';
  }
});

const stateManagementNote = computed(() => {
  switch (props.formDataAppGen.stateManagement) {
    case 'Bloc': return 'BLoC: Pola arsitektur Flutter yang memisahkan State, Event, dan UI secara ketat untuk skala besar.';
    case 'Riverpod': return 'Riverpod: State management Flutter paling modern, aman dari runtime compile error, alternatif Bloc.';
    case 'Zustand': return 'Zustand: Manajemen state React Native yang sangat ringkas, cepat, dan tanpa boilerplate code.';
    case 'Redux Toolkit': return 'Redux: Pilihan tangguh untuk aplikasi React Native skala besar dengan pencatatan state yang lengkap.';
    case 'None': return 'SetState: Manajemen state bawaan framework, hanya disarankan untuk aplikasi sederhana.';
    default: return '';
  }
});

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
  'Biometric Authentication (FaceID/Fingerprint)': 'Mengaktifkan sensor sidik jari (fingerprint) atau pemindai wajah (FaceID/Face Unlock) untuk login aman.',
  'Push Notifications (FCM/APNS)': 'Mengirim pesan notifikasi push ke HP pengguna bahkan ketika aplikasi sedang ditutup.',
  'In-App Purchase (IAP) & Subscription': 'Integrasi sistem pembayaran Google Play Billing & Apple App Store Kit untuk transaksi/berlangganan.',
  'Offline Sync & Local Cache': 'Aplikasi tetap berfungsi saat luring, data disimpan di HP lalu disinkronkan otomatis saat mendapat internet.',
  'Camera & Gallery Access': 'Meminta izin akses hardware kamera untuk mengambil foto profil atau mengunggah dokumen/gambar.',
  'Location Services & GPS Map': 'Mengakses sensor GPS HP untuk melacak lokasi pengguna realtime dan menampilkannya di peta.',
  'Bluetooth / NFC Scan': 'Menggunakan pemindai hardware Bluetooth Low Energy (BLE) atau NFC untuk bertukar data secara fisik.',
  'OAuth Social Login (Google/Apple)': 'Mempermudah pendaftaran pengguna dengan autentikasi satu-klik akun Google dan Apple.',
  'Deep Linking & Share Extension': 'Membuka aplikasi langsung lewat URL tautan browser atau membagi konten dari aplikasi lain.',

  // Principles
  'Native Gesture Navigation': 'Dukungan navigasi geser (swipe-to-back, pull-to-refresh) yang terasa natural sesuai OS bawaan HP.',
  'Micro-interactions & Haptic Feedbacks': 'Memberikan getaran balik fisik (haptic vibration) kecil pada tombol/aksi untuk meningkatkan User Experience.',
  'Adaptive Dark Mode': 'Tampilan otomatis berganti tema gelap/terang mengikuti konfigurasi sistem operasi Android/iOS pengguna.',
  'Flat Minimalist UI': 'Menghindari dekorasi berlebih, memprioritaskan ruang baca yang bersih dan kontras warna yang nyaman.',
  'Custom Splash Screen': 'Halaman awal loading dengan logo animasi ber-branding sebelum aplikasi sepenuhnya masuk.',
  'One-Hand Usability (Thumb Zone)': 'Menaruh semua tombol navigasi utama di bagian bawah layar agar mudah dijangkau satu jempol tangan.',
  'Skeleton Loaders': 'Menampilkan layout placeholder abu-abu beranimasi saat memuat data, mengurangi persepsi waktu tunggu.',

  // Libraries
  'Sentry (Crash Reporting)': 'Melaporkan error atau crash aplikasi secara otomatis dari HP pengguna ke server developer untuk debugging.',
  'Lottie (Animations)': 'Merender animasi vektor interaktif berbasis JSON yang diekspor dari After Effects tanpa membebani memori HP.',
  'Local Authentication (Security)': 'Library native untuk membungkus keamanan biometrik OS Android/iOS secara aman.',
  'Firebase Analytics': 'Melacak statistik interaksi pengguna di dalam aplikasi untuk kebutuhan analisa produk marketing.',
  'SQLite / Drift (Local database)': 'ORM modern untuk mempermudah manipulasi database SQLite secara type-safe di Flutter/Dart.',
  'Mapbox SDK (Custom maps)': 'Library peta kustom interaktif dengan visualisasi 3D dan rendering jalan yang dinamis.'
};

const getTooltipText = (tag) => {
  return tooltipDictionary[tag] || 'Penjelasan fungsi mobile belum ditambahkan.';
};

const tempFeature = ref('');
const tempPrinciple = ref('');
const tempExtraLib = ref('');

const addFeature = (val) => {
  if (val && !props.formDataAppGen.fiturUtama.includes(val)) {
    props.formDataAppGen.fiturUtama.push(val);
  }
  tempFeature.value = '';
};

const removeFeature = (val) => {
  const idx = props.formDataAppGen.fiturUtama.indexOf(val);
  if (idx > -1) {
    props.formDataAppGen.fiturUtama.splice(idx, 1);
  }
};

const addPrinciple = (val) => {
  if (val && !props.formDataAppGen.prinsipUI.includes(val)) {
    props.formDataAppGen.prinsipUI.push(val);
  }
  tempPrinciple.value = '';
};

const removePrinciple = (val) => {
  const idx = props.formDataAppGen.prinsipUI.indexOf(val);
  if (idx > -1) {
    props.formDataAppGen.prinsipUI.splice(idx, 1);
  }
};

const addExtraLib = (val) => {
  if (val && !props.formDataAppGen.libraryTambahan.includes(val)) {
    props.formDataAppGen.libraryTambahan.push(val);
  }
  tempExtraLib.value = '';
};

const removeExtraLib = (val) => {
  const idx = props.formDataAppGen.libraryTambahan.indexOf(val);
  if (idx > -1) {
    props.formDataAppGen.libraryTambahan.splice(idx, 1);
  }
};

const fetchAI = async (body, options = {}) => {
  const { url, headers } = getApiConfig(body.model);
  return fetch(url, {
    method: 'POST',
    headers: { ...headers, ...options.headers },
    signal: options.signal,
    body: JSON.stringify(body)
  });
};

const saranAI = ref('');

const autoFillAppGen = async () => {
  if (!props.formDataAppGen.namaApp) return;
  emit('update-autofill-status', { autoFilling: true, error: '' });

  const model  = 'llama-3.3-70b-versatile';

  const systemPrompt = `[ROLE / PERSONA]
You are an expert systems architect and lead mobile app developer.

[CONTEXT]
You are helping a developer configure a mock mobile app project profile based on the application name.

[RULES FOR TECH STACK CONFIGURATION]
1. CONFIGURATION PROPORTIONALITY: Choose a mobile stack that is sensible and proportional to the app scale and functionality.
   - OFFLINE/LOCAL APPS (e.g., Habit Tracker, Notes, Calculator, Simple Budget): Prefer "Flutter" or "React Native". Backend should be "None" or "Firebase BaaS". Database should be "SQLite" or "Hive". UI kit: "Material Design 3" or "Cupertino Widgets".
   - COMPLEX WEB APPS/SERVICES (e.g., GoRide/Ride-sharing, E-Commerce, Social Media, Chat App): Choose full cross-platform frameworks ("Flutter" or "React Native / Expo"), backend ("Golang + Fiber/Gin" or "Node.js + Fastify" or "Firebase BaaS"), and cloud databases ("Supabase (PostgreSQL)" or "Firebase Firestore").
2. TECH COMPATIBILITY: The selected options must be compatible. If you use Svelte Native, do not use Bloc (which is Flutter). If you use Flutter, prefer Bloc or Riverpod. If you use React Native, prefer Zustand or Redux.

[INSTRUCTION]
Return ONLY a valid JSON object matching the requested keys. Use modern, popular mobile technologies. Output in Indonesian.`;

  const userPrompt = `Generate a mobile app project profile for a mobile project named: "${props.formDataAppGen.namaApp}".
Return ONLY a valid JSON object with EXACTLY these keys:
{
  "namaApp": "${props.formDataAppGen.namaApp}",
  "subjudul": "short mobile tagline (Indonesian, e.g. Selangkah Lebih Sehat)",
  "slogan": "catchy mobile slogan (Indonesian, e.g. Pantau Kebiasaanmu Setiap Hari)",
  "deskripsi": "2-3 sentence app description in Indonesian explaining target audience and core features",
  "techStack": "one of: 'Flutter', 'React Native / Expo', 'Swift (iOS)', 'Kotlin (Android)', 'Ionic / Capacitor'",
  "backendTech": "one of: 'Supabase Serverless', 'Firebase BaaS', 'Node.js + Fastify', 'Golang + Fiber/Gin', 'None'",
  "databaseTech": "one of: 'SQLite', 'Hive', 'Realm', 'Supabase (PostgreSQL)', 'Firebase Firestore', 'None'",
  "mediaStorage": "one of: 'Supabase Storage', 'Firebase Storage', 'AWS S3', 'Cloudinary', 'Local Storage'",
  "uiKit": "one of: 'Material Design 3', 'Cupertino Widgets', 'Tailwind RN', 'React Native Paper', 'Custom Native UI'",
  "stateManagement": "one of: 'Bloc', 'Riverpod', 'Zustand', 'Redux Toolkit', 'None'",
  "fiturUtama": ["array of 2-4 features from: 'Biometric Authentication (FaceID/Fingerprint)', 'Push Notifications (FCM/APNS)', 'In-App Purchase (IAP) & Subscription', 'Offline Sync & Local Cache', 'Camera & Gallery Access', 'Location Services & GPS Map'"],
  "prinsipUI": ["array of 2-4 UI principles from: 'Native Gesture Navigation', 'Micro-interactions & Haptic Feedbacks', 'Adaptive Dark Mode', 'One-Hand Usability (Thumb Zone)', 'Skeleton Loaders'"],
  "libraryTambahan": ["array of 2-3 libraries from: 'Sentry (Crash Reporting)', 'Lottie (Animations)', 'Local Authentication (Security)', 'Firebase Analytics'"],
  "targetPlatform": "one of: 'Universal', 'Android', 'iOS'",
  "instruksi": "1-2 sentence Indonesian additional developer instructions",
  "saranAI": "Detailed architectural advice (in Indonesian, 3-4 sentences) tailored specifically to the app type of \\"${props.formDataAppGen.namaApp}\\". YOU MUST: 1. Identify the app category (e.g. utility, ride-sharing, e-commerce, local tool). 2. Give tailored advice: if it is an offline/local app, advise to keep everything local and deploy SQLite. If it is high-load, suggest Golang/Fastify backend and FCM push notifications. 3. Explicitly reference the app name \\"${props.formDataAppGen.namaApp}\\" in the advice. Do NOT write generic or repetitive text."
}`;

  try {
    const response = await fetchAI({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userPrompt },
      ],
      temperature: 0.9,
      max_tokens: 750,
      response_format: { type: 'json_object' },
    });

    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }

    const data = await response.json();
    const parsed = JSON.parse(data.choices[0].message.content || '{}');

    props.formDataAppGen.namaApp          = parsed.namaApp || props.formDataAppGen.namaApp;
    props.formDataAppGen.subjudul         = parsed.subjudul || 'Selangkah Lebih Cepat';
    props.formDataAppGen.slogan           = parsed.slogan || 'Solusi Cerdas Anda';
    props.formDataAppGen.deskripsi        = parsed.deskripsi || '';
    props.formDataAppGen.techStack        = parsed.techStack || 'Flutter';
    props.formDataAppGen.backendTech      = parsed.backendTech || 'Supabase Serverless';
    props.formDataAppGen.databaseTech     = parsed.databaseTech || 'SQLite';
    props.formDataAppGen.mediaStorage     = parsed.mediaStorage || 'Local Storage';
    props.formDataAppGen.uiKit            = parsed.uiKit || 'Material Design 3';
    props.formDataAppGen.stateManagement  = parsed.stateManagement || 'Bloc';
    props.formDataAppGen.fiturUtama       = parsed.fiturUtama || ['Push Notifications (FCM/APNS)'];
    props.formDataAppGen.prinsipUI        = parsed.prinsipUI || ['Native Gesture Navigation', 'Adaptive Dark Mode'];
    props.formDataAppGen.libraryTambahan  = parsed.libraryTambahan || ['Lottie (Animations)'];
    props.formDataAppGen.targetPlatform   = parsed.targetPlatform || 'Universal';
    props.formDataAppGen.instruksi        = parsed.instruksi || '';
    saranAI.value                         = parsed.saranAI || 'Rekomendasi Arsitektur: Aplikasi siap dibangun menggunakan arsitektur modern.';

    emit('update-autofill-status', { autoFilling: false, error: '' });
  } catch (err) {
    console.error(err);
    // Dynamic local fallback values based on app name keywords
    const pName = String(props.formDataAppGen.namaApp).toLowerCase();
    
    if (pName.includes('tracker') || pName.includes('habit') || pName.includes('offline') || pName.includes('note') || pName.includes('budget')) {
      props.formDataAppGen.subjudul         = 'Habit & Daily Task Tracker';
      props.formDataAppGen.slogan           = 'Konsisten Setiap Hari, Capai Tujuanmu';
      props.formDataAppGen.deskripsi        = 'Aplikasi mobile penunjang produktivitas luring untuk memantau rutinitas harian, melacak progres mingguan, dan memberikan pengingat terjadwal.';
      props.formDataAppGen.techStack        = 'Flutter';
      props.formDataAppGen.backendTech      = 'None';
      props.formDataAppGen.databaseTech     = 'SQLite';
      props.formDataAppGen.mediaStorage     = 'Local Storage';
      props.formDataAppGen.uiKit            = 'Material Design 3';
      props.formDataAppGen.stateManagement  = 'Riverpod';
      props.formDataAppGen.fiturUtama       = ['Offline Sync & Local Cache', 'Biometric Authentication (FaceID/Fingerprint)'];
      props.formDataAppGen.prinsipUI        = ['Adaptive Dark Mode', 'One-Hand Usability (Thumb Zone)', 'Native Gesture Navigation'];
      props.formDataAppGen.libraryTambahan  = ['Lottie (Animations)', 'SQLite / Drift (Local database)'];
      props.formDataAppGen.targetPlatform   = 'Universal';
      props.formDataAppGen.instruksi        = 'Deploy database SQLite secara enkripsi menggunakan SQLCipher untuk menjamin keamanan data pengguna secara luring.';
      saranAI.value                         = '💡 Saran Strategi AI (Mode Lokal): Untuk aplikasi tipe utilitas produktivitas luring, sangat disarankan menggunakan database internal seperti SQLite bersama Flutter. Anda tidak perlu menyewa server cloud/backend. Integrasikan Lottie untuk animasi penyelesaian tugas agar antarmuka terasa hidup.';
    } else {
      props.formDataAppGen.subjudul         = 'Mobile Services On-Demand';
      props.formDataAppGen.slogan           = 'Layanan Instan di Ujung Jari Anda';
      props.formDataAppGen.deskripsi        = `Aplikasi mobile interaktif untuk mempermudah akses dan transaksi layanan ${props.formDataAppGen.namaApp} secara realtime dan aman.`;
      props.formDataAppGen.techStack        = 'React Native / Expo';
      props.formDataAppGen.backendTech      = 'Firebase BaaS';
      props.formDataAppGen.databaseTech     = 'Firebase Firestore';
      props.formDataAppGen.mediaStorage     = 'Firebase Storage';
      props.formDataAppGen.uiKit            = 'Tailwind RN';
      props.formDataAppGen.stateManagement  = 'Zustand';
      props.formDataAppGen.fiturUtama       = ['Push Notifications (FCM/APNS)', 'Location Services & GPS Map', 'OAuth Social Login (Google/Apple)'];
      props.formDataAppGen.prinsipUI        = ['Native Gesture Navigation', 'Skeleton Loaders', 'Micro-interactions & Haptic Feedbacks'];
      props.formDataAppGen.libraryTambahan  = ['Sentry (Crash Reporting)', 'Firebase Analytics'];
      props.formDataAppGen.targetPlatform   = 'Universal';
      props.formDataAppGen.instruksi        = 'Konfigurasikan firebase-messaging dan request permissions sebelum merender halaman peta utama.';
      saranAI.value                         = `💡 Saran Strategi AI (Mode Lokal): Proyek "${props.formDataAppGen.namaApp}" beroperasi secara dinamis. Pilihan React Native + Firebase sangat ideal untuk sinkronisasi GPS map dan notifikasi instan. Gunakan Sentry untuk crash reporting agar performa di lapangan terpantau.`;
    }

    emit('update-autofill-status', { autoFilling: false, error: '' });
  }
};

const autoFill = () => {
  const RANDOM_APPS = ['GoRide Clone', 'Habit Tracker Mobile', 'EcoTrash Mobile', 'Kasirku Mobile', 'SobatSehat Mobile'];
  props.formDataAppGen.namaApp = RANDOM_APPS[Math.floor(Math.random() * RANDOM_APPS.length)];
  autoFillAppGen();
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
  left: 0;
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
  left: 20px;
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

/* AI Advice / Recommendation Card Box */
.ai-advice-box {
  margin-top: 4px;
  margin-bottom: var(--space-md);
  padding: 14px 16px;
  background: rgba(0, 240, 255, 0.03);
  border: 1px solid rgba(0, 240, 255, 0.15);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 0 10px rgba(0, 240, 255, 0.03);
}

:root[data-theme="light"] .ai-advice-box {
  background: rgba(37, 99, 235, 0.02);
  border-color: rgba(37, 99, 235, 0.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), 0 0 10px rgba(37, 99, 235, 0.03);
}

.advice-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  color: var(--accent-color);
}

.advice-icon {
  flex-shrink: 0;
}

.advice-title {
  font-family: var(--display-font);
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: var(--ls-wide);
}

.advice-content {
  font-size: 12px;
  line-height: 1.5;
  color: var(--text-muted);
  margin: 0;
}

/* Advice slide animation */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
