import { Link } from "@heroui/link";
import {
  Navbar as HeroUiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Button } from "@heroui/button";

import SearchInput, { SearchIcon } from "./search-input";

export default function Navbar() {
  return (
    <HeroUiNavbar shouldHideOnScroll maxWidth="xl">
      <NavbarBrand>
        <Image
          alt="MangEakkk Drama"
          className="w-auto h-auto"
          height={40}
          src={"/logo/logo.png"}
          width={40}
        />
        <p className="font-bold text-inherit">
          <Link color="foreground" href="/">
            MangEakkk
          </Link>
        </p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <div className="hidden md:block">
            <SearchInput />
          </div>
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Button
                isIconOnly
                aria-label="btn-search"
                className="md:hidden"
                size="sm"
                variant="flat"
              >
                <SearchIcon className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <SearchInput />
              </div>
            </PopoverContent>
          </Popover>
        </NavbarItem>
      </NavbarContent>
    </HeroUiNavbar>
  );
}
