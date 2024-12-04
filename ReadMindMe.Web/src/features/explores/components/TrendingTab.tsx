
import { PostResponse } from '@/features/posts/types/postType'
import TrendingCard from './TrendingCard'

type trendingProp = {
  trendings: PostResponse[]
  onLike: (id: number)=>void
}
function TrendingTab({trendings, onLike}: trendingProp) {
  return (
    <div className="grid gap-6">
    {trendings.map((post) => (
      <TrendingCard key={post.id} post={post} onLike={onLike} />
    ))}
  </div>
  )
}

export default TrendingTab
