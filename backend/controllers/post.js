const Post = require('../models/Post')
const User = require('../models/User')
const fs = require('fs')

exports.createPost = (req, res, next) => {
    let post
    if (req.auth.userRole === 'admin') {
        res.status(403).json({ message: 'Unauthorized request' })
    } else {
        if (req.file) {
            post = new Post({
                ...req.body,
                userId: req.auth.userId,                                                        // + authenticated userID
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,   // setting the full path to the image
            })
        } else {
            post = new Post({
                ...req.body,
                userId: req.auth.userId
            })
        }

        // initializing the likes/dislikes
        post.likes = 0
        post.usersLiked = []

        post.creationDate = new Date()

        post.save()
            .then(() => { res.status(201).json({ message: 'Post enregistré' }) })
            .catch((error) => { res.status(400).json({ error }) })
    }
}

exports.getAllPosts = (req, res, next) => {
    Post.find()
        .sort({ creationDate: -1 })
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            res.status(200).json(post)
        })
        .catch((error) => {
            res.status(404).json({ error: error })
        })
}

exports.modifyPost = (req, res, next) => {
    const postObject = (req.file)
        ? {                                              // if user changes the image
              ...req.body,
              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
          } : { ...req.body }                            // if no image change, just processes request body

    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (
                post.userId != req.auth.userId &&
                req.auth.userRole != 'admin'
            ) {
                res.status(403).json({ message: 'Unauthorized request' })
            } else {
                if (post.imageUrl && (!req.file || post.imageUrl)) {
                    const oldImage = 'images/' + post.imageUrl.split('/')[4]
                    fs.unlink(oldImage, (err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                }
                // console.log(...postObject)
                Post.updateOne(
                    { _id: req.params.id },
                    { ...postObject, _id: req.params.id }
                )
                    .then(() => {
                        res.status(201).json({
                            message: 'Post updated successfully!',
                        })
                    })
                    .catch((error) => {
                        res.status(400).json({ error })
                    })
            }
        })
        .catch((error) => {
            res.status(408).json({ error })
        })
}

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (
                post.userId != req.auth.userId &&
                req.auth.userRole != 'admin'
            ) {
                res.status(403).json({ message: 'Unauthorized request' })
            } else {
                if (post.imageUrl) {
                    const oldImage = 'images/' + post.imageUrl.split('/')[4]
                    fs.unlink(oldImage, (err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                }
                Post.deleteOne({ _id: req.params.id })
                    .then(() => {
                        res.status(200).json({ message: 'Deleted!' })
                    })
                    .catch((error) => {
                        res.status(400).json({ error: error })
                    })
            }
        })
        .catch((error) => {res.status(400).json({ error: error })
        })
}

exports.likePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (req.auth.userRole === 'admin') {
                res.status(403).json({ message: 'Unauthorized request' })
            } else {
                switch (req.body.like) {
                    case '1':                                                                           // user likes post
                        if (post.usersLiked.findIndex((userId) => userId == req.body.userId) == -1) {   // checking if user already liked the post in usersLiked array
                            post.likes++                                                                // if not, incrementing the post number of likes
                            post.usersLiked.push(req.auth.userId)                                       // and pushing the userId in the usersLiked array
                        }

                        break
                    case '0':                                                                           // user "un"likes post
                        let index = post.usersLiked.findIndex((userId) => userId == req.body.userId)    // checking if user already liked the post
                        if (index != -1) {
                            post.likes--                                                                // if yes, decrementing the post number of likes
                            post.usersLiked.splice(index, 1)                                            // and retrieving the userId from the array
                        }
                        break
                    default:
                        console.log('error : malfunction in post rating')
                        res.status(400).json({ message: 'malfunction in post rating' })
                        break
                }
                post.save()
                    .then(() => {
                        res.status(201).json({ message: 'Post updated successfully!' })
                    })
                    .catch((error) => { res.status(400).json({ error }) })
            }
        })
        .catch((error) => res.status(404).json({ error }))
}
