export interface IDatabaseAdaptor {
    get(): Promise<any[]>;
    update(entity: any): Promise<void>;
    delete(entity: any): Promise<void>;
    add(entity: any): Promise<any>;
}