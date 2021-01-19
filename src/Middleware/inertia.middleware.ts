import {Injectable, NestMiddleware} from '@nestjs/common';
import inertia = require("inertia-node");

@Injectable()
export class InertiaMiddleware implements NestMiddleware {

  public static ASSET_VERSION = "1";
  public html = (page, viewData) => `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
            <script src="/main.js" defer></script>
            <link rel="stylesheet" href="/main.css">
            <link rel="stylesheet" href="/style.css">
            
        <!-- Custom data -->
        <title>${viewData.title}</title>
      </head>
        <script>
        console.log(${JSON.stringify(page)})
        </script>
      <!-- The Inertia page object -->
      <body>
        <div  id="app" data-page='${JSON.stringify(page)}'></div>
        </body>
    </html>
    `;

  async use(req: any, res: any, next: () => void) {

    const version = InertiaMiddleware.ASSET_VERSION;

    if (
        req.method === "GET" &&
        req.headers["x-inertia"] &&
        req.headers["x-inertia-version"] !== version
    ) {
      return res.writeHead(409, { "X-Inertia-Location": req.url }).end();
    }

    let _page = {
      component: undefined,
      url: undefined,
      props : undefined
    };
    let _viewData = {};
    let _sharedProps = {};
    let _statusCode = 200;
    let _headers = {};

    const Inertia = {
      setViewData(viewData) {
        _viewData = viewData;
        return this;
      },

      shareProps(sharedProps) {
        _sharedProps = { ..._sharedProps, ...sharedProps };
        return this;
      },

      setStatusCode(statusCode) {
        _statusCode = statusCode;
        return this;
      },

      setHeaders(headers) {
        _headers = { ..._headers, ...headers };
        return this;
      },

      async render({ props, ...pageRest }) {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        _page = { ...pageRest, url: req.originalUrl || req.url,  version };

        const allProps = { ..._sharedProps, ...props };

        let dataKeys;

        if (
            req.headers["x-inertia-partial-data"] &&
            req.headers["x-inertia-partial-component"] === _page.component
        ) {
          dataKeys = req.headers["x-inertia-partial-data"].split(",");
        } else {
          dataKeys = Object.keys(allProps);
        }

        _page.props = await dataKeys.reduce(async (objPromise, key) => {
          let value;

          if (typeof allProps[key] === "function") {
            value = await allProps[key]();
          } else {
            value = allProps[key];
          }

          const obj = await objPromise;

          return { ...obj, [key]: value };
        }, {});

        if (req.headers["x-inertia"]) {
          res
              .writeHead(_statusCode, {
                ..._headers,
                "Content-Type": "application/json",
                "X-Inertia": "true",
                Vary: "Accept",
              })
              .end(JSON.stringify(_page));
        } else {
          res
              .writeHead(_statusCode, {
                ..._headers,
                "Content-Type": "text/html",
              })
              .end(this.html(_page, _viewData));
        }
      },

      redirect(url) {
        const statusCode = ["PUT", "PATCH", "DELETE"].includes(req.method)
            ? 303
            : 302;

        res.writeHead(statusCode, { ..._headers, Location: url }).end();
      },
    };

    req.Inertia = Inertia;

    next();
  }
}
