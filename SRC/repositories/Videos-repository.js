"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosRepository = void 0;
var AvailableResolution = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
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
exports.VideosRepository = {
    FindVideosByID: function (id) {
        var FindVideo = videos.find(function (v) { return v.id === id; });
        return FindVideo;
    },
    PostNewVideo: function (title, author, availableResolutions) {
        var createdAt = new Date();
        var publicationData = new Date();
        publicationData.setDate(createdAt.getDate() + 1);
        var NewVideo = {
            id: (+new Date()),
            createdAt: createdAt.toISOString(),
            publicationDate: publicationData.toISOString(),
            canBeDownloaded: false,
            minAgeRestriction: null,
            title: title,
            author: author,
            availableResolutions: availableResolutions
        };
        return (NewVideo);
    }
};
