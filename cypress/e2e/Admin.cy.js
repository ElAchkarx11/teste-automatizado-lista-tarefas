
describe('Admin tarefas', () => {

    it('Criando tarefas', () => {
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
})