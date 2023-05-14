import Section from "../../src/components/Section";

describe("<Section />", () => {
  context("Render correct number of columns", () => {
    it("Viewport: 1094x698", () => {
      cy.viewport(1094, 698);
      cy.mount(<Section title="test" inline />);
      cy.getByCy("section-container")
        .invoke("css", "grid-template-columns")
        .then((str) => {
          expect(String(str).split(" ").length).equal(6);
        });
    });

    it("Viewport: 859x698", () => {
      cy.viewport(859, 698);
      cy.mount(<Section title="test" />);
      cy.getByCy("section-container")
        .invoke("css", "grid-template-columns")
        .then((str) => {
          expect(String(str).split(" ").length).equal(5);
        });
    });

    it("Viewport: 662x698", () => {
      cy.viewport(662, 698);
      cy.mount(<Section title="test" inline />);
      cy.getByCy("section-container")
        .invoke("css", "grid-template-columns")
        .then((str) => {
          expect(String(str).split(" ").length).equal(4);
        });
    });

    it("Viewport: 480x698", () => {
      cy.viewport(480, 698);
      cy.mount(<Section title="test" />);
      cy.getByCy("section-container")
        .invoke("css", "grid-template-columns")
        .then((str) => {
          expect(String(str).split(" ").length).equal(2);
        });
    });
  });
});
