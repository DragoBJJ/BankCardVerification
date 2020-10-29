class checkCardNumber {
  constructor(cardNumber) {
    if (cardNumber.length !== 0 && !parseInt(cardNumber)) {
      alert("It is not a numeric typey");
      return;
    } else if (cardNumber.length == "") {
      alert("Enter data");
      return;
    }
    this.cardNumber = cardNumber;
    this.preparedNumber = this.prepareToValidate(this.cardNumber);
    this.numberChecked = this.checkLuhnAlgorithm(this.preparedNumber);

    if (this.numberChecked) {
      const cardCompany = this.checkCardCompany(this.cardNumber);
      const { result, nameCompany } = cardCompany;
      if (result) {
        alert(`Your card is ${cardsData[nameCompany].name}`);
        return;
      } else {
        alert("We don't have your card in the database");
        return;
      }
    } else {
      alert("The card has not been properly verified");
      return;
    }
  }
  prepareToValidate = number => {
    const numberArray = number.match(/[0-9]/g).reverse();
    return numberArray;
  };
  checkLuhnAlgorithm = numberArray => {
    let result = 0;
    numberArray.forEach((number, index) => {
      let digit = parseInt(number);
      if (index % 2) {
        const valueMultiplied = digit * 2;
        result +=
          valueMultiplied < 10
            ? valueMultiplied
            : this.greaterThanTen(valueMultiplied);
      } else {
        result += digit;
      }
    });
    return result % 10 === 0 ? true : false;
  };
  greaterThanTen = number => {
    let separateDigits = String(number).split("");
    return separateDigits.reduce((total, next) => total + parseInt(next), 0);
  };
  checkCardCompany = cardNumber => {
    let result;
    let nameCompany = "";

    for (let company of Object.keys(cardsData)) {
      const companyLengths = this.checkLength(cardNumber, company);
      const beginNumbers = this.checkBeginNumber(cardNumber, company);

      if (companyLengths && beginNumbers) {
        result = true;
        nameCompany = company;
      }
    }

    return { result, nameCompany };
  };

  checkLength = (cardNumber, company) => {
    let result = false;
    for (let length of cardsData[company].lengths) {
      if (cardNumber.length === length) {
        result = true;
        break;
      }
    }
    return result;
  };
  checkBeginNumber = (cardNumber, company) => {
    let result = false;
    for (let beginNumber of cardsData[company].beginings) {
      if (cardNumber.startsWith(beginNumber)) {
        result = true;
        break;
      }
    }
    return result;
  };
}
