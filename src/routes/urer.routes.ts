import express from 'express';
import {
    getTopUsersWithMostFollowingsHandler,
    getUserByIdWithFriendsHandler,
    getUsersWithFollowingsHandler,
    getUsersWithoutFollowingsHandler
} from '../controller/user-controller';

const router = express.Router();

router
    .get('/', getUsersWithFollowingsHandler)
    .get('/:user_id/friends', getUserByIdWithFriendsHandler)
    .get('/max-following', getTopUsersWithMostFollowingsHandler)
    .get('/not-following', getUsersWithoutFollowingsHandler)

export default router;