import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../entities/User.entity';
import { UserGender } from '../../enum/user-gender.enum';
import { randomizer } from '../helper/randomizer';

export const UserFactory = setSeederFactory(User, (faker) => {
    const random = randomizer(-5, 5) > 0;
    const user = new User();
    user.first_name = faker.name.firstName(random ? 'male' : 'female');
    user.gender = random ? UserGender.MALE : UserGender.FEMALE;
    return user;
})