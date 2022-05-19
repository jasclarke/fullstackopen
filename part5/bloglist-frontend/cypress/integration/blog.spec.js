Cypress.Commands.add('addUser', ({ username, password, name }) => {
    cy.request('POST', 'http://localhost:3003/api/users', { username, password, name })
    localStorage.removeItem('blogAppUser')
    cy.visit('http://localhost:3000')
})

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', { username, password })
        .then(response => {
            localStorage.setItem('blogAppUser', JSON.stringify(response.body))
            cy.visit('http://localhost:3000')
        })
})

describe('Blog App', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('Login form is displayed', function() {
        cy.get('#login-form')
    })

    describe('Login testing', function() {
        beforeEach(function() {
            cy.addUser({
                username: 'james',
                password: 'password',
                name: 'James Gardner'
            })
        })

        it('A user can login with correct credentials', function() {
            cy.get('#username').type('james')
            cy.get('#password').type('password')
            cy.get('#login-form').contains('login').click()
        })

        it('A user cannot login with the wrong credentials', function() {
            cy.get('#username').type('wrong')
            cy.get('#password').type('credentials')
            cy.get('#login-form').contains('login').click()
            cy.contains('Incorrect username or password')
        })
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.addUser({
                username: 'james',
                password: 'password',
                name: 'James Gardner'
            })

            cy.login({ username: 'james', password: 'password' })
        })

        it('user can create blog', function() {
            cy.contains('Add Blog').click()
            cy.get('#title').type('My first blog')
            cy.get('#author').type('Johnny Q')
            cy.get('#url').type('http://first.blog')
            cy.get('#new-blog-submit-button').click()
            cy.contains('My first blog')
        })
    })
})