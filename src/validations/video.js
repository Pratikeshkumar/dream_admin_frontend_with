const joi = require('joi');

const uploadVideo = {
    body: joi.object({
        mediaType: joi.string().optional(),
        postedDateTime: joi.string().optional(),
        commentsEnabled: joi.string().optional(),
        cover: joi.string().optional(),
        tags: joi.string().optional(),
        postedDateTime: joi.date().optional(),

    }),
};

const updateVideo = {
    body: joi.object({
        mediaType: joi.string().optional(),
        postedDateTime: joi.string().optional(),
        commentsEnabled: joi.string().optional(),
        cover: joi.string().optional(),
        tags: joi.string().optional(),
        postedDateTime: joi.date().optional(),
    }),
    params: joi.object({
        id: joi.number().required(),
    }),
};

const getVideo = {
    query: joi.object({
        limit: joi.number().optional(),
        page: joi.number().optional(),
        video_id: joi.number().optional(),
    }),
};

const deleteVideo = {
    params: joi.object({
        id: joi.number().required(),
    }),
};

const likeVideo = {
    params: joi.object({
        video_id: joi.number().optional(),
    }),
};

const commentVideo = {
    body: joi.object({
        comment: joi.string().optional(),
    }),
    params: joi.object({
        video_id: joi.number().optional(),
    }),
};
const replyComment = {
    body: joi.object({
        comment_id: joi.number().optional(),
        reply: joi.string().optional(),
    }),
    params: joi.object({
        video_id: joi.number().optional(),
    }),
};



module.exports = {
    uploadVideo,
    getVideo,
    updateVideo,
    deleteVideo,
    likeVideo,
    commentVideo,
    replyComment,
}