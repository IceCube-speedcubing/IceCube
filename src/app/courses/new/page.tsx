// src/app/courses/new/page.tsx
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Background } from "@/components/Background";

const NewCoursePage: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-[#00253E]">
      <Background />
      <MaxWidthWrapper>
        <div className="py-16">
          <h1 className="text-3xl font-bold mb-6 text-[#00406C] dark:text-gray-200">
            Create New Course
          </h1>
          {/* Add form fields and logic for creating a new course */}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default NewCoursePage;
