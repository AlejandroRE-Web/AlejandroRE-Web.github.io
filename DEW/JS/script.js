<script>
    const selectAño = document.getElementById('año');
    const añoInicio = 2000;
    const añoFin = 2025;

    for (let año = añoFin; año >= añoInicio; año--) {
        const option = document.createElement('option');
        option.value = año;
        option.textContent = año;
        selectAño.appendChild(option);
    }
</script>