document.addEventListener('DOMContentLoaded', () => {
    
    const container = document.querySelector('.split-container');
    const sections = document.querySelectorAll('.split-section');
    const closeButtons = document.querySelectorAll('.btn-close-section');

    // 1. ABRIR SECCIÓN
    sections.forEach(section => {
        section.addEventListener('click', (e) => {
            // Si hacemos click en el botón cerrar o en el contenido ya abierto, no hacemos toggle aquí
            if (e.target.closest('.btn-close-section') || e.target.closest('.section-content')) return;

            // Quitar activo de todos
            sections.forEach(s => s.classList.remove('active'));
            
            // Activar este
            section.classList.add('active');
            container.classList.add('has-active'); // Para ocultar los otros
        });
    });

    // 2. CERRAR SECCIÓN
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que el click se propague al div padre y lo vuelva a abrir
            
            // Quitar clase active de todo
            sections.forEach(s => s.classList.remove('active'));
            container.classList.remove('has-active');
        });
    });
    
    // Seleccionamos todas las imágenes con la clase panzoom-img
    const maps = document.querySelectorAll('.panzoom-img');

    maps.forEach(mapImg => {
        // Inicializar Panzoom en cada imagen
        // El 'elem' es la imagen directa
        const pz = Panzoom(mapImg, {
            maxScale: 5,       // Zoom máximo 5x
            minScale: 1,       // No alejar más del tamaño original
            contain: 'outside', // Evitar que la imagen se pierda fuera del cuadro
            startScale: 1
        });

        // Zoom con la Rueda del Mouse
        mapImg.parentElement.addEventListener('wheel', pz.zoomWithWheel);

        // conectar botones
        // botones dentro del mismo contenedor padre (.map-wrapper)
        const wrapper = mapImg.closest('.map-wrapper');
        const btnIn = wrapper.querySelector('.btn-zoom:nth-child(1)'); // Botón +
        const btnOut = wrapper.querySelector('.btn-zoom:nth-child(2)'); // Botón -
        const btnReset = wrapper.querySelector('.btn-zoom:nth-child(3)'); // Botón Reset

        if(btnIn) btnIn.addEventListener('click', pz.zoomIn);
        if(btnOut) btnOut.addEventListener('click', pz.zoomOut);
        if(btnReset) btnReset.addEventListener('click', pz.reset);
    });

});