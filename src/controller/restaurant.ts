import { controller, httpGet, httpDelete, httpPut, httpPost } from "inversify-express-utils";
import { IRestaurant, INewRestaurant } from "../interface/restaurant";
import { inject } from "inversify";
import TYPES from "../constant/types";
import { IRestaurantService } from "../interface/restaurant-service";
import { Request } from 'express';


@controller('/restaurants')
export class RestaurantsController {
    constructor(@inject(TYPES.RestaurantService) private _restaurantService: IRestaurantService) {
    }

    @httpGet('/')
    async getRestaurants(): Promise<IRestaurant[]> {
        return await this._restaurantService.getRestaurants();
    }

    @httpGet('/:id')
    async getRestaurant(req: Request): Promise<IRestaurant> {
        return await this._restaurantService.getRestaurant(req.params.id);
    }

    @httpDelete('/:id')
    async deleteRestaurant(req: Request): Promise<void> {
        return await this._restaurantService.deleteRestaurant(req.params.id);
    }

    @httpPost('/')
    async addRestaurant(req: Request): Promise<IRestaurant> {
        const restaurant = req.body as INewRestaurant;
        return await this._restaurantService.addRestaurant(restaurant);
    }

    @httpPut('/')
    async updateRestaurant(req: Request): Promise<void> {
        const restaurant = req.body as IRestaurant;
        await this._restaurantService.updateRestaurant(restaurant);
    }
}