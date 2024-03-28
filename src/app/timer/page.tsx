import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";



const TimerPage = async () => {
    
     

    return (
        <>
        <div className="bg-[#001A2C]">
        <div className='py-10 mx-auto text-center flex flex-col items-center max-w-3xl'>
        <h1 className='text-1xl font-bold tracking-tight text-gray-100  sm:text-3xl'>
        R2 D F2 R2 D R2 U' B2 F2 U2 R2 U R U2 R B U R' D2 F' D2
        </h1>
        <Button variant={"ghost"}
        className="bg-[#001A2C] text-[#fff] hover:bg-[#002E4E] hover:text-[#fff] mt-4">
            <RotateCcw className="text-[#fff] h-6 w-6" />
            </Button>
      </div>
        </div>
        </>
    )
};

export default TimerPage;
