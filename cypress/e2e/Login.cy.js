import { faker } from '@faker-js/faker';

describe('Login', () => {

  const randomEmail = faker.internet.email();

  it('Login errado', () => {
    cy.visit('https://lista-tarefas-qld.netlify.app/')
    cy.get('#email-input').click().type(randomEmail)
    cy.get('#password-input').click().type("123456")
    cy.get('#btn-login').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('ERRO AO FAZER O LOGIN')


    })
  })

  it('Login correto', () => {
    cy.visit('https://lista-tarefas-qld.netlify.app/')
    cy.get('#email-input').click().type("teste1@gmail.com")
    cy.get('#password-input').click().type("123456")
    cy.get('#btn-login').click()
    cy.url().should('be.equal', 'https://lista-tarefas-qld.netlify.app/admin')
    cy.get('#btn-logout').click()
  })

})

