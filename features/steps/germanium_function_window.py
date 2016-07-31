from behave import *

from germanium import wait
from germanium.static import *

use_step_matcher("re")


@step("I select the window with the title '(.*?)'")
def i_select_the_window_named(context, window_title):
    use_window(window_title)


@step("I select the default window")
def i_select_the_default_window(context):
    use_window(index=0)


@step("I wait for the text in '#name1Target' to be 'name1 text'")
def i_wait_for_the_text_to_be_correct(context):
    wait(Element("div", id="name1Target", exact_text="name1 text"))
