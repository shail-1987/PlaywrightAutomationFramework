import {faker} from '@faker-js/faker';

export class UserBuilder {
    private user:any;

    constructor() {
        this.user = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            telephone: faker.string.numeric(10),
            password: faker.internet.password()
        };
    }

    build() {
        return this.user;
    }
}