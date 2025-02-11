import elementosFormulario from "../../support/util/front_mapeamentoElementos/formularioCadastro"
import { url_base_site } from "../../support/util/URLs"

const { faker } = require('@faker-js/faker');
const fakerBr = require('faker-br');

describe('Testes no formulário de cadastro', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit(`${url_base_site}/usuario/cadastro`);
    });
    
    it('Sucesso - Realização de cadastro com sucesso', () => {
        cy.criarUsuarioMaior().then((usuario) => {
            cy.get(elementosFormulario.nome_formulario_cadastro).should('be.visible').type(usuario.nome);
            if (usuario.sexo == 'male') {
                cy.get(elementosFormulario.sexo_masculino).click();
              }
              else{
                cy.get(elementosFormulario.sexo_feminino).click();
              }
            cy.get(elementosFormulario.data_nascimento).type(usuario.dataNascimentoFormatada);
            cy.get(elementosFormulario.CEP).type(usuario.cep);
            cy.get(elementosFormulario.email).type(usuario.email);
            cy.get(elementosFormulario.confirmar_email).type(usuario.email);
            cy.get(elementosFormulario.senha).type(usuario.senha);
        })
        cy.get(elementosFormulario.checkbox_politicaPrivacidade).click();
        cy.get(elementosFormulario.botao_confirmarCadastro).click();

        cy.validarCadastro();
    })

    it('Erro - Tentativa de realização de cadastro com campos em branco', () => {
        cy.get(elementosFormulario.botao_confirmarCadastro).click();

        cy.validarCadastroEmBranco();
    })

    it('Erro - Cadastrar um usuário com e-mails diferentes', () => {
        const emailDiferente = "testeEmailDiferente@guiademoteis.com"

        cy.criarUsuarioMaior().then((usuario) => {
            cy.get(elementosFormulario.nome_formulario_cadastro).should('be.visible').type(usuario.nome);
            if (usuario.sexo == 'male') {
                cy.get(elementosFormulario.sexo_masculino).click();
              }
              else{
                cy.get(elementosFormulario.sexo_feminino).click();
              }
            cy.get(elementosFormulario.data_nascimento).type(usuario.dataNascimentoFormatada);
            cy.get(elementosFormulario.CEP).type(usuario.cep);
            cy.get(elementosFormulario.email).type(emailDiferente)
            cy.get(elementosFormulario.confirmar_email).type(usuario.email);
            cy.get(elementosFormulario.senha).type(usuario.senha);
        })
        cy.get(elementosFormulario.checkbox_politicaPrivacidade).click();
        cy.get(elementosFormulario.botao_confirmarCadastro).click();

        cy.validarEmailsDiferentes();
    })

    it('Erro - Cadastrar um usuário com e-mail já cadastrado', () => {
        const emailUsuarioCadastrado = "jvsdiniz@outlook.com"

        cy.criarUsuarioMaior().then((usuario) => {
            cy.get(elementosFormulario.nome_formulario_cadastro).should('be.visible').type(usuario.nome);
            if (usuario.sexo == 'male') {
                cy.get(elementosFormulario.sexo_masculino).click();
              }
              else{
                cy.get(elementosFormulario.sexo_feminino).click();
              }
            cy.get(elementosFormulario.data_nascimento).type(usuario.dataNascimentoFormatada);
            cy.get(elementosFormulario.CEP).type(usuario.cep);
            cy.get(elementosFormulario.email).type(emailUsuarioCadastrado)
            cy.get(elementosFormulario.confirmar_email).type(emailUsuarioCadastrado);
            cy.get(elementosFormulario.senha).type(usuario.senha);
        })
        cy.get(elementosFormulario.checkbox_politicaPrivacidade).click();
        cy.get(elementosFormulario.botao_confirmarCadastro).click();

        cy.validarUsuarioCadastrado();
    })

    it('Sucesso - Cadastrar um usuário com data de nascimento inválida', () => {
        cy.criarUsuarioMenor().then((usuario) => {
            cy.get(elementosFormulario.nome_formulario_cadastro).should('be.visible').type(usuario.nome);
            if (usuario.sexo == 'male') {
                cy.get(elementosFormulario.sexo_masculino).click();
              }
              else{
                cy.get(elementosFormulario.sexo_feminino).click();
              }
            cy.get(elementosFormulario.data_nascimento).type(usuario.dataNascimentoFormatada);
            cy.get(elementosFormulario.CEP).type(usuario.cep);
            cy.get(elementosFormulario.email).type(usuario.email);
            cy.get(elementosFormulario.confirmar_email).type(usuario.email);
            cy.get(elementosFormulario.senha).type(usuario.senha);
        })
        cy.get(elementosFormulario.checkbox_politicaPrivacidade).click();
        cy.get(elementosFormulario.botao_confirmarCadastro).click();

        cy.validarUsuarioMenor18Anos();
    })

    

    


})