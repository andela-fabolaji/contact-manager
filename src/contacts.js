import { Contact } from './db';

class Contacts {
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

  static async search(req, res, next) {
    res.send('search');
  }
}

export default Contacts;
