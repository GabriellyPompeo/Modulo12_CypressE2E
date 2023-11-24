/// <reference types="cypress" />

import faker from 'faker';

describe("Exercício - Testes End-to-end - Fluxo de pedido", () => {
  beforeEach(() => {
    cy.preCadastro();
    cy.screenshot();
  });


  it("Deve adicionar 4 produtos ao carrinho e finalizar a compra", () => {
    cy.adicionarProdutosAoCarrinho();
    cy.screenshot();
    const cep = faker.address.zipCode("#####-###");
    const telefone = faker.phone.phoneNumber("(##) #####-####");
    const cidade = faker.address.city();
    const rua = faker.address.streetName();

    cy.finalizarCompra(cep, telefone, cidade, rua);
    cy.screenshot();
  });
});
