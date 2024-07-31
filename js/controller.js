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
    if (isValid(rawInput)) {
        handleWarning(true)
        const sumsMap = pathService.getPathsMap(rawInput)
        renderOutput(sumsMap)
    } else {
        event.stopPropagation()
        handleWarning(false)
    }
}

function getInput(elInput) {
    const inputValue = elInput.value
    return inputValue
}

function isValid(rawInput) {
    // Input must not be empty and must contain numbers.
    const conditions = rawInput.length > 0 && /\d/.test(rawInput)
    return conditions
}

function handleWarning(isValid) {
    const elInput = document.getElementById('paste-input')
    if (isValid) {
        elInput.classList.remove('is-invalid')
    } else {
        elInput.classList.add('is-invalid')
    }
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
