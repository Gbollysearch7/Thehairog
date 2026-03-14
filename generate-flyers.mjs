import { fal } from "@fal-ai/client";
import { writeFile, readFile, mkdir } from "fs/promises";
import { join } from "path";
import "dotenv/config";

fal.config({ credentials: process.env.FAL_KEY });

const BASE = import.meta.dirname;
const OUTPUT_DIR = join(BASE, "generated-flyers");

// Brand reference images — logo + CEO photo
const REFERENCE_IMAGES = [
  join(BASE, "brand images", "WhatsApp Image 2026-01-29 at 00.36.14.jpeg"), // Logo
  join(BASE, "brand images", "WhatsApp Image 2026-02-12 at 15.24.22.jpeg"), // CEO
];

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
// BRAND SYSTEM — TheHair0g
// ═══════════════════════════════════════════════════════════════
// Gold/Mustard: #C5A33B (from logo)
// Off-white: #F5F5F3 (logo background)
// Black: #1A1A1A (contrast/premium)
// Warm brown: #C27030 (CEO styling accent)
// Style: Luxury minimalist, beauty editorial, warm tones
// Logo: Gold script "TheHairOg" with "WIG MAKING & REVAMP & INSTALLATIONS"
// CEO: Young Nigerian woman, warm styling
// ═══════════════════════════════════════════════════════════════

const prompts = [
  // ══════════════════════════════════════════════════════════
  // 1. ENROLLMENT FLYER — "April Cohort Now Open"
  // ══════════════════════════════════════════════════════════
  {
    name: "01-april-cohort-now-open",
    prompt: `Create an ultra-premium 4:5 portrait social media flyer for a luxury wig-making academy called "TheHairOg" based in Ibadan, Nigeria. Use the exact logo and the exact face/appearance of the woman from the reference images.

BACKGROUND: Rich deep black (#1A1A1A) with subtle warm gold (#C5A33B) gradient glow emanating softly from the center. Luxury beauty brand aesthetic — think Fenty Beauty, Charlotte Tilbury campaigns. Clean, editorial, high-fashion.

COMPOSITION:
- TOP CENTER: The exact "TheHairOg" logo from the reference image — gold script lettering on the dark background. Must match the logo exactly.
- BELOW LOGO: A thin gold (#C5A33B) horizontal line divider, elegant and minimal.
- CENTER: The woman from the reference image (exact same face, skin tone, features) styled beautifully — wearing an elegant outfit, confident pose, looking directly at viewer. She is styled with a gorgeous professionally-made wig — long, flowing, luxurious dark hair. Soft warm studio lighting, beauty editorial photography style. Gold rim lighting on one side. She represents the educator/expert.
- BELOW HER: Large bold white headline text in clean elegant sans-serif font:
  "APRIL COHORT"
  "NOW OPEN"
  The words are large, bold, commanding. Use "Space Grotesk" font — geometric, modern, clean sans-serif with slight quirky character. Bold weight.
- BELOW HEADLINE: Three elegant gold-bordered rounded cards side by side showing the pricing tiers:
  "STARTER ₦100K" | "STANDARD ₦150K" | "PREMIUM ₦200K"
  Each in small clean white text inside gold-bordered pill shapes.
- BELOW TIERS: Clean white text: "8 Weeks · In-Person · Ibadan"
- BOTTOM: Small white text "DM 'LEARN' to Enroll" with a gold arrow icon pointing right.
- VERY BOTTOM: Thin gold line, then "Limited to 5 Students" in small gold text.

Luxury beauty academy feel. Gold and black dominate. The woman's face must match the reference exactly. Ultra high quality render, beauty editorial photography lighting.`,
  },

  // ══════════════════════════════════════════════════════════
  // 2. URGENCY FLYER — "2 Spots Left"
  // ══════════════════════════════════════════════════════════
  {
    name: "02-two-spots-left",
    prompt: `Create an ultra-premium 4:5 portrait social media flyer for a luxury wig-making academy called "TheHairOg" based in Ibadan, Nigeria. Use the exact logo and the exact face/appearance of the woman from the reference images.

BACKGROUND: Deep black (#1A1A1A) with dramatic warm gold (#C5A33B) spotlight effect from the top, creating a luxury stage/spotlight atmosphere. High contrast. Urgent but premium — not cheap or loud.

COMPOSITION:
- TOP LEFT: The exact "TheHairOg" logo from the reference image — gold script lettering. Must match exactly.
- TOP RIGHT: A small elegant gold badge/seal with "APRIL COHORT" in tiny white text.
- CENTER: Massive bold typography dominating the frame:
  "ONLY"
  "2 SPOTS"
  "LEFT."
  "ONLY" in gold (#C5A33B), "2 SPOTS" in pure white, enormous and bold. "LEFT." in gold. Use "Space Grotesk" font — geometric, modern, clean sans-serif with slight quirky character. Extra bold weight. The text fills the middle 60% of the frame vertically.
- Behind the text: A very subtle, slightly transparent image of the woman from the reference (exact same face) — like a soft editorial overlay/watermark behind the text. She's looking confident, slightly to the side. Soft, dreamy, faded — the text is dominant.
- BELOW TEXT: A thin gold horizontal line.
- BELOW LINE: Clean white text:
  "8-Week In-Person Wig Academy"
  "From Zero to Wig Maker"
- BOTTOM: An elegant gold (#C5A33B) rounded pill button shape with white text inside: "DM 'LEARN' NOW"
- VERY BOTTOM: "Ibadan, Nigeria" in small gold text.

Urgency meets luxury. The large "2 SPOTS LEFT" text creates FOMO while maintaining premium beauty brand aesthetics. Gold and black palette. Ultra high quality.`,
  },

  // ══════════════════════════════════════════════════════════
  // 3. EDUCATIONAL — "5 Signs Your Wig Needs Revamping"
  // ══════════════════════════════════════════════════════════
  {
    name: "03-five-signs-wig-revamp",
    prompt: `Create an ultra-premium 4:5 portrait social media carousel cover slide for a luxury wig-making academy called "TheHairOg" based in Ibadan, Nigeria. Use the exact logo from the reference images.

BACKGROUND: Warm off-white/cream (#F5F3EF) background — clean, minimal, editorial. Think Glossier or Aesop branding. Subtle very faint gold (#C5A33B) geometric pattern or fine lines in the background adding texture without distraction.

COMPOSITION:
- TOP LEFT: The exact "TheHairOg" logo from the reference image — gold script lettering on the light background. Must match exactly.
- TOP RIGHT: Small text "SWIPE →" in gold with an arrow, indicating carousel.
- CENTER: Bold black (#1A1A1A) headline text, large and commanding:
  "5 SIGNS"
  "YOUR WIG NEEDS"
  "REVAMPING"
  Clean, modern serif or elegant sans-serif. "5" is extra large, like a feature number. Premium magazine editorial typography.
- LEFT SIDE: Five small gold (#C5A33B) numbered circles stacked vertically: "1" "2" "3" "4" "5" — hinting at the list content inside the carousel.
- BOTTOM AREA: A beautiful high-quality photograph of a luxury wig on a wig stand, dramatically lit against the cream background. The wig is slightly imperfect — showing subtle signs it needs care (slightly frizzy, dull). Soft shadow beneath. Beauty product photography style.
- VERY BOTTOM: Thin gold line, then "Follow @TheHairOg for more tips" in small elegant black text.

Educational content cover with luxury magazine editorial aesthetic. Cream and gold palette. Clean, minimal, authoritative. Ultra high quality render.`,
  },

  // ══════════════════════════════════════════════════════════
  // 4. EDUCATIONAL — "How to Source Quality Hair"
  // ══════════════════════════════════════════════════════════
  {
    name: "04-source-quality-hair",
    prompt: `Create an ultra-premium 4:5 portrait social media carousel cover slide for a luxury wig-making academy called "TheHairOg" based in Ibadan, Nigeria. Use the exact logo from the reference images.

BACKGROUND: Deep rich black (#1A1A1A) with elegant warm gold (#C5A33B) accent lighting. Luxury editorial aesthetic — dark, moody, premium.

COMPOSITION:
- TOP LEFT: The exact "TheHairOg" logo from the reference image — gold script lettering on the dark background. Must match exactly.
- TOP RIGHT: Small gold text "GUIDE →" with arrow indicating carousel.
- UPPER CENTER: Small gold pill badge: "HAIR SOURCING 101"
- CENTER: Large bold white headline text in premium sans-serif font:
  "HOW TO SOURCE"
  "QUALITY HAIR"
  "IN NIGERIA"
  Clean, bold, commanding. "QUALITY" in gold (#C5A33B), rest in white.
- BELOW HEADLINE: Smaller white text with slight transparency: "Without Getting Scammed"
- LOWER CENTER: A stunning flat-lay photograph of premium hair bundles, weaves, and closures arranged beautifully on dark fabric — luxury product photography style. Warm lighting, golden tones. Hair textures visible — body wave, straight, curly bundles. Labels and packaging visible suggesting quality. Shot from above like a beauty editorial.
- Small gold icons beneath the hair photo: a checkmark, a location pin, a price tag — representing quality, sourcing locations, and fair pricing.
- VERY BOTTOM: "Save this for later 🔖" in small white text, then thin gold line.

Dark luxury editorial with educational authority. Gold and black. Magazine-quality product photography of hair bundles. Ultra high quality render.`,
  },

  // ══════════════════════════════════════════════════════════
  // 5. BEFORE & AFTER — Wig Transformation
  // ══════════════════════════════════════════════════════════
  {
    name: "05-before-after-transformation",
    prompt: `Create an ultra-premium 4:5 portrait social media post for a luxury wig-making academy called "TheHairOg" based in Ibadan, Nigeria. Use the exact logo from the reference images. This is a before/after wig transformation post.

BACKGROUND: Clean off-white/cream (#F5F3EF) background at the top, transitioning to deep black (#1A1A1A) at the bottom — a dramatic split representing the transformation.

COMPOSITION:
- TOP CENTER: The exact "TheHairOg" logo from the reference image — gold script lettering. Must match exactly.
- BELOW LOGO: Small gold text "THE TRANSFORMATION" in elegant tracking/letter-spacing.
- CENTER — SPLIT FRAME:
  - LEFT HALF labeled "BEFORE" in small red/brown text at the top: A photograph of a damaged, matted, frizzy old wig on a wig stand. Dull, lifeless, tangled. Shot on the light cream background. Soft natural lighting. The wig looks worn out and needs serious help.
  - A vertical gold (#C5A33B) line divider in the center with a small gold arrow pointing from left to right.
  - RIGHT HALF labeled "AFTER" in small gold text at the top: The SAME wig, now beautifully revamped — sleek, glossy, flowing, perfectly styled on a wig stand. Rich, healthy-looking hair. Shot on the dark background. Dramatic beauty lighting with golden highlights. The wig looks brand new, luxurious.
- BELOW SPLIT: Large bold text:
  "REVAMPED BY"
  "THEHAIROG"
  In white on the dark lower background. "THEHAIROG" in gold (#C5A33B).
- BOTTOM: Small white text "Learn this skill in 8 weeks · DM 'LEARN'" then thin gold line.

Dramatic before/after contrast. Left side light and damaged, right side dark and luxurious. Gold divider. Beauty editorial quality. Ultra high quality render.`,
  },

  // ══════════════════════════════════════════════════════════
  // 6. TESTIMONIAL / SOCIAL PROOF
  // ══════════════════════════════════════════════════════════
  {
    name: "06-student-testimonial",
    prompt: `Create an ultra-premium 4:5 portrait social media testimonial post for a luxury wig-making academy called "TheHairOg" based in Ibadan, Nigeria. Use the exact logo from the reference images.

BACKGROUND: Soft warm blurred background — out-of-focus image of a beautiful wig studio workspace with warm golden lighting. Bokeh effect. Warm, inviting, aspirational. Think luxury salon atmosphere.

COMPOSITION:
- TOP LEFT: The exact "TheHairOg" logo from the reference image — gold script lettering. Must match exactly.
- TOP RIGHT: Five small gold (#C5A33B) star icons in a row — ★★★★★ — representing 5-star review.
- CENTER: A large elegant gold (#C5A33B) opening quotation mark " at the top-left of the quote area, very large and decorative.
- THE QUOTE in large clean white text on the warm blurred background, elegant serif font:
  "I came in knowing nothing"
  "about wigs. 8 weeks later,"
  "I made my first wig and"
  "got my first paying client."
  Beautiful, readable, premium typography. The text is large enough to be the focal point.
- A large elegant gold closing quotation mark " at the bottom-right of the quote.
- BELOW QUOTE: A thin gold horizontal line.
- BELOW LINE: Small white text:
  "— Folake A."
  "April Cohort Graduate"
  Clean attribution with name and cohort.
- BOTTOM: A soft gold pill badge: "JOIN THE NEXT COHORT · DM 'LEARN'"
- VERY BOTTOM: Small white text "TheHairOg Wig Academy · Ibadan"

Warm, emotional, aspirational testimonial. Gold quotation marks frame the quote beautifully. Blurred salon background adds warmth. Ultra high quality render.`,
  },

  // ══════════════════════════════════════════════════════════
  // 7. CURRICULUM BREAKDOWN — "8 Weeks"
  // ══════════════════════════════════════════════════════════
  {
    name: "07-curriculum-8-weeks",
    prompt: `Create an ultra-premium 4:5 portrait social media post for a luxury wig-making academy called "TheHairOg" based in Ibadan, Nigeria. Use the exact logo from the reference images. This shows the full 8-week curriculum.

BACKGROUND: Deep rich black (#1A1A1A) with subtle warm gold (#C5A33B) gradient accents. Luxury editorial — dark, premium, authoritative.

COMPOSITION:
- TOP CENTER: The exact "TheHairOg" logo from the reference image — gold script lettering on the dark background. Must match exactly.
- BELOW LOGO: Small gold text "WIG ACADEMY" in elegant letter-spacing.
- HEADLINE: Large bold white text:
  "WHAT YOU'LL LEARN"
  "IN 8 WEEKS"
  "8" is extra large, in gold (#C5A33B). Rest in white. Premium sans-serif font.
- BELOW HEADLINE: A beautiful vertical TIMELINE layout with gold (#C5A33B) connecting line on the left side and gold circle markers at each stop:
  - Gold circle "1-2" → White text "FOUNDATIONS" then smaller gray text "Wig types, tools & workspace setup"
  - Gold circle "3-4" → White text "SOURCING" then smaller gray text "Quality hair & materials in Nigeria"
  - Gold circle "5-6" → White text "WIG MAKING" then smaller gray text "Full construction, closure & finishing"
  - Gold circle "7" → White text "REVAMPING" then smaller gray text "Restoring wigs professionally"
  - Gold circle "8" → White text "BUSINESS" then smaller gray text "Pricing, clients & getting paid"
  The timeline is clean, minimal, well-spaced. Each week section is clearly readable. The gold connecting line runs vertically on the left connecting all circles.
- BOTTOM: A gold (#C5A33B) rounded pill button: "ENROLL NOW · DM 'LEARN'"
- VERY BOTTOM: Small gold text "5 Students Per Cohort · Ibadan, Nigeria"

Dark premium background with gold timeline. Educational yet luxurious. The curriculum feels like a premium programme, not a casual class. Ultra high quality render.`,
  },

  // ══════════════════════════════════════════════════════════
  // 8. BRAND INTRO — "Meet Your Educator"
  // ══════════════════════════════════════════════════════════
  {
    name: "08-meet-your-educator",
    prompt: `Create an ultra-premium 4:5 portrait social media post for a luxury wig-making academy called "TheHairOg" based in Ibadan, Nigeria. Use the exact logo and the exact face/appearance of the woman from the reference images. This is a personal brand introduction post.

BACKGROUND: Warm cream/off-white (#F5F3EF) upper half transitioning to deep black (#1A1A1A) lower half — editorial fashion split. Like a Vogue or Elle portrait.

COMPOSITION:
- TOP CENTER: The exact "TheHairOg" logo from the reference image — gold script lettering. Must match exactly.
- CENTER: A stunning large editorial portrait of the woman from the reference image (exact same face, skin tone, features). She is styled elegantly — beautiful makeup, a gorgeous professionally-styled wig (long, sleek, luxurious dark hair), wearing a chic outfit. She's looking at the camera with confidence and warmth. Fashion editorial photography — soft directional lighting, one side of her face beautifully lit with warm golden light, the other side in gentle shadow. She fills the center 70% of the frame. Beauty magazine quality. Her styling says "expert" and "professional" — not casual. Gold jewelry accessories (earrings, maybe a bracelet) complement the brand colors.
- The portrait spans both the light and dark halves of the background, creating a striking editorial effect.
- BELOW HER (on the dark background): Elegant white text:
  "MEET YOUR EDUCATOR"
  in clean tracked-out sans-serif, with a thin gold line above it.
- BELOW: Smaller white text:
  "Wig Maker · Educator · Business Builder"
  "Teaching women in Ibadan to make, revamp"
  "& build a wig business from scratch"
- BOTTOM: Gold pill badge: "APRIL COHORT OPEN · DM 'LEARN'"
- VERY BOTTOM: Small gold text "8-Week In-Person Programme · Limited Spots"

High-fashion beauty editorial portrait. The woman looks aspirational — someone you'd trust to teach you. Warm golden tones. Magazine cover quality. Ultra high quality render.`,
  },
];

// ═══════════════════════════════════════════════════════════════
// GENERATION ENGINE
// ═══════════════════════════════════════════════════════════════

async function generateTextToImage(item, index) {
  const label = `[${index + 1}/${prompts.length}] ${item.name}`;
  console.log(`\n${label} — submitting to nano-banana-2 (text-to-image)...`);

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
    if (!imageUrl) {
      console.error(`  ${label} — no image URL`);
      return null;
    }

    const res = await fetch(imageUrl);
    const buffer = Buffer.from(await res.arrayBuffer());
    const filePath = join(OUTPUT_DIR, `${item.name}_base_${Date.now()}.png`);
    await writeFile(filePath, buffer);
    console.log(`  ${label} — base saved: ${filePath}`);
    return filePath;
  } catch (err) {
    console.error(`  ${label} — ERROR: ${err.message}`);
    return null;
  }
}

async function refineWithEdit(item, index, basePath, referenceUrls) {
  const label = `[${index + 1}/${prompts.length}] ${item.name} (edit)`;
  console.log(`\n${label} — refining with nano-banana-2/edit using brand references...`);

  try {
    // Upload the base image
    const baseBuffer = await readFile(basePath);
    const baseBlob = new Blob([baseBuffer], { type: "image/png" });
    const baseUrl = await fal.storage.upload(baseBlob);

    const allImageUrls = [baseUrl, ...referenceUrls];

    const editPrompt = `Using the reference images provided — the EXACT "TheHairOg" gold script logo and the EXACT face/appearance of the young Nigerian woman — refine this flyer design.

CRITICAL REQUIREMENTS:
1. The logo MUST be the exact "TheHairOg" gold script logo from the reference — same lettering style, same gold (#C5A33B) color, same elegant handwritten script font. Include the subtitle "WIG MAKING & REVAMP & INSTALLATIONS" beneath it.
2. Where the woman appears, her face MUST match the reference photo exactly — same facial features, same skin tone, same appearance. Style her with a luxurious wig and elegant outfit.
3. Maintain the exact same layout, text content, and composition from the base image.
4. Keep the premium luxury beauty brand aesthetic — gold (#C5A33B) and black (#1A1A1A) palette.
5. All text must be crisp, readable, and correctly spelled.
6. 4:5 portrait ratio. Ultra high quality beauty editorial render.

Preserve every design element from the base image but ensure brand accuracy with the real logo and real face from references.`;

    const result = await fal.subscribe("fal-ai/nano-banana-2/edit", {
      input: {
        prompt: editPrompt,
        image_urls: allImageUrls,
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
    if (!imageUrl) {
      console.error(`  ${label} — no image URL`);
      return null;
    }

    const res = await fetch(imageUrl);
    const buffer = Buffer.from(await res.arrayBuffer());
    const filePath = join(OUTPUT_DIR, `${item.name}_final_${Date.now()}.png`);
    await writeFile(filePath, buffer);
    console.log(`  ${label} — final saved: ${filePath}`);
    return filePath;
  } catch (err) {
    console.error(`  ${label} — ERROR: ${err.message}`);
    return null;
  }
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  console.log("═══════════════════════════════════════════════════");
  console.log("  TheHairOg — Flyer Generation Suite");
  console.log("  8 Premium Flyers · 4:5 Portrait · Gold & Black");
  console.log("═══════════════════════════════════════════════════\n");

  // Upload brand references
  console.log("Uploading brand reference images...\n");
  const referenceUrls = [];
  for (const refPath of REFERENCE_IMAGES) {
    try {
      referenceUrls.push(await uploadImage(refPath));
    } catch (err) {
      console.error(`  Failed to upload ${refPath}: ${err.message}`);
    }
  }
  console.log(`\n=== ${referenceUrls.length} references ready ===\n`);

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

  console.log(`Generating ${selectedPrompts.length} flyer(s)...\n`);
  console.log("Step 1: Text-to-image base generation (nano-banana-2)");
  console.log("Step 2: Edit refinement with brand references (nano-banana-2/edit)\n");

  for (const [item, index] of selectedPrompts) {
    // Step 1: Generate base
    const basePath = await generateTextToImage(item, index);
    if (!basePath) continue;

    // Step 2: Refine with brand references (logo + CEO face)
    await refineWithEdit(item, index, basePath, referenceUrls);
  }

  console.log("\n═══════════════════════════════════════════════════");
  console.log("  GENERATION COMPLETE");
  console.log("═══════════════════════════════════════════════════");
  console.log("  Brand: TheHairOg");
  console.log("  Palette: Gold #C5A33B · Black #1A1A1A · Cream #F5F3EF");
  console.log("  Format: 4:5 portrait (1080×1350)");
  console.log("  Output: ./generated-flyers/");
  console.log("═══════════════════════════════════════════════════");
}

main();
