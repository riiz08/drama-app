import { Link } from "@heroui/link";
import {
  Navbar as HeroUiNavbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Button } from "@heroui/button";
import SearchInput, { SearchIcon } from "./search-input";
import Image from "next/image";

export default function Navbar() {
  return (
    <HeroUiNavbar shouldHideOnScroll maxWidth="full">
      <NavbarContent justify="start">
        <NavbarItem>
          <Link color="foreground" href="/">
            <Image
              alt="MangEakkk Drama"
              height={40}
              src={"/logo/logo.png"}
              width={40}
              style={{ height: "auto", width: "auto" }}
              priority
            />
            <span className="font-semibold text-inherit text-sm md:text-medium">
              MangEakkk
            </span>
          </Link>
        </NavbarItem>
      </NavbarContent>

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
              <div className="px-1 pb-2">
                <SearchInput />
              </div>
            </PopoverContent>
          </Popover>
        </NavbarItem>
      </NavbarContent>
    </HeroUiNavbar>
  );
}
