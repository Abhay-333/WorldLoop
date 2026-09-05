import { useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ImagePlus,
  MapPin,
  Users,
  Check,
  X,
  Eye,
  MessageSquareOff,
} from "lucide-react";
import StepRing from "../components/StepRing";
import MediaTile from "../components/MediaTile";
import { MOCK_GALLERY } from "@/components/utils/componentsUtils";

/**
 * WorldLoop — Create post
 * Feature-based location: /post/pages/CreatePostPage.jsx
 * Two steps: pick media (up to 10, carousel-ready) → caption + details → share.
 * Wire the final payload into your existing Post model: media[], caption,
 * taggedUsers[], location, settings.hideLikeCount, settings.commentsOff.
 *
 * Sub-pieces (MediaTile, StepRing, Toggle) are colocated for a single-file
 * preview — split into /post/components/ when adding to the real app.
 */

// Signature: an open arc on step 1, a closed loop on step 2 — the post
// "completes the loop" the moment it's ready to share.

export default function CreatePostPage() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState([]);
  const [uploaded, setUploaded] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [taggedOpen, setTaggedOpen] = useState(false);
  const [taggedIds, setTaggedIds] = useState([]);
  const [hideLikeCount, setHideLikeCount] = useState(false);
  const [commentsOff, setCommentsOff] = useState(false);
  const fileInputRef = useRef(null);

  const gallery = useMemo(() => [...uploaded, ...MOCK_GALLERY], [uploaded]);

  function toggleSelect(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 10 ? [...prev, id] : prev
    );
  }

  function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    const items = files.map((f, i) => ({ id: `u-${Date.now()}-${i}`, tone: "#6C5CE7", isUpload: true }));
    setUploaded((prev) => [...items, ...prev]);
    setSelected((prev) => [...items.map((i) => i.id), ...prev].slice(0, 10));
  }

  const selectedItems = selected
    .map((id) => gallery.find((g) => g.id === id))
    .filter(Boolean);

  const canContinue = selected.length > 0;
  const canShare = caption.trim().length > 0 || selected.length > 0;

  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl pb-12">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur sm:px-0">
        <button
          onClick={() => (step === 2 ? setStep(1) : null)}
          className={`flex h-7 w-7 items-center justify-center ${step === 2 ? "text-foreground" : "pointer-events-none text-transparent"}`}
        >
          <ChevronLeft size={22} />
        </button>

        <div className="flex items-center gap-2">
          <StepRing step={step} />
          <h1 className="text-base font-medium text-foreground">
            {step === 1 ? "Select media" : "New post"}
          </h1>
        </div>

        {step === 1 ? (
          <button
            disabled={!canContinue}
            onClick={() => setStep(2)}
            className={`px-1 text-sm font-medium ${canContinue ? "text-foreground" : "text-muted-foreground"}`}
          >
            Next
          </button>
        ) : (
          <button
            disabled={!canShare}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium ${canShare ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            Share
          </button>
        )}
      </div>

      {step === 1 && (
        <div>
          {selected.length > 0 && (
            <div className="px-4 py-3 text-xs text-muted-foreground">
              {selected.length} / 10 selected
            </div>
          )}
          <div className="grid grid-cols-3 gap-0.5">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex aspect-square flex-col items-center justify-center gap-1.5 bg-muted"
            >
              <ImagePlus size={22} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Browse</span>
            </button>
            <input ref={fileInputRef} type="file" accept="image/*,video/*" multiple onChange={handleFiles} className="hidden" />
            {gallery.map((item) => (
              <MediaTile
                key={item.id}
                item={item}
                index={selected.includes(item.id) ? selected.indexOf(item.id) : null}
                onToggle={toggleSelect}
              />
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="pb-8">
          <div className="relative aspect-square w-full bg-muted">
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, ${selectedItems[activeSlide]?.tone || "#6C5CE7"}66, var(--color-muted))`,
              }}
            />
            {selectedItems.length > 1 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                {selectedItems.map((_, i) => (
                  <span
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`h-1.5 w-1.5 cursor-pointer rounded-full ${i === activeSlide ? "bg-primary-foreground" : "bg-muted-foreground/40"}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="px-4 pt-4">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              rows={3}
              className="w-full resize-none bg-transparent text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="mt-2 border-t border-border">
            <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
              <MapPin size={18} className="text-muted-foreground" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Add location"
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>

            <button
              onClick={() => setTaggedOpen((v) => !v)}
              className="flex w-full items-center gap-3 border-b border-border px-4 py-3.5"
            >
              <Users size={18} className="text-muted-foreground" />
              <span className={`flex-1 text-left text-sm ${taggedIds.length ? "text-foreground" : "text-muted-foreground"}`}>
                {taggedIds.length ? `${taggedIds.length} tagged` : "Tag people"}
              </span>
            </button>

            {taggedOpen && (
              <div className="border-b border-border bg-muted/50 px-4 py-2">
                {MOCK_PEOPLE.map((p) => {
                  const active = taggedIds.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() =>
                        setTaggedIds((prev) => (active ? prev.filter((x) => x !== p.id) : [...prev, p.id]))
                      }
                      className="w-full flex items-center gap-3 py-2"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium"
                        style={{ background: `${p.tone}22`, color: p.tone }}
                      >
                        {p.initials}
                      </div>
                      <span className="flex-1 text-left text-sm text-foreground">
                        {p.name}
                      </span>
                      {active && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                          <Check size={12} className="text-primary-foreground" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
              <Eye size={18} className="text-muted-foreground" />
              <span className="flex-1 text-sm text-foreground">Hide like count</span>
              <Toggle checked={hideLikeCount} onChange={setHideLikeCount} />
            </div>

            <div className="flex items-center gap-3 px-4 py-3.5">
              <MessageSquareOff size={18} className="text-muted-foreground" />
              <span className="flex-1 text-sm text-foreground">Turn off commenting</span>
              <Toggle checked={commentsOff} onChange={setCommentsOff} />
            </div>
          </div>

          {taggedIds.length > 0 && (
            <div className="flex flex-wrap gap-2 px-4 pt-3">
              {taggedIds.map((id) => {
                const p = MOCK_PEOPLE.find((x) => x.id === id);
                return (
                  <span
                    key={id}
                    className="flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-foreground"
                  >
                    {p.name}
                    <X size={11} className="cursor-pointer" onClick={() => setTaggedIds((prev) => prev.filter((x) => x !== id))} />
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}