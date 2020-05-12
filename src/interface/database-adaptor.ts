export interface IDatabaseAdaptor {
    get(query: any): Promise<any[]>;
    update(entity: any): Promise<void>;
    delete(entity: any): Promise<void>;
    add(entity: any): Promise<any>;
}