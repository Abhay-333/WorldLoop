import { Avatar } from "./Avatar"
import { Plus } from "lucide-react"

function OwnStory() {
  return (
    <div className="flex w-16 shrink-0 flex-col items-center gap-1.5">
      <div className="relative">
        <div className="rounded-full bg-[#EFE7E1] p-[2.5px]">
          <div className="rounded-full bg-white p-[2px]">
            <Avatar name="Abhay Sharma" size={56} />
          </div>
        </div>
        <div className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#FF3D66]">
          <Plus className="h-3 w-3 text-white" strokeWidth={3} />
        </div>
      </div>
      <span className="text-[11px] text-[#5C5560]">Your story</span>
    </div>
  )
}

export default OwnStory