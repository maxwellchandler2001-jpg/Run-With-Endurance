# Run with Endurance 🏃✝️

A devotional brand for Christian runners — short, scripture-centered devotionals that connect the discipline of running with spiritual growth.

**Core Scripture:** *"Let us run with endurance the race set before us, looking unto Jesus, the author and finisher of our faith."* — Hebrews 12:1-2

## Tech Stack

- **Framework:** Vite + React
- **Styling:** Tailwind CSS v4
- **Typography:** Playfair Display (headings), Inter (body)
- **Backend:** Express (email newsletter capture)

## Project Structure

```
├── index.html          # Entry point with meta tags & fonts
├── vite.config.js      # Vite config with Tailwind & API proxy
├── server.js           # Express email API (runs on :8001)
├── src/
│   ├── main.jsx        # React entry
│   ├── App.jsx         # Landing page (all sections)
│   ├── content.js      # All devotional content data
│   └── index.css       # Tailwind with custom brand theme
└── public/             # Static assets
```

## Getting Started

```bash
# Install dependencies
npm install

# Start the Vite dev server (frontend on :3000)
npm run dev

# In a separate terminal, start the email API
node server.js
```

The Vite dev server proxies `/api` requests to the Express backend automatically.

## Devotionals

- **10 standalone devotionals** covering endurance, perseverance, discipline, rest, community, joy, suffering, pacing, identity, and gratitude
- **"The Race Set Before Us" series** — 7-part deep dive into Hebrews 12:1-2

## License

All content © Run with Endurance.
