const showCountries = document.querySelectorAll("select")
const theExchangeIcon = document.getElementById("converting-icon")
const fromCurrency = document.querySelector(".from-container select")
const toCurrency = document.querySelector(".to-container select")
const form = document.getElementById("form")
const amount = document.getElementById("enterAmount")
let myApiKey = "a9070d4b78a6b148747c2c38"



showCountries.forEach((countrySelect, index) => {
    for (const currencyCode in myCountry) {
    //   console.log(currencyCode);
    
    // Let create our option tag using DOM and append it to countryselect; which add the option to the select dropdown.

    const option = document.createElement("option");
    option.value = currencyCode;
    option.textContent = currencyCode;

    // selecting USD and DOP as default for From and To currency.

    let selected = "selected";

    if (index === 0 && currencyCode === "USD") {
        option.setAttribute("selected", selected);
      } else if (index === 1 && currencyCode === "DOP") {
        option.setAttribute("selected", selected);
      }
  
      countrySelect.appendChild(option);

    }

    showCountries[index].addEventListener("change", e => {
        loadTheFlag(e.target);
    })
});



loadTheFlag = (element) => {
    for(code in myCountry){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img")
            imgTag.src = `https://flagsapi.com/${myCountry[code]}/flat/64.png`
        }
    }
}


window.addEventListener("load", () =>{
    getExchangeRate();
} );

form.addEventListener("submit", (event) =>{
    event.preventDefault();
    getExchangeRate();
} );


theExchangeIcon.addEventListener("click", () => {
    let saveFromCurrencyCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = saveFromCurrencyCode;
    loadTheFlag(fromCurrency)
    loadTheFlag(toCurrency)
    getExchangeRate()
})



getExchangeRate = () => {
    exchangeDisplayText = document.getElementById("exchange-display")
    let amountValue = amount.value;
    // If user dont enter any value or enter 0 then we automatically make it 1
    if(amountValue == " " || amountValue == "0"){
        amount.value = "1"
        amountValue = 1
    }
    // amountValue == " " || amountValue == "0" ? amount.value = "1" : " ";

    exchangeDisplayText.innerHTML = "<p>Getting exchange rate...</p>"
    
    let url = `https://v6.exchangerate-api.com/v6/${myApiKey}/latest/${fromCurrency.value}`;

    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        // Process the fetched data (exchange rates) here
        let exchangeRate = data.conversion_rates[toCurrency.value];
        let myTotalExchangeConvert = (amountValue *  exchangeRate).toFixed(2);
        // console.log(myTotalExchangeConvert); 
        exchangeDisplayText.innerHTML = `<p>${amountValue} ${fromCurrency.value} = ${myTotalExchangeConvert} ${toCurrency.value}</p>`;
      }).catch(() => {
         exchangeDisplayText.textContent = "Data couldnt load..."
      })

    
}



