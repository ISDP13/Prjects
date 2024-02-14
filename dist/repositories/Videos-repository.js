"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosRepository = void 0;
const AvailableResolution = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
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
exports.VideosRepository = {
    FindVideosByID(id) {
        let FindVideo = videos.find(v => v.id === id);
        return FindVideo;
    },
    PostNewVideo(title, author, availableResolutions) {
        const createdAt = new Date();
        const publicationData = new Date();
        publicationData.setDate(createdAt.getDate() + 1);
        let NewVideo = {
            id: (+new Date()),
            createdAt: createdAt.toISOString(),
            publicationDate: publicationData.toISOString(),
            canBeDownloaded: false,
            minAgeRestriction: null,
            title,
            author,
            availableResolutions
        };
        return (NewVideo);
    }
};
