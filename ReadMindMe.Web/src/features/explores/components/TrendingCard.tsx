import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { MoreHorizontal, BookOpen, Heart, MessageCircle } from 'lucide-react'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'


import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PostResponse } from '@/features/posts/types/postType'



type trendingProp = {
    post: PostResponse
    onLike: (id: number)=>void
}
function TrendingCard({post, onLike}: trendingProp) {
  return (
    <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{post.author.name}</CardTitle>
            <CardDescription>2 hours ago</CardDescription>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Save Post</DropdownMenuItem>
            <DropdownMenuItem>Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>
    <CardContent className="space-y-2">
      <p>{post.content}</p>
      {post.verse && (
        <Badge variant="secondary" className="flex items-center space-x-1">
          <BookOpen className="h-3 w-3" />
          <span>{post.verse.text}</span>
          <span className="text-xs">({post.verse.book})</span>
        </Badge>
      )}
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="ghost" size="sm" onClick={()=>onLike(post.id)}>
        <Heart className="mr-2 h-4 w-4" />
        {post.likes}
      </Button>
      <Button variant="ghost" size="sm">
        <MessageCircle className="mr-2 h-4 w-4" />
        {post.comments.length}
      </Button>
    </CardFooter>
  </Card>
  )
}

export default TrendingCard
