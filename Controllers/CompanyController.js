const {Company} = require('../Models/Company')
class CompanyController{ 
  static addNewCompany =async (req, res) => {
    try {
      const newCompany = new Company(
        null,
        req.body.name,
        req.body.website,
        req.body.logo,
        req.body.description,
        req.body.location,
        req.body.industry,
        req.body.owner_user_id,
      );

      const created = await Company.create(newCompany);
      if (created) {
        res.status(201).json({ message: 'Company created successfully' });
      } else {
        res.status(500).json({ message: 'Error creating company' });
      }
    } catch (error) {
      console.error('Error creating company:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  static updateCompany = async (req, res) => {
    const companyId = req.params.companyId;

    try {
      const companyToUpdate = {
        name: req.body.name,
        website: req.body.website,
        logo: req.body.logo,
        description: req.body.description,
        location: req.body.location,
        industry: req.body.industry,
        owner_user_id: req.body.owner_user_id,
      };

      const updated = await Company.Update(companyToUpdate, companyId);
      if (updated) {
        res.status(200).json({ message: 'Company updated successfully' });
      } else {
        res.status(404).json({ message: 'Company not found' });
      }
    } catch (error) {
      console.error('Error updating company:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  static deleteCompany = async (req, res) => {
    const companyId = req.params.companyId;

    try {
      const deleted = await Company.delete(companyId);
      if (deleted) {
        res.status(200).json({ message: 'Company deleted successfully' });
      } else {
        res.status(404).json({ message: 'Company not found' });
      }
    } catch (error) {
      console.error('Error deleting company:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  static getAllcompanies = async (req, res) => {
    try {
      const companies = await Company.getAll();
      res.status(200).json(companies);
    } catch (error) {
      console.error('Error getting all companies:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  static getSpecificCompany =async (req, res) => {
  const companyId = req.params.companyId;

  try {
    const company = await Company.getOnecompany(companyId);
    if (company) {
      res.status(200).json(company);
    } else {
      res.status(404).json({ message: 'Company not found' });
    }
  } catch (error) {
    console.error('Error getting company:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
}


module.exports = CompanyController;
