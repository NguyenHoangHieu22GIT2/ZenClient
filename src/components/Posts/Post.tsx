import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Eye, MessageSquare, Share2, ThumbsUp } from "lucide-react";
import { Container } from "../ui/Container";
import { PostComment } from "./Comments/PostComment";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { Comment, CommentType } from "./Comments/Comment";
import { Paragraph } from "../ui/Paragraph";
import { Heading } from "../ui/Heading";
import { Comments } from "./Comments/Comments";
type props = {
  avatarUrl: string;
  username: string;
  dateOfPublished: Date;
  heading: string;
  paragraph: string;
  numOfViews: number;
  badge: string;
  isLiked: boolean;
};

export const Post = (props: props) => {
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([
    {
      _id: "1",
      avatarUrl: "https://github.com/shadcn.png",
      paragraph: "This is just a testing Comment",
      username: "Shadcn",
    },
  ]);
  function postComment(comment: CommentType) {
    setComments((oldComments) => [comment, ...oldComments]);
  }
  useEffect(() => {
    if (props.isLiked) setIsLiked(true);
  }, [props.isLiked]);
  // const date = new Date(props.dateOfPublished);
  const [isOpenComments, setIsOpenComments] = useState(false);
  let commentsElement = <></>;
  if (isOpenComments) {
    commentsElement = (
      <div className="flex flex-col gap-5">
        <PostComment onAddComment={postComment} />
        <Comments comments={comments} />
      </div>
    );
  }
  return (
    <Card className="m-2">
      <Container>
        <CardHeader className="flex flex-row justify-between px-6 py-3">
          <div className=" flex items-center gap-2">
            <Avatar>
              <AvatarImage src={props.avatarUrl} />
              <AvatarFallback>{props.username}</AvatarFallback>
            </Avatar>
            <div>
              <Label className="text-sm">{props.username}</Label>
              <p className="text-gray-500 text-[10px]">8AM yesterday</p>
            </div>
          </div>
          <div>
            <Badge>{props.badge}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="my-2" />
          <Heading>{props.heading}</Heading>
          <Paragraph>{props.paragraph}</Paragraph>
        </CardContent>
        <CardFooter className="block ">
          <div className="flex gap-2 mb-3">
            <Eye />
            {props.numOfViews} views
          </div>
          <div className="flex items-center gap-3">
            <Button
              className={`${isLiked && "text-blue-700 hover:text-blue-700"} `}
              variant={"ghost"}
              onClick={() => {
                if (!isLiked)
                  toast({
                    title: "Liked a Post",
                    description: "Friday, February 10, 2023 at 5:57 PM",
                    action: <ToastAction altText="LOL">Undo</ToastAction>,
                  });
                else
                  toast({
                    title: "Unliked a Post",
                    description: "Friday, February 10, 2023 at 5:57 PM",
                    action: <ToastAction altText="LOL">Undo</ToastAction>,
                  });
                setIsLiked((oldBool) => !oldBool);
              }}
            >
              <ThumbsUp className="w-4 h-4 mr-2"></ThumbsUp>
              Like
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => {
                setIsOpenComments((oldBool) => !oldBool);
              }}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Comment
            </Button>
            <Button variant={"ghost"}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
          <div className="mt-5">{commentsElement}</div>
          <div></div>
        </CardFooter>
      </Container>
    </Card>
  );
};
