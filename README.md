# Battleship
It's a recreation of the old classic game called [Battleship](https://en.wikipedia.org/wiki/Battleship_(game)) as a simple webpage game. Canvas tag is mainly used for the battle gamebaords.

### Rules
Place your ships and destroy the enemy ships. As simple as that. 

### Ships
These are the following ships exactly as the classes of ships from the old game.
| Classes | Size |
| ------- | -----|
| Carrier | 5    |
| Battleship | 4 |
| Cruiser | 3 |
| Submarine | 3 |
| Destroyer | 2 |

### Gamemodes 
There are two gamemodes: Player vs Player (PvP) and Player vs AI with an implementation of two different difficulties. Additionally, a gamemode AI vs AI is included specifically for debugging purposes or just to have fun with coded implementations.

### Issues to fix
**Minor**:
* First attack from one of the player is not listed as an outcome.
* Sometimes it results to an undefined error when an AI w/ hard diff only has less than 5 attacks left.

### TODOS
4/4/20
- [X] Implement PvP toggle visibility functionality so players cannot see each other's ships.
- [X] Created randomzie ships functionality as the main feature to place ships.
- [X] Design outcome in a list format during the game.
- [X] Create secondary difficulty mainly to polish AI move ruleset.
- [X] The clean up function for player is not accessible after clicking the restart button.

### Hunt/Target Algorithm
    If random attack shot first square in a ship.
    Switch to target mode where 4 square is the required possible shots.
    When the ship dies then it should switch to hunt mode.
    Repeat steps from line 1 to 4 until victory naturally occurs.
    
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run unitest`

It's a set of custom written tests bulding the fundamental foundation of the game's ruleset and to ensure the proper correctness of the coding base using jest as the main framework for testing. 

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.




