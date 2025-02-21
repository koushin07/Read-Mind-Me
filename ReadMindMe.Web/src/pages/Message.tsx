/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCirclePlus, Search } from "lucide-react";
import Navigation from "@/components/navigation";
import { NavLink, Outlet, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchConversations } from "@/features/messages/service/message-service";
import { useDispatch, useSelector } from "react-redux";
import { loadConversation } from "@/features/messages/messageSlice";
import { RootState } from "@/store/store";
import { ConversationList } from "@/features/messages/types/conversationTypes";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { setConnection } from "@/features/messages/messageHubSlice";

export default function MessageLayout() {
  const dispatch = useDispatch();
  const conversations = useSelector((state: RootState) => state.message);
  const [searchQuery, setSearchQuery] = useState("");
  const {auth} = useAuth()
  const [filteredConversations, setFilteredConversations] = useState<
    ConversationList[]
  >([]);

  const isChildRouteActive = useMatch("/messages/:id");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredConversations(
      conversations.filter((c) =>
        c.userName.toLowerCase().includes(query.toLowerCase())
      )
    );
  };
  useEffect(() => {
    // Fetch conversations on mount
    fetchConversations().then((convo) => {
      const connect = new HubConnectionBuilder()
        .withUrl("http://localhost:5081/hubs/conversations", {
          accessTokenFactory: () => auth.token!,
        })
        .withAutomaticReconnect()
        .build();
      connect.start().then(()=>dispatch(setConnection(connect)))
      dispatch(loadConversation(convo));
      setFilteredConversations(convo);
    });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-gray-900">
      <Navigation />
      <div className="container mx-auto px-4  md:flex-row ">
        Messages
        <div className="h-[calc(100vh-4rem)]  p-2 shadow-1 flex w-full">
          <div className="hidden  md:flex w-90 border-r bg-gray-50/40 dark:bg-gray-800/40">
            <div className="flex-1 ">
              <div className="flex-row flex justify-between gap-24 px-2 w-full">
                <div className="pl-2 pb-2 ">
                  <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                    Conversations
                  </h1>
                  <small className="text-muted-foreground">
                    Your recent Conversation
                  </small>
                </div>

                <Button size={"sm"} variant={"default"}>
                  <MessageCirclePlus className="w-4 h-4" /> new
                </Button>
              </div>
              <div className="relative w-full px-10">
                <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search conversations"
                  className="pl-2 h-8"
                />
              </div>
              <ScrollArea className="h-fit ">
                <div className="p-4 space-y-2">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map((conversation) => (
                      <NavLink
                        to={conversation.id.toString()}
                        key={conversation.id}
                        className={({ isActive }) =>
                          (isActive
                            ? "bg-gray-200 dark:bg-gray-700"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700/50") +
                          " flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all"
                        }
                      >
                        <Avatar>
                          <AvatarFallback>
                            {conversation.userName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {conversation.userName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {conversation.content}
                          </p>
                        </div>
                        {conversation.unreadCount && (
                          <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </NavLink>
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
          {!isChildRouteActive ? (
            <div className="w-full h-full flex justify-center items-center border">
              <div className="flex flex-col">
                <h1 className="font-bold  text-muted-foreground">
                  Please Select Conversation
                </h1>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}
