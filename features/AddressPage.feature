Feature: Address Page Validation

  Scenario: Fill Address Details and Place Order
    Given User opens the website
    When User clicks on "Bookshelves" category
    Then User closes the popup if it is visible and verifies that the text "Bookshelves"
    