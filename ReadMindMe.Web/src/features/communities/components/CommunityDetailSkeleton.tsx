import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList } from '@/components/ui/tabs'

function CommunitySkeleton() {
  return (
    <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-[1fr,300px] gap-6">
    {/* Main Content */}
    <div className="space-y-6">
      {/* Community Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
        <div className="flex items-center gap-2 mt-4">
          <Skeleton className="h-6 w-[100px]" />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full justify-start h-12 bg-transparent">
          {['Posts', 'Events', 'Resources'].map((tab) => (
            <Skeleton key={tab} className="h-9 w-24" />
          ))}
        </TabsList>
      </Tabs>

      {/* Create Post Card */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[140px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[120px] w-full mb-4" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-9 w-[100px]" />
            <Skeleton className="h-9 w-[80px]" />
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      {[1, 2, 3].map((post) => (
        <Card key={post}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-[100px]" />
                  <Skeleton className="h-4 w-[60px]" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex gap-4 mt-4">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Sidebar */}
    <div className="space-y-6">
      {/* Community Leaders */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[180px]" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((leader) => (
            <div key={leader} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Community Stats */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[160px]" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((stat) => (
            <div key={stat} className="flex justify-between items-center">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-6 w-[60px] rounded-full" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[120px]" />
        </CardHeader>
        <CardContent className="space-y-2">
          {[1, 2, 3].map((link) => (
            <Skeleton key={link} className="h-8 w-full" />
          ))}
        </CardContent>
      </Card>
    </div>
  </div>
  )
}

export default CommunitySkeleton
