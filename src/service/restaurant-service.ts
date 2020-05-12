import { IRestaurantService } from "../interface/restaurant-service";
import { IRestaurant, INewRestaurant } from "../interface/restaurant";
import { injectable, inject, named } from "inversify";
import TYPES from "../constant/types";
import { IRepository } from "../interface/repository";

@injectable()
export class RestaurantService implements IRestaurantService {

    constructor(@inject(TYPES.RestaurantRepository) @named(TYPES.RestaurantRepository) private _restaurantRepository: IRepository) {      
    }

    async getRestaurants(): Promise<IRestaurant[]> {
        return await this._restaurantRepository.get({});
    }

    async getRestaurant(id: string): Promise<IRestaurant> {
        return (await this._restaurantRepository.get(id))[0];
    }

    async addRestaurant(restaurant: INewRestaurant): Promise<IRestaurant> {
        return await this._restaurantRepository.add(restaurant);
    }

    async deleteRestaurant(id: string): Promise<void> {        
        return await this._restaurantRepository.delete(id);
    }

    async updateRestaurant(restaurant: IRestaurant): Promise<void> {
        return await this._restaurantRepository.update(restaurant);
    }

}