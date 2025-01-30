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

// Firebase initialisieren
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Produkte aus der Datenbank abrufen und in HTML einfügen
db.ref("produkte").once("value", snapshot => {
    const produkteContainer = document.getElementById("produkte-container");
    const produkte = snapshot.val();

    produkte.forEach((produkt, index) => {
        if (produkt) {  // Null-Werte überspringen
            const produktElement = document.createElement("div");
            produktElement.classList.add("produkt");
            produktElement.innerHTML = `
                <img src="${produkt.imageUrl}" alt="${produkt.name}">
                <h3>${produkt.name}</h3>
                <p>${produkt.preis.toFixed(2)} €</p>
                <button onclick="addToCart(${index})">In den Warenkorb</button>
            `;
            produkteContainer.appendChild(produktElement);
        }
    });
});

// Einkaufswagen verwalten
let einkaufswagen = [];

function addToCart(index) {
    db.ref(`produkte/${index}`).once("value", snapshot => {
        const produkt = snapshot.val();
        if (produkt) {
            einkaufswagen.push(produkt);
            updateCart();
        }
    });
}

function removeFromCart(index) {
    einkaufswagen.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartContainer = document.getElementById("warenkorb-container");
    cartContainer.innerHTML = "";
    einkaufswagen.forEach((produkt, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <p>${produkt.name} - ${produkt.preis.toFixed(2)} €</p>
            <button onclick="removeFromCart(${index})">Entfernen</button>
        `;
        cartContainer.appendChild(cartItem);
    });
}

// Ruf die Funktion auf, um die Produkte zu laden
loadProducts();
