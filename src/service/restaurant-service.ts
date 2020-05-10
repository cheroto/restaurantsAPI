import { IRestaurantService } from "../interface/restaurant-service";
import { IRestaurant } from "../interface/restaurant";
import { injectable } from "inversify";
import restaurants = require('../assets/mocks/restaurants.json');

@injectable()
export class RestaurantService implements IRestaurantService {
    getRestaurants(): Promise<IRestaurant[]> {
        return Promise.resolve(restaurants);
    }
}