import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { People } from "@/features/user/types/user"

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Users } from "lucide-react"


type peopleProp = {
    user: People
    onFollow: (id: number) =>void
}
function PeopleCard({user, onFollow}: peopleProp) {
  return (
    <Card>
    <CardHeader>
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.role}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardFooter>
      <Button
        className="w-full"
        variant={user.following ? "outline" : "default"}
        onClick={() => onFollow (user.id)}
      >
        <Users className="h-4 w-4 mr-2" />
        {user.following ? "Following" : "Follow"}
      </Button>
    </CardFooter>
  </Card>
  )
}

export default PeopleCard
