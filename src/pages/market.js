import React, { useEffect, useState } from "react";

const Market = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Функция для получения данных с API
    const fetchProducts = async () => {
        try {
            const response = await fetch("https://54cc-95-141-140-117.ngrok-free.app/api/products", {method: "POST"});
            const data = await response.json();
            setProducts(data);
            setLoading(false); // После загрузки данных убираем спиннер
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false); // Останавливаем загрузку даже в случае ошибки
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Products</h2>
            {loading ? (
                <p>Loading...</p> // Показать сообщение о загрузке
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

const ProductCard = ({ product }) => {
    return (
        <div className="shadow-lg rounded-lg overflow-hidden w-72">
            {/* Картинка товара */}
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-cover"
            />
            {/* Описание товара */}
            <div className="p-4">
                <h3 className="text-xl font-semibold">{product.title}</h3>
                <p className="mt-2">{product.description}</p>
                <p className="text-lg font-bold mt-4">{product.price} ₽</p>
            </div>
        </div>
    );
};

export default Market;
