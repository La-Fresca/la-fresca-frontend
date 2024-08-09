import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';
// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function MoblieTopNav() {
  return (
    <Navbar>
      <NavbarBrand as={Link} href={'./'}>
        {/* <AcmeLogo /> */}
        <p className="font-bold text-inherit text-2xl">Lafresca</p>
      </NavbarBrand>
      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
            <Link color="foreground" href="#">
                Features
            </Link>
            </NavbarItem>
            <NavbarItem isActive>
            <Link href="#" aria-current="page">
                Customers
            </Link>
            </NavbarItem>
            <NavbarItem>
            <Link color="foreground" href="#">
                Integrations
            </Link>
            </NavbarItem>
        </NavbarContent> */}
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          {/* <Button
                        className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg">
                        Login
                    </Button> */}
          {/* <Link href="#">Login</Link> */}
        </NavbarItem>
        <NavbarItem>
          {/* <Button
                        className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg ">
                        Register
                    </Button> */}
          {/* <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button> */}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
