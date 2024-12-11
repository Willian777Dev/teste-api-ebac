/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    //TODO: 
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should(response => {
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')
    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    let email = 'email EBAC' + Math.floor(Math.random() * 10000000000)
    cy.cadastrarUsuario("Luizz", email, "teste", "true")
    .should(response => {
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')
    });
  })

  it('Deve validar um usuário com email inválido', () => {
    cy.cadastrarUsuario("Hatred", "eusoueu123@ola.com.br", "teste", "true")
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    //TODO: 
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    //TODO: 
  });


});
