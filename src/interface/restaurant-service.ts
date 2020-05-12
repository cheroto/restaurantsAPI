import { IRestaurant, INewRestaurant } from "./restaurant";

export interface IRestaurantService {
    getRestaurants(): Promise<IRestaurant[]>;
    getRestaurant(id: string): Promise<IRestaurant>;
    addRestaurant(restaurant: INewRestaurant): Promise<IRestaurant>;
    deleteRestaurant(restaurantId: string): Promise<void>;
    updateRestaurant(restaurant: IRestaurant): Promise<void>;
}
