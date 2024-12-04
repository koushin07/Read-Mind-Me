import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, Search, Send } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Navigation from "@/components/navigation";

export default function MessagePage() {
  const [conversations, setConversations] = useState([
    {
      id: 5,
      name: "Emma Wilson",
      avatar: "EW",
      lastMessage: "Can we reschedule our meeting?",
      unread: 3,
      timestamp: new Date("2023-06-05T11:00:00"),
    },
    {
      id: 4,
      name: "David Lee",
      avatar: "DL",
      lastMessage: "Looking forward to the study group!",
      unread: 0,
      timestamp: new Date("2023-06-05T10:45:00"),
    },
    {
      id: 3,
      name: "Mary Davis",
      avatar: "MD",
      lastMessage: "Can you share that Bible verse?",
      unread: 1,
      timestamp: new Date("2023-06-05T10:30:00"),
    },
    {
      id: 2,
      name: "John Smith",
      avatar: "JS",
      lastMessage: "Thanks for your support!",
      unread: 0,
      timestamp: new Date("2023-06-05T10:15:00"),
    },
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "SJ",
      lastMessage: "See you at the prayer meeting!",
      unread: 2,
      timestamp: new Date("2023-06-05T10:00:00"),
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Sarah Johnson",
      content: "Hi there! How are you doing?",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      sender: "You",
      content: "I'm doing well, thanks! How about you?",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      sender: "Sarah Johnson",
      content:
        "I'm great! Just wanted to remind you about our prayer meeting tonight.",
      timestamp: "10:35 AM",
    },
    {
      id: 4,
      sender: "You",
      content: "Oh, thanks for the reminder! What time is it again?",
      timestamp: "10:36 AM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredConversations, setFilteredConversations] =
    useState(conversations);
  const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  // Simulate receiving a new message every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newConversation = {
        id: conversations.length + 1,
        name: `New User ${conversations.length + 1}`,
        avatar: "NU",
        lastMessage: "Hey, just joined the community!",
        unread: 1,
        timestamp: new Date(),
      };
      setConversations((prev) => [newConversation, ...prev]);
    }, 3000);

    return () => clearInterval(interval);
  }, [conversations]);

  let searchTimeout: ReturnType<typeof setTimeout>;

  const handleSearch = (query: string) => {
    // Clear the previous timeout if it exists
    if (searchTimeout) clearTimeout(searchTimeout);

    // Set a new timeout to delay the search
    searchTimeout = setTimeout(() => {
      const result = conversations.filter((convo) =>
        convo.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredConversations(result);
    }, 1000); // 2-second delay

    // Update search query immediately for controlled input
    setSearchQuery(query);
  };
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-gray-900">
      <Navigation />
      <div className="container mx-auto px-4 py-8  md:flex-row ">
        <div className="h-[calc(100vh-10rem)] flex">
          <div className="hidden md:flex w-90 border-r bg-gray-50/40 dark:bg-gray-800/40">
            <div>
              <h1 className="scroll-m-20 pl-2 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Messages
              </h1>
              <div className="relative w-90 px-10">
                <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search conversations"
                  className="pl-2 h-8"

                />
              </div>
              <ScrollArea className="h-full ">
                <div className="p-4 space-y-2">
                  {filteredConversations && filteredConversations.length > 0 ? (
                    filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all  ${
                          selectedConversation.id === conversation.id
                            ? "bg-gray-200 dark:bg-gray-700"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700/50"
                        }`}
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <Avatar>
                          <AvatarFallback>{conversation.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {conversation.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {conversation.lastMessage}
                          </p>
                        </div>
                        {conversation.unread > 0 && (
                          <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-primary-foreground items-center p-3 rounded-lg">
                      No messages found
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="border-b p-4 flex items-center space-x-4">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
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
                      {conversations.map((conversation) => (
                        <div
                          key={conversation.id}
                          className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all  ${
                            selectedConversation.id === conversation.id
                              ? "bg-gray-200 dark:bg-gray-700"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700/50"
                          }`}
                          onClick={() => {
                            setSelectedConversation(conversation);
                            setIsMobileMenuOpen((prev) => !prev);
                          }}
                        >
                          <Avatar>
                            <AvatarFallback>
                              {conversation.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">
                              {conversation.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                              {conversation.lastMessage}
                            </p>
                          </div>
                          {conversation.unread > 0 && (
                            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
              <Avatar>
                <AvatarFallback>{selectedConversation.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{selectedConversation.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Active now
                </p>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4 w-full">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex flex-col ${
                      message.sender === "You" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.sender === "You"
                          ? "bg-black text-white dark:bg-gray-800"
                          : "bg-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {message.timestamp}
                    </span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
