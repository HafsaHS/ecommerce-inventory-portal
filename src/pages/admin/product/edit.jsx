import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import { useGlobal } from "../../../lib/context/global";

export function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { EditProduct, GetSingleProduct } = useGlobal();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    price: Yup.number().required("Price is required"),
    stock: Yup.number().required("Stock is required"),
    description: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await EditProduct(values);
      navigate("/admin/product/");
      resetForm();
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await GetSingleProduct(id);
      setProduct(response);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct(); // Invoke the function here
    }
  }, [id]);

  return (
    <section className="px-5 py-8 lg:py-16">
      <div className="container mx-auto text-center">
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-4 !text-3xl lg:!text-5xl"
        >
          Edit product
        </Typography>
        {product && (
          <div className="flex items-center justify-center">
            <Formik
              initialValues={{
                $id: product.$id,
                title: product.title,
                price: product.price,
                stock: product.stock,
                description: product.description,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-4 lg:max-w-lg">
                  <div>
                    <Typography
                      variant="small"
                      className="mb-2 text-left font-medium !text-gray-900"
                    >
                      Title
                    </Typography>
                    <Field name="title">
                      {({ field }) => (
                        <Input
                          {...field}
                          color="gray"
                          size="lg"
                          placeholder="Title"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-sm text-red-500 mt-1"
                    />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      className="mb-2 text-left font-medium !text-gray-900"
                    >
                      Description
                    </Typography>
                    <Field name="description">
                      {({ field }) => (
                        <Textarea
                          {...field}
                          rows={6}
                          color="gray"
                          placeholder="Description"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-sm text-red-500 mt-1"
                    />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      className="mb-2 text-left font-medium !text-gray-900"
                    >
                      Price
                    </Typography>
                    <Field name="price">
                      {({ field }) => (
                        <Input
                          {...field}
                          color="gray"
                          size="lg"
                          placeholder="Price"
                          type="number"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-sm text-red-500 mt-1"
                    />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      className="mb-2 text-left font-medium !text-gray-900"
                    >
                      Stock
                    </Typography>
                    <Field name="stock">
                      {({ field }) => (
                        <Input
                          {...field}
                          color="gray"
                          size="lg"
                          placeholder="Stock"
                          type="number"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="stock"
                      component="div"
                      className="text-sm text-red-500 mt-1"
                    />
                  </div>
                  <div className="flex flex-col justify-between mt-4">
                    <Button
                      size="lg"
                      className="w-full"
                      color="gray"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Update
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </section>
  );
}

export default EditProduct;
