import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Layers } from 'lucide-react';

/**
 * ProfilePostsGrid
 * Fixed 3-column square grid (distinct from the masonry grid on
 * ExplorePage — profile grids are uniform by design, Explore is
 * discovery-driven). Hover overlay shows like/comment counts on
 * desktop; a small "multi-post" icon marks carousels.
 *
 * pages: array of { posts: [...] } from useInfiniteQuery
 */
const ProfilePostsGrid = ({
  pages,
  isLoading,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  emptyLabel = 'No posts yet',
}) => {
  const sentinelRef = useRef(null);
  const posts = pages?.flatMap((page) => page.posts) ?? [];

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '400px' }
    );
    const node = sentinelRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-1 sm:gap-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-square animate-pulse bg-muted" />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-20 text-center">
        <p className="text-lg font-medium">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-1 sm:gap-2">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/p/${post.id}`}
            className="group relative aspect-square overflow-hidden bg-muted"
          >
            <img
              src={post.thumbnailUrl}
              alt={post.caption ?? ''}
              className="h-full w-full object-cover"
              loading="lazy"
            />

            {post.mediaCount > 1 && (
              <Layers className="absolute right-2 top-2 h-4 w-4 fill-white text-white drop-shadow" />
            )}

            <div className="absolute inset-0 hidden items-center justify-center gap-5 bg-black/40 opacity-0 transition-opacity group-hover:flex group-hover:opacity-100 sm:flex">
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <Heart className="h-5 w-5 fill-white" />
                {post.likesCount}
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <MessageCircle className="h-5 w-5 fill-white" />
                {post.commentsCount}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div ref={sentinelRef} className="h-1" />
    </>
  );
};

export default ProfilePostsGrid;