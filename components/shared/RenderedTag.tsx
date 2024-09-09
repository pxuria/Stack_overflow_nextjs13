import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Props {
  name: string;
  _id: number;
  totalQuestions: number;
  showCount?: boolean;
}

const RenderedTag = ({ name, _id, totalQuestions, showCount }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex gap-2 justify-between">
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>
      {showCount && <p className="small-medium text-dark500_light700">{totalQuestions}</p>}
    </Link>
  );
};

export default RenderedTag;
