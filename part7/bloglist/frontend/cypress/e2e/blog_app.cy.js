// /// <reference types="Cypress" />

describe('Blog app', function () {
	// debugger
	beforeEach(function () {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
		const user = {
			name: 'Admin Karnas',
			username: 'admin',
			password: 'admin',
		}
		cy.createUser(user)
	})

	it('Login form is shown', function () {
		cy.contains('Blog list')
		cy.get('#login-form').should('be.visible')
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.login({ username: 'admin', password: 'admin' })

			cy.get('html').should('contain', 'Admin Karnas logged in')
		})

		it('fails with wrong credentials, notification shown with unsuccessful login is displayed red', function () {
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
			cy.login({ username: 'admin', password: 'admin' })
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

		describe('When logged in and a blog is added', function () {
			beforeEach(function () {
				cy.createBlog({
					title: 'Nobody expects the Spanish Inquisition',
					author: 'Monty Python',
					url: 'https://www.montypython.com',
				})
			})

			it('users can like a blog', function () {
				cy.get('#view').click().get('#likeBtn').click()

				cy.get('html').should('contain', 'likes 1')
				cy.get('html').should('not.contain', 'likes 0')
			})

			it('user who created blog can delete it', function () {
				cy.get('#view').click().get('#deleteBtn').click()
				cy.get('.success')
					.should(
						'contain',
						'Nobody expects the Spanish Inquisition by Monty Python DELETED!'
					)
					.and('have.css', 'color', 'rgb(0, 128, 0)')
					.and('have.css', 'border-style', 'solid')
			})

			it('only the creator can see the delete button of a blog, not anyone else', function () {
				cy.get('#logout-button').click()
				const user = {
					name: 'Admin Karol',
					username: 'admin2',
					password: 'admin2',
				}
				cy.createUser(user)
				cy.login({ username: 'admin2', password: 'admin2' })
				cy.get('#view').click().get('#deleteBtn').should('not.exist')
			})

			it('blogs are ordered according to likes with the blog with the most likes being first', function () {
				cy.createBlog({
					title: '100 likes',
					author: 'hundred',
					url: 'https://www.hundred.com',
					likes: 100,
				})
				cy.createBlog({
					title: '10 likes',
					author: 'ten',
					url: 'https://www.ten.com',
					likes: 10,
				})

				cy.get('.blog').eq(0).should('contain', '100 likes by hundred')
				cy.get('.blog').eq(1).should('contain', '10 likes by ten')
				cy.get('.blog').eq(2).should('contain', 'Nobody expects the Spanish Inquisition by Monty Python')
			})
		})
	})
})
