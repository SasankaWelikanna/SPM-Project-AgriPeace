// ***********************************************
// This file can be used to define custom commands
// that you want to use across your tests.
// ***********************************************

// Custom command for logging in
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('[data-testid=email-input]').type(email);
  cy.get('[data-testid=password-input]').type(password);
  cy.get('[data-testid=login-button]').click();
});

// Custom command for adding a plant (admin only)
Cypress.Commands.add('addPlant', (plantData) => {
  cy.visit('/dashboard/manage-plant');
  cy.get('button').contains('Add Plant').click();
  cy.get('[name="name"]').type(plantData.name);
  cy.get('[name="category"]').select(plantData.category);
  cy.get('[name="description"]').type(plantData.description);
  cy.get('[name="climate"]').type(plantData.climate);
  cy.get('[name="soilPh"]').type(plantData.soilPh);
  cy.get('[name="landPreparation"]').type(plantData.landPreparation);
  
  // Submit the form
  cy.get('button[type="submit"]').click();
});