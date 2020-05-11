export interface IRestaurant {
    id: number;
    name: string;
    address?: string;
    rating?: number;
}

export interface INewRestaurant {
    name: string;
    address?: string;
    rating?: number;
}
