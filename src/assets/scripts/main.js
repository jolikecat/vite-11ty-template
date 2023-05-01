/**
 * 画面幅 < minWidth の時にviewportを固定
 */
const minWidth = 375;
const element = document.querySelector('meta[name="viewport"]');

if (element) {
	const updateContent = () => {
		if (window.screen.width < minWidth) {
			element.setAttribute('content', `width=${minWidth}`);
		} else {
			element.setAttribute('content', 'width=device-width');
		}
	};

	updateContent();

	window.addEventListener('orientationchange', updateContent);
}
