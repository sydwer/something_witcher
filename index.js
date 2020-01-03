const body = document.querySelector('body')
const main = document.getElementById('main')
const enter_button = document.createElement('button')
const contractBoard = document.createElement('div')
const banner = document.createElement('img')
banner.className = "banner"
contractBoard.className = "contract_board"


fetch("http://127.0.0.1:3000/monsters")
.then(response => response.json())
.then(storeResponse)
.then(startGame)

function storeResponse(data){
    monsters = data
    console.log(monsters)
}
function startGame(){
    enter_button.textContent = "ENTER"
    enter_button.className = "enter_button"
    // enter_button.addEventListener("click",loadContracts)
    enter_button.addEventListener("click",goToTown)
    banner.src= "something_witcher_this_way_comes.png"
    main.append(banner, enter_button)
    console.log("it worked")
    // loadContracts(monsters)
}
function goToTown(){
    main.removeChild(enter_button)
    banner.style.height = "13rem"
    body.style.backgroundImage = "url('https://www.game-debate.com/blog/images/_id1427186261_1_7.jpg')"
    setTimeout(function(){ loadContracts(); }, 1500)
}
function loadContracts(){
    townBoard = document.createElement('div')
    notice = document.createElement('img')
    notice.src ="notice_board.png"
    townBoard.className = "town_board"
    monsters.map(monster =>{
        contract = document.createElement('div')
        header = document.createElement('h4')
        title = document.createElement('h1')
        image = document.createElement('img')
        place = document.createElement('h3')
        info = document.createElement('p')
        reward = document.createElement('h2')

        contract.className = "contract"

        header.textContent = "Monster Contract:"
        title.textContent = monster.name 
        console.log(monster.name)
        image.src =  monster.img_src
        place.textContent = `Spotted near: ${monster.place.name}`
        info.textContent = monster.description
        reward.textContent = `Reward: ${monster.reward_amount} gold` 

        contract.append(header,title,image,place,reward)
        contractBoard.appendChild(contract)
    })
    townBoard.append(notice, contractBoard)
    main.appendChild(townBoard)
}