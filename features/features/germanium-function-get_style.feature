Feature: get_style utility function.
  Using get_style a user can easily query the actual value
  of a CSS property.

  On firefox due to a bug, shortand values can't be used:
  https://bugzilla.mozilla.org/show_bug.cgi?id=137688

@1
Scenario: Check reading text from a visible div
  Given I open firefox
  When I go to 'http://localhost:8000/features/test-site/style.html'
  # the red div checks
  Then the 'borderTopColor' style color from element '.red-div' is '#ff0000'
  And the 'borderTopStyle' style from element '.red-div' is 'solid'
  And the 'borderTopWidth' style from element '.red-div' is '1px'
  And the 'color' style color from element '.red-div' is '#ff0000'
  # and now the default div
  And the 'borderTopColor' style color from element '.default-div' is '#000000'
  And the 'borderTopStyle' style from element '.default-div' is 'none'
  And the 'borderTopWidth' style from element '.default-div' is '0px'
  And the 'color' style color from element '.default-div' is '#000000'