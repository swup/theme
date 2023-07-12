import Plugin from '@swup/plugin';

export default class Theme extends Plugin {
	_addedStyleElements = [];
	_addedHTMLContent = [];
	_classNameAddedToElements = [];

	_beforeMount() {
		// Store original animationSelector option, then replace it
		this._originalAnimationSelectorOption = String(this.swup.options.animationSelector);
		this.swup.options.animationSelector = '[class*="swup-transition-"]';

		// Add classes after each content replace
		this.swup.hooks.on('replaceContent', this._addClassNameToElement);
	}

	_afterUnmount() {
		// Restore original animationSelector option
		this.swup.options.animationSelector = this._originalAnimationSelectorOption;

		// Remove added styles
		this._addedStyleElements.forEach((element) => {
			element.outerHTML = '';
			element = null;
		});

		// Remove added HTML
		this._addedHTMLContent.forEach((element) => {
			element.outerHTML = '';
			element = null;
		});

		// Remove added classnames
		this._classNameAddedToElements.forEach((item) => {
			const elements = Array.from(document.querySelectorAll(item.selector));
			elements.forEach((element) => {
				element.className.split(' ').forEach((classItem) => {
					if (new RegExp('^swup-transition-').test(classItem)) {
						element.classList.remove(classItem);
					}
				});
			});
		});

		this.swup.hooks.off('replaceContent', this._addClassNameToElement);
	}

	applyStyles(styles) {
		const style = document.createElement('style');
		style.setAttribute('data-swup-theme', '');
		style.appendChild(document.createTextNode(styles));
		document.head.prepend(style);

		this._addedStyleElements.push(style);
	}

	applyHTML(content) {
		const element = document.createElement('div');
		element.innerHTML = content;
		document.body.appendChild(element);

		this._addedHTMLContent.push(element);
	}

	addClassName(selector, name) {
		// save so it can be later removed
		this._classNameAddedToElements.push({ selector, name });

		// add class the first time
		this._addClassNameToElement();
	}

	_addClassNameToElement = () => {
		this._classNameAddedToElements.forEach((item) => {
			const elements = Array.from(document.querySelectorAll(item.selector));
			elements.forEach((element) => {
				element.classList.add(`swup-transition-${item.name}`);
			});
		});
	};
}
