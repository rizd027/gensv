<template>
  <div class="settings-container">
    <div class="settings-header">
      <h3 class="settings-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        AI Providers API Configurations
      </h3>
      <button @click="$emit('close')" class="btn-close" aria-label="Close settings">
        &times;
      </button>
    </div>
    
    <div class="settings-body">
      <!-- Groq API Key -->
      <div class="form-group">
        <div class="label-wrapper">
          <label class="form-label" for="groq-key">Groq API Key</label>
          <span :class="['badge-key', groqKey ? 'badge-custom' : 'badge-builtin']">
            {{ groqKey ? 'API Baru (Kustom)' : 'API Bawaan (Default)' }}
          </span>
        </div>
        <div class="password-input-wrapper">
          <input 
            :type="showGroqKey ? 'text' : 'password'" 
            id="groq-key" 
            v-model="groqKey" 
            class="input-text" 
            :placeholder="groqKey ? 'Enter gsk_...' : '•••••••••••••••• (Pre-configured Key Active)'"
          />
          <button @click="showGroqKey = !showGroqKey" type="button" class="btn-toggle-visibility">
            {{ showGroqKey ? 'Hide' : 'Show' }}
          </button>
        </div>
        
        <!-- Live Status / Limits info for Groq -->
        <div class="api-limit-section">
          <button type="button" @click="checkGroqLimit" class="btn-check-limit" :disabled="checkingGroq">
            <svg v-if="checkingGroq" class="spinner" viewBox="0 0 24 24"><circle class="path" cx="12" cy="12" r="10" fill="none" stroke-width="3"></circle></svg>
            {{ checkingGroq ? 'Memeriksa...' : '🔍 Cek Status & Limit' }}
          </button>
          
          <div v-if="groqStatus" class="api-status-card" :class="{ error: groqStatus.isError }">
            <div class="status-row">
              <span class="status-label">Status Koneksi:</span>
              <span class="status-value" :class="groqStatus.isError ? 'text-error' : 'text-success'">
                {{ groqStatus.msg }}
              </span>
            </div>
            
            <template v-if="!groqStatus.isError">
              <div class="status-row">
                <span class="status-label">Waktu Respon (Latency):</span>
                <span class="status-value text-accent">{{ groqStatus.latency }} ms</span>
              </div>
              <div class="status-row">
                <span class="status-label">Model Diuji:</span>
                <span class="status-value text-dim">{{ groqStatus.modelTested }}</span>
              </div>
              
              <template v-if="groqStatus.limitTokens">
                <div class="status-divider">RATE LIMITS (TOKENS)</div>
                <div class="status-row">
                  <span class="status-label">Batas Token / Menit:</span>
                  <span class="status-value">{{ formatNumber(groqStatus.limitTokens) }} TPM</span>
                </div>
                <div class="status-row highlight">
                  <span class="status-label">Sisa Kapasitas Token:</span>
                  <span class="status-value">{{ formatNumber(groqStatus.remainingTokens) }}</span>
                </div>
                <div class="status-row">
                  <span class="status-label">Reset Token Dalam:</span>
                  <span class="status-value text-accent">{{ groqStatus.resetTokens || '-' }}</span>
                </div>

                <div class="status-divider">RATE LIMITS (REQUESTS)</div>
                <div class="status-row">
                  <span class="status-label">Batas Request / Menit:</span>
                  <span class="status-value">
                    {{ formatNumber(groqStatus.limitRequests) }}
                    <span v-if="!isNaN(Number(groqStatus.limitRequests)) && groqStatus.limitRequests">RPM</span>
                  </span>
                </div>
                <div class="status-row highlight">
                  <span class="status-label">Sisa Kuota Request:</span>
                  <span class="status-value">{{ formatNumber(groqStatus.remainingRequests) }}</span>
                </div>
                <div class="status-row">
                  <span class="status-label">Reset Request Dalam:</span>
                  <span class="status-value text-accent">{{ groqStatus.resetRequests || '-' }}</span>
                </div>
              </template>
              
              <div v-if="groqStatus.isCorsRestricted" class="cors-notice">
                ℹ️ Live rate-limits diblokir CORS browser. Namun koneksi API aktif!
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- OpenRouter API Key -->
      <div class="form-group" style="margin-top: 18px;">
        <div class="label-wrapper">
          <label class="form-label" for="openrouter-key">OpenRouter API Key</label>
          <span :class="['badge-key', openrouterKey ? 'badge-custom' : 'badge-builtin']">
            {{ openrouterKey ? 'API Baru (Kustom)' : 'API Bawaan (Default)' }}
          </span>
        </div>
        <div class="password-input-wrapper">
          <input 
            :type="showOpenRouterKey ? 'text' : 'password'" 
            id="openrouter-key" 
            v-model="openrouterKey" 
            class="input-text" 
            :placeholder="openrouterKey ? 'Enter sk-or-...' : '•••••••••••••••• (Pre-configured Key Active)'"
          />
          <button @click="showOpenRouterKey = !showOpenRouterKey" type="button" class="btn-toggle-visibility">
            {{ showOpenRouterKey ? 'Hide' : 'Show' }}
          </button>
        </div>
        <p class="settings-help">Leave empty to use the secure pre-configured system keys.</p>

        <!-- Live Status / Limits info for OpenRouter -->
        <div class="api-limit-section">
          <button type="button" @click="checkOpenRouterLimit" class="btn-check-limit" :disabled="checkingOR">
            <svg v-if="checkingOR" class="spinner" viewBox="0 0 24 24"><circle class="path" cx="12" cy="12" r="10" fill="none" stroke-width="3"></circle></svg>
            {{ checkingOR ? 'Memeriksa...' : '🔍 Cek Status & Limit' }}
          </button>
          
          <div v-if="orStatus" class="api-status-card" :class="{ error: orStatus.isError }">
            <div class="status-row">
              <span class="status-label">Status Koneksi:</span>
              <span class="status-value" :class="orStatus.isError ? 'text-error' : 'text-success'">
                {{ orStatus.msg }}
              </span>
            </div>
            
            <template v-if="!orStatus.isError && orStatus.hasData">
              <div class="status-row">
                <span class="status-label">Waktu Respon (Latency):</span>
                <span class="status-value text-accent">{{ orStatus.latency }} ms</span>
              </div>
              <div class="status-row">
                <span class="status-label">Label Kunci API:</span>
                <span class="status-value text-accent">{{ orStatus.label || '-' }}</span>
              </div>

              <div class="status-divider">KREDIT & PENGGUNAAN</div>
              <div class="status-row highlight">
                <span class="status-label">Sisa Saldo Kredit:</span>
                <span class="status-value text-success">
                  {{ orStatus.limitRemaining !== null ? `$${orStatus.limitRemaining.toFixed(6)} USD` : 'Unlimited / Tanpa Batas' }}
                </span>
              </div>
              <div class="status-row">
                <span class="status-label">Total Terpakai (Usage):</span>
                <span class="status-value text-dim">${{ orStatus.usage.toFixed(6) }} USD</span>
              </div>
              <div class="status-row">
                <span class="status-label">Batas Limit Kredit:</span>
                <span class="status-value">
                  {{ orStatus.limit !== null ? `$${orStatus.limit.toFixed(4)} USD` : 'Unlimited / Tanpa Batas' }}
                </span>
              </div>
              <div class="status-row">
                <span class="status-label">Jadwal Reset Batas:</span>
                <span class="status-value text-dim">{{ translateResetPeriod(orStatus.limitReset) }}</span>
              </div>
              <div class="status-row">
                <span class="status-label">Akses BYOK (Bawa Kunci Sendiri):</span>
                <span class="status-value text-dim">{{ orStatus.includeByok ? 'Dihitung dalam limit' : 'Tidak dihitung' }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    
    <div class="settings-footer">
      <button @click="saveSettings" class="btn-save">Save Config</button>
      <button @click="resetToDefault" class="btn-reset">Reset Defaults</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['close', 'config-updated']);

const DEFAULT_GROQ_KEY = '';
const DEFAULT_OPENROUTER_KEY = '';

const groqKey = ref('');
const openrouterKey = ref('');
const showGroqKey = ref(false);
const showOpenRouterKey = ref(false);

const checkingGroq = ref(false);
const groqStatus = ref(null);

const checkingOR = ref(false);
const orStatus = ref(null);

const formatNumber = (num) => {
  if (!num) return '';
  if (isNaN(num)) return num;
  return Number(num).toLocaleString('id-ID');
};

const translateResetPeriod = (period) => {
  if (!period) return 'Tidak Pernah Reset (Permanent)';
  const map = {
    'daily': 'Harian (Setiap Hari)',
    'weekly': 'Mingguan (Setiap Minggu)',
    'monthly': 'Bulanan (Setiap Bulan)'
  };
  return map[period.toLowerCase()] || period;
};

const checkGroqLimit = async () => {
  checkingGroq.value = true;
  groqStatus.value = null;
  
  const keyToTest = groqKey.value.trim() || DEFAULT_GROQ_KEY;
  
  let res;
  let usedProxy = false;
  const startTime = Date.now();
  
  // 1. Try local dev server proxy first to bypass browser CORS headers restriction
  try {
    res = await fetch('/api-groq/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${keyToTest}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: 'ping' }],
        max_tokens: 1
      })
    });
    if (res.status === 404) {
      throw new Error('Proxy not found');
    }
    usedProxy = true;
  } catch (proxyErr) {
    console.warn('Groq Proxy not available, falling back to direct API fetch:', proxyErr);
    try {
      res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${keyToTest}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: 'ping' }],
          max_tokens: 1
        })
      });
    } catch (directErr) {
      console.error('Groq direct API fetch failed:', directErr);
      groqStatus.value = {
        isError: true,
        msg: `Gagal: ${directErr.message || 'Koneksi jaringan gagal'}`
      };
      checkingGroq.value = false;
      return;
    }
  }
  
  const latency = Date.now() - startTime;
  
  try {
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `HTTP ${res.status}`);
    }
    
    // Read rate limit headers
    const limitTokens = res.headers.get('x-ratelimit-limit-tokens');
    const remainingTokens = res.headers.get('x-ratelimit-remaining-tokens');
    const limitRequests = res.headers.get('x-ratelimit-limit-requests');
    const remainingRequests = res.headers.get('x-ratelimit-remaining-requests');
    const resetTokens = res.headers.get('x-ratelimit-reset-tokens');
    const resetRequests = res.headers.get('x-ratelimit-reset-requests');
    
    if (!limitTokens) {
      groqStatus.value = {
        isError: false,
        msg: 'Koneksi Berhasil (Aktif)',
        latency,
        modelTested: 'llama-3.3-70b-versatile',
        limitTokens: '6.000 TPM (Est. Free)',
        remainingTokens: 'Terbatas CORS Browser',
        limitRequests: '14.400 RPM (Est. Free)',
        remainingRequests: 'Terbatas CORS Browser',
        resetTokens: null,
        resetRequests: null,
        isCorsRestricted: true
      };
    } else {
      groqStatus.value = {
        isError: false,
        msg: 'Koneksi Berhasil (Aktif)',
        latency,
        modelTested: 'llama-3.3-70b-versatile',
        limitTokens,
        remainingTokens,
        limitRequests,
        remainingRequests,
        resetTokens,
        resetRequests,
        isCorsRestricted: false
      };
    }
  } catch (err) {
    console.error('Groq Limit Check parsing error:', err);
    groqStatus.value = {
      isError: true,
      msg: `Gagal: ${err.message || 'Kunci API tidak valid atau limit habis'}`
    };
  } finally {
    checkingGroq.value = false;
  }
};

const checkOpenRouterLimit = async () => {
  checkingOR.value = true;
  orStatus.value = null;
  
  const keyToTest = openrouterKey.value.trim() || DEFAULT_OPENROUTER_KEY;
  const startTime = Date.now();
  
  try {
    const res = await fetch('https://openrouter.ai/api/v1/key', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${keyToTest}`
      }
    });
    
    const latency = Date.now() - startTime;
    
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `HTTP ${res.status}`);
    }
    
    const data = await res.json();
    if (!data || !data.data) {
      throw new Error('Format respons tidak valid');
    }
    
    const info = data.data;
    orStatus.value = {
      isError: false,
      hasData: true,
      msg: 'Koneksi Berhasil (Aktif)',
      latency,
      label: info.label,
      limit: info.limit,
      limitRemaining: info.limit_remaining,
      usage: info.usage,
      limitReset: info.limit_reset,
      includeByok: info.include_byok_in_limit
    };
  } catch (err) {
    console.error('OpenRouter Limit Check Error:', err);
    orStatus.value = {
      isError: true,
      msg: `Gagal: ${err.message || 'Kunci API tidak valid atau limit habis'}`
    };
  } finally {
    checkingOR.value = false;
  }
};

onMounted(() => {
  const storedGroqKey = localStorage.getItem('groq_api_key') || '';
  // If stored key is the default/fallback key, clear it from localStorage to keep it hidden
  if (storedGroqKey === DEFAULT_GROQ_KEY) {
    localStorage.removeItem('groq_api_key');
    groqKey.value = '';
  } else {
    groqKey.value = storedGroqKey;
  }

  const storedORKey = localStorage.getItem('openrouter_api_key') || '';
  if (storedORKey === DEFAULT_OPENROUTER_KEY) {
    localStorage.removeItem('openrouter_api_key');
    openrouterKey.value = '';
  } else {
    openrouterKey.value = storedORKey;
  }
});

const saveSettings = () => {
  localStorage.setItem('groq_api_key', groqKey.value.trim());
  localStorage.setItem('openrouter_api_key', openrouterKey.value.trim());
  emit('config-updated', {
    groqKey: groqKey.value.trim(),
    openrouterKey: openrouterKey.value.trim()
  });
  emit('close');
};

const resetToDefault = () => {
  // Clearing local inputs leaves them at the secure system default placeholder state
  groqKey.value = '';
  openrouterKey.value = '';
  saveSettings();
};
</script>

<style scoped>
.label-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.badge-key {
  font-family: var(--display-font);
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

.badge-builtin {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
}

.badge-custom {
  background: var(--accent-glow);
  color: var(--accent-color);
  border: 1px solid var(--accent-border-dashed);
}

.cors-notice {
  font-size: 0.65rem;
  color: #ff9f1c;
  margin-top: 6px;
  line-height: 1.3;
  border-top: 1px dashed rgba(255, 159, 28, 0.2);
  padding-top: 5px;
}

.status-divider {
  font-family: var(--mono-font, monospace);
  font-size: 0.6rem;
  color: var(--accent-color);
  letter-spacing: 1px;
  margin-top: 10px;
  margin-bottom: 6px;
  border-bottom: 1px solid var(--accent-border-dashed);
  padding-bottom: 3px;
  font-weight: 700;
}

.api-limit-section {
  margin-top: 8px;
}

.btn-check-limit {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-family: var(--display-font);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--bg-btn-secondary);
  border: 1px dashed var(--border-color);
}

.btn-check-limit:hover:not(:disabled) {
  color: var(--text-main);
  background: var(--bg-btn-secondary-hover);
  border-color: var(--text-muted);
}

.btn-check-limit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.api-status-card {
  margin-top: 8px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.75rem;
  font-family: var(--mono-font, monospace);
  color: var(--text-muted);
  animation: fadeIn 0.2s ease;
}

.api-status-card.error {
  border-color: rgba(255, 75, 75, 0.3);
  background: rgba(255, 75, 75, 0.03);
}

.status-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.status-row:last-child {
  margin-bottom: 0;
}

.status-row.highlight {
  color: var(--text-main);
  font-weight: 600;
  border-top: 1px dashed var(--border-color);
  margin-top: 4px;
  padding-top: 4px;
}

.status-label {
  color: var(--text-dim);
}

.status-value {
  color: var(--text-main);
}

.status-value.text-success {
  color: #10b981;
  font-weight: 700;
}

.status-value.text-error {
  color: var(--text-danger);
  font-weight: 700;
}

.status-value.text-accent {
  color: var(--accent-color);
}

/* Spinner Animation */
.spinner {
  animation: rotate 2s linear infinite;
  width: 12px;
  height: 12px;
}

.spinner .path {
  stroke: currentColor;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.settings-container {
  width: 438px;
  max-width: 100%;
  height: 560.688px;
  max-height: 90vh;
  opacity: 1;
  padding: 15px 15px 10px 15px;
  background: var(--bg-card);
  color: var(--text-main);
  font-size: 15px;
  font-weight: normal;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  box-shadow: rgba(0, 0, 0, 0.5) 0px 10px 40px 0px;
  transition: all 0s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 12px;
  flex-shrink: 0;
}

.settings-title {
  font-family: var(--display-font);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-main);
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-close {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
}

.btn-close:hover {
  color: var(--text-main);
}

.settings-body {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  padding-right: 6px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.settings-body::-webkit-scrollbar {
  display: none;
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input-wrapper .input-text {
  padding-right: 70px;
}

.btn-toggle-visibility {
  position: absolute;
  right: 12px;
  background: transparent;
  border: none;
  color: var(--accent-color);
  font-family: var(--display-font);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
}

.btn-toggle-visibility:hover {
  color: var(--text-main);
}

.settings-help {
  font-size: 0.75rem;
  color: var(--text-dim);
  margin-top: 4px;
}

.settings-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  flex-shrink: 0;
  border-top: 1px solid var(--border-color);
  padding-top: 16px;
}

.btn-save {
  padding: 10px 20px;
  background: var(--accent-gradient);
  color: var(--text-on-accent);
  font-family: var(--display-font);
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  text-transform: uppercase;
  transition: all 0.2s ease;
}

.btn-save:hover {
  box-shadow: 0 0 15px var(--accent-glow);
  transform: translateY(-1px);
}

.btn-reset {
  padding: 10px 16px;
  background: var(--bg-btn-secondary);
  color: var(--text-muted);
  font-family: var(--display-font);
  font-weight: 600;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.btn-reset:hover {
  background: var(--bg-btn-secondary-hover);
  color: var(--text-main);
}

@media (max-width: 479px) {
  .settings-container {
    padding: 16px;
    margin: 12px;
  }
}
</style>
