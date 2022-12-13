import { validate } from 'class-validator';
import { QueryDto } from './../dto/params.dto';
import { NextFunction, Request, Response } from 'express';
import {
    findAndCountUsersWithFollowings,
    findUsersWithoutFollowings,
    getTopUsersWithMostFollowings,
    getUserById,
    getUsersFriends
} from '../services/user.service';
import AppError from '../utils/app-error';
import { CONSTANTS } from '../enum/constants.enum';
import { User } from '../entities/User.entity';

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
        const errorsByValidate = await validate(
            new QueryDto(req?.query?.order_by, req.query?.order_type))
        if (errorsByValidate.length > 0) return res.status(400).json(errorsByValidate);

        const { order_by } = req.query || 'id';
        const { order_type } = req.query || 'desc';
        const userId = req.params.user_id;

        const currentUser = await getUserById(userId)

        if (!currentUser) {
            return next(new AppError(404, 'User with that ID not found'));
        }

        let friends: User[] = [];

        if (currentUser.following.length <= 0) {
            res.status(200).json({ ...currentUser, friends })
        }

        friends = await getUsersFriends(userId, { order_by, order_type })

        res.status(200).json({ ...currentUser, friends })

    } catch (err: any) {
        next(err);
    }
}

export const getTopUsersWithMostFollowingsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const topUsers = await getTopUsersWithMostFollowings(CONSTANTS.TOP_LIMIT);
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