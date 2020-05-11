export interface IRepository {
    get(query: any): Promise<any>;
    update(query: any): Promise<any>;
    delete(query: any): Promise<any>;
    add(query: any): Promise<any>;
}