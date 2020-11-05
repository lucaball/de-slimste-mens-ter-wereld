import {Injectable, NestMiddleware} from '@nestjs/common';
import * as inertia from 'inertia-node/src';

@Injectable()
export class InertiaMiddleware implements NestMiddleware {

  public ASSET_VERSION = "1";
  public html = (page, viewData) => `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
            <script src="runtime.js" defer></script>
            <script src="vendors~main.js" defer></script>
            <script src="main.js" defer></script>
            <link rel="stylesheet" href="main.css">
        
        <!-- Custom data -->
        <title>${viewData.title}</title>
      </head>
    
      <!-- The Inertia page object -->
      <body>
        <div  id="app" data-page='${JSON.stringify(page)}'></div>
        </body>
    </html>
    `;

  use(req: any, res: any, next: () => void) {

    inertia(this.html, this.ASSET_VERSION)
    console.log('Hello, are you high?');

    next();
  }
}
