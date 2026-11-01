# Dice Duel

A simple, interactive, two-player dice game built using **HTML, CSS, and JavaScript**. Roll the dice, compete against your opponent, track scores, and win the game.

No installation, frameworks, or external dependencies required.

## About the Game

Dice Duel is a browser-based game where two players compete by rolling dice. Each round, both players roll a die, and the player with the higher number wins the round.

The first player to reach the selected winning score wins the game.

## Features

- **Two-Player Gameplay** — Compete against another player.
- **Custom Player Names** — Personalize player names.
- **Custom Winning Target** — Choose 3, 5, 10, or 20 wins.
- **Live Score Tracking** — Monitor wins and total dice pips.
- **Round History** — Review previous dice rolls.
- **Streak Tracking** — Track consecutive victories.
- **Game Statistics** — View rounds, draws, and highest dice sum.
- **Sound Effects** — Enable or disable game audio.
- **Dark Mode** — Switch between light and dark themes.
- **Keyboard Support** — Press `Space` to roll the dice.
- **Reset & Replay** — Restart the game whenever you want.
- **Responsive Interface** — Designed for desktop and mobile browsers.

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Game structure and interface |
| CSS3 | Styling, layout, and responsiveness |
| JavaScript | Dice rolls, game logic, and interactions |

## Project Structure

```text
Dice_Game/
│
├── index.html                 # Entry point and redirect
│
└── Dice/
    ├── random_dice.html      # Main game interface
    │
    ├── images/
    │   ├── 1.png
    │   ├── 2.png
    │   ├── 3.png
    │   ├── 4.png
    │   ├── 5.png
    │   ├── 6.png
    │   └── logo.png
    │
    ├── script/
    │   └── js1.js            # Game logic
    │
    └── stylesheet/
        └── css_file_1.css    # Game styling
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Aditya-xcity/Dice_Game.git
```

### 2. Navigate to the Project

```bash
cd Dice_Game
```

### 3. Run the Game

Open `index.html` in your preferred web browser.

The page automatically redirects to `Dice/random_dice.html`.

No additional setup is required.

## How to Play

1. Enter names for Player 1 and Player 2.
2. Select the winning target (3, 5, 10, or 20).
3. Click **Roll** or press `Space`.
4. Both dice roll and display their results.
5. The player with the higher number wins the round.
6. Equal dice values result in a draw.
7. Continue until one player reaches the target score.
8. Select **Play Again** for a rematch.

## Game Statistics

| Statistic | Description |
|---|---|
| Rounds | Total rounds played |
| Draws | Number of tied rounds |
| Streak | Consecutive wins |
| Best Sum | Highest combined dice value |
| Total Pips | Cumulative dice values per player |
| History | Record of previous rounds |

## Deployment

The project can be hosted using **GitHub Pages**.

1. Push the project to GitHub.
2. Open the repository's **Settings**.
3. Navigate to **Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose the `main` branch and `/ (root)` folder.
6. Save the settings.

Once deployed, the game should be accessible at:

https://Aditya-xcity.github.io/Dice_Game/

## Future Improvements

- Single-player mode against a computer opponent.
- Dice rolling animations.
- Local multiplayer tournament mode.
- Persistent scores using `localStorage`.
- Custom dice themes.
- Global leaderboard.

## Credits

**Original project credit:** Siddhant Thapliyal, M.Tech (C.S.E.), GEU-Dehradun.

**Repository maintained by:** Aditya Bhardwaj

**Technologies:** HTML, CSS, JavaScript.

---

**Roll the dice. Challenge your opponent. Claim victory.**
