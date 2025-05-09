// Client-side code (Angular)
import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'ridlix-game-embed',
  template: `
    <div
      id="game-container"
      style="width: 100%; height: 100%; border: 1px solid #ccc;"
    ></div>
  `,
  styles: `:host {
    display: block;
    width: 100%;
    height: 100%;
  }`,
})
export class RidlixGameEmbedComponent implements AfterViewInit {
  // Put any game ID here you like, check: https://games.ridlix.com/games for a list
  @Input() gameId = 'game_sudoku_dbwctdhj';

  ngAfterViewInit(): void {
    this.loadGame(this.gameId);
  }

  async loadGame(gameId: string): Promise<void> {
    const container = document.getElementById(
      'game-container'
    ) as HTMLDivElement;

    if (!container) return;

    try {
      // Show loading indicator
      container.innerHTML =
        '<div style="display: flex; justify-content: center; align-items: center; height: 100%;">' +
        '<div>Loading game...</div>' +
        '</div>';

      // Get token from your backend using POST
      const response = await fetch(
        'http://localhost:5000/api/ridlix-game-token', //  !!! replace with your own backend !!!
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Browser will automatically add Origin header for cross-origin requests
          },
          body: JSON.stringify({
            gameId: gameId,
            // We can also explicitly include the origin in the body as a fallback
            clientOrigin: window.location.origin,
          }),
        }
      );

      console.log(response);

      if (!response.ok) {
        throw new Error('Failed to get game token');
      }

      const { token, embedUrl } = (await response.json()) as {
        token: string;
        embedUrl: string;
      };

      // Create iframe
      const iframe = document.createElement('iframe');
      iframe.src = embedUrl;
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.style.border = 'none';

      // Clear container and add iframe
      container.innerHTML = '';
      container.appendChild(iframe);

      // Send token when iframe is ready
      window.addEventListener('message', function (event: MessageEvent) {
        // Verify origin matches embed URL domain for security
        const embedOrigin = new URL(embedUrl).origin;
        if (event.origin !== embedOrigin) return;

        if (event.data && event.data.type === 'EMBED_READY') {
          iframe?.contentWindow?.postMessage(
            { type: 'TOKEN', token },
            embedOrigin
          );
        }
      });
    } catch (error) {
      console.error('Error loading game:', error);
      container.innerHTML =
        '<div style="color: red; text-align: center; padding: 20px;">' +
        'Error loading game. Please try again later.' +
        '</div>';
    }
  }
}
