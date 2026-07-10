# JavaScript & Git Mastery — Training Roadmap
**Student:** James | **Mentor:** Claude  
**Last Updated:** 2026-07-02 (Rev 2 — added Module 10 External APIs & Claude API, server-side proxy in Module 14)  
**Stack:** Vanilla JS → Node.js/Express | VS Code | GitHub | Linux Mint (server)

---

## Design Principles

- **PowerShell is an accelerant.** You already understand variables, loops, objects, error handling, JSON, and scripting discipline. We map JS onto what you know and close the gaps.
- **Build real things from session one.** Every topic connects to your logging/productivity suite.
- **UUID from the start.** It's not a feature we bolt on later — it's the identity system baked into every data model from Module 7 forward.
- **Git is infrastructure, not an afterthought.** Commit discipline is part of every lab requirement.
- **Session-sized bites.** Each module has natural ~1 hour pause points. No shame in stopping and continuing next session.
- **Labs gate progression.** A lab isn't complete until it's pushed to GitHub with proper commits.

---

## The UUID Thread — Why It's the North Star

Mike is correct. Here's the architectural case, stated once so you can carry it forever:

| Property | Why It Matters |
|---|---|
| **Identity stability** | The UUID of a record never changes. Content changes, location changes, app changes — `id` doesn't. |
| **Portability** | Merge datasets without collision. Log App exports, Time Tracker imports — no ID conflicts. |
| **Audit integrity** | Every audit log entry references the UUID of what it describes. Reconstruct the history of any record, across any app. |
| **Distributed-safe** | Two instances, two users, two apps writing simultaneously — UUID prevents the collision that destroys auto-increment integers. |

`crypto.randomUUID()` requires no library. It's built into modern browsers and Node.js natively. We use it from Module 7 forward, forever, no exceptions.

---

## Curriculum Overview

| Phase | Modules | Focus |
|---|---|---|
| 0 | Setup | Environment, tooling, GitHub repo |
| 1 | 1–4 | JS Fundamentals (leveraging PowerShell) |
| 2 | 5–6 | Browser Environment & Interactivity |
| 3 | 7–8 | Client-Side Persistence & CRUD |
| 4 | 9 | Git Discipline |
| 5 | 10–11 | External APIs & App Suite |
| 6 | 12–14 | Web Server, REST API & Server-Side Proxy |
| 7 | 15–17 | DevSecOps, Auth, Audit Logging |
| 8 | Capstone | Integrated, secured, shipped |

---

## Phase 0: Setup & Orientation
**Target: 1 session**

### 0.1 VS Code Configuration
- Extensions: ESLint, Prettier, GitLens, Live Server, GitHub Copilot (optional)
- Settings: format on save, tab size 2 (JS convention), auto-closing brackets
- Integrated terminal setup

### 0.2 Git & GitHub Setup
- Global git config: name, email, default branch (`main`)
- SSH key for GitHub (no more passwords)
- Create course lab repository: `js-training-labs`
- Initial README and folder structure committed

### 0.3 The Mental Model Shift
Three things that are different from PowerShell and will bite you if unacknowledged:
1. JS is **event-driven** in the browser — code doesn't run top-to-bottom the way a script does
2. **Asynchronous** is the default for anything that touches files, networks, or timers
3. **`this`** is a keyword that means something different depending on where you use it (we'll deal with this in Module 2)

---

## Phase 1: JavaScript Fundamentals

### Module 1: JS Syntax — The PowerShell Translation Layer
**Target: 2–3 sessions**

You know this stuff. The following table is your rosetta stone. Study it, then we move fast.

| Concept | PowerShell | JavaScript |
|---|---|---|
| Mutable variable | `$name = "James"` | `let name = "James"` |
| Immutable constant | (honor system) | `const PI = 3.14` |
| String interpolation | `"Hello, $name"` | `` `Hello, ${name}` `` |
| Object | `[PSCustomObject]@{name="J"}` | `{ name: "J" }` |
| Array | `@("a","b","c")` | `["a","b","c"]` |
| Filter | `Where-Object` | `.filter()` |
| Transform | `Select-Object -ExpandProperty` | `.map()` |
| Loop over collection | `ForEach-Object` | `.forEach()` |
| JSON serialize | `ConvertTo-Json` | `JSON.stringify()` |
| JSON deserialize | `ConvertFrom-Json` | `JSON.parse()` |
| Console output | `Write-Host` | `console.log()` |
| Warning | `Write-Warning` | `console.warn()` |
| Error | `Write-Error` | `console.error()` |
| Error handling | `try/catch/finally` | `try/catch/finally` |
| Date | `Get-Date` | `new Date()` |
| Exit early | `return` | `return` |
| Equality check | `-eq` | `===` (always use triple equals) |

**Critical rules — non-negotiable from day one:**
- `var` is legacy, scoped incorrectly, and will cause bugs. **Never use `var`.** Use `const` by default, `let` when you need to reassign.
- Always use `===` (strict equality). `==` coerces types and produces surprises.
- Semicolons at the end of statements. JS will sometimes insert them for you, but not always correctly.

**Topics covered:**
- Variables and the `const`/`let` distinction
- Primitive types: `string`, `number`, `boolean`, `null`, `undefined`
- Reference types: objects and arrays
- Operators: arithmetic, comparison (`===`, `!==`), logical (`&&`, `||`, `!`)
- Control flow: `if/else`, `switch`, ternary operator (`condition ? a : b`)
- Loops: `for`, `while`, `for...of` (arrays), `for...in` (object keys)
- Template literals (backtick strings — your new best friend)
- Functions: declaration syntax and calling them

---

### Module 2: Functions, Objects & Arrays in Depth
**Target: 2 sessions**

**Three ways to write a function — you'll see all three in the wild:**

```javascript
// 1. Function Declaration (hoisted — can be called before it's defined)
function greet(name) {
  return `Hello, ${name}`;
}

// 2. Function Expression (not hoisted — assigned to a variable)
const greet = function(name) {
  return `Hello, ${name}`;
};

// 3. Arrow Function (concise, and handles `this` differently)
const greet = (name) => `Hello, ${name}`;
```

**The Array methods you'll use constantly:**

```javascript
const entries = [
  { id: "abc", category: "work", priority: "high" },
  { id: "def", category: "personal", priority: "low" },
];

// .filter() — returns a new array of matching items
const workEntries = entries.filter(e => e.category === "work");

// .map() — transforms each item, returns new array
const ids = entries.map(e => e.id);

// .find() — returns first match (not an array)
const target = entries.find(e => e.id === "abc");

// .some() — returns true if any item matches
const hasHighPriority = entries.some(e => e.priority === "high");

// .sort() — sorts in place (mutates original!)
entries.sort((a, b) => a.category.localeCompare(b.category));
```

**Destructuring — this will feel like a superpower:**

```javascript
// Object destructuring
const { id, category, priority } = entry;

// Array destructuring
const [first, second, ...rest] = entries;

// In function parameters
function displayEntry({ id, category, content }) {
  console.log(`[${category}] ${content}`);
}
```

**Topics covered:**
- Function declarations vs expressions vs arrow functions
- Scope: block scope, function scope, closures (brief)
- Objects: creation, property access, mutation, methods
- Object spread: `{ ...existing, updatedAt: new Date() }`
- Arrays: all major methods (map, filter, find, reduce, sort, some, every)
- Destructuring objects and arrays
- Rest/spread operators
- A note on `this` — why it behaves differently in arrow functions

---

### Module 3: Error Handling & Defensive Coding
**Target: 1 session**

The PowerShell `try/catch` pattern translates almost directly. The differences are in the details.

```javascript
try {
  const data = JSON.parse(rawInput); // might throw SyntaxError
  processData(data);
} catch (error) {
  console.error(`Failed to parse input: ${error.message}`);
  // error.name tells you the error type
  // error.stack gives you the call stack
} finally {
  console.log("This runs regardless");
}
```

**Defensive patterns you'll use constantly:**

```javascript
// Optional chaining — don't throw if something is null
const category = entry?.metadata?.category;  // undefined instead of crash

// Nullish coalescing — default value if null or undefined
const priority = entry.priority ?? "medium";

// Combining them
const label = entry?.category ?? "uncategorized";
```

**Topics covered:**
- `try/catch/finally`
- Built-in error types: `TypeError`, `RangeError`, `SyntaxError`
- Throwing your own errors: `throw new Error("message")`
- Optional chaining (`?.`)
- Nullish coalescing (`??`)
- `console.table()` for logging arrays of objects (you'll love this)
- `console.time()` / `console.timeEnd()` for performance checks

---

### Module 4: Asynchronous JavaScript
**Target: 2–3 sessions**

**This is where PowerShell developers usually need to slow down.** The concepts aren't alien — PowerShell has jobs and runspaces — but in JS, async is woven into the language at a deeper level.

**Why async?** The browser has one thread. If your code blocks waiting for something (a file, a network response, a timer), the entire UI freezes. So JS is designed to say "start this, tell me when it's done, go do other things."

**The evolution (you'll see all three in the wild):**

```javascript
// 1. Callbacks — the old way. Works but gets ugly fast.
fetchData(url, function(error, result) {
  if (error) { handleError(error); return; }
  processResult(result);
});

// 2. Promises — cleaner, chainable
fetchData(url)
  .then(result => processResult(result))
  .catch(error => handleError(error));

// 3. async/await — the modern way. Reads like synchronous code.
async function loadData() {
  try {
    const result = await fetchData(url);
    processResult(result);
  } catch (error) {
    handleError(error);
  }
}
```

**We will use `async/await` as our standard. The others exist so you can read code that uses them.**

**`fetch()` — making HTTP requests from the browser:**

```javascript
async function getEntries() {
  const response = await fetch("/api/entries");
  
  if (!response.ok) {
    throw new Error(`Server returned ${response.status}`);
  }
  
  const data = await response.json();
  return data;
}
```

**Topics covered:**
- The event loop — conceptual model only, not deep internals
- Callbacks (brief — know it, don't use it new)
- Promises: `.then()`, `.catch()`, `.finally()`, `Promise.all()`
- `async/await` — the syntax we use
- `fetch()` API — GET, POST with body, headers
- Handling fetch errors (network error vs bad status code)
- `JSON.stringify()` for request bodies

---

## Phase 2: The Browser Environment

### Module 5: HTML, CSS & the DOM
**Target: 2 sessions**

This is not a design course. The goal is: functional, readable, not embarrassing.

**The relationship:**
- **HTML** = structure (the bones)
- **CSS** = presentation (the skin)
- **JavaScript** = behavior (the muscles)

**Selecting elements:**

```javascript
// By ID — returns one element
const form = document.getElementById("log-entry-form");

// By CSS selector — returns first match
const submitBtn = document.querySelector(".submit-btn");

// By CSS selector — returns all matches (NodeList, not array)
const entries = document.querySelectorAll(".entry-item");
// Convert to array if you need .filter(), .map() etc:
const entriesArray = Array.from(entries);
```

**Reading and writing content:**

```javascript
element.textContent = "Safe text — no HTML injection risk";
element.innerHTML = "<strong>Parsed as HTML — use carefully</strong>";
inputElement.value;  // reading a form input's current value
```

**Creating elements:**

```javascript
const li = document.createElement("li");
li.textContent = entry.content;
li.dataset.id = entry.id;  // store the UUID on the element
list.appendChild(li);
```

**CSS you need to know:**
- Selectors: element, class (`.`), id (`#`), descendant (` `)
- Box model: margin, border, padding, width/height
- Flexbox for layout: `display: flex`, `flex-direction`, `justify-content`, `align-items`, `gap`
- A minimal stylesheet will be provided as a starting template

---

### Module 6: Events & Interactivity
**Target: 2 sessions**

```javascript
// The pattern you'll use everywhere
element.addEventListener("click", function(event) {
  // event.target is the element that was clicked
  // event.preventDefault() stops default browser behavior (e.g., form submit)
  console.log("Clicked:", event.target);
});
```

**Event delegation — one listener for many elements:**
Instead of adding a listener to every list item, add one listener to the list.

```javascript
entryList.addEventListener("click", function(event) {
  const item = event.target.closest(".entry-item");
  if (!item) return;
  
  const entryId = item.dataset.id;
  handleEntryClick(entryId);
});
```

This pattern becomes essential when you're dynamically adding and removing list items.

**Topics covered:**
- `addEventListener` / `removeEventListener`
- Common events: `click`, `input`, `change`, `submit`, `keydown`, `DOMContentLoaded`
- The event object: `event.target`, `event.type`, `event.preventDefault()`
- Event delegation
- Form handling: reading field values on submit
- Dynamic list rendering

---

### 🔬 Lab 1: Daily Log Entry Form
**Push to GitHub | Branch: `lab/01-log-form`**

Build a single `index.html` file that:
- [ ] Has a form with: timestamp (auto-populated to now), category dropdown (Work / Personal / Health / Admin), priority selector (Low / Medium / High), and a text area for content
- [ ] On submit, logs the form data as a structured object to `console.log()` — no storage yet
- [ ] Clears the form after submission
- [ ] Has basic, functional CSS (use the starter template provided in the lesson)
- [ ] **No external libraries or frameworks**

**Git requirements:**
- At least 3 meaningful commits (structure → functionality → styling)
- Commit messages in Conventional Commits format
- README.md that explains what the app does

---

## Phase 3: Client-Side Persistence & CRUD

### Module 7: localStorage, JSON & the UUID Data Model
**Target: 2 sessions**

**The storage options:**

| Storage | Persists | Scope | Limit |
|---|---|---|---|
| `localStorage` | Until cleared | Domain | ~5MB |
| `sessionStorage` | Until tab closes | Tab | ~5MB |
| Cookies | Configurable | Domain (+ sent to server) | 4KB |

We use `localStorage`. It's simple, synchronous, and perfect for client-side apps.

```javascript
// localStorage only stores strings — JSON is the bridge
localStorage.setItem("entries", JSON.stringify(entriesArray));
const entries = JSON.parse(localStorage.getItem("entries") ?? "[]");
localStorage.removeItem("entries");
```

**We always abstract this — never call localStorage directly in your UI code:**

```javascript
// data-layer.js — the only place that touches storage
const STORAGE_KEY = "log_entries";

function loadEntries() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}
```

**The Log Entry Data Model — Version 1.0:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "createdAt": "2026-07-02T14:30:00.000Z",
  "updatedAt": "2026-07-02T14:30:00.000Z",
  "category": "work",
  "priority": "medium",
  "content": "Completed identity review for Q3 audit",
  "tags": ["identity", "quarterly"],
  "deletedAt": null
}
```

**Why these fields:**
- `id` — UUID v4, assigned at creation, never changes
- `createdAt` — immutable creation timestamp (ISO 8601 UTC)
- `updatedAt` — changes on every edit (tracks modification history)
- `deletedAt` — soft delete: null means active, timestamp means deleted
- `tags` — array of strings for flexible categorization

**Generating a UUID:**
```javascript
const id = crypto.randomUUID();
// "f47ac10b-58cc-4372-a567-0e02b2c3d479"
// No library. No install. It's just there.
```

---

### Module 8: The CRUD Pattern
**Target: 2 sessions**

CRUD is not just an acronym — it's the complete vocabulary of data manipulation. Every data operation your apps will ever need is one of these four.

**The data access layer:**

```javascript
// data-layer.js

function createEntry(formData) {
  const entries = loadEntries();
  
  const newEntry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    ...formData  // spread the form fields in
  };
  
  entries.push(newEntry);
  saveEntries(entries);
  logOperation("CREATE", newEntry.id);  // audit trail preview
  return newEntry;
}

function readEntries({ includeDeleted = false } = {}) {
  const entries = loadEntries();
  return includeDeleted ? entries : entries.filter(e => e.deletedAt === null);
}

function updateEntry(id, changes) {
  const entries = loadEntries();
  const index = entries.findIndex(e => e.id === id);
  
  if (index === -1) throw new Error(`Entry ${id} not found`);
  
  const before = { ...entries[index] };
  entries[index] = { ...entries[index], ...changes, updatedAt: new Date().toISOString() };
  saveEntries(entries);
  logOperation("UPDATE", id, { before, after: entries[index] });
  return entries[index];
}

function deleteEntry(id) {
  // Soft delete — we keep the record, mark it deleted
  return updateEntry(id, { deletedAt: new Date().toISOString() });
}
```

**Topics covered:**
- The four CRUD operations and their signatures
- Soft delete vs hard delete — and when to use each
- Searching and filtering collections
- Sorting: by date, by priority, by category
- The audit trail stub (`logOperation`) — previewing Phase 7
- Data validation before saving

---

### 🔬 Lab 2: Full CRUD Log App
**Push to GitHub | Branch: `lab/02-log-crud`**

Expand Lab 1 into a complete CRUD application:
- [ ] **Create:** Form from Lab 1 now saves to localStorage using the data model above
- [ ] **Read:** Display all entries in a list, newest first
- [ ] **Update:** Click an entry to open an edit form, save changes
- [ ] **Delete:** Delete button with a confirmation prompt (soft delete)
- [ ] Every entry has a UUID (visible in small text or `data-id` attribute)
- [ ] Filter entries by category (dropdown or buttons)
- [ ] `console.log()` every CRUD operation with the operation type and UUID

**Git requirements:**
- Feature branches for each CRUD operation if you want the practice
- Minimum: meaningful commits for each major feature
- Updated README with app description and how to run it

**Stretch goal:** Display a count of entries per category in the UI.

---

## Phase 4: Git Discipline

### Module 9: Git Workflow for Solo Developers
**Target: 2 sessions (can overlap with Phase 3)**

**Branching strategy:**
```
main          ← always stable, always works
  └─ develop  ← integration branch
       └─ feature/add-tag-filter   ← one branch per feature
       └─ fix/date-sorting-bug
       └─ lab/03-time-tracker
```

**Commit message conventions (Conventional Commits):**
```
feat: add UUID to log entry model
fix: correct date formatting in entry list
refactor: extract CRUD operations to data-layer module
docs: add lab 2 instructions to README
chore: add .gitignore for node_modules
style: format code with Prettier
```

**The `.gitignore` you need from day one:**
```
node_modules/
.env
.env.local
*.log
.DS_Store
Thumbs.db
dist/
```

**Commands you'll use daily:**
```bash
git status                    # where am I, what changed
git add -p                    # stage changes interactively (better than git add .)
git commit -m "feat: ..."     # commit with message
git push origin feature/name  # push branch
git log --oneline --graph     # visualize history
git diff                      # what changed since last commit
git stash                     # temporarily shelve work in progress
```

**The things that bite new users:**
- `git reset --hard` deletes your uncommitted work permanently. Know what you're doing.
- `git revert` is safe — it adds a new commit that undoes a previous one. Use this on `main`.
- Don't commit secrets. If you do, the secret is in the history forever — rotation is the only fix.

---

## Phase 5: External APIs & App Suite

### Module 10: Working with External APIs — The Claude API
**Target: 2–3 sessions**

You've been making `fetch()` calls to your own server. Now you'll call someone else's. This module uses the Claude API as the primary example because it's immediately useful, well-documented, and exposes a real security lesson you need to internalize before Phase 6.

**What an API key is:**
An API key is a credential — like a password, but for machines. It identifies who is making the request and what they're allowed to do. The Claude API requires one for every call. Treat it like a password: never share it, never hardcode it, never commit it.

**The Claude API — structure of a request:**

```javascript
// This is what talking to Claude looks like from code
async function askClaude(userMessage) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "YOUR_API_KEY_HERE",        // ← the credential
      "anthropic-version": "2023-06-01"          // API versioning header
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [
        { role: "user", content: userMessage }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status}`);
  }

  const data = await response.json();
  // The response lives here:
  return data.content[0].text;
}
```

**The anatomy of the request:**
- `method: "POST"` — you're sending data, not just requesting it
- `headers` — metadata about the request: content type, authentication, API version
- `body` — the actual payload, serialized to JSON string
- `model` — which Claude model to use
- `max_tokens` — maximum length of the response (controls cost and length)
- `messages` — the conversation history as an array; this is how multi-turn conversations work

**The anatomy of the response:**
```json
{
  "id": "msg_01XFDUDYJgAACzvnptvVoYEL",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Claude's response text here..."
    }
  ],
  "model": "claude-sonnet-4-6",
  "usage": {
    "input_tokens": 25,
    "output_tokens": 142
  }
}
```

Note `usage` — the API charges per token. Being aware of token counts is good practice.

**Multi-turn conversations — how memory works:**
Claude has no memory between API calls. Every call is stateless. To have a conversation, you send the entire history with each request:

```javascript
const conversationHistory = [];

async function chat(userMessage) {
  conversationHistory.push({ role: "user", content: userMessage });

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { /* ... */ },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: conversationHistory   // send the full history every time
    })
  });

  const data = await response.json();
  const assistantMessage = data.content[0].text;

  // Add Claude's response to history for next turn
  conversationHistory.push({ role: "assistant", content: assistantMessage });
  return assistantMessage;
}
```

**System prompts — giving Claude a role:**
```javascript
body: JSON.stringify({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  system: "You are a concise log analyst. When given log entries, identify patterns, anomalies, and summarize key events. Respond in plain text, not markdown.",
  messages: conversationHistory
})
```

The `system` prompt is how you give Claude a persona, instructions, or constraints. This is the foundation of building AI-powered features into your apps — e.g., "summarize today's log entries" or "suggest priority for this task."

**The Security Problem — and why it matters right now:**

Try putting your API key directly in a browser-loaded JavaScript file and calling Claude from the client side. It works. Then open DevTools → Sources → find your JS file → your API key is sitting there in plain text for anyone to read.

This is not a theoretical risk. It's a common and costly mistake. API keys leaked this way get scraped by bots, used to rack up charges on your account, and are often committed to public GitHub repos by accident.

**The conclusion you need to reach before Phase 6:** Client-side code cannot safely hold secrets. The fix is a server-side proxy — your browser calls *your* Express server, which holds the API key in an `.env` file and calls Claude on your behalf. We build that in Module 14.

**Other APIs you'll encounter — the patterns are the same:**
The skills here transfer directly:
- Authentication services (OAuth, OIDC providers): `fetch()` + headers + JSON body
- Informational APIs (weather, maps, data services): GET requests + query params + API key in header
- Your own future APIs: the server you build in Phase 6

**Topics covered:**
- REST API conventions: base URL, endpoints, methods, headers, body
- API authentication patterns: API key in header, Bearer tokens, Basic auth
- Reading API documentation (using Anthropic docs as example)
- `fetch()` in depth: request options, response parsing, error handling
- HTTP response codes in the context of API calls
- The API key security problem — and why it must be solved server-side
- Rate limiting: what it is, how to handle 429 responses with retry logic
- Token/cost awareness for LLM APIs

---

### 🔬 Lab 3: AI-Powered Log Summarizer (Client-Side)
**Push to GitHub | Branch: `lab/03-api-explorer`**

Build a page that calls the Claude API directly from the browser to summarize your log entries.

- [ ] Load saved entries from localStorage (reuse your data layer from Lab 2)
- [ ] A "Summarize Today" button that sends today's entries to Claude and displays the summary
- [ ] A system prompt that instructs Claude to act as a log analyst
- [ ] Display Claude's response in the UI
- [ ] Handle errors gracefully (API down, rate limit, bad key)
- [ ] `console.log()` the token usage from each response

**The intentional lesson:** You will put your API key somewhere to make this work. Document in your README exactly where the key lives and why that's a problem. This documentation is part of the grade. The solution arrives in Module 14.

**Git requirements:**
- Your `.gitignore` must prevent any file containing your actual API key from being committed
- README must describe the security limitation and note that Phase 6 fixes it

---

### Module 11: App #2 — Time & Executive Function Tracker
**Target: 3–4 sessions**

This is an applied module — you design and build this yourself, using everything from Phases 1–5. I'll review your approach before you start and provide guidance when you're stuck.

**Requirements:**
- Time entry logging (manual entry or start/stop timer)
- Task/focus session tracking with categories
- Daily summary view (total time by category)
- **Shared UUID data model** — a time entry uses the same `id` conventions as a log entry. They could live in the same storage or be imported/exported between apps.
- JSON export function (portability proof of concept — a UUID means records survive the journey)
- Stretch goal: "Summarize my day" button that sends the day's time entries to Claude

---

### 🔬 Lab 4: Time Tracker
**Push to GitHub | Branch: `lab/04-time-tracker`**

No scaffolding. Design it yourself, build it yourself.

**Minimum requirements:**
- [ ] Start/stop timer for focus sessions
- [ ] Manual time entry (for retroactive logging)
- [ ] Category tagging (same categories as Log App — consistency matters)
- [ ] Daily summary: total time by category
- [ ] Full CRUD with localStorage
- [ ] UUID on every record
- [ ] JSON export button

This lab is a competency demonstration for Phases 1–5. It's the gate to Phase 6.

---

## Phase 6: Web Server, REST API & Server-Side Proxy

### Module 12: How the Web Actually Works
**Target: 1 session**

You know this. We're formalizing the vocabulary you've used for 30 years.

**HTTP Request/Response:**
- **Request:** Method + URL + Headers + (optional) Body
- **Response:** Status code + Headers + Body
- Status codes you'll deal with: `200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `500 Internal Server Error`

**CRUD → HTTP Verb mapping:**
| CRUD | HTTP Verb | Example |
|---|---|---|
| Create | `POST` | `POST /api/entries` |
| Read | `GET` | `GET /api/entries` or `GET /api/entries/:id` |
| Update | `PUT` / `PATCH` | `PUT /api/entries/:id` |
| Delete | `DELETE` | `DELETE /api/entries/:id` |

Note: `PUT` replaces the entire record. `PATCH` updates specific fields. We'll use `PATCH` for updates.

**Why `:id` is a UUID:** `GET /api/entries/f47ac10b-58cc-4372-a567-0e02b2c3d479` — the UUID in the URL uniquely identifies the record across the entire universe. This is the payoff.

**REST principles (brief):**
- Resources are nouns (`/entries`, `/users`), not verbs (`/getEntries`)
- Stateless: each request contains everything the server needs
- Consistent: the same URL always refers to the same resource

---

### Module 13: Node.js & Express — Your First Server
**Target: 3–4 sessions**

**Setup on Linux Mint (do this once):**
```bash
# Install nvm (Node Version Manager — never install Node directly)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc

# Install the current LTS version of Node
nvm install --lts
nvm use --lts

# Verify
node --version
npm --version
```

**Your first Node.js project:**
```bash
mkdir log-app-server && cd log-app-server
npm init -y                    # creates package.json
npm install express            # install Express framework
npm install --save-dev nodemon # auto-restart server on file changes
```

**`package.json` scripts section:**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

**A minimal Express server:**
```javascript
// server.js
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware: parse JSON request bodies
app.use(express.json());

// Serve static files (your HTML/CSS/JS)
app.use(express.static("public"));

// A simple route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

**Topics covered:**
- Node.js vs browser JS: what's different (`require` vs `import`, no DOM, `process`, `__dirname`)
- npm: `package.json`, installing packages, `package-lock.json`
- CommonJS modules (`require`/`module.exports`) — what you'll see most
- ES Modules (`import`/`export`) — the modern standard
- File system module: `fs.readFile`, `fs.writeFile`, `fs.promises`
- Express routing: `app.get()`, `app.post()`, `app.put()`, `app.delete()`
- Middleware concept: `app.use()`, execution order
- `req` (request) and `res` (response) objects
- Route parameters: `req.params.id`
- Query strings: `req.query`
- Request body: `req.body`
- Error handling middleware

---

### 🔬 Lab 5: Hello Server
**Push to GitHub | Branch: `lab/05-hello-server`**

- [ ] Express server that serves your Log App HTML from a `/public` folder
- [ ] `GET /api/health` returns `{ status: "ok", timestamp: "..." }`
- [ ] `GET /api/entries` returns a hardcoded array of 3 log entries (no file I/O yet)
- [ ] Server logs every request to the console: `[GET] /api/entries - 200`
- [ ] `.gitignore` includes `node_modules/`
- [ ] `npm start` runs the server

---

### Module 14: REST API for the Log App + Server-Side API Proxy
**Target: 4–5 sessions**

**Moving from localStorage to server-side JSON files (the stepping stone):**

```javascript
// entries-store.js — server-side data layer
const fs = require("fs").promises;
const path = require("path");

const DATA_FILE = path.join(__dirname, "data", "entries.json");

async function loadEntries() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];  // file doesn't exist yet — start fresh
  }
}

async function saveEntries(entries) {
  await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), "utf8");
}
```

**The full CRUD API:**
```javascript
// Create
app.post("/api/entries", async (req, res) => {
  const entries = await loadEntries();
  const newEntry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    ...req.body
  };
  entries.push(newEntry);
  await saveEntries(entries);
  res.status(201).json(newEntry);
});

// Read all
app.get("/api/entries", async (req, res) => {
  const entries = await loadEntries();
  res.json(entries.filter(e => e.deletedAt === null));
});

// Read one
app.get("/api/entries/:id", async (req, res) => {
  const entries = await loadEntries();
  const entry = entries.find(e => e.id === req.params.id);
  if (!entry) return res.status(404).json({ error: "Entry not found" });
  res.json(entry);
});

// Update
app.patch("/api/entries/:id", async (req, res) => {
  const entries = await loadEntries();
  const index = entries.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Entry not found" });
  entries[index] = { ...entries[index], ...req.body, updatedAt: new Date().toISOString() };
  await saveEntries(entries);
  res.json(entries[index]);
});

// Delete (soft)
app.delete("/api/entries/:id", async (req, res) => {
  return app.patch(`/api/entries/${req.params.id}`, 
    { ...req, body: { deletedAt: new Date().toISOString() } }, res);
});
```

**Topics covered:**
- CORS — what it is, why you'll hit it, the `cors` npm package
- Input validation with basic checks (required fields, type checking)
- HTTP status codes in practice
- Updating your front-end `fetch()` calls to hit the API
- The `data/` folder: should it be in `.gitignore`? (Yes, for real user data. No, for sample seed data — your call.)
- Server-side request logging: `[POST] /api/entries - 201 - 12ms`

---

**The Server-Side API Proxy — solving the Lab 3 security problem:**

This is where the Lab 3 lesson pays off. Your Express server becomes the middleman: the browser calls your server, your server calls Claude, your server returns the result. The API key lives only on the server, in an `.env` file that is never committed.

```javascript
// .env (never committed)
ANTHROPIC_API_KEY=sk-ant-your-key-here

// server.js — the proxy endpoint
const Anthropic = require("@anthropic-ai/sdk");

const claude = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY   // loaded from .env by dotenv
});

app.post("/api/claude/summarize", async (req, res) => {
  const { entries, systemPrompt } = req.body;

  try {
    const message = await claude.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: systemPrompt ?? "You are a log analyst. Summarize the provided entries concisely.",
      messages: [
        {
          role: "user",
          content: `Summarize these log entries:\n\n${JSON.stringify(entries, null, 2)}`
        }
      ]
    });

    res.json({
      summary: message.content[0].text,
      usage: message.usage
    });

  } catch (error) {
    console.error("Claude API error:", error.message);
    res.status(502).json({ error: "AI service unavailable" });
  }
});
```

**The browser now calls your server, not Claude directly:**

```javascript
// In your front-end — no API key visible anywhere
async function summarizeEntries(entries) {
  const response = await fetch("/api/claude/summarize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entries })
  });

  const data = await response.json();
  return data.summary;
}
```

The API key is gone from the browser entirely. This is the correct architecture.

**The Anthropic Node.js SDK:**
The raw `fetch()` approach in Module 10 is instructive. The SDK is more ergonomic for production use:
```bash
npm install @anthropic-ai/sdk
```

Both approaches work. The SDK handles retries, error types, and streaming — worth using once you've seen the raw API underneath it.

**Topics covered (additions for proxy):**
- The `@anthropic-ai/sdk` Node.js package
- Server-side environment variable loading with `dotenv`
- Proxy pattern: client → your server → external API → your server → client
- Error handling for external API calls: don't leak upstream errors to the client
- Rate limit handling: 429 responses, retry with exponential backoff
- Logging API usage server-side (token counts, latency, model used)
- Cost awareness: log `usage.input_tokens` and `usage.output_tokens` on every call

---

### 🔬 Lab 6: Log App — Server Edition + AI Summarizer
**Push to GitHub | Branch: `lab/06-server-log-app`**

- [ ] Log App UI from Lab 2 updated to use `fetch()` instead of localStorage
- [ ] Express API with full CRUD for entries
- [ ] Data persists in `data/entries.json`
- [ ] Every API request logged server-side with method, path, status, duration
- [ ] UUID identifies every record in every URL and in the data file
- [ ] CORS configured for local development
- [ ] `/api/claude/summarize` proxy endpoint (API key in `.env`, never in client code)
- [ ] "Summarize" button in the UI calls the proxy and displays Claude's response
- [ ] README updated with setup instructions (`npm install`, `npm start`, `.env.example`)

This lab is the gate to Phase 7.

---

## Phase 7: DevSecOps, Security & Audit Logging

### Module 15: Security Fundamentals
**Target: 2 sessions**

**Threat model for a personal/home-network app:**
You're not defending against nation-states. You're defending against:
- Yourself (accidentally committing a secret)
- Anyone who finds an open port on your home network
- Future-you forgetting what this thing even does

**Environment variables — secrets management:**
```bash
# .env file (NEVER commit this)
PORT=3000
DATA_DIR=/home/james/log-app/data
```

```javascript
// In your app — dotenv loads .env into process.env
require("dotenv").config();
const port = process.env.PORT ?? 3000;
```

Add to `.gitignore`: `.env`, `.env.*`
Add to your repo: `.env.example` with placeholder values and a comment explaining each one.

**Input sanitization:**
Never trust data from a client. Validate on the server, every time.

**Topics covered:**
- Environment variables and `dotenv`
- Never committing secrets — and what to do if you accidentally do
- HTTPS basics: TLS handshake, certificates, public/private key pairs
- Self-signed certificates for development
- OWASP Top 10 survey — light touch, awareness level
- Rate limiting: `express-rate-limit` package

---

### Module 16: HTTPS & Certificate-Based Authentication
**Target: 3–4 sessions**

**HTTPS setup on Linux Mint (self-signed for home network):**
```bash
# Generate a self-signed certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout server.key -out server.cert \
  -subj "/CN=localhost"
```

```javascript
// HTTPS server in Node.js
const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert")
};

https.createServer(options, app).listen(443, () => {
  console.log("HTTPS server running");
});
```

**Certificate-based client authentication:**
Instead of passwords, the client presents a certificate to prove identity. The server checks it against a trusted CA (Certificate Authority) you control.

```javascript
// Server requires client certificates
const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
  ca: fs.readFileSync("ca.cert"),       // your CA certificate
  requestCert: true,                    // ask clients for their cert
  rejectUnauthorized: true              // reject clients without valid cert
};
```

**Topics covered:**
- Public key infrastructure (PKI) — conceptual model
- Certificate authority: creating your own CA for home network
- Generating client certificates
- Configuring Node/Express to require client certs
- Reading the client certificate in middleware (extract identity from cert)
- Revoking certificates (CRL basics)

---

### Module 17: CRUD Logging & Audit Trails
**Target: 2 sessions**

This is where identity management meets JavaScript. Every data operation leaves a traceable record.

**The audit log entry model:**

```json
{
  "id": "a1b2c3d4-...",
  "timestamp": "2026-07-02T14:30:00.000Z",
  "operation": "UPDATE",
  "targetType": "log_entry",
  "targetId": "550e8400-...",
  "performedBy": "james/cert-fingerprint-here",
  "changes": {
    "before": { "priority": "low", "content": "..." },
    "after":  { "priority": "high", "content": "..." }
  }
}
```

**Every CRUD operation generates an audit record:**
- `CREATE` → who created what, with what initial values
- `READ` — log bulk reads and searches (not every single GET)
- `UPDATE` → who changed what, before and after values
- `DELETE` → soft delete records the actor and timestamp; hard delete records the final state before removal

**Structured logging (JSON logs, not string concatenation):**
```javascript
// Bad — hard to parse, hard to query
console.log(`User updated entry ${id} at ${timestamp}`);

// Good — machine-readable, queryable, filterable
console.log(JSON.stringify({
  level: "info",
  event: "ENTRY_UPDATED",
  entryId: id,
  userId: req.user.id,
  timestamp: new Date().toISOString()
}));
```

**Topics covered:**
- Audit log data model
- Middleware that automatically logs CRUD operations
- Before/after capture for UPDATE operations
- JSON-structured logging
- Log file output and rotation basics (`rotating-file-stream` package)
- Querying your own logs: filtering by operation type, user, date range, target UUID

---

## Phase 8: Capstone Project
**Target: 4–6 sessions**

Build the integrated, secured version of your suite.

**Requirements:**
- [ ] Log App and Time Tracker sharing a common UUID-based data model
- [ ] Node.js/Express server, HTTPS, certificate-based authentication
- [ ] Full CRUD API with input validation
- [ ] Complete audit trail for all CRUD operations
- [ ] JSON export with UUID-preserved portability (import to either app, no ID conflicts)
- [ ] Server-side structured logging to file
- [ ] README that documents the architecture, setup, and certificate generation process
- [ ] Clean git history with meaningful commits

**This is a portfolio piece.** It demonstrates full-stack JavaScript, security-conscious development, identity-aware logging, and Git discipline.

---

## Lab Submission Standards (All Labs)

Every lab pushed to GitHub must include:
1. **Working code** — the app runs without errors
2. **README.md** — what it does, how to run it, any setup steps
3. **Meaningful git history** — not one giant commit
4. **Conventional Commit messages** — `feat:`, `fix:`, `refactor:`, etc.
5. **No `node_modules`** in the repo (enforced by `.gitignore`)
6. **No secrets** committed (`.env` in `.gitignore`)

Labs are gates. I'll review your lab before we move to the next phase.

---

## Recommended VS Code Extensions

| Extension | Purpose |
|---|---|
| ESLint | Catches JS errors and style issues as you type |
| Prettier | Auto-formats code on save |
| GitLens | Visualizes git history inline in the editor |
| Live Server | Instant browser reload for client-side work |
| REST Client | Test API endpoints from inside VS Code |
| Error Lens | Shows error messages inline (not just underlines) |
| Todo Tree | Tracks `// TODO:` comments across your project |

---

## Quick Reference: The UUID Everywhere Checklist

From Module 7 onward, every record you create must have:
- [ ] `id: crypto.randomUUID()` — set at creation, never changed
- [ ] `createdAt: new Date().toISOString()` — immutable
- [ ] `updatedAt: new Date().toISOString()` — updated on every change
- [ ] `deletedAt: null` — set to timestamp on soft delete, never `undefined`

This is non-negotiable. It's the foundation that makes everything else in the audit trail and portability story work.

---

## Curriculum Maintenance

This document lives in the root of the `js-training-labs` GitHub repository as `CURRICULUM.md`. It is a versioned, living reference — not a static plan.

### How updates work

Changes to the curriculum are committed to GitHub like any other code change. Use the `docs:` conventional commit prefix:

```
docs: add review notes from Python colleague - Module 14 auth section
docs: mark Lab 2 complete
docs: restructure Phase 7 based on progress feedback
```

### Who can trigger a revision

- **James** — any time a module feels wrong in practice, too fast, too slow, or missing something real
- **Mike** — architectural feedback, especially on data modeling and UUID patterns
- **Python colleague** — API design, server-side patterns, DevSecOps practices (Phases 6–7 priority)
- **Claude** — when a module teaches something and the lab reveals a gap

### Progress tracking

Each lab checklist in this document can be updated as items are completed. When a lab is fully submitted and reviewed, add a completion note:

```markdown
### 🔬 Lab 2: Full CRUD Log App ✅
**Completed:** 2026-08-14 | **Branch:** lab/02-log-crud | **Notes:** Soft delete took two attempts to wire up correctly.
```

### Conversation threading

Each module gets its own conversation in the Claude Project. Start each conversation by noting which module you're working on. The project memory carries context about your background and goals; the curriculum document carries the structural plan. Together they give each session a full picture without re-explaining everything.

### What should not change

The core architectural principles are not up for revision based on convenience:
- UUID on every record, from the first time data is saved
- `const` by default, `let` when necessary, `var` never
- No API keys in client-side code
- No secrets committed to git
- Labs are gates — move forward only when the lab is pushed and working

---

*This document is a living reference. Update it as the curriculum evolves.*
