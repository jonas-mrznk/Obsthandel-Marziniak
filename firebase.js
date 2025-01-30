// firebase.js

// Firebase-Konfiguration und Initialisierung
const firebaseConfig = {
  apiKey: "AIzaSyD0_hpmkDI_4b9hJYFWW4rXrL7_0_qONVE",
  authDomain: "obsthandel-marziniak.firebaseapp.com",
  databaseURL: "https://obsthandel-marziniak.firebaseio.com",
  projectId: "obsthandel-marziniak",
  storageBucket: "obsthandel-marziniak.appspot.com",
  messagingSenderId: "811091314493",
  appId: "1:811091314493:web:534a200709c21d8464a754"
};

// Firebase initialisieren
firebase.initializeApp(firebaseConfig);

// Verweis auf die Firebase-Datenbank
const database = firebase.database();

// Funktion zum Laden der Produkte aus der Firebase Realtime Database
function loadProducts() {
  const fruitsRef = database.ref('produkte'); // Der Knotenname 'produkte' in deiner DB

  fruitsRef.once('value', (snapshot) => {
    const data = snapshot.val(); // Die abgerufenen Daten
    console.log(data); // Zum Überprüfen der Daten in der Konsole

    // Sicherstellen, dass die Liste mit der ID 'fruitsList' existiert
    const fruitsList = document.getElementById('fruitsList');
    if (fruitsList) {
      fruitsList.innerHTML = ''; // Alte Listeneinträge löschen

      // Über die Produkte iterieren und sie hinzufügen
      for (let i = 1; i < data.length; i++) { // Wir starten bei 1, da der Index 0 null ist
        const product = data[i];
        
        // Erstellen des Listenelements
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <img src="${product.imageUrl}" alt="${product.name}" width="50">
          <span>${product.name}</span>
          <span>${product.preis} EUR</span>
        `;
        
        // Das Listenelement an die Seite anhängen
        fruitsList.appendChild(listItem);
      }
    }
  });
}

// Sicherstellen, dass die Produkte geladen werden, wenn die Seite geladen ist
window.onload = function() {
  loadProducts(); // Ruft die Funktion auf, um Produkte zu laden
};
