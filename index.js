document.addEventListener("DOMContentLoaded", () => {
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
  const percentageArray = [5, 10, 15, 20, 25];

  function render() {
    if (isBill && isPeople && isPercentage) {
      let amountValue = ((billAmount / 100) * percentage) / peopleAmount;

      amountPerPerson.textContent = `\$${amountValue.toFixed(2)}`;
      totalPerPerson.textContent = `\$${(
        billAmount / peopleAmount +
        amountValue
      ).toFixed(2)}`;
      reset();
    }
  }

  function reset() {
    resets.style.backgroundColor = "cyan";
    resets.addEventListener("click", () => {
      resets.style.backgroundColor = "";
      bill.value = "";
      people.value = "";
      amountPerPerson = "$0.00";
      totalPerPerson = "$0.00";
    });
  }

  bill.addEventListener("focus", () => {
    bill.classList.add("success");
  });

  bill.addEventListener("blur", () => {
    if (bill.value > 0) {
      errorMessage.textContent = "";
      bill.classList.remove("error");
      bill.classList.add("success");
      bill.style.borderColor = "green";
      isBill = true;
      billAmount = bill.value;
      parseFloat(billAmount);
      console.log(billAmount);
    } else {
      bill.classList.add("error");
      bill.style.borderColor = "red";
      errorMessage.textContent = "Can't be zero";
    }
    render();
  });

  people.addEventListener("focus", () => {
    people.classList.add("success");
  });

  people.addEventListener("blur", () => {
    if (people.value > 0) {
      errorMessage2.textContent = "";
      people.classList.remove("error");
      people.classList.add("success");
      people.style.borderColor = "green";
      isPeople = true;
      peopleAmount = people.value;
      parseFloat(peopleAmount);
      console.log(peopleAmount);
    } else {
      people.classList.add("error");
      people.style.borderColor = "red";
      errorMessage2.textContent = "Can't be zero";
    }
    render();
  });

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      percentageArray.forEach((value, index) => {
        if (radio.checked && radio.id === `${value}`) {
          isPercentage = true;
          percentage = value;
          console.log(percentage);
        }
      });
    });
    render();
  });

  customPercentage.addEventListener("focus", () => {
    customPercentage.classList.add("success");
  });

  custom.addEventListener("click", function () {
    customContainer.style.display = "none";
    customPercentage.style.display = "block";
  });

  customPercentage.addEventListener("blur", () => {
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
