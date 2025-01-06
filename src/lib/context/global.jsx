import { createContext, useContext, useEffect, useState } from "react";
import { databases } from "../appwrite";
import { ID, Query } from "appwrite";

export const DATABASE_ID = import.meta.env.VITE_APPRITE_DATABASE_ID;
export const IDEAS_COLLECTION_ID = import.meta.env
  .VITE_APPWRITE_IDEAS_COLLECTION_ID;
export const PRODUCTS_COLLECTION_ID = import.meta.env
  .VITE_APPWRITE_PRODUCTS_COLLECTION_ID;
export const CATEGORIES_COLLECTION_ID = import.meta.env
  .VITE_APPWRITE_CATEGORIES_COLLECTION_ID;

const GlobalContext = createContext();

export function useGlobal() {
  return useContext(GlobalContext);
}

export function GlobalProvider(props) {
  const [ideas, setIdeas] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  async function AddProduct(product) {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        ID.unique(),
        product
      );
      setProducts((products) => [response, ...products]);
    } catch (err) {
      console.log(err);
    }
  }

  async function AddCategory(category) {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        CATEGORIES_COLLECTION_ID,
        ID.unique(),
        category
      );
      setCategories((categories) => [response, ...categories]);
    } catch (err) {
      console.log(err);
    }
  }

  async function EditProduct(id, product) {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        id,
        product
      );
      setProducts((products) =>
        products.map((product) => (product.$id === id ? response : product))
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function RemoveProduct(id) {
    try {
      await databases.deleteDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, id);
      setProducts((products) =>
        products.filter((product) => product.$id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function EditCategory(category) {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        CATEGORIES_COLLECTION_ID,
        category.$id,
        {
          title: category.title,
          description: category.description,
        }
      );
      setCategories((categories) =>
        categories.map((cat) => (cat.$id === category.$id ? response : cat))
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function GetSingleCategory(id) {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        CATEGORIES_COLLECTION_ID,
        id
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async function DeleteCategory(id) {
    try {
      await databases.deleteDocument(DATABASE_ID, CATEGORIES_COLLECTION_ID, id);
      setCategories(
        (categories) => categories.filter((category) => category.$id !== id),
        await init()
      );
    } catch (err) {
      console.error(err); // Log the error for debugging
    }
  }

  async function ProductList() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        [Query.orderDesc("$createdAt"), Query.limit(10)]
      );
      setProducts(response.documents);
    } catch (err) {
      console.log(err);
    }
  }

  async function CategoryList() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        CATEGORIES_COLLECTION_ID,
        [Query.orderDesc("$createdAt"), Query.limit(10)]
      );
      setCategories(response.documents);
    } catch (err) {
      console.log(err);
    }
  }

  async function add(idea) {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        IDEAS_COLLECTION_ID,
        ID.unique(),
        idea
      );
      setIdeas((ideas) => [response, ...ideas].slice(0, 10));
    } catch (err) {
      console.log(err); // handle error or show user a message
    }
  }

  async function remove(id) {
    try {
      await databases.deleteDocument(DATABASE_ID, IDEAS_COLLECTION_ID, id);
      setIdeas((ideas) => ideas.filter((idea) => idea.$id !== id));
      await init();
    } catch (err) {
      console.log(err);
    }
  }

  async function init() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        IDEAS_COLLECTION_ID,
        [Query.orderDesc("$createdAt"), Query.limit(10)]
      );
      setIdeas(response.documents);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        current: ideas,
        add,
        remove,
        AddProduct,
        EditProduct,
        RemoveProduct,
        ProductList,
        products,
        AddCategory,
        categories,
        CategoryList,
        DeleteCategory,
        EditCategory,
        GetSingleCategory,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
