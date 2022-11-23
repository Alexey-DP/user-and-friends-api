import { User } from '../../entities/User.entity';
import { CONSTANTS } from '../../enum/constants.enum';
import { randomizer } from './randomizer';

export const setUserFollowings = (users: User[]): User[] => {
    const usersWithFollowings: User[] = [];

    users.forEach((user: User) => {
        const randomNum = randomizer(0, CONSTANTS.FOLLOWINGS_LIMIT - 1);
        const newFriends = users.slice(0, randomNum).filter(friend => friend.id !== user.id);
        const userWithNewFriends = user;
        userWithNewFriends.following = newFriends;

        usersWithFollowings.push(userWithNewFriends);
    })

    const randomUserIndex = randomizer(0, CONSTANTS.FOLLOWINGS_LIMIT - 1)
    usersWithFollowings[randomUserIndex].following = [];

    return usersWithFollowings;
}