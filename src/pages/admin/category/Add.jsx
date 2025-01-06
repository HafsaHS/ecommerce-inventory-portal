import React from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useGlobal } from "../../../lib/context/global";

export function AddCategory() {
  const { AddCategory } = useGlobal();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await AddCategory(values);
      console.log(response);
      navigate("/admin/category/");
      resetForm();
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="container mx-auto text-center">
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-4 !text-3xl lg:!text-5xl"
        >
          Add Category
        </Typography>
        <div className="flex items-center justify-center">
          <Formik
            initialValues={{
              title: "",
              description: "",
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

export default AddCategory;
