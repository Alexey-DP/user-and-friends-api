import { QueryDto } from '../dto/params.dto';
import { User } from '../entities/User.entity';
import { UserGender } from '../enum/user-gender.enum';
import { AppDataSource } from '../utils/data-source';

const userRepository = AppDataSource.getRepository(User);

export const getUserByIdAndSort = async (id: string, orderParams: QueryDto) => {
    return await userRepository.findOne(
        {
            where: { id },
            relations: { following: true },
            order: {
                following: { [orderParams.order_by as string]: orderParams.order_type }
            }
        });
}

export const getUsersFriends = async (id: string) => {
    return await userRepository.find({ where: { following: { id } } })
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

export const findUsersWithoutFollowings = async () => {
    const users = await userRepository.find({ relations: { following: true } })

    return users.filter(user => user.following.length === 0);
}