# Product Brief & Technical Specification: Capital Attractions Finder

---

## 1. Executive Summary & Product Brief

### Problem & Target User
Travel planning for quick weekend trips, layovers, or initial city research often requires sifting through lengthy blog posts, ad-filled top-10 lists, and bloated travel forums just to find the essential highlights of a national capital.

The target user is a **traveler, student, or casual explorer** who wants an instantaneous, direct answer to two simple questions: *What is the capital of this country?* and *What are the top 3 must-see attractions there?*

### Existing Solutions & Why They Fail
* **Search Engines (e.g., Google Search):** Returning heavy ad placements, SEO-optimized affiliate blogs, and fragmented information across multiple search results.
* **Travel Apps (e.g., Tripadvisor):** Overwhelming interface designed around monetization, booking commissions, and hundreds of conflicting reviews rather than rapid answers.
* **General Knowledge APIs:** Require multiple requests (e.g., query REST Countries for capital, then query a places API for attractions) with complex payload structures.

---

## 2. Core Features (V1 Scope)

1. **Instant Capital & Attractions Lookup:** A clean search input accepting any valid country name and returning the capital city and top 3 landmark attractions.
2. **Structured Response Payload:** Clean JSON schema separating country metadata, capital name, and structured attraction cards (Name + Brief Description).
3. **Zero-Latency Fallback Database:** Embedded internal dataset for instant offline/fast lookup with graceful error handling for missing or misspelled inputs.

---

## 3. Deliberate V1 Omissions

* **User Accounts & Bookmarks:** No login, saved trips, or history storage to keep onboarding instantaneous.
* **Interactive Maps & Geolocation:** Map rendering and GPS navigation are deferred to external map integrations in future iterations.
* **Booking & Affiliate Links:** Zero third-party booking widgets or hotel ads to ensure a pure, distraction-free user experience.

---

## 4. Data Specification

### Input Schema (`{{INPUT}}`)
```json
{
  "country": "France"
}
```

### Output Schema (`{{OUTPUT}}`)
```json
{
  "country": "France",
  "capital": "Paris",
  "attractions": [
    {
      "name": "Eiffel Tower",
      "description": "An iconic 330-meter wrought-iron lattice tower offering panoramic city views."
    },
    {
      "name": "Louvre Museum",
      "description": "The world's largest art museum, home to the Mona Lisa and Venus de Milo."
    },
    {
      "name": "Arc de Triomphe",
      "description": "A monumental triumphal arch honoring those who fought and died for France."
    }
  ]
}
```

---

## 5. Implementation Code (Node.js Express API)

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// In-memory capital & attractions database
const CAPITAL_ATTRACTIONS_DB = {
  "france": {
    capital: "Paris",
    attractions: [
      { name: "Eiffel Tower", description: "An iconic 330-meter wrought-iron lattice tower offering panoramic city views." },
      { name: "Louvre Museum", description: "The world's largest art museum, home to the Mona Lisa and Venus de Milo." },
      { name: "Arc de Triomphe", description: "A monumental triumphal arch honoring those who fought and died for France." }
    ]
  },
  "japan": {
    capital: "Tokyo",
    attractions: [
      { name: "Senso-ji Temple", description: "Tokyo's oldest and most significant ancient Buddhist temple located in Asakusa." },
      { name: "Tokyo Skytree", description: "A broadcasting and observation tower that is the tallest structure in Japan." },
      { name: "Meiji Shrine", description: "A tranquil Shinto shrine dedicated to the deified spirits of Emperor Meiji." }
    ]
  },
  "italy": {
    capital: "Rome",
    attractions: [
      { name: "Colosseum", description: "An ancient stone amphitheater built in 80 AD for gladiatorial contests." },
      { name: "Vatican Museums & Sistine Chapel", description: "Immense collection of art, highlighted by Michelangelo's ceiling frescoes." },
      { name: "Pantheon", description: "A remarkably preserved ancient Roman temple featuring a massive concrete dome." }
    ]
  }
};

app.post('/api/get-attractions', (req, res) => {
  const { country } = req.body;

  if (!country || typeof country !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid "country" string parameter.' });
  }

  const normalizedCountry = country.trim().toLowerCase();
  const result = CAPITAL_ATTRACTIONS_DB[normalizedCountry];

  if (!result) {
    return res.status(404).json({
      error: `Data for "${country}" is not found. Try 'France', 'Japan', or 'Italy'.`
    });
  }

  return res.json({
    country: country.trim(),
    capital: result.capital,
    attractions: result.attractions
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```
