# AngularRpg
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.5.

# remember
- IPO Model 👆
	- Input - angular component
	- Process - AngularRPG class
	- Output - Angular component

# step #1 ✔
	Darstellung eines 2D Dungeon. Es ist klar erkennbar welche Felder zum Spielfeld gehören.
	Es gibt Spieler, Monster und einen Ausgang.
	Der Spieler kann mit den Pfeiltasten bewegt werden.
	Erreicht der Spieler den Ausgang, ist das Level beendet und das nächste startet.

# to do for step #1 ✔
- grid into angular rpg ✅
- replace strings with enums ✅
- remove try catch ✅
- more game logic
	- spawn enemies ✅, make them spawn at random positions ✅
	- basic defeating an enemy, if player walks into tile occupied by enemy, remove enemy ✅
- implement exit ✅
- implement new stage generation ✅


# step #2
	Monster sollen sich (zufällig) bewegen.
	Kommen Monster und spieler auf das selbe Feld (oder entsprechend), wird ein Kampf gestartet.
	Der Kampf wird in einem extra View dargestellt.
	Jede Runde fügen sich der Spieler und das Monster greifen sich gegenseitg an und fügen sich ggf Schaden zu.
	Verliert das Monster seine Lebenspunkte ist der Kampf beendet und der view wechselt zurück auf die Spielfeld Darstellung.
	Verliert der Spieler seine Lebenspunkte ist das Spiel beendet.

# to do for step #2
- make enemies move randomly ✅
- combat view basic setup ✅
- develop a service that passes my data, passing in router no bueno ✅
- think of placeholder attacks, spells for player and enemy ✅
- implement turnbased combat ✅
- handle Player win ✅
- handle Player loss ✅

# step #3
	Level werden zufällig erstellt / nach mustern generiert. ✅
	Es gibt verschiedene Monstertypen mit stärken und schwächen. ✅
	Der Spieler kann seinen Angriffswert ändern.✅
	Es gibt aufhebbare Sammelitems die HP steigern. ✅

# to do for step #3
- add monster types (idea: Bat 🦇, Spider: 🕷️) ✅
- make player level up ✅
- add items (buffs, heals✅)

# misc
- make player also spawn randomly ✅
- fix enemy stacking ✅
- fix that enemies can walk onto the door ✅
- add tree clusters as obstruction ✅
- make combat log a message log component ✅ use it in level view aswell to display
- make combat turn based to improve player experiance

# known bugs
- ~~player cant move in new game after he died~~
