<template>
  <div class="form-body">
    <!-- SECTION 1 — UPLOAD REFERENSI GAMBAR -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">1</span>
        <h4 class="section-title">UNGGAH GAMBAR REFERENSI</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Scan Image <span class="label-note">(Harap Unggah Gambar)</span></label>
        <input type="file" id="scan-image-input" class="hidden-input" accept="image/*" @change="handleScanImageChange" />
        
        <div class="photo-upload-grid" style="margin-top: var(--space-xs);">
          <div v-if="formDataScan.imageUrl" class="photo-cell filled large-preview" style="width: 100%; height: 200px;">
            <img :src="formDataScan.imageUrl" :alt="formDataScan.imageName" class="photo-cell-img" style="object-fit: contain; width: 100%; height: 100%;" />
            <button type="button" @click="clearScanImage" class="btn-remove-cell">&times;</button>
          </div>
          <div v-else class="photo-cell add-cell large-upload" @click="triggerScanImageInput" style="width: 100%; height: 150px; flex-direction: column;">
            <div class="upload-icon-wrap" style="margin-bottom: 8px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
              </svg>
            </div>
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-main);">Pilih file gambar untuk di-scan</span>
            <span style="font-size: 0.72rem; color: var(--text-dim); margin-top: 4px;">Format JPEG, PNG (Maks 4MB)</span>
          </div>
        </div>
        <p class="field-hint" style="margin-top: var(--space-sm);">AI Vision model akan memindai warna, gaya visual, komposisi, dan tata letak dari gambar ini untuk membuat prompt replikasinya.</p>
      </div>
    </div>

    <!-- SECTION 2 — TARGET DESAIN & MODEL -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">2</span>
        <h4 class="section-title">KONFIGURASI TARGET</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Target Gaya Prompt Output</label>
        <CustomSelect v-model="formDataScan.targetOutput" :options="targetOutputOptions" />
      </div>
      
      <div class="field-grid-2">
        <div class="form-group">
          <label class="form-label">Model Generator</label>
          <CustomSelect v-model="formDataScan.mjVersion" :options="mjVersionOptions" />
        </div>
        <div class="form-group">
          <label class="form-label">Parameter Style</label>
          <CustomSelect v-model="formDataScan.mjStyle" :options="mjStyleOptions" />
        </div>
      </div>
    </div>

    <!-- SECTION 3 — INSTRUKSI KHUSUS -->
    <div class="form-section last-section">
      <div class="section-header">
        <span class="section-num">3</span>
        <h4 class="section-title">INSTRUKSI KUSTOM</h4>
      </div>
      <div class="form-group">
        <label class="form-label">Petunjuk Tambahan <span class="label-note">(Opsional)</span></label>
        <textarea v-model="formDataScan.instruksi" class="input-textarea large-textarea" rows="4"
          placeholder="E.g. Buat agar prompt bergaya lukisan cat minyak vintage 80-an, ubah warna dominan menjadi biru langit..."></textarea>
        <p class="field-hint">Tulis penyesuaian khusus yang Anda inginkan dari gambar referensi di atas.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomSelect from '../CustomSelect.vue';
import {
  targetOutputOptions,
  mjVersionOptions,
  mjStyleOptions
} from '../../constants/formOptions.js';

const props = defineProps({
  formDataScan: Object,
  loading: Boolean
});

const triggerScanImageInput = () => document.getElementById('scan-image-input').click();

const handleScanImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  props.formDataScan.imageName = file.name;
  if (props.formDataScan.imageUrl) URL.revokeObjectURL(props.formDataScan.imageUrl);
  props.formDataScan.imageUrl  = URL.createObjectURL(file);
  const reader = new FileReader();
  reader.onload = (evt) => {
    props.formDataScan.imageBase64 = evt.target.result;
  };
  reader.readAsDataURL(file);
};

const clearScanImage = () => {
  if (props.formDataScan.imageUrl) URL.revokeObjectURL(props.formDataScan.imageUrl);
  props.formDataScan.imageName = '';
  props.formDataScan.imageUrl  = '';
  props.formDataScan.imageBase64 = '';
  const el = document.getElementById('scan-image-input');
  if (el) el.value = '';
};
</script>
