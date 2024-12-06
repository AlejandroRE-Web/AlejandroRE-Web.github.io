document.addEventListener('DOMContentLoaded', function() {
    //Recoger todas las variables
    const form = document.querySelector('.formulario');
    const passwordInput = document.getElementById('Contrasena');
    const showPasswordCheckbox = document.getElementById('terminos');
    const dniNieSelect = document.getElementById('DniNie');
    const dniNieInput = document.querySelector('.dni');
    const aficionesCheckboxes = document.querySelectorAll('.aficiones-grid input[type="checkbox"]');
    const aficionesHiddenInput = document.getElementById('Aficiones');
    const anioNacimientoSelect = document.getElementById('AnioNacimiento');

    // Generar opciones para el año de nacimiento
    for (let year = 2010; year >= 1920; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        anioNacimientoSelect.appendChild(option);
    }

    // Mostrar/ocultar contraseña
    showPasswordCheckbox.addEventListener('change', function() {
        passwordInput.type = this.checked ? 'text' : 'password';
    });

    // Actualizar el valor del input DNI/NIE basado en la selección
    dniNieSelect.addEventListener('change', function() {
        dniNieInput.placeholder = this.value.toUpperCase();
    });

    // Función para actualizar las aficiones seleccionadas
    function updateAficiones() {
        const selectedAficiones = Array.from(aficionesCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        aficionesHiddenInput.value = selectedAficiones.join(', ');
    }

    // Asignar la función updateAficiones a cada checkbox de aficiones
    aficionesCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateAficiones);
    });

    // Funciones de validación
    function validateDniNie(value, type) {
        if (type === 'dni') {
            return /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i.test(value);
        } else if (type === 'nie') {
            return /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i.test(value);
        }
        return false;
    }

    //De estas formas validamos que este bien tanto el codigo postal como el numero de telegono
    function validateCodigoPostal(value) {
        return /^38\d{3}$/.test(value);
    }

    function validateTelefono(value) {
        return /^\(\+34\)922\d{6}$/.test(value);
    }

    function validateContrasena(value) {
        return /^\d{8}$/.test(value);
    }

    function validateLength(value, min, max) {
        return value.length >= min && value.length <= max;
    }

    // Función para mostrar mensajes de error
    function showError(element, message) {
        element.classList.add('error');
        let errorElement = element.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.classList.add('error-message');
            element.parentNode.insertBefore(errorElement, element.nextSibling);
        }
        errorElement.textContent = message;
    }

    // Función para limpiar mensajes de error
    function clearError(element) {
        element.classList.remove('error');
        let errorElement = element.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
    }

    // Validación del formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let isValid = true;

        // Validar NombreUsuario, Nombre, Apellidos
        ['NombreUsuario', 'Nombre', 'Apellidos'].forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!validateLength(field.value, 4, 20)) {
                isValid = false;
                showError(field, `Por favor, introduce entre 4 y 20 caracteres para ${fieldId}.`);
            } else {
                clearError(field);
            }
        });

        // Validar Contraseña
        if (!validateContrasena(passwordInput.value)) {
            isValid = false;
            showError(passwordInput, 'La contraseña debe contener exactamente 8 números.');
        } else {
            clearError(passwordInput);
        }

        // Validar Teléfono
        const telefonoInput = document.getElementById('Telefono');
        if (!validateTelefono(telefonoInput.value)) {
            isValid = false;
            showError(telefonoInput, 'Por favor, introduce un número de teléfono válido con el formato (+34)922123123.');
        } else {
            clearError(telefonoInput);
        }

        // Validar Código Postal
        const codigoPostalInput = document.getElementById('CodigoPostal');
        if (!validateCodigoPostal(codigoPostalInput.value)) {
            isValid = false;
            showError(codigoPostalInput, 'El código postal debe comenzar por 38 y tener 5 números en total.');
        } else {
            clearError(codigoPostalInput);
        }

        // Validar DNI/NIE
        if (dniNieSelect.value && dniNieInput.value) {
            if (!validateDniNie(dniNieInput.value, dniNieSelect.value)) {
                isValid = false;
                showError(dniNieInput, 'El número de documento introducido no es válido.');
            } else {
                clearError(dniNieInput);
            }
        } else {
            isValid = false;
            showError(dniNieSelect, 'Por favor, selecciona y completa tu documento de identidad.');
        }

        // Validar tipo de cuenta
        const cuentaTipoContainer = document.querySelector('.form-group:has(input[name="cuentaTipo"])');
        if (!form.querySelector('input[name="cuentaTipo"]:checked')) {
            isValid = false;
            showError(cuentaTipoContainer, 'Por favor, selecciona el tipo de cuenta.');
        } else {
            clearError(cuentaTipoContainer);
        }

        // Validar aficiones (al menos 2)
        const aficionesContainer = document.querySelector('.aficiones-container');
        if (document.querySelectorAll('.aficiones-grid input[type="checkbox"]:checked').length < 2) {
            isValid = false;
            showError(aficionesContainer, 'Por favor, selecciona al menos 2 aficiones.');
        } else {
            clearError(aficionesContainer);
        }

        // Validar PublicacionTitulo
        const publicacionTituloInput = document.getElementById('PublicacionTitulo');
        if (!validateLength(publicacionTituloInput.value, 4, 15)) {
            isValid = false;
            showError(publicacionTituloInput, 'El título debe tener entre 4 y 15 caracteres.');
        } else {
            clearError(publicacionTituloInput);
        }

        // Validar PublicacionDescripcion
        const publicacionDescripcionInput = document.getElementById('PublicacionDescripcion');
        if (!validateLength(publicacionDescripcionInput.value, 4, 120)) {
            isValid = false;
            showError(publicacionDescripcionInput, 'La descripción debe tener entre 4 y 120 caracteres.');
        } else {
            clearError(publicacionDescripcionInput);
        }

        if (isValid) {
            // Si todo es válido, enviar el formulario
            form.submit();
        }
    });
});