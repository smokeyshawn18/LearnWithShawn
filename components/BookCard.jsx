// components/BookCard.jsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BookCard({
  title,
  description,
  content,
  price,
  href,
  image,
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow w-full max-w-sm mx-auto">
      <CardHeader className="flex flex-col items-center text-center">
        {image && (
          <div className="w-full h-[250px] flex items-center justify-center">
            <Image
              src={image}
              alt={title}
              width={400}
              height={200}
              className="rounded-lg object-cover w-[400px] h-[200px]"
            />
          </div>
        )}
        <CardTitle className="mt-4 text-lg sm:text-xl">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="text-sm sm:text-base">
        <p>{content}</p>
      </CardContent>

      <CardFooter className="justify-center">
        <Button asChild>
          <a href={href} className="text-sm sm:text-base">
            {price}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
