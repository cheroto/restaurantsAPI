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
        return this._restaurantService.getRestaurants();
    }

    @httpDelete('/:id')
    async deleteRestaurant(req: Request): Promise<void> {
        return this._restaurantService.deleteRestaurant(req.params.id);
    }

    @httpPost('/')
    async addRestaurant(req: Request): Promise<IRestaurant> {
        const restaurant = req.body as INewRestaurant;
        return this._restaurantService.addRestaurant(restaurant);
    }

    @httpPut('/:id')
    async updateRestaurant(req: Request): Promise<void> {
        const restaurant = req.body as IRestaurant;
        if (restaurant.id === +req.params.id) {
            this._restaurantService.updateRestaurant(restaurant);
        } else {
            console.error('RestaurantController.updateRestaurant: Restaurant ID does not match endpoint id.');
        }
    }
}