import { Category } from './db';

class Categories {
  /**
   * loads all contacts
   * @param {object} req 
   * @param {object} res 
   * @param {function} next
   */
  static async index(req, res, next) {
    try {
      const categories = await Category.find({}).exec();
      let response = {
        message: 'Categories successfully retrieved',
        data: categories,
        count: categories.length
      };

      if (!categories.length) response.message = 'You currently have no categories';
      
      res.status(200).send(response);
      
    } catch (err) {
      next(err);
    }
  }

  /**
   * creates a new contact
   * @param {object} req 
   * @param {object} res 
   * @param {function} next
   */
  static async newCategory(req, res, next) {
    try {
      let newCategory = new Category(req.body);
      newCategory = await newCategory.save();

      if (newCategory) {
        res.status(201).send({
          message: 'New Category added!',
          data: newCategory
        });
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * finds a single contact by id
   * @param {object} req 
   * @param {object} res 
   * @param {function} next
   */
  static async find(req, res, next) {
    try {
      let category = await Category.findById(req.params.id).exec();
      if (category) {
        res.status(200).send({
          message: 'Category found',
          data: category
        });
      } else {
        res.status(200).send({
          message: 'Category not found',
        });
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * updates a contact
   * @param {object} req 
   * @param {object} res 
   * @param {function} next
   */
  static async update(req, res, next) {
    try {
      const updatedCategory = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
      
      if (updatedCategory) {
        res.status(200).send({
          message: 'Successfully updated',
          data: updatedCategory
        });
      } else {
        res.status(404).send({
          message: 'Category not found',
        });
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * deletes a contact
   * @param {object} req 
   * @param {object} res 
   * @param {function} next
   */
  static async delete(req, res, next) {
    try {
      const deleted = await Category.findOneAndRemove({ _id: req.params.id });
      
      if (deleted) {
        res.status(200).send({
          message: 'Successfully removed',
          data: deleted
        });
      } else {
        res.status(404).send({
          message: 'Category not found',
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

export default Categories;
