---

# 🧮 Calculator Development Journey (HTML + CSS + JS)

## 📌 Stage 1: Basic Calculator (Everything on Screen)

### 🔹 Code Logic

```javascript
function clicked(val){
    document.getElementById('screen').value += val
}

function equalSign(){
    var text = document.getElementById('screen').value
    var result = eval(text)
    document.getElementById('screen').value = result
}
```

---

### 🧠 How It Works

* The **screen stores the entire expression**
* Example:

  ```text
  100 + 20 → "100+20"
  ```
* When `=` is pressed:

  ```javascript
  eval("100+20") → 120
  ```

---

### ✅ Advantages

* Very simple
* Easy to implement

---

### ❌ Problems

* UI not realistic
* Screen becomes cluttered:

  ```text
  125+75*4-20
  ```
* Cannot mimic real calculator behavior

---

# 📌 Stage 2: UI Improvement (Show Only Current Number)

### 🎯 Goal

```text
Show only the current number on screen
```

Example:

```text
100 → + → (screen clears) → 20
```

---

### ❌ Problem Introduced

* Now screen does NOT contain full expression
* `eval(screen.value)` no longer works

---

# 📌 Stage 3: Introduced `expression` (Core Concept)

### 🔹 New Variable

```javascript
let expression = ""
```

---

### 🧠 New Data Model

| Component    | Role             |
| ------------ | ---------------- |
| `screen`     | current number   |
| `expression` | full calculation |

---

### 🔹 Updated Logic

```javascript
function clicked(val){
    var text = document.getElementById('screen').value

    if (!isNaN(val)){
        screen.value += val
    } else {
        expression += text
        expression += val
        screen.value = ""
    }
}
```

---

### 🧠 Flow Example

```text
125 + 75 * 4 - 20
```

| Step | expression  | screen |
| ---- | ----------- | ------ |
| 125  | ""          | "125"  |
| +    | "125+"      | ""     |
| 75   | "125+"      | "75"   |
| *    | "125+75*"   | ""     |
| 4    | "125+75*"   | "4"    |
| -    | "125+75*4-" | ""     |
| 20   | "125+75*4-" | "20"   |

---

### Equal Sign

```javascript
eval(expression + screen.value)
```

---

# 📌 Stage 4: First Major Bug

### ❌ Problem

```text
expression += val
```

👉 Caused duplication:

```text
"100*2" + "2" → "100*22"
```

---

### ✅ Fix

Only store:

```text
number → when operator is pressed
```

---

# 📌 Stage 5: Chain Calculation Issue

### ❌ Problem

```text
405 → - → 5 → =
```

Result:

```text
405400 ❌
```

---

### 🧠 Root Cause

After `=`:

```javascript
expression = result
screen = result
```

Then:

```javascript
expression += text
```

👉 Became:

```text
"405405-"
```

---

### ✅ Fix

```javascript
if (expression != text){
    expression += text
}
```

---

### 🧠 Logic

```text
If result already stored → don't store again
```

---

# 📌 Stage 6: Chain Calculation Working

### ✔ Example

```text
125 + 75 * 4 - 20 = 405
→ - → 5 → = → 400
→ * → 2 → = → 800
```

---

### 🔹 Key Line

```javascript
expression = result
```

---

### 🧠 Why?

Allows:

```text
next operation to use previous result
```

---

# 📌 Stage 7: Backspace Bug

### ❌ Problem

```javascript
expression = ""
```

👉 Deletes previous calculation

---

### ✅ Fix

```javascript
function backSpace(){
    var text = screen.value
    screen.value = text.slice(0, -1)
}
```

---

### 🧠 Logic

```text
Backspace should affect ONLY current number
```

---

# 📌 Stage 8: Operator Spam Issue

### ❌ Problem

```text
100 + * - 5
```

---

### ✅ Fix

```javascript
if (text === "" && expression !== ""){
    expression = expression.slice(0, -1)
}
```

---

### 🧠 Logic

```text
Replace last operator instead of stacking
```

---

# 📌 Stage 9: Final Working Model

---

## 🧠 Final Architecture

```text
screen → current number
expression → stored operations
```

---

## 🔁 Data Flow

### Typing Number

```text
screen += number
```

---

### Press Operator

```text
expression += screen
expression += operator
screen = ""
```

---

### Press Equal

```text
result = eval(expression + screen)
screen = result
expression = result
```

---

# 📌 Key Concepts Learned

---

## 🧠 1. Separation of Concerns

```text
UI ≠ Logic
```

---

## 🧠 2. State Management

```text
expression → memory
screen → current input
```

---

## 🧠 3. Event-Based Logic

Each button press triggers:

```text
different behavior depending on state
```

---

## 🧠 4. Conditional Logic

```javascript
if (number)
if (operator)
if (after equals)
```

---

## 🧠 5. Edge Case Handling

* Backspace
* Operator spam
* Chaining calculations

---

# 📌 Final Thoughts

You started with:

```text
simple string concatenation
```

You ended with:

```text
state-based calculator logic
```

---

# 🚀 What You Built

```text
✔ Functional calculator
✔ Supports chaining
✔ Clean UI behavior
✔ Handles edge cases
