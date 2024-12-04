
// Obtenemos el elemento select
const selectAño = document.getElementById('AnioNacimiento');

// Definimos el rango de años
const inicio = 1920;
const fin = 2010;

// Creamos las opciones para cada año
for (let año = inicio; año <= fin; año++) {
    const option = document.createElement('option');
    option.value = año;
    option.textContent = año;
    selectAño.appendChild(option);
}

 // Mostrar/ocultar contraseña
 const passwordInput = document.getElementById('Contrasena');
 const showPasswordCheckbox = document.getElementById('terminos');

 showPasswordCheckbox.addEventListener('change', function() {
     passwordInput.type = this.checked ? 'text' : 'password';
 });

/*

Valida que todos los campos obligatorios estén llenos (gracias al atributo required).
Verifica que al menos dos aficiones estén seleccionadas.

para seleccionar al menos 2


 document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const aficionesCheckboxes = document.querySelectorAll('input[name="Aficiones"]');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Validar que al menos dos aficiones están seleccionadas
        let aficionesSeleccionadas = 0;
        aficionesCheckboxes.forEach(checkbox => {
            if (checkbox.checked) aficionesSeleccionadas++;
        });

        if (aficionesSeleccionadas < 2) {
            alert('Por favor, selecciona al menos dos aficiones.');
            return;
        }

        // Si todo está correcto, enviar el formulario
        this.submit();
    });
 

*/
 //PARA DNI Y NIE
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const tipoDocumento = document.getElementById('TipoDocumento');
    const numeroDocumento = document.getElementById('NumeroDocumento');

    form.addEventListener('submit', function(event) {
        if (!validarDocumento()) {
            event.preventDefault();
            alert('El número de documento no es válido');
        }
    });

    function validarDocumento() {
        const tipo = tipoDocumento.value;
        const numero = numeroDocumento.value.toUpperCase();

        if (tipo === 'dni') {
            return validarDNI(numero);
        } else if (tipo === 'nie') {
            return validarNIE(numero);
        }
        return false;
    }

    function validarDNI(dni) {
        const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
        const numero = dni.substr(0, dni.length - 1);
        const letra = dni.substr(dni.length - 1, 1);
        const resto = numero % 23;
        return letra === letras.charAt(resto);
    }

    function validarNIE(nie) {
        const primerCaracter = nie.charAt(0);
        let numero = nie.substr(1, nie.length - 2);
        const letra = nie.substr(nie.length - 1, 1);

        switch (primerCaracter) {
            case 'X': numero = '0' + numero; break;
            case 'Y': numero = '1' + numero; break;
            case 'Z': numero = '2' + numero; break;
            default: return false;
        }

        return validarDNI(numero + letra);
    }
});