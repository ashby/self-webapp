# Experience Registry Service

## What is it?

The Experience Registry Service is a service that manages the creation and storage 


### Field Guide
The following resources are managed by the admin utility and used in the creation of a customized solution.


---
#### Experience
An experience is provided for a company in order to build a domain for use in Deck.

| Field Name | Description | Example |
|------------|-------------------------------------------------------|-----------------------|
| Name | The name of the experience. | Kame |
| Studio | Whether the experience is a studio. | true |
| Purchasable | Whether the experience is purchasable. | true |


#### Identity
An identity is provided for a company in order to build a domain for use in Deck.

| Field Name | Description | Example |
|------------|-------------------------------------------------------|-----------------------|
| Name | The name of the identity. | VerComcast |
| Company ID | The id of the company of which the identity is associated | uuid |


#### Solution
The solution

| Field Name | Description | Example |
|------------|-------------------------------------------------------|-----------------------|
| Identity Name | A chosen Identity name selected from a list of saved identites | VerComcast |
| Company ID | The ID of the company of which the solution is associated. | VerComcast |
| Experiences | A group of experiences associated with the solution | Kame, Arcade Studio, DMSA |