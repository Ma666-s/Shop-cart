export interface AllOrders {
  count: number;
  _id: string;
  product: Product;
  price: number;
  status: string;
}

export interface Product {
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Category;
  ratingsAverage: number;
  id: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}