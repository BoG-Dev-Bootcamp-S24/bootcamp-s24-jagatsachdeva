/**
 * @param {string[]} icons 
 */
function circle(icons) {
    const ICON_DIAMETER = 125;
    const BONUS_OFFSET = 90;
    const angle = 360 / icons.length;
    const pfp = document.querySelector(".pfp")

    const container = document.getElementById('circle');
    const offsetToParentCenter = parseInt(container.offsetWidth / 2); // assumes parent is square
    const radius = offsetToParentCenter + BONUS_OFFSET;
    const totalOffset = offsetToParentCenter - (ICON_DIAMETER / 2);
    for (let i = 1; i <= icons.length; ++i) {
        const iconSrc = icons[i - 1];

        if (!iconSrc) continue;

        const icon = document.createElement('div');

        const slide = document.getElementById(iconSrc)

        icon.addEventListener('mouseenter', () => {
            icon.style.boxShadow = '0px 0px 100px rgb(120,120,120,0.5)';
            pfp.style.display = "none";
            slide.style.display = "flex";
            icon.style.animation = "paused";
            icon.style.backgroundColor = 'rgb(96, 96, 96)';
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.boxShadow = '';
            pfp.style.display = "block";
            slide.style.display = "none";
            icon.style.backgroundColor = 'rgb(47, 47, 47)';
        });

        icon.className = 'icon';
        icon.style.position = 'absolute';
        icon.style.width = ICON_DIAMETER + 'px';
        icon.style.height = ICON_DIAMETER + 'px';
        icon.style.backgroundImage = `url('${iconSrc}')`;
        const y = Math.sin((angle * i) * (Math.PI / 180)) * radius;
        const x = Math.cos((angle * i) * (Math.PI / 180)) * radius;
        icon.style.top = (y + totalOffset).toString() + "px";
        icon.style.left = (x + totalOffset).toString() + "px";
        container.appendChild(icon);
    }

    const wrapper = document.getElementById('circle-wrapper');
    const maxIconDistance = (radius * 2) + ICON_DIAMETER;
    wrapper.style.width = maxIconDistance + 'px';
    wrapper.style.height = maxIconDistance + 'px';
}

const icons = [,,,,,'images/globe.png','images/books.png', 'images/bulb.png', 'images/massage.png',,];

window.addEventListener('DOMContentLoaded', () => {
    circle(icons);
});

window.addEventListener('resize', () => {
    circle(icons);
});
