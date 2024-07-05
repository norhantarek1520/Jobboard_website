const util = require('util')
const { connectDb } = require('../Database/connect_db')
class Category {
    constructor(id, title, description, image) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
    }
    static async query(sql, ...params) {
        const promisifiedQuery = util.promisify(connectDb.query).bind(connectDb);
        try {
          return await promisifiedQuery(sql, params);
        } catch (error) {
          console.error('Error executing query:', error);
          throw error; 
        }
      }

    static async create(category_obj) {
        try {
            const result = await this.query(`insert into categories set ?`, category_obj)
            if (result.affectedRows === 1) { return true; } else { return false; }
        } catch (error) {
            console.log("Error in Creating cagegory \n ", error);
            throw error;
        }

    }
    static async Update(category_obj) {
        try {
            const result = await this.query(`UPDATE categories SET title = ? ,description = ? , image = ? where  id=? `,
                [category_obj.title, category_obj.description, category_obj.image, category_obj.id])
            if (result.affectedRows === 1) { return true; } else { return false; }
        } catch (error) {
            console.log("Error in Updateing cageory " + error);
            throw error
        }

    }
    static async delete(category_id) {
        try {
            const result = await this.query(`Delete from categories where id = ${category_id}`)
            if (result.affectedRows === 1) { return true; } else { return false; }
        } catch (error) {
            console.log("Error in delte this category " + error)
            throw error
        }

    }
    static async getAll() {
        try {
            const result = await this.query("SELECT * FROM categories");
            return result || []
        } catch (error) {
            console.log("Error in Geting all cagegories " + error)
            throw error
        }

    }
    static async getOneCategory(category_id) {
        try {
            const result = await this.query(`SELECT * FROM categories where id =${category_id}`);
            return result[0] || []
        } catch (error) {
            console.log("Error in get one caregory " + error)
            throw error

        }


    }
    static async JobsInOneCategory(category_id) {
        try {

            const result = await this.query(`SELECT  j.id,  j.title FROM jobs j INNER JOIN categories c ON j.category = c.title where c.id = ${category_id}`)
            return result || []

        } catch (error) { console.error(error); throw error; }

    }
}
module.exports = {Category}