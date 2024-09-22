import Question from "@/components/forms/Question";
import { getuserById } from "@/lib/actions/user.ation";
import { redirect } from "next/navigation";

const Page = async () => {
  // const { userId } = auth();
  const userId = "1234567890";
  if (!userId) redirect("/sign-in");

  const mongoUser = await getuserById({ userId });
  console.log(mongoUser);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default Page;
