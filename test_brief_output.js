import { generatePortraitBrief } from './src/services/aiService.js';
import { Marked } from 'marked';
import fs from 'fs';

// Mock localStorage for node environment
global.localStorage = {
  getItem: (key) => {
    if (key === 'groq_api_key') {
      try {
        const envContent = fs.readFileSync('./.env', 'utf8');
        const match = envContent.match(/GROQ_API_KEY\s*=\s*(\S+)/);
        if (match) return match[1];
      } catch (err) {}
    }
    return null;
  },
  setItem: () => {}
};

// Mock fetch to simulate Groq API response
global.fetch = async (url, options) => {
  if (url === '/api/groq') {
    const simulatedResponseBody = {
      choices: [
        {
          message: {
            content: JSON.stringify({
              mood: "Formal dan elegan.",
              resolusi: "4x6 cm",
              konsepVisual: "Foto potret close-up wajah.",
              pakaianStyle: "Setelan jas hitam formal.",
              pencahayaan: "Pencahayaan studio soft box.",
              kameraLensa: "Kamera DSLR profesional.",
              promptFinal: "A formal passport photo...",
              negative_prompt: ["mockup", "3d render"]
            })
          }
        }
      ]
    };
    return {
      ok: true,
      status: 200,
      json: async () => simulatedResponseBody
    };
  }
};

const formData = {
  formType: "portrait",
  namaSubjek: "Maria Victoria",
  genderUsia: "Perempuan Dewasa (20-30 tahun)",
  tipeFoto: "Pas Foto Resmi (KTP/Ijazah/Visa)",
  background: "Latar Merah (KTP Indonesia)",
  pakaian: "Jas Hitam Formal & Dasi",
  orientasi: "Portrait",
  dimensi: "4x6 cm (Standard)",
  ekspresi: "Senyum Ramah (Warm Smile)",
  shotType: "Bust Shot / Chest-Up",
  pencahayaan: "Studio Soft Box (Neutral)",
  kameraFokus: "Sharp Focus (Deep DOF)",
  arahHadap: "Menghadap Lurus (Frontal)",
  teksturWajah: "Natural Skin Pores",
  instruksi: "",
  mjVersion: "--v 6.0",
  mjStyle: "--style raw",
};

async function test() {
  try {
    const result = await generatePortraitBrief(formData);
    const brief = result.brief;
    const promptData = result.promptData;

    console.log('--- GENERATED BRIEF ---');
    console.log(brief);

    console.log('\n--- GENERATED PROMPT DATA ---');
    console.log(JSON.stringify(promptData, null, 2));

    // Simulate BriefOutput.vue computed properties
    const markedInstance = new Marked();
    const jsonBlockRegex = /```json\s*([\s\S]*?)```/i;

    const withoutJson = brief.replace(jsonBlockRegex, '');
    const proseHtml = markedInstance.parse(withoutJson);

    console.log('\n--- PROSE HTML ---');
    console.log(proseHtml);

    const parsedPromptData = promptData;
    const copy = { ...parsedPromptData };
    delete copy.design_principles;

    const clientDetails = {
      nama_subjek:        formData.namaSubjek     || '',
      gender_usia:        formData.genderUsia     || '',
      tipe_foto:          formData.tipeFoto       || '',
      background:         formData.background     || '',
      pakaian:            formData.pakaian        || '',
      ekspresi:           formData.ekspresi       || '',
      shot_type:          formData.shotType       || '',
      pencahayaan:        formData.pencahayaan    || '',
      kamera_fokus:       formData.kameraFokus    || '',
      arah_hadap_wajah:   formData.arahHadap      || '',
      tekstur_kulit:      formData.teksturWajah   || '',
      orientasi:          formData.orientasi      || '',
      dimensi:            formData.dimensi        || '',
      instruksi:          formData.instruksi      || '',
    };

    const jsonString = JSON.stringify({
      portrait_details: clientDetails,
      ai_parameters: copy
    }, null, 2);

    console.log('\n--- JSON STRING ---');
    console.log(jsonString);

  } catch (error) {
    console.error('Error running test:', error);
  }
}

test();
