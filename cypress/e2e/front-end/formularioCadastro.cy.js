import elementosFormulario from "../../support/util/front_mapeamentoElementos/formularioCadastro"
import { url_base_site } from "../../support/util/URLs"

const { faker } = require('@faker-js/faker');
const fakerBr = require('faker-br');

describe('Testes no formulário de cadastro', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit(`${url_base_site}/usuario/cadastro`);

    });
    
    it('Sucesso - Realização de cadastro', () => {
        cy.criarUsuarioMaior().then((usuario) => {
            cy.get(elementosFormulario.nome_formulario_cadastro).should('be.visible').type(usuario.nome);
            if (usuario.sexo == 'male') {
                cy.get(elementosFormulario.sexo_masculino).click();
              }
              else{
                cy.get(elementosFormulario.sexo_feminino).click();
              }
            cy.get(elementosFormulario.data_nascimento).type(usuario.dataNascimentoFormatada);
        })
    })


})