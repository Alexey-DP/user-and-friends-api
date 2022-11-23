import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../entities/User.entity';
import { setUserFollowings } from './helper/setUserFolluwings';

export default class FollowingSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const userRepository = dataSource.getRepository(User);
        const allUsers = await userRepository.find({ relations: { following: true } })
        const allUsersWithNewFollowings = setUserFollowings(allUsers)
        await userRepository.save(allUsersWithNewFollowings);
    }
}