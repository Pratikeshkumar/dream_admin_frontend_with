const Admin = require("./admin");
const User = require("./user");
const UserFriend = require("./userFriend");
const Video = require("./video");
const Like = require("./video_like");
const Comment = require("./video_comment");
const Post = require("./post");

// Video
User.hasMany(Video, { foreignKey: "user_id" });
Video.belongsTo(User, { foreignKey: "user_id" });

//user Comments
User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

// User Likes
User.hasMany(Like, { foreignKey: "user_id" });
Like.belongsTo(User, { foreignKey: "user_id" });

// Freinds
User.belongsToMany(User, { as: "user", through: UserFriend, foreignKey: { name: "user_id", allowNull: true } });
User.belongsToMany(User, { as: "friend", through: UserFriend, foreignKey: { name: "friend_id", allowNull: true } });

// Video Likes
Video.hasMany(Like, { foreignKey: "video_id" });
Like.belongsTo(Video, { foreignKey: "video_id" });

// Video Comments
Video.hasMany(Comment, { foreignKey: "video_id" });
Comment.belongsTo(Video, { foreignKey: "video_id" });

// Video Comments
User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });


module.exports = {
    Admin,
    User,
    Video,
    Like,
    Comment,
    UserFriend,
    Post
};
