import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/components/ui/avatar';
import { MoreHorizontal, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * ProfileHeader
 *
 * profile shape expected:
 * {
 *   username, displayName, avatarUrl, bio, websiteUrl,
 *   postsCount, followersCount, followingCount,
 *   isVerified, hasActiveStory, isOwnProfile, isFollowedByMe
 * }
 *
 * The gradient ring around the avatar only appears when hasActiveStory
 * is true — same visual language a Stories feature (V2) would reuse,
 * so this component won't need to change when that phase lands.
 */
const ProfileHeader = ({ profile, onFollowToggle, isFollowPending }) => {
  const {
    username,
    displayName,
    avatarUrl,
    bio,
    websiteUrl,
    postsCount,
    followersCount,
    followingCount,
    isVerified,
    hasActiveStory,
    isOwnProfile,
    isFollowedByMe,
  } = profile;

  return (
    <div className="flex flex-col gap-6 px-4 pt-8 sm:flex-row sm:gap-10 sm:px-0">
      {/* Avatar */}
      <div className="flex justify-center sm:block sm:shrink-0">
        <div
          className={cn(
            'rounded-full p-[3px]',
            hasActiveStory &&
              'bg-[conic-gradient(from_45deg,#f9ce34,#ee2a7b,#6228d7,#f9ce34)]'
          )}
        >
          <Avatar className="h-24 w-24 border-2 border-background sm:h-36 sm:w-36">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback className="text-2xl">
              {displayName?.[0]?.toUpperCase() ?? username?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-semibold">{username}</h1>

          {isOwnProfile ? (
            <div className="flex gap-2">
              <Button asChild variant="secondary" size="sm">
                <Link to="/accounts/edit">Edit profile</Link>
              </Button>
              <Button variant="secondary" size="icon" className="sm:hidden">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={isFollowedByMe ? 'secondary' : 'default'}
                onClick={onFollowToggle}
                disabled={isFollowPending}
              >
                {isFollowedByMe ? 'Following' : 'Follow'}
              </Button>
              <Button variant="secondary" size="sm">
                Message
              </Button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-4 hidden gap-8 sm:flex">
          <StatItem label="posts" value={postsCount} />
          <StatItem label="followers" value={followersCount} to={`/${username}/followers`} />
          <StatItem label="following" value={followingCount} to={`/${username}/following`} />
        </div>

        {/* Bio */}
        <div className="mt-4 space-y-0.5">
          <div className="flex items-center gap-1">
            <p className="font-medium">{displayName}</p>
            {isVerified && (
              <BadgeCheck className="h-4 w-4 fill-primary text-background" />
            )}
          </div>
          {bio && (
            <p className="whitespace-pre-line text-sm text-foreground">
              {bio}
            </p>
          )}
          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm font-medium text-primary hover:underline"
            >
              {websiteUrl.replace(/^https?:\/\//, '')}
            </a>
          )}
        </div>

        {/* Stats (mobile, below bio, IG puts these under bio on small screens) */}
        <div className="mt-4 flex justify-between border-y py-3 sm:hidden">
          <StatItem label="posts" value={postsCount} stacked />
          <StatItem label="followers" value={followersCount} to={`/${username}/followers`} stacked />
          <StatItem label="following" value={followingCount} to={`/${username}/following`} stacked />
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ label, value, to, stacked }) => {
  const content = (
    <div className={cn(stacked ? 'flex flex-col items-center gap-0.5' : 'flex items-center gap-1')}>
      <span className="font-semibold">{formatCount(value)}</span>
      <span className={cn('text-sm', stacked ? 'text-xs text-muted-foreground' : 'text-muted-foreground')}>
        {label}
      </span>
    </div>
  );

  if (!to) return content;

  return (
    <Link to={to} className="transition-opacity hover:opacity-70">
      {content}
    </Link>
  );
};

const formatCount = (count) => {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return String(count ?? 0);
};

export default ProfileHeader;