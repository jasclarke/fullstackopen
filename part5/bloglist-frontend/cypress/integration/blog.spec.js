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

Cypress.Commands.add('addBlog', ({ title, author, url }) => {
    const token = JSON.parse(localStorage.getItem('blogAppUser')).token
    const request = {
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: { title, author, url },
        headers: { 'Authorization': `bearer ${token}` }
    }

    cy.request(request)
    cy.visit('http://localhost:3000')
})

Cypress.Commands.add('likeBlog', (title, first) => {
    cy.contains(title).parent().as('theBlog')
    if (first) cy.get('@theBlog').contains('view').click()
    cy.get('@theBlog').find('.like-btn').click()
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
            cy.addBlog({ title: 'My first blog', author: 'Johnny Q', url: 'http://first.blog' })
            cy.addBlog({ title: 'My second blog', author: 'Johnny Depp', url: 'http://second.blog' })
            cy.addBlog({ title: 'My third blog', author: 'Johnny King', url: 'http://third.blog' })
        })

        it('user can create blog', function() {
            cy.contains('Add Blog').click()
            cy.get('#title').type('My test blog')
            cy.get('#author').type('Test Author')
            cy.get('#url').type('http://test.blog')
            cy.get('#new-blog-submit-button').click()
            cy.contains('My test blog')
        })

        it('user can like a blog', function() {
            cy.contains('My second blog').parent().as('theBlog')
            cy.get('@theBlog').contains('view').click()
            cy.get('@theBlog').find('.like-btn').click()
            cy.get('@theBlog').contains('1')
        })

        it('user can delete blog', function() {
            cy.contains('My second blog').parent().as('theBlog')
            cy.get('@theBlog').contains('view').click()
            cy.get('@theBlog').find('.delete-btn').click()
            cy.get('#blog-list').should('not.contain', 'My second blog')
        })

        it('user cannot delete another user blog', function() {
            cy.addUser({
                username: 'paul',
                password: 'password',
                name: 'Paul Scholes'
            })

            cy.login({ username: 'paul', password: 'password' })
            cy.contains('My second blog').parent().as('theBlog')
            cy.get('@theBlog').contains('view').click()
            cy.get('@theBlog').should('not.contain', 'delete')
        })

        it('bloglist arranges in order of likes', function() {
            const firstTitle = 'My first blog'
            const secondTitle = 'My second blog'
            const thirdTitle = 'My third blog'

            cy.likeBlog(secondTitle, true)
            cy.likeBlog(thirdTitle, true)
            cy.likeBlog(firstTitle, true)

            cy.likeBlog(secondTitle, false)
            cy.likeBlog(thirdTitle, false)

            cy.likeBlog(secondTitle, false)

            cy.get('.blog').eq(0).should('contain', secondTitle)
            cy.get('.blog').eq(1).should('contain',thirdTitle)
            cy.get('.blog').eq(2).should('contain', firstTitle)
        })
    })
})