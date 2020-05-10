import { Container } from "inversify";
import { IRestaurantService } from "./interface/restaurant-service";
import { RestaurantService } from "./service/restaurant-service";
import TYPES from "./constant/types";

// load everything needed to the Container
let container = new Container();
container.bind<IRestaurantService>(TYPES.RestaurantService).to(RestaurantService);

export default container;