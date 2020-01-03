const body = document.querySelector('body')
const main = document.getElementById('main')
const enter_button = document.createElement('button')
const contractBoard = document.createElement('div')
const banner = document.createElement('img')
const audio = new Audio('choir.mp3')

let monsters = null
let selected_enemy = null
let witcher_hp = 100


banner.className = "banner"
contractBoard.className = "contract_board"


fetch("http://127.0.0.1:3000/monsters")
.then(response => response.json())
.then(storeResponse)
.then(startGame)

function storeResponse(data){
    monsters = data
}
function startGame(){
    enter_button.textContent = "ENTER"
    enter_button.className = "enter_button"
    enter_button.addEventListener("click",goToTown)
    banner.src= "something_witcher_this_way_comes.png"
    audio.play();
    main.append(banner, enter_button)
}
function goToTown(){
    main.removeChild(enter_button)
    banner.style.height = "10rem"
    body.style.backgroundImage = "url('https://media3.giphy.com/media/kmIwydQ8Xuhiw/giphy.gif?cid=790b76114b6b9a6f6c1ce652b9fdaf8a94c380c244ab5435&rid=giphy.gif')"
    setTimeout(function(){ loadContracts(); }, 2100)
}
function loadContracts(){
    main.removeChild(banner)
    body.style.backgroundImage = "url('https://www.game-debate.com/blog/images/_id1427186261_1_7.jpg')"
    townBoard = document.createElement('div')
    notice = document.createElement('img')
    notice.src ="notice_board.png"
    townBoard.className = "town_board"
    monsters.map(monster =>{
        const enemy = monster
        // console.log(enemy)
        contract = document.createElement('div')
        contract.className = monster.name
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
    })
    townBoard.append(notice, contractBoard)
    contractBoard.addEventListener("click", selectContract)
    main.appendChild(townBoard)
}


function selectContract(event){
    selected_enemy = (monsters.find(obj => obj.name === event.target.value)) 
    console.log(selected_enemy)
    
}