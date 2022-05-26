describe('Blog app', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Clemens',
            username: 'clee',
            password: 'xerxes'
        }
        const demoUser = {
            name: 'Demomomo',
            username: 'demo',
            password: 'demo'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.request('POST', 'http://localhost:3003/api/users/', demoUser)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', () => {
        cy.contains('BLOGapp')
        cy.contains('log in to application')
    })

    it('login form is shown', () => {
        cy.contains('log in to application')
    })

    describe('Login', () => {
        it('succeeds with correct credentials', () => {
            cy.get('#username').type('clee')
            cy.get('#password').type('xerxes')
            cy.get('#login-button').click()
            cy.contains('Clemens logged in')
        })

        it('fails with wrong credentials', () => {
            cy.get('#username').type('clee')
            cy.get('#password').type('xerx')
            cy.get('#login-button').click()
            cy.get('.notification')
                .should('contain', 'Wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')

            cy.get('html').should('not.contain', 'Clemens logged in')
        })
    })

    describe('When logged in', () => {
        beforeEach(() => {
            cy.login({ username: 'clee', password: 'xerxes' })
        })

        it('A blog can be created', () => {
            cy.contains('new blog').click()
            cy.get('#newTitle').type('blog created by cypress')
            cy.get('#newAuthor').type('ich')
            cy.get('#newUrl').type('www.www.www')
            cy.get('#createNewBlog').click()

            cy.contains('blog created by cypress')
            cy.contains('ich')
        })

        describe('and a blog exists', () => {
            beforeEach(() => {
                cy.createBlog({ title: 'aaa', author: 'bbb', url: 'ccc' })
            })

            it('it can be liked', () => {
                cy.contains('show').click()
                cy.contains('like').click()
                cy.contains('1 like')
            })

            it('it can be removed', () => {
                cy.contains('show').click()
                cy.contains('remove').click()

                cy.get('.notification')
                    .should('contain', 'blog aaa by bbb removed')
                    .and('have.css', 'color', 'rgb(0, 128, 0)')

                cy.get('html').should('not.contain', 'aaa')
            })

            it('other user can not remove', () => {
                cy.contains('logout').click()
                cy.login({ username: 'demo', password: 'demo' })
                cy.contains('show').click()
                cy.get('html').should('contain.not', 'remove')
            })
        })

        it('blogs are in the right order', () => {
            cy.createBlog({ title: 'The title with the second most likes', author: 'a', url: 'b', likes: '5' })
            cy.createBlog({ title: 'The title with the third most likes', author: 'a', url: 'b', likes: '0' })
            cy.createBlog({ title: 'The title with the most likes', author: 'a', url: 'b', likes: '10' })
            cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
            cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
            cy.get('.blog').eq(2).should('contain', 'The title with the third most likes')
        })
    })


})