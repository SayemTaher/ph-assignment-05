function getElementById(elementId) {
  return document.getElementById(elementId);
}

function setBackgroundColor(element) {
  element.classList.add("bg-green-400", "text-white");
}

function getTextElementValueById(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementValueText = element.innerText;
    const value = parseInt(elementValueText);
    return value;
  }
}

function setTextElementValueById(elementId, value) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerText = value;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("passenger-name");
  const phoneInput = document.getElementById("phoneInput");
  const nextButton = document.getElementById("submit-btn");
  const modalButton = document.getElementById("modal-btn");

  modalButton.addEventListener("click", function () {
    window.location.reload();
  });

  // Function to enable/disable button based on input fields
  function checkInputs() {
    if (nameInput.value.trim() !== "" && phoneInput.value.trim() !== "") {
      nextButton.disabled = false;
    } else {
      nextButton.disabled = true;
    }
  }

  // Event listeners for input fields
  nameInput.addEventListener("input", checkInputs);
  phoneInput.addEventListener("input", checkInputs);

  let couponField = getElementById("coupon-input-field");
  let couponButton = getElementById("coupon-input-button");

  const seatIds = [
    "a1",
    "b1",
    "c1",
    "d1",
    "e1",
    "f1",
    "g1",
    "h1",
    "i1",
    "j1",
    "a2",
    "b2",
    "c2",
    "d2",
    "e2",
    "f2",
    "g2",
    "h2",
    "i2",
    "j2",
    "a3",
    "b3",
    "c3",
    "d3",
    "e3",
    "f3",
    "g3",
    "h3",
    "i3",
    "j3",
    "a4",
    "b4",
    "c4",
    "d4",
    "e4",
    "f4",
    "g4",
    "h4",
    "i4",
    "j4",
  ];

  let numberOfChosenSeats = [];
  let seatsChosen = 0;

  function clickOnSeatEvent(event) {
    if (seatsChosen === 4) {
      couponField.disabled = false;
      couponButton.disabled = false;
      alert("You have already selected the maximum number of seats.");
      return;
    }

    const seatId = event.target.id;
    const seatElement = getElementById(seatId);

    if (!numberOfChosenSeats.includes(seatId)) {
      setBackgroundColor(seatElement);
      numberOfChosenSeats.push(seatId);

      const totalAvailableSeat = getTextElementValueById("total-seat-number");
      const remainingSeat = totalAvailableSeat - 1;
      setTextElementValueById("total-seat-number", remainingSeat);

      const ticketPrice = 550;
      let totalPrice = getTextElementValueById("total-price");

      let discount = 0;
      const coupon1 = "NEW15";
      const coupon2 = "Couple 20";
      if (couponField.value === coupon1) {
        discount = 15;
      } else if (couponField.value === coupon2) {
        
          discount = 20;
        
      }
      

      totalPrice += ticketPrice - (ticketPrice * discount) / 100;

      let grandTotal = getTextElementValueById("total-after-discount");
      grandTotal += totalPrice;

      let numberOfSelectedSeats = getTextElementValueById(
        "number-of-selected-seats"
      );
      numberOfSelectedSeats++;

      let ticketDetails = document.getElementById("ticket-details");
      if (ticketDetails) {
        let seatDiv = document.createElement("div");
        seatDiv.classList.add("selected-seat", "flex", "justify-between");

        let seatSpan = document.createElement("span");
        seatSpan.textContent = seatId.toUpperCase();
        seatDiv.appendChild(seatSpan);

        let typeSpan = document.createElement("span");
        typeSpan.textContent = "Economy";
        seatDiv.appendChild(typeSpan);

        let priceSpan = document.createElement("span");
        priceSpan.textContent = ticketPrice;
        seatDiv.appendChild(priceSpan);

        ticketDetails.appendChild(seatDiv);
      } else {
        console.error("Ticket details element not found.");
      }

      setTextElementValueById(
        "number-of-selected-seats",
        numberOfSelectedSeats
      );
      setTextElementValueById("total-price", totalPrice);
      setTextElementValueById("total-after-discount", grandTotal);

      seatsChosen++;
    }
  }

  seatIds.forEach((seat) => {
    getElementById(seat).addEventListener("click", clickOnSeatEvent);
  });

  couponButton.addEventListener("click", function () {
    const coupon1 = "NEW15";
    const coupon2 = "Couple 20";
    let totalPrice = parseFloat(getTextElementValueById("total-price")); 
    let discount = 0;

    const enteredCoupon = couponField.value.trim(); 

    if (enteredCoupon === coupon1) {
      discount = 15;
    } else if (enteredCoupon === coupon2) {
      discount = 20;
    } else if (enteredCoupon === "Couple20") {
        alert("Invalid Coupon Code");
      return; 
    } else {
      alert("Invalid coupon code.");
      return; 
    }

    const discountedAmount = (totalPrice * discount) / 100;
    const discountedPrice = totalPrice - discountedAmount;

    const discountedPriceElement = getElementById("discounted-price");
    const showDiscount = getElementById("display-discount");
    showDiscount.classList.remove("hidden");
    setTextElementValueById("discounted-price", discountedPrice);

    couponField.value = "";

    couponField.disabled = true;
    couponButton.disabled = true;

    setTextElementValueById("total-price", totalPrice);
    setTextElementValueById("discounted-price", discountedPrice);
  });

});
