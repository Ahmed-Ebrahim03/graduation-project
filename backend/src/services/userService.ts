import User from "../models/user";
import { IUser } from "../models/user";

export type UserCreate = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
}

const userService = {
    createUser: (user: UserCreate): Promise<IUser | null> => {
        return User.create(user);
    },
    findUserByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email });
    },
    findUserByUsername(username: string): Promise<IUser | null> {
        return User.findOne({ username });
    },
}

export default userService;