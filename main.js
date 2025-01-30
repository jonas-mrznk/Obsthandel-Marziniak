// 🔥 Supabase Konfiguration
const SUPABASE_URL = "https://unduayveazvnuhsxlzrr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuZHVheXZlYXp2bnVoc3hsenJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNzA4MzcsImV4cCI6MjA1Mzg0NjgzN30.k3iIMg-MuQxhtHfb6Btcywu0mDIHWhIPDpCUL5M9MTI";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 🛒 Warenkorb als leeres Array
let warenkorb = [];

// ✅ Produkte aus Supabase laden
async function ladeProdukte() {
    let { data: produkte, error } = await supabase
        .from("produkte")
        .select("*");

    if (error) {
        console.error("Fehler beim Laden der Produkte:", error);
        return;
    }

    // HTML aktualisieren
    zeigeProdukte(produkte);
}

// 🔄 Produkte auf der Seite anzeigen
function zeigeProdukte(produkte) {
    const shopContainer = document.getElementById("shop-container");
    shopContainer.innerHTML = ""; // Alte Einträge entfernen

    produkte.forEach((produkt) => {
        const produktElement = document.createElement("div");
        produktElement.classList.add("produkt");

        produktElement.innerHTML = `
            <img src="${produkt.bild}" alt="${produkt.name}">
            <h3>${produkt.name}</h3>
            <p>${produkt.preis.toFixed(2)} €</p>
            <button onclick="hinzufuegenZumWarenkorb(${produkt.id}, '${produkt.name}', ${produkt.preis})">
                In den Warenkorb
            </button>
        `;

        shopContainer.appendChild(produktElement);
    });
}

// 🛒 Produkt zum Warenkorb hinzufügen
function hinzufuegenZumWarenkorb(id, name, preis) {
    warenkorb.push({ id, name, preis });
    console.log("Warenkorb:", warenkorb);
}

// ✅ Initial Produkte laden
ladeProdukte();
