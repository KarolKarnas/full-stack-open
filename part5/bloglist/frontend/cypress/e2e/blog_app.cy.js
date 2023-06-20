describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			name: 'Admin Karnas',
			username: 'admin',
			password: 'admin',
		}
		cy.request('POST', 'http://localhost:3003/api/users', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function () {
		cy.contains('Blog list')
		cy.get('#login-form').should('be.visible')
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.contains('log in').click()
			cy.get('#username').type('admin')
			cy.get('#password').type('admin')
			cy.get('#login-button').click()

			cy.contains('Admin Karnas logged in')
		})

		it('fails with wrong credentials, notification shown with unsuccessful login is displayed red', function () {
			cy.contains('log in').click()
			cy.get('#username').type('admin')
			cy.get('#password').type('wrong')
			cy.get('#login-button').click()

      cy.get('.error')
			.should('contain', 'invalid username or password')
			.and('have.css', 'color', 'rgb(255, 0, 0)')
			.and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Admin Karnas logged in')
		})
	})
})
