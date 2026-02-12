document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. LOGICA DEL TIMELINE (Barra lateral)
    // ==========================================
    const container = document.querySelector('.snap-container');
    const sections = document.querySelectorAll('.tier-section');
    const dots = document.querySelectorAll('.timeline-dot');

    const highlightDot = () => {
        let activeId = null;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Detectar qué sección está en pantalla
            if (rect.top > -300 && rect.top < 300) {
                activeId = section.getAttribute('id');
                section.classList.add('animate-in');
            }
        });

        if (activeId) {
            dots.forEach(dot => {
                if (dot.dataset.target === activeId) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    };

    if (container) {
        container.addEventListener('scroll', highlightDot);
        highlightDot(); // Ejecutar al inicio
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetId = dot.dataset.target;
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(highlightDot, 500); 
            }
        });
    });

    // ==========================================
    // 2. NUEVA LOGICA: TOOLTIP RPG
    // ==========================================
    const tooltip = document.getElementById('item-tooltip');
    
    // Verificar que el tooltip existe antes de ejecutar
    if (tooltip) {
        const ttImg = document.getElementById('tt-img');
        const ttTitle = document.getElementById('tt-title');
        const ttDesc = document.getElementById('tt-desc');
        const ttRecipeContainer = document.getElementById('tt-recipe-container');
        const slots = document.querySelectorAll('.mini-slot');

        slots.forEach(slot => {
            // --- ENTRAR ---
            slot.addEventListener('mouseenter', () => {
                // Leer datos del HTML
                const name = slot.dataset.name || 'Objeto';
                const desc = slot.dataset.desc || 'Sin descripción.';
                const recipeString = slot.dataset.recipe || '';
                const armorVal = parseInt(slot.dataset.armor) || 0;
                const duraVal = parseInt(slot.dataset.dura) || 0;
                const dmgVal = parseInt(slot.dataset.dmg) || 0;
                
                const imgElement = slot.querySelector('img');
                const mainImgSrc = imgElement ? imgElement.src : '';

                // Llenar info
                ttTitle.textContent = name;
                ttDesc.textContent = desc;
                ttImg.src = mainImgSrc;

                // --- BARRAS DE PROGRESO --- // 
                const MAX_ARMOR = 200; // Tope visual para armadura
                const MAX_DURA = 500;  // Tope visual para durabilidad
                const MAX_DMG = 300;  // Tope visual para daño

                // Armadura
                const armorRow = document.getElementById('row-armor');
                if (armorVal > 0) {
                    armorRow.style.display = 'flex';
                    document.getElementById('tt-armor-val').textContent = armorVal;
                    let pct = (armorVal / MAX_ARMOR) * 100;
                    document.getElementById('tt-armor-bar').style.width = `${Math.min(pct, 100)}%`;
                } else {
                    armorRow.style.display = 'none';
                }

                // Durabilidad
                const duraRow = document.getElementById('row-dura');
                if (duraVal > 0) {
                    duraRow.style.display = 'flex';
                    document.getElementById('tt-dura-val').textContent = duraVal;
                    let pct = (duraVal / MAX_DURA) * 100;
                    document.getElementById('tt-dura-bar').style.width = `${Math.min(pct, 100)}%`;
                } else {
                    duraRow.style.display = 'none';
                }

                // Daño
                const dmgRow = document.getElementById('row-dmg');
                if (dmgVal > 0) {
                    dmgRow.style.display = 'flex';
                    document.getElementById('tt-dmg-val').textContent = dmgVal;
                    let pct = (dmgVal / MAX_DMG) * 100;
                    document.getElementById('tt-dmg-bar').style.width = `${Math.min(pct, 100)}%`;
                } else {
                    dmgRow.style.display = 'none';
                }

                // --- RECETA --- //
                ttRecipeContainer.innerHTML = ''; 
                if(recipeString) {
                    const materials = recipeString.split(',');
                    materials.forEach(matSrc => {
                        if(matSrc.trim() !== "") {
                            const img = document.createElement('img');
                            img.src = matSrc.trim();
                            ttRecipeContainer.appendChild(img);
                        }
                    });
                } else {
                    ttRecipeContainer.innerHTML = '<span style="color:#555; font-size:0.7rem;">NO CRAFTABLE</span>';
                }

                tooltip.style.opacity = '1';
            });

            // --- MOVER CON MOUSE --- //
            slot.addEventListener('mousemove', (e) => {
                let x = e.clientX + 20;
                let y = e.clientY + 20;

                const ttWidth = 280;
                const ttHeight = tooltip.offsetHeight || 300;

                // Ajuste de bordes
                if (x + ttWidth > window.innerWidth) x = e.clientX - ttWidth - 10;
                if (y + ttHeight > window.innerHeight) y = e.clientY - ttHeight - 10;
                if (y < 0) y = 10;

                tooltip.style.left = `${x}px`;
                tooltip.style.top = `${y}px`;
            });

            // --- SALIR --- //
            slot.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
            });
        });
    }
});