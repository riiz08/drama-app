import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import Heading from "./heading";
import { Skeleton } from "@heroui/skeleton";

interface Props {
  dramas: any;
}

const BoxAllDrama: React.FC<Props> = ({ dramas }) => {
  return (
    <div className="bg-content1 w-full px-4 py-2 my-4">
      <div className="space-y-1">
        <Heading h1={false} title="Drama" href="/drama" />
      </div>
      <Divider className="my-2" />
      <div className="grid grid-cols-1 gap-2 ">
        {dramas.length > 1 ? (
          dramas.map((drama: any) => (
            <Link
              key={drama.id}
              href={`/drama/${drama.slug}`}
              className="w-full hover:bg-content2 text-xs"
              color="foreground"
              target="_parent"
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
          ))
        ) : (
          <div className="space-y-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i}>
                  <div className="flex items-center justify-between w-full my-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-300 rounded-full" />
                      <div className="h-4 w-24 bg-gray-300 rounded" />
                    </div>
                    <div className="h-4 w-16 bg-gray-300 rounded-lg" />
                  </div>
                </Skeleton>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BoxAllDrama;
