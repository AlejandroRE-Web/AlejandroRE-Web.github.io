// Obtenemos el elemento select
const selectAño = document.getElementById('año');

// Definimos el rango de años
const inicio = 2000;
const fin = 2025;

// Creamos las opciones para cada año
for (let año = inicio; año <= fin; año++) {
    const option = document.createElement('option');
    option.value = año;
    option.textContent = año;
    selectAño.appendChild(option);
}