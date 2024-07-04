/// <reference types="cypress"/>
import faker from "faker-br";
faker.locale = "pt_BR";

describe("make purchases on e-commerce", () => {
  beforeEach(() => {
    // Aumentar o timeout padrão para comandos longos
    Cypress.config("defaultCommandTimeout", 20000);
    // Definir viewport para simular uma tela grande
    cy.viewport(1920, 1080);
    // Limpar cookies e sessionStorage antes de cada teste
    cy.clearCookies();
    cy.clearSessionStorage();
    // Realizar login antes de cada teste
    cy.login(); // Utilizando comando personalizado para login
  });

  it('make purchases', () => {
    // Ordenar produtos por preço (do mais baixo para o mais alto)
    cy.get('[id="header_container"]').contains("Products").should('be.visible'); // Verifica se a seção "Products" está visível

    cy.get('select').select('Price (low to high)'); // Seleciona a opção de ordenação por preço

    // Adicionar produtos ao carrinho
    addToCart('Test.allTheThings() T-Shirt (Red)');
    addToCart('Sauce Labs Onesie');

    // Acessar o carrinho
    cy.get('#shopping_cart_container').click(); // Clica no ícone do carrinho
    cy.wait(2000); // Espera um pouco para carregar a página do carrinho

    // Verificar se está na página correta
    cy.contains("YOUR CART").should("be.visible"); // Verifica se a página "YOUR CART" está visível

    // Prosseguir para o checkout
    cy.get('[name="checkout"]').click(); // Clica no botão de checkout

    // Preencher informações de entrega
    fillShippingInformation();

    // Concluir a compra
    cy.get('#finish').click(); // Clica no botão para finalizar a compra

    // Voltar para a página inicial
    cy.get('[data-test="back-to-products"]').click(); // Clica no link para voltar aos produtos

    // Fazer logout
    logout();
  });

  // Função para adicionar produtos ao carrinho
  function addToCart(productName) {
    cy.get(`[data-test="add-to-cart-${productName.toLowerCase().replace(/ /g, "-")}"]`).click();
    // Clica no botão "Add to Cart" do produto especificado
  }

  // Função para preencher informações de entrega
  function fillShippingInformation() {
    cy.get('input[id="first-name"]').type(faker.name.firstName()); // Preenche o campo de primeiro nome com um nome gerado aleatoriamente
    cy.get('input[id="last-name"]').type(faker.name.lastName()); // Preenche o campo de último nome com um sobrenome gerado aleatoriamente
    cy.get('input[id="postal-code"]').type("18150000"); // Preenche o campo de CEP com um valor fixo
    cy.get('input[id="continue"]').click(); // Clica no botão de continuar
  }

  // Função para fazer logout
  function logout() {
    cy.get('#react-burger-menu-btn').click(); // Abre o menu lateral clicando no botão do menu
    cy.get('#logout_sidebar_link').click(); // Clica no link de logout no menu lateral
  }
});
