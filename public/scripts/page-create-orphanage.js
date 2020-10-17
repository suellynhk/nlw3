//create and set map
const map = L.map('mapid').setView([-23.3212398,-51.1395138], 15);

//create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);

//create icon
const icon= L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58,68],
    iconAnchor: [29,68],
})

let marker;

//create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    //remove icon
    marker && map.removeLayer(marker)

    //add icon layer
    marker = L.marker([lat, lng], {icon}).addTo(map)
})

//create new photo upload field
function addPhotoField() {
    //pegar o container de fotos #images
    const container = document.querySelector('#image')
    //pegar o container para duplicar .new-upload
    const fieldContainer = document.querySelectorAll('.new-upload')
    //realizar o clone da ultima imagem adicionada
    const newFieldContainer = fieldContainer[fieldContainer.length - 1].cloneNode(true)
    //verificar se o campo está vazio, se sim, não adicionar novo ccampo de imagem
    const input = newFieldContainer.children[0]
    if (input.value == "") {
        return
    }
    //limpar o campo
    newFieldContainer.children[0].value=""
    //adicionar o clone ao container de #images
    container.appendChild(newFieldContainer)
}

//deletar campo de foto
function deleteField(event) {
    const span = event.currentTarget //o span é quem está disparando o evento
    const fieldContainer = document.querySelectorAll('.new-upload')
    if (fieldContainer.length < 2){
        //limpar o campo
        span.parentNode.children[0].value = ""
        return 
    }
    //deletar o campo
    span.parentNode.remove()
}

//modificar o botão de seleçã0 -sim/não
function toggleSelect(event){
    document.querySelectorAll('.button-select button')
    //retirar a class="active" dos botoes
    .forEach(function(button) {
        button.classList.remove('active')
    })
    //colocar a class .active no botão clicado
    const button = event.currentTarget
    button.classList.add('active')

    //atualizar o input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]')
    input.value = button.dataset.value
}