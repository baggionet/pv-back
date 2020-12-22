import { Router } from 'express';
import { user, roll } from '../controllers';


const router = Router();

/* Users */ 
router.route('/user').post(user.userAdd);
router.route('/user').get(user.list);
router.route('/user/:userId').get(user.byid);
router.route('/user/:userId').delete(user.remove);
router.route('/user/:userId').put(user.update);
router.route('/login').post(user.login);

/* roll */ 
router.route('/roll').post(roll.rollAdd);
router.route('/roll').get(roll.list);


export default router;