import { controller, httpGet } from "inversify-express-utils";
import { IRestaurant } from "../interface/restaurant";
import { inject } from "inversify";
import TYPES from "../constant/types";
import { IRestaurantService } from "../interface/restaurant-service";

@controller('/restaurants')
export class RestaurantsController {
    constructor(@inject(TYPES.RestaurantService) private _restaurantService: IRestaurantService) {        
    }

    @httpGet('/')
    async getRestaurants(): Promise<IRestaurant[]> {
        return this._restaurantService.getRestaurants();
    }
}