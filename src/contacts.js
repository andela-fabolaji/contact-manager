import { Contact } from './db';

class Contacts {
  /**
   * loads all contacts
   * @param {object} req 
   * @param {object} res 
   * @param {function} next
   */
  static async index(req, res, next) {
    try {
      const contacts = await Contact.find({}).exec();
      let response = {
        message: 'Contacts successfully retrieved',
        data: contacts,
        count: contacts.length
      };

      if (!contacts.length) response.message = 'You currently have no contacts';
      
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
  static async newContact(req, res, next) {
    try {
      let newContact = new Contact(req.body);
      newContact = await newContact.save();

      if (newContact) {
        res.status(201).send({
          message: 'New contact added!',
          data: newContact
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
      let contact = await Contact.findById(req.params.id).exec();
      if (contact) {
        res.status(200).send({
          message: 'Contact found',
          data: contact
        });
      } else {
        res.status(200).send({
          message: 'Contact not found',
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
      const updatedContact = await Contact.findOneAndUpdate({ _id: req.params.id }, req.body);
      
      if (updatedContact) {
        res.status(200).send({
          message: 'Successfully updated',
          data: updatedContact
        });
      } else {
        res.status(404).send({
          message: 'Contact not found',
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
      const deleted = await Contact.findOneAndRemove({ _id: req.params.id });
      
      if (deleted) {
        res.status(200).send({
          message: 'Successfully removed',
          data: deleted
        });
      } else {
        res.status(404).send({
          message: 'Contact not found',
        });
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * finds contacts based on search parameters
   * @param {object} req 
   * @param {object} res 
   * @param {function} next
   */
  static async search(req, res, next) {
    try {
      const { query, options } = Contacts.queryBuilder(req.query);
      const result = await Contact.find(query, null, options).exec();

      if (result) {
        res.status(200).send({
          message: 'Search completed',
          result,
          count: result.length
        });
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * 
   * @param {object} req 
   * @returns {object} query
   */
  static queryBuilder(query) {
    const params = {
      q: query.q || null,
      sortby: query.sortBy || 'createdAt',
      order: query.order || 'asc',
      limit: query.limit || 5
    };

    return {
      query: {
        $or: [
          { name: { $regex: `${params.q}`, $options: 'g' } },
          { email: { $regex: `${params.q}`, $options: 'g' } }
        ]
      },
      options: {
        limit: params.limit,
        sort: {
          [params.sortby]: params.order
        }
      }
    };
  }
}

export default Contacts;
