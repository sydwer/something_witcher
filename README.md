# Something Witcher This Way Comes
_A game based on Andrzej Sapkowski's "The Witcher". Players select their witcher (Geralt or Ciri) and a monster to fight, before entering a turn based battle_
## General Info
Players make a number of decisions that affect their game's narrative

#### Screen capture links: 
[Example Monster Contract](https://drive.google.com/open?id=16E3DPlhaU2j1tKRmPqdEsgVO8q6a6lWe)

[Battle Page](https://drive.google.com/open?id=162xOSW74zwV7Nxfs8dAvN63bE8L69gQa)


### Rules
1. After entering the game, players are given the choice of which Witcher they wish to play as. By clicking on teh character's image, they can choose either Geralt of Rivia, or Ciri.

2. Following a brief cutscene, players then see a "Notice Board" wih monster contracts.
Each contract shows:

- The monster's name
- An image of the monster 
- Where the monster was located
- A brief synopsis of the monster
- Reward amount for defeating the monster. The higher the reward the more difficult the battle

_Monster images, location, and synopsis taken from the Witcher game Wiki page_

3. After selecting the contract for the desired monster, players are taken to the selection pages for **potions** and **oils**. Each one grants a boost to the player character or types of damage dealt in battle.

4. With these decisons made, another cutscene plays along with battle music.

5. Players then begin the battle, whihc follows the following methedology:
- The battle is turn based, the player goes, and then the monster, etc. etc.
- A "rolling" system is utilized (akin to a Dungeons and Dragon's skill or attack check), that determines the accuracy of an attack.
- The player is allowed to choose one of two general forms of attack: a **sword attack** or a **spell**.

1. **Sword attacks** deal a potential 8 damage, but can be blocked, dodged, or parried for varying amounts of damage.

_Sword attacks can be used indefinitly_.

2. **Spells** deal a default 10 damage, and are impossible for the monster to block, dodge, or parry.

_Spells require energy, and the player is given a default 5 energy. Once all the energy is used, the player will no longer be able to use spells._

- The battle ends when either the player character or the monster reaches zero health. At which point the player may choose to restart the game.

### Technologies
- JavaScript
- Ruby on Rails

## To-Do's
- Further refactor to greatly reduce number of global variables, and to reduce redundancy by adding in helper functions.
- Upon refactoring monster and Witcher health checks, add in a function to round the displayed number to an acceptable number of decimal places.
- Rebalance the monsters' attack values so the battles last longer and require more strategy(as these were reduced for the sake of demoing the game in a timely manner).
- Further personailze the effects of each potion and oil the player can choose from.

### Status

The app is undeployed and incomplete as the potions and oils are not fully fleshed out; the app will be deployed once teh to-do list stated above has been improved upon. 

