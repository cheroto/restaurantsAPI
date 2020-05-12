import { IDatabaseAdaptor } from "../interface/database-adaptor";
import { IRestaurant } from "../interface/restaurant";
import restaurants = require('../assets/mocks/restaurants.json');
import { injectable } from "inversify";

@injectable()
export class InMemoryDatabase implements IDatabaseAdaptor {
    restaurants: IRestaurant[];

    constructor() {
        this.restaurants = restaurants;
    }

    async get(query: any): Promise<IRestaurant[]> {
        console.info('InMemoryDatabase.get(): Restaurants retrieved succesfully');
        if (typeof(query) === 'string') {
            return Promise.resolve(this.restaurants.filter((r) => r.id === +query ));
        } else {
            return Promise.resolve(this.restaurants);
        }
    }

    async update(restaurant: IRestaurant): Promise<void> {
        const index = this.restaurants.findIndex(r => r.id == restaurant.id);
        if (index < 0) {
            console.error('InMemoryDatabase.update(): Restaurant not found.');
        } else {
            this.restaurants[index] = restaurant;
            console.info('InMemoryDatabase.update(): Restaurant updated succesfully');
        }
    }

    async delete(id: IRestaurant): Promise<void> {
        const index = this.restaurants.findIndex(r => r.id === +id);
        if (index < 0) {
            console.error('InMemoryDatabase.delete(): Restaurant does not exist.');
        } else {
            this.restaurants.splice(index, 1);
            console.info('InMemoryDatabase.delete(): Restaurant deleted succesfully.');
        }
    }

    async add(restaurant: IRestaurant): Promise<IRestaurant> {
        if (this.restaurants.findIndex(r => r.name === restaurant.name) < 0) {
            let id = 0;
            this.restaurants.map(restaurant => {
                if (restaurant.id > id) id += 1;
            });
            restaurant.id = id + 1;
            this.restaurants.push(restaurant);
            console.info('InMemoryDatabase.add(): Restaurant added succesfully.');
            return restaurant;
        } else {
            console.error('InMemoryDatabase.add(): Restaurant already exists.');
            return {
                error: {
                    message: "Restaurant already exists."
                }
            } as any;
        }
    }
}