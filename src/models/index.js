const Admin = require("./admin");
const User = require("./user");
const UserFriend = require("./userFriend");
const Video = require("./video");
const Like = require("./video_like");
const Comment = require("./video_comment");
const Post = require("./post");
const Document = require("./document");
const Bio = require("./bio");


/************************* USER ASSOCIATION **********/
{
    // User Comments
    User.hasMany(Comment, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "user_id" });
    Comment.belongsTo(User, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "user_id" });

    // User Likes
    User.hasMany(Like, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "user_id" });
    Like.belongsTo(User, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "user_id" });

    // User Bio
    User.hasMany(Bio, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "user_id" });
    Bio.belongsTo(User, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "user_id" });

    // User Document
    User.hasMany(Document, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "user_id" });
    Document.belongsTo(User, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "user_id" });

    // User and Freinds
    User.belongsToMany(User, { as: "user", through: UserFriend, foreignKey: { name: "user_id", allowNull: true } });
    User.belongsToMany(User, { as: "friend", through: UserFriend, foreignKey: { name: "friend_id", allowNull: true } });

    User.hasMany(UserFriend, { as: "userFriend", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "user_id", allowNull: true } });
    UserFriend.belongsTo(User, { as: "user", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "user_id", allowNull: true } });

    User.hasMany(UserFriend, { as: "friendUser", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "friend_id", allowNull: true } });
    UserFriend.belongsTo(User, { as: "friend", onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: { name: "friend_id", allowNull: true } });
}

/************************* VIDEO ASSOCIATION **********/
{
    // Video
    User.hasMany(Video, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "user_id" });
    Video.belongsTo(User, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "user_id" });

    // Video Likes
    Video.hasMany(Like, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "video_id" });
    Like.belongsTo(Video, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "video_id" });

    // Video Comments
    Video.hasMany(Comment, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "video_id" });
    Comment.belongsTo(Video, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "video_id" });

    // Video Comments
    User.hasMany(Post, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "userId" });
    Post.belongsTo(User, { onDelete: "CASCADE", onUpdate: "CASCADE", foreignKey: "userId" });
}

module.exports = {
    Admin,
    User,
    Video,
    Like,
    Comment,
    UserFriend,
    Post,
    Bio,
    Document
};
