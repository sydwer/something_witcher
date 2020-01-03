const body = document.querySelector('body')
const main = document.getElementById('main')
const enter_button = document.createElement('button')
const decisionBox = document.createElement('div')
const contractBoard = document.createElement('div')
const potionList = document.createElement('div')
const oilList = document.createElement('div')
const banner = document.createElement('img')
const instructions = document.createElement('h1')
const battleField = document.createElement('div')
const attackBox = document.createElement('div')
const geraltButton = document.createElement('button')
const ciriButton = document.createElement('button')
const basicAudio = new Audio('choir.mp3')
const battleAudio = new Audio('battle-music.mp3')

const geralt = "https://i.pinimg.com/1200x/01/79/49/0179495c7c07259dbe21f53286924e6f.jpg"
const ciri = "https://i.pinimg.com/originals/fa/50/c8/fa50c82ee9f161dffa2b9e497f2691bf.png"

const geraltGif = "https://steamuserimages-a.akamaihd.net/ugc/955227220413855705/181BFD92E6E73EED9C732D60F73B182B3858B2DC/"
const ciriGif = "https://thumbs.gfycat.com/SpecificCostlyChick-size_restricted.gif"




let battleClip = null
let monsters = null
let potions = null
let oils = null
let signs = null

let selected_witcher = null
let selected_monster = null
let equipped_potion = null
let equipped_oil = null

let turn = "witcher"
let monster_hp = null
let witcher_hp = 100
let witcher_energy = 4


banner.className = "banner"
contractBoard.className = "contract_board"


fetch("http://127.0.0.1:3000/monsters")
.then(response => response.json())
.then(storeResponse)
.then(startGame)

function storeResponse(data){
    monsters = data
    // basicAudio.play()
}
function startGame(){
    enter_button.textContent = "ENTER"
    enter_button.className = "enter_button"
    enter_button.addEventListener("click",whichWitcher)
    banner.src= "something_witcher_this_way_comes.png"
    main.append(banner, enter_button)
}

function whichWitcher(){
    main.removeChild(enter_button)
    main.removeChild(banner)
    banner.style.height = "10rem"
    const ciri = document.createElement('img')
    const geralt = document.createElement('img')
    const picBar = document.createElement('div')
    const which = document.createElement('h1')

    ciri.src = "https://purepng.com/public/uploads/medium/purepng.com-the-witcher-3-ciriwitcherthe-witcherandrzej-sapkowskiwriterfantasy-serieswitcher-geralt-of-riviawitchersbooksmonster-hunterssupernaturaldeadly-beastsseriesvideo-gamesxbox-1701528661235ezoqo.png"
    geralt.src = "http://pluspng.com/img-png/the-witcher-png-the-witcher-png-hd-676.png"
    which.className = "whichWitcher"
    picBar.className = "picBar"
    geralt.className = "geraltButton"
    decisionBox.className = "decisionBox"
    which.textContent = "Pick Your Witcher"
    picBar.append(geralt, ciri)
    decisionBox.append(which,picBar)
    main.appendChild(decisionBox)
    decisionBox.addEventListener("click",loadWitcher)
   
}

function loadWitcher(event){

    if (event.target.className === "geraltButton"){
        selected_witcher = geralt
    }else{
        selected_witcher = ciri
    }
    console.log(selected_witcher)
    goToTown()
}
function goToTown(){
    main.removeChild(decisionBox)
    body.style.backgroundImage = "url('https://media3.giphy.com/media/kmIwydQ8Xuhiw/giphy.gif?cid=790b76114b6b9a6f6c1ce652b9fdaf8a94c380c244ab5435&rid=giphy.gif')"
    setTimeout(function(){ loadContracts(); }, 2100)
}
function loadContracts(){
    body.style.backgroundImage = "url('https://www.game-debate.com/blog/images/_id1427186261_1_7.jpg')"
    townBoard = document.createElement('div')
    notice = document.createElement('img')
    notice.src ="notice_board.png"
    townBoard.className = "town_board"
    monsters.map(monster =>{
        // console.log(enemy)
        contract = document.createElement('div')
        contract.value = monster.name
        header = document.createElement('h4')
        title = document.createElement('h1')
        image = document.createElement('img')
        place = document.createElement('h3')
        info = document.createElement('p')
        reward = document.createElement('h2')
        description = document.createElement('p')
        accept_button = document.createElement('button')

        contract.className = "contract"
        description.id = "description"
        accept_button.id = "accept_button"

        header.textContent = "Monster Contract:"
        title.textContent = monster.name 
        image.src =  monster.img_src
        place.textContent = `Spotted near: ${monster.place.name}`
        info.textContent = monster.description
        reward.textContent = `Reward: ${monster.reward_amount} gold`
        description.textContent = monster.description
        accept_button.textContent = "Accept Contract" 
        accept_button.value = monster.name


        contract.append(header,title,image,place,description,reward,accept_button)
        contractBoard.appendChild(contract)
        accept_button.addEventListener("click", selectContract)

    })
    townBoard.append(notice, contractBoard)
    // contractBoard.addEventListener("click", selectContract)
    main.appendChild(townBoard)
}


function selectContract(event){
    selected_monster = (monsters.find(obj => obj.name === event.target.value)) 
    monster_hp = selected_monster
    console.log(selected_monster)
    fetch("http://127.0.0.1:3000/potions")
    .then(response => response.json())
    .then(storePotions)
}
function storePotions(data){
    potions = data
    makePreperations()
}
function makePreperations(){
    console.log(potions)
    body.style.backgroundImage = "url('https://media2.giphy.com/media/CMvgWSEKDUvaE/source.gif'"
    main.removeChild(townBoard)
    choosePotion(potions)
}

function choosePotion(potions){
    // const instructions = document.createElement('h1')
    // const potionList = document.createElement('div')
    instructions.textContent = "Pick Your Potion:"
    instructions.className = "pick_your_potion"
    potionList.className = "potion_list"
    potions.map(potion =>{
        const potion_card = document.createElement('div')
        const image = document.createElement('img')
        const name = document.createElement('h2')
        const effect = document.createElement('h3')
        const select_button = document.createElement('button')

        potion_card.className = "potion_card"

        image.src = potion.img_src
        name.textContent = potion.name
        effect.textContent = potion.effect
        select_button.textContent = "Equip this Potion"
        select_button.value = potion.name

        potion_card.append(image,name,effect,select_button)
        select_button.addEventListener("click", equipPotion)
        potionList.append(potion_card)
    })
    main.append(instructions, potionList)
}

function equipPotion(event){
    equipped_potion = (potions.find(obj => obj.name === event.target.value))
    console.log(equipped_potion)
    fetch("http://127.0.0.1:3000/oils")
    .then(response => response.json())
    .then(storeOils)
}
function storeOils(data){
    oils = data
    main.removeChild(potionList)
    chooseOil(oils)
}
function chooseOil(oils){
    // instructions = document.createElement('h1')
    instructions.textContent = "Choose an Oil for Your Blade:"
    instructions.className = "pick_your_oil"

    oils.map(oil =>{
        const oilCard = document.createElement('div')
        const image = document.createElement('img')
        const name = document.createElement('h2')
        const effect = document.createElement('h3')
        const select_button = document.createElement('button')
        oilCard.className = "oilCard"
        image.src = oil.img_src
        name.textContent = oil.name
        effect.textContent = oil.effect
        select_button.textContent = "Use this Oil"
        select_button.value = oil.name
        oilCard.append(image,name,effect,select_button)
        oilList.appendChild(oilCard)
        select_button.addEventListener("click", useOil)
    })
    
    main.append(instructions,oilList)
    oilList.className = "oilList"
}

function useOil(event){
        equipped_oil = (oils.find(obj => obj.name === event.target.value))
        console.log(equipped_oil)
        main.removeChild(oilList)
        goToEncounter()
}
function goToEncounter(){
    // battleAudio.play();
    if(selected_witcher === geralt){
        body.style.backgroundImage = "url('https://thumbs.gfycat.com/ExcitableAridBetafish.webp')"
    }else{
        body.style.backgroundImage = "url('https://thumbs.gfycat.com/SpecificCostlyChick-size_restricted.gif')"
    }
    instructions.textContent = "Let the Battle Begin"
    setTimeout(function(){ beginEncounter(); }, 5000)
    
}
function beginEncounter(){
    body.style.backgroundImage = "url('https://i.kinja-img.com/gawker-media/image/upload/t_original/kzocepplr2gfbnkyxrd5.gif')"
    instructions.textContent = "Let the Battle Begin"
    instructions.className = "battleBanner"
    fetch('http://127.0.0.1:3000/signs')
    .then(response => response.json)
    .then(storeSigns)
   

    // makeWitcher()
    // makeMonster()
    // main.appendChild(battleField)
    // battleField.className = "battleField"

}
function storeSigns(data){
    signs = data 
    makeScreen()
}

function makeScreen(){
    makeWitcher()
    makeAttackBox()
    makeMonster()
    main.appendChild(battleField)
    battleField.className = "battleField"
}

function makeAttackBox(){
    const message = document.createElement('h1')
    attackBox.className = "attackBox"
    if(turn === "monster"){
        message.textContent = `${selected_monster.name}'s turn`
    }else{
        message.textContent = "Your Turn"
    }
    attackBox.appendChild(message)
    battleField.appendChild(attackBox)
}

function makeWitcher(){
    const witcherScreen = document.createElement('div')
    const ui = document.createElement('div')
    const uiHeader = document.createElement('h4')
    const image = document.createElement('img')
    const name = document.createElement('h1')
    const hp = document.createElement('h2')
    const energy = document.createElement('h3')
    const oilSprite = document.createElement('div')
    const potionSprite = document.createElement('div')
    const oil = document.createElement('h5')
    const oilImg = document.createElement('img')
    const potion = document.createElement('h5')
    const potionImg = document.createElement('img')
    
    ui.className = "inventory"

    image.src = selected_witcher
    hp.textContent = `HP: ${witcher_hp}`
    energy.textContent = `Energy: ${witcher_energy}`
    uiHeader.textContent = "Inventory"
    potion.textContent = equipped_potion.name
    oil.textContent = equipped_oil.name
    potionImg.src = equipped_potion.img_src
    oilImg.src = equipped_oil.img_src
    
    oilSprite.append(oilImg,oil)
    potionSprite.append(potionImg,potion)
    ui.append(uiHeader ,potionSprite,oilSprite)
    witcherScreen.append(name,hp,energy,image,ui)
    battleField.appendChild(witcherScreen)

    if (selected_witcher === geralt){
        name.textContent = "Geralt of Rivia"
        witcherScreen.style.backgroundColor = "#3128777a"
    }else{
        name.textContent = 'Cirilla "Ciri" Fiona Elen Riannon'
        witcherScreen.style.backgroundColor = "#28775a7a"
    }

    image.className = "battleImg"
    witcherScreen.className = "witcherScreen"
}

function makeMonster(){
    const monsterScreen = document.createElement('div')
    const image = document.createElement('img')
    const name = document.createElement('h1')
    const hp = document.createElement('h2')
    const energy = document.createElement('h3')

    image.src = selected_monster.img_src
    name.textContent = selected_monster.name
    hp.textContent = `HP: ${selected_monster.health_points}`
    energy.textContent = `Energy: ?`

    image.className = "battleImg"
    monsterScreen.className = "monsterScreen"

    monsterScreen.append(name,hp,energy, image)
    battleField.appendChild(monsterScreen)
}


// function startBattle(){

// }

