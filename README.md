# ridlix-games-fe-test

This is a front-end Angular implementation designed to seamlessly embed simple Ridlix test games

## Embed games in your website

In this Angular code example, you will see how we can implement angular front-end to show ridlix games embedded game

### Implementation Steps:

1. Create a new component: `ng generate component ridlix-game-embed`
2. Replace its content with the code above
3. Render it inside your template: `<ridlix-game-embed [gameId]="'game_sudoku_dbwctdhj'"></ridlix-game-embed>`
4. Note: this is defined as a standalone component and no need for a module
5. Replace `'game_sudoku_dbwctdhj'` with any other game ID you want to embed

`Important`: Make sure you replace `https://your-backend.com/api/ridlix-game-token` with your actual backend URL.
