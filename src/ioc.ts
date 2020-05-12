import { Container } from "inversify";
import { IRestaurantService } from "./interface/restaurant-service";
import { RestaurantService } from "./service/restaurant-service";
import TYPES from "./constant/types";
import { IRepository } from "./interface/repository";
import { RestaurantRepository } from "./repository/restaurant-repository";
import { InMemoryDatabase } from "./db/in-memory";
import { IDatabaseAdaptor } from "./interface/database-adaptor";

// load everything needed to the Container
let container = new Container();
container.bind<IRestaurantService>(TYPES.RestaurantService).to(RestaurantService);
container.bind<IRepository>(TYPES.RestaurantRepository).to(RestaurantRepository).whenTargetNamed(TYPES.RestaurantRepository);
container.bind<IDatabaseAdaptor>(TYPES.DatabaseAdapter).to(InMemoryDatabase).inSingletonScope();

export default container;