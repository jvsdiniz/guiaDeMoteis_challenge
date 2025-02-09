import { url_base_api, URLs } from '../support/util/URLs'

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