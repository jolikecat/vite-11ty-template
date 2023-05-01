/**
 * 画面幅 < minWidth の時にviewportを固定
 */
const minWidth = 375;
const el = document.querySelector('meta[name="viewport"]');
const updateContent = () => {
	if (window.screen.width < minWidth) {
		el.setAttribute('content', `width=${minWidth}`);
	} else {
		el.setAttribute('content', 'width=device-width');
	}
};

updateContent();

window.addEventListener('orientationchange', updateContent);
