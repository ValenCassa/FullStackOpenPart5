Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
  })

Cypress.Commands.add('open', () => {
    cy.contains('Log in / Register').click()
})

Cypress.Commands.add('createBlog', ({ title, content }) => {
    cy.contains('Want to create a blog?').click()
    cy.get('#blog_title').type(title)
    cy.get('#blog_content').type(content)
    cy.get('#blog_submit').click()
})

describe('Blog app', function() {

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        
        /* cy.contains('Log in / Register').click()
        cy.get('#reg_username').type('CypressUser')
        cy.get('#reg_name').type('Cypress')
        cy.get('#reg_pass').type('Cypress')
        cy.get('#reg_submit').click()
        */

        const user = {
          name: 'Cypress',
          username: 'CypressUser',
          password: 'Cypress'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user) 
        cy.visit('http://localhost:3000/')
        cy.open()
    })

    it('front page can be opened', function() {
        cy.contains('Log in / Register')
    })

    it('user can log in', function() {
        
        cy.get('#username').type('CypressUser')
        cy.get('#password').type('Cypress')
        cy.get('#login-button').click()

        cy.contains('Welcome CypressUser!')
    })

    it('login fails with wrong password', function() {
        
        cy.get('#username').type('CypressUser')
        cy.get('#password').type('hola')
        cy.get('#login-button').click()

        cy.contains('Invalid credentials')
        cy.get('html').should('not.contain', 'Welcome CypressUser!')
    })

    describe('when logged in', function() {
        beforeEach(function() {
           /* cy.get('#username').type('CypressUser')
            cy.get('#password').type('Cypress')
            cy.get('#login-button').click()
            */

            //Cypress recommends bypassing log in with requests

         cy.login({ username: 'CypressUser', password: 'Cypress' })

        })

        it('a new blog can be created', function() {
            cy.createBlog({ title: 'CypressTest', content: 'This is a Cypress test' })
            cy.contains('CypressTest')
        })

        it('a blog can be liked', function() {
            cy.createBlog({ title: 'CypressTest', content: 'This is a Cypress test' })
            cy.get('#likes').click()
            cy.get('#likes').contains('1')
        })
    })
})