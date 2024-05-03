let gross_income = document.getElementById("gross-income");
let extra_income = document.getElementById("extra-income");
let age = document.getElementById("age");
let total_deductions = document.getElementById("total-deductions");
let totalIncome = document.getElementById("total-income");
let submit = document.getElementById("submit");
let close = document.getElementById("close");
let startingLine=document.getElementById("starting-line");
let endingLine=document.getElementById("ending-line");
let errorIconPos = Array.from(document.getElementsByClassName("error-icon-pos"))
let cautionText = Array.from(document.getElementsByClassName("caution-text"))
let errorIconBox = Array.from(document.getElementsByClassName("error-icon-box"))
let infoIcon = Array.from(document.getElementsByClassName("info-icon"))
let infoText = Array.from(document.getElementsByClassName("info-text"))
let infoBox = Array.from(document.getElementsByClassName("info-box"))

infoIcon[0].addEventListener('mouseover',() => {
    infoText[0].style.opacity=1;
})
infoIcon[0].addEventListener('mouseout',() => {
    infoText[0].style.opacity=0;
})

infoIcon[1].addEventListener('mouseover',() => {
    infoText[1].style.opacity=1;
})
infoIcon[1].addEventListener('mouseout',() => {
    infoText[1].style.opacity=0;
})

infoIcon[2].addEventListener('mouseover',() => {
    infoText[2].style.opacity=1;
})
infoIcon[2].addEventListener('mouseout',() => {
    infoText[2].style.opacity=0;
})

infoIcon[3].addEventListener('mouseover',() => {
    infoText[3].style.opacity=1;
})
infoIcon[3].addEventListener('mouseout',() => {
    infoText[3].style.opacity=0;
})

const calculateTax = () => {
    let flag=0;
    for(element=0;element<4;element++)
    {
        if(errorIconPos[element].style.opacity === "1")
        {
            flag++;
            break;
        }
    }
        
    if(flag == 0)
    {
        errorIconPos.forEach((e) => {
            e.style.opacity=0
        })
        let tax = 0;
        let grossIncome = parseInt(gross_income.value);
        let extraIncome = parseInt(extra_income.value);
        let Age = parseInt(age.value);
        let totalDeductions = parseInt(total_deductions.value);
        if (grossIncome + extraIncome - totalDeductions <= 800000) {
            tax=0;
        } else {
            if (Age < 40) {
            tax = 0.3 * (grossIncome + extraIncome - totalDeductions - 800000);
            } else if (Age >= 40 && Age < 60) {
            tax = 0.4 * (grossIncome + extraIncome - totalDeductions - 800000);
            } else {
            console.log(typeof parseInt(age.value));
            tax = 0.1 * (grossIncome + extraIncome - totalDeductions - 800000);
            }
        }
        let income=(grossIncome + extraIncome - totalDeductions - tax).toString()
        if(income.length > 3)
        {
            let finalIncome=""
            finalIncome = ","+income[income.length-3]+income[income.length-2]+income[income.length-1]+finalIncome
            let i=income.length-4;
            let temp=0;
            while(i>=0)
            {
                finalIncome = income[i]+finalIncome;
                i--;
                temp++;
                if(temp == 2 && i>=0)
                {
                    finalIncome = ","+finalIncome
                    temp=0;
                }
            }
            totalIncome.innerText = "Rs. "+finalIncome
        }
        else
        {
            totalIncome.innerText = "Rs. "+income
        }
        document.getElementById("submit-div").classList.toggle('hidden')
        startingLine.innerText = "Your overall annual income will be"
        endingLine.innerText = "after tax deductions"
    } 
};

const detailsNotFilled = ()=>{
    let arr = [gross_income,extra_income,age,total_deductions]
    let flag=0
    for(element=0;element<4;element++)
    {
        if(arr[element].value.length === 0)
        {
            cautionText[element].innerText = "Please fill this column"
            errorIconBox[element].style.marginTop = "5rem"
            errorIconPos[element].style.opacity=1;
            flag++;
        }
    }
    return flag != 0;
}

const validInput = (element,i)=>{
    let n=element.value.length
    if(element.value[n-1] < '0' || element.value[n-1] > '9')
    {
        cautionText[i].innerText = "Please enter numbers only"
        errorIconBox[i].style.marginTop = "3.8rem"
        errorIconPos[i].style.opacity=1;
    }
    else
    {
        errorIconPos[i].style.opacity=0;
    }
}

gross_income.addEventListener("input",() => {
    validInput(gross_income,0)
})

extra_income.addEventListener("input",() => {
    validInput(extra_income,1)
})

age.addEventListener("input",() => {
    validInput(age,2)
})

total_deductions.addEventListener("input",() => {
    validInput(total_deductions,3)
})

submit.addEventListener("click", () => {
    
    let res = detailsNotFilled()
    if(!res)
    {
        calculateTax();
    }   
})

close.addEventListener("click", () => {
    document.getElementById("submit-div").classList.toggle('hidden')
})