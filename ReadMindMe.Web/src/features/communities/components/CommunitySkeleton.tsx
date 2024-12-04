import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Search } from 'lucide-react'


function CommunitySkeleton() {
    return (
        <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-[1fr,300px] gap-6">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-8 w-[250px]" />
                <Skeleton className="h-4 w-[400px]" />
              </div>

              {/* Search Bar */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input disabled className="w-full" placeholder="Search communities..." />
                </div>
                <Button disabled className="gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>

            {/* Community Cards */}
            {[1, 2, 3].map((index) => (
              <Card key={index} className="w-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                  <Skeleton className="h-6 w-[100px]" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Communities */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-[180px]" />
              <div className="space-y-2">
                {[1, 2].map((index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Community Guidelines */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-[200px]" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Skeleton className="h-2 w-2 rounded-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-[150px]" />
              <div className="space-y-2">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-[130px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
}

export default CommunitySkeleton
