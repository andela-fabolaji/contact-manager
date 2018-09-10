import Contacts from './contacts';
import asyncWrap from './asyncWrap';

const routerFn = router => {
  // main 
  router.route('/')
    .get(asyncWrap(Contacts.index))
    .post(asyncWrap(Contacts.newContact));
  
  // specific resources
  router.route('/:id')
    .get(asyncWrap(Contacts.find))
    .put(asyncWrap(Contacts.update))
    .delete(asyncWrap(Contacts.delete));
  
  // search
  router.get('/search', asyncWrap(Contacts.search));

  // undefined routes
  router.all('*', () => {
    res.status(404).json({ message: 'This route does not exist' });
  });
  
  return router;
};

export default routerFn;