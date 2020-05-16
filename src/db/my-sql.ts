import "reflect-metadata";
import {createConnection, Connection, Repository} from "typeorm";
import { IRestaurant, INewRestaurant } from "../interface/restaurant";
import { Restaurant } from "../entity/restaurant";
import { IDatabaseAdaptor } from "../interface/database-adaptor";
import { injectable } from "inversify";

@injectable()
export class MySQLAdapter implements IDatabaseAdaptor {
    private connection: Connection;
    private restaurantRepo: Repository<Restaurant>;

    constructor() {
        console.info('Creating connection on mySQL Database.');
        createConnection().then(async connection => {
            this.connection = connection;
            this.restaurantRepo = await this.connection.getRepository(Restaurant);
            console.info('Connection Created!');
        })
        .catch(error => {
            console.error('Connection attempt has failed! Error: ' + error);
        }); 
    }

    async get(query: any): Promise<IRestaurant[]> {
        let options = {};
        if (typeof(query) === 'string') options['id'] = +query;
        const restaurants = await this.connection.manager.find(Restaurant, options);
        console.info('MySQLAdapter.get(): Restaurants retrieved succesfully');
        return restaurants;
    }

    async update(restaurant: IRestaurant): Promise<void> {
        let restaurantEntity = (await this.restaurantRepo.findOneOrFail(restaurant.id));
        if (restaurantEntity) {
            restaurantEntity = restaurant;
            await this.restaurantRepo.save(restaurantEntity);
            console.error('InMemoryDatabase.update(): Restaurant updated succesfully.');
        } else {
            console.info('InMemoryDatabase.update(): Restaurant not found.');
        }
    }

    async delete(id: IRestaurant): Promise<void> {
        let restaurant = await this.restaurantRepo.findOne(id);
        if (!restaurant) {
            console.error('InMemoryDatabase.delete(): Restaurant does not exist.');
        } else {
            console.info('InMemoryDatabase.delete(): Restaurant deleted succesfully.');
            this.restaurantRepo.remove(restaurant);
        }
    }

    async add(restaurant: INewRestaurant): Promise<IRestaurant> {
        let insertedRestaurant: Restaurant;
        const existingRestaurant = await (await this.restaurantRepo.find({name: restaurant.name, address: restaurant.address}));
        if (existingRestaurant.length === 0) {
            insertedRestaurant = await this.restaurantRepo.save(restaurant);
            console.info('InMemoryDatabase.add(): Restaurant added succesfully.');
        } else {
            console.error('InMemoryDatabase.add(): Restaurant already exists.');
            insertedRestaurant = {
                error: {
                    message: "Restaurant already exists."
                }
            } as any;
        }
        return insertedRestaurant;
    }
}
