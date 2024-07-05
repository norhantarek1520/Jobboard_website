const util = require('util');
const { connectDb } = require('../Database/connect_db'); 

class JobApplication {
  constructor(id, status, userID, jobID, cv, portfolio, appliedOn, createdAt, updatedAt) {
    this.id = id;
    this.status = status;
    this.userID = userID;
    this.jobID = jobID;
    this.cv = cv;
    this.portfolio = portfolio;
    this.appliedOn = appliedOn;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async create(jobApplicationObj) {
    try {
      const result = await this.query(
        `INSERT INTO jobapplications SET ?`,
        jobApplicationObj
      );

      return result.affectedRows === 1; // Return boolean for success
    } catch (error) {
      console.error('Error creating job application:', error);
      throw error; // Re-throw for potential error handling
    }
  }
  static async update(jobApplicationObj) {
    try {
      const result = await this.query(
        `UPDATE jobapplications SET status = ?, cv = ?, portfolio = ? WHERE id = ?`,
        [jobApplicationObj.status, jobApplicationObj.cv, jobApplicationObj.portfolio, jobApplicationObj.id]
      );

      return result.affectedRows === 1; // Return boolean for success
    } catch (error) {
      console.error('Error updating job application:', error);
      throw error; // Re-throw for potential error handling
    }
  }
  static async delete(applicationId) {
    try {
      const result = await this.query(`DELETE FROM jobapplications WHERE id = ?`, applicationId);
      return result.affectedRows === 1; // Return boolean for success
    } catch (error) {
      console.error('Error deleting job application:', error);
      throw error; // Re-throw for potential error handling
    }
  }
  static async getAll() {
    try {
      const result = await this.query('SELECT * FROM jobapplications');
      return result || []; // Return empty array if no results
    } catch (error) {
      console.error('Error getting all job applications:', error);
      throw error; // Re-throw for potential error handling
    }
  }
  static async getById(applicationId) {
    try {
      const result = await this.query(`SELECT * FROM jobapplications WHERE id = ?`, applicationId);
      return result[0] || null; // Return single object or null for clarity
    } catch (error) {
      console.error('Error getting one job application:', error);
      throw error; // Re-throw for potential error handling
    }
  }
  static async getByUserID(userID) {
    try {
      const result = await this.query(`SELECT * FROM jobapplications WHERE userID = ?`, userID);
      return result || []; // Return empty array if no results
    } catch (error) {
      console.error('Error getting applications by user ID:', error);
      throw error; // Re-throw for potential error handling
    }
  }
  static async getByJobID(jobID) {
    try {
      const result = await this.query(`SELECT * FROM jobapplications WHERE jobID = ?`, jobID);
      return result || []; // Return empty array if no results
    } catch (error) {
      console.error('Error getting applications by job ID:', error);
      throw error; // Re-throw for potential error handling
    }
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
}

module.exports = {JobApplication};
