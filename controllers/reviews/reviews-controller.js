import * as reviewsDao from './reviews-dao.js';

const createReview = async (req, res) => {
    const newReview = await reviewsDao.createReview(req.body);
    res.json(newReview);
}

const findAllReviews = async (req, res) => {
    const reviews = await reviewsDao.findAllReviews();
    res.json(reviews);
}

const findReviewById = async (req, res) => {
    const reviewId = req.params['reviewId'];
    const reviewRet = await reviewsDao.findReviewById(reviewId);
    res.json(reviewRet);
}

const findReviewsByEventId = async (req, res) => {
    const eventId = req.params['eventId'];
    console.log(eventId);
    const reviews = await reviewsDao.findReviewsByEventId(eventId);
    res.json(reviews);
}

const findReviewsByUserId = async (req, res) => {
    const userId = req.params['userId'];
    const reviews = await reviewsDao.findReviewsByUserId(userId);
    res.json(reviews);
}

const updateReview = async (req, res) => {
    const reviewId = req.params['reviewId'];
    const review = req.body;
    const status = await reviewsDao.updateReview(reviewId, review);
    if (status.modifiedCount === 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(502);
    }
}

const deleteReview = async (req, res) => {
    const reviewId = req.params['reviewId'];
    const status = await reviewsDao.deleteReview(reviewId);
    if (status.deletedCount === 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(502);
    }
}

export default (app) => {
    app.post('/api/reviews', createReview);
    app.get('/api/reviews', findAllReviews);
    app.get('/api/reviews/:reviewId', findReviewById);
    app.get('/api/reviews/event/:eventId', findReviewsByEventId);
    app.get('/api/reviews/user/:userId', findReviewsByUserId);
    app.put('/api/reviews/:reviewId', updateReview);
    app.delete('/api/reviews/:reviewId', deleteReview);
}

