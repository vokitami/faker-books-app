# 📚 Bookstore App

A web application that generates fake books using [Faker.js](https://fakerjs.dev/) and allows you to:
- View books in **table** or **gallery** mode.
- Switch languages (English, Spanish, German, Japanese).
- Filter by likes and reviews.
- Export displayed data to CSV.
- Infinite scrolling to load more books.
- Reproducible data generation using a *seed*.

---

## 🚀 Tech Stack
- **Frontend:** React + Vite  
- **Backend:** Node.js + Express  
- **Data Generation:** Faker.js  
- **Styling:** Tailwind CSS  

---

## 🔧 Prerequisites
- Install [Node.js](https://nodejs.org/) (v18 or higher recommended).  
- Install [npm](https://www.npmjs.com/).  
- (Optional) Git to clone the repository.  

---

## ⚙️ Installation & Running

### 1️⃣ Clone the repository
```bash
git clone <REPO-URL>
cd bookstore-app
```
----------------------------------------------------------------------
2️⃣ Install dependencies
bash
```npm install```
------------------------------------------------------------------------
3️⃣ Run the backend server
In a separate terminal window:

bash
```
cd src/backend
node server.js
```
------------------------------------------------------------------------
4️⃣ Start the frontend
In another terminal:

bash
```
npm run dev
```
The frontend will run at http://localhost:5173 (or 5174 if 5173 is already in use).
 ------------------------------------------------------------------

Key Features
Language Switcher: Change generation locale dynamically.

-----------------------------------------------------------------------------
Common Issues
"Could not resolve 'prop-types'"
Fix:

bash
```
npm install prop-types
```
Language not updating:
Restart the server (node server.js) and check if lang is passed correctly in the network request.

Empty book list:
Make sure the likes filter isn’t too high (it might filter out all books).

Random Seed: Generate new seeds for fresh data.

Likes Filter: Slider to show books based on popularity.

Reviews Generator: Numeric input for average reviews.

CSV Export: Download currently displayed books.

Table/Gallery View: Toggle between two views.

Infinite Scroll: Automatically load additional pages.
