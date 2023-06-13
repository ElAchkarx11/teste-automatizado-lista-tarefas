import { faker } from '@faker-js/faker';

describe('Register', () => {

    const randomEmail = faker.internet.email();
  
    it('Registrar usuario erroneamente', () => {
      cy.visit('https://lista-tarefas-qld.netlify.app/')
      cy.get('#register-link').click()
      cy.url().should('be.equal', 'https://lista-tarefas-qld.netlify.app/register')
  
      cy.get('#email-register-input').click().type("a1")
      cy.get('#email-password-input').click().type('123456')
      cy.get('#btn-register').click()
      cy.url().should('be.equal', 'https://lista-tarefas-qld.netlify.app/register')
  
    })
  
    it('Registrar usuario corretamente', () => {
      cy.visit('https://lista-tarefas-qld.netlify.app/')
      cy.get('#register-link').click()
      cy.url().should('be.equal', 'https://lista-tarefas-qld.netlify.app/register')
  
      cy.get('#email-register-input').click().type(randomEmail)
      cy.get('#email-password-input').click().type('123456')
      cy.get('#btn-register').click()
      cy.url().should('be.equal', 'https://lista-tarefas-qld.netlify.app/admin')
  
      cy.get('#btn-logout').click()
    })
  })