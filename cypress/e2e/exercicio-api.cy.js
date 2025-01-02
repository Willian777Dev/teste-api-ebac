/// <reference types="cypress" />
import contrato from '../contracts/produtos.contract'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contrato.validateAsync(response.body)
    })
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
    let email = 'emailEBAC@' + Math.floor(Math.random() * 10000000000)
    cy.cadastrarUsuario("louco", email, "teste", "true")
    .should(response => {
      expect(response.body).to.have.property('usuarios')
    });
  })

  it('Deve validar um usuário com email inválido', () => {
    cy.cadastrarUsuario("Hatred", "eusoueu123@ola.com.br", "teste", "true")
    .should(response => {
      expect(response.status).equal(400)
    });
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    let email = 'email EBAC editado' + Math.floor(Math.random() * 10000000000)
    cy.cadastrarUsuario('editado perfil', email, 'yesyes', 'false')
    .then(response => {
      let id = response.body._id
      cy.request({
        method: 'PUT',
        url: `usuarios/${id}`,
        body: {
          "nome": 'editado perfil',
          "email": email,
          "password": 'yesyes',
          "administrador": 'false'
        }
      })
    })
    
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cadastrarUsuario('Usuario a ser deletado', 'email@', 'yesyes', 'true')
    .then(response => {
      let id = response.body._id
      cy.request({
        method: 'DELETE',
        url: `produtos${id}`,

      })
    })
  });


});
