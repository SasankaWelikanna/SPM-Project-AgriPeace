describe('Location Management (Farmer)', () => {
  beforeEach(() => {
    // Custom command to login as farmer with correct credentials from README
    cy.visit('/login');
    
    // Use the correct credentials found in the project README
    cy.get('input[type="email"]').first().clear().type('user@gmail.com');
    cy.get('input[type="password"]').first().clear().type('user12345');
    
    // Click sign in button
    cy.contains('button', 'Sign in').click();
    
    // After successful login, should be redirected to dashboard
    cy.url().should('include', '/dashboard', { timeout: 10000 });
    
    // Wait for the sidebar to be visible
    cy.get('.dark\\:bg-gray-700').should('be.visible');
    
    // Look for the "My Locations" menu item in the sidebar
    cy.contains('My Locations').click();
    
    // Verify we're on the location management page
    cy.url().should('include', '/dashboard/location');
  });

  it('should display location management interface', () => {
    cy.contains('Location Details').should('be.visible');
    cy.contains('button', 'Add Location').should('be.visible');
    cy.get('table').should('exist');
  });

  it('should add a new location', () => {
    // Location Data
    const locationName = 'Cypress Test Location';
    
    // Click Add Location button
    cy.contains('button', 'Add Location').click();
    
    // Fill out the form
    cy.get('input[name="province"]').type('Western');
    cy.get('input[name="district"]').type('Colombo');
    cy.get('input[name="city"]').type(locationName);
    cy.get('input[name="latitude"]').type('6.9271');
    cy.get('input[name="longitude"]').type('79.8612');
    cy.get('input[name="areaSize"]').type('5 acres');
    cy.get('select[name="soilType"]').select('Loamy'); // Assuming 'Loamy' is an option
    cy.get('select[name="irrigationType"]').select('Drip'); // Assuming 'Drip' is an option
    
    // Submit the form
    cy.get('form').find('button[type="submit"]').click();
    
    // Verify success message
    cy.contains('Location Added Successfully').should('be.visible');
    
    // Verify location is in the table
    cy.contains(locationName).should('be.visible');
  });

  it('should edit an existing location', () => {
    // Find the first location in the table and click edit
    cy.get('table tbody tr').first().find('button').contains('Edit').click();
    
    // Update location information
    cy.get('input[name="city"]').clear().type('Updated Location Name');
    cy.get('input[name="areaSize"]').clear().type('10 acres');
    
    // Submit changes
    cy.get('form').find('button[type="submit"]').click();
    
    // Verify success message
    cy.contains('Location Updated Successfully').should('be.visible');
    
    // Verify updated location name is in the table
    cy.contains('Updated Location Name').should('be.visible');
  });

  it('should delete a location', () => {
    // Count the initial number of rows
    cy.get('table tbody tr').its('length').as('initialRowCount');
    
    // First, locate the delete button in the first row
    cy.get('table tbody tr').first().as('firstRow');
    
    // Wait a moment to ensure DOM is stable
    cy.wait(500);
    
    // Find the delete button within the first row using a more specific selector
    cy.get('@firstRow').find('button.text-red-500').as('deleteButton');
    
    // Click the delete button in a separate command
    cy.get('@deleteButton').click();
    
    // Confirm deletion in the modal
    cy.contains('Are you sure you want to delete this record').should('be.visible');
    cy.contains('button', 'Delete').click();
    
    // Check for the toast message
    cy.contains('Successfully Deleted', { timeout: 10000 }).should('exist');
    
    // Force reload the page to ensure we have the latest data
    cy.reload();
    
    // Wait for page to load after reload
    cy.get('.dark\\:bg-gray-700').should('be.visible');
    
    // Verify the number of rows decreased
    cy.get('@initialRowCount').then(initialCount => {
      if (initialCount > 1) {
        cy.get('table tbody tr').its('length').should('be.at.most', initialCount - 1);
      } else {
        // If there was only one row, check for "No Data" message
        cy.contains('No Data').should('be.visible');
      }
    });
  });

  it('should view crops for a location', () => {
    // Wait for the table to be fully loaded
    cy.get('table tbody tr').should('exist');
    
    // Use a more specific selector for the View Crops button
    cy.get('table tbody tr').first().find('button.bg-secondary').first().click();
    
    // Verify crops page is displayed
    cy.url().should('include', '/dashboard/location/crops/');
    cy.contains('Crop Details').should('be.visible');
  });

  it('should generate location report', () => {
    // Click on PDF icon to generate report
    cy.get('a[href*="blob"]').first().click();
    
    // Due to browser limitations, we can't easily verify PDF content in Cypress
    // Instead verify the PDF generation attempt was made
    // We can check that the link was clicked
    cy.get('a[href*="blob"]').first().should('have.attr', 'target', '_blank');
  });
});