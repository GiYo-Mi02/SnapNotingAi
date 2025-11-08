# SnapNotesAI - Animation System Guide

## Overview

A comprehensive animation system has been added to all pages in the SnapNotesAI application. The animations enhance user experience by providing smooth transitions, visual feedback, and engaging interactions throughout the entire application.

## Animation Types

### 1. **Fade In** (`fadeIn`)

- **Duration:** 0.6 seconds
- **Effect:** Gradually increases opacity from 0 to 1
- **Use Case:** Page entrance, content appearing
- **CSS Class:** `animate-fadeIn`

```tsx
<div className="animate-fadeIn">Content appears smoothly</div>
```

### 2. **Slide In From Left** (`slideInLeft`)

- **Duration:** 0.6 seconds
- **Effect:** Element slides in from left with fade
- **Use Case:** Text, headers, side content
- **CSS Class:** `animate-slideInLeft`

```tsx
<h1 className="animate-slideInLeft">Heading slides in from left</h1>
```

### 3. **Slide In From Right** (`slideInRight`)

- **Duration:** 0.6 seconds
- **Effect:** Element slides in from right with fade
- **Use Case:** CTAs, action buttons, right-aligned content
- **CSS Class:** `animate-slideInRight`

```tsx
<button className="animate-slideInRight">Button slides in from right</button>
```

### 4. **Slide In From Top** (`slideInDown`)

- **Duration:** 0.6 seconds
- **Effect:** Element slides down from top with fade
- **Use Case:** Navigation bars, headers, notifications
- **CSS Class:** `animate-slideInDown`

```tsx
<nav className="animate-slideInDown">Navigation slides down</nav>
```

### 5. **Slide In From Bottom** (`slideInUp`)

- **Duration:** 0.6 seconds
- **Effect:** Element slides up from bottom with fade
- **Use Case:** Cards, modals, bottom content
- **CSS Class:** `animate-slideInUp`

```tsx
<div className="animate-slideInUp">Card slides up</div>
```

### 6. **Zoom In** (`zoomIn`)

- **Duration:** 0.6 seconds
- **Effect:** Element scales from 0.95 to 1 with fade
- **Use Case:** Emphasis, featured elements
- **CSS Class:** `animate-zoomIn`

```tsx
<div className="animate-zoomIn">Element zooms in</div>
```

### 7. **Bounce** (`bounce`)

- **Duration:** 2 seconds (infinite)
- **Effect:** Element bounces up and down
- **Use Case:** Icon highlights, attention-grabbing elements
- **CSS Class:** `animate-bounce-soft`

```tsx
<Icon className="animate-bounce-soft">Bouncing icon</Icon>
```

### 8. **Pulse** (`pulse`)

- **Duration:** 2 seconds (infinite)
- **Effect:** Element opacity pulses between states
- **Use Case:** Loading states, badges, indicators
- **CSS Class:** `animate-pulse-soft`

```tsx
<span className="animate-pulse-soft">Active indicator</span>
```

### 9. **Float** (`float`)

- **Duration:** 3 seconds (infinite)
- **Effect:** Element gently floats up and down
- **Use Case:** Avatars, illustrations, decorative elements
- **CSS Class:** `animate-float`

```tsx
<div className="animate-float">Floating element</div>
```

### 10. **Glow** (`glow`)

- **Duration:** 2 seconds (infinite)
- **Effect:** Element has a glowing box-shadow that pulses
- **Use Case:** Active states, emphasized elements, CTAs
- **CSS Class:** `animate-glow`

```tsx
<div className="animate-glow">Glowing element</div>
```

### 11. **Gradient Shift** (`gradientShift`)

- **Duration:** 4 seconds (infinite)
- **Effect:** Gradient background shifts position smoothly
- **Use Case:** Hero sections, gradient text, dynamic backgrounds
- **CSS Class:** `animate-gradientShift`

```tsx
<span className="bg-gradient-to-r from-blue-400 to-purple-600 animate-gradientShift">
  Gradient text
</span>
```

## Staggered Animations

For lists and grids, use the `animate-stagger` class on the parent to automatically stagger child animations:

```tsx
<div className="grid gap-6 animate-stagger">
  {items.map((item, idx) => (
    <div key={idx} className="animate-slideInUp">
      {item}
    </div>
  ))}
</div>
```

**Stagger Delays:**

- Child 1: 0s
- Child 2: 0.1s
- Child 3: 0.2s
- Child 4: 0.3s
- Child 5: 0.4s
- Child 6: 0.5s
- Child 7+: 0.6s

## Custom Animation Delays

Control animation timing with inline styles:

```tsx
<div className="animate-slideInUp" style={{ animationDelay: '0.2s' }}>
  Delayed animation
</div>
```

## Page-by-Page Animation Implementation

### Landing Page (`LandingPage.tsx`)

- **Navigation:** `slideInDown` with staggered nav links
- **Hero Section:** `slideInUp` with `gradientShift` on gradient text
- **Features Section:** `stagger` on cards with `bounce-soft` on icons
- **How It Works:** `glow` on step numbers, `bounce-soft` on icons
- **Pricing Section:** `bounce-soft` on Pro badge, scale-105 on cards
- **Footer:** `slideInUp` with stagger on footer columns

### Settings Page (`SettingsPage.tsx`)

- **Header:** `slideInDown` with `slideInLeft` text
- **Sections:** `slideInUp` cards with hover effects
- **Notifications:** `slideInUp` with scale transformation on hover
- **Appearance Cards:** `glow` effect on active theme
- **Save Button:** `slideInUp` with scale on hover

### Pricing Page (`PricingPage.tsx`)

- **Hero:** `slideInUp` on title and subtitle
- **Billing Toggle:** `zoomIn` with scale on button hover
- **Pricing Cards:** `bounce-soft` on Pro card, `slideInLeft` on features
- **FAQ Section:** `fadeIn` with `slideInUp` on text

### About Page (`AboutPage.tsx`)

- **Hero Section:** `slideInDown` with `gradientShift` on gradient text
- **Vision Section:** `slideInLeft` on content
- **Values Cards:** `bounce-soft` on icons with stagger effect
- **Team Section:** `float` on avatars with stagger
- **CTA Button:** `slideInUp` with scale on hover

### History Page (`HistoryPage.tsx`)

- **Header:** `slideInDown` with `bounce-soft` icon
- **Session Cards:** `slideInUp` with stagger, scale-102 on hover
- **Status Badges:** `pulse-soft` continuous animation
- **Action Buttons:** Scale-105 on hover with smooth transition
- **Pagination:** `fadeIn` with `pulse-soft` on page indicator

## Interactive Hover Effects

Most interactive elements include additional hover animations:

```tsx
<button className="transform hover:scale-105 transition duration-300">
  Hover scales button
</button>
```

**Common Hover States:**

- `hover:scale-105` - Elements scale up 5%
- `hover:shadow-lg` - Shadow deepens
- `hover:border-color-change` - Border color changes
- `transition duration-300` - Smooth 300ms transition

## Performance Considerations

1. **Animation Duration:** Keep most animations between 0.3-0.6 seconds for UI feedback
2. **Infinite Animations:** Limited to subtle effects (pulse, bounce, float, glow)
3. **Stagger Timing:** Uses small delays (0.1s increments) to avoid overwhelming the user
4. **GPU Optimization:** Animations use `transform` and `opacity` for hardware acceleration

## Browser Compatibility

All animations use standard CSS3 features supported by modern browsers:

- Chrome 26+
- Firefox 16+
- Safari 9+
- Edge 12+

## Customization

To adjust animation speed globally, modify the `index.css` file:

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out; /* Adjust duration here */
}
```

To disable animations for a specific element:

```tsx
<div className="animate-none">No animation</div>
```

To create custom animation delays:

```tsx
<div className="animate-slideInUp" style={{ animationDelay: '0.5s' }}>
  Custom delay
</div>
```

## Best Practices

1. **Use animations sparingly** - Too many animations can overwhelm users
2. **Consistent timing** - Keep animation durations consistent across the app
3. **Meaningful animations** - Animations should enhance, not distract
4. **Mobile friendly** - Consider performance on mobile devices
5. **Accessibility** - Respect `prefers-reduced-motion` for users with motion sensitivity

## Prefixes for Accessibility

For users who prefer reduced motion, consider using:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Animation File Location

All animation definitions are in: `src/index.css`

The animations are applied via Tailwind CSS utility classes throughout the component files.

## Future Enhancement Ideas

1. Add page transition animations between routes
2. Create loading skeleton animations
3. Add scroll-triggered animations
4. Implement custom animation builder utility
5. Add animation preferences to settings

---

**Last Updated:** November 8, 2025  
**Build Version:** 663 modules  
**CSS Bundle Size:** 45.03 KB (7.35 KB gzipped)
