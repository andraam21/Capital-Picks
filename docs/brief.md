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

