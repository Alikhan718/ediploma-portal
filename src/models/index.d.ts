import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type RestaurantMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserRestaurantMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Restaurant {
  readonly id: string;
  readonly restaurant_id: string;
  readonly userrestaurants?: (UserRestaurant | null)[] | null;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Restaurant, RestaurantMetaData>);
  static copyOf(source: Restaurant, mutator: (draft: MutableModel<Restaurant, RestaurantMetaData>) => MutableModel<Restaurant, RestaurantMetaData> | void): Restaurant;
}

export declare class User {
  readonly id: string;
  readonly username: string;
  readonly Restaurants?: (UserRestaurant | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class UserRestaurant {
  readonly id: string;
  readonly restaurant: Restaurant;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<UserRestaurant, UserRestaurantMetaData>);
  static copyOf(source: UserRestaurant, mutator: (draft: MutableModel<UserRestaurant, UserRestaurantMetaData>) => MutableModel<UserRestaurant, UserRestaurantMetaData> | void): UserRestaurant;
}