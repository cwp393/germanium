//noinspection JSAnnotator,JSUnresolvedVariable,JSReferencingArgumentsOutsideOfFunction,ThisExpressionReferencesGlobalObjectJS
return (function() {
    var i,
        result = [];

    var style = document.body.currentStyle ||
        window.getComputedStyle(document.body);

    var bodyMarginTop = parseInt(style.marginTop),
        bodyMarginLeft = parseInt(style.marginLeft);

    function left(element) {
        var result = - bodyMarginLeft;
        while (element && element != document.body) {
            result += element.offsetLeft;
            element = element.offsetParent;
        }

        return result;
    }

    function top(element) {
        var result = - bodyMarginTop;
        while (element && element != document.body) {
            result += element.offsetTop;
            element = element.offsetParent;
        }

        return result;
    }

    function right(element) {
        var result = element.offsetWidth - bodyMarginLeft;
        while (element && element != document.body) {
            result += element.offsetLeft;
            element = element.offsetParent;
        }

        return result;
    }

    function bottom(element) {
        var result = element.offsetHeight - bodyMarginTop;
        while (element && element != document.body) {
            result += element.offsetTop;
            element = element.offsetParent;
        }

        return result;
    }

    var getCssProperty = typeof getComputedStyle !== "undefined" ?
        function (element, property) { // anything else
            return getComputedStyle(element, property);
        } :
        function (element, property) { // IE8
            return element.currentStyle[property];
        };

    /**
     * Check if the given element is displayed on the screen or not.
     *
     * @param element
     */
    function isDisplayed(element) {
        var l = left(element),
            r = right(element),
            t = top(element),
            b = bottom(element);

        if (element.tagName == "BODY") {
            return true;
        }

        if (b < 0) { // above the current view
            console.log("above the current view", element);
            return false;
        }

        if (r < 0) { // left of current screen
            console.log("above the current view", element);
            return false;
        }

        if (b - t == 0 || r - l == 0) { // 0px size
            console.log("0px size", element);
            return false;
        }

        if (getCssProperty(element, "display") == "none") {
            console.log("display is none", element);
            return false;
        }

        return true;
    }

    for (i = 0; i < arguments.length; i++) {
        if (isDisplayed(arguments[i])) {
            result.push( arguments[i] );
        }
    }

    return result;
}.apply(this, arguments));
