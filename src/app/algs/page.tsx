import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const AlgsPage = () => {
  return (
    <>
      <div className="bg-[#001A2C] pb-10">
        <div>
          <div className="py-10 mx-auto text-center flex flex-col items-center max-w-3xl">
            <h1 className="text-1xl font-bold tracking-tight text-gray-100  sm:text-3xl">
              All the best algorithms for all events.
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-4 ml-10 mr-10 mt-5 mb-5">

        <Card className="w-[350px] bg-[#002945] border-[#00406C] border-4 min-w-250">
          <CardHeader className="bg-[003A61]">
            <CardTitle className="text-gray-100 font-bold">Alg Name</CardTitle>
            <CardDescription>
              <h3>Alg Image</h3>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">Alg</p>
          </CardContent>
        </Card>

        <Card className="w-[350px] bg-[#002945] border-[#00406C] border-4 min-w-250">
          <CardHeader className="bg-[003A61]">
            <CardTitle className="text-gray-100 font-bold">Alg Name</CardTitle>
            <CardDescription>
              <h3>Alg Image</h3>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">Alg</p>
          </CardContent>
        </Card>

        </div>

        

      </div>
    </>
  );
};

export default AlgsPage;
