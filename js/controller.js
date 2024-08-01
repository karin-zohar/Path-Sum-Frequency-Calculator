import { pathService } from "../services/path.service.js"

document.addEventListener('DOMContentLoaded', onInit);

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
    const rawInput = getInputValue(elInput)
    if (isValid(rawInput)) {
        handleWarning(elInput, true)
        try {
            const sumsMap = pathService.getPathsMap(rawInput)
            console.log('sumsMap: ', sumsMap)
            renderOutput(sumsMap)
        } catch (error) {
            console.error('Error getting paths map: ', error)
            showErrorToast()
        }
    } else {
        handleWarning(elInput, false)
    }
}

function getInputValue(elInput) {
    const inputValue = elInput.value
    return inputValue
}

function isValid(rawInput) {
    // Input must not be empty and must contain numbers.
    const conditions = rawInput.length > 0 && /\d/.test(rawInput)
    return conditions
}

function handleWarning(el, isValid) {
    if (isValid) {
        el.classList.remove('is-invalid')
    } else {
        el.classList.add('is-invalid')
    }
}

function showErrorToast() {
    const elErrorToast = document.getElementById('error-toast')
    const toastBootstrap = new bootstrap.Toast(elErrorToast)
    toastBootstrap.show()
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
