"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
var express_1 = require("express");
var Videos_repository_1 = require("../repositories/Videos-repository");
var express_validator_1 = require("express-validator");
exports.videosRouter = (0, express_1.Router)({});
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
var AvailableResolution = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
// Middlelewer
var checkValidationTitle = (0, express_validator_1.body)('title').isLength({ min: 3, max: 40 });
exports.videosRouter.get('/', function (req, res) {
    res.send(videos);
});
// Занес в репозиторий---------------------------------
exports.videosRouter.get('/:id', function (req, res) {
    var FoundedVideos = Videos_repository_1.VideosRepository.FindVideosByID(+req.params.id);
    if (!FoundedVideos) {
        res.sendStatus(404);
        return;
    }
    else {
        res.status(200).send(FoundedVideos);
    }
});
// Занес в репозиторий-----------------------------------
exports.videosRouter.post('/', checkValidationTitle, (0, express_validator_1.body)('author').trim().isLength({ min: 3, max: 20 }), 
// можно это все вынести в конст потому что такая же проверка будет в других методах пример сверху
function (req, res) {
    var errors = {
        errorsMessages: []
    };
    var _a = req.body, author = _a.author, title = _a.title, availableResolutions = _a.availableResolutions;
    var PostVideo = Videos_repository_1.VideosRepository.PostNewVideo(req.body.author, req.body.title, req.body.availableResolutions);
    // @ts-ignore
    var missConduction = (0, express_validator_1.validationResult)(req);
    if (!missConduction.isEmpty()) {
        return res.status(400).json('missConduction');
    }
    if (!title || typeof title !== 'string' || !title.trim() || title.trim().length > 40) {
        errors.errorsMessages.push({ message: 'Incorrect title', field: 'title' });
    }
    if (!author || typeof author !== 'string' || !author.trim() || author.trim().length > 20) {
        errors.errorsMessages.push({ message: 'Incorrect author', field: 'author' });
    }
    if (Array.isArray(availableResolutions)) {
        availableResolutions.map(function (r) {
            !AvailableResolution.includes(r) && errors.errorsMessages.push({
                message: "Invalid availableResolutions",
                field: 'availableResolutions'
            });
        });
    }
    else {
        availableResolutions = [];
    }
    if (errors.errorsMessages.length) {
        res.status(400).send(errors);
        return;
    }
    res.send(PostVideo);
    videos.push(PostVideo);
    // videos.push(PostVideo)
    //
    // const createdAt = new Date()
    // const publicationData = new Date()
    // publicationData.setDate(createdAt.getDate()+1)
    // const newVideo: VideoType = {
    //     id: +(new Date()),
    //     canBeDownloaded: false,
    //     minAgeRestriction: null,
    //     createdAt: createdAt.toISOString(),
    //     publicationDate: publicationData.toISOString(),
    //     title,
    //     author,
    //     availableResolutions
    //
    // }
    // videos.push(newVideo)
    // res.status (201).send(newVideo)
});
exports.videosRouter.put("/:id", function (req, res) {
    var id = +req.params.id;
    var error = {
        errorsMessages: []
    };
    var _a = req.body, title = _a.title, author = _a.author, availableResolutions = _a.availableResolutions, canBeDownloaded = _a.canBeDownloaded, minAgeRestriction = _a.minAgeRestriction, publicationDate = _a.publicationDate;
    if (!title || typeof title !== 'string' || !title.trim() || title.trim().length > 40) {
        error.errorsMessages.push({ message: 'Incorrect title', field: 'title' });
    }
    if (!author || typeof author !== 'string' || !author.trim() || author.trim().length > 20) {
        error.errorsMessages.push({ message: 'Incorrect author', field: 'author' });
    }
    if (Array.isArray(availableResolutions)) {
        availableResolutions.map(function (r) {
            !AvailableResolution.includes(r) && error.errorsMessages.push({
                message: "Invalid availableResolutions",
                field: 'availableResolutions'
            });
        });
    }
    else {
        availableResolutions = [];
    }
    if (typeof canBeDownloaded === 'undefined') {
        canBeDownloaded = false;
    }
    if (typeof canBeDownloaded != "boolean") {
        error.errorsMessages.push({
            message: "Invalid canBeDownloaded",
            field: 'canBeDownloaded'
        });
    }
    var dateInspection = (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/gi).test(publicationDate);
    if (typeof publicationDate != "undefined" && !dateInspection) {
        error.errorsMessages.push({
            message: "Invalid publicationDate",
            field: 'publicationDate'
        });
    }
    if (typeof minAgeRestriction !== 'undefined' && typeof minAgeRestriction === "number") {
        minAgeRestriction < 1 || minAgeRestriction > 18 && error.errorsMessages.push({
            message: "Invalid minAgeRestriction",
            field: 'minAgeRestriction'
        });
    }
    else {
        minAgeRestriction = null;
    }
    if (error.errorsMessages.length) {
        res.status(400).send(error);
        return;
    }
    var videoIndex = videos.findIndex(function (v) { return v.id == id; });
    var video = videos.find(function (v) { return v.id === id; });
    if (!video) {
        res.sendStatus(404);
        return;
    }
    var updateItems = __assign(__assign({}, video), { canBeDownloaded: canBeDownloaded, minAgeRestriction: minAgeRestriction, title: title, author: author, publicationDate: publicationDate ? publicationDate : video.publicationDate, availableResolutions: availableResolutions });
    videos.splice(videoIndex, 1, updateItems);
    res.sendStatus(204);
});
exports.videosRouter.delete('/:id', function (req, res) {
    var targetVideos = videos.findIndex(function (v) { return v.id === +req.params.id; });
    videos = videos.filter(function (v) { return v.id !== +req.params.id; });
    if (targetVideos === -1) {
        res.send(404);
        return;
    }
    else {
        res.sendStatus(204);
    }
});
