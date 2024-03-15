import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";

const points = [
  {
    name: "card point",
    dscrp:
      "Aut illo quae. Ut et harum ea animi natus. Culpa maiores et sed sint et magnam exercitationem quia. Ullam voluptas nihil vitae dicta molestiae et. Aliquid velit porro vero.",
  },
  {
    name: "card point",
    dscrp:
      "Aut illo quae. Ut et harum ea animi natus. Culpa maiores et sed sint et magnam exercitationem quia. Ullam voluptas nihil vitae dicta molestiae et. Aliquid velit porro vero.",
  },
  {
    name: "card point",
    dscrp:
      "Aut illo quae. Ut et harum ea animi natus. Culpa maiores et sed sint et magnam exercitationem quia. Ullam voluptas nihil vitae dicta molestiae et. Aliquid velit porro vero.",
  },
];
export const Topic: React.FC = () => {
  return (
    <div className="relative isolate px-6 pt-6 lg:px-8 flex flex-col py-40 max-sm:py-32">
      <div className="mx-auto max-w-2xl mb-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Everything you need to know
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>
      </div>
      <div className="flex gap-3 flex-wrap self-center justify-center">
        {points.map((key) => (
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>{key.name}</CardTitle>
            </CardHeader>
            <CardContent>{key.dscrp}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
