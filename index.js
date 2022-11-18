const display = document.getElementById('display')
const displayText = document.getElementById('display').textContent
const equalSign = document.getElementById('equal')
const backspace = document.getElementById('backspace')
const cleanDisplay = document.getElementById('clean')
const percentSign = document.getElementById('perc')
const comma = document.getElementById('comma')
const nums = document.querySelectorAll("[id*=num]")
const mathOperators = document.querySelectorAll("[id*=sign]")

let num = true
let op
let prevNum
let actualNum
let temp
let endCalculation = false

const getDisplayText = text => {

  if (num) {
    display.textContent = text
    num = false
  } else {
    display.textContent += text
  }
  display.textContent = display.textContent.substring(0, 17)
  actualNum = display.textContent
  temp = true
}
const getNum = e => getDisplayText(e.target.textContent)

if (endCalculation == false) {
  nums.forEach(e => e.addEventListener('click', getNum))
}
const changeComma = () => display.textContent = display.textContent.replace('.', ',')
const getOperator = e => {
  num = true
  op = e.target.textContent
  if (op == 'x') {
    op = '*'
  } else if (op == '÷') {
    op = '/'
  }
  prevNum = display.textContent
}
mathOperators.forEach(e => e.addEventListener('click', getOperator))

const getCalculation = () => {

  if (prevNum && op) {
    let result = prevNum + op

    if(actualNum) {
      result += actualNum
    } else {
      result += prevNum
    }
    if (display.textContent == 'NaN') {
      display.textContent = '0'
    }
    display.textContent = eval(result.replace(',', '.'))
    changeComma()
    

    prevNum = display.textContent
    num = true
    temp = false
  }
}
equalSign.addEventListener('click', getCalculation)

const getClean = () => {
  display.textContent = '0'
  prevNum = '0'
  actualNum = '0'
  num = true
}
cleanDisplay.addEventListener('click', getClean)

const GetCleanLast = () => {
  if (temp) {
    if (display.textContent.length > 1) {
      display.textContent = display.textContent.slice(0, -1)
    } else {
      display.textContent = 0
    }    
    num = true
  }
}
backspace.addEventListener('click', GetCleanLast)

const getPerceint = () => {
  display.textContent = parseFloat(display.textContent.replace(',', '.')) / 100
  changeComma();
  numeroAtual = display.textContent
  primeiro = true
}

percentSign.addEventListener('click', getPerceint)

