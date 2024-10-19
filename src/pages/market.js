import React from "react";

const products = [
    {
        id: 1,
        title: "Product 1",
        description: "This is a description for Product 1.",
        price: "$19.99",
        imageUrl: "https://via.placeholder.com/300x400.png?text=Product+1" // Замените на реальные URL картинок
    },
    {
        id: 2,
        title: "Product 2",
        description: "This is a description for Product 2.",
        price: "$29.99",
        imageUrl: "https://via.placeholder.com/300x400.png?text=Product+2"
    },
    {
        id: 3,
        title: "Product 3",
        description: "This is a description for Product 3.",
        price: "$39.99",
        imageUrl: "https://via.placeholder.com/300x400.png?text=Product+3"
    }
];

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-72">
            {/* Картинка товара */}
            <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-64 object-cover"
            />
            {/* Описание товара */}
            <div className="p-4">
                <h3 className="text-xl font-semibold">{product.title}</h3>
                <p className="mt-2">{product.description}</p>
                <p className="text-lg font-bold mt-4">{product.price}</p>
            </div>
        </div>
    );
};

const ProductsPage = () => {
    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
