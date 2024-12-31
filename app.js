// const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');


for(let select of dropdowns){
    for(let code in countryList){
        let newOption = document.createElement('option');
        newOption.innerText = code;
        newOption.value = code;
        if(select.name === "from" && code === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && code === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener('change', (evt)=>{
        updateFlag(evt.target);
    })
    // console.log(select);
}

const updateFlag = (element) =>{
    console.log(element);
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}

btn.addEventListener('click',async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector('.amount input');
    let amountVal = amount.value;
    if(amountVal === "" || amountVal < 0 ){
        amountVal = 1;
        amount.value = "1";
    }
    // console.log(amountVal);
    // console.log(fromCurr, toCurr);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    // console.log(URL);
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[`${fromCurr.value.toLowerCase()}`][`${toCurr.value.toLowerCase()}`];
    // console.log(rate);
    let totalAmt = rate*amountVal;
    totalAmt = totalAmt.toFixed(2);
    msg.innerText = `${amountVal} ${fromCurr.value} =  ${totalAmt} ${toCurr.value}`;
    // console.log(data);
})