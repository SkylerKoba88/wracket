// this file moves each icon independently when the user moves the mouse over it.
function nudge() {
    const icons = document.querySelectorAll('.nudge-icon');
    if (!icons.length) return;

    icons.forEach(icon => {
        icon.style.transition = 'transform 0.2s ease';
        icon.style.willChange = 'transform';

        icon.addEventListener('mousemove', event => {
            const rect = icon.getBoundingClientRect();
            const centerX = rect.left + rect.width / 4;
            const centerY = rect.top + rect.height / 4;
            const moveX = (event.clientX - centerX) / 1;
            const moveY = (event.clientY - centerY) / 1;

            icon.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translate(0, 0)';
        });
    });
}

window.addEventListener('DOMContentLoaded', nudge);