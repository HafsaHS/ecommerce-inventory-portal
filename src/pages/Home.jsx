import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const products = [
  {
    id: 1,
    title: "Product 1",
    description: "A short description of Product 1.",
    price: "$20.00",
    image: "https://source.unsplash.com/random/400x300?product",
  },
  {
    id: 2,
    title: "Product 2",
    description: "A short description of Product 2.",
    price: "$35.00",
    image: "https://source.unsplash.com/random/400x300?product",
  },
  {
    id: 3,
    title: "Product 3",
    description: "A short description of Product 3.",
    price: "$50.00",
    image: "https://source.unsplash.com/random/400x300?product",
  },
  {
    id: 4,
    title: "Product 4",
    description: "A short description of Product 4.",
    price: "$25.00",
    image: "https://source.unsplash.com/random/400x300?product",
  },
];

export default function Home() {
  return (
    <section className="flex flex-wrap justify-center gap-6 p-6 bg-gray-100 min-h-screen">
      {products.map((product) => (
        <Card key={product.id} className="w-72">
          <img
            src={product.image}
            alt={product.title}
            className="h-48 w-full object-cover"
          />
          <CardBody>
            <Typography variant="h6" className="text-gray-800">
              {product.title}
            </Typography>
            <Typography variant="small" className="text-gray-600 line-clamp-2">
              {product.description}
            </Typography>
            <Typography variant="h5" className="text-blue-500 mt-2">
              {product.price}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0 flex justify-between items-center">
            <Button size="sm" color="blue">
              View
            </Button>
            <Button size="sm" color="green">
              Buy
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
