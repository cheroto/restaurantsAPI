import { IRepository } from "../interface/repository";
import { injectable, inject, named } from "inversify";
import TYPES from "../constant/types";
import { IDatabaseAdaptor } from "../interface/database-adaptor";
import { IRestaurant, INewRestaurant } from "../interface/restaurant";
import CONFIG from "../config/config";

@injectable()
export class RestaurantRepository implements IRepository {

    constructor(@inject(TYPES.DatabaseAdapter) @named(CONFIG.DATABASE) private _db: IDatabaseAdaptor) {        
    }

    async get(query: any): Promise<any> {
        return await this._db.get(query);
    }

    async update(query: any): Promise<any> {
        const restaurant: IRestaurant = query;
        return await this._db.update(restaurant);
    }

    async delete(query: any): Promise<any> {
        const id: string = query;
        return await this._db.delete(id);
    }

    async add(query: any): Promise<any> {
        const restaurant: INewRestaurant = query;
        return await this._db.add(restaurant);
    }

}