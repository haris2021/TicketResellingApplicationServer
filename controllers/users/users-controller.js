import * as usersDao from './users-dao.js';

const createUser = async (req, res) => {
    const newUser = await usersDao.createUser(req.body);
    res.json(newUser);
}

const findAllUsers = async (req, res) => {
    const users = await usersDao.findAllUsers();
    res.json(users);
}

const findUserById = async (req, res) => {

    const userId = req.params['userId'];
 /*   const userId = req.params['_id'];
    console.log(userId);*/
    const user = await usersDao.findUserById(userId);
    res.json(user);

}

const findUserByUsername = async (req, res) => {

    console.log("Called",  req.params['Username']);
    const username = req.params['Username'];
    const user = await usersDao.findUserByUsername(username);
    console.log("Got info", user);
    res.json(user);
}

const updateUser = async (req, res) => {
    console.log("is it coming");
    const userId = req.params['userId'];
    const user = req.body;
    const status = await usersDao.updateUser(userId, user);
    console.log("From server ", userId);
    console.log("From", user);
    console.log("From", status);

    if (status.modifiedCount === 1) {
        console.log("All good");
        res.json(user);
    } else {
        res.sendStatus(502);
    }
}

const deleteUser = async (req, res) => {

    console.log("Inside delete server method", req.params);

    const userId = req.params['userId'];
    const status = await usersDao.deleteUser(userId);
    if (status.deletedCount === 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(502);
    }
}


const register = async (req, res) => {

    const username = req.body['Username'];

    console.log("Inside Server for creating user"+ username);

    const user = await usersDao.findUserByUsername(username);
    if (user) {
        res.sendStatus(409);
        return
    }
    const newUser = await usersDao.createUser(req.body);
    req.session['currentUser'] = newUser;
    res.json(newUser);
}



const login = async (req, res) => {

    const username = req.body['Username'];
    const password = req.body['Password'];

    const user = await usersDao.findUserByCredentials(username, password);

    if (user) {
        req.session['currentUser'] = user;
        res.json(user);
    } else {
        console.log("Here")
        res.sendStatus(404);
    }
    console.log("Current user in cookies" + req.session.currentUser);
};

const logout = async (req, res) => {

    console.log("Logged out function in server!" + req.session.currentUser );

    /*if (req.session.currentUser) {
        console.log("If called")
        console.log(req.session);
        console.log(req.session.currentUser);
        res.sendStatus(404);
        return
    }*/

    console.log("Destroyed");
    req.session.destroy();
    res.sendStatus(200);
};


const profile = async (req, res) => {

    const currentUser = req.session['currentUser'];
    console.log("currentuser", currentUser);

    if (!currentUser) {
        console.log("Inside 404");
        res.sendStatus(404);
        return
    }
    res.json(currentUser);

};

export default (app) => {

    app.post('/api/users/logout', logout);
    app.get('/api/users/profile', profile);
    app.post('/api/users', createUser);
    app.get('/api/users', findAllUsers);
    app.get('/api/users/:userId', findUserById);
    app.get('/api/users/find/:Username', findUserByUsername);
    app.put('/api/users/:userId', updateUser);
    app.delete('/api/users/:userId', deleteUser);
    app.post('/api/users/register', register);
    app.post('/api/users/user/login', login);



}

