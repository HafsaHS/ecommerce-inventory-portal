import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useGlobal } from "../../../lib/context/global";

const TABLE_HEAD = [
  { head: "Title", customeStyle: "!text-left" },
  { head: "Price", customeStyle: "text-right" },
  { head: "Stock", customeStyle: "text-right" },
  { head: "Description", customeStyle: "text-right" },
  { head: "Actions", customeStyle: "text-right" },
];

function ProductList() {
  const navigate = useNavigate();
  const { products, ProductList, DeleteProduct } = useGlobal();

  useEffect(() => {
    ProductList(); // Call the function to fetch products
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Product?")) {
      DeleteProduct(id);
    }
  };

  return (
    <section className="m-10">
      <Card className="h-full w-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4"
        >
          <div>
            <Typography variant="h6" color="blue-gray">
              Product List
            </Typography>
            <Typography
              variant="small"
              className="text-gray-600 font-normal mt-1"
            >
              Here is a list of the available products
            </Typography>
          </div>
          <div className="flex items-center w-full shrink-0 gap-4 md:w-max">
            <Button
              variant="outlined"
              className="flex items-center gap-2"
              onClick={() => navigate("/admin/Product/add")}
            >
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll !px-0 py-2">
          <table className="w-full min-w-max table-auto">
            <thead>
              <tr>
                {TABLE_HEAD.map(({ head, customeStyle }) => (
                  <th
                    key={head}
                    className={`border-b border-gray-300 !p-4 pb-8 ${customeStyle}`}
                  >
                    <Typography
                      color="blue-gray"
                      variant="small"
                      className="!font-bold"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products && products.length > 0 ? (
                products.map(({ $id, title, price, stock, description }) => (
                  <tr key={$id}>
                    <td className="!p-4 border-b border-gray-300">
                      <div className="flex items-center gap-4 text-left">
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="!font-semibold"
                          >
                            {title}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className="!p-4 border-b border-gray-300">
                      <Typography
                        variant="small"
                        className="!font-normal text-right"
                      >
                        {price}
                      </Typography>
                    </td>
                    <td className="!p-4 border-b border-gray-300">
                      <Typography
                        variant="small"
                        className="!font-normal text-right"
                      >
                        {stock}
                      </Typography>
                    </td>
                    <td className="!p-4 border-b border-gray-300">
                      <Typography
                        variant="small"
                        className="!font-normal text-gray-600 text-right"
                      >
                        {description}
                      </Typography>
                    </td>
                    <td className="!p-4 border-b border-gray-300">
                      <div className="flex justify-end gap-4">
                        <IconButton
                          variant="text"
                          size="sm"
                          onClick={() => navigate(`/admin/Product/edit/${$id}`)}
                        >
                          <PencilIcon className="h-5 w-5 text-gray-900" />
                        </IconButton>
                        <IconButton
                          variant="text"
                          size="sm"
                          onClick={() => handleDelete($id)}
                        >
                          <TrashIcon className="h-5 w-5 text-gray-900" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="text-center !p-4">
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </section>
  );
}

export default ProductList;
