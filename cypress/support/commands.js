import { url_base_api, url_base_site } from '../support/util/URLs'

const { faker } = require('@faker-js/faker');
const fakerBr = require('faker-br');

Cypress.Commands.add('validaçãoPadrãoGET_API', (response) => {
  expect(response.status).to.eq(200)

  expect(response.body.id).to.not.be.null;
  expect(response.body.name).to.not.be.null;
  expect(response.body.username).to.not.be.null;
  expect(response.body.address.street).to.not.be.null;
  expect(response.body.address.suite).to.not.be.null;
  expect(response.body.address.city).to.not.be.null;
  expect(response.body.address.zipcode).to.not.be.null;
  expect(response.body.address.geo.lat).to.not.be.null;
  expect(response.body.address.geo.lng).to.not.be.null;
  expect(response.body.phone).to.not.be.null;
  expect(response.body.website).to.not.be.null;
  expect(response.body.company.name).to.not.be.null;
  expect(response.body.company.catchPhrase).to.not.be.null;
  expect(response.body.company.bs).to.not.be.null;
})

Cypress.Commands.add('validaçãoPadrãoPOST_API', (response) => {
  expect(response.status).to.eq(201)

  expect(response.body.id).to.not.be.null;
  expect(response.body.name).to.not.be.null;
  expect(response.body.username).to.not.be.null;
  expect(response.body.address.street).to.not.be.null;
  expect(response.body.address.suite).to.not.be.null;
  expect(response.body.address.city).to.not.be.null;
  expect(response.body.address.zipcode).to.not.be.null;
  expect(response.body.address.geo.lat).to.not.be.null;
  expect(response.body.address.geo.lng).to.not.be.null;
  expect(response.body.phone).to.not.be.null;
  expect(response.body.website).to.not.be.null;
  expect(response.body.company.name).to.not.be.null;
  expect(response.body.company.catchPhrase).to.not.be.null;
  expect(response.body.company.bs).to.not.be.null;
})

Cypress.Commands.add('validaçãoStatus_404', (response) => {
  expect(response.status).to.eq(404)
})

Cypress.Commands.add('deletarUsuario', (idUsuario) => {
  cy.request({
    method: 'DELETE',
    url: `${url_base_api}/users/${idUsuario}`,
  })
})

Cypress.Commands.add('criarUsuarioMaior', () => {
  const dataNascimento = faker.date.birthdate({ mode: 'age', min: 18, max: 65 })

  const data = new Date(dataNascimento)

  const dia = String(data.getDate()).padStart(2, '0')
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const ano = data.getFullYear()

  const dataNascimentoFormatada = `${dia}/${mes}/${ano}`

  const userData = {
    nome: faker.person.fullName(),
    sexo: faker.person.sex(),
    dataNascimentoFormatada,
    cep: faker.location.zipCode('#####-###'),
    email: faker.internet.email(),
    senha: faker.internet.password({ length: 8, memorable: false, pattern: /[A-Za-z0-9!@#$%^&*()_+]/ })
  }
  return userData;
})

Cypress.Commands.add('criarUsuarioMenor', () => {
  const dataNascimento = faker.date.birthdate({ mode: 'age', min: 1, max: 17 })

  const data = new Date(dataNascimento)

  const dia = String(data.getDate()).padStart(2, '0')
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const ano = data.getFullYear()

  const dataNascimentoFormatada = `${dia}/${mes}/${ano}`

  const userData = {
    nome: faker.person.fullName(),
    sexo: faker.person.sex(),
    dataNascimentoFormatada,
    cep: faker.location.zipCode('#####-###'),
    email: faker.internet.email(),
    senha: faker.internet.password({ length: 8, memorable: false, pattern: /[A-Za-z0-9!@#$%^&*()_+]/ })
  }
  return userData;
})

Cypress.Commands.add('validarCadastro', () => {
  cy.url().should('be.equal', `${url_base_site}/usuario/sejabomdecama`)
  cy.contains('Tudo Ok! Seu cadastro VIP Guia de Motéis foi concluido com sucesso.')
})

Cypress.Commands.add('validarUsuarioCadastrado', () => {
  cy.contains("Já existe um cadastro com o e-mail informado")
})

Cypress.Commands.add('validarCadastroEmBranco', () => {
  cy.get('#noty_center_layout_container')
    .should('be.visible')
    .and('contain', 'Por favor, verifique se todos os campos obrigatórios estão preenchidos!')

  cy.get('[for="Nome"]')
    .should('be.visible')
    .and('contain', 'Campo nome obrigatório!')

  cy.get('#qtip-0-content')
    .should('be.visible')
    .and('contain', 'Campo sexo obrigatório!')

  cy.get('[for="DataNascimento"]')
    .should('be.visible')
    .and('contain', 'Campo Data Nascimento obrigatório!')

  cy.get('[for="Cep"]')
    .should('be.visible')
    .and('contain', 'Campo CEP obrigatório!')

  cy.get('[for="Email"]')
    .should('be.visible')
    .and('contain', 'Campo email obrigatório!')

  //Esse campo apresenta uma mensagem incorreta.
  cy.get('[for="ConfEmail"]')
    .should('be.visible')
    .and('contain', 'Campo Conf. de email obrigatório!')

  cy.get('[for="Senha"]')
    .should('be.visible')
    .and('contain', 'Campo senha obrigatório!')

  cy.get('[for="chkPrivacy"]')
    .should('be.visible')
    .and('contain', 'É preciso concordar com os termos de uso e política de privacidade')
})

Cypress.Commands.add('validarEmailsDiferentes', () => {
  cy.get('[for="ConfEmail"]')
    .should('be.visible')
    .and('contain', 'O campo confirmação de email deve ser identico ao campo email.')
})

Cypress.Commands.add('validarUsuarioMenor18Anos', () => {
  cy.get('[for="DataNascimento"]')
    .should('be.visible')
    .and('contain', 'Apenas maiores de 18 anos.')
})