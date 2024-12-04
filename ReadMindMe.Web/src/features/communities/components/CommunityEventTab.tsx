import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { Calendar } from "lucide-react"

type CommunityEventTabProps = {
 value: string
}
function CommunityEventTab({ value}: CommunityEventTabProps) {
  return (
    <TabsContent value={value}>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center space-x-4">
                <Calendar className="h-6 w-6" />
                <div>
                  <p className="font-semibold">Sunday Service</p>
                  <p className="text-sm text-muted-foreground">
                    Every Sunday at 10:00 AM
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <Calendar className="h-6 w-6" />
                <div>
                  <p className="font-semibold">Bible Study Group</p>
                  <p className="text-sm text-muted-foreground">
                    Every Wednesday at 7:00 PM
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <Calendar className="h-6 w-6" />
                <div>
                  <p className="font-semibold">Community Outreach</p>
                  <p className="text-sm text-muted-foreground">
                    Saturday, June 15th at 9:00 AM
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
  )
}

export default CommunityEventTab
