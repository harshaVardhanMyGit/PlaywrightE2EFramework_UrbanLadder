Feature: Address Page Validation

  Background:
    Given User opens the website
  Scenario Outline: Fill Address Details and Place Order
    When User clicks on "<Furniture Type>" category
    Then User closes the popup if it is visible and verifies that the text "<Furniture Type>"
    When User assigns filters to the furniture:
      | targetPrice | storageType   | mountType    | noOfShelves | recommendedPrice |
      | 15000       | Open          | Free Standing| 6           | Low to High      |
    Then User clicks on view product for "<Product Name>" 
    And Verify the product "<Product Name>" and go for checkout
    Then User fills the address details
      | email               | pincode | address                          | firstName | lastName | phoneNumber |
      | myProject@gmail.com | 560001  | Thoraipakkam, Tamil Nadu, India  | John      | Doe      | 1234567890  |

    Examples:
      |Furniture Type|Product Name|
      |Bookshelves   |Albert Engineered Wood Bookshelf in Wenge Finish|