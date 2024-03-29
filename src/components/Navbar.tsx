import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Box } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";


const Navbar = () => {
  return (
    <div className="bg-[#001A2C] sticky z-50 top-0 inset-0 inset-x-0 h-16">
      <header className="relative bg-[#001A2C]">
        <MaxWidthWrapper>
          <div className="border-b-4 border-[#00253E]">
            <div className="flex h-16 items-center">
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Box className="h-10 w-10" color="#fff" />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <ul className="container flex">
                <Link href="/algs">
                    <Button variant="link" className="ml-5 text-[#fff]">
                      <li >
                        <h3 className="text-white font-bold mt-5">Algs</h3>
                      </li>
                    </Button>
                    </Link>
                    <Link href="/timer">
                    <Button variant="link" className="ml-5 text-[#fff]">
                      <li >
                        <h3 className="text-white font-bold mt-5">Timer</h3>
                      </li>
                    </Button>
                    </Link>
                    <Link href="/about">
                    <Button variant="link" className="ml-5 text-[#fff]">
                      <li >
                        <h3 className="text-white font-bold mt-5">About</h3>
                      </li>
                    </Button>
                    </Link>
                </ul>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link
                    href="/sign-in"
                    className={buttonVariants({
                      variant: "ghost",
                      className:
                        "bg-[#001A2C] text-[#fff] hover:bg-[#00253E] hover:text-[#fff]",
                    })}
                  >
                    Sign in
                  </Link>

                  <Link
                    href="/create-account"
                    className={buttonVariants({
                      className:
                        "bg-[#003A61] text-[#fff] hover:bg-[#00406C] hover:text-[#fff]",
                    })}
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
