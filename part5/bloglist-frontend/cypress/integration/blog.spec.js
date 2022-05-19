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
            const user = {
                username: 'james',
                password: 'password',
                name: 'James Gardner'
            }

            cy.request('POST', 'http://localhost:3003/api/users', user)
            cy.visit('http://localhost:3000')
            localStorage.removeItem('blogAppUser')
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
})