const util = require('util');
const { connectDb } = require('../Database/connect_db'); // Assuming a valid database connection module

class Job {
  constructor(id, title, job_type, owner, experience, location, image, published_on, deadline, qualifications, responsibility, vacancy, salary, category_id) {
    this.id = id;
    this.title = title;
    this.job_type = job_type;
    this.owner = owner;
    this.experience = experience;
    this.location = location;
    this.image = image;
    this.published_on = published_on;
    this.deadline = deadline;
    this.qualifications = qualifications;
    this.responsibility = responsibility;
    this.vacancy = vacancy;
    this.salary = salary;
    this.category_id = category_id;
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

  static async create(jobObj) {
    try {
      const result = await this.query(`INSERT INTO jobs SET ?`, jobObj);
      return result.affectedRows === 1;
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  }

  static async update(jobObj) {
    try {
      const result = await this.query(
      `UPDATE jobs SET title = '${jobObj.title}',
      job_type = '${jobObj.job_type}', 
      owner = '${jobObj.owner}', 
      experience = ${jobObj.experience},
      location = '${jobObj.location}',
      image = '${jobObj.image}',
      deadline = '${jobObj.deadline}',
      qualifications = '${jobObj.qualifications}', 
      responsibility = '${jobObj.responsibility}',
      vacancy = ${jobObj.vacancy},
      salary = ${jobObj.salary}, 
      category_id = ${jobObj.category_id}
      WHERE id = ${jobObj.id}`);

      return result.affectedRows === 1;
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  }

  static async delete(jobId) {
    try {
      const result = await this.query(`DELETE FROM jobs WHERE id = ?`, jobId);
      return result.affectedRows === 1;
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  }

  static async getAll() {
    try {
      const result = await this.query('SELECT * FROM jobs');
      return result || [];
    } catch (error) {
      console.error('Error getting all jobs:', error);
      throw error;
    }
  }

  static async getById(jobId) {
    try {
      const result = await this.query(`SELECT * FROM jobs WHERE id = ?`, jobId);
      return result[0] || null;
    } catch (error) {
      console.error('Error getting one job:', error);
      throw error;
    }
  }



}

module.exports = { Job };
