describe('Login Functionality', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login page with correct elements', () => {
    cy.contains('AgriPeace').should('be.visible');
    cy.get('form').should('exist');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.contains('button', 'Sign in').should('be.visible');
  });

  it('should display error for invalid login', () => {
    // Use first() to select only the first matching element
    cy.get('input[type="email"]').first().type('invalid@example.com');
    cy.get('input[type="password"]').first().type('wrongpassword123');
    cy.contains('button', 'Sign in').click();
    
    // Check for error toast or message
    cy.contains('Invalid email or password').should('be.visible');
  });

  it('should login successfully as a user', () => {
    // Use first() to select only the first matching element
    cy.get('input[type="email"]').first().type('user@gmail.com');
    cy.get('input[type="password"]').first().type('user12345');
    cy.contains('button', 'Sign in').click();
    
    // After successful login, should be redirected to dashboard
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome').should('be.visible');
  });

  it('should login successfully as admin', () => {
    // Use first() to select only the first matching element
    cy.get('input[type="email"]').first().type('admin@gmail.com');
    cy.get('input[type="password"]').first().type('admin12345');
    cy.contains('button', 'Sign in').click();
    
    // After successful login, should be redirected to admin dashboard
    cy.url().should('include', '/dashboard');
    cy.contains('Admin').should('be.visible');
  });

  it('should navigate to register page', () => {
    cy.contains('No account?').should('be.visible');
    cy.contains('Sign Up').click();
    cy.url().should('include', '/register');
  });
});