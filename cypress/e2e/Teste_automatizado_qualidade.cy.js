import { faker } from '@faker-js/faker';

describe('template spec', () => {

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

     it('Registrar usuario erroneamente', () =>{
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

  
    it('Login correto', () => {
      cy.visit('https://lista-tarefas-qld.netlify.app/')
      cy.get('#email-input').click().type("teste1@gmail.com")
      cy.get('#password-input').click().type("123456")
      cy.get('#btn-login').click()
      cy.url().should('be.equal', 'https://lista-tarefas-qld.netlify.app/admin')
      cy.get('#btn-logout').click()
    })
  
  
    it('CRUD tarefas', () => {
      cy.visit('https://lista-tarefas-qld.netlify.app/')
      cy.get('#email-input').click().type("teste1@gmail.com")
      cy.get('#password-input').click().type("123456")
      cy.get('#btn-login').click()
      cy.url().should('be.equal', 'https://lista-tarefas-qld.netlify.app/admin')
  
      cy.get('#task-description').click().type('Teste Automatizado')
      cy.get('#btn-register-task').click()
      cy.get(':nth-child(2) > #item-tarefa').should('not.empty')
      cy.wait(2000)
  
      cy.get('#btn-edit').click()
      cy.get('#task-description').click().clear().type('Teste Automatizado 1')
      cy.get('#btn-update').click()
  
  
      cy.get(':nth-child(2) > div > #btn-conclude').click()
      cy.get(':nth-child(2) > div > #btn-conclude').should('not.exist')
  
      cy.get('#btn-logout').click()
    })
  
    it('Jogo da velha', () => {
      const stub = cy.stub()
  
      cy.visit('https://lista-tarefas-qld.netlify.app/')
      cy.get('#email-input').click().type("teste1@gmail.com")
      cy.get('#password-input').click().type("123456")
      cy.get('#btn-login').click()
      cy.url().should('be.equal', 'https://lista-tarefas-qld.netlify.app/admin')
  
      cy.get('#btn-play').click()
      cy.url().should('be.equal', 'https://lista-tarefas-qld.netlify.app/game')
  
      cy.on('window:alert', stub)
  
      cy.get('#casa-1').click()
      cy.get('#casa-4').click()
      cy.get('#casa-5').click()
      cy.get('#casa-8').click()
      cy.get('#casa-9').click().then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Jogador X venceu!')
      })
  
      cy.wait(1000)
  
      cy.get('#btn-retry').click()
  
      cy.get('#casa-2').click()
      cy.get('#casa-1').click()
      cy.get('#casa-3').click()
      cy.get('#casa-5').click()
      cy.get('#casa-6').click()
      cy.get('#casa-9').click().then(() => {
        expect(stub.getCall(1)).to.be.calledWith('Jogador O venceu!')
      })
  
      cy.wait(1000)
  
      cy.get('#btn-retry').click()
  
      cy.get('#casa-1').click()
      cy.get('#casa-3').click()
      cy.get('#casa-2').click()
      cy.get('#casa-4').click()
      cy.get('#casa-6').click()
      cy.get('#casa-5').click()
      cy.get('#casa-7').click()
      cy.get('#casa-8').click()
      cy.get('#casa-9').click().then(() => {
        expect(stub.getCall(2)).to.be.calledWith('O jogo deu velha')
      })
  
      cy.get('#btn-back-home').click()
  
      cy.get('#btn-logout').click()
    }) 
})