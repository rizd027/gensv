<template>
  <div class="form-body">
    <!-- SECTION 1 — DESIGN SKILLS EXPLORER -->
    <div class="form-section">
      <div class="section-header">
        <span class="section-num">★</span>
        <h4 class="section-title">AWESOME DESIGN SKILLS</h4>
      </div>
      <p class="section-intro-text">
        Explore curated design system configurations (SKILL.md and DESIGN.md) from the 
        <a href="https://github.com/bergside/awesome-design-skills" target="_blank" class="github-repo-link">
          bergside/awesome-design-skills
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left: 2px; vertical-align: middle;">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
        repository. Pull directly into your AI coding tool (Cursor, Bolt.new, v0) using the TypeUI CLI.
      </p>

      <!-- Search and Filter Bar -->
      <div class="search-filter-bar">
        <div class="search-input-wrapper">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input 
            type="text" 
            v-model="searchQuery" 
            class="input-search-skills" 
            placeholder="Cari gaya desain (e.g. Glassmorphism, Bold, Riso)..." 
          />
          <button v-if="searchQuery" @click="searchQuery = ''" class="btn-clear-search">&times;</button>
        </div>

        <div class="category-filters">
          <button 
            v-for="cat in categories" 
            :key="cat" 
            type="button" 
            class="filter-tag" 
            :class="{ active: selectedCategory === cat }"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </div>

    <!-- Skills Catalog Grid -->
    <div class="skills-grid">
      <div 
        v-for="skill in filteredSkills" 
        :key="skill.slug" 
        class="skill-card"
      >
        <div class="skill-card-header">
          <span class="skill-badge">{{ skill.category }}</span>
          <h5 class="skill-name">{{ skill.name }}</h5>
        </div>
        <p class="skill-desc">{{ skill.description }}</p>

        <!-- Command Box -->
        <div class="cli-command-box">
          <span class="cli-label">CLI Pull Command</span>
          <div class="cli-input-row">
            <code>{{ skill.pullCmd }}</code>
            <div class="cli-actions-row">
              <button 
                type="button" 
                class="btn-copy-cli" 
                @click="copyToClipboard(skill.pullCmd, skill.slug)"
              >
                {{ copiedSlug === skill.slug ? 'Copied ✓' : 'Copy' }}
              </button>
              <button 
                type="button" 
                class="btn-preview-skill" 
                @click="emitPreview(skill)"
              >
                Preview
              </button>
            </div>
          </div>
        </div>

        <!-- Aesthetic details -->
        <div class="aesthetic-details">
          <div class="detail-row">
            <span class="detail-label">Dominant Colors:</span>
            <span class="detail-val">{{ skill.colors.join(', ') }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Typography:</span>
            <span class="detail-val">{{ skill.typography }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Agentic Rules:</span>
            <p class="detail-rules-para">{{ skill.rules }}</p>
          </div>
        </div>
      </div>

      <div v-if="filteredSkills.length === 0" class="no-skills-found">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 8px; opacity: 0.5;">
          <circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
        <p>Tidak ada gaya desain yang cocok dengan pencarian Anda.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const selectedCategory = ref('Semua');
const copiedSlug = ref('');

const categories = ['Semua', 'Modern UI', 'Minimalist', 'Retro & Bold', 'Futuristic', 'Soft UI', 'Organic Nature', 'Handmade', 'Enterprise & Tech'];

const designSkills = [
  {
    name: 'Agentic System',
    slug: 'agentic',
    category: 'Enterprise & Tech',
    description: 'Clean, tech-focused dark mode design optimized for AI agents and coding tools.',
    pullCmd: 'npx typeui.sh pull agentic',
    colors: ['Deep Obsidian', 'Electric Teal', 'Pure White'],
    typography: 'Sans-Serif (Geist / Inter)',
    rules: 'Keep navigation flat and avoid complex nesting. Prioritize fast readable hierarchy.'
  },
  {
    name: 'Ant Corporate UI',
    slug: 'ant',
    category: 'Enterprise & Tech',
    description: 'Ant Design corporate look with clean elements, structured tables, and secondary highlight blue colors.',
    pullCmd: 'npx typeui.sh pull ant',
    colors: ['Ant Blue', 'Neutral Slate', 'Warm White'],
    typography: 'Corporate Sans (Segoe UI / Helvetica Neue)',
    rules: 'Follow standard enterprise grid rules. Use small compact borders and clear padding gaps.'
  },
  {
    name: 'Roku Dark TV Layout',
    slug: 'roku',
    category: 'Retro & Bold',
    description: 'Classic dark television interface theme featuring bold card outline highlights and purple accents.',
    pullCmd: 'npx typeui.sh pull roku',
    colors: ['Roku Purple', 'Dark Charcoal', 'Steel Gray'],
    typography: 'Display Sans (Montserrat / Outfit)',
    rules: 'Buttons must have sharp visual border highlights on focus states to support remote-like keyboard nav.'
  },
  {
    name: 'Artistic Expressive Grid',
    slug: 'artistic',
    category: 'Organic Nature',
    description: 'Expressive design system featuring irregular column blocks, paint blobs, and creative gallery branding.',
    pullCmd: 'npx typeui.sh pull artistic',
    colors: ['Canvas Beige', 'Charcoal Ink', 'Terracotta Red'],
    typography: 'Asymmetrical Serif (Playfair Display / Lora)',
    rules: 'Avoid strict column alignments. Allow grid elements to float organically.'
  },
  {
    name: 'Bento Grid Dashboard',
    slug: 'bento',
    category: 'Modern UI',
    description: 'Curated Bento Grid template tiles of varying heights and widths, optimal for analytics dashboards.',
    pullCmd: 'npx typeui.sh pull bento',
    colors: ['Dark Slate', 'Cobalt Blue', 'Cyber Green'],
    typography: 'Clean Sans (Inter / Roboto)',
    rules: 'Layout must remain highly responsive. Tiles must collapse into single column flow on screens smaller than 768px.'
  },
  {
    name: 'Bold High-Readability',
    slug: 'bold',
    category: 'Retro & Bold',
    description: 'High-contrast design system showcasing large bold headers, massive margins, and maximum text readability.',
    pullCmd: 'npx typeui.sh pull bold',
    colors: ['Jet Black', 'Pure White', 'Amber Yellow'],
    typography: 'Extra Bold Grotesk (Lexend / Space Grotesk)',
    rules: 'All body text must satisfy WCAG 2.2 AAA standards (minimum 7:1 contrast ratio).'
  },
  {
    name: 'Neo-Brutalism Style',
    slug: 'brutalism',
    category: 'Retro & Bold',
    description: 'Brutalist inspired flat primary cards with thick solid black offset shadows and raw structure.',
    pullCmd: 'npx typeui.sh pull brutalism',
    colors: ['Kuning Lemon', 'Hitam Pekat', 'Biru Cobalt'],
    typography: 'Grotesk Bold (Space Grotesk / Lexend)',
    rules: 'Do not use soft shadows or gradients. Use hard 4px solid borders with flat solid offsets.'
  },
  {
    name: 'Cafe Cozy Vibe',
    slug: 'cafe',
    category: 'Organic Nature',
    description: 'Warm vintage design system themed for cafes, utilizing warm sepia wood colors and cozy typography.',
    pullCmd: 'npx typeui.sh pull cafe',
    colors: ['Espresso Brown', 'Warm Sepia', 'Oat Cream'],
    typography: 'Vintage Serif (Merriweather / Lora)',
    rules: 'Use soft shadows and warm colored card containers. Keep visual speed calm and relaxed.'
  },
  {
    name: 'Claymorphism Soft 3D',
    slug: 'claymorphism',
    category: 'Soft UI',
    description: 'Soft 3D card layout featuring inner glass shadows, clay-like buttons, and pastel backgrounds.',
    pullCmd: 'npx typeui.sh pull claymorphism',
    colors: ['Soft Clay Pink', 'Lavender Mist', 'Pastel Mint'],
    typography: 'Soft Round (Nunito / Quicksand)',
    rules: 'Ensure extruded card layers retain double drop-shadow styling (inset light and offset dark).'
  },
  {
    name: 'Claude Ivory Aesthetics',
    slug: 'claude',
    category: 'Minimalist',
    description: 'Clean ivory/clay layout focusing on highly readable text paragraphs and muted UI elements.',
    pullCmd: 'npx typeui.sh pull claude',
    colors: ['Ivory White', 'Charcoal Grey', 'Soft Amber'],
    typography: 'Classic Sans/Serif (Geist / Lora)',
    rules: 'Maintain highly spacious layouts, quiet minimal hover highlights, and clear visual hierarchy.'
  },
  {
    name: 'Clean Spacious UI',
    slug: 'clean',
    category: 'Minimalist',
    description: 'Airy, borderless interfaces with light background focus and clean modern sans-serif typography.',
    pullCmd: 'npx typeui.sh pull clean',
    colors: ['Pure White', 'Muted Slate', 'Sky Blue Tint'],
    typography: 'Clean Sans (Inter / Geist)',
    rules: 'Prefer padding gaps and whitespace separations instead of solid line borders.'
  },
  {
    name: 'Codex Dev Workspace',
    slug: 'codex',
    category: 'Enterprise & Tech',
    description: 'Dark terminal look, code syntax highlight widgets, and clean slate margin layouts.',
    pullCmd: 'npx typeui.sh pull codex',
    colors: ['Terminal Dark', 'Syntax Green', 'Code Amber'],
    typography: 'Monospace (JetBrains Mono / Fira Code)',
    rules: 'Make all code display containers scrollable horizontally and add a quick-copy command button.'
  },
  {
    name: 'Colorful Gradient Accent',
    slug: 'colorful',
    category: 'Modern UI',
    description: 'Vibrant multi-colored gradient accents, playful buttons, and interactive visual transitions.',
    pullCmd: 'npx typeui.sh pull colorful',
    colors: ['Cyan Blue', 'Magenta Pink', 'Sunshine Yellow'],
    typography: 'Creative Sans (Outfit / Poppins)',
    rules: 'Use gradients selectively for call-to-actions. Keep forms and tables clean and plain.'
  },
  {
    name: 'Contemporary Editorial',
    slug: 'contemporary',
    category: 'Minimalist',
    description: 'Modern high-end editorial look featuring sleek layouts, clean borders, and generous padding.',
    pullCmd: 'npx typeui.sh pull contemporary',
    colors: ['Off-White Canvas', 'Jet Black', 'Sophisticated Tan'],
    typography: 'Elegant Serif & Sans (Cormorant Garamond / Inter)',
    rules: 'Align text elements strictly to the baseline grid. Avoid messy asymmetrical boxes.'
  },
  {
    name: 'Corporate Structuring',
    slug: 'corporate',
    category: 'Enterprise & Tech',
    description: 'Professional clean blue/gray color palette, standard layouts, and structured data tables.',
    pullCmd: 'npx typeui.sh pull corporate',
    colors: ['Navy Blue', 'Office Slate', 'Ice Gray'],
    typography: 'System Sans (Segoe UI / Roboto)',
    rules: 'Ensure all data tables have zebra stripping, sortable columns, and clear paging controls.'
  },
  {
    name: 'Cosmic Purple Glow',
    slug: 'cosmic',
    category: 'Futuristic',
    description: 'Stargazing deep purple/dark blue backgrounds, floating cards, and stellar neon glowing lines.',
    pullCmd: 'npx typeui.sh pull cosmic',
    colors: ['Nebula Purple', 'Cosmic Blue', 'Starlight Cyan'],
    typography: 'Futuristic Sans (Space Grotesk / Syncopate)',
    rules: 'Apply glowing shadows exclusively to cards and primary action buttons.'
  },
  {
    name: 'Creative Asymmetric Flex',
    slug: 'creative',
    category: 'Modern UI',
    description: 'Asymmetrical flexbox containers, interactive sliders, and bold accent typography.',
    pullCmd: 'npx typeui.sh pull creative',
    colors: ['Vibrant Orange', 'Dark Charcoal', 'Cream Beige'],
    typography: 'Bold Display (Syne / Poppins)',
    rules: 'Provide alternative layouts for mobile screens so that asymmetric containers stack neatly.'
  },
  {
    name: 'Enterprise Dashboard',
    slug: 'enterprise',
    category: 'Enterprise & Tech',
    description: 'Robust layout with clear typography, tables, status badges, and admin dashboard widgets.',
    pullCmd: 'npx typeui.sh pull enterprise',
    colors: ['Slate Grey', 'Primary Blue', 'Success Green'],
    typography: 'Standard Sans (Inter / Segoe UI)',
    rules: 'Status indicators must include text labels alongside colors to support accessibility guidelines.'
  },
  {
    name: 'Dithered Retro Pixel',
    slug: 'dithered',
    category: 'Retro & Bold',
    description: 'Dithered pixel shading, retro black/white halftone textures, and retro computing interface.',
    pullCmd: 'npx typeui.sh pull dithered',
    colors: ['Classic B&W', 'Dither Slate', 'Lime Console'],
    typography: 'Pixelated Monospace (VT323 / Press Start 2P)',
    rules: 'Use solid retro borders (no anti-aliasing) and strictly avoid transparency blurs.'
  },
  {
    name: 'Doodle Sketch Style',
    slug: 'doodle',
    category: 'Handmade',
    description: 'Hand-drawn sketch elements, scribble underlines, and organic handwritten headers.',
    pullCmd: 'npx typeui.sh pull doodle',
    colors: ['Notebook Yellow', 'Graphite Black', 'Eraser Pink'],
    typography: 'Scribbled Handwriting (Caveat / Gochi Hand)',
    rules: 'Keep text fonts large enough. Use standard sans-serif for secondary readable text.'
  },
  {
    name: 'Dramatic Theatrical Contrast',
    slug: 'dramatic',
    category: 'Futuristic',
    description: 'High contrast: dark backgrounds with giant white titles and crimson accent colors.',
    pullCmd: 'npx typeui.sh pull dramatic',
    colors: ['Teal Crimson', 'Dark Obsidian', 'Pure White'],
    typography: 'Ultra Bold Sans (Syne / Montserrat)',
    rules: 'Keep paragraphs extremely short. Prioritize visual titles and high contrast buttons.'
  },
  {
    name: 'Editorial Magazine Print',
    slug: 'editorial',
    category: 'Minimalist',
    description: 'Magazine print style, sophisticated serif headers, column layouts, and high readability.',
    pullCmd: 'npx typeui.sh pull editorial',
    colors: ['Paper Ivory', 'Ink Charcoal', 'Warm Olive'],
    typography: 'Serif Classic (Playfair Display / Lora)',
    rules: 'Organize text in newspaper-like columns on larger screens to mimic magazine print layout.'
  },
  {
    name: 'Square Sharp-Edge UI',
    slug: 'square',
    category: 'Retro & Bold',
    description: 'Hard square-cornered components with 0px border-radius, clean lines, and strict grids.',
    pullCmd: 'npx typeui.sh pull square',
    colors: ['Midnight Black', 'Pure White', 'Safety Orange'],
    typography: 'Clean Sans (Space Grotesk / Inter)',
    rules: 'Border-radius of all cards, inputs, and buttons must be set to 0. Do not use curved elements.'
  },
  {
    name: 'Pulse Interactive Vibe',
    slug: 'pulse',
    category: 'Modern UI',
    description: 'Breathing ambient glows, pulsing status badges, and subtle layout transition highlights.',
    pullCmd: 'npx typeui.sh pull pulse',
    colors: ['Indigo Glow', 'Pulse Red', 'Slate Grey'],
    typography: 'Modern Sans (Outfit / Poppins)',
    rules: 'Pulse animations should have low frequency to avoid distracting users during reading.'
  },
  {
    name: 'Stitch Google Block Style',
    slug: 'stitch',
    category: 'Enterprise & Tech',
    description: 'Google Stitch style: clean component blocks, subtle gray borders, and blue interaction states.',
    pullCmd: 'npx typeui.sh pull stitch',
    colors: ['Google Blue', 'Paper White', 'Boundary Grey'],
    typography: 'Google-y Sans (Product Sans / Roboto)',
    rules: 'Use thin boundary borders to group related dashboard options clearly.'
  },
  {
    name: 'Expressive Neon Bold',
    slug: 'expressive',
    category: 'Modern UI',
    description: 'Irregular borders, neon gradient highlights, and bold visual storytelling elements.',
    pullCmd: 'npx typeui.sh pull expressive',
    colors: ['Neon Lime', 'Deep Violet', 'Electric Pink'],
    typography: 'Asymmetric Grotesk (Syne / Poppins)',
    rules: 'Ensure all forms use clean regular inputs to keep data fields readable.'
  },
  {
    name: 'Fantasy Medieval Parchment',
    slug: 'fantasy',
    category: 'Handmade',
    description: 'Magical medieval typography, vintage warm parchment papers, and detailed golden borders.',
    pullCmd: 'npx typeui.sh pull fantasy',
    colors: ['Gold Ochre', 'Parchment Tan', 'Ink Black'],
    typography: 'Medieval Serif (MedievalSharp / Cinzel)',
    rules: 'Use vintage card borders and decorative initials for main headlines.'
  },
  {
    name: 'Fiction Sci-Fi Interface',
    slug: 'fiction',
    category: 'Futuristic',
    description: 'Sci-fi interface: glowing cyan status screens, telemetry readouts, and dark monospace boxes.',
    pullCmd: 'npx typeui.sh pull fiction',
    colors: ['Telemetry Cyan', 'Deep Black', 'Scanner Yellow'],
    typography: 'Sci-Fi Monospace (Share Tech Mono / Fira Code)',
    rules: 'Add technical telemetry readouts in small text to support sci-fi theme.'
  },
  {
    name: 'Flat Minimalist 2D',
    slug: 'flat',
    category: 'Minimalist',
    description: 'No shadows, no gradients. Clean 2D panels with simple borders and solid flat colors.',
    pullCmd: 'npx typeui.sh pull flat',
    colors: ['Solid Teal', 'Flat Gray', 'Snow White'],
    typography: 'Vanilla Sans (Inter / Roboto)',
    rules: 'Shadow depth must be set to 0. Use 1px borders to separate overlapping card elements.'
  },
  {
    name: 'Friendly Round UI',
    slug: 'friendly',
    category: 'Soft UI',
    description: 'Rounded soft borders, warm pastel palettes, friendly greeting text, and cute graphics.',
    pullCmd: 'npx typeui.sh pull friendly',
    colors: ['Pastel Yellow', 'Soft Peach', 'Muted Coral'],
    typography: 'Rounded Sans (Quicksand / Poppins)',
    rules: 'Cards must have a large border-radius (16px to 24px) for a soft, friendly appearance.'
  },
  {
    name: 'Futuristic Cyberpunk Grid',
    slug: 'futuristic',
    category: 'Futuristic',
    description: 'Cyberpunk telemetry dashboard, dark purple background, neon cyan grids, and tech readouts.',
    pullCmd: 'npx typeui.sh pull futuristic',
    colors: ['Cyber Purple', 'Scanner Cyan', 'Volt Green'],
    typography: 'Mono Tech (JetBrains Mono / Space Mono)',
    rules: 'Use neon glowing borders to indicate active states.'
  },
  {
    name: 'Glassmorphism Aero Glass',
    slug: 'glassmorphism',
    category: 'Modern UI',
    description: 'Aesthetic frosted glass panels, translucent layouts, and smooth backdrop blurs.',
    pullCmd: 'npx typeui.sh pull glassmorphism',
    colors: ['Clear Glass', 'Frosted White', 'Deep Sky Blue'],
    typography: 'Sans-Serif Modern (Inter / Outfit)',
    rules: 'Add border highlight to glass containers to simulate real-world glass thickness reflection.'
  },
  {
    name: 'Gradient Glassy Accent',
    slug: 'gradient',
    category: 'Modern UI',
    description: 'Fluid background gradients, colorful color transitions, and glossy translucent cards.',
    pullCmd: 'npx typeui.sh pull gradient',
    colors: ['Sunset Orange', 'Ocean Blue', 'Aurora Purple'],
    typography: 'Modern Sans (Outfit / Inter)',
    rules: 'Keep layout simple to prevent colorful gradients from overpowering content.'
  },
  {
    name: 'Immersive Parallax Screen',
    slug: 'immersive',
    category: 'Modern UI',
    description: 'Full-screen media layouts, dark theme overlays, and smooth parallax scrolling.',
    pullCmd: 'npx typeui.sh pull immersive',
    colors: ['Overlaid Black', 'Snow White', 'Accent Sky'],
    typography: 'Large Serif (Playfair Display / Inter)',
    rules: 'Ensure scrolling transitions remain performance optimized for mobile screens.'
  },
  {
    name: 'Impeccable Luxury Design',
    slug: 'impeccable',
    category: 'Minimalist',
    description: 'Ultra premium luxury branding, golden/ivory colors, and editorial layout alignment.',
    pullCmd: 'npx typeui.sh pull impeccable',
    colors: ['Luxury Gold', 'Champagne Ivory', 'Onyx Black'],
    typography: 'Refined Serif (Cormorant Garamond / Montserrat)',
    rules: 'Use clean hairline borders and spacious layouts to create a sense of premium prestige.'
  },
  {
    name: 'Levels Tiered Shadow',
    slug: 'levels',
    category: 'Soft UI',
    description: 'Multi-tiered layered layouts, soft drop shadows, and clean hierarchical cards.',
    pullCmd: 'npx typeui.sh pull levels',
    colors: ['Soft Slate', 'Pure White', 'Shadow Muted'],
    typography: 'Modern Sans (Inter / Outfit)',
    rules: 'Use varying shadow depths to represent element priority level.'
  },
  {
    name: 'Lingo Docs Style',
    slug: 'lingo',
    category: 'Enterprise & Tech',
    description: 'Clean technical documentation style, monospace codes, and clear sidebar navigation.',
    pullCmd: 'npx typeui.sh pull lingo',
    colors: ['Tech Slate', 'Code Charcoal', 'Accent Mint'],
    typography: 'Clean Sans (Inter / JetBrains Mono)',
    rules: 'Ensure sidebar links can be easily collapsed on mobile devices.'
  },
  {
    name: 'Power Industrial Theme',
    slug: 'power',
    category: 'Retro & Bold',
    description: 'Industrial energy theme: high-contrast warning colors (orange/black) and grid lines.',
    pullCmd: 'npx typeui.sh pull power',
    colors: ['Caution Orange', 'Industrial Black', 'Steel Grey'],
    typography: 'Heavy Grotesk (Space Grotesk / Syne)',
    rules: 'Use warning yellow/orange colors for important alerts and highlights.'
  },
  {
    name: 'Material Layer Paper',
    slug: 'material',
    category: 'Enterprise & Tech',
    description: 'Google Material Design: paper shadow layering, rounded components, and ripple effects.',
    pullCmd: 'npx typeui.sh pull material',
    colors: ['Material Indigo', 'Teal Accent', 'Paper White'],
    typography: 'Google Sans (Roboto / Inter)',
    rules: 'Ensure ripple hover effects trigger instantly on click action.'
  },
  {
    name: 'Matrix Code Console',
    slug: 'matrix',
    category: 'Futuristic',
    description: 'Monochromatic terminal screen: matrix rain green colors, monospace codes, and terminal boxes.',
    pullCmd: 'npx typeui.sh pull matrix',
    colors: ['Matrix Green', 'Terminal Dark', 'Phosphor Lime'],
    typography: 'Retro Terminal (VT323 / JetBrains Mono)',
    rules: 'Make layout fully responsive and use glowing green monospace fonts.'
  },
  {
    name: 'Minimal Airy Canvas',
    slug: 'minimal',
    category: 'Minimalist',
    description: 'Ultra-minimalist interface with extremely limited color accents and massive empty spacing.',
    pullCmd: 'npx typeui.sh pull minimal',
    colors: ['Pure White', 'Jet Black', 'Minimal Grey'],
    typography: 'Ultra Sans (Geist / SF Pro)',
    rules: 'Set maximum focus on single actions. Hide decorative columns.'
  },
  {
    name: 'Modern SaaS Landing',
    slug: 'modern',
    category: 'Modern UI',
    description: 'Standard modern SaaS landing layout: airy spacing, rounded cards, and clean typography.',
    pullCmd: 'npx typeui.sh pull modern',
    colors: ['SaaS Indigo', 'Muted Slate', 'Ice Blue'],
    typography: 'Clean Sans (Inter / Outfit)',
    rules: 'Ensure hero call to action has high contrast and is positioned above the fold.'
  },
  {
    name: 'Mono Monochrome Slate',
    slug: 'mono',
    category: 'Minimalist',
    description: 'Monochrome layout priority, black/white, borderless boundaries, and Geist Mono fonts.',
    pullCmd: 'npx typeui.sh pull mono',
    colors: ['Slate Grey', 'Black Ink', 'Ice White'],
    typography: 'Monospace (Geist Mono / Courier)',
    rules: 'Use flat solid dividers instead of shadows.'
  },
  {
    name: 'Neon Cyberpunk Mode',
    slug: 'neon',
    category: 'Futuristic',
    description: 'Fluororescent neon lights, cyberpunk dark layouts, and glowing button frames.',
    pullCmd: 'npx typeui.sh pull neon',
    colors: ['Neon Cyan', 'Hot Magenta', 'Grid Obsidian'],
    typography: 'Monospace Tech (Fira Code / Outfit)',
    rules: 'Keep body text simple white to ensure contrast remains readable.'
  },
  {
    name: 'Neobrutalism Flat Stroke',
    slug: 'neobrutalism',
    category: 'Retro & Bold',
    description: 'Neo-Brutalism design system: thick hard stroke borders and flat saturated buttons.',
    pullCmd: 'npx typeui.sh pull neobrutalism',
    colors: ['Lemon Yellow', 'Solid Crimson', 'Stroke Black'],
    typography: 'Heavy Sans (Lexend / Space Grotesk)',
    rules: 'Cards must use flat solid colors for backgrounds.'
  },
  {
    name: 'Neumorphism Tactile Soft',
    slug: 'neumorphism',
    category: 'Soft UI',
    description: 'Extruded plastic tactile UI featuring double shadows for inset/outset buttons.',
    pullCmd: 'npx typeui.sh pull neumorphism',
    colors: ['Sand Krem', 'Muted Olive', 'Text Slate'],
    typography: 'Rounded Geometric (Poppins / Quicksand)',
    rules: 'Do not use thin text weights. Make text bold to guarantee contrast.'
  },
  {
    name: 'Pacman Arcade Theme',
    slug: 'pacman',
    category: 'Retro & Bold',
    description: 'Retro arcade game theme: bright yellow/blue/black, pixelated text, and ghost icons.',
    pullCmd: 'npx typeui.sh pull pacman',
    colors: ['Pacman Yellow', 'Blinky Red', 'Maze Blue'],
    typography: 'Arcade Font (Press Start 2P / VT323)',
    rules: 'Use neon maze-like borders for game cards.'
  },
  {
    name: 'Paper Vintage Sketch',
    slug: 'paper',
    category: 'Handmade',
    description: 'Yellowed wrinkled paper backgrounds, notebook grids, and sketchy hand-drawn lines.',
    pullCmd: 'npx typeui.sh pull paper',
    colors: ['Manila Yellow', 'Faded Blue Ink', 'Pencil Charcoal'],
    typography: 'Sketch Handwritten (Caveat / Architect\'s Daughter)',
    rules: 'Use notebook grid backgrounds for forms.'
  },
  {
    name: 'Perspective 3D Cards',
    slug: 'perspective',
    category: 'Modern UI',
    description: '3D isometric layout boxes, tilted card angles, and unique hover transformations.',
    pullCmd: 'npx typeui.sh pull perspective',
    colors: ['Interactive Purple', 'Ice White', 'Shadow Grey'],
    typography: 'Modern Sans (Outfit / Inter)',
    rules: 'Include flat fallback states for mobile browsers that do not support 3D CSS.'
  },
  {
    name: 'Premium Classic Editorial',
    slug: 'premium',
    category: 'Minimalist',
    description: 'Luxury branding design, gold-accented typography, and elegant classic serifs.',
    pullCmd: 'npx typeui.sh pull premium',
    colors: ['Rich Gold', 'Velvet Burgundy', 'Champagne Ivory'],
    typography: 'Elegant Serif (Cormorant / Playfair)',
    rules: 'Avoid cluttered grids. Stick to clean, simple asymmetrical placements.'
  },
  {
    name: 'Professional Business Clean',
    slug: 'professional',
    category: 'Enterprise & Tech',
    description: 'Corporate SaaS style: blue/white layout, clean tabs, data charts, and tables.',
    pullCmd: 'npx typeui.sh pull professional',
    colors: ['Enterprise Blue', 'Cool Grey', 'Paper White'],
    typography: 'Clean Sans (Inter / Roboto)',
    rules: 'Ensure visual charts have responsive layouts.'
  },
  {
    name: 'Basic Skeleton Wireframe',
    slug: 'basic',
    category: 'Minimalist',
    description: 'Clean barebones skeleton layout, simple borders, and vanilla CSS frameworks.',
    pullCmd: 'npx typeui.sh pull basic',
    colors: ['Pure White', 'Border Slate', 'Text Dark'],
    typography: 'Standard Sans (Inter / System-ui)',
    rules: 'Do not add decorative shadows.'
  },
  {
    name: 'Refined Product System',
    slug: 'refined',
    category: 'Minimalist',
    description: 'Polished high-end product system: crisp borders, soft gray gradients, and premium feel.',
    pullCmd: 'npx typeui.sh pull refined',
    colors: ['Slate Indigo', 'Cool Grey', 'Pure White'],
    typography: 'Modern Sans (Inter / Outfit)',
    rules: 'Use thin hairline borders to separate dashboard items.'
  },
  {
    name: 'Retro 90s Computing',
    slug: 'retro',
    category: 'Retro & Bold',
    description: '90s computing layout, grey buttons, Windows 95 borders, and tech system fonts.',
    pullCmd: 'npx typeui.sh pull retro',
    colors: ['Win95 Teal', 'Classic Gray', 'System Dark Blue'],
    typography: 'System Monospace (Courier / MS Sans Serif)',
    rules: 'Use double inset bevel borders to simulate 90s OS buttons.'
  },
  {
    name: 'Risograph Print Texture',
    slug: 'riso',
    category: 'Organic Nature',
    description: 'Risograph analog print look, overlay offset colors, and halftone dot textures.',
    pullCmd: 'npx typeui.sh pull riso',
    colors: ['Warm Riso Red', 'Ink Cyan', 'Mustard Yellow'],
    typography: 'Vintage Serif (DM Serif / Playfair)',
    rules: 'Add slight overlap ink misalignment offsets for headers.'
  },
  {
    name: 'Sega Sonic Arcade',
    slug: 'sega',
    category: 'Retro & Bold',
    description: 'Classic 16-bit arcade console aesthetic with saturated blue colors and pixel cards.',
    pullCmd: 'npx typeui.sh pull sega',
    colors: ['Sega Blue', 'Sonic Yellow', 'Sonic Red'],
    typography: 'Arcade Font (Press Start 2P / Fira Code)',
    rules: 'Borders should use double outline style.'
  },
  {
    name: 'Shadcn Radix System',
    slug: 'shadcn',
    category: 'Enterprise & Tech',
    description: 'Tailwind CSS + Radix UI aesthetic: clean slate colorways and borderless cards.',
    pullCmd: 'npx typeui.sh pull shadcn',
    colors: ['Slate Black', 'Slate Ivory', 'Boundary Grey'],
    typography: 'Clean Sans (Geist / Inter)',
    rules: 'Use crisp thin boundaries and light gray borders.'
  },
  {
    name: 'Geometric Line Grids',
    slug: 'geometric',
    category: 'Modern UI',
    description: 'Sharp angular layouts, repeating geometric backgrounds, and clean line grids.',
    pullCmd: 'npx typeui.sh pull geometric',
    colors: ['Navy Blue', 'Line Orange', 'Canvas Cream'],
    typography: 'Angular Sans (Montserrat / Poppins)',
    rules: 'Use sharp diagonals and angled lines as design dividers.'
  },
  {
    name: 'Sketch Hand-drawn Wireframe',
    slug: 'sketch',
    category: 'Handmade',
    description: 'Scribbled borders, hand-drawn wireframes, and notebook paper style grids.',
    pullCmd: 'npx typeui.sh pull sketch',
    colors: ['Draft Pencil Grey', 'Eraser Pink', 'Grid Blue'],
    typography: 'Draft Hand (Caveat / Architect\'s Daughter)',
    rules: 'All component outlines must use wavy, sketchy line filters.'
  },
  {
    name: 'Skeuomorphism Reality Glass',
    slug: 'skeumorphism',
    category: 'Soft UI',
    description: 'Photorealistic buttons, leather/brushed metal textures, and glassy realistic screens.',
    pullCmd: 'npx typeui.sh pull skeumorphism',
    colors: ['Brushed Silver', 'Leather Brown', 'Glossy Cyan'],
    typography: 'Sans Realistic (Helvetica / Roboto)',
    rules: 'Use complex shadows, gradients, and inner glows to create real-world object textures.'
  },
  {
    name: 'Sleek Corporate Dark',
    slug: 'sleek',
    category: 'Futuristic',
    description: 'Polished glass, dark mode, high status glow, and futuristic corporate layouts.',
    pullCmd: 'npx typeui.sh pull sleek',
    colors: ['Gloss Obsidian', 'Chrome Cyan', 'Pure White'],
    typography: 'Clean Tech (Inter / Outfit)',
    rules: 'Use dark glassy boxes over deep glowing nebula backgrounds.'
  },
  {
    name: 'Spacious Airy Spacing',
    slug: 'spacious',
    category: 'Minimalist',
    description: 'Extremely airy layout with massive margins and clear readability focus.',
    pullCmd: 'npx typeui.sh pull spacious',
    colors: ['Clear Snow White', 'Ice Blue', 'Coal Black'],
    typography: 'Readable Sans (Inter / Geist)',
    rules: 'Set card gaps to at least 48px to create a spacious layout.'
  },
  {
    name: 'Storytelling Hero Slide',
    slug: 'storytelling',
    category: 'Modern UI',
    description: 'Narrative-driven visual layouts, large typography, and bold hero sliders.',
    pullCmd: 'npx typeui.sh pull storytelling',
    colors: ['Creative Orange', 'Story Black', 'Soft Ivory'],
    typography: 'Narrative Display (Cormorant / Outfit)',
    rules: 'Align hero visuals to support textual story content.'
  },
  {
    name: 'Terracotta Earth Soil',
    slug: 'terracotta',
    category: 'Organic Nature',
    description: 'Warm earth colors, terracotta soil elements, and relaxed organic layout.',
    pullCmd: 'npx typeui.sh pull terracotta',
    colors: ['Clay Terracotta', 'Sand Cream', 'Olive Leaf'],
    typography: 'Serif Natural (Lora / DM Serif)',
    rules: 'Use soft warm clay colored headers.'
  },
  {
    name: 'Tetris Block Grid',
    slug: 'tetris',
    category: 'Retro & Bold',
    description: 'Multi-colored stacking blocks, grid line overlays, and retro game typography.',
    pullCmd: 'npx typeui.sh pull tetris',
    colors: ['Tetris Blue', 'Tetris Red', 'Tetris Yellow'],
    typography: 'Grid Monospace (VT323 / Press Start 2P)',
    rules: 'Cards must stack next to each other like puzzle blocks.'
  },
  {
    name: 'Vibrant Saturated Glow',
    slug: 'vibrant',
    category: 'Modern UI',
    description: 'High energy glowing gradients, saturated colors, and neon hover states.',
    pullCmd: 'npx typeui.sh pull vibrant',
    colors: ['Saturated Lime', 'Electric Indigo', 'Pure Magenta'],
    typography: 'Display Sans (Outfit / Poppins)',
    rules: 'Glow animations should activate when hover is triggered.'
  },
  {
    name: 'Vintage Typewriter Print',
    slug: 'vintage',
    category: 'Handmade',
    description: 'Retro warm print style, old paper background, and classic typewriter fonts.',
    pullCmd: 'npx typeui.sh pull vintage',
    colors: ['Typewriter Ink', 'Aging Parchment', 'Faded Red'],
    typography: 'Typewriter Mono (Courier Prime / Special Elite)',
    rules: 'Text layouts should mimic classic printed papers with clear left margins.'
  }
];

const filteredSkills = computed(() => {
  return designSkills.filter(skill => {
    const matchesSearch = 
      skill.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    const matchesCat = selectedCategory.value === 'Semua' || skill.category === selectedCategory.value;

    return matchesSearch && matchesCat;
  });
});

const emit = defineEmits(['preview-skill']);

const emitPreview = (skill) => {
  emit('preview-skill', skill);
};

const copyToClipboard = (text, slug) => {
  navigator.clipboard.writeText(text);
  copiedSlug.value = slug;
  setTimeout(() => {
    copiedSlug.value = '';
  }, 2000);
};
</script>

<style scoped>
.section-intro-text {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: var(--space-md);
}

.github-repo-link {
  color: #38bdf8;
  text-decoration: none;
  font-weight: 500;
}

.github-repo-link:hover {
  text-decoration: underline;
}

.search-filter-bar {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: var(--space-md);
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: var(--text-muted);
  opacity: 0.7;
}

.input-search-skills {
  width: 100%;
  padding: 10px 36px 10px 36px;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-main);
  font-size: 13px;
  transition: all 0.2s ease;
}

.input-search-skills:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px var(--accent-glow);
}

.btn-clear-search {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 16px;
  cursor: pointer;
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.filter-tag {
  background: var(--bg-btn-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-tag:hover {
  background: var(--accent-glow);
  color: var(--accent-color);
}

.filter-tag.active {
  background: var(--accent-glow);
  border-color: var(--accent-color);
  color: var(--accent-color);
  font-weight: 500;
}

.skills-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-top: var(--space-md);
}

.skill-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: var(--space-md);
  transition: all 0.2s ease;
}

.skill-card:hover {
  border-color: var(--accent-color);
  box-shadow: 0 4px 20px var(--accent-glow);
}

.skill-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.skill-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main);
  margin: 0;
}

.skill-badge {
  font-size: 10px;
  background: var(--accent-glow);
  color: var(--accent-color);
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid var(--accent-border-dashed);
  text-transform: uppercase;
  font-weight: 600;
}

.skill-desc {
  font-size: 12.5px;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: var(--space-md);
}

.cli-command-box {
  background: var(--bg-pre);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: var(--space-md);
}

.cli-label {
  display: block;
  font-size: 9.5px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
  font-weight: 500;
}

.cli-input-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.cli-input-row code {
  font-family: monospace;
  font-size: 11.5px;
  color: var(--text-code);
}

.btn-copy-cli {
  background: var(--accent-glow);
  border: 1px solid var(--accent-border-dashed);
  color: var(--accent-color);
  font-size: 11px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 60px;
  text-align: center;
}

.btn-copy-cli:hover {
  background: var(--accent-glow);
  border-color: var(--accent-color);
}

.aesthetic-details {
  border-top: 1px dashed var(--border-color);
  padding-top: var(--space-sm);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.detail-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.detail-label {
  font-size: 10px;
  color: var(--text-muted);
  font-weight: 500;
}

.detail-val {
  font-size: 12px;
  color: var(--text-main);
}

.detail-rules-para {
  font-size: 11.5px;
  color: var(--text-dim);
  line-height: 1.4;
  margin: 0;
  font-style: italic;
}

.no-skills-found {
  text-align: center;
  padding: var(--space-lg) 0;
  color: var(--text-muted);
  font-size: 13px;
}

.cli-actions-row {
  display: flex;
  gap: 6px;
}

.btn-preview-skill {
  background: var(--accent-glow);
  border: 1px solid var(--accent-border-dashed);
  color: var(--accent-color);
  font-size: 11px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 60px;
  text-align: center;
}

.btn-preview-skill:hover {
  background: var(--accent-glow);
  border-color: var(--accent-color);
}
</style>
