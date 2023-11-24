/// <reference types="cypress" />

import faker from "faker";

Cypress.Commands.add("preCadastro", () => {
  const email = faker.internet.email();
  const password = "teste@teste!123";

  cy.visit("http://lojaebac.ebaconline.art.br/#");
  cy.get(".icon-user-unfollow").click();

  cy.get("#reg_email").type(email);
  cy.get("#reg_password").type(password);
  cy.get(":nth-child(4) > .button").click();

  cy.get(".woocommerce-MyAccount-navigation-link--edit-account > a").click();
  cy.get("#account_first_name").type(faker.name.firstName());
  cy.get("#account_last_name").type(faker.name.lastName());
  cy.get(".woocommerce-Button").click();

  cy.get(".woocommerce-message").should(
    "be.visible",
    "Detalhes da conta modificados com sucesso."
  );

  // Armazena os dados do usuário na variável global
  cy.wrap({ email, password }).as("userData");
});

Cypress.Commands.add("adicionarProdutosAoCarrinho", () => { 
  cy.visit("http://lojaebac.ebaconline.art.br/produtos/");
  cy.get(
    ".post-2559 > .product-block > .caption > .meta > .infor > .name > a"
  ).click();

  var quantidade = 4;

  cy.get(".button-variable-item-XS").click();
  cy.get(".button-variable-item-Blue").click();
  cy.get(".input-text").clear().type(quantidade);
  cy.get(".single_add_to_cart_button").click();
  cy.get(".woocommerce-message > .button").click();
  cy.get(".checkout-button").click();
});

Cypress.Commands.add("finalizarCompra", (cep, telefone, cidade, rua) => {
  cy.get("#billing_postcode").type(cep);
  cy.get("#billing_phone").type(telefone);
  cy.get("#billing_city").type(cidade);
  cy.get("#billing_address_1").type(rua);

  cy.get("#terms").click();
  cy.get("#place_order").click();

  cy.get(".page-title").should("be.visible", "PEDIDO RECEBIDO");
});
