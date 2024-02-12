document.addEventListener("DOMContentLoaded", () => {
  //DOM elements assignments and variables definitin
  const bill = document.getElementById("bill-value");
  const people = document.getElementById("people-value");
  const errorMessage = document.getElementById("error-message");
  const errorMessage2 = document.getElementById("error-message2");
  const radios = document.querySelectorAll("input[type='radio']");
  const custom = document.getElementById("custom");
  const amountPerPerson = document.getElementById("total-amount");
  const totalPerPerson = document.getElementById("total-person");
  const customContainer = document.getElementById("custom-container");
  const customPercentage = document.getElementById("custom-input");
  const resets = document.getElementById("reset");
  let billAmount;
  let peopleAmount;
  let percentage;
  let customPercentageAmount;
  let isBill = false;
  let isPeople = false;
  let isPercentage = false;

  //An array containing my percentages values which gets linked to the radio button percentages.
  //Value has to match the id of each respective radio button
  const percentageArray = [5, 10, 15, 20, 25];

  //function that renders the amount per person and total per person
  function render() {
    if (isBill && isPeople && isPercentage) {
      let amountValue = ((billAmount / 100) * percentage) / peopleAmount;

      amountPerPerson.textContent = `\$${amountValue.toFixed(1)}`;
      totalPerPerson.textContent = `\$${(
        billAmount / peopleAmount +
        amountValue
      ).toFixed(1)}`;
      reset();
    }
  }

  //function that enables the reset button and changes everything to default
  function reset() {
    resets.style.backgroundColor = "cyan";
    resets.addEventListener("click", () => {
      resets.style.backgroundColor = "";
      isBill = false;
      isPeople = false;
      isPercentage = false;
      percentage = "";
      customPercentageAmount = "";
      bill.value = "";
      people.value = "";
      amountPerPerson.textContent = "$0.00";
      totalPerPerson.textContent = "$0.00";
      customContainer.style.display = "block";
      customPercentage.style.display = "none";
    });
  }

  //Adds the success class to the input field when the input field is focused.
  bill.addEventListener("focus", () => {
    bill.classList.add("success");
  });

  //Event listener for the bill input field. if > 0, border changes to green else it is red. Also gets the bill amount.
  //If bill amount is 0, it will display an error message.
  bill.addEventListener("keyup", () => {
    if (bill.value > 0) {
      errorMessage.textContent = "";
      bill.classList.remove("error");
      bill.classList.add("success");
      bill.style.borderColor = "green";
      isBill = true;
      billAmount = bill.value;
      parseFloat(billAmount);
    } else {
      bill.classList.add("error");
      bill.style.borderColor = "red";
      errorMessage.textContent = "Can't be zero";
    }
    render();
  });

  //Adds the success class to the input field when the input field is focused.
  people.addEventListener("focus", () => {
    people.classList.add("success");
  });

  //Event listener for the people input field. if > 0, border changes to green else it is red. Also gets the people amount.
  //If people amount is 0, it will display an error message.
  people.addEventListener("keyup", () => {
    if (people.value > 0) {
      errorMessage2.textContent = "";
      people.classList.remove("error");
      people.classList.add("success");
      people.style.borderColor = "green";
      isPeople = true;
      peopleAmount = people.value;
      parseFloat(peopleAmount);
    } else {
      people.classList.add("error");
      people.style.borderColor = "red";
      errorMessage2.textContent = "Can't be zero";
    }
    render();
  });

  //Gets the percentage value from the radio buttons.
  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      percentageArray.forEach((value, index) => {
        if (radio.checked && radio.id === `${value}`) {
          isPercentage = true;
          percentage = value;
        }
      });
      render();
    });
  });

  //Adds the success class to the custom input field when the input field is focused.
  customPercentage.addEventListener("focus", () => {
    customPercentage.classList.add("success");
  });

  //Event click listener to the custom button. It hides the custom buttton and shows the custom percentage input field.
  custom.addEventListener("click", function () {
    customContainer.style.display = "none";
    customPercentage.style.display = "block";
    radios.checked = "";
  });

  //Event listener for the custom percentage input field. if > 0, border changes to green else it is red.
  //Also gets the custom percentage amount.
  customPercentage.addEventListener("keyup", () => {
    if (customPercentage.value > 0) {
      errorMessage2.textContent = "";
      customPercentage.classList.remove("error");
      customPercentage.classList.add("success");
      customPercentage.style.borderColor = "green";
      customPercentageAmount = parseFloat(customPercentage.value);
      percentage = customPercentageAmount;
      isPercentage = true;
      render();
    } else {
      customPercentage.classList.add("error");
      customPercentage.style.borderColor = "red";
    }
  });
});
