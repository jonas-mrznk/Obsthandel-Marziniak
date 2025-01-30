// Importiere Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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

// Initialisiere Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Funktion zum Laden der Produktdaten
function loadProducts() {
    const dbRef = ref(db, 'produkte'); // 'produkte' ist der Pfad in deiner Firebase-Datenbank
    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            const products = snapshot.val();
            displayProducts(products);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

// Produkte anzeigen
function displayProducts(products) {
    const productContainer = document.getElementById("product-container"); // Der Container, wo die Produkte eingefügt werden
    productContainer.innerHTML = ""; // Leere den Container vor dem Einfügen neuer Daten

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        const image = document.createElement("img");
        image.src = product.imageUrl;
        image.alt = product.name;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = `${product.preis}€`;

        productElement.appendChild(image);
        productElement.appendChild(name);
        productElement.appendChild(price);
        productContainer.appendChild(productElement);
    });
}

// Ruf die Funktion auf, um die Produkte zu laden
loadProducts();
