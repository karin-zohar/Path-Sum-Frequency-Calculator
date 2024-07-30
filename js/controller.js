import { pathService } from "../services/path.service.js"
window.onload = onInit

function onInit() {
    console.log('hello world')
    addListeners()
}

function addListeners() {
    console.log('adding listeners')
    const elInputForm = document.getElementById('input-form')
    elInputForm.addEventListener('submit', onSubmitForm)
}

function onSubmitForm(event) {
    console.log('submitted')
    event.preventDefault()
    const elInput = document.getElementById('paste-input') 
    const rawInput = getInput(elInput)
    pathService.formatInput(rawInput)
    const elOutputContainer = document.querySelector('.output-container')
    elOutputContainer.hidden = false
}

function getInput(elInput) {
    const inputValue = elInput.value
    return inputValue
}

