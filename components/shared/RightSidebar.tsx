import Image from "next/image";
import Link from "next/link";
import RenderedTag from "./RenderedTag";

const RightSidebar = () => {
  const questions = [
    { _id: 1, title: "how do I use express as a custom server in Nextjs?" },
    { _id: 2, title: "how do I use express as a custom server in Nextjs?" },
    { _id: 3, title: "how do I use express as a custom server in Nextjs?" },
    { _id: 4, title: "how do I use express as a custom server in Nextjs?" },
  ];

  const popularTags = [
    { _id: 1, name: "javascript", totalQuestions: 5 },
    { _id: 2, name: "javascript", totalQuestions: 3 },
    { _id: 3, name: "javascript", totalQuestions: 5 },
    { _id: 4, name: "javascript", totalQuestions: 3 },
    { _id: 5, name: "javascript", totalQuestions: 5 },
    { _id: 6, name: "javascript", totalQuestions: 3 },
  ];
  return (
    <section className="background-light900_dark200 light-border sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden w-[350px] custom-scrollbar">
      <div className="">
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>

        <div className="flex flex-col mt-7 w-full gap-[30px]">
          {questions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{question.title}</p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>

        <div className="flex flex-col mt-7 gap-4">
          {popularTags.map((tag) => (
            <RenderedTag key={tag._id} name={tag.name} _id={tag._id} totalQuestions={tag.totalQuestions} showCount />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
