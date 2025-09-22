import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BillCarousel({ cards }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "right" ? clientWidth : -clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">

      {/* Carousel */}
        <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 scroll-smooth py-2 px-8"
        >
        {cards.map((card) => (
            <div
            key={card.title}
            className="relative flex-shrink-0 w-64 bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer transition flex flex-col justify-between"
            >
            {/* Top-right + button */}
            <button
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 text-black font-bold"
                title="More info"
            >
                +
            </button>
            <div>
                <h4 className="font-bold">{card.title}</h4>
                <p className="text-gray-700 mt-1">{card.description}</p>
            </div>

            <div className="mt-4 relative">
                <button className="w-full px-3 py-1 bg-green-600 text-black rounded hover:bg-green-700">
                Voice Opinion
                </button>

                {card.hasCampaign && (
                <span className="absolute bottom-full mb-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                    📢 Active Campaign
                </span>
                )}
            </div>
            </div>
        ))}
        </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-2 z-10 hover:bg-gray-200"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}

