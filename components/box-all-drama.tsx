import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import Heading from "./heading";

interface Props {
  dramas: any;
}

const BoxAllDrama: React.FC<Props> = ({ dramas }) => {
  return (
    <div className="bg-content1 w-full px-4 py-2 my-4">
      <div className="space-y-1">
        <Heading title="Drama" href="/drama" />
      </div>
      <Divider className="my-2" />
      <div className="grid grid-cols-1 gap-2 ">
        {dramas.map((drama: any) => (
          <Link
            key={drama.id}
            href={`/drama/${drama.slug}`}
            className="w-full hover:bg-content2 text-xs"
            color="foreground"
          >
            <div className="w-full my-1 flex justify-between items-center gap-2">
              <h2 className="font-semibold text-xs md:text-sm">
                {drama.title}
              </h2>
              <Chip size="sm" variant="shadow" color="primary">
                Drama
              </Chip>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BoxAllDrama;
