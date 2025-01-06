import { useState } from "react";
import { useUser } from "../lib/context/user";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";

function Login() {
  const user = useUser();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (values.action === "login") {
        await user.login(values.email, values.password);
        navigate("/admin"); // Redirect on successful login
      } else {
        await user.register(values.email, values.password);
      }
      resetForm();
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign In
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password to sign in
        </Typography>
        <Formik
          initialValues={{ email: "", password: "", action: "login" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form action="#" className="mx-auto max-w-[24rem] text-left">
              {/* Email Field */}
              <div className="mb-6">
                <label htmlFor="email">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Your Email
                  </Typography>
                </label>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  size="lg"
                  placeholder="name@mail.com"
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label htmlFor="password">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Password
                  </Typography>
                </label>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  size="lg"
                  placeholder="********"
                  type={passwordShown ? "text" : "password"}
                  icon={
                    <i
                      onClick={togglePasswordVisiblity}
                      className="cursor-pointer"
                    >
                      {passwordShown ? (
                        <EyeIcon className="h-5 w-5" />
                      ) : (
                        <EyeSlashIcon className="h-5 w-5" />
                      )}
                    </i>
                  }
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col justify-between mt-4">
                <Button
                  color="gray"
                  size="lg"
                  className="mt-6"
                  fullWidth
                  onClick={() => setFieldValue("action", "login")}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign In
                </Button>
                <Button
                  color="blue"
                  size="lg"
                  className="mt-2"
                  fullWidth
                  onClick={() => setFieldValue("action", "register")}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Register
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default Login;
