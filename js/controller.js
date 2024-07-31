import { pathService } from "../services/path.service.js"
window.onload = onInit

function onInit() {
    addListeners()
}

function addListeners() {
    const elInputForm = document.getElementById('input-form')
    elInputForm.addEventListener('submit', onSubmitForm)
}

function onSubmitForm(event) {
    event.preventDefault()
    const elInput = document.getElementById('paste-input')
    const rawInput = getInput(elInput)
    if (isValidated(rawInput)) {
        removeWarning()
        const sumsMap = pathService.getPathsMap(rawInput)
        renderOutput(sumsMap)
    } else {
        event.stopPropagation()
        showWarning()
    }

}

function getInput(elInput) {
    const inputValue = elInput.value
    return inputValue
}

function isValidated(rawInput) {
    // Input must not be empty and must contain numbers.
    const conditions = rawInput.length > 0 && /\d/.test(rawInput)
    return conditions
}

function showWarning() {
    const elInput = document.getElementById('paste-input')
    elInput.classList.add('is-invalid')
}

function removeWarning() {
    const elInput = document.getElementById('paste-input')
    elInput.classList.remove('is-invalid')
}

function renderOutput(sumsMap) {
    const elOutputContainer = document.querySelector('.output-container')
    elOutputContainer.hidden = false

    const elResult = elOutputContainer.querySelector('.result')
    const strHTMLs = sumsMap.map(item => {
        return `
        <li class="list-group-item">
            <p>
                <span class="sum">${item.sum}</span> |
                <span class="count">${item.count}</span>
            </p>
        </li>
        `
    }
        
    )

    elResult.innerHTML = strHTMLs.join('')

}
