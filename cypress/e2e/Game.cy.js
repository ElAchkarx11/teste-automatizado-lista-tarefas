describe('Game', () => {

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