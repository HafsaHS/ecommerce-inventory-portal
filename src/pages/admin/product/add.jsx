import React, { useEffect } from "react";
import {
  Button,
  Input,
  Textarea,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useGlobal } from "../../../lib/context/global";

export function AddProduct() {
  const { AddProduct, categories, CategoryList } = useGlobal();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
    price: Yup.number().required("Price is required"),
    stock: Yup.number().required("Stock is required"),
    category: Yup.array().of(Yup.string()).required("Category is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await AddProduct(values);
      console.log(response);
      navigate("/admin/product");
      resetForm();
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => CategoryList(), []);

  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="container mx-auto text-center">
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-4 !text-3xl lg:!text-5xl"
        >
          Add Product
        </Typography>
        <div className="flex items-center justify-center">
          <Formik
            initialValues={{
              title: "",
              price: "",
              stock: "",
              description: "",
              category: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4 lg:max-w-sm">
                {/* Title */}
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
                {/* Category */}
                <div>
                  <Typography
                    variant="small"
                    className="mb-2 text-left font-medium !text-gray-900"
                  >
                    Category
                  </Typography>
                  {/* <select
                    name="colorss"
                    value={values.color}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ display: "block" }}
                  >
                    <option value="" label="Select a color">
                      Select a color{" "}
                    </option>
                    <option value="red" label="red">
                      {" "}
                      red
                    </option>
                    <option value="blue" label="blue">
                      blue
                    </option>

                    <option value="green" label="green">
                      green
                    </option>
                  </select> */}
                  <Field name="category">
                    {({ field, form }) => (
                      <Select
                        color="gray"
                        size="lg"
                        placeholder="Select a category"
                        value={field.name}
                        onChange={(value) => {
                          form.setFieldValue("category", [value]);
                        }}
                      >
                        {categories.map((category) => (
                          <Option key={category.$id} value={category.$id}>
                            {category.title}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-sm text-red-500 mt-1"
                  />
                </div>
                {/* Price and Stock */}
                <div className="grid grid-cols-2 gap-4">
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
                </div>
                {/* Description */}
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
                {/* Submit Button */}
                <div className="flex flex-col justify-between mt-4">
                  <Button
                    size="lg"
                    className="w-full"
                    color="gray"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Add
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
}

export default AddProduct;
