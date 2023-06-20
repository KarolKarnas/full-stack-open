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
			// cy.contains('log in').click()
			cy.get('#username').type('admin')
			cy.get('#password').type('admin')
			cy.get('#login-button').click()

			// cy.contains('Admin Karnas logged in')
			cy.get('html').should('contain', 'Admin Karnas logged in')
		})

		it('fails with wrong credentials, notification shown with unsuccessful login is displayed red', function () {
			// cy.contains('log in').click()
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

	describe('When logged in', function () {
		beforeEach(function () {
			// cy.contains('log in').click()
			cy.get('#username').type('admin')
			cy.get('#password').type('admin')
			cy.get('#login-button').click()
		})

		it('A blog can be created', function () {
			cy.get('#toggle-blog-form').click()
			cy.get('#title').type('Nobody expects the Spanish Inquisition')
			cy.get('#author').type('Monty Python')
			cy.get('#url').type('https://www.montypython.com')
			cy.get('#blogSaveBtn').click()

			cy.get('.success')
				.should(
					'contain',
					'a new blog Nobody expects the Spanish Inquisition! By Monty Python added!'
				)
				.and('have.css', 'color', 'rgb(0, 128, 0)')
				.and('have.css', 'border-style', 'solid')

			cy.get('html').should(
				'contain',
				'Nobody expects the Spanish Inquisition by Monty Python'
			)
		})

		it('users can like a blog', function () {
			cy.get('#toggle-blog-form').click()
			cy.get('#title').type('Nobody expects the Spanish Inquisition')
			cy.get('#author').type('Monty Python')
			cy.get('#url').type('https://www.montypython.com')
			cy.get('#blogSaveBtn')
				.click()
				.get('#view')
				.click()
				.get('#likeBtn')
				.click()

			cy.get('html').should('contain', 'likes 1')
			cy.get('html').should('not.contain', 'likes 0')
		})

		it.only('user who created blog can delete it', function () {
			//will not work with more than 1 blogs

			cy.get('#toggle-blog-form').click()
			cy.get('#title').type('Nobody expects the Spanish Inquisition')
			cy.get('#author').type('Monty Python')
			cy.get('#url').type('https://www.montypython.com')
			cy.get('#blogSaveBtn')
				.click()
				.get('#view')
				.click()
				.get('#deleteBtn')
				.click()
		})

		it.only('only the creator can see the delete button of a blog, not anyone else', function () {
			//will not work with more than 1 blogs

			cy.get('#toggle-blog-form').click()
			cy.get('#title').type('Nobody expects the Spanish Inquisition')
			cy.get('#author').type('Monty Python')
			cy.get('#url').type('https://www.montypython.com')
			cy.get('#blogSaveBtn')
				.click()
				.get('#view')
				.click()
				.get('#deleteBtn')
				.should('be.visible')
        //logout
        //add new user
        // login second user
        //check visibility of the DELETEBUTTOn0
		})
	})
})
