describe('blog app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'David Aranega',
      username: 'david96',
      password: 'pass12345'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:5173')
  })
  it('front page can be opened', () => {
    cy.contains('blogs')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('user can login', function() {
    cy.contains('login').click()
    cy.get('#username').type('david96')
    cy.get('#password').type('pass12345')
    cy.get('#login-button').click()

    cy.contains('logged in as David Aranega')
  })

  it('incorrect credentials', function() {
    cy.contains('login').click()
    cy.get('#username').type('david96')
    cy.get('#password').type('incorrect')
    cy.get('#login-button').click()

    cy.get('.notification').contains('incorrect username or password')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'david96', password: 'pass12345' })
    })

    it('a new blog can be created', function() {
      cy.contains('add blog').click()
      cy.get('#title-input').type('New blog TEST')
      cy.get('#url-input').type('url.test')
      cy.get('#author-input').type('Test Author')
      cy.get('#submit-button').click()

      cy.contains('New blog TEST')
    })

    describe('with a created blog', function() {
      beforeEach(function() {
        const loggedUserJson = JSON.parse(localStorage.getItem('loggedUser'))
        cy.request({
          method: 'POST',
          url: 'http://localhost:3000/api/blogs',
          body: { title: 'test blog', url: 'test.url', author: 'Test user' },
          headers: { authorization: `Bearer ${loggedUserJson.token}` }
        })
        cy.visit('http://localhost:5173')
      })

      it('can like blog', function() {
        cy.contains('Show').click()
        cy.contains('like').click()
        cy.contains('1 |')
      })

      it('a blog can be deleted', function() {
        cy.contains('delete').click()
        cy.wait(1000)
        cy.contains('test blog').should('not.exist')
      })

      it('different user can\'t delete blog', function() {
        cy.contains('logout').click()

        const user = {
          name: 'TEST ',
          username: 'TEST96',
          password: 'pass12345test'
        }
        cy.request('POST', 'http://localhost:3000/api/users/', user)
        cy.login({ username: 'TEST96', password: 'pass12345test' })

        cy.contains('Show').click()
        cy.contains('delete').should('not.exist')
      })

      it('order of blogs is correct', function() {
        cy.contains('Show').click()
        cy.contains('like').click()
        const loggedUserJson = JSON.parse(localStorage.getItem('loggedUser'))
        cy.request({
          method: 'POST',
          url: 'http://localhost:3000/api/blogs',
          body: { title: 'test blog with most likes', url: 'test.url', author: 'Test user' },
          headers: { authorization: `Bearer ${loggedUserJson.token}` }
        })
        cy.visit('http://localhost:5173')

        cy.contains('test blog with most likes').contains('Show').click()
        cy.contains('test blog with most likes').contains('like').click()
        cy.contains('test blog with most likes').contains('like').click()

        cy.contains('.blogs #blog', 'test blog with most likes').should('be.visible')
        cy.contains('.blogs #blog', 'test blog').should('be.visible')
      })
    })
  })
})