from germanium.GermaniumDriver import find_germanium_object


def get_attributes(context, selector):
    """
    Return the attributes for the element that is obtained
    from the selector as a dictionary object.
    :param context:
    :param selector:
    :return:
    """
    germanium = find_germanium_object([context])
    element = germanium.S(selector).element()

    if not element:
        raise Exception("Unable to find '%s' to get_attributes." % selector)

    return germanium.js("""
        var attributes = arguments[0].attributes;
        var result = {};

        for (var i = 0; i < attributes.length; i++) {
            result[attributes[i].name] = attributes[i].value;
        }

        return result;
    """, element)