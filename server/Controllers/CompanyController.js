const {Company} = require('../Models/Company')
const asyncHandler = require('express-async-handler');
const ApiError = require('../Shared/ApiError');
class CompanyController{ 
  
  static addNewCompany =  asyncHandler( async (req, res,next) => {
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
      return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));
    }
  })
  static updateCompany =  asyncHandler( async (req, res,next) => {
    const companyId = req.params.companyId;
    if( companyId == ':companyId' )  {return next(new ApiError(`Select the company (enter companyId) `, 404));}
  
    try {
      const companyToUpdate = {
        name: req.body.name,
        website: req.body.website,
        logo: "req.body.logo",
        description: req.body.description,
        location: req.body.location,
        industry: req.body.industry,
        // owner_user_id: req.body.owner_user_id,
        owner_user_id: 1, // this will be updated
      
        id:companyId
      };

      const updated = await Company.Update(companyToUpdate);
      if (updated) {
        res.status(200).json({ message: 'Company updated successfully' });
      } else {
        res.status(404).json({ message: 'Company not found' });
      }
    } catch (error) {
      return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));
    }
  })
  static deleteCompany =  asyncHandler( async (req, res,next) => {
    const companyId = req.params.companyId;
    if( companyId == ':companyId' )  {return next(new ApiError(`Select the company (enter companyId) `, 404));}
  
    try {
      const deleted = await Company.delete(companyId);
      if (deleted) {
        res.status(204).json({ message: 'Company deleted successfully' });
      } else {
        res.status(404).json({ message: 'Company not found' });
      }
    } catch (error) {
      return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));
    }
  })
  static getAllcompanies =  asyncHandler( async (req, res,next) => {
    try {
      const companies = await Company.getAll();
      res.status(200).json({length: companies.length , companies : companies});
    } catch (error) {
      return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));
    }
  })
  static getSpecificCompany = asyncHandler( async (req, res,next) => {
  const companyId = req.params.companyId;
  if( companyId == ':companyId' )  {return next(new ApiError(`Select the company (enter companyId) `, 404));}
  
  try {
    const company = await Company.getById(companyId);
    if (company) {
      res.status(200).json(company);
    } else {
      res.status(404).json({ message: 'Company not found' });
    }
  } catch (error) {
    return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));
  }
})
}


module.exports = CompanyController;
