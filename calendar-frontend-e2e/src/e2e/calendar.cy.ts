import { findEvent, getAddEventButton } from '../support/calendar.po';

describe('Calendar page', () => {
  // Update the base url to the network url of UI being served (doesn't work with localhost)
  beforeEach(() => cy.visit('http://192.168.1.202:4004/'));
  it('should be able to add event to the calendar', () => {
    getAddEventButton().click();
    findEvent('Random event').should('be.visible');
  });

  // this doesn't work
  it('should be able to drag and drop an event', () => {
    cy.get('.rbc-event').first().scrollIntoView();
    cy.click();
    cy.trigger('dragstart');

    cy.get('.rbc-time-slot').eq(365).trigger('dragenter', { force: true });
    cy.trigger('dragover', { force: true });
    cy.trigger('drop', { force: true });
    cy.trigger('dragend', { force: true });
  });
});
