const util = require('util');
const { connectDb } = require('../Database/connect_db'); // Assuming a valid database connection module

class User {
    constructor(id, gender, role, name, email, password, address = null, education = null, jobTitle = null, image = null, age = null, phoneNumber = null) {
        this.id = id;
        this.gender = gender;
        this.role = role;
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address;
        this.education = education;
        this.jobTitle = jobTitle;
        this.image = image;
        this.age = age;
        this.phoneNumber = phoneNumber;
    }
    static async query(sql, ...params) {
        const promisifiedQuery = util.promisify(connectDb.query).bind(connectDb);
        try {
            return await promisifiedQuery(sql, params);
        } catch (error) {
            console.error('Error executing query:', error);
            throw error; // Re-throw for potential error handling
        }
    }
    static async create(userObj) {
        try {
            const result = await this.query(
                `INSERT INTO users SET ?`,
                userObj
            );
            return result.affectedRows === 1;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
    static async update(userObj) {
        try {
            const result = await this.query(
                `UPDATE users SET gender = ?, role = ?, name = ?, email = ?, password = ?, address = ?, education = ?, job_title = ?, image = ?, age = ?, phone_number = ? WHERE id = ?`,
                [
                    userObj.gender,
                    userObj.role,
                    userObj.name,
                    userObj.email,
                    userObj.password,
                    userObj.address,
                    userObj.education,
                    userObj.jobTitle,
                    userObj.image,
                    userObj.age,
                    userObj.phoneNumber,
                    userObj.id
                ]
            );

            return result.affectedRows === 1; // Return boolean for success
        } catch (error) {
            console.error('Error updating user:', error);
            throw error; // Re-throw for potential error handling
        }
    }
    static async delete(userId) {
        try {
            const result = await this.query(`DELETE FROM users WHERE id = ?`, userId);
            return result.affectedRows === 1;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
    static async getAll() {
        try {
            const result = await this.query('SELECT * FROM users');
            return result || [];
        } catch (error) {
            console.error('Error getting all users:', error);
            throw error;
        }
    }
    static async getById(userId) {
        try {
            const result = await this.query(`SELECT * FROM users WHERE id = ?`, userId);
            return result[0] || null;
        } catch (error) {
            console.error('Error getting user by ID:', error);
            throw error;
        }
    }
    static async getByEmail(email) {
        try {
            const result = await this.query(`SELECT * FROM users WHERE email = ?`, email);
            return result[0] || null;
        } catch (error) {
            console.error('Error getting user by email:', error);
            throw error;
        }
    }
    static async isEmailExists(email) {
        try {
            const checkEmailExists = await this.query(`select * from users where email = \"${email}"`);
            if (checkEmailExists.length > 0) { return true } else { return false; }
        } catch (error) { console.error(error); throw error; }



    }
    static async getIdByEmail(email) {
        try {
            const result = await this.query(`select id from users where email = \"${email}"`);
            if (result.length === 0) { return []; } else { result[0].id }
        } catch (error) { console.error(error); throw error; }

    }
    static async isAdmin(email) {
        try {
            const user = await this.query("select role from users where email = ? ", [email]);
            if (user[0].role === 'Admin') { return true; } return false;
        } catch (error) { console.error(error); throw error; }
    }
    static async comparePasswprd(email, password) {
        try {

            const userPassword = await this.query(`select password from users where email = \"${email}"`);
            const checkPassword = await bcrypt.compare(password, userPassword[0].password);
            return checkPassword;
        } catch (error) { console.error(error); throw error; }


    }


}
module.exports = {User}