// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Restaurant, User, UserRestaurant } = initSchema(schema);

export {
  Restaurant,
  User,
  UserRestaurant
};