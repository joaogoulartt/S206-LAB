describe("Teste de carregamento e navageção interna", () => {
  it("Verifica se o carregamento foi feito", () => {
    cy.visit("https://docs.cypress.io/app/get-started/why-cypress");
    cy.contains("Why Cypress?").should("be.visible");
  });

  it("Verifica se o footer foi carregado", () => {
    cy.visit("https://docs.cypress.io/app/get-started/why-cypress");
    cy.get(".footer").scrollIntoView();
    cy.contains("© 2024 Cypress.io. All rights reserved.").should("be.visible");
  });

  it("Navega até a aba End-to-end testing", () => {
    cy.visit("https://docs.cypress.io/app/get-started/why-cypress");
    cy.contains("End-to-end testing").click();
    cy.contains("End-to-end testing").should("be.visible");
  });

  it("Navega para uma pagina inexistente (Falha)", () => {
    cy.visit("https://docs.cypress.io/app/get-started/why-cypress");
    cy.visit("https://docs.cypress.io/app/get-started/why-cypress/naoexiste", {
      failOnStatusCode: false,
    });
    cy.contains("Page Not Found").should("be.visible");
  });
});

describe("Teste de Cookies", () => {
  it("Clica em Aceitar no popup de politica de privacidade", () => {
    cy.visit("https://docs.cypress.io/app/get-started/why-cypress");
    cy.get(".osano-cm-storage-policy").should("be.visible");
    cy.get(".osano-cm-accept").click();
    cy.get(".osano-cm-storage-policy").should("not.be.visible");
  });

  it("Clica em Recusar no popup de politica de privacidade", () => {
    cy.visit("https://docs.cypress.io/app/get-started/why-cypress");
    cy.get(".osano-cm-storage-policy").should("be.visible");
    cy.get(".osano-cm-deny").click();
    cy.get(".osano-cm-storage-policy").should("not.be.visible");
  });

  it("Carrega todos os cookies e busca o osano_consentmanager", () => {
    cy.visit("https://docs.cypress.io/app/get-started/why-cypress");
    cy.get(".osano-cm-accept").click();
    cy.getAllCookies().then((cookies) => {
      expect(
        cookies.find((cookie) => cookie.name === "osano_consentmanager")
      ).to.have.property("value");
    });
  });
});
