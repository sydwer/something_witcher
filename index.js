const body = document.querySelector('body')
const main = document.getElementById('main')
const enter_button = document.createElement('button')
const decisionBox = document.createElement('div')
const contractBoard = document.createElement('div')
const potionList = document.createElement('div')
const oilList = document.createElement('div')
const banner = document.createElement('img')
const instructions = document.createElement('h1')
const monsterHp = document.createElement('h2')
const witcherHp = document.createElement('h2')
const energy = document.createElement('h3')
const battleField = document.createElement('div')
const attackBox = document.createElement('div')
const attackBoxMessage = document.createElement('h1')
const geraltButton = document.createElement('button')
const ciriButton = document.createElement('button')
const basicAudio = new Audio('choir.mp3')
const battleAudio = new Audio('battle-music.mp3')
const restartButton = document.createElement('button')

restartButton.textContent = "Restart Game"

const geralt = "https://i.pinimg.com/1200x/01/79/49/0179495c7c07259dbe21f53286924e6f.jpg"
const ciri = "https://i.pinimg.com/originals/fa/50/c8/fa50c82ee9f161dffa2b9e497f2691bf.png"

const geraltGif = "https://steamuserimages-a.akamaihd.net/ugc/955227220413855705/181BFD92E6E73EED9C732D60F73B182B3858B2DC/"
const ciriGif = "https://thumbs.gfycat.com/SpecificCostlyChick-size_restricted.gif"




let battleClip = null
let monsters = null
let potions = null
let oils = null
let signArray = null
let damage_done = []
let damage_taken = []
let energy_used = []
let sword_dmg = 8

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
.then(getSigns)
.then(startGame)

function storeResponse(data){
    monsters = data
}

function getSigns(){
    fetch('http://127.0.0.1:3000/signs')
    .then(response => response.json())
    .then(storeSigns)
}
function storeSigns(data){
    signArray = data
}
function startGame(){
    basicAudio.play()
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
    monster_hp = selected_monster.health_points
    fetch("http://127.0.0.1:3000/potions")
    .then(response => response.json())
    .then(storePotions)
}
function storePotions(data){
    potions = data
    makePreperations()
}
function makePreperations(){
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
        main.removeChild(oilList)
        goToEncounter()
}
function goToEncounter(){
    battleAudio.play();
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
    // instructions.textContent = "Let the Battle Begin"
    instructions.className = "battleBanner"
    // instructions.style.fontcolor= "red"
    makeScreen()

   

    // makeWitcher()
    // makeMonster()
    // main.appendChild(battleField)
    // battleField.className = "battleField"

}


function makeScreen(){
    makeWitcher()
    makeAttackBox()
    makeMonster()
    // main.appendChild(battleField)
}



function makeWitcher(){
    const witcherScreen = document.createElement('div')
    const ui = document.createElement('div')
    const uiHeader = document.createElement('h4')
    const image = document.createElement('img')
    const name = document.createElement('h1')
    // const wip = document.createElement('h2')
    // const energy = document.createElement('h3')
    const oilSprite = document.createElement('div')
    const potionSprite = document.createElement('div')
    const oil = document.createElement('h5')
    const oilImg = document.createElement('img')
    const potion = document.createElement('h5')
    const potionImg = document.createElement('img')
    
    ui.className = "inventory"

    image.src = selected_witcher
    witcherHp.textContent = `HP: ${witcher_hp}`
    energy.textContent = `Energy: ${witcher_energy}`
    uiHeader.textContent = "Inventory"
    potion.textContent = equipped_potion.name
    oil.textContent = equipped_oil.name
    potionImg.src = equipped_potion.img_src
    oilImg.src = equipped_oil.img_src
    
    oilSprite.append(oilImg,oil)
    potionSprite.append(potionImg,potion)
    ui.append(uiHeader ,potionSprite,oilSprite)
    witcherScreen.append(name,witcherHp,energy,image,ui)
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
    // const monsterHp = document.createElement('h2')
    const energy = document.createElement('h3')

    image.src = selected_monster.img_src
    name.textContent = selected_monster.name
    monsterHp.textContent = `HP: ${monster_hp}`
    energy.textContent = `Energy: ?`

    image.className = "battleImg"
    monsterScreen.className = "monsterScreen"

    monsterScreen.append(name,monsterHp,energy, image)
    battleField.appendChild(monsterScreen)
}
function makeAttackBox(){
    attackBoxMessage.textContent = "Your Turn"
    instructions.textContent = "Let The Battle Begin"
    main.appendChild(battleField)
    attackBox.className = "attackBox"
    battleField.className = "battleField"
    battleField.appendChild(attackBox)
    displayAttacks()
}




function displayAttacks(){
    const signBar = document.createElement('div')
    const swordImg = document.createElement('img')
    const swordName = document.createElement('h2')
    const swordSprite = document.createElement('div')
    const signSprite = document.createElement('div')

    
    swordImg.src = "https://pngimage.net/wp-content/uploads/2018/06/sword-hd-png-4.png"
    swordName.textContent = "Sword Attack"
    swordSprite.append(swordImg,swordName)
    swordSprite.className = "sprite"
    signBar.appendChild(swordSprite)

    signBar.className = "attackBar"
    signArray.map(sign=>{
        const signImg =  document.createElement('img')
        const signName =  document.createElement('h2')

        signImg.src = sign.img_src
        signName.textContent = sign.name 
        signImg.value = sign.name
        signSprite.append(signImg,signName)
        signSprite.value = sign.name
        signSprite.className = "sprite"
        signBar.appendChild(signSprite)
    })
    attackBox.append(attackBoxMessage,signBar)
    swordSprite.addEventListener("click", useSword)
    signSprite.addEventListener("click",useSign)
}



function useSword(){
    // console.log("hi")
    attackBoxMessage.textContent = "Your Turn"
    const attempt = Math.floor(Math.random() * selected_monster.dodge_chance)
    console.log(attempt)
   if(attempt === 4){
        console.log("clip")
        alert(`${selected_monster.name} attempts to dodge, but you clip it for ${sword_dmg*0.5} damage`)
        damage_done.push(sword_dmg*0.5)
        const newMonsterHp = monster_hp - (damage_done.reduce((a, b) => a + b, 0))
        monsterHp.textContent = `HP:${newMonsterHp}`
        if (newMonsterHp < 1){
            win()
        }
    }else if( attempt === 3){
        console.log("bad attempt")
        alert(`${selected_monster.name} attempts to block your attack, but takes ${sword_dmg*0.25} damage`)
        damage_done.push(sword_dmg*0.25)
        const newMonsterHp = monster_hp - (damage_done.reduce((a, b) => a + b, 0))
        monsterHp.textContent = `HP:${newMonsterHp}`
        if (newMonsterHp < 1){
            win()
        }
    } else if( attempt === 2){
        console.log("block")
        alert(`${selected_monster.name} blocks your attack, but takes ${sword_dmg*0.1} damage from the force`)
        damage_done.push(sword_dmg*0.1)
        const newMonsterHp = monster_hp - (damage_done.reduce((a, b) => a + b, 0))
        monsterHp.textContent = `HP:${newMonsterHp}`
        if (newMonsterHp < 1){
            win()
        }
    }else if ( attempt === 1){
        console.log("dodge")
        damage_done.push(0)
        alert(`${selected_monster.name} dodges your attack`)
        const newMonsterHp = monster_hp - (damage_done.reduce((a, b) => a + b, 0))
        monsterHp.textContent = `HP:${newMonsterHp}`
    }else if( attempt === 0){
        console.log("respond")
        damage_taken.push(sword_dmg)
        const newWitcherHp = witcher_hp - (damage_taken.reduce((a, b) => a + b, 0))
        alert(`${selected_monster.name} blocks your attack, and responds to deal ${sword_dmg} damage back to you`)
        witcherHp.textContent = `HP:${newWitcherHp}`
        if (newWitcherHp < 1){
            die()
        }
    }else{
            console.log("it should be a hit")
            alert( `You hit ${selected_monster.name} for ${sword_dmg} damage`)
            damage_done.push(sword_dmg)
            const newMonsterHp = monster_hp - (damage_done.reduce((a, b) => a + b, 0))
            monsterHp.textContent = `HP:${newMonsterHp}`
            if (newMonsterHp < 1){
                win()
            }
    }
        // attackBoxMessage.textContent = "Monster's Turn"
        attackBoxMessage.textContent = `${selected_monster.name}'s turn`
        turn = "monster"
        setTimeout(function(){ monsterTurn(); }, 2000)
}
// const newWitcherHp = round(witcher_hp -= (damage_taken.reduce((a, b) => a + b, 0)),2)
// const newMonsterHp = round(monster_hp -= (damage_done.reduce((a, b) => a + b, 0)),2)
function monsterTurn(){
    // attackBox.removeChild(signBar)
    attackBoxMessage.textContent = `${selected_monster.name}'s turn`
    const attempt = Math.floor(Math.random() * selected_monster.accuracy_rtg)
    if(attempt === 4){
        alert(`You try to dodge, but ${selected_monster.name} clips you for ${selected_monster.attack_pwr*0.5} damage`)
        damage_taken.push(selected_monster.attack_pwr * 0.5)
        const newWitcherHp = witcher_hp - (damage_taken.reduce((a, b) => a + b, 0))
        if (newWitcherHp<1){
            die()
        } 
        witcherHp.textContent = `HP:${newWitcherHp}`
    }else if( attempt === 3){
        alert(`You poorly block ${selected_monster.name}'s attack, taking ${selected_monster.attack_pwr*0.25} damage`)
        damage_taken.push(selected_monster.attack_pwr* 0.25)
        const newWitcherHp = witcher_hp - (damage_taken.reduce((a, b) => a + b, 0))
        witcherHp.textContent = `HP:${newWitcherHp}`
        if (newWitcherHp<1){
            die()
        } 
    }else if( attempt === 2){
        alert(`You block ${selected_monster.name}'s attack, but suffer ${selected_monster.attack_pwr* 0.1} damage from the force`)
        damage_taken.push(selected_monster.attack_pwr* 0.1)
        const newWitcherHp = witcher_hp - (damage_taken.reduce((a, b) => a + b, 0))
        witcherHp.textContent = `HP:${newWitcherHp}`
        if (newWitcherHp<1){
            die()
        } 
    }else if(attempt === 1){
        alert(`You dodge ${selected_monster.name}'s attack`)
        damage_taken.push(0)
        const newWitcherHp = witcher_hp - (damage_taken.reduce((a, b) => a + b, 0))
        witcherHp.textContent = `HP:${newWitcherHp}`
        if (newWitcherHp<1){
            die()
        } 
    }else if(attempt === 0){
        alert(`You  block ${selected_monster.name}'s attack, and respond to deal ${selected_monster.attack_pwr} damage back`)
        damage_done.push(selected_monster.attack_pwr)
        const newMonsterHp = monster_hp - (damage_done.reduce((a, b) => a + b, 0))
        monsterHp.textContent = `HP:${newMonsterHp}`
        if(newMonsterHp < 1){
            win()
        }
    }else{
        alert(`The ${selected_monster.name} hits you for ${selected_monster.attack_pwr} damage`)
        damage_taken.push(selected_monster.attack_pwr)
        const newWitcherHp = witcher_hp - (damage_taken.reduce((a, b) => a + b, 0))
        witcherHp.textContent = `HP:${newWitcherHp}`
        if(newWitcherHp<1){
            die()
        }
    }
    attackBoxMessage.textContent = "Your Turn"
}

function useSign(){
    attackBoxMessage.textContent = `${selected_monster.name}'s turn`
    console.log(event.target.value)
     
    energy_used.push(1)
    newEnergy = witcher_energy - (energy_used.reduce((a, b) => a + b, 0))
    if(newEnergy > -2){
        alert(` You hit ${selected_monster.name} for 10 damage`)
        damage_done.push(10)
        console.log(monster_hp)
        energy.textContent = `Energy: ${newEnergy}`
        const newMonsterHp = monster_hp - (damage_done.reduce((a, b) => a + b, 0))
        monsterHp.textContent = `HP:${newMonsterHp}`

        if(newMonsterHp<1){win()}
    }else{
        energy.textContent = "Energy: 0"
       alert("You're Out of Energy and Can't Cast Anymore Signs!")
    }

    setTimeout(function(){ monsterTurn(); }, 2500)
   
    // winOrDie()

}
function win(){
    main.removeChild(instructions)
    body.style.backgroundImage = "url('https://i.imgur.com/U1av40f.gif?noredirect')"
    main.removeChild(battleField)
        message.textContent = `Congratulations! You Defeated the ${selected_monster.name}, and You Collect ${selected_monster.reward_amount} gold`
        message.className = "endMessage"
        message.appendChild(restartButton)
        main.appendChild(message)
        restartButton.addEventListener("click", reset)
}

const message = document.createElement('h1')
function die(){
    main.removeChild(instructions)
    body.style.backgroundImage = "url('https://i.imgur.com/U1av40f.gif?noredirect')"
    main.removeChild(battleField)
        message.textContent = `The ${selected_monster.name} has Defeated You`
        message.className = "endMessage"
        message.appendChild(restartButton)
        main.append(message)
        restartButton.addEventListener("click", reset)
       
}

function reset(){
    basicAudio.play()
    main.removeChild(message)
    startGame()
}


