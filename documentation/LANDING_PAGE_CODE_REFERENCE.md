# Landing Page - Code Architecture Reference

## 🏗️ File Structure

```
frontend/src/
├── App.tsx                          (MODIFIED)
├── pages/
│   ├── LandingPage.tsx             (NEW - 380+ lines)
│   ├── QuizPage.tsx                (existing)
│   └── HistoryPage.tsx             (existing)
├── components/
│   ├── CaptureControls.tsx
│   ├── ScreenshotGrid.tsx
│   ├── SummaryPanel.tsx
│   ├── StatusBadge.tsx
│   └── ManualInputPanel.tsx
├── hooks/
│   └── useScreenCapture.ts
├── lib/
│   └── api.ts
├── types/
│   └── api.ts
├── main.tsx
└── index.css
```

## 📝 Code Architecture

### App.tsx Integration

```tsx
// Import the new landing page
import { LandingPage } from "./pages/LandingPage";

const App = () => {
  // Track whether to show landing page
  const [showLanding, setShowLanding] = useState(true);

  // ... other state variables ...

  // Show landing page if showLanding is true
  if (showLanding) {
    return <LandingPage onEnterApp={() => setShowLanding(false)} />;
  }

  // Show dashboard if showLanding is false
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Dashboard content */}
    </div>
  );
};
```

### LandingPage.tsx Structure

```tsx
interface LandingPageProps {
  onEnterApp?: () => void;
}

export function LandingPage({ onEnterApp }: LandingPageProps) {
  const [openPricing, setOpenPricing] = useState<string | null>(null);

  const handleEnterApp = () => {
    onEnterApp?.();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* SECTION 1: NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        {/* Logo, nav links, CTA button */}
      </nav>

      {/* SECTION 2: HERO */}
      <section id="home" className="pt-32 pb-20 px-6 text-center">
        {/* Headline, subheading, dual CTAs */}
      </section>

      {/* SECTION 3: FEATURES */}
      <section id="features" className="py-20 px-6 bg-slate-900/50">
        {/* 6-feature grid */}
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section id="how" className="py-20 px-6">
        {/* 5-step process visualization */}
      </section>

      {/* SECTION 5: PRICING */}
      <section id="pricing" className="py-20 px-6 bg-slate-900/50">
        {/* 3-tier pricing cards */}
      </section>

      {/* SECTION 6: FOOTER */}
      <footer className="border-t border-slate-800 py-16 px-6 bg-slate-950">
        {/* Company info, links, copyright */}
      </footer>
    </div>
  );
}
```

## 🎨 Styling System

### Color Variables (TailwindCSS)

```css
/* Primary Colors */
--slate-950: #030712    /* Very dark blue-gray background */
--slate-900: #111827    /* Dark blue-gray background */
--slate-800: #1e293b    /* Borders and subtle elements */

/* Accent Colors */
--blue-600: #2563eb     /* Primary action color */
--blue-700: #1d4ed8     /* Hover state for blue-600 */
--purple-600: #9333ea   /* Gradient accents */

/* Text Colors */
--white: #ffffff        /* Headings and primary text */
--slate-300: #cbd5e1    /* Secondary text */
--slate-400: #94a3b8    /* Tertiary text */

/* Feature Card Hover Colors */
--blue-500: #3b82f6
--purple-500: #a855f7
--orange-500: #f97316
--green-500: #22c55e
--cyan-500: #06b6d4
--pink-500: #ec4899
```

### Class Structure

```css
/* Container */
.max-w-7xl      /* Navigation container */
.max-w-6xl      /* Content containers */
.max-w-4xl      /* Hero section */

/* Spacing */
.pt-32          /* Top padding for hero (accounts for fixed nav) */
.pb-20          /* Bottom padding for sections */
.py-20          /* Vertical padding for sections */
.px-6           /* Horizontal padding */
.gap-8          /* Gap between grid items */

/* Gradients */
.bg-gradient-to-b          /* Top to bottom gradient */
.bg-gradient-to-br         /* Top-left to bottom-right */
.bg-gradient-to-r          /* Left to right */
.bg-clip-text              /* Clip text to gradient */
.text-transparent          /* Make text transparent for gradient */

/* Typography */
.text-7xl      /* Hero headline */
.text-5xl      /* Section titles */
.text-2xl      /* Feature titles */
.text-xl       /* Subheadings */
.text-lg       /* Body text */
.font-bold     /* Bold headings */
.font-semibold /* Semi-bold buttons/accents */

/* Responsive */
.md:grid-cols-3     /* 3 columns on medium screens */
.md:flex-row        /* Row layout on medium screens */
.md:block           /* Block display on medium screens */
.hidden md:flex     /* Hidden on mobile, flex on desktop */
```

## 🔄 Component Interactions

### Navigation Links Flow

```tsx
// Smooth scroll to section
<a href="#features" className="...">Features</a>

// OR with button click
<button onClick={() => {
  document.getElementById('how')?.scrollIntoView({
    behavior: 'smooth'
  })
}}>
  See How It Works
</button>
```

### CTA Button Flow

```tsx
// In Navigation Bar
<button onClick={handleEnterApp}>Go to Dashboard</button>

// In Hero Section
<button onClick={handleEnterApp}>
  Try SnapNotesAI for Free →
</button>

// handleEnterApp triggers App's setShowLanding(false)
// Dashboard then becomes visible
```

## 📊 Feature Cards Implementation

### Features Grid Pattern

```tsx
{[
  { icon: '📸', label: 'Automatic Screenshot Capture', ... },
  { icon: '🧠', label: 'AI Summarization', ... },
  // ... more features
].map((feature, idx) => (
  <div key={idx} className="p-8 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-blue-500 transition">
    <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
      <span className="text-3xl">{feature.icon}</span>
    </div>
    <h3 className="text-2xl font-bold text-white mb-3">{feature.label}</h3>
    <p className="text-slate-400">{feature.description}</p>
  </div>
))}
```

### Hover Effects

```css
/* Feature cards */
.hover:border-blue-500    /* Changes to blue on hover */
.hover:border-purple-500  /* Changes to purple on hover */
.hover:border-orange-500  /* Changes to orange on hover */
.transition                /* Smooth color transition */

/* Navigation links */
.hover:text-white         /* Text changes to white */
.transition               /* Smooth transition */

/* Buttons */
.hover:bg-blue-700       /* Darker blue on hover */
.hover:bg-slate-800      /* Darker slate on hover */
.transition              /* Smooth transition */
```

## 🔀 Data Structures

### Pricing Tiers

```tsx
const pricingTiers = [
  {
    name: "Free",
    price: 0,
    description: "For getting started",
    features: [
      "Basic OCR",
      "5 screenshots/session",
      "Manual summaries",
      "Community support",
    ],
    buttonLabel: "Get Started",
    prominent: false,
  },
  {
    name: "Pro",
    price: 9,
    description: "For power users",
    features: [
      "Advanced OCR",
      "Unlimited screenshots",
      "AI summaries",
      "AI quizzes",
      "Priority support",
    ],
    buttonLabel: "Get Started",
    prominent: true, // Special styling
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations",
    features: [
      "Everything in Pro",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "Team management",
    ],
    buttonLabel: "Contact Sales",
    prominent: false,
  },
];
```

### How It Works Steps

```tsx
const steps = [
  {
    num: 1,
    icon: "⭐",
    label: "Start Capture",
    desc: "Click start to begin",
  },
  {
    num: 2,
    icon: "📸",
    label: "Snapshots Taken",
    desc: "Auto-capture frames",
  },
  // ... more steps
];
```

## 🚀 Responsive Breakpoints

### Mobile (< 768px)

```tsx
// Navigation: hidden on small screens
<div className="hidden md:flex">Nav Links</div>

// Hero buttons: stack vertically
<div className="flex flex-col sm:flex-row">Buttons</div>

// Grid: single column
<div className="grid md:grid-cols-3">Features</div>
```

### Tablet (768px - 1024px)

```tsx
// Navigation: simplified, nav visible
// Grids: 2-3 columns
// Typography: balanced
```

### Desktop (> 1024px)

```tsx
// Navigation: full with all elements
// Grids: full 3 columns
// Typography: optimal sizing
// Layouts: side-by-side where applicable
```

## 🎯 Key Implementation Details

### 1. Fixed Navigation

- Uses `fixed top-0 w-full z-50` for positioning
- Includes `backdrop-blur` for frosted glass effect
- Stays accessible while scrolling

### 2. Gradient Background

- `bg-gradient-to-b` creates top-to-bottom gradient
- Colors: `from-slate-950 via-slate-900 to-slate-950`
- Creates depth without complexity

### 3. Smooth Scrolling

- Uses `scrollIntoView({ behavior: 'smooth' })`
- Works with anchor links (#sections)
- Better UX than instant jumps

### 4. Feature Card Grid

- `md:grid-cols-3` for 3 columns on desktop
- `gap-8` for consistent spacing
- `hover:border-[color]` for interactive feedback

### 5. Pricing Cards

- Pro plan uses `scale-105` for visual emphasis
- "Most Popular" badge positioned absolutely
- Each card fully customizable

### 6. Process Visualization

- Horizontal layout on desktop
- Step numbers in gradient badges
- Connecting gradient line background

## 🔧 Customization Guide

### To Change Colors

Edit the class names throughout:

```tsx
// Change primary accent from blue-600 to green-600
// In button: className="bg-blue-600 hover:bg-blue-700"
// To:        className="bg-green-600 hover:bg-green-700"
```

### To Add New Features

Add to the features array in Features section:

```tsx
{
  icon: '🆕',
  label: 'New Feature',
  desc: 'Description here'
}
```

### To Update Pricing

Modify the pricing cards JSX:

```tsx
{
  /* Add or modify pricing tier */
}
<div className="...">
  <h3>New Tier</h3>
  {/* Update features list */}
</div>;
```

### To Adjust Spacing

Modify padding/margin classes:

```tsx
// Increase section padding: py-20 → py-32
// Increase gaps: gap-8 → gap-12
// Adjust container width: max-w-6xl → max-w-7xl
```

---

## 📚 Reference Links

- **TailwindCSS Docs**: https://tailwindcss.com/docs
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **TypeScript Docs**: https://www.typescriptlang.org/docs

---

**Version**: 1.0
**Last Updated**: 2024
**Status**: ✅ Production Ready
