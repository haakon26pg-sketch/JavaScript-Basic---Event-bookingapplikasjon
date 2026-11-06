
/* gamingcon 2026 js */

/* select main views */
const homeView = document.querySelector("#home-view");
const successView = document.querySelector("#success-view");

/* select left cards */
const leftHomeCard = document.querySelector("#left-home-card");
const datesCard = document.querySelector("#dates-events");

/* select right cards */
const rightHomeCard = document.querySelector("#right-home-card");
const ticketsCard = document.querySelector("#tickets");

/* select navigation elements */
const datesNav = document.querySelector("#dates-nav");
const ticketsNav = document.querySelector("#tickets-nav");
const eventCardLink = document.querySelector("#event-card-link");
const brandLogo = document.querySelector(".brand");

/* show dates and events on the left */
function showDates() {
    homeView.hidden = false;
    successView.hidden = true;

    leftHomeCard.hidden = true;
    datesCard.hidden = false;
}

/* show booking and tickets on the right */
function showTickets() {
    homeView.hidden = false;
    successView.hidden = true;

    rightHomeCard.hidden = true;
    ticketsCard.hidden = false;
}

/* return to original homepage */
function showHome() {
    homeView.hidden = false;
    successView.hidden = true;

    leftHomeCard.hidden = false;
    rightHomeCard.hidden = false;

    datesCard.hidden = true;
    ticketsCard.hidden = true;
}

/* navigation event listeners */
datesNav.addEventListener("click", function(event) {
    event.preventDefault();
    showDates();
});

ticketsNav.addEventListener("click", function(event) {
    event.preventDefault();
    showTickets();
});

/* homepage event card link */
eventCardLink.addEventListener("click", function(event) {
    event.preventDefault();
    showDates();
});

/* clicking logo returns to homepage */
brandLogo.addEventListener("click", function(event) {
    event.preventDefault();
    showHome();
});

/* ==========================================
   event selection
========================================== */

/* select event buttons */
const eventOptions = document.querySelectorAll(".event-option");

/* select display elements */
const selectedEventDisplay = document.querySelector("#selected-event-display");
const summaryEvent = document.querySelector("#summary-event");

/* store selected event */
let selectedEvent = null;

/* function to select an event */
function selectEvent(button) {
    /* get information from the html */
    const eventName = button.dataset.event;
    const eventDate = button.dataset.date;
    const eventTime = button.dataset.time;

    /* save event information as an object */
    selectedEvent = {
        name: eventName,
        date: eventDate,
        time: eventTime
    };

    /* highlight the selected event */
    eventOptions.forEach(function(option) {
        if (option === button) {
            option.setAttribute("aria-pressed", "true");
        } else {
            option.setAttribute("aria-pressed", "false");
        }
    });

    /* display the selected event */
    selectedEventDisplay.textContent =
        `Selected: ${selectedEvent.name} - ${selectedEvent.date} at ${selectedEvent.time}`;

    selectedEventDisplay.hidden = false;

    /* update the booking summary (still hidden at this stage) */
    summaryEvent.textContent = selectedEvent.name;
}

/* event listeners for all event buttons */
eventOptions.forEach(function(button) {
    button.addEventListener("click", function() {
        selectEvent(button);
    });
});

// ticket selecton and dynamic pricing

// select ticket buttons

const ticketOptions = document.querySelectorAll(".ticket-option");

// select booking element

const ticketSummary = document.querySelector("#ticket-summary");
const ticketAmount = document.querySelector("#ticket-amount");
const bookingForm = document.querySelector("#booking-form");

// select booking stages

const stagePrompt = document.querySelector("#stage-prompt");
const stageAmount = document.querySelector("#stage-amount");

// select summary elements

const summaryTicket = document.querySelector("#summary-ticket");
const summaryQuantity = document.querySelector("#summary-quantity");
const summaryTotal = document.querySelector("#summary-total");

// store selected ticket and quantity

let selectedTicket = null;
let ticketQuality = 0;

// function to update ticket summary

function updateTicketSumamry() {

    if (selectedTicket === null) {
        return;
    }

    // calculate the total booking price

    const totalPrice = selectedTicket.price * ticketQuantity;

    // update booking summary
    summaryTicket.textContent = selectedTicket.name;

    summaryTotal.textContent =
        `${totalPrice.toLocaleString("nb-NO")} NOK`;

    // update the visible ticket selection

   if (ticketQuantity > 0) {

    ticketSummary.textContent =
        `${selectedTicket.name} x ${ticketQuantity} = ${totalPrice.toLocaleString("nb-NO")} NOK`;

} else {

    ticketSummary.textContent =
        `${selectedTicket.name} selected - choose ticket amount`;

}

ticketSummary.hidden = false;

}

// function to select ticket

function selectTicket(button) {

    // get ticket information from HTML

    const ticketName = (button.dataset.ticket);
    const ticketPrice = Number(button.dataset.price);

    // save ticket info as object
    selectedTicket = {
        name: ticketName,
        price: ticketPrice
    };

    // highlight selectected ticket
    ticketOptions.forEach(function(option) {

        if (option === button) {

            option.setAttribute("aria-pressed", "true");
   
        } else {

            option.setAttribute("aria-pressed", "false");
        }
    });

    // show the ticket amount staged
    stagePrompt.hidden = true;
    stageAmount.hidden = false;

    // preserve the current quantity if one is selected
    ticketQuantity = Number(ticketAmount.value) || 0;

    // update prices
    updateTicketSummary();
}

// add click to ticket buttons

ticketOptions.forEach(function(button) {

    button.addEventListener("click", function() {

        selectTicket(button);
    });

});

// detect changes in ticket quantity

ticketAmount.addEventListener("change", function() {

    const amount = Number(ticketAmount.value);

    // validate amount between 1-5
    if (Number.isInteger(amount) && amount >= 1 && amount <= 5) {

        ticketQuantity = amount;
   
    } else {

        ticketQuantity = 0;
    }

    // recalculate total

    updateTicketSummary();

});

// prevent booking form from reloading page

console.log("Booking form:", bookingForm);

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();
});

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

});