import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';
import ProfilePostsGrid from '../components/ProfilePostsGrid';
import { useProfile } from '../hooks/useProfile';
import { useProfilePosts } from '../hooks/useProfilePosts';
import { useToggleFollow } from '../hooks/useToggleFollow';

const EMPTY_LABELS = {
  posts: 'No posts yet',
  saved: 'Nothing saved yet',
  tagged: 'No tagged posts',
};

const ProfilePage = () => {
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState('posts');

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useProfile(username);

  const {
    data: postsData,
    isLoading: isPostsLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useProfilePosts(username, activeTab);

  const { mutate: toggleFollow, isPending: isFollowPending } =
    useToggleFollow(username);

  if (isProfileLoading) {
    return <ProfileSkeleton />;
  }

  if (isProfileError || !profile) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 text-center">
        <p className="text-lg font-medium">This account doesn't exist</p>
        <p className="text-sm text-muted-foreground">
          Try checking the username and searching again.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl pb-12">
      <ProfileHeader
        profile={profile}
        isFollowPending={isFollowPending}
        onFollowToggle={() => toggleFollow(profile.isFollowedByMe)}
      />

      <ProfileTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOwnProfile={profile.isOwnProfile}
      />

      <div className="mt-1">
        <ProfilePostsGrid
          pages={postsData?.pages}
          isLoading={isPostsLoading}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          emptyLabel={EMPTY_LABELS[activeTab]}
        />
      </div>
    </div>
  );
};

const ProfileSkeleton = () => (
  <div className="mx-auto max-w-3xl animate-pulse pb-12">
    <div className="flex gap-6 px-4 pt-8 sm:gap-10 sm:px-0">
      <div className="h-24 w-24 shrink-0 rounded-full bg-muted sm:h-36 sm:w-36" />
      <div className="flex-1 space-y-4">
        <div className="h-5 w-32 rounded bg-muted" />
        <div className="h-4 w-64 rounded bg-muted" />
        <div className="h-4 w-48 rounded bg-muted" />
      </div>
    </div>
    <div className="mt-8 grid grid-cols-3 gap-1 sm:gap-2">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="aspect-square bg-muted" />
      ))}
    </div>
  </div>
);

export default ProfilePage;