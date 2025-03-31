import { apiRequest, RetryConfig } from "../../../shared/api/apiRequest";

export async function getProducts(retryConfig?: RetryConfig) {
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        ...retryConfig
    }
    return await apiRequest("get", "https://fakestoreapi.com/products", config);
}

export async function getProductById(productId:number, retryConfig?: RetryConfig) {
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        ...retryConfig
    }
    return await apiRequest("get", `https://fakestoreapi.com/products/${productId}`, config);
}

export async function getProductCategories(retryConfig?: RetryConfig) {
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        ...retryConfig
    }
    return await apiRequest("get", `https://fakestoreapi.com/products/categories`, config);
}

export async function getProductsByCategory(category:string, retryConfig?: RetryConfig) {
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        ...retryConfig
    }
    return await apiRequest("get", `https://fakestoreapi.com/products/category/${category}`, config);
}