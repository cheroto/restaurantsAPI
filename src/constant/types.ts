const TYPES = {
    RestaurantService: Symbol.for('RestaurantService'),
    RestaurantRepository: Symbol.for('RestaurantRepository'),
    InMemoryDatabase: Symbol.for('InMemoryDatabase'),
    MySQLAdapter: Symbol.for('MySQLAdapter')
}

export default TYPES;