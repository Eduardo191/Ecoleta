const populateUFs = () => {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then((res) => {
    return res.json()
  }).then((states) => {

    for ( const state of states) {
      ufSelect.innerHTML = ufSelect.innerHTML + `<option value="${state.id}">${state.nome}</option>`
    }

  })
}

populateUFs()

const getCities = (event) => {
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  citySelect.innerHTML = "<option value>Selecione a Opção</option>"
  citySelect.disabled = true

  fetch(url).then((res) => {
    return res.json()
  }).then((cities) => {

    for ( const city of cities) {
      citySelect.innerHTML = citySelect.innerHTML + `<option value="${city.nome}">${city.nome}</option>`
    }

    citySelect.disabled = false

  })
}

document.querySelector("select[name=uf]").addEventListener("change", getCities)

//Itens de coleta
//Pegar todos os li's
const intemsToCollect = document.querySelectorAll(".items-grid li")
let selectedItems = []
const collectedItems = document.querySelector("input[name=items]")

const handleSelectedItem = (event) => {
  const itemLi = event.target

  //Adicionar ou remover uma classe com javascript
  itemLi.classList.toggle("selected")
  const itemId = itemLi.dataset.id

  //Verificar se exstem items selecionados , se sim
  //pegar os items selecionados
  const alreadySelected = selectedItems.findIndex((item) => item === itemId)

  //Se já estiver selecionado tirar a seleção
  if ( alreadySelected >= 0 ) {
    const filteredItems = selectedItems.filter((item) => item != itemId)
    selectedItems = filteredItems
  } else {
    //Se não estiver selecionado adicionar a seleção
    selectedItems.push(itemId)
  }

  //atualizar o campo escondido com os dados atualizados
  collectedItems.value = selectedItems  
}

for (const item of intemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}



