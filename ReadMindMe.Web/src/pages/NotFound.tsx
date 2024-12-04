import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="container flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">404</CardTitle>
          <CardDescription className="text-xl">Page Not Found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button onClick={() => navigate(-1)}>
            <Undo2 className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          {/* <Button variant="outline" asChild>
            <Link to="/explore">
              <Search className="mr-2 h-4 w-4" />
              Explore
            </Link>
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}

export default NotFoundPage;
