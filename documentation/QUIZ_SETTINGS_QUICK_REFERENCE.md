# Quiz Settings - Quick Start Guide

## What Was Added

A **QuizSettingsModal** component that lets users choose how many questions (15-50) to include in their quiz before starting.

## Where to Find It

- **Component**: `frontend/src/components/QuizSettingsModal.tsx`
- **Integration**: `frontend/src/components/SummaryPanel.tsx` and `frontend/src/App.tsx`

## How It Works

### User Experience Flow

1. **User clicks "Quiz" button** on the Results panel
2. **QuizSettingsModal appears** with customization options
3. **User selects number of questions** using:
   - **Quick presets**: 15, 30, or 50 buttons
   - **Decrease button**: Reduce by 5 questions
   - **Increase button**: Add 5 questions
   - **Slider/Progress bar**: Visual feedback of selection
4. **User clicks "Start Quiz"** to begin with selected count
5. **Quiz displays** with chosen number of questions

### Question Count Rules

- **Minimum**: 15 questions
- **Maximum**: 50 questions (or total available, whichever is less)
- **Default**: 15 questions
- **Adjustment**: ±5 questions per click

## Component Props

```tsx
interface QuizSettingsModalProps {
  totalQuestions: number; // Total available questions
  onStart: (numQuestions: number) => void; // Callback when user confirms
  onCancel: () => void; // Callback when user cancels
}
```

## Features

| Feature            | Details                                 |
| ------------------ | --------------------------------------- |
| 🎯 Range Selection | 15-50 questions (adaptive to available) |
| ⚡ Quick Buttons   | One-click presets for 15, 30, 50        |
| 📊 Progress Bar    | Visual slider showing selected range    |
| 🔄 Adjust Controls | ±5 buttons for fine-tuning              |
| ♿ Accessibility   | Disabled states, clear labels           |
| 🎨 Dark Theme      | Matches app design with purple accents  |
| ✨ Animations      | Smooth fade-in and slide-up effects     |
| 📱 Responsive      | Works on all screen sizes               |

## Key Styling

```tsx
// Colors
- Background: slate-900 to slate-950 (dark)
- Primary: purple-600 (action buttons)
- Text: slate-100 (headings), slate-300 (body)
- Accents: blue-500 (info box)

// Effects
- Backdrop blur on overlay
- Gradient backgrounds
- Smooth transitions
- Shadow effects
```

## Integration with Quiz Flow

```
SummaryPanel
    ↓
[Quiz Button Click]
    ↓
QuizSettingsModal
    ↓
[User Selects Count]
    ↓
App.tsx (sets quizNumQuestions)
    ↓
Quiz filtered to selected count
    ↓
QuizPage displays filtered questions
```

## Example Usage

```tsx
// In SummaryPanel.tsx
{
  showQuizSettings && result?.quiz && (
    <QuizSettingsModal
      totalQuestions={result.quiz.length}
      onStart={(numQuestions) => {
        // User confirmed selection
        setShowQuizSettings(false);
        onOpenQuiz?.(numQuestions);
      }}
      onCancel={() => {
        // User cancelled
        setShowQuizSettings(false);
      }}
    />
  );
}
```

## Testing the Feature

### Desktop Testing

1. Create a session with screenshots
2. Wait for results and quiz generation
3. Click "Quiz" button in results panel
4. Verify modal appears with correct settings
5. Try different selection methods:
   - Click preset buttons
   - Use increase/decrease buttons
   - Drag progress bar (if implemented)
6. Click "Start Quiz" and verify correct number of questions appear
7. Complete quiz and verify results

### Edge Cases to Test

- ✅ Quiz with fewer than 15 available questions
- ✅ Quiz with 50+ available questions
- ✅ Clicking same preset multiple times
- ✅ Rapid increase/decrease clicks
- ✅ Modal on mobile (touch-friendly)
- ✅ Cancel button resets modal state

## Customization Options

To modify the settings, edit `QuizSettingsModal.tsx`:

```tsx
// Change min/max/default
const MIN_QUESTIONS = 15      // Edit here
const MAX_QUESTIONS = 50      // Edit here
const DEFAULT_QUESTIONS = 15  // Edit here

// Change presets
{[15, 30, 50].map(value => {...})}  // Edit preset values
```

## Performance Notes

✅ **Lightweight**: ~200 lines of code
✅ **No Backend Changes**: Client-side only
✅ **Zero Impact**: Only active during quiz setup
✅ **Efficient Filtering**: Uses array.slice() to limit questions

## Troubleshooting

| Issue                    | Solution                                      |
| ------------------------ | --------------------------------------------- |
| Modal doesn't appear     | Check `result?.quiz` exists and has questions |
| Buttons don't work       | Verify onClick handlers connected to state    |
| Numbers not updating     | Check React state updates in SummaryPanel     |
| Quiz shows all questions | Verify `quizNumQuestions` passed to App       |
| Animations choppy        | Check CSS animations in `index.css`           |

## Browser Compatibility

✅ Chrome/Edge 90+
✅ Firefox 88+
✅ Safari 14+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Related Files

- `frontend/src/components/QuizSettingsModal.tsx` - Modal component
- `frontend/src/components/SummaryPanel.tsx` - Integration point
- `frontend/src/App.tsx` - State management
- `frontend/src/pages/QuizPage.tsx` - Quiz display (no changes)
- `frontend/src/index.css` - Animation definitions
