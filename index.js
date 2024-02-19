let selectedSeats = [];
let seatsContainer = document.getElementById("selected-container");
let selectedCount = document.getElementById("selected-count");
let totalPrice = document.getElementById("total-price");
let discountedAmount = document.getElementById("discounted-amount");
let grandTotal = document.getElementById("grand-total");
let discountButton = document.getElementById("discount-apply-button");
let discountInput = document.getElementById("discount-input");
let nextButton = document.getElementById("next-button");
let phoneNumberInput = document.getElementById("phone-number-input");
let seatLeftCounter = document.getElementById("seats-left-counter");
let discountRate = 1;

function scrollToSeatSelection() {
  var seatSelectionSection = document.getElementById("seats-section");
  seatSelectionSection.scrollIntoView({ behavior: "smooth" });
}

function checkNextButton() {
  if (selectedSeats.length > 0 && phoneNumberInput.value !== "") {
    nextButton.classList.remove("btn-disabled");
  } else {
    nextButton.classList.add("btn-disabled");
  }
}

function phoneNumberCheck(number) {
  checkNextButton();
}

// ASSIGNING FUNCTION TO BUTTONS
document.querySelectorAll(".seat-button").forEach((button) => {
  button.addEventListener("click", function () {
    checkNextButton();
    if (selectedSeats.includes(button.innerText)) {
      // IF ALREADY SELECTED ( DESELECTION )
      button.classList.remove("bg-[#1DD100]");
      button.classList.remove("hover:bg-[#199603]");
      button.classList.remove("text-white");
      selectedSeats = selectedSeats.filter((item) => item !== button.innerText);
    } else {
      // IF NOT SELECTED ( SELECTION )
      if (selectedSeats.length <= 3) {
        selectedSeats.push(button.innerText);
        button.classList.add("bg-[#1DD100]");
        button.classList.add("hover:bg-[#199603]");
        button.classList.add("text-white");
      } else {
        alert("Maximum Seats Selected!");
      }
    }
    refreshUI();
  });
});

// REFRESH ELEMENTS
function refreshUI() {
  seatLeftCounter.innerText = 40 - selectedSeats.length;
  seatsContainer.innerHTML = "";
  selectedSeats.forEach((seat) => {
    const seatNumberElement = document.createElement("h1");
    seatNumberElement.textContent = seat;

    const classElement = document.createElement("h1");
    classElement.textContent = "Economy";

    const priceElement = document.createElement("h1");
    priceElement.textContent = 550;
    priceElement.classList.add("flex");
    priceElement.classList.add("justify-end");

    // Append elements to seatsContainer
    seatsContainer.appendChild(seatNumberElement);
    seatsContainer.appendChild(classElement);
    seatsContainer.appendChild(priceElement);
  });

  checkNextButton();

  if (selectedSeats.length > 3) {
    discountInput.removeAttribute("disabled");
    discountButton.classList.remove("btn-disabled");
  } else {
    discountInput.setAttribute("disabled", true);
    discountButton.classList.add("btn-disabled");
    discountRate = 1;
  }

  selectedCount.innerText = selectedSeats.length;
  totalPrice.innerText = selectedSeats.length * 550;

  if (discountRate !== 1) {
    document
      .getElementById("discounted-amount-container")
      .classList.remove("opacity-0");
  } else {
    document
      .getElementById("discounted-amount-container")
      .classList.add("opacity-0");
  }

  discountedAmount.innerText = parseInt(
    selectedSeats.length * 550 * (1 - discountRate)
  );
  grandTotal.innerText = parseInt(selectedSeats.length * 550 * discountRate);
}

discountButton.addEventListener("click", () => {
  if (discountInput.value === "NEW15") {
    discountRate = 0.85;
  } else if (discountInput.value === "Couple 20") {
    discountRate = 0.8;
  } else {
    discountRate = 1;
    alert("Invalid Coupon Code");
  }
  refreshUI();
});
