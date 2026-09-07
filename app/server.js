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

// API Endpoint
app.post('/api/get-attractions', (req, res) => {
  const { country } = req.body;

  if (!country || typeof country !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid "country" string parameter.' });
  }

  const normalizedCountry = country.trim().toLowerCase();
  const result = CAPITAL_ATTRACTIONS_DB[normalizedCountry];

  if (!result) {
    return res.status(404).json({
      error: `Data for "${country}" not found. Try 'France', 'Japan', or 'Italy'.`
    });
  }

  return res.json({
    country: country.trim(),
    capital: result.capital,
    attractions: result.attractions
  });
});

// Serve HTML Homepage
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Capital Attractions Finder</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    
    body {
      background: #0f172a;
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow-x: hidden;
      position: relative;
    }

    /* Ambient Animated Bubbles */
    .bubble {
      position: absolute;
      border-radius: 50%;
      filter: blur(60px);
      z-index: 0;
      animation: float 8s ease-in-out infinite alternate;
    }
    .bubble-1 { width: 300px; height: 300px; background: rgba(99, 102, 241, 0.35); top: 10%; left: 15%; }
    .bubble-2 { width: 350px; height: 350px; background: rgba(236, 72, 153, 0.25); bottom: 10%; right: 15%; animation-delay: -4s; }
    .bubble-3 { width: 200px; height: 200px; background: rgba(56, 189, 248, 0.3); top: 50%; left: 50%; transform: translate(-50%, -50%); animation-delay: -2s; }

    @keyframes float {
      0% { transform: translateY(0px) scale(1); }
      100% { transform: translateY(-30px) scale(1.08); }
    }

    /* Glassmorphism Container */
    .card {
      position: relative;
      z-index: 10;
      background: rgba(30, 41, 59, 0.7);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      padding: 2.5rem;
      width: 100%;
      max-width: 500px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    }

    h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem; text-align: center; }
    p.subtitle { color: #94a3b8; font-size: 0.95rem; text-align: center; margin-bottom: 1.75rem; }

    .input-group {
      display: flex;
      gap: 0.5rem;
      background: rgba(15, 23, 42, 0.6);
      padding: 0.5rem;
      border-radius: 14px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      padding: 0.75rem 1rem;
      color: #fff;
      font-size: 1rem;
    }

    button {
      background: linear-gradient(135deg, #6366f1, #a855f7);
      color: #fff;
      border: none;
      padding: 0.75rem 1.25rem;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    button:hover { opacity: 0.9; }

    /* Results */
    #result { margin-top: 1.5rem; }
    .error { color: #f87171; font-size: 0.9rem; text-align: center; }
    
    .capital-title { font-size: 1.1rem; color: #38bdf8; font-weight: 600; margin-bottom: 1rem; text-align: center; }
    
    .attraction-item {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 1rem;
      margin-bottom: 0.75rem;
    }
    .attraction-item h3 { font-size: 1rem; color: #f1f5f9; margin-bottom: 0.25rem; }
    .attraction-item p { font-size: 0.85rem; color: #94a3b8; line-height: 1.4; }
  </style>
</head>
<body>

  <div class="bubble bubble-1"></div>
  <div class="bubble bubble-2"></div>
  <div class="bubble bubble-3"></div>

  <div class="card">
    <h1>Capital & Attractions</h1>
    <p class="subtitle">Enter a country to discover its capital and top 3 spots.</p>

    <form id="search-form">
      <div class="input-group">
        <input type="text" id="country-input" placeholder="e.g. France, Japan, Italy" required>
        <button type="submit">Explore</button>
      </div>
    </form>

    <div id="result"></div>
  </div>

  <script>
    document.getElementById('search-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const country = document.getElementById('country-input').value;
      const resultDiv = document.getElementById('result');
      
      resultDiv.innerHTML = '<p style="text-align:center; color:#94a3b8;">Searching...</p>';

      try {
        const response = await fetch('/api/get-attractions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ country })
        });

        const data = await response.json();

        if (!response.ok) {
          resultDiv.innerHTML = \`<p class="error">\${data.error}</p>\`;
          return;
        }

        let html = \`<div class="capital-title">Capital: \${data.capital}</div>\`;
        data.attractions.forEach(item => {
          html += \`
            <div class="attraction-item">
              <h3>\${item.name}</h3>
              <p>\${item.description}</p>
            </div>
          \`;
        });

        resultDiv.innerHTML = html;
      } catch (err) {
        resultDiv.innerHTML = '<p class="error">Failed to fetch data. Try again.</p>';
      }
    });
  </script>
</body>
</html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});