import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Box } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {

  const user = false
  return (
    <div className="bg-white dark:bg-[#020817] sticky z-50 top-0 inset-0 inset-x-0 h-16">
      <header className="relative bg-white dark:bg-[#020817] dark">
        <MaxWidthWrapper>
          <div className="border-b-4 border-[#00253E] border-rounded">
            <div className="flex h-16 items-center">
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Image
                    src="/IceCube logo.svg"
                    alt="IceCube Logo"
                    width="50"
                    height="50"
                  />
                </Link>
              </div>

              <div className="ml-10">
                <Link href="/algs">
                  <Button variant="ghost" className="font-bold">
                    Algs
                  </Button>
                </Link>

                <Link href="/courses">
                  <Button variant="ghost" className="font-bold">
                    Courses
                  </Button>
                </Link>

                <Link href="/timer">
                  <Button variant="ghost" className="font-bold">
                    Timer
                  </Button>
                </Link>

                <Link href="/about">
                  <Button variant="ghost" className="font-bold">
                    About
                  </Button>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Sign in
                    </Link>
                  )}

                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  {user ? (
                    <UserAccountNav />
                  ) : (
                    <Link
                      href="/sign-up"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Create account
                    </Link>
                  )}
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
