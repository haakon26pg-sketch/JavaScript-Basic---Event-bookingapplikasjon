
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

function updateTicketSummary() {

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

// show the ticket amount stage
showBookingStage("amount");

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

// booking form and validation

// selet remaining booking stages

const stageEmail = document.querySelector("#stage-email");
const stageName = document.querySelector("#stage-name");
const stageSummary = document.querySelector("#stage-summary");

// select customer input

const customerEmail = document.querySelector("#customer-email");
const customerName = document.querySelector("#customer-name");

// select error and confirmation elements

const stepError = document.querySelector("#step-error");
const successRecap = document.querySelector("#success-recap");
const newBookingButton = document.querySelector("#new-booking-button");

// track current booking stage

let currentBookingStage = "prompt";

/* function to switch between booking stages */

function showBookingStage(step) {

    /* hide every stage first */

    stagePrompt.hidden = true;
    stageAmount.hidden = true;
    stageEmail.hidden = true;
    stageName.hidden = true;
    stageSummary.hidden = true;

    /* display the correct stage */

    if (step === "prompt") {

        stagePrompt.hidden = false;

    } else if (step === "amount") {

        stageAmount.hidden = false;

    } else if (step === "email") {

        stageEmail.hidden = false;
        customerEmail.focus();

    } else if (step === "name") {

        stageName.hidden = false;
        customerName.focus();

    } else if (step === "summary") {

        stageSummary.hidden = false;

    }

    /* remember current stage */

    currentBookingStage = step;

    /* clear previous error messages */

    stepError.hidden = true;
}

// function to display validation error

function showBookingError(message) {

    stepError.textContent = message;
    stepError.hidden = false;

}

// handle booking for submit

bookingForm.addEventListener("submit", function(event) {

    // prevent page reload

    event.preventDefault();

    // stage 1: validate ticket quantity

    if (currentBookingStage === "amount") {

        const amount = Number(ticketAmount.value);

        if (
            !selectedTicket ||
            !Number.isInteger(amount) ||
            amount < 1 ||
            amount > 5
        ) {

            showBookingError("Please select between 1 and 5 tickets.");
        
        }

        ticketQuantity = amount;

        updateTicketSummary();

        showBookingStage("email");

        // stage 2: validate email

    } else if (currentBookingStage === "email") {

        const email = customerEmail.value.trim();

        if (email === "" || !customerEmail.checkValidity()) {

            showBookingError("Please enter a valid email address.");
            return;
        
        }

        showBookingStage("name");


    // stage 3 - validate full name

    } else if (currentBookingStage === "name") {

        const fullName = customerName.value.trim();

        if(fullName.length < 2) {

            showBookingError("Please enter your full name.");
            return;
        }

        updateTicketSummary();
        
        showBookingStage("summary");

        // stage 4 confirm booking
    
    } else if(currentBookingStage === "summary") {

        // an event must be selected

        if (selectedEvent === null) {

            showDates();

            showBookingError(
                "Please select an event from Dates & Events."
            );

            return;
        
        }
            // calculate final price

        const totalPrice =
                selectedTicket.price * ticketQuantity;

                // create booking confirmation text

                successRecap.textContent =
                `Order Confirmed! ${customerName.value.trim()}, ` +
                `you booked ${ticketQuantity} x ${selectedTicket.name}` +
                `for ${selectedEvent.name}. ` +
                `Total: ${totalPrice.toLocaleString("nb-NO")} NOK.`;

                // replace two cards with success screen

                homeView.hidden = true;
                successView.hidden = false;

                // move keyboard focus to confirmed order

                successView.querySelector("h1").focus();

    }

});

// start new booking

newBookingButton.addEventListener("click", function() {

    // resert form inputs

    bookingForm.reset();

    // reset stored booking info

    selectedTicket = null;
    selectedEvent = null;
    ticketQuantity = 0;

    // remove selected ticket highlights

    ticketOptions.forEach(function(button) {

        button.setAttribute("aria-pressed", "false");
    });

    // remove selected event higlights

    eventOptions.forEach(function(button) {

        button.setAttribute("aria-pressed", "false");
    });

    // hide previous selections

    ticketSummary.hidden = true;
    selectedEventDisplay.hidden = true;

    // reset booking summary

    summaryEvent.textContent = "—"
    summaryTicket.textContent = "—"
    summaryQuantity.textContent = "—"
    summaryTotal.textContent = "0 NOK";

    // return form to starting stage

    showBookingStage("prompt");

    // restore homepage cards

    showHome();

});