// JWT
import Jwt from 'jsonwebtoken';

// Import Data 
import User from '../models/User.js';
import Employee from '../models/Employee.js';

// Import encryp
import bcryptjs from 'bcryptjs';

// Enviroment
import dotenv from 'dotenv';
dotenv.config({
    path: '.env'
});

const createToken = (_user, secret, expiresIn) => {

    const {
        id,
        user,
        name,
        lastName
    } = _user;

    return Jwt.sign({
        id,
        user,
        name,
        lastName
    }, secret, {
        expiresIn
    });
}

const resolvers = {
    Query: {
        getEmployees: async () => {
            try {
                return await Employee.find({});
            } catch (error) {
                console.log(error);
            }
        },
        getEmployeesById: async (_, {
            id
        }) => {

            const _employee = await Employee.findById({
                _id: id
            });

            if (!_employee) {
                throw new Error('The employee does not exist');
            }

            return _employee;
        },
        getUser: async (_, {}, ctx) => {
            return ctx.user;
        }
    },
    Mutation: {
        newUser: async (_, {
            input
        }) => {

            const {
                user,
                password
            } = input;

            // If user exist
            const userExist = await User.findOne({
                user
            });

            if (userExist) {
                throw new Error('The user is already registered');
            }

            // Hashear password
            const salt = bcryptjs.genSaltSync(10);
            input.password = bcryptjs.hashSync(password, salt);

            // Save User 
            try {
                const newUser = new User(input);
                newUser.save();
                return newUser;
            } catch (error) {
                console.log(error);
            }

        },
        newEmployee: (_, {
            input
        }) => {

            try {
                const newEmployee = new Employee(input);
                newEmployee.save();
                return newEmployee;
            } catch (error) {
                console.log(error);
            }

        },
        editEmployee: async (_, {
            id,
            input
        }) => {

            let _employee = await Employee.findById({
                _id: id
            });

            // Employee not exist
            if (!_employee) {
                throw new Error('The employee does not exist');
            }

            // Save data
            _employee = await Employee.findOneAndUpdate({
                _id: id
            }, input, {
                new: true
            });

            return _employee;

        },
        deleteEmployee: async (_, {
            id
        }) => {

            let _employee = await Employee.findById({
                _id: id
            });

            // Employee not exist
            if (!_employee) {
                throw new Error('The employee does not exist');
            }

            await Employee.findOneAndDelete({
                _id: id
            });

            return 'Eliminated Employee';

        },
        authUser: async (_, {
            input
        }) => {

            const {
                user,
                password
            } = input;

            // User Exist and get user data
            const userExist = await User.findOne({
                user
            });

            if (!userExist) {
                throw new Error('Username does not exist');
            }

            // Verify Password
            const correctPassword = bcryptjs.compareSync(password, userExist.password);

            if (!correctPassword) {
                throw new Error('Password is incorrect ');
            }

            return {
                token: createToken(userExist, process.env.SECRET_WORD, '24h')
            }

        }
    }
};

export default resolvers;