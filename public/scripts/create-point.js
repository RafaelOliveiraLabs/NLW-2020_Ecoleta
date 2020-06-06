function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then ( res => res.json() ) //pode se escrever .then( () => { return res.json() } )--- função anonima
    .then( states => {
        for( const state of states ){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value
    const indexofSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexofSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true
    
    fetch(url)
    .then ( res => res.json() ) //pode se escrever .then( () => { return res.json() } )--- função anonima
    .then( cities => {
        
        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        
        citySelect.disabled = false
    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//itens de coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar ou remover uma classe no javascript
    itemLi.classList.toggle("selected") //toggle adiciona ou remove

    const itemId = itemLi.dataset.id

    //verificar se existem itens selecionados, se Sim, pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //true or false
        return itemFound
    })

    //se já estiver selecionado
    if(alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return temIsDifferent
        })

        selectedItems = filteredItems
    }
    
    else {
        //se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }

    //atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems
}