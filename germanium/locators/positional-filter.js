//noinspection JSAnnotator,JSUnresolvedVariable,JSReferencingArgumentsOutsideOfFunction,ThisExpressionReferencesGlobalObjectJS
return (function() {
    var aboveElements = [],
        belowElements = [],
        rightOfElements = [],
        leftOfElements = [],
        elements = [],
        topReference, belowReference, leftReference, rightReference,
        i, j,
        count,
        args;

    args = [];
    for (i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }

    function readElements(targetArray) {
        count = args.shift();
        while (count--) {
            targetArray.push(args.shift());
        }
    }

    function left(element) {
        var result = 0;
        while (element && element != document.body) {
            result += element.offsetLeft;
            element = element.offsetParent;
        }

        return result;
    }

    function top(element) {
        var result = 0;
        while (element && element != document.body) {
            result += element.offsetTop;
            element = element.offsetParent;
        }

        return result;
    }

    function right(element) {
        if (!element || typeof element.offsetWidth == "undefined") {
            return -1;
        }

        var result = element.offsetWidth - 1;
        while (element && element != document.body) {
            result += element.offsetLeft;
            element = element.offsetParent;
        }

        return result;
    }

    function bottom(element) {
        if (!element || typeof element.offsetHeight == "undefined") {
            return -1;
        }

        var result = element.offsetHeight - 1;
        while (element && element != document.body) {
            result += element.offsetTop;
            element = element.offsetParent;
        }

        return result;
    }

    readElements(aboveElements);
    readElements(rightOfElements);
    readElements(belowElements);
    readElements(leftOfElements);
    readElements(elements);

    // The above filtering tries to make sure the elements we're
    // finding are above the reference elements in the `aboveElements`
    for (i = elements.length - 1; i >= 0; i--) {
        for (j = 0; j < aboveElements.length; j++) {
            if (bottom(elements[i]) >= top(aboveElements[j])) {
                elements.splice(i, 1)
            }
        }
    }

    function overlapX(e1, e2) {
        var result = left(e2) <= right(e1) && left(e1) <= right(e2);

        return result;
    }

    function overlapY(e1, e2) {
        var result = top(e2) <= bottom(e1) && top(e1) <= bottom(e2);

        return result;
    }

    // we sort them by the distance from the elements that we
    // are above of, to the bottom of our elements.
    if (aboveElements.length) {
        topReference = top(aboveElements[0]);
        leftReference = left(aboveElements[0]);

        elements.sort(function(e1, e2) {
            var overlapE1 = overlapX(aboveElements[0], e1),
                overlapE2 = overlapX(aboveElements[0], e2);

            if (overlapE1 && overlapE2) {
                return Math.abs(topReference - bottom(e1)) -
                    Math.abs(topReference - bottom(e2));
            } else if (overlapE1 && !overlapE2) {
                return -1;
            } else if (!overlapE1 && overlapE2) {
                return 1;
            } else { // !overlapE1 && !overlapE2
                return Math.pow(topReference - bottom(e1), 2) -
                       Math.pow(topReference - bottom(e2), 2) +
                       Math.abs(leftReference - left(e1)) -
                       Math.abs(leftReference - left(e2));
            }
        });
    }

    // The below filtering makes sure that the elements we're finding
    // are below the reference elements in the `belowElements`
    for (i = elements.length - 1; i >= 0; i--) {
        for (j = 0; j < belowElements.length; j++) {
            if (top(elements[i]) <= bottom(belowElements[j])) {
                elements.splice(i, 1)
            }
        }
    }

    // we sort them by the distance from the bottom of the element
    // we're under, to the top of our element.
    if (belowElements.length) {
        belowReference = bottom(belowElements[0]);
        leftReference = left(belowReference[0]);

        elements.sort(function(e1, e2) {
            var overlapE1 = overlapX(belowElements[0], e1),
                overlapE2 = overlapX(belowElements[0], e2);

            if (overlapE1 && overlapE2) {
                return Math.abs(belowReference - top(e1)) -
                       Math.abs(belowReference - top(e2));
            } else if (overlapE1 && !overlapE2) {
                return -1;
            } else if (!overlapE1 && overlapE2) {
                return 1;
            } else { // !overlapE1 && !overlapE2
                return Math.pow(belowReference - top(e1), 2) -
                       Math.pow(belowReference - top(e2), 2) +
                       Math.abs(leftReference - left(e1)) -
                       Math.abs(leftReference - left(e2));
            }
        });
    }

    for (i = elements.length - 1; i >= 0; i--) {
        for (j = 0; j < rightOfElements.length; j++) {
            if (left(elements[i]) <= right(rightOfElements[j])) {
                elements.splice(i, 1)
            }
        }
    }

    if (rightOfElements.length) {
        topReference = top(rightOfElements[0]);
        rightReference = right(rightOfElements[0]);

        elements.sort(function(e1, e2) {
            var overlapE1 = overlapY(rightOfElements[0], e1),
                overlapE2 = overlapY(rightOfElements[0], e2);

            if (overlapE1 && overlapE2) {
                return Math.abs(rightReference - left(e1)) -
                       Math.abs(rightReference - left(e2));
            } else if (overlapE1 && !overlapE2) {
                return -1;
            } else if (!overlapE1 && overlapE2) {
                return 1;
            } else { // !overlapE1 && !overlapE2
                return Math.pow(rightReference - left(e1), 2) -
                       Math.pow(rightReference - left(e2), 2) +
                       Math.abs(topReference - top(e1)) -
                       Math.abs(topReference - top(e2));
            }
        });
    }

    for (i = elements.length - 1; i >= 0; i--) {
        for (j = 0; j < leftOfElements.length; j++) {
            if (right(elements[i]) >= left(leftOfElements[j])) {
                elements.splice(i, 1)
            }
        }
    }

    if (leftOfElements.length) {
        topReference = top(leftOfElements[0]);
        leftReference = left(leftOfElements[0]);

        elements.sort(function(e1, e2) {
            var overlapE1 = overlapY(leftOfElements[0], e1),
                overlapE2 = overlapY(leftOfElements[0], e2);

            if (overlapE1 && overlapE2) {
                return Math.abs(leftReference - right(e1)) -
                       Math.abs(leftReference - right(e2));
            } else if (overlapE1 && !overlapE2) {
                return -1;
            } else if (!overlapE1 && overlapE2) {
                return 1;
            } else { // !overlapE1 && !overlapE2
                return Math.pow(leftReference - right(e1), 2) -
                       Math.pow(leftReference - right(e2), 2) +
                       Math.abs(topReference - top(e1)) -
                       Math.abs(topReference - top(e2));
            }
        });
    }
     
    return elements;
}.apply(this, arguments));