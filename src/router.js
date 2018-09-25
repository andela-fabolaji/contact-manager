import Contacts from './contacts';
import Categories from './categories';
import asyncWrap from './asyncWrap';

const routerFn = router => {
  // main 
  router.get('/', (req, res) => {
    res.status(200).send({ message: 'Contact Manager 1.0' });
  });

  router.route('/categories')
    .get(asyncWrap(Categories.index))
    .post(asyncWrap(Categories.newCategory));
  
  router.route('/categories/:id')
    .get(asyncWrap(Categories.find))
    .put(asyncWrap(Categories.update))
    .delete(asyncWrap(Categories.delete));

  // Contacts
  router.route('/contacts')
    .get(asyncWrap(Contacts.index))
    .post(asyncWrap(Contacts.newContact));

  // search
  router.get('/contacts/search', asyncWrap(Contacts.search));
  
  // specific resources
  router.route('/contacts/:id')
    .get(asyncWrap(Contacts.find))
    .put(asyncWrap(Contacts.update))
    .delete(asyncWrap(Contacts.delete));

  // undefined routes
  router.all('*', () => {
    res.status(404).json({ message: 'This route does not exist' });
  });
  
  return router;
};

export default routerFn;