import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Box } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import NavItems from "./NavItems";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import UserAccountNav from "./UserAccountNav";


const Navbar = async () => {
  
  return (
    <div className="bg-white  sticky z-50 top-0 inset-0 inset-x-0 h-16">
      <header className="relative bg-white ">
        <MaxWidthWrapper>
          <div className="border-b-4 border-[#00253E] border-rounded">
            <div className="flex h-16 items-center">
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Image src="public\IceCube logo.svg" alt="IceCube Logo" width="50" height="50"/>
                  {/* <Box className="h-10 w-10" color="#00406C" /> */}
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
              <NavItems />
              </div>

              <div className='ml-auto flex items-center'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  
                  
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
