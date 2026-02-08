document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('materialSearch');
    const materials = document.querySelectorAll('.material-item');

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();

        materials.forEach(item => {
            const name = item.querySelector('.card-title').textContent.toLowerCase();
            const description = item.querySelector('.card-text').textContent.toLowerCase();

            if (name.includes(term) || description.includes(term)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

function goToLink(link) {
    window.location.href = link;
}