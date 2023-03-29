const joi = require('joi');

const createVideo = {
    body: joi.object({
        description: joi.string().optional(),
        section: joi.string().optional(),
        privacy_type: joi.string().optional(),
        allow_comments: joi.string().optional(),
        allow_duet: joi.string().optional(),
        block: joi.string().optional(),
        duet_video_id: joi.string().optional(),
        duration: joi.string().optional(),
        promote: joi.string().optional(),
    }),
};

const updateVideo = {
    body: joi.object({
        description: joi.string().optional(),
        section: joi.string().optional(),
        privacy_type: joi.string().optional(),
        allow_comments: joi.string().optional(),
        allow_duet: joi.string().optional(),
        block: joi.string().optional(),
        duet_video_id: joi.string().optional(),
        duration: joi.string().optional(),
        promote: joi.string().optional(),
    }),
    params: joi.object({
        id: joi.number().required(),
    }),
};

const getVideos = {
    query: joi.object({
        limit: joi.number().optional(),
        page: joi.number().optional(),
        id: joi.number().optional(),
    }),
};

const deleteVideo = {
    params: joi.object({
        id: joi.number().required(),
    }),
};

module.exports = {
    createVideo,
    getVideos,
    updateVideo,
    deleteVideo,
}