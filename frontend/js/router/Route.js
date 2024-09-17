export default class Route {
    constructor(url, title, pathHtml, pathJs = "", minAuth = "") {
        this.url = url;
        this.title = title;
        this.pathHtml = pathHtml;
        if (pathJs !== "") {
            this.pathJs = pathJs;
        }
        this.minAuth = minAuth;
    }
}