import { QueryDto } from '../dto/params.dto';
import { User } from '../entities/User.entity';
import { AppDataSource } from '../utils/data-source';

const userRepository = AppDataSource.getRepository(User);

export const getUserById = async (id: string) => {
    return await userRepository.findOne(
        {
            where: { id },
            relations: { following: true },
        });
}

export const getUsersFriends = async (id: string, orderParams: QueryDto) => {
    return await userRepository.createQueryBuilder('users')
        .where(`users.id IN (
                SELECT "usersId_1"
                FROM users_following_users
                WHERE "usersId_1" IN
                (
                SELECT "usersId_2"
                FROM users_following_users
                WHERE "usersId_1"=:id
                ) AND "usersId_2"=:id
        )`, { id })
        .orderBy(
            orderParams.order_by as string,
            orderParams.order_type?.toUpperCase() as 'ASC' | 'DESC' | undefined)
        .getMany();
}

export const findAndCountUsersWithFollowings = async () => {
    const [users, users_count] = await userRepository.findAndCount({
        where: {
            following: true
        },
        relations: {
            following: true
        }
    })
    return { users, users_count };
}

export const getTopUsersWithMostFollowings = async (limit: number) => {
    return await userRepository.createQueryBuilder('user')
        .select(['id', 'first_name', 'gender'])
        .addSelect('COUNT(users_following.usersId_2)', 'count_followings')
        .innerJoin('users_following_users', 'users_following', 'user.id=users_following.usersId_1')
        .groupBy('user.id')
        .orderBy('count_followings', 'DESC')
        .limit(limit)
        .getRawMany();
}

export const findUsersWithoutFollowings = async () => {
    return await userRepository.createQueryBuilder('users')
        .where(`users.id NOT IN (SELECT DISTINCT "usersId_1"
                FROM users_following_users)`)
        .getMany();
}