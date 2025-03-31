import { test, expect } from '@playwright/test';
import { getProductById, getProducts, getProductCategories, getProductsByCategory } from '../api/products.api';

test("should fetch all products successfully", async () => {
    const retryConfig = {
        retry: true,
        retryCount: 3,
        retryDelay: 1000,
        retryCondition: (error: any) => {
            // Retry on network errors or 5xx server errors
            return error.response && error.response.status >= 500;
        },
    };
    const products = await getProducts(retryConfig);

    // Validate the response is an array
    expect(Array.isArray(products)).toBeTruthy();

    // Validate the structure of the first product (if products exist)
    if (products.length > 0) {
        const product = products[0];
        expect(product).toHaveProperty("id");
        expect(product).toHaveProperty("title");
        expect(product).toHaveProperty("price");
        expect(product).toHaveProperty("description");
        expect(product).toHaveProperty("category");
        expect(product).toHaveProperty("image");
    }
});

test("should fetch a product by ID successfully", async () => {
    const productId = 2;
    const retryConfig = {
        retry: true,
        retryCount: 3,
        retryDelay: 1000,
        retryCondition: (error: any) => {
            // Retry on network errors or 5xx server errors
            return error.response && error.response.status >= 500;
        },
    };
    const product = await getProductById(productId,retryConfig);

    // Validate the response is an object
    expect(typeof product).toBe("object");

    // Validate the structure of the product
    expect(product).toHaveProperty("id", productId);
    expect(product).toHaveProperty("title");
    expect(product).toHaveProperty("price");
    expect(product).toHaveProperty("description");
    expect(product).toHaveProperty("category");
    expect(product).toHaveProperty("image");
});

test("should fetch products categories successfully", async () => {
    const retryConfig = {
        retry: true,
        retryCount: 3,
        retryDelay: 1000,
        retryCondition: (error: any) => {
            // Retry on network errors or 5xx server errors
            return error.response && error.response.status >= 500;
        },
    };
    const categories = await getProductCategories(retryConfig);

    // Validate the response is an array
    expect(Array.isArray(categories)).toBeTruthy();

    // Validate the structure of the first category (if categories exist)
    if (categories.length > 0) {
        const category = categories[0];
        expect(typeof category).toBe("string");
    }
});

test("should fetch products by category successfully", async () => {
    const category = "electronics";
    const retryConfig = {
        retry: true,
        retryCount: 3,
        retryDelay: 1000,
        retryCondition: (error: any) => {
            // Retry on network errors or 5xx server errors
            return error.response && error.response.status >= 500;
        },
    };
    const products = await getProductsByCategory(category, retryConfig);
    // Validate the response is an array
    expect(Array.isArray(products)).toBeTruthy();

    // Validate the structure of the first product (if products exist)
    if (products.length > 0) {
        const product = products[0];
        expect(product).toHaveProperty("id");
        expect(product).toHaveProperty("title");
        expect(product).toHaveProperty("price");
        expect(product).toHaveProperty("description");
        expect(product).toHaveProperty("category", category);
        expect(product).toHaveProperty("image");
        expect(product).toHaveProperty("rating");
    }
});

