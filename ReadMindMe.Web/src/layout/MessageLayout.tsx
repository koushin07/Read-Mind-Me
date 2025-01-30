/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, Loader, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import {
  Conversation,
  Message,
} from "@/features/messages/types/conversationTypes";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useMessageHub } from "@/hooks/use-message-hub";
import { useParams } from "react-router-dom";

const MessageLayout = () => {
  const { id } = useParams();
  const { fetchById, sendMessage, JoinConversationGroup } = useMessageHub();
  const { auth } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedConversation] = useState<Message[]>([]);
  const [fetchedConversations] =
    useState<Conversation | null>(null);
  const [conversationId] = useState<string | null>(null);
  const [messagesLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState("");
  const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(parseInt(id!), auth.user.id, newMessage);
    if (newMessage.trim()) {
      // const newMsg = {
      //   id: messages.length + 1
      //   sender: "You",
      //   content: newMessage,
      //   timestamp: new Date().toLocaleTimeString([], {
      //     hour: "2-digit",
      //     minute: "2-digit",
      //   }),
      // };

      setNewMessage("");
    }

  };

  useEffect(() => {
    fetchById(parseInt(id!)).then(() => {
      JoinConversationGroup(parseInt(id!));
    })


    scrollToBottom(messagesEndRef);
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b p-4 flex items-center space-x-4">
        <Sheet
          open={isMobileMenuOpen}
          onOpenChange={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="px-0 text-base hover:bg-transparent focus:ring-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetTitle>Conversations</SheetTitle>
            <ScrollArea className="h-full ">
              <div className="p-4 space-y-2">
                {fetchedConversations?.messages.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all
                          ${
                            conversationId === conversation.id.toString()
                              ? "bg-gray-200 dark:bg-gray-700"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700/50"
                          }`}
                  >
                    <Avatar>
                      <AvatarFallback>m</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {conversation.sender.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {conversation.content}
                      </p>
                    </div>
                    {!conversation.readAt && (
                      <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full"></span>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <Avatar>
          <AvatarFallback> N </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">
            Name
            {/* {selectedConversation.name} */}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Active now</p>
        </div>
      </div>
      {messagesLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col">
            <Loader className="motion-safe:animate-spin" />
          </div>
        </div>
      ) : (
        <ScrollArea className="flex-1 p-4 w-full h-full">
          <div className="space-y-4">
            {selectedConversation.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${
                  message.sender.id === auth.user.id
                    ? "items-end"
                    : "items-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.sender.id === auth.user.id
                      ? "bg-black text-white dark:bg-gray-800"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  <p>{message.content}</p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {message.createAt}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      )}

      <form onSubmit={handleSendMessage} className="border-t px-4 pt-2">
        <div className="flex space-x-2">
          <Textarea
            rows={3}
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 resize-none"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MessageLayout;
