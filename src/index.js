export default class Theme {
	_addedStyleElements = [];
	_addedHTMLContent = [];
	_classNameAddedToElements = [];

	_beforeMount() {
		// save original and replace animationSelector option
		this._originalAnimationSelectorOption = String(this.swup.options.animationSelector);
		this.swup.options.animationSelector = '[class*="swup-transition-"]';
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
		this._classNameAddedToElements.forEach((element) => {
			element.className.split(' ').forEach((classItem) => {
				if (new RegExp('^swup-transition-').test(classItem)) {
					document.documentElement.classList.remove(classItem);
				}
			});
		});
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
		let elements;
		if (typeof selector !== 'string') {
			elements = selector;
		} else {
			elements = Array.prototype.slice.call(document.querySelectorAll(selector));
		}

		// save so it can be later removed
		elements.forEach((element) => {
			this._classNameAddedToElements.push(element);
			element.classList.add(`swup-transition-${name}`);
		});

		this.swup.on('contentReplaced', () => {
			element.classList.add(`swup-transition-${name}`);
		});
	}

	// this is here so we can tell if plugin was created by extending this class
	isSwupPlugin = true;
}
