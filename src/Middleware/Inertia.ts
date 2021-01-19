import {Request, Response} from "express";

export class Inertia {

    private version = 1;
    private req : Request;
    private res = Response;
    private next = {};
    private _viewData = {};
    private _statusCode = 200;
    private _sharedProps = {}
    private _headers = {};

    constructor(req: any, res: any, next: () => void) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    public setViewData(viewData) {
        this._viewData = viewData;
        return this;
    }

    public setStatusCode(statusCode) {
        this._statusCode = statusCode;
        return this;
    }

    public setHeaders(headers) {
        this._headers = {...this._headers, ...headers};
        return this;
    }

    public async render({props, ...pageRest}) {

        let _page = { ...pageRest, url: this.req.originalUrl || this.req.url,  version };

        const allProps = { ... this._sharedProps, ...props };

        let dataKeys;

        if (
            this.req.headers["x-inertia-partial-data"] &&
            this.req.headers["x-inertia-partial-component"] === _page.component
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

        let _page = {...pageRest}
    }
}


