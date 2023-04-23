import * as followersDao from './followers-dao.js';

const createFollower = async (req, res) => {
    const follower = req.body;
    const insertedFollower = await followersDao.createFollower(follower)
    res.json(insertedFollower)
}

const findAllFollowers = async (req, res) => {
    const followers = await followersDao.findAllFollowers()
    res.json(followers)
}

const findFollowerById = async (req, res) => {
    const followerId = req.params['followerId']
    const follower = await followersDao.findFollowerById(followerId)
    res.json(follower)
}

const findAllFollowersByUserId = async (req, res) => {
    const UserId = req.params['UserId']
    const followers = await followersDao.findAllFollowersByUserId(UserId)
    res.json(followers)
}

const findAllFollowingByUserId = async (req, res) => {
    console.log("Inside find all followingby ID");
    const UserId = req.params['UserId']
    const following = await followersDao.findAllFollowingByUserId(UserId)
    console.log(following);
    res.json(following)
}

const updateFollower = async (req, res) => {
    const followerId = req.params['followerId']
    const follower = req.body
    const status = await followersDao.updateFollower(followerId, follower)
    if (status.modifiedCount === 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(502);
    }
}

const deleteFollower = async (req, res) => {
    const followerId = req.params['followerId']
    const status = await followersDao.deleteFollower(followerId)
    if (status.deletedCount === 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(502);
    }
}

// “Following” is the term for the users who you follow.
// "Followers" are the users who follow you.

export default (app) => {
    app.post('/api/followers', createFollower)
    app.get('/api/followers', findAllFollowers)
    app.get('/api/followers/:followerId', findFollowerById)
/*
    app.get('/api/followers/follower/:UserId', findAllFollowersByUserId)
*/
    app.get('/api/followers/following/:UserId', findAllFollowingByUserId)
    app.put('/api/followers/:followerId', updateFollower)
    app.delete('/api/followers/:followerId', deleteFollower)
}