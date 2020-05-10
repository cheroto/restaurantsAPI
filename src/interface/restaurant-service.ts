import { IRestaurant } from "./restaurant";

export interface IRestaurantService {
    getRestaurants(): Promise<IRestaurant[]>;
}
