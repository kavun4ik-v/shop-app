export type Product = {
  id: number;
  name: string;
  price: number;
};

export type ProductCardProps = {
  product: Product;
  onAdd: (id: number, quantity: number) => void;
};

export type Shop ={
  id: number;
  name: string;
}