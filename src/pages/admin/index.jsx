import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { useUser } from "../../lib/context/user";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { account } from "../../lib/appwrite";

function NavItem({ label, link }) {
  return (
    <Link to={link}>
      <Typography as="li" color="blue-gray" className="p-1 font-medium">
        {label}
      </Typography>
    </Link>
  );
}

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
      <NavItem label="Products" link="/admin/product" />
      <NavItem label="Categories" link="/admin/category" />
    </ul>
  );
}

export default function Admin() {
  const user = useUser();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <div>
      <Navbar color="transparent" fullWidth>
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="mr-4 cursor-pointer text-lg font-bold"
          >
            eCommerce Inventory Portal
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          {user.current ? (
            <div className="flex items-center justify-end gap-x-4">
              <Typography className="text-base text-black">
                {user.current.email}
              </Typography>
              <Button
                color="gray"
                className="hidden lg:inline-block"
                onClick={() => account.deleteSession("current")}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              color="gray"
              className="hidden lg:inline-block"
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>
          )}

          <IconButton
            size="sm"
            variant="text"
            color="blue-gray"
            onClick={handleOpen}
            className="ml-auto inline-block text-blue-gray-900 lg:hidden"
          >
            {open ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={open}>
          <div className="mt-2 rounded-xl bg-white py-2">
            <NavList />
            {user.current ? (
              <>
                <Typography className="text-sm text-white">
                  {user.current.email}
                </Typography>
                <Button className="mb-2" fullWidth>
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                className="mb-2"
                fullWidth
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            )}
          </div>
        </Collapse>
      </Navbar>
      <Outlet />
    </div>
  );
}
