export default class Theme {
	_addedStyleElements = [];
	_addedHTMLContent = [];
	_classNameAddedToElements = [];

	_beforeMount() {
		// save original and replace animationSelector option
		this._originalAnimationSelectorOption = String(this.swup.options.animationSelector);
		this.swup.options.animationSelector = '[class*="swup-transition-"]';

		// add classes after each content replace
		this.swup.on('contentReplaced', this._addClassNameToElement);
	}

	_afterUnmount() {
		// reset animationSelector option
		this.swup.options.animationSelector = this._originalAnimationSelectorOption;

		// remove added styles
		this._addedStyleElements.forEach((element) => {
			element.outerHTML = '';
			element = null;
		});

		// remove added HTML
		this._addedHTMLContent.forEach((element) => {
			element.outerHTML = '';
			element = null;
		});

		// remove added classnames
		this._classNameAddedToElements.forEach((item) => {
			const elements = Array.prototype.slice.call(document.querySelectorAll(item.selector));
			elements.forEach((element) => {
				element.className.split(' ').forEach((classItem) => {
					if (new RegExp('^swup-transition-').test(classItem)) {
						element.classList.remove(classItem);
					}
				});
			});
		});

		this.swup.off('contentReplaced', this._addClassNameToElement);
	}

	mount() {
		// this is mount method rewritten by class extending
		// and is executed when swup is enabled with theme
	}

	unmount() {
		// this is unmount method rewritten by class extending
		// and is executed when swup with theme is disabled
	}

	applyStyles(styles) {
		const head = document.head;
		const style = document.createElement('style');

		style.setAttribute('data-swup-theme', '');
		style.appendChild(document.createTextNode(styles));

		this._addedStyleElements.push(style);
		head.prepend(style);
	}

	applyHTML(content) {
		const element = document.createElement('div');
		element.innerHTML = content;
		this._addedHTMLContent.push(element);
		document.body.appendChild(element);
	}

	addClassName(selector, name) {
		// save so it can be later removed
		this._classNameAddedToElements.push({ selector, name });

		// add class the first time
		this._addClassNameToElement();
	}

	_addClassNameToElement = () => {
		this._classNameAddedToElements.forEach((item) => {
			const elements = Array.prototype.slice.call(document.querySelectorAll(item.selector));
			elements.forEach((element) => {
				element.classList.add(`swup-transition-${item.name}`);
			});
		});
	};

	// this is here so we can tell if plugin was created by extending this class
	isSwupPlugin = true;
}
