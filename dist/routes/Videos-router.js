"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const Videos_repository_1 = require("../repositories/Videos-repository");
const express_validator_1 = require("express-validator");
exports.videosRouter = (0, express_1.Router)({});
let videos = [
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
const AvailableResolution = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
// Middlelewer
const checkValidationTitle = (0, express_validator_1.body)('title').isLength({ min: 3, max: 40 });
exports.videosRouter.get('/', (req, res) => {
    res.send(videos);
});
// Занес в репозиторий---------------------------------
exports.videosRouter.get('/:id', (req, res) => {
    let FoundedVideos = Videos_repository_1.VideosRepository.FindVideosByID(+req.params.id);
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
(req, res) => {
    const errors = {
        errorsMessages: []
    };
    let { author, title, availableResolutions } = req.body;
    let PostVideo = Videos_repository_1.VideosRepository.PostNewVideo(req.body.author, req.body.title, req.body.availableResolutions);
    // @ts-ignore
    const missConduction = (0, express_validator_1.validationResult)(req);
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
        availableResolutions.map(r => {
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
exports.videosRouter.put(`/:id`, (req, res) => {
    const id = +req.params.id;
    let error = {
        errorsMessages: []
    };
    let { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;
    if (!title || typeof title !== 'string' || !title.trim() || title.trim().length > 40) {
        error.errorsMessages.push({ message: 'Incorrect title', field: 'title' });
    }
    if (!author || typeof author !== 'string' || !author.trim() || author.trim().length > 20) {
        error.errorsMessages.push({ message: 'Incorrect author', field: 'author' });
    }
    if (Array.isArray(availableResolutions)) {
        availableResolutions.map(r => {
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
    const dateInspection = (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/gi).test(publicationDate);
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
    const videoIndex = videos.findIndex(v => v.id == id);
    const video = videos.find(v => v.id === id);
    if (!video) {
        res.sendStatus(404);
        return;
    }
    const updateItems = Object.assign(Object.assign({}, video), { canBeDownloaded,
        minAgeRestriction,
        title,
        author, publicationDate: publicationDate ? publicationDate : video.publicationDate, availableResolutions });
    videos.splice(videoIndex, 1, updateItems);
    res.sendStatus(204);
});
exports.videosRouter.delete('/:id', (req, res) => {
    const targetVideos = videos.findIndex(v => v.id === +req.params.id);
    videos = videos.filter(v => v.id !== +req.params.id);
    if (targetVideos === -1) {
        res.send(404);
        return;
    }
    else {
        res.sendStatus(204);
    }
});
