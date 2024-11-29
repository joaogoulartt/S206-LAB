const url = "https://www.mercadolivre.com.br/";

describe("Teste de carregamento e navegação interna", () => {
  it("Verifica se o carregamento foi feito", () => {
    cy.visit(url);
    cy.contains("Mercado Livre Brasil").should("be.visible");
  });

  it("Verifica se o footer foi carregado", () => {
    cy.visit(url);
    cy.get("footer.nav-footer").scrollIntoView();
    cy.contains("Copyright © 1999-2024 Ebazar.com.br LTDA.").should(
      "be.visible"
    );
  });
});

describe("Teste de Roteamento", () => {
  it("Navega até a página de ofertas", () => {
    cy.visit(url);
    cy.get(":nth-child(2) > .nav-menu-item-link").click();
    cy.url().should("include", "/ofertas");
  });
});

describe("Teste de Cookies", () => {
  function acceptCookies() {
    cy.visit(url);
    cy.get(".cookie-consent-banner-opt-out__container").should("be.visible");
    cy.get('[data-testid="action:understood-button"]').click();
    cy.get(".cookie-consent-banner-opt-out__container").should("not.exist");
  }

  it("Clica em Aceitar no popup de politica de privacidade", () => {
    acceptCookies();
  });

  it("Clica em Recusar no popup de politica de privacidade (Falha)", () => {
    cy.visit(url);
    cy.get(".cookie-consent-banner-opt-out__container").should("be.visible");
    cy.get('[data-testid="action:decline-button"]').click();
    cy.get(".cookie-consent-banner-opt-out__container").should("not.exist");
  });

  it("Carrega todos os cookies e busca o _mldataSessionId", () => {
    acceptCookies();
    cy.getAllCookies().then((cookies) => {
      expect(
        cookies.find((cookie) => cookie.name === "_mldataSessionId")
      ).to.have.property("value");
    });
  });

  it("Recupera o valor do cookie _mldataSessionId e verifica se é um uuid", () => {
    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

    acceptCookies();
    cy.getCookie("_mldataSessionId").then((cookie) => {
      expect(cookie.value.match(regex)).to.not.be.null;
    });
  });
});
