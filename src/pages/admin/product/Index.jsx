import React, { useEffect } from "react";

// @material-tailwind/react
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  DocumentMagnifyingGlassIcon,
  FlagIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router";
import { useGlobal } from "../../../lib/context/global";

const TABLE_ROW = [
  {
    img: "/logos/btc.png",
    digitalAsset: "BTC",
    detail: "Bitcoin",
    price: "$46,727.30",
    change: "+2.92%",
    volume: "$45.31B",
    market: "$915.61B",
    color: "green",
    trend: 4,
  },
  {
    img: "/logos/eth.png",
    digitalAsset: "ETH",
    detail: "Ethereum",
    price: "$2,609.30",
    change: "+6.80%",
    volume: "$23.42B",
    market: "$313.58B",
    color: "green",
  },
  {
    img: "/logos/usdt.png",
    digitalAsset: "USDT",
    detail: "TetherUS",
    price: "$1.00",
    change: "-0.01%",
    volume: "$94.37B",
    market: "$40,600",
    color: "red",
  },
  {
    img: "/logos/sol.png",
    digitalAsset: "SOL",
    detail: "Solana",
    price: "$1.00",
    change: "+6.35%",
    volume: "$3.48B",
    market: "$43.26B",
    color: "green",
  },
  {
    img: "/logos/xrp.png",
    digitalAsset: "XRP",
    detail: "Ripple",
    price: "$100.19",
    change: "-0.95%",
    volume: "$1.81B",
    market: "$32.45B",
    color: "red",
  },
];

const TABLE_HEAD = [
  {
    head: "Title",
    customeStyle: "!text-left",
  },
  {
    head: "Price",
    customeStyle: "text-right",
  },
  {
    head: "Stock",
    customeStyle: "text-right",
  },
  {
    head: "Category",
    customeStyle: "text-right",
  },
  {
    head: "Actions",
    customeStyle: "text-right",
  },
];

function ProductList() {
  const navigate = useNavigate();
  const { products, ProductList } = useGlobal();

  useEffect(() => {
    console.log(products);
    ProductList(); // Call the function here
  }, []);
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
              onClick={() => navigate("/admin/product/add")}
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
              {products.map(
                ({ id, title, description, price, stock }, index) => {
                  const isLast = index === TABLE_ROW.length - 1;
                  const classes = isLast
                    ? "!p-4"
                    : "!p-4 border-b border-gray-300";
                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-4 text-left">
                          {/* <img
                            src={img}
                            alt={digitalAsset}
                            className="border rounded-md p-1 h-10 w-10"
                          /> */}
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="!font-semibold"
                            >
                              {title}
                            </Typography>
                            <Typography
                              variant="small"
                              className="!font-normal text-gray-600"
                            >
                              {description}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600 text-right"
                        >
                          {price}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          //   color={color}
                          className="!font-bold text-right"
                        >
                          {stock}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600 text-right"
                        >
                          Games
                        </Typography>
                      </td>

                      <td className={classes}>
                        <div className="flex justify-end gap-4">
                          <IconButton variant="text" size="sm">
                            <PencilIcon className="h-5 w-5 text-gray-900" />
                          </IconButton>
                          <IconButton variant="text" size="sm">
                            <TrashIcon className="h-5 w-5 text-gray-900" />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </section>
  );
}

export default ProductList;
