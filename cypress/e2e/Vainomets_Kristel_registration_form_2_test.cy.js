beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/
import { faker } from '@faker-js/faker'
const randomEmail = faker.internet.email();
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const phoneNumber = faker.phone.number();
const randomPassword = faker.internet.password();
const differentPassword = faker.internet.password();

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', () => {
        // Add test steps for filling in only mandatory fields
        // Type confirmation password which is different from first password
        // Assert that error message is visible
        // function to insert mandatory data
        inputValidData('kristel14')

        // Clear confirmation password and insert new password
        cy.get('#confirm').clear()
        cy.get('#confirm').type(differentPassword)
        cy.get('h2').contains('Password').click()

        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that password error message is visible and contain given text
        cy.get('#password_error_message').should('be.visible')
            .should('contain', 'Passwords do not match!')

    })

    it('User can submit form with all fields added', () => {
        // Add test steps for filling in ALL fields
        // Assert that after submitting the form system show successful message

        // use inputValidData function to fill mandatory fields
        inputValidData('kris13')

        // check radio button
        cy.get('h2').contains('Please select your favorite Web language:').click()
        cy.get('input[type="radio"]').eq(2).check().should('be.checked')

        // check two options from favourite transport section
        cy.get('h2').contains('Your favourite transport').click()
        cy.get('.vehicles').eq(0).check().should('be.checked')
        cy.get('.vehicles').eq(1).check().should('be.checked')

        // select from cars dropdown a value saab
        cy.get('select[name="cars"]').select('saab').should('have.value', "saab")
        
        // select cat from drowdown
        cy.get('select[name="animal"]').select('cat').should('have.value', "cat")

        // Assert that submit button is enabled and user clicks submit button
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Assert that after submitting the form system shows successful message
        cy.get('#success_message').should('be.visible')

    })
    // Add test steps for filling in ONLY mandatory fields
    it('User can submit form with valid data and only mandatory fields added', () => {

        // use inputValidData function
        inputValidData('kris13')
        // Assert that submit button is enabled and user clicks submit button
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Assert that after submitting the form system shows successful message
        cy.get('#success_message').should('have.css', 'display', 'block')

    })

    // Add at least 1 test for checking some mandatory field's absence
    it('User cannot submit form with empty username', () => {
        //fill in mandatory fields
        inputValidData('kristel13')

        // Scroll back to username input field
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()

        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that error message is visible and contains error text
        cy.get('#input_error_message').should('be.visible')
            .should('contain', 'Mandatory input field is not valid or empty!')
    })

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('Check that Cypress logo is correct and has correct size', () => {
        // Create similar test for checking the second picture
        cy.get('img').eq(1).should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('img').eq(1).invoke('height').should('be.lessThan', 89).and('be.greaterThan', 87)
    });

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')

        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()

        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')

        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking the second link 
    it('Check second navigation part', () => {
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')

        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()

        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_3.html')

        // Go back to previous page
        cy.go('back')

        // Check url again and confirm that user has moved back
        cy.url().should('contain', 'registration_form_2.html')
        // Log the result
        cy.log('Back again in registration form 2')

    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one verifying check boxes
    it('Check that favourite transport checkbox is correct', () => {
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[class="checkbox vehicles"]').should('have.length', 3)

        // Verify labels of the checkboxes
        cy.get('input[class="checkbox vehicles"]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[class="checkbox vehicles"]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[class="checkbox vehicles"]').next().eq(2).should('have.text', 'I have a boat')
        
        //Verify default state of checkboxes
        cy.get('input[class="checkbox vehicles"]').eq(0).should('not.be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(1).should('not.be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(2).should('not.be.checked')

        // Check first and last checkbox and verify that they are checked
        cy.get('input[class="checkbox vehicles"]').eq(0).check().should('be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(1).should('not.be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(2).check().should('be.checked')
        
    })

    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        //cy.get('#cars').find('option').should('have.length', 4)

        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')

        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    // Create test similar to previous one
    it('Verify that animal dropdown is correct', () => {
        // Verify how many elements are in animals dropdown
        cy.get('#animal').find('option').should('have.length', 6)

        // Check elements text in the dropdown
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')

        // Select two options from dropdown
        cy.get('select[id="animal"]').select('cat').should('have.value', "cat")
        cy.get('select[id="animal"]').select('snake').should('have.value', "snake")
    
    })

})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type(randomEmail)
    cy.get('[data-cy="name"]').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('[data-testid="phoneNumberTestId"]').type(phoneNumber)
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type(randomPassword)
    cy.get('#confirm').type(randomPassword)
    cy.get('h2').contains('Password').click()
}