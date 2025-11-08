# Manual Input Feature - API Testing Guide

## 🧪 Test All Endpoints

Use these examples to test the manual input feature with curl, Postman, or any HTTP client.

---

## Prerequisites

Make sure both servers are running:

```bash
# Terminal 1: Backend
cd backend && npm run dev
# Listening on http://localhost:4000

# Terminal 2: Frontend
cd frontend && npm run dev
# Listening on http://localhost:5173
```

---

## Test 1: Submit Text Content

### Using curl

```bash
curl -X POST http://localhost:4000/api/sessions/manual/text \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Albert Einstein proposed the theory of relativity. E=mc² is the most famous equation in physics. The theory explains how space and time are interconnected."
  }'
```

### Expected Response (201 Created)

```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Using JavaScript/Fetch

```javascript
const response = await fetch("http://localhost:4000/api/sessions/manual/text", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    content: "Your text content here...",
  }),
});

const data = await response.json();
console.log("Session ID:", data.sessionId);
```

### Test Cases

**Valid Cases:**

- [ ] Simple text: "Hello world"
- [ ] Long text: Full lecture notes
- [ ] Special characters: "E=mc² is E equals m times c squared"
- [ ] Multiple paragraphs: Text with line breaks
- [ ] URLs: Text containing URLs

**Invalid Cases (Should Fail):**

- [ ] Empty string: `"content": ""`
- [ ] Only whitespace: `"content": "   "`
- [ ] Missing field: No content property
- [ ] Null value: `"content": null`

---

## Test 2: Submit Audio Transcript

### Using curl

```bash
curl -X POST http://localhost:4000/api/sessions/manual/transcript \
  -H "Content-Type: application/json" \
  -d '{
    "transcript": "In this lecture, we discussed quantum mechanics. The professor explained wave function collapse and the uncertainty principle. Students asked about practical applications in modern computing."
  }'
```

### Expected Response (201 Created)

```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440001"
}
```

### Using JavaScript/Fetch

```javascript
const response = await fetch(
  "http://localhost:4000/api/sessions/manual/transcript",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      transcript: "Transcribed audio text from your lecture...",
    }),
  }
);

const data = await response.json();
console.log("Session ID:", data.sessionId);
```

### Test Cases

**Valid Cases:**

- [ ] From Otter.ai export
- [ ] From Google Docs Voice Typing
- [ ] From Rev.com transcript
- [ ] From manual typing
- [ ] With timestamps: "[00:05] Professor started..."

**Invalid Cases (Should Fail):**

- [ ] Empty transcript
- [ ] Whitespace only
- [ ] Missing transcript field

---

## Test 3: Upload PDF Document

### Using curl

```bash
curl -X POST http://localhost:4000/api/sessions/manual/document \
  -F "document=@path/to/your/file.pdf"
```

### Using Python

```python
import requests

with open('lecture_slides.pdf', 'rb') as f:
    files = {'document': f}
    response = requests.post(
        'http://localhost:4000/api/sessions/manual/document',
        files=files
    )

data = response.json()
print('Session ID:', data['sessionId'])
```

### Using JavaScript/Fetch

```javascript
const formData = new FormData();
const fileInput = document.querySelector('input[type="file"]');
formData.append("document", fileInput.files[0]);

const response = await fetch(
  "http://localhost:4000/api/sessions/manual/document",
  {
    method: "POST",
    body: formData,
  }
);

const data = await response.json();
console.log("Session ID:", data.sessionId);
```

### Expected Response (201 Created)

```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440002"
}
```

### Test Files

**Test Case 1: Simple PDF**

- [x] Create: `lecture.pdf` (5 pages of text)
- Run upload test
- Should extract text successfully

**Test Case 2: Large PDF**

- [x] Find: Existing PDF (100+ pages)
- Run upload test
- Should handle without timeout

**Test Case 3: Scanned PDF**

- [x] Create: PDF from scanned images
- Run upload test
- Note: Will extract if text layer exists

### Supported Formats Testing

| Format | File           | Expected               |
| ------ | -------------- | ---------------------- |
| PDF    | `document.pdf` | ✅ Extract text        |
| DOCX   | `notes.docx`   | ✅ Extract text        |
| DOC    | `old_doc.doc`  | ✅ Extract text        |
| TXT    | `plain.txt`    | ✅ Read directly       |
| PPT    | `slides.ppt`   | ❌ Not supported (403) |
| XLSX   | `data.xlsx`    | ❌ Not supported (403) |
| JPG    | `image.jpg`    | ❌ Not supported (403) |

---

## Test 4: Verify Session Creation

After submitting content, verify the session was created in the database.

### Query Sessions (GET)

```bash
curl http://localhost:4000/api/sessions
```

### Expected Response

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "user_id": null,
    "status": "active",
    "source": "text",
    "manual_content": "Albert Einstein proposed...",
    "file_name": null,
    "created_at": "2024-01-15T10:30:00Z",
    "stopped_at": null
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "user_id": null,
    "status": "active",
    "source": "document",
    "manual_content": "Extracted PDF content...",
    "file_name": "lecture.pdf",
    "created_at": "2024-01-15T10:32:00Z",
    "stopped_at": null
  }
]
```

---

## Test 5: Poll for Results

After creating a session, poll the results endpoint to get the summary and quiz.

### Using curl (Polling)

```bash
SESSION_ID="550e8400-e29b-41d4-a716-446655440000"

# Poll every 2 seconds for up to 30 seconds
for i in {1..15}; do
  echo "Poll attempt $i..."
  curl http://localhost:4000/api/results/$SESSION_ID
  sleep 2
done
```

### Using JavaScript (Polling)

```javascript
const sessionId = "550e8400-e29b-41d4-a716-446655440000";

async function pollForResults() {
  for (let i = 0; i < 15; i++) {
    const response = await fetch(
      `http://localhost:4000/api/results/${sessionId}`
    );

    if (response.status === 200) {
      const data = await response.json();
      console.log("Results received!");
      console.log("Summary:", data.summary);
      console.log("Quiz:", data.quiz);
      return data;
    }

    if (response.status === 202) {
      console.log(`Poll ${i + 1}: Processing...`);
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  console.log("Timeout: Results not ready");
}

pollForResults();
```

### Response Timeline

**Immediately after submission (202 Accepted):**

```json
{
  "status": "processing"
}
```

**After ~5-10 seconds (200 OK):**

```json
{
  "id": "result-uuid",
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "summary": "This lecture covers Einstein's theory of relativity...",
  "quiz": [
    {
      "question": "Who proposed the theory of relativity?",
      "options": ["Einstein", "Newton", "Planck", "Bohr"],
      "correct": 0
    }
    // ... more questions
  ],
  "created_at": "2024-01-15T10:31:00Z"
}
```

---

## Test 6: Error Cases

### Missing Content

```bash
curl -X POST http://localhost:4000/api/sessions/manual/text \
  -H "Content-Type: application/json" \
  -d '{"content": ""}'
```

**Expected (400 Bad Request):**

```json
{
  "error": "Content is required and cannot be empty"
}
```

### Unsupported File Format

```bash
curl -X POST http://localhost:4000/api/sessions/manual/document \
  -F "document=@presentation.pptx"
```

**Expected (400 Bad Request):**

```json
{
  "error": "Unsupported file format. Supported: pdf, docx, doc, txt"
}
```

### File Too Large

```bash
curl -X POST http://localhost:4000/api/sessions/manual/document \
  -F "document=@huge-file.pdf"  # > 50MB
```

**Expected (413 Payload Too Large):**

```json
{
  "error": "File exceeds maximum size of 50MB"
}
```

### Missing File

```bash
curl -X POST http://localhost:4000/api/sessions/manual/document \
  -H "Content-Type: multipart/form-data"
```

**Expected (400 Bad Request):**

```json
{
  "error": "No file provided"
}
```

---

## Test 7: End-to-End Flow

### Complete Testing Workflow

```bash
#!/bin/bash

# Step 1: Submit text
echo "=== Submitting text... ==="
RESPONSE=$(curl -s -X POST http://localhost:4000/api/sessions/manual/text \
  -H "Content-Type: application/json" \
  -d '{"content": "This is a test lecture about physics."}')

SESSION_ID=$(echo $RESPONSE | grep -o '"sessionId":"[^"]*' | cut -d'"' -f4)
echo "Session ID: $SESSION_ID"

# Step 2: Poll for results
echo "=== Polling for results... ==="
for i in {1..15}; do
  RESULT=$(curl -s http://localhost:4000/api/results/$SESSION_ID)

  if echo $RESULT | grep -q "summary"; then
    echo "✓ Results received!"
    echo "Summary: $(echo $RESULT | grep -o '"summary":"[^"]*' | head -1)"
    exit 0
  fi

  echo "Poll $i: Processing..."
  sleep 2
done

echo "✗ Timeout: Results not ready"
exit 1
```

---

## Performance Testing

### Measure Response Times

```javascript
// Text submission timing
console.time("Text Submission");
const textResponse = await fetch(
  "http://localhost:4000/api/sessions/manual/text",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "Test content" }),
  }
);
console.timeEnd("Text Submission");

// Document upload timing
console.time("Document Upload");
const formData = new FormData();
formData.append("document", pdfFile);
const docResponse = await fetch(
  "http://localhost:4000/api/sessions/manual/document",
  {
    method: "POST",
    body: formData,
  }
);
console.timeEnd("Document Upload");

// Results polling timing
console.time("Results Processing");
const resultsResponse = await fetch(
  `http://localhost:4000/api/results/${sessionId}`
);
console.timeEnd("Results Processing");
```

### Expected Performance

| Operation          | Time         |
| ------------------ | ------------ |
| Text submission    | < 100ms      |
| PDF upload (5MB)   | < 500ms      |
| DOCX upload (1MB)  | < 200ms      |
| Results processing | 5-10 seconds |
| Results polling    | < 50ms       |

---

## Frontend Integration Testing

### Test via Web UI

1. **Open Dashboard**

   - Navigate to `http://localhost:5173`
   - ManualInputPanel should be visible at top

2. **Test Text Input**

   - Click "Text" tab
   - Enter sample text
   - Click "Submit Text"
   - Verify loading state
   - Verify summary displays

3. **Test Transcript Input**

   - Click "Transcript" tab
   - Enter sample transcript
   - Click "Submit Transcript"
   - Verify loading state
   - Verify results display

4. **Test Document Upload**

   - Click "Document" tab
   - Upload PDF file
   - Verify file name displays
   - Verify processing starts
   - Verify results display

5. **Test History Integration**
   - Click "History" button
   - Verify manual input sessions appear
   - Verify with correct source type
   - Click to view details

---

## Debugging Tips

### Check Backend Logs

```bash
cd backend
npm run dev 2>&1 | grep -i "manual\|error\|warning"
```

### Check Browser Console

```javascript
// Open DevTools (F12) → Console tab
// Look for any JavaScript errors
// Check Network tab for API responses
```

### Check Database Directly

If using Supabase, query in SQL editor:

```sql
-- View all sessions
SELECT id, source, manual_content, file_name, status, created_at
FROM sessions
ORDER BY created_at DESC
LIMIT 10;

-- View results for a session
SELECT * FROM results
WHERE session_id = 'YOUR_SESSION_ID';

-- View manual input sessions only
SELECT * FROM sessions
WHERE source IN ('text', 'audio_transcript', 'document')
ORDER BY created_at DESC;
```

---

## Common Issues & Solutions

| Issue                   | Cause                      | Solution                        |
| ----------------------- | -------------------------- | ------------------------------- |
| 404 Not Found           | Route not registered       | Restart backend                 |
| 500 Server Error        | Missing npm packages       | `npm install pdf-parse mammoth` |
| "Column does not exist" | Missing migration          | Run SQL schema update           |
| Empty response          | Processing not complete    | Keep polling (10+ seconds)      |
| Large file fails        | File size limit            | Keep PDF < 50MB                 |
| Empty results           | Document extraction failed | Try different PDF               |

---

## Automated Testing Script

Save as `test-manual-input.sh`:

```bash
#!/bin/bash

API_URL="http://localhost:4000/api"
RESULTS=0
PASSED=0

test_endpoint() {
  local method=$1
  local endpoint=$2
  local data=$3
  local expected=$4

  echo "Testing: $method $endpoint"

  if [ "$method" = "POST" ]; then
    response=$(curl -s -X POST "$API_URL$endpoint" \
      -H "Content-Type: application/json" \
      -d "$data")
  else
    response=$(curl -s "$API_URL$endpoint")
  fi

  if echo "$response" | grep -q "$expected"; then
    echo "✓ PASS"
    ((PASSED++))
  else
    echo "✗ FAIL: $response"
  fi

  ((RESULTS++))
}

# Run tests
test_endpoint "POST" "/sessions/manual/text" \
  '{"content":"test"}' \
  "sessionId"

echo ""
echo "Results: $PASSED/$RESULTS passed"
```

---

## Summary

Use this guide to systematically test:

- ✅ All three input methods
- ✅ Error handling
- ✅ Database storage
- ✅ Results processing
- ✅ Frontend integration
- ✅ Performance metrics

**Everything working?** You're ready to deploy! 🚀

---

**Last Updated:** 2024
**Testing Status:** Ready
**Coverage:** 100% of endpoints
