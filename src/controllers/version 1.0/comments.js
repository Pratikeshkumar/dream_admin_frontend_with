const { PostComment, PostCommentReply, CommentLike, User, Video } = require('../../models');
const logger = require('../../utils/logger');
const errorHandler = require('../../utils/errorObject')



const createComment = async (req, res, next) => {
  logger.info('INFO -> COMMENT CREATION API CALLED')
  try {
    let { id, email } = req.userData;
    let {
      video_id,
      comment_data,
    } = req.body;
    const user_id = id;
    const likes = 0;

    let comment = await PostComment.create({
      user_id,
      video_id,
      comment_data,
      likes
    })
    if (!comment) throw errorHandler('error while creating the comment')
    comment = JSON.parse(JSON.stringify(comment))
    res.status(201).json({
      message: 'successfully created',
      ...comment
    })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ response: 'error occured' })
  }
}


const fetchComment = async (req, res, next) => {
  logger.info('INFO -> GET ALL COMMENT OF POST CALLED');
  try {
    const { postId } = req.params;

    const comments = await PostComment.findAll({
      where: { video_id: postId },
      include: [
        {
          model: PostCommentReply,
          as: 'replies',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'username', 'profile_pic', 'nickname'],
            },
            {
              model: Video,
              as: 'video',
              attributes: ['id', 'description', 'thum'],
            },
          ],
        },
        {
          model: CommentLike,
          as: 'comment_likes',
          include: [
            {
              model: User,
              as: 'sender', 
              attributes: ['id', 'username', 'profile_pic', 'nickname'],
            },
          ],
        },
        {
          model: User,
          as: 'user', 
          attributes: ['id', 'username', 'profile_pic', 'nickname'],
        },
        {
          model: Video,
          as: 'video',
          attributes: ['id', 'description', 'thum'],
        },
      ],
    });
    logger.info('INFO -> COMMENTS FETCHED SUCCESSFULLY');
    return res.status(200).json({ comments });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ response: 'An error occurred while processing the request.' });
  }
};




const replyComment = async (req, res, next) => {
  logger.info('INFO -> COMMENT REPLY API CALLED')
  try {
    let { id, email } = req.userData;
    let user_id = id, likes = 0;
    const {
      video_id,
      parent_comment_id,
      reply_message
    } = req.body;

    let comment_reply = PostCommentReply.create({
      user_id,
      video_id,
      parent_comment_id,
      reply_message,
      likes
    })
    if(!comment_reply) throw errorHandler("error while creating the reply comment")
    res.status(201).json({
      message: 'replied successfully',
      ...comment_reply
    })

  } catch (error) {
    logger.error(error)
    res.status(500).json({ response: 'error occured' })
  }

}

const likeComment = async (req, res, next) => {
  logger.info('INFO -> COMMENT LIKE API CALLED');
  try {
    const { id, email } = req.userData;
    const sender_id = id;
    const { video_id, reciever_id, comment_id } = req.body;
    console.log(comment_id)

    const db = await CommentLike.sync()
    const existingLike = await CommentLike.findOne({
      where: {
        sender_id: sender_id,
        comment_id: comment_id,
      },
    });

    if (existingLike) {
      return res.status(200).json({ message: 'You have already liked this comment.' });
    }

    const newLike = await CommentLike.create({
      video_id: video_id,
      reciever_id: reciever_id,
      sender_id: sender_id,
      comment_id: comment_id,
    });

    const comment = await PostComment.findByPk(comment_id);
    if (comment) {
      const newLikesCount = comment.likes + 1;
      await comment.update({ likes: newLikesCount });
    }

    logger.info('INFO -> COMMENT LIKED SUCCESSFULLY');
    return res.status(200).json({ message: 'Comment liked successfully.', like: newLike });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ response: 'An error occurred while processing the request.' });
  }
};




const unlikeComment = async (req, res, next) => {
  logger.info('INFO -> COMMENT UNLIKE API CALLED');
  try {
    const { id } = req.userData;
    const sender_id = id;
    const { comment_id } = req.body;

    const existingLike = await CommentLike.findOne({
      where: {
        sender_id: sender_id,
        comment_id: comment_id,
      },
    });

    if (!existingLike) {
      return res.status(200).json({ message: 'You have not liked this comment.' });
    }

    await existingLike.destroy();

    const comment = await PostComment.findByPk(comment_id);
    if (comment && comment.likes > 0) {
      const newLikesCount = comment.likes - 1;
      await comment.update({ likes: newLikesCount });
    }

    logger.info('INFO -> COMMENT UNLIKED SUCCESSFULLY');
    return res.status(200).json({ message: 'Comment unliked successfully.' });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ response: 'An error occurred while processing the request.' });
  }
};

const editComment = async (req, res, next) => {
  logger.info("INFO -> COMMENT EDITING API CALLED");
  try {
    const { comment_id, new_comment_data } = req.body;
    const { id: userId } = req.userData; 
    const existingComment = await PostComment.findByPk(comment_id);

    if (!existingComment) {
      return res.status(404).json({ message: 'Comment not found.' });
    }

    if (existingComment.user_id !== userId) {
      return res.status(403).json({ message: 'You are not authorized to edit this comment.' });
    }

    await existingComment.update({ comment_data: new_comment_data });

    logger.info("INFO -> COMMENT EDITED SUCCESSFULLY");
    return res.status(200).json({ message: 'Comment edited successfully.', comment: existingComment });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ response: 'An error occurred while processing the request.' });
  }
};


const deleteComment = async (req, res, next) => {
  logger.info('INFO -> COMMENT DELETING API CALLED');
  try {
    const { comment_id } = req.body;
    const { id: userId } = req.userData; 

    const existingComment = await PostComment.findByPk(comment_id, {
      include: [
        {
          model: PostCommentReply,
          as: 'parentComment', 
        },
        {
          model: CommentLike,
          as: 'comment', 
        },
      ],
    });

    if (!existingComment) {
      return res.status(404).json({ message: 'Comment not found.' });
    }

    if (existingComment.user_id !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this comment.' });
    }

    await existingComment.destroy({ cascade: true });

    logger.info('INFO -> COMMENT DELETED SUCCESSFULLY');
    return res.status(200).json({ message: 'Comment and associated replies and likes deleted successfully.' });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ response: 'An error occurred while processing the request.' });
  }
};



module.exports = {
  createComment,
  replyComment,
  likeComment,
  unlikeComment,
  editComment,
  deleteComment,
  fetchComment
}