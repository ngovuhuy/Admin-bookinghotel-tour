interface IProduct{
    id: number;
    productName: string;
    quantity: number;
    categoryId: number;
    category: {
        categoryId: number;
        categoryName: string;
    }
}