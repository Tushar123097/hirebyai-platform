import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Home } from "lucide-react";

export interface FeedbackProps {
  feedback: {
    rating: number;
    feedback: string;
    keyTakeaways: string[];
  };
}

const Feedback = ({ feedback }: FeedbackProps) => {
  const navigate = useNavigate();

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-8 h-8 ${
          star <= feedback.rating
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Interview Feedback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Rating Section */}
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">
              Interview Experience Rating
            </h3>
            <div className="flex justify-center gap-1">{renderStars()}</div>
            <p className="text-sm text-muted-foreground">
              Rated {feedback.rating} out of 5
            </p>
          </div>

          {/* Feedback Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Interview Analysis</h3>
            <div className="bg-muted p-4 rounded-lg">
              <p className="whitespace-pre-wrap">{feedback.feedback}</p>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Key Takeaways</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {feedback.keyTakeaways.map((takeaway, index) => (
                <li key={index}>{takeaway}</li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center pt-4">
            <Button onClick={() => navigate("/")} className="gap-2">
              <Home className="w-4 h-4" />
              Go to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Feedback;
