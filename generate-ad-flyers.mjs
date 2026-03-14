import { fal } from "@fal-ai/client";
import { writeFile, readFile, mkdir } from "fs/promises";
import { join } from "path";
import "dotenv/config";

fal.config({ credentials: process.env.FAL_KEY });

const BASE = import.meta.dirname;
const OUTPUT_DIR = join(BASE, "generated-ad-flyers");

// Brand reference — logo only
const LOGO_PATH = join(BASE, "brand images", "WhatsApp Image 2026-01-29 at 00.36.14.jpeg");

async function uploadImage(filePath) {
  const name = filePath.split("/").pop();
  console.log(`  Uploading: ${name}`);
  const buffer = await readFile(filePath);
  const ext = filePath.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";
  const blob = new Blob([buffer], { type: ext });
  const url = await fal.storage.upload(blob);
  console.log(`  → ${url}`);
  return url;
}

// ═══════════════════════════════════════════════════════════════
// BRAND SYSTEM — TheHair0g Ad Creatives
// ═══════════════════════════════════════════════════════════════
// Gold/Mustard: #C5A33B
// Off-white/Cream: #F5F3EF
// Black: #1A1A1A
// NO PEOPLE. Typography-driven. Logo only. Clean graphic design.
// Font: Space Grotesk (geometric, modern sans-serif)
// ═══════════════════════════════════════════════════════════════

const prompts = [
  // ══════════════════════════════════════════════════════════
  // 1. PRICING BREAKDOWN — All 3 Tiers
  // ══════════════════════════════════════════════════════════
  {
    name: "01-pricing-tiers-breakdown",
    prompt: `Create an ultra-premium 4:5 portrait social media ad flyer for a luxury wig-making academy called "TheHairOg". NO PEOPLE, NO FACES, NO PHOTOGRAPHS OF HUMANS. Pure typography and graphic design only.

Use the exact "TheHairOg" gold script logo from the reference image.

BACKGROUND: Deep rich black (#1A1A1A) with very subtle gold (#C5A33B) radial gradient glow in the center — barely visible, just enough to add depth. Clean, dark, luxury. No textures, no patterns. Minimal.

COMPOSITION:
- TOP CENTER: The exact "TheHairOg" gold script logo from the reference. Beneath it in small gold tracked-out text: "WIG ACADEMY"
- A thin gold (#C5A33B) horizontal line divider.
- HEADLINE in white, Space Grotesk font, bold: "CHOOSE YOUR PATH"
- THREE VERTICAL PRICING CARDS arranged side by side, equal width, with small gaps between them:

  CARD 1 (left): Dark charcoal (#2A2A2A) rounded rectangle with gold (#C5A33B) thin border.
    - Top: Small gold text "STARTER"
    - Center: Large bold white text "₦100K"
    - Below: Small gray text list:
      "✓ 8-week classes"
      "✓ Core curriculum"
      "✗ No materials kit"
      "✗ No aftercare"
    - Bottom: Small gold outlined pill button "SELECT"

  CARD 2 (center): Slightly larger/taller than others. Gold (#C5A33B) background, black text. A small white badge at top reading "MOST POPULAR" in tiny black text.
    - Top: Small black text "STANDARD"
    - Center: Large bold black text "₦150K"
    - Below: Small black text list:
      "✓ 8-week classes"
      "✓ Core curriculum"
      "✓ Materials kit included"
      "✓ 30-day WhatsApp group"
    - Bottom: Black filled pill button with gold text "SELECT"

  CARD 3 (right): Dark charcoal (#2A2A2A) rounded rectangle with gold (#C5A33B) thin border.
    - Top: Small gold text "PREMIUM"
    - Center: Large bold white text "₦200K"
    - Below: Small gray text list:
      "✓ Everything in Standard"
      "✓ 60-day WhatsApp group"
      "✓ 1-on-1 follow-up"
      "✓ Certificate"
    - Bottom: Small gold outlined pill button "SELECT"

- Below cards: White text "Payment Plan Available · ₦50K Deposit"
- BOTTOM: Gold pill button "DM 'LEARN' TO ENROLL"
- Very bottom: Small gold text "8 Weeks · In-Person · Ibadan · 5 Students Max"

Clean SaaS-style pricing table on luxury dark background. No images, no people. Pure design. Space Grotesk font throughout. Ultra high quality render.`,
  },

  // ══════════════════════════════════════════════════════════
  // 2. SINGLE PRICE HOOK — "Starting from ₦100K"
  // ══════════════════════════════════════════════════════════
  {
    name: "02-starting-from-100k",
    prompt: `Create an ultra-premium 4:5 portrait social media ad flyer for a luxury wig-making academy called "TheHairOg". NO PEOPLE, NO FACES, NO PHOTOGRAPHS OF HUMANS. Pure typography and graphic design only.

Use the exact "TheHairOg" gold script logo from the reference image.

BACKGROUND: Warm off-white/cream (#F5F3EF) — clean, bright, minimal. Think Apple product page or Aesop branding. Completely clean.

COMPOSITION:
- TOP LEFT: The exact "TheHairOg" gold script logo from the reference, small.
- TOP RIGHT: Small black text "IBADAN, NIGERIA"
- CENTER — the entire middle section is dominated by massive typography in Space Grotesk font:
  Small black text above: "Learn to make wigs from scratch"
  Then MASSIVE bold black text, taking up 50% of the frame:
  "STARTING"
  "FROM"
  "₦100K"
  The "₦100K" is the largest element — enormous, bold, commanding. In gold (#C5A33B) color. The rest in black. Clean, stark, powerful against the cream background.
- BELOW: A thin gold horizontal line.
- Below line: Three small black text lines:
  "8-Week In-Person Programme"
  "Complete Beginner Friendly"
  "Payment Plans Available"
- BOTTOM: A black (#1A1A1A) filled rounded pill button with white text: "DM 'LEARN' TO START"
- Very bottom: Small gold text "Limited to 5 students per cohort"

Minimal, clean, bold price-focused ad. The ₦100K is the star. Cream and gold palette. No images, no clutter. Space Grotesk font. Ultra high quality render.`,
  },

  // ══════════════════════════════════════════════════════════
  // 3. PAYMENT PLAN HOOK — "₦50K Deposit"
  // ══════════════════════════════════════════════════════════
  {
    name: "03-payment-plan-50k-deposit",
    prompt: `Create an ultra-premium 4:5 portrait social media ad flyer for a luxury wig-making academy called "TheHairOg". NO PEOPLE, NO FACES, NO PHOTOGRAPHS OF HUMANS. Pure typography and graphic design only.

Use the exact "TheHairOg" gold script logo from the reference image.

BACKGROUND: Deep black (#1A1A1A). Clean, premium, stark.

COMPOSITION:
- TOP CENTER: The exact "TheHairOg" gold script logo from the reference.
- UPPER SECTION: Small gold (#C5A33B) pill badge with white text: "PAYMENT PLAN"
- CENTER — massive bold white typography in Space Grotesk:
  "SECURE YOUR"
  "SPOT WITH"
  "₦50K"
  The "₦50K" is enormous — the biggest element on the page. In bright gold (#C5A33B). The rest in crisp white. Bold, impactful.
- Below the big text: A thin gold line.
- MIDDLE: A clean breakdown in white text:
  "₦50,000 deposit → spot secured"
  "Balance before Week 3"
  "Start learning immediately"
  Each line has a small gold arrow or bullet point.
- BELOW: Three small gold-bordered rounded rectangles in a row showing tiers:
  "₦100K STARTER" | "₦150K STANDARD" | "₦200K PREMIUM"
  Small, clean, informational.
- BOTTOM: Gold filled rounded pill button with black text: "DM 'LEARN' NOW"
- Very bottom: Small white text "April Cohort · Ibadan · 5 Spots Only"

Bold deposit-focused ad that removes the price barrier. The ₦50K number is the hero. Dark premium background. Space Grotesk. Ultra high quality render.`,
  },

  // ══════════════════════════════════════════════════════════
  // 4. HOOK — "From Zero to Wig Maker in 8 Weeks"
  // ══════════════════════════════════════════════════════════
  {
    name: "04-zero-to-wigmaker-8-weeks",
    prompt: `Create an ultra-premium 4:5 portrait social media ad flyer for a luxury wig-making academy called "TheHairOg". NO PEOPLE, NO FACES, NO PHOTOGRAPHS OF HUMANS. Pure typography and graphic design only.

Use the exact "TheHairOg" gold script logo from the reference image.

BACKGROUND: Deep black (#1A1A1A) with a subtle elegant gold (#C5A33B) thin circular ring element in the background — like a minimalist decorative halo or arc. Barely there, just adds sophistication.

COMPOSITION:
- TOP LEFT: The exact "TheHairOg" gold script logo from the reference, small.
- CENTER — the entire composition is one powerful headline in Space Grotesk font, stacked vertically:
  "FROM" — medium white text
  "ZERO" — large bold white text
  "TO" — small white text
  "WIG MAKER" — massive bold gold (#C5A33B) text, the largest element
  "IN" — small white text
  "8 WEEKS." — large bold white text
  The text is stacked with intentional size variation — "WIG MAKER" is the star, "ZERO" and "8 WEEKS" are secondary heroes. Creates a visual rhythm. Left-aligned.
- RIGHT SIDE: A thin vertical gold line running from top to bottom as a design accent.
- BELOW TEXT: Thin gold horizontal line.
- Below line: Three small white text bullet points:
  "· Complete beginner friendly"
  "· In-person classes, Ibadan"
  "· Starting from ₦100K"
- BOTTOM: Gold outlined pill button with gold text: "DM 'LEARN' TO ENROLL"
- Very bottom: Small gold text "5 Students Per Cohort · April Intake Open"

Bold typographic poster. The words are the design. Dramatic size contrast creates visual interest. No images needed. Space Grotesk. Ultra high quality render.`,
  },

  // ══════════════════════════════════════════════════════════
  // 5. HOOK — "Stop Buying Wigs. Start Making Them."
  // ══════════════════════════════════════════════════════════
  {
    name: "05-stop-buying-start-making",
    prompt: `Create an ultra-premium 4:5 portrait social media ad flyer for a luxury wig-making academy called "TheHairOg". NO PEOPLE, NO FACES, NO PHOTOGRAPHS OF HUMANS. Pure typography and graphic design only.

Use the exact "TheHairOg" gold script logo from the reference image.

BACKGROUND: Split background — top half is cream/off-white (#F5F3EF), bottom half is deep black (#1A1A1A). A clean horizontal divide at the center. Bold contrast.

COMPOSITION:
- TOP LEFT (on cream): The exact "TheHairOg" gold script logo from the reference.
- UPPER HALF (on cream background): Large bold BLACK text in Space Grotesk font:
  "STOP"
  "BUYING"
  "WIGS."
  Stacked, left-aligned, bold, commanding. Each word on its own line. A thin red or dark line through the text — like a strikethrough — subtle, indicating "stop this."
- LOWER HALF (on black background): Large bold WHITE text in Space Grotesk font:
  "START"
  "MAKING"
  "THEM."
  Same size, same alignment, mirroring the top. But this text glows slightly with warm gold (#C5A33B) accent — it's the positive message. "MAKING" is in gold (#C5A33B).
- The split creates a powerful before/after visual contrast using only typography.
- BELOW TEXT: Small white text on the dark half: "8-Week Wig Academy · Ibadan · From ₦100K"
- BOTTOM: Gold filled pill button with black text: "DM 'LEARN' TO START"
- Very bottom: Small gold text "TheHairOg Wig Academy"

Split-screen typographic ad. The contrast between cream/black and stop/start creates instant visual impact. No images needed — the words ARE the design. Space Grotesk. Ultra high quality render.`,
  },

  // ══════════════════════════════════════════════════════════
  // 6. HOOK — "5 Students Per Cohort. That's It."
  // ══════════════════════════════════════════════════════════
  {
    name: "06-five-students-exclusivity",
    prompt: `Create an ultra-premium 4:5 portrait social media ad flyer for a luxury wig-making academy called "TheHairOg". NO PEOPLE, NO FACES, NO PHOTOGRAPHS OF HUMANS. Pure typography and graphic design only.

Use the exact "TheHairOg" gold script logo from the reference image.

BACKGROUND: Deep black (#1A1A1A). Minimal. Premium. In the background, very faintly — five small gold (#C5A33B) circles arranged in a horizontal row in the upper area, like five seats or five dots. Subtle, barely visible, representing the 5 spots.

COMPOSITION:
- TOP CENTER: The exact "TheHairOg" gold script logo from the reference.
- CENTER — massive typography in Space Grotesk, centered:
  A huge gold (#C5A33B) number "5" — enormous, taking up significant space. Bold, heavy weight.
  Below it in white text:
  "STUDENTS"
  "PER COHORT."
  Then a pause (white space).
  Then in smaller gold text, slightly italic or lighter weight:
  "That's it."
  The "That's it." adds personality and exclusivity. It's understated compared to the bold "5".
- BELOW: A thin gold horizontal line.
- Below line: Clean white text:
  "Personal attention. Real skills."
  "Not a lecture hall — a workshop."
- LOWER SECTION: Three small pieces of info in gold-bordered minimal cards:
  "8 WEEKS" | "IN-PERSON" | "IBADAN"
  Small, clean, horizontal row.
- BOTTOM: Gold outlined pill button: "DM 'LEARN' FOR APRIL COHORT"
- Very bottom: Small white text "From ₦100K · Payment Plans Available"

Exclusivity-driven ad. The number 5 is the hero — it says "this is rare, this is premium." Minimal, typographic, luxury. Space Grotesk. Ultra high quality render.`,
  },

  // ══════════════════════════════════════════════════════════
  // 7. HOOK — "Your First Wig. Your First Client. 8 Weeks."
  // ══════════════════════════════════════════════════════════
  {
    name: "07-first-wig-first-client",
    prompt: `Create an ultra-premium 4:5 portrait social media ad flyer for a luxury wig-making academy called "TheHairOg". NO PEOPLE, NO FACES, NO PHOTOGRAPHS OF HUMANS. Pure typography and graphic design only.

Use the exact "TheHairOg" gold script logo from the reference image.

BACKGROUND: Warm cream/off-white (#F5F3EF). Clean, bright, minimal. Luxury editorial print ad feel — like a high-end magazine advertisement.

COMPOSITION:
- TOP LEFT: The exact "TheHairOg" gold script logo from the reference, small and elegant.
- TOP RIGHT: Small black text "EST. IBADAN"
- CENTER — bold typographic layout in Space Grotesk, left-aligned:
  "Your first wig." — in black, medium-large, elegant
  Below with slight spacing:
  "Your first client." — in black, medium-large, elegant
  Below with more spacing:
  "8 weeks." — in bold gold (#C5A33B), larger than the lines above. Confident, punchy.

  The three lines create a narrative rhythm — each line builds on the last. Simple. Powerful. The period at the end of each line adds authority.
- A thin gold (#C5A33B) vertical line accent on the left side, running along the text block.
- BELOW TEXT: A thin gold horizontal line divider.
- Below divider: Small black text:
  "In-person wig-making programme"
  "Complete beginners welcome"
  "From ₦100K · Payment plans available"
- BOTTOM: A black (#1A1A1A) filled rounded pill button with white text: "DM 'LEARN' TO ENROLL"
- Very bottom: Small gold text "April Cohort · 5 Spots · Ibadan, Nigeria"

Clean editorial ad — like something you'd see in Vogue or a luxury brand print campaign. The three-line narrative is the entire design. Cream background, gold accents. Space Grotesk. Ultra high quality render.`,
  },

  // ══════════════════════════════════════════════════════════
  // 8. HOOK — "₦150K Now or ₦500K+ on Wigs Forever?"
  // ══════════════════════════════════════════════════════════
  {
    name: "08-150k-now-vs-500k-forever",
    prompt: `Create an ultra-premium 4:5 portrait social media ad flyer for a luxury wig-making academy called "TheHairOg". NO PEOPLE, NO FACES, NO PHOTOGRAPHS OF HUMANS. Pure typography and graphic design only.

Use the exact "TheHairOg" gold script logo from the reference image.

BACKGROUND: Deep black (#1A1A1A) with subtle dark texture.

COMPOSITION:
- TOP CENTER: The exact "TheHairOg" gold script logo from the reference.
- UPPER AREA: Small gold pill badge: "THINK ABOUT IT"
- CENTER — a bold visual comparison using typography only, Space Grotesk font:

  LEFT/TOP OPTION (the bad choice):
  A dark gray (#333333) rounded rectangle card.
  Inside: "Keep buying wigs" in small gray text at top.
  Large white text: "₦500K+"
  Below: Small gray text "spent on wigs over 2 years"
  A small red "✗" icon. The card feels dull, expensive, wasteful.

  A gold "VS" text between the two cards, with small decorative gold lines on either side.

  RIGHT/BOTTOM OPTION (the good choice):
  A gold (#C5A33B) bordered rounded rectangle card with slight gold glow.
  Inside: "Learn to make them" in small gold text at top.
  Large bold white text: "₦150K"
  Below: Small white text "one-time · skill for life"
  A small gold "✓" icon. The card feels premium, smart, valuable.

- BELOW CARDS: Bold white headline text:
  "THE MATH IS SIMPLE."
  Clean, direct, Space Grotesk bold.
- Below: Small white text: "8-week wig-making programme · Ibadan"
- BOTTOM: Gold filled pill button with black text: "DM 'LEARN' · APRIL COHORT"
- Very bottom: Small gold text "Payment plans from ₦50K deposit"

Comparison ad that makes the decision obvious. The visual contrast between the dull "keep buying" card and the premium "learn to make" card drives the message home. No images — pure design logic. Space Grotesk. Ultra high quality render.`,
  },

  // ══════════════════════════════════════════════════════════
  // 9. HOOK — "Been Looking to Learn a New Skill?"
  // ══════════════════════════════════════════════════════════
  {
    name: "09-learn-a-new-skill",
    prompt: `Create an ultra-premium 4:5 portrait social media ad flyer for a luxury wig-making academy called "TheHairOg". NO PEOPLE, NO FACES, NO PHOTOGRAPHS OF HUMANS. Pure typography and graphic design only.

Use the exact "TheHairOg" gold script logo from the reference image.

BACKGROUND: Warm cream/off-white (#F5F3EF). Clean, bright, inviting. Minimal luxury editorial aesthetic.

COMPOSITION:
- TOP LEFT: The exact "TheHairOg" gold script logo from the reference, small.
- UPPER CENTER: A small black rounded pill badge with white text: "HONEST QUESTION"
- CENTER — bold typographic layout in Space Grotesk font, centered:
  "Been looking to"
  "learn a new skill"
  "this year?"
  In medium-large black text, elegant, conversational but bold. The word "skill" is in gold (#C5A33B) and slightly larger/bolder than the rest.
- BELOW — after a pause of white space:
  "This is your sign." in smaller gold (#C5A33B) italic or lighter weight text. Personal, warm.
- BELOW: A thin gold horizontal line divider.
- LOWER SECTION — a clean minimal list with small gold bullet dots:
  "· Learn to make wigs from scratch"
  "· Revamp & repair professionally"
  "· Start a wig business in 8 weeks"
  "· No experience needed"
  In small clean black text, well-spaced.
- BELOW LIST: Small black text: "In-person · Ibadan · From ₦100K"
- BOTTOM: A black (#1A1A1A) filled rounded pill button with white text: "DM 'LEARN' FOR DETAILS"
- Very bottom: Small gold text "April Cohort · 5 Spots Only"

Conversational, warm, relatable hook that speaks to women already thinking about learning something new. Clean cream palette. No hard sell — just a gentle nudge. Space Grotesk. Ultra high quality render.`,
  },

  // ══════════════════════════════════════════════════════════
  // 10. HOOK — "What If You Could Make Your Own Wigs?"
  // ══════════════════════════════════════════════════════════
  {
    name: "10-what-if-you-could",
    prompt: `Create an ultra-premium 4:5 portrait social media ad flyer for a luxury wig-making academy called "TheHairOg". NO PEOPLE, NO FACES, NO PHOTOGRAPHS OF HUMANS. Pure typography and graphic design only.

Use the exact "TheHairOg" gold script logo from the reference image.

BACKGROUND: Deep black (#1A1A1A) with a very subtle warm gold (#C5A33B) glow in the center — soft, ambient, premium.

COMPOSITION:
- TOP CENTER: The exact "TheHairOg" gold script logo from the reference.
- UPPER AREA: Small gold text "IMAGINE THIS" in tracked-out letters.
- CENTER — powerful headline typography in Space Grotesk, centered:
  "WHAT IF"
  "YOU COULD"
  "MAKE YOUR"
  "OWN WIGS?"
  Large bold white text. "OWN WIGS?" is in gold (#C5A33B) and the largest/boldest line. The question format is engaging and makes the reader think.
- BELOW — after white space:
  Three lines in smaller white text, each starting with a gold "→" arrow:
  "→ Save money on wigs forever"
  "→ Make wigs for friends & family"
  "→ Turn it into a paying business"
- BELOW: A thin gold line divider.
- LOWER SECTION: Clean white text:
  "8-Week In-Person Programme"
  "Complete Beginners Welcome"
  "Ibadan · From ₦100K"
- BOTTOM: Gold (#C5A33B) filled pill button with black text: "DM 'LEARN' · APRIL COHORT"
- Very bottom: Small white text "Limited to 5 students · Payment plans available"

Aspirational question hook that makes the reader imagine the possibility. The "what if" format is engaging and curiosity-driven. Dark premium background with gold accents. Space Grotesk. Ultra high quality render.`,
  },
];

// ═══════════════════════════════════════════════════════════════
// GENERATION ENGINE
// ═══════════════════════════════════════════════════════════════

async function generateBase(item, index) {
  const label = `[${index + 1}/${prompts.length}] ${item.name}`;
  console.log(`\n${label} — generating base (nano-banana-2)...`);

  try {
    const result = await fal.subscribe("fal-ai/nano-banana-2", {
      input: {
        prompt: item.prompt,
        aspect_ratio: "4:5",
        num_images: 1,
        output_format: "png",
        safety_tolerance: "4",
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs?.map((l) => l.message).forEach((m) => console.log(`  ${label}: ${m}`));
        } else {
          console.log(`  ${label}: ${update.status}`);
        }
      },
    });

    const imageUrl = result.data.images?.[0]?.url;
    if (!imageUrl) { console.error(`  ${label} — no image`); return null; }

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await fetch(imageUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buffer = Buffer.from(await res.arrayBuffer());
        const filePath = join(OUTPUT_DIR, `${item.name}_base_${Date.now()}.png`);
        await writeFile(filePath, buffer);
        console.log(`  ${label} — base saved`);
        return filePath;
      } catch (fetchErr) {
        console.log(`  ${label} — fetch attempt ${attempt + 1} failed: ${fetchErr.message}`);
        if (attempt < 2) await new Promise(r => setTimeout(r, 3000));
      }
    }
    console.error(`  ${label} — all fetch attempts failed`);
    return null;
  } catch (err) {
    console.error(`  ${label} — ERROR: ${err.message}`);
    return null;
  }
}

async function refineWithLogo(item, index, basePath, logoUrl) {
  const label = `[${index + 1}/${prompts.length}] ${item.name} (edit)`;
  console.log(`\n${label} — refining with real logo...`);

  try {
    const baseBuffer = await readFile(basePath);
    const baseBlob = new Blob([baseBuffer], { type: "image/png" });
    const baseUrl = await fal.storage.upload(baseBlob);

    const editPrompt = `Refine this flyer design using the reference logo image. The logo MUST be the exact "TheHairOg" gold script logo from the reference — same handwritten calligraphic style, same gold (#C5A33B) color, same elegant script font. Include "WIG MAKING & REVAMP & INSTALLATIONS" subtitle beneath the logo where appropriate.

CRITICAL: Do NOT add any people, faces, or human photographs. Keep the design purely typographic and graphic. Maintain the exact same layout, text content, colors, and composition from the base image. Only replace/improve the logo to match the reference exactly.

All text must be crisp, readable, correctly spelled. Space Grotesk font for body text. 4:5 portrait ratio. Ultra high quality render.`;

    const result = await fal.subscribe("fal-ai/nano-banana-2/edit", {
      input: {
        prompt: editPrompt,
        image_urls: [baseUrl, logoUrl],
        aspect_ratio: "4:5",
        num_images: 1,
        output_format: "png",
        safety_tolerance: "4",
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs?.map((l) => l.message).forEach((m) => console.log(`  ${label}: ${m}`));
        } else {
          console.log(`  ${label}: ${update.status}`);
        }
      },
    });

    const imageUrl = result.data.images?.[0]?.url;
    if (!imageUrl) { console.error(`  ${label} — no image`); return null; }

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await fetch(imageUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buffer = Buffer.from(await res.arrayBuffer());
        const filePath = join(OUTPUT_DIR, `${item.name}_final_${Date.now()}.png`);
        await writeFile(filePath, buffer);
        console.log(`  ${label} — final saved`);
        return filePath;
      } catch (fetchErr) {
        console.log(`  ${label} — fetch attempt ${attempt + 1} failed: ${fetchErr.message}`);
        if (attempt < 2) await new Promise(r => setTimeout(r, 3000));
      }
    }
    console.error(`  ${label} — all fetch attempts failed`);
    return null;
  } catch (err) {
    console.error(`  ${label} — ERROR: ${err.message}`);
    return null;
  }
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  console.log("═══════════════════════════════════════════════════");
  console.log("  TheHairOg — Ad Creative Flyers");
  console.log("  8 Hook-Driven Ads · 4:5 · No People · Pure Design");
  console.log("═══════════════════════════════════════════════════\n");

  // Upload logo reference only
  console.log("Uploading logo reference...\n");
  const logoUrl = await uploadImage(LOGO_PATH);
  console.log(`\n=== Logo reference ready ===\n`);

  const arg = process.argv[2] || "all";
  const selectedPrompts =
    arg === "all"
      ? prompts.map((p, i) => [p, i])
      : (() => {
          const idx = parseInt(arg, 10) - 1;
          if (idx < 0 || idx >= prompts.length) {
            console.error(`Invalid. Use 1-${prompts.length} or "all".`);
            process.exit(1);
          }
          return [[prompts[idx], idx]];
        })();

  console.log(`Generating ${selectedPrompts.length} ad flyer(s)...\n`);

  for (let i = 0; i < selectedPrompts.length; i++) {
    const [item, index] = selectedPrompts[i];
    const basePath = await generateBase(item, index);
    if (!basePath) continue;
    await refineWithLogo(item, index, basePath, logoUrl);
    // Small delay between flyers to avoid rate limits
    if (i < selectedPrompts.length - 1) {
      console.log(`\n  — pausing 2s before next flyer —`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  console.log("\n═══════════════════════════════════════════════════");
  console.log("  AD FLYER GENERATION COMPLETE");
  console.log("═══════════════════════════════════════════════════");
  console.log("  No people · Typography-driven · Space Grotesk");
  console.log("  Gold #C5A33B · Black #1A1A1A · Cream #F5F3EF");
  console.log("  Output: ./generated-ad-flyers/");
  console.log("═══════════════════════════════════════════════════");
}

main();
