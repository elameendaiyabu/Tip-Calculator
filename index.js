// // Wait for the DOM content to be fully loaded before executing JavaScript
// document.addEventListener("DOMContentLoaded", function () {
//   // Selecting elements
//   const billInput = document.getElementById("bill-amount");
//   const peopleInput = document.getElementById("people-amount");
//   const tipButtons = document.querySelectorAll(".selectable");
//   const amountPerPerson = document.getElementById("amount-per-person");
//   const totalPerPerson = document.getElementById("total-per-person");

//   // Function to calculate tip and total per person
//   function calculateTipAndTotal() {
//     // Get bill amount and number of people
//     const billAmount = parseFloat(billInput.value) || 0;
//     const numOfPeople = parseInt(peopleInput.value) || 0;

//     // Get selected tip percentage
//     let tipPercentage = 0;
//     tipButtons.forEach((button) => {
//       if (button.classList.contains("active")) {
//         tipPercentage = parseFloat(button.textContent.replace("%", ""));
//       }
//     });

//     // Calculate tip amount per person
//     const tipPerPerson =
//       (billAmount * (tipPercentage / 100)) / numOfPeople || 0;

//     // Calculate total per person
//     const totalPerPersonValue = billAmount / numOfPeople + tipPerPerson || 0;

//     // Update displayed values
//     amountPerPerson.textContent = `$${tipPerPerson.toFixed(2)}`;
//     totalPerPerson.textContent = `$${totalPerPersonValue.toFixed(2)}`;
//   }

//   // Event listeners for bill amount and number of people inputs
//   billInput.addEventListener("input", calculateTipAndTotal);
//   peopleInput.addEventListener("input", calculateTipAndTotal);

//   // Event listener for tip buttons
//   tipButtons.forEach((button) => {
//     button.addEventListener("click", function () {
//       // Remove 'active' class from all buttons
//       tipButtons.forEach((btn) => btn.classList.remove("active"));
//       // Add 'active' class to the clicked button
//       button.classList.add("active");
//       // Recalculate tip and total
//       calculateTipAndTotal();
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const billInput = document.getElementById("bill-amount");
  const peopleInput = document.getElementById("people-amount");
  const tipButtons = document.querySelectorAll(".selectable");
  const resetButton = document.getElementById("reset");
  const amountPerPerson = document.getElementById("amount-per-person");
  const totalPerPerson = document.getElementById("total-per-person");

  function calculateTipAndTotal() {
    const billAmount = parseFloat(billInput.value) || 0;
    const numOfPeople = parseInt(peopleInput.value) || 0;

    let tipPercentage = 0;
    tipButtons.forEach((button) => {
      if (button.classList.contains("active")) {
        tipPercentage = parseFloat(button.textContent.replace("%", ""));
      }
    });

    // Check if all necessary inputs are provided and not NaN
    if (
      billAmount !== 0 &&
      numOfPeople !== 0 &&
      tipPercentage !== 0 &&
      !isNaN(billAmount) &&
      !isNaN(numOfPeople) &&
      !isNaN(tipPercentage)
    ) {
      const tipPerPerson = (billAmount * (tipPercentage / 100)) / numOfPeople;
      const totalPerPersonValue = billAmount / numOfPeople + tipPerPerson;

      amountPerPerson.textContent = `$${tipPerPerson.toFixed(2)}`;
      totalPerPerson.textContent = `$${totalPerPersonValue.toFixed(2)}`;
      resetButton.classList.remove("disabled");
      resetButton.removeAttribute("disabled");
    } else {
      amountPerPerson.textContent = "$0.00";
      totalPerPerson.textContent = "$0.00";
      resetButton.classList.add("disabled");
      resetButton.setAttribute("disabled", "disabled");
    }
  }

  billInput.addEventListener("input", function () {
    if (peopleInput.value) {
      calculateTipAndTotal();
    }
  });

  peopleInput.addEventListener("input", function () {
    if (billInput.value) {
      calculateTipAndTotal();
    }
  });

  tipButtons.forEach((button) => {
    button.addEventListener("click", function () {
      tipButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      calculateTipAndTotal();
    });
  });

  resetButton.addEventListener("click", function () {
    billInput.value = "";
    peopleInput.value = "";
    tipButtons.forEach((button) => button.classList.remove("active"));
    calculateTipAndTotal();
  });

  resetButton.classList.add("disabled");
  resetButton.setAttribute("disabled", "disabled");

  billInput.setAttribute("required", "required");
  peopleInput.setAttribute("required", "required");
});

const custom = document.getElementById("custom");
const customNumber = document.getElementById("custom-number");

custom.addEventListener("click", function () {
  custom.style.display = "none";
  customNumber.style.display = "block";
});
