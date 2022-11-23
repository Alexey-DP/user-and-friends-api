import { validate } from 'class-validator';
import { QueryDto } from './../dto/params.dto';
import { NextFunction, Request, Response } from 'express';
import {
    findAndCountUsersWithFollowings,
    findUsersWithoutFollowings,
    getUserByIdAndSort,
    getUsersFriends
} from '../services/user.service';
import AppError from '../utils/app-error';
import { CONSTANTS } from '../enum/constants.enum';

export const getUsersWithFollowingsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const usersWithFollowings = await findAndCountUsersWithFollowings();

        res.status(200).json(usersWithFollowings);

    } catch (err: any) {
        next(err);
    }
};

export const getUserByIdWithFriendsHandler = async (
    req: Request<{ user_id: string }, {}, {}, QueryDto>,
    res: Response,
    next: NextFunction
) => {
    try {
        const errorsByValidate = await validate(new QueryDto(req?.query?.order_by, req.query?.order_type))
        if (errorsByValidate.length > 0) return res.json(errorsByValidate);

        const { order_by } = req.query || 'id';
        const { order_type } = req.query || 'desc';
        const userId = req.params.user_id;

        const userNeedFriends = await getUserByIdAndSort(userId, { order_by, order_type })

        if (!userNeedFriends) {
            return next(new AppError(404, 'User with that ID not found'));
        }

        const userFollowers = await getUsersFriends(userId);

        if (userFollowers.length === 0
            || userNeedFriends.following.length === 0)
            return res.status(200).json({ ...userNeedFriends, friends: [] })

        const userFollowersIds = userFollowers.reduce((prev: string[], curr) => {
            return [...prev, curr.id]
        }, [])
        const friends = userNeedFriends.following.
            filter(userFollowing => userFollowersIds.includes(userFollowing.id));

        res.status(200).json({ ...userNeedFriends, friends })

    } catch (err: any) {
        next(err);
    }
}

export const getTopUsersWithMostFollowingsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const { users } = await findAndCountUsersWithFollowings()
        const topUsers =
            users.sort((a, b) => b.following.length - a.following.length)
                .slice(0, CONSTANTS.TOP_LIMIT)

        res.status(200).json(topUsers);
    } catch (err: any) {
        next(err);
    }
}

export const getUsersWithoutFollowingsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const usersWithoutFollowings = await findUsersWithoutFollowings();

        res.status(200).json(usersWithoutFollowings);

    } catch (err: any) {
        next(err);
    }
};
