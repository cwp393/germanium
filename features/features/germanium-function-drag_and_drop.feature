Feature: Drag and drop should be a standard feature of Germanium.

Scenario: drag_and_drop simple test.
  Given I open firefox
  And I go to 'http://localhost:8000/features/test-site/drag_and_drop.html'
  When I drag and drop from the #startDiv to the #endDiv
  Then the drag and drop events correspond