const { connectDb } = require('../Database/connect_db')
const util = require('util')

class Company {
    constructor(id, name, website, logo, description, location, industry, owner_user_id) {
        this.id = id,
            this.name = name,
            this.website = website,
            this.logo = logo,
            this.description = description,
            this.location = location,
            this.industry = industry,
            this.owner_user_id = owner_user_id
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
    static async create(company_obj) {
        try {
            const result = await this.query(`insert into company_info set ?`, company_obj)
            if (result.affectedRows === 1) { return true; } else { return false; }
        } catch (error) {
            console.log("Error in Creating company \n ", error);
            throw error;
        }

    }
    static async Update(company_obj) {
        try {
            const result = await this.query(`UPDATE company_info SET  name = ? , website = ? , logo = ? , description = ? , location = ? , industry = ? , owner_user_id = ?  where  id=? `,
                [company_obj.name, company_obj.website, company_obj.logo, company_obj.description, company_obj.location, company_obj.industry, company_obj.owner_user_id, company_obj.id])
            if (result.affectedRows === 1) { return true; } else { return false; }
        } catch (error) {
            console.log("Error in Updateing company " + error);
            throw error
        }

    }
    static async delete(company_id) {
        try {
            const result = await this.query(`Delete from company_info where id = ${company_id}`)
            if (result.affectedRows === 1) { return true; } else { return false; }
        } catch (error) {
            console.log("Error in delte this company " + error)
            throw error
        }

    }
    static async getAll() {
        try {
            const result = await this.query("SELECT * FROM company_info");
            return result || []
        } catch (error) {
            console.log("Error in Geting all companies info " + error)
            throw error
        }

    }
    static async getOnecompany(company_id) {
        try {
            const result = await this.query(`SELECT * FROM company_info where id =${company_id}`);
            return result[0] || []
        } catch (error) {
            console.log("Error in get one company " + error)
            throw error

        }


    }

}
module.exports = {Company}