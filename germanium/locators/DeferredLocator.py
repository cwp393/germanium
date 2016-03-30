class DeferredLocator(object):
    """
    Create a deferred locator that can be used in matching
    elements in wait conditions.
    """
    def __init__(self, germanium=None):
        self._germanium = germanium

    def __call__(self):
        return self.element_list()

    def element(self, only_visible=True):
        """ Return the current matched element.
        :param only_visible: bool Find the element only
        if it's visible, so it can be interacted with.
        """
        if only_visible:
            elements = self.element_list(only_visible=only_visible)
            if not elements:
                return None

            return elements[0]

        return self._find_element()

    def element_list(self, only_visible=True):
        """
        :type only_visible: boolean
        """
        if not only_visible:
            return self._find_element_list()

        found_items = self._find_element_list()

        if not found_items:
            return list()

        def is_displayed_filter(item):
            try:
                return item.is_displayed()
            except Exception:
                return False

        return list(filter(is_displayed_filter, found_items))

    def exists(self, only_visible=True):
        """ Return True/False if the currently matched element exists or not
        :param only_visible:
        """
        return self.element(only_visible=only_visible) is not None

    def not_exists(self, only_visible=True):
        """
        :param only_visible:
        :return: True if the element is not existing/
        """
        return self.element(only_visible=only_visible) is None

    def _find_element(self):
        """ Find the element. """
        raise Exception("not implemented")

    def _find_element_list(self):
        """
        Find all the elements that match the given locator.
        :return:
        """
        raise Exception("Not implemented")
