import { url_base_api} from '../../support/util/URLs'

function gerarNumeroAleatorio() {
  return Math.floor(Math.random() * 1000);
}

describe('Testes de API', () => {

  it('Sucesso - Chamada GET', () => {
    cy.request({
      method: 'GET',
      url: `${url_base_api}/users/10`,
      //#### CASO FOSSE NECESSÁRIO O USO DE TOKEN PARA ACESSAR A API ELE ESTÁRIA ABAIXO #####
      // headers: {
      //   'Authorization': 'Bearer your_token'
      // }
    })
      .then((response) => {
        cy.validaçãoPadrãoGET_API(response)
      })
  })

  it('Sucesso - Chamada POST', () => {
    const idUsuario = gerarNumeroAleatorio()

    cy.readFile('cypress/support/util/payloads/payloadBaseAPI.json')
      .then(data => {
        data.id = idUsuario;
        cy.log('Realizando cadastro de usuário com o ID [' + idUsuario + ']');

        cy.request({
          method: 'POST',
          url: `${url_base_api}/users`,
          body: data
          //#### CASO FOSSE NECESSÁRIO O USO DE TOKEN PARA ACESSAR A API ELE ESTÁRIA ABAIXO #####
          // headers: {
          //   'Authorization': 'Bearer your_token'
          // }
        })
      }).then((response) => {
        cy.validaçãoPadrãoPOST_API(response)
      })
  })

  it('Sucesso - Chamada DELETE', () => {
    const idUsuario = gerarNumeroAleatorio()
    cy.wrap(idUsuario).as('userId')

    cy.readFile('cypress/support/util/payloads/payloadBaseAPI.json')
      .then(data => {
        data.id = idUsuario;
        cy.log('Realizando cadastro de usuário com o ID [' + idUsuario + ']');

        cy.request({
          method: 'POST',
          url: `${url_base_api}/users`,
          body: data
          //#### CASO FOSSE NECESSÁRIO O USO DE TOKEN PARA ACESSAR A API ELE ESTÁRIA ABAIXO #####
          // headers: {
          //   'Authorization': 'Bearer your_token'
          // }
        })
      }).then((response) => {
        cy.validaçãoPadrãoPOST_API(response)
      }).then((response) => {
        cy.get('@userId').then(userId => {
          cy.deletarUsuario(userId);
        })
      })
  })

  it('Erro - Chamada POST - Status 404', () => {
    const numeroAleatorio = gerarNumeroAleatorio()

    cy.readFile('cypress/support/util/payloads/payloadBaseAPI.json')
      .then(data => {
        data.id = numeroAleatorio;
        cy.log('Realizando cadastro de usuário com o ID [' + numeroAleatorio + ']');

        cy.request({
          method: 'POST',
          url: `${url_base_api}/users/5`,
          body: data,
          failOnStatusCode: false
          //#### CASO FOSSE NECESSÁRIO O USO DE TOKEN PARA ACESSAR A API ELE ESTÁRIA ABAIXO #####
          // headers: {
          //   'Authorization': 'Bearer your_token'
          // }
        })
      }).then((response) => {
        cy.validaçãoStatus_404(response)
      })
  })
})