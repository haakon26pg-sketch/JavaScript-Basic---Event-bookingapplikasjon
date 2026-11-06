
/* gamingcon 2026 js */

// select main views and navigation

const homeView = document.querySelector("#home-view");
const successView = document.querySelector("#success-view");

const leftHomeCard = document.querySelector("#left-home-card");
const rightHomeCard = document.querySelector("#right-home-card");

const datesCard = document.querySelector("#dates-events");
const ticketsCard = document.querySelector("#tickets");

const datesNav = document.querySelector("#dates-nav");
const ticketsNav = document.querySelector("#tickets-nav");
const eventCardLink = document.querySelector("#event-card-link");
const brandLogo = document.querySelector(".brand");


// select ticket elements

const ticketOptions = document.querySelectorAll(".ticket-option");
const ticketSummary = document.querySelector("#ticket-summary");
const ticketAmount = document.querySelector("#ticket-amount");
const ticketDate = document.querySelector("#ticket-date");

const bookingForm = document.querySelector("#booking-form");


// select booking stages

const stagePrompt = document.querySelector("#stage-prompt");
const stageDate = document.querySelector("#stage-date");
const stageAmount = document.querySelector("#stage-amount");
const stageEmail = document.querySelector("#stage-email");
const stageName = document.querySelector("#stage-name");
const stageSummary = document.querySelector("#stage-summary");
const stageConfirmed = document.querySelector("#stage-confirmed");


// select form inputs and summary elements

const customerEmail = document.querySelector("#customer-email");
const customerName = document.querySelector("#customer-name");

const summaryEvent = document.querySelector("#summary-event");
const summaryDate = document.querySelector("#summary-date");
const summaryTicket = document.querySelector("#summary-ticket");
const summaryQuantity = document.querySelector("#summary-quantity");
const summaryTotal = document.querySelector("#summary-total");

const stepError = document.querySelector("#step-error");
const successRecap = document.querySelector("#success-recap");
const newBookingButton = document.querySelector("#new-booking-button");


// booking variables

let selectedTicket = null;
let selectedDate = "";
let ticketQuantity = 0;
let currentBookingStage = "prompt";


// independent card switching

/* show dates on the left */

function showDates() {

    homeView.hidden = false;
    successView.hidden = true;

    leftHomeCard.hidden = true;
    datesCard.hidden = false;

}


/* show tickets on the right */

function showTickets() {

    homeView.hidden = false;
    successView.hidden = true;

    rightHomeCard.hidden = true;
    ticketsCard.hidden = false;

}


/* restore original homepage */

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

eventCardLink.addEventListener("click", function(event) {

    event.preventDefault();
    showDates();

});

brandLogo.addEventListener("click", function(event) {

    event.preventDefault();
    showHome();

});


// booking stage switching

function showBookingStage(step) {

    /* hide every stage first */

    stagePrompt.hidden = true;
    stageDate.hidden = true;
    stageAmount.hidden = true;
    stageEmail.hidden = true;
    stageName.hidden = true;
    stageSummary.hidden = true;
    stageConfirmed.hidden = true;


    /* show requested stage */

    if (step === "prompt") {

        stagePrompt.hidden = false;

    } else if (step === "date") {

        stageDate.hidden = false;
        ticketDate.focus();

    } else if (step === "amount") {

        stageAmount.hidden = false;
        ticketAmount.focus();

    } else if (step === "email") {

        stageEmail.hidden = false;
        customerEmail.focus();

    } else if (step === "name") {

        stageName.hidden = false;
        customerName.focus();

    } else if (step === "summary") {

        stageSummary.hidden = false;

    }


    /* save current stage */

    currentBookingStage = step;

    /* clear previous errors */

    stepError.textContent = "";
    stepError.hidden = true;

}


// update ticket summary and total

function updateTicketSummary() {

    if (selectedTicket === null) {
        return;
    }

    /* calculate total price */

    const totalPrice = selectedTicket.price * ticketQuantity;


    /* update booking summary */

    summaryEvent.textContent = "GamingCon 2026";
    summaryDate.textContent = selectedDate || "—";
    summaryTicket.textContent = selectedTicket.name;

    summaryQuantity.textContent =
        ticketQuantity > 0 ? ticketQuantity : "—";

    summaryTotal.textContent =
        `${totalPrice.toLocaleString("nb-NO")} NOK`;


    /* update visible ticket selection */

    if (ticketQuantity > 0) {

        ticketSummary.textContent =
            `${selectedTicket.name} x ${ticketQuantity} = ` +
            `${totalPrice.toLocaleString("nb-NO")} NOK`;

    } else {

        ticketSummary.textContent =
            `${selectedTicket.name} selected - choose ticket amount`;

    }

    ticketSummary.hidden = false;

}


// ticket selection

function selectTicket(button) {

    /* get ticket information from html */

    const ticketName = button.dataset.ticket;
    const ticketPrice = Number(button.dataset.price);

    /* determine whether this is a week pass */

    const isWeekPass = ticketName.includes("Week Pass");


    /* store ticket as an object */

    selectedTicket = {
        name: ticketName,
        price: ticketPrice,
        isWeekPass: isWeekPass
    };


    /* highlight selected ticket */

    ticketOptions.forEach(function(option) {

        if (option === button) {

            option.setAttribute("aria-pressed", "true");

        } else {

            option.setAttribute("aria-pressed", "false");

        }

    });


    /* decide whether the visitor needs a date */

    if (selectedTicket.isWeekPass) {

        /* week passes automatically cover all dates */

        selectedDate = "5-8 October 2026";

        showBookingStage("amount");

    } else {

        /* day passes require a selected date */

        selectedDate = "";
        ticketDate.value = "";

        showBookingStage("date");

    }


    /* keep quantity synchronized with dropdown */

    ticketQuantity = Number(ticketAmount.value) || 0;

    updateTicketSummary();

}


/* add listeners to all ticket buttons */

ticketOptions.forEach(function(button) {

    button.addEventListener("click", function() {

        selectTicket(button);

    });

});


// quantity and price calculation

ticketAmount.addEventListener("change", function() {

    const amount = Number(ticketAmount.value);

    if (
        Number.isInteger(amount) &&
        amount >= 1 &&
        amount <= 5
    ) {

        ticketQuantity = amount;

    } else {

        ticketQuantity = 0;

    }

    updateTicketSummary();

});


// validation errors

function showBookingError(message) {

    stepError.textContent = message;
    stepError.hidden = false;

}


// booking form submission

bookingForm.addEventListener("submit", function(event) {

    /* prevent browser page reload */

    event.preventDefault();


    /* stage 1: choose a date for day passes */

    if (currentBookingStage === "date") {

        if (ticketDate.value === "") {

            showBookingError("Please select a convention date.");
            return;

        }

        /* save the selected date label */

        selectedDate =
            ticketDate.options[ticketDate.selectedIndex].textContent.trim();

        updateTicketSummary();

        showBookingStage("amount");


    /* stage 2: validate ticket quantity */

    } else if (currentBookingStage === "amount") {

        const amount = Number(ticketAmount.value);

        if (
            selectedTicket === null ||
            !Number.isInteger(amount) ||
            amount < 1 ||
            amount > 5
        ) {

            showBookingError("Please select between 1 and 5 tickets.");
            return;

        }

        ticketQuantity = amount;

        updateTicketSummary();

        showBookingStage("email");


    /* stage 3: validate email */

    } else if (currentBookingStage === "email") {

        const email = customerEmail.value.trim();

        if (email === "" || !customerEmail.checkValidity()) {

            showBookingError("Please enter a valid email address.");
            return;

        }

        showBookingStage("name");


    /* stage 4: validate full name */

    } else if (currentBookingStage === "name") {

        const fullName = customerName.value.trim();

        if (fullName.length < 2) {

            showBookingError("Please enter your full name.");
            return;

        }

        updateTicketSummary();

        showBookingStage("summary");


    /* stage 5: confirm booking */

    } else if (currentBookingStage === "summary") {

        if (
            selectedTicket === null ||
            selectedDate === "" ||
            ticketQuantity < 1 ||
            ticketQuantity > 5
        ) {

            showBookingError("Your booking details are incomplete.");
            return;

        }


        /* calculate final price */

        const totalPrice =
            selectedTicket.price * ticketQuantity;


        /* create confirmation message */

        successRecap.textContent =
            `Order Confirmed! ${customerName.value.trim()}, ` +
            `you booked ${ticketQuantity} x ${selectedTicket.name} ` +
            `for GamingCon 2026 (${selectedDate}). ` +
            `Total: ${totalPrice.toLocaleString("nb-NO")} NOK.`;


        /* replace both cards with confirmation */

        homeView.hidden = true;
        successView.hidden = false;

        successView.querySelector("h1").focus();

    }

});


/* ==========================================
   start a new booking
========================================== */

newBookingButton.addEventListener("click", function() {

    /* reset form fields */

    bookingForm.reset();


    /* reset booking variables */

    selectedTicket = null;
    selectedDate = "";
    ticketQuantity = 0;


    /* remove selected ticket highlights */

    ticketOptions.forEach(function(button) {

        button.setAttribute("aria-pressed", "false");

    });


    /* hide previous selection */

    ticketSummary.hidden = true;


    /* reset summary information */

    summaryEvent.textContent = "GamingCon 2026";
    summaryDate.textContent = "—";
    summaryTicket.textContent = "—";
    summaryQuantity.textContent = "—";
    summaryTotal.textContent = "0 NOK";


    /* reset form stage */

    showBookingStage("prompt");


    /* restore homepage */

    showHome();

});


// newsletter signup

// select newsletter elements

const newsletterForm = document.querySelector("#newsletter-form");
const newsletterEmail = document.querySelector("#newsletter-email");
const newsletterSubmit = document.querySelector("#newsletter-submit");
const newsletterSuccess = document.querySelector("#newsletter-success");

// handle newsletter signup

newsletterForm.addEventListener("submit", function(event) {

    // prevent page reload

    event.preventDefault();

    // validate email address

    if (!newsletterEmail.checkValidity()) {

        newsletterEmail.reportValidity();
        return;
    }

    // hide email field and button

    newsletterEmail.hidden= true;
    newsletterSubmit.hidden = true;

    // display confirmation with checkmark

    newsletterSuccess.hidden = false;

    // add success styling

    newsletterForm.classList.add("is-subscribed");
});
