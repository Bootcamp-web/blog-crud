import test from 'ava';
import mongoose from 'mongoose';
import { DB_URL } from '../config';
import { checkPassword, createUser, deleteUser } from '../domain/user.domain';


test.beforeEach(async (t) => {
    await mongoose.connect(DB_URL).then(() => {
        console.log("test db connectd")
    });
})




test("createUser test", async (t) => {
    const data = {
        username: "patri.carrasco@gmail.com",
        plainPassword: "12341234"
    };
    await deleteUser(data.username);
    const user = await createUser(data.username, data.plainPassword);
    console.log(user);
    t.true(checkPassword(user, data.plainPassword));
})