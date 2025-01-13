/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contracts'

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
    let email = 'emailEBACeditado' + Math.floor(Math.random() * 10000000000) + '@ebac.com'
    cy.cadastrarUsuario("louco", email, "teste", "true")
    .should(response => {
    expect(response.status).equal(201)
    })
  })

  it('Deve validar um usuário com email inválido', () => {
    cy.cadastrarUsuario("Hatred", "eusoueu123@ola.com.br", "teste", "true")
    .should(response => {
      expect(response.status).equal(400)
    });
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    let email = 'emailEBACeditado' + Math.floor(Math.random() * 10000000000) + '@ebac.com'
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
      }).should(response => {
        expect(response.status).equal(200)
      })
    })
    
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.cadastrarUsuario('usuario delete', 'olaola@gmail.com', 'yesyes', 'false')
    .then(response => {
      let id = response.body._id
      cy.request({
        method: 'DELETE',
        url: `usuarios/${id}`,
        body: {
          "nome": 'usuario delete',
          "email": 'olaola@gmail.com',
          "password": 'yesyes',
          "administrador": 'false'
        }
      }).should(response => {
        expect(response.status).equal(200)
      })
    })
  });


});
