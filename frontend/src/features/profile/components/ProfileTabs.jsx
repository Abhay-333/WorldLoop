import { Grid3x3, Bookmark, UserSquare2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * ProfileTabs
 * "Saved" only shown when isOwnProfile — saved posts are private,
 * so it should never render (and the route should never resolve)
 * for anyone viewing someone else's profile.
 */
const TABS = [
  { key: 'posts', label: 'Posts', icon: Grid3x3, ownOnly: false },
  { key: 'saved', label: 'Saved', icon: Bookmark, ownOnly: true },
  { key: 'tagged', label: 'Tagged', icon: UserSquare2, ownOnly: false },
];

const ProfileTabs = ({ activeTab, onTabChange, isOwnProfile }) => {
  const visibleTabs = TABS.filter((tab) => !tab.ownOnly || isOwnProfile);

  return (
    <div className="mt-8 flex border-t">
      {visibleTabs.map(({ key, label, icon: Icon }) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            onClick={() => onTabChange(key)}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 border-t-2 py-3 text-xs font-medium uppercase tracking-wide transition-colors',
              isActive
                ? 'border-foreground text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ProfileTabs;