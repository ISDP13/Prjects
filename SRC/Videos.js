"use strict";
// DATA  ---------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = require("express");
var Videos_router_1 = require("./routes/Videos-router");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
var AvailableResolution = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
var port = 5000;
exports.app.listen(port, function () {
    console.log("Server Starts ".concat(port));
});
var videos = [
    {
        id: 0,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2024-02-03T10:07:33.179Z",
        publicationDate: "2024-02-03T10:07:33.179Z",
        availableResolutions: [
            "P144"
        ]
    }, {
        id: 1,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2024-02-03T10:07:33.179Z",
        publicationDate: "2024-02-03T10:07:33.179Z",
        availableResolutions: [
            "P144"
        ]
    }
];
exports.app.use('/videos', Videos_router_1.videosRouter);
exports.app.delete('/testing/all-data', function (req, res) {
    videos.length = 0;
    res.sendStatus(204);
});
