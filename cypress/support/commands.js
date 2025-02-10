import { url_base_api, URLs } from '../support/util/URLs'

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