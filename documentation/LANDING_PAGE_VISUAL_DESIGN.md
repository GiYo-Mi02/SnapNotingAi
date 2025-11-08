# 🎨 Landing Page - Visual Design Reference

## 📐 Page Layout Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      NAVIGATION BAR (Fixed)                      │
│  [Logo ✨] SnapNotesAI    [Nav Links]    [Go to Dashboard] ─────│
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        HERO SECTION                              │
│                                                                  │
│                    🌟 AI-Powered Note Taking 🌟                │
│                                                                  │
│        Focus on learning —                                       │
│        SnapNotesAI takes care of your notes                     │
│                                                                  │
│        Subheading about value proposition                        │
│                                                                  │
│    [Try for Free →] [See How It Works]                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     FEATURES SECTION (6 Cards)                   │
│                                                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │    📸 Auto   │ │  🧠 AI       │ │  ✅ Quiz     │            │
│  │  Screenshot  │ │  Summarize   │ │ Generation   │            │
│  │   Capture    │ │              │ │              │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │   📝 Manual  │ │  📚 History  │ │   ⚡ Fast    │            │
│  │   Text I/P   │ │  & Org       │ │  Processing  │            │
│  │              │ │              │ │              │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   HOW IT WORKS (5-Step Process)                  │
│                                                                  │
│   [1]        [2]        [3]        [4]        [5]               │
│   ⭐ Start   📸 Capture ✍️ Extract  🧠 Summary ✅ Quiz          │
│   Capture    Frames     Text        Generated  Ready             │
│                                                                  │
│   └─────────────────────────────────────────────────┘           │
│         (Gradient connecting line)                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     PRICING SECTION (3 Tiers)                    │
│                                                                  │
│  ┌──────────────┐  ┌────────────────┐  ┌──────────────┐        │
│  │    FREE      │  │   ⭐ PRO ⭐    │  │ ENTERPRISE   │        │
│  │              │  │ MOST POPULAR   │  │              │        │
│  │    $0/mo     │  │    $9/mo       │  │  Custom      │        │
│  │              │  │                │  │              │        │
│  │ • Basic OCR  │  │ • Advanced OCR │  │ • Everything │        │
│  │ • Limited    │  │ • Unlimited    │  │ • Custom Int │        │
│  │ • Community  │  │ • AI features  │  │ • Dedicated  │        │
│  │              │  │ • Priority     │  │ • SLA        │        │
│  │ [Get Started]│  │ [Get Started]  │  │[Contact Sale]│        │
│  └──────────────┘  └────────────────┘  └──────────────┘        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                          FOOTER                                  │
│                                                                  │
│  [Logo] SnapNotesAI     Product Links    Company Links  Legal   │
│  Description            • Features       • About         • T&C   │
│                         • Pricing        • Blog          • Privacy│
│                         • Security       • Contact       • Cookie │
│                                                                  │
│                    © 2024 SnapNotesAI. All rights reserved.     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Color Palette

### Primary Colors

```
Slate 950 (Very Dark):   #030712    ← Background
Slate 900 (Dark):        #111827    ← Secondary background
Slate 800 (Medium):      #1e293b    ← Borders
```

### Accent Colors

```
Blue 600 (Primary):      #2563eb    ← Main CTA buttons
Blue 700 (Hover):        #1d4ed8    ← Button hover
Purple 600 (Accent):     #9333ea    ← Gradient accents
```

### Text Colors

```
White:                   #ffffff    ← Headings, primary text
Slate 300:              #cbd5e1    ← Secondary text
Slate 400:              #94a3b8    ← Tertiary text
```

### Feature Hover Colors

```
Blue:      #3b82f6      ← Screenshot feature
Purple:    #a855f7      ← Summarization feature
Orange:    #f97316      ← Quiz generation
Green:     #22c55e      ← Manual input
Cyan:      #06b6d4      ← History
Pink:      #ec4899      ← Speed
```

---

## 📏 Spacing & Sizing

### Page Sections

```
Navigation:          height: auto, padding: py-4
Hero:               padding-top: 8rem (pt-32), padding-bottom: 5rem (pb-20)
Features:           padding: py-20, background: semi-dark
How It Works:        padding: py-20
Pricing:            padding: py-20, background: semi-dark
Footer:             padding: py-16
```

### Container Widths

```
max-w-7xl           ← Navigation container
max-w-6xl           ← Most content sections
max-w-4xl           ← Hero section
max-w-2xl           ← Text content
```

### Grid Gaps

```
Gap 8               ← Feature cards, pricing cards, footer columns
Gap 4               ← Smaller elements
Gap 2               ← Tight spacing (used rarely)
```

### Feature Cards

```
Padding:            p-8 (2rem on all sides)
Border:             1px solid
Border Radius:      rounded-xl (0.75rem)
Icon Container:     w-16 h-16 (4rem)
Icon Size:          text-3xl
Title:              text-2xl font-bold
Description:        text-slate-400
```

---

## 🔤 Typography Hierarchy

### Heading Sizes

```
Hero Headline:      text-6xl md:text-7xl      (48px / 56px)
Section Titles:     text-5xl                  (48px)
Card Titles:        text-2xl font-bold        (24px)
Subheadings:        text-xl                   (20px)
Body Text:          text-base or default      (16px)
Small Text:         text-sm                   (14px)
```

### Font Weights

```
Headlines:          font-bold                 (700)
Section Titles:     font-bold                 (700)
Buttons:            font-semibold             (600)
Body:               default (400)             (400)
```

### Line Heights

```
Headlines:          leading-tight
Body:               default (1.5 line-height)
Links:              default
```

---

## 🎭 Component Sizing

### Buttons

```
Hero CTAs:
  Height:           py-4 (1rem padding)
  Width:            px-8 (2rem padding)
  Font:             text-lg font-semibold
  Border Radius:    rounded-lg

Pricing CTAs:
  Height:           py-3 (0.75rem padding)
  Width:            w-full (100%)
  Font:             default size
  Border Radius:    rounded-lg

Navigation CTA:
  Height:           py-2 (0.5rem padding)
  Width:            px-6 (1.5rem padding)
  Font:             text-sm font-semibold
  Border Radius:    rounded-lg
```

### Icons

```
Navigation Logo:    w-8 h-8 (2rem)
Section Icons:      w-16 h-16 (4rem)
Feature Emoji:      text-3xl (24px)
Process Step:       text-3xl (24px)
Step Badges:        w-16 h-16 (4rem)
```

---

## 🎯 Responsive Design Points

### Mobile First (< 640px)

```
Navigation:         Single row, compact
Hero:              Single column, full width
Features:           Single column stack
How It Works:        Vertical stack
Pricing:            Single column
Footer:             Single column
Padding:            px-6 on sides
Font Sizes:         Slightly reduced
```

### Tablet (640px - 1024px)

```
Navigation:         Multi-row with nav links
Hero:              Single column
Features:           2-column grid
How It Works:        Horizontal with wrapping
Pricing:            2-column grid (Pro featured)
Footer:             2 column layout
```

### Desktop (> 1024px)

```
Navigation:         Horizontal flex layout
Hero:              Single column, centered
Features:           3-column grid
How It Works:        Horizontal flow
Pricing:            3-column grid
Footer:             4 column layout
```

---

## ✨ Visual Effects

### Gradients

```
Background:         bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
Header Logo:        bg-gradient-to-br from-blue-500 to-purple-600
Text Accent:        bg-gradient-to-r from-blue-400 to-purple-600
Connection Line:    bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500
```

### Hover Effects

```
Feature Cards:
  Border:           Default slate-700 → Hover color-500

Navigation Links:
  Color:            Default slate-300 → Hover white

Buttons:
  Background:       Default shade → Hover darker shade
  Transition:       All 150-300ms

Links:
  Color:            Default slate-300 → Hover white
  Underline:        Optional on hover
```

### Transitions

```
All Hover Effects:  transition (default 150ms ease-in-out)
Smooth Scroll:      scrollIntoView({ behavior: 'smooth' })
```

---

## 📐 Layout Patterns

### Hero Section Pattern

```
Max-width container
  ↓
Centered text
  ↓
Inline badge
  ↓
Large headline
  ↓
Subheading paragraph
  ↓
Button row (flex, centered, gap-4)
```

### Feature Grid Pattern

```
6-column grid (3 per row on desktop)
  ↓
Each card: flex column with icon, title, description
  ↓
Icon: centered, colored background
  ↓
Title: bold, white
  ↓
Description: slate-400
  ↓
Hover: border color change
```

### Pricing Card Pattern

```
3-column grid
  ↓
Pro card: scale-105, blue border, "Most Popular" badge
  ↓
Each card: flex column with price, features, button
  ↓
Button: full width, themed color
```

---

## 🎬 Animation & Interaction Flow

### Page Load

```
1. Navigation appears (fixed)
2. Hero fades in
3. Features section visible
4. Smooth scroll ready
```

### User Interactions

```
Hover on Feature Card:
  Border color changes to feature color
  Slight visual feedback (transition)

Hover on Navigation Link:
  Text changes from slate-300 to white
  Smooth transition

Hover on Button:
  Background darkens
  Slight visual feedback

Click CTA Button:
  Transition to dashboard (state change)
  New content loads
```

### Scroll Events

```
User scrolls down:
  Navigation stays fixed at top
  Content slides beneath
  Smooth, no jank

Click Navigation Link:
  Smooth scroll to section
  No page reload
```

---

## 📊 Component Hierarchy

```
Landing Page (Root)
├── Navigation Bar
│   ├── Logo
│   ├── Nav Links
│   └── CTA Button
├── Hero Section
│   ├── Badge
│   ├── Headline
│   ├── Subheading
│   └── Button Group
├── Features Section
│   ├── Title
│   ├── Description
│   └── Feature Grid
│       └── Feature Card (×6)
├── How It Works
│   ├── Title
│   ├── Process Line
│   └── Step Group
│       └── Step (×5)
├── Pricing Section
│   ├── Title
│   ├── Description
│   └── Pricing Grid
│       └── Pricing Card (×3)
└── Footer
    ├── Company Info
    ├── Links Section (×3)
    └── Copyright
```

---

## 🎪 Visual Sections Summary

| Section      | Color Scheme          | Layout           | Interactivity              |
| ------------ | --------------------- | ---------------- | -------------------------- |
| Nav          | slate-950/80 backdrop | Fixed horizontal | Link hover, button click   |
| Hero         | Dark gradient         | Centered text    | Button click → Dashboard   |
| Features     | slate-900/50 bg       | 3-col grid       | Card hover color change    |
| How It Works | Dark gradient         | Horizontal flow  | Scroll to view             |
| Pricing      | slate-900/50 bg       | 3-col grid       | Button click, Pro featured |
| Footer       | slate-950 bg          | 4-col grid       | Link navigation            |

---

## 🎨 Design System Rules

### Colors

- Always use provided palette
- No random colors
- Consistent accent usage

### Typography

- Headlines: bold, large
- Body: readable, sufficient contrast
- Links: underlined or color change on hover

### Spacing

- Consistent padding/margins
- 8px base unit (multiples: 4, 8, 12, 16, 20, etc.)
- Breathing room between sections

### Interactions

- Hover states on clickables
- Smooth transitions
- Visual feedback for actions

### Responsive

- Mobile-first approach
- Test at 320px, 640px, 1024px
- Touch-friendly touch targets

---

**Version**: 1.0
**Last Updated**: 2024
**Status**: ✅ Design System Complete
