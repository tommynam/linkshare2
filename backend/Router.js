const express = require('express');

class Router {
    constructor(linkService) {
        this.linkService = linkService;
    }

    router() {
        let router = express.Router();

        router.get("/", this.get.bind(this));
        router.post("/", this.post.bind(this));
        router.delete("/:id", this.delete.bind(this));

        return router;
    }

    get(req, res) {
        return this.linkService.list(req.query.search)
            .then((links) => {
                res.json(links);
            })
            .catch((err) => res.status(500).json(err));
    };

    post(req, res) {
        return this.linkService
            .add(req.body)
            .then(() => this.linkService.list(""))
            .then((links) => {
                return res.json(links);
            })
            .catch((err) => res.status(500).json(err));
    }


    delete(req, res) {
        console.log("deleting");
        return this.linkService
            .remove(req.params.id)
            .then(() => this.linkService.list(""))
            .then((links) => {
                console.log("links",links)
                return res.json(links)
            })
            // .catch((err) => res.status(500).json(err));
    };



}

module.exports = Router;