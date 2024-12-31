// Block navigation to reels and explore
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) {
        const href = link.getAttribute('href');
        if (href && (href.includes('/reels') || href.includes('/explore'))) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
}, true);

// Remove reels and explore from navigation
function removeUnwantedElements() {
    // Find and remove reels/explore related elements
    const elements = document.querySelectorAll('a[href="/reels/"], a[href="/explore/"]');
    elements.forEach(element => {
        const parent = element.closest('li') || element;
        parent.style.display = 'none';
    });
}

// Run on page load and periodically
removeUnwantedElements();
setInterval(removeUnwantedElements, 1000);

// Block reels in the main feed
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            removeUnwantedElements();
        }
    });
});

// Start observing the document with the configured parameters
observer.observe(document.body, { childList: true, subtree: true }); 