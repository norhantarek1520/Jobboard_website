const {Category} = require('../Models/Category')
const uuid = require('uuid'); // Example UUID library
const crypto = require('crypto');
class CategoryController{
  
  static getAllCategories = async (req, res) => {
    try {
      const categories = await Category.getAll();
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error getting all categories:', error);
     res.status(500).json({ message: 'Internal server error' , Error : error});
    }
  }
  static getSpecificCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
  
    try {
      const category = await Category.getOneCategory(categoryId);
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch (error) {
      console.error('Error getting category:', error);
     res.status(500).json({ message: 'Internal server error' , Error : error});
    }
  }
  static deleteCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
  
    try {
      const deleted = await Category.delete(categoryId);
      if (deleted) {
        res.status(200).json({ message: 'Category deleted successfully' });
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch (error) {
      console.error('Error deleting category:', error);
     res.status(500).json({ message: 'Internal server error' , Error : error});
    }
  }
  static updateCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
  
    try {
      const categoryToUpdate = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
      };
  
      const updated = await Category.update(categoryToUpdate, categoryId);
      if (updated) {
        res.status(200).json({ message: 'Category updated successfully' });
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ message: 'Internal server error' , Error : error});
    }
  }
  static addNewCategory = async (req, res) => {
    try {
      //const id = uuid.v4(); // Generate a UUID
      
      const newCategory = new Category(crypto.randomBytes(16), req.body.title , req.body.description, req.body.image);
     
      const created = await Category.create(newCategory);
      if (created) {
        res.status(201).json({ message: 'Category created successfully' });
      } else {
        res.status(500).json({ "message": 'Error creating category' , "Error" : created});
      }
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ message: 'Internal server error' , Error : error });
    }
  }
  static getJobsInSpecificCategory =async()=>{
    res.json("hi")
  }

}
module.exports = CategoryController