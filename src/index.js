export default class Theme {
    _addedStyleElements = [];
    _addedHTMLContent = [];

    _beforeMount() {
        // save original and replace animationSelector option
        this._originalAnimationSelectorOption = String(this.swup.options.animationSelector);
        this.swup.options.animationSelector = '[class*="swup-transition-"]';
    }

    _afterUnmount() {
        // reset animationSelector option
        this.swup.options.animationSelector = this._originalAnimationSelectorOption;

        // remove added styles
        this._addedStyleElements.forEach(element => {
            element.outerHTML = '';
            element = null;
        });

        // remove added HTML
        this._addedHTMLContent.forEach(content => {
            // not the most classy option
            document.body.innerHTML.replace(content, '');
        });
    }

    mount() {
        // this is mount method rewritten by class extending
        // and is executed when swup is enabled with plugin
    }

    unmount() {
        // this is unmount method rewritten by class extending
        // and is executed when swup with plugin is disabled
    }

    applyStyles(styles) {
        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');

        style.cssText = styles;

        this._styleElements.push(style);
        head.appendChild(style);
    }

    applyHTML(content) {
        this._addedHTMLContent.push(content);
        // seems to be a best option https://stackoverflow.com/a/51468627/5831449
        document.body.insertAdjacentHTML('beforeend', content);
    }

    // this is here so we can tell if plugin was created by extending this class
    isSwupPlugin = true;
}
