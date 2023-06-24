export interface Product {
    _id?: any;
    img: string;
    name: string;
    description: string;
    category: string; // Tipo auto, pickup, etc(lo pide en el tp)/clasificación
    price: number;
}



// TAMBIEN PODRIA HACER ESTO
/*export class Product {
    name: string;
    img: string;
    description: string;
    category: string;
    price: number;

    constructor(name: string, img: string, description: string, category: string, price: number ){
        this.name = name;
        this.img = img;
        this.description = description;
        this.category = category;
        this.price = price;
    }
}*/



