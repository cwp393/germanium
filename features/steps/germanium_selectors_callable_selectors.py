from behave import *
from germanium.static import *

from .asserts import *

use_step_matcher("re")


@step(u'I search for a div element using the InputText class as parameter')
def step_impl(context):
    element = Element("div", id="inputTextContainer")\
        .containing(InputText)\
        .element()

    assert element

    context.found_element = element
