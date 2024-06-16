let currentFontSize = 16;
const minFontSize = 14;
const maxFontSize = 26;

let subtitleCurrentFontSize = 22;
const subtitleMinFontSize = 16;
const subtitleMaxFontSize = 30;

function changeTextSize(action) {
    const step = 2;

    if (action === 'increase' && currentFontSize < maxFontSize) {
        currentFontSize = Math.min(currentFontSize + step, maxFontSize);
    } else if (action === 'decrease' && currentFontSize > minFontSize) {
        currentFontSize = Math.max(currentFontSize - step, minFontSize);
    }

    if (action === 'increase' && subtitleCurrentFontSize < subtitleMaxFontSize) {
        subtitleCurrentFontSize = Math.min(subtitleCurrentFontSize + step, subtitleMaxFontSize);
    } else if (action === 'decrease' && currentFontSize > minFontSize) {
        subtitleCurrentFontSize = Math.max(subtitleCurrentFontSize - step, subtitleMinFontSize);
    }

    document.body.style.fontSize = currentFontSize + 'px';
    const subtitles = document.querySelectorAll('.subtitle-font');
    subtitles.forEach(subtitle => {
        subtitle.style.fontSize = subtitleCurrentFontSize + 'px';
    });
}