// HomeContent.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, Plus } from "lucide-react";
import layoffs from "../assets/layoffs.jpg";
import wildfires from "../assets/wildfires.jpg";
import hb1 from "../assets/hb1.jpg";


export default function HomeContent() {
  // USER SIM (replace with real user/profile)
  const user = {
    name: "You",
    location: "CA-12",
    location_full: "San Diego, CA",
    topics: ["Economy & Work", "Voting Rights", "Climate"],
    followingOrgs: ["League of Women Voters", "Common Cause"],
  };

  // Metrics (update when users act)
  const [metrics, setMetrics] = useState({
    messagesSent: 2,
    billsEngaged: 1,
    supported: 1,
    opposed: 0,
  });
  const weeklyGoal = 5;

  // Mock data: bills, news, campaigns
  const [billsAndNews, setBillsAndNews] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [quickBusy, setQuickBusy] = useState(false);

  useEffect(() => {
    // Mock urgent bills + news. each item has type: "bill" | "news", issue tags, urgency.
    const mockCards = [
      {
        id: "hr123",
        type: "bill",
        title: "Worker Rights Protection Act",
        summary: "Strengthens rights to organize and collectively bargain.",
        issues: ["Economy & Work"],
        urgency: "vote_soon", // vote_soon | committee | informational | breaking
        location: "CA-12",
        relatedCampaignId: "c1",
        timestamp: Date.now() - 1000 * 60 * 60,
      },
      {
        id: "news-escort-1",
        type: "news",
        title: "Massive layoffs reported in manufacturing hub",
        summary: "Multiple outlets report sudden layoffs tied to supply-chain shifts.",
        issues: ["Economy & Work"],
        urgency: "breaking",
        location: "National",
        relatedCampaignId: null,
        timestamp: Date.now() - 1000 * 60 * 20,
        imageUrl: layoffs,
      },
      {
        id: "news-escort-2",
        type: "news",
        title: "Major Wildfires Rage in Southern California",
        summary: "Many news stories cover the impact of wildfires and its effects on Californians",
        issues: ["Climate"],
        urgency: "breaking",
        location: "CA-12",
        relatedCampaignId: null,
        timestamp: Date.now() - 1000 * 60 * 20,
        imageUrl: wildfires,
      },
      {
        id: "news-escort-3",
        type: "news",
        title: "H-1B Visa Sparks Fear",
        summary: "",
        issues: ["Economy & Work"],
        urgency: "breaking",
        location: "National",
        relatedCampaignId: null,
        timestamp: Date.now() - 1000 * 60 * 20,
        imageUrl: hb1,
      },
      {
        id: "s442",
        type: "bill",
        title: "AIM HIGH Act",
        summary: "Incentivizes manufacturing and workforce development.",
        issues: ["Economy & Work"],
        urgency: "committee",
        location: "National",
        relatedCampaignId: "c2",
        timestamp: Date.now() - 1000 * 60 * 60 * 8,
      },
    ];

    const mockCampaigns = [
      {
        id: "c1",
        org: "League of Women Voters",
        title: "Support Worker Rights Protection Act",
        summary: "Tell your representative to support HR123.",
        issue: "Economy & Work",
        joinsLast48h: 1450,
        totalJoined: 21500,
        sourceType: "bill",
        sourceId: "hr123",
      },
      {
        id: "c2",
        org: "Common Cause",
        title: "AIM HIGH — Push for Manufacturing Jobs",
        summary: "Push senators to prioritize AIM HIGH funding.",
        issue: "Economy & Work",
        joinsLast48h: 320,
        totalJoined: 4200,
        sourceType: "bill",
        sourceId: "s442",
      },
      {
        id: "c3",
        org: "Local Action Network",
        title: "Emergency Relief for Displaced Workers",
        summary: "Support local relief; tied to recent layoffs.",
        issue: "Economy & Work",
        joinsLast48h: 50,
        totalJoined: 420,
        sourceType: "news",
        sourceId: "news-escort-1",
      },
    ];

    setBillsAndNews(mockCards);
    setCampaigns(mockCampaigns);
  }, []);

  // Derive urgent items (acts the homepage should highlight)
  const urgentItems = billsAndNews.filter((it) =>
    ["vote_soon", "committee", "breaking"].includes(it.urgency)
  );


  // ACTION HANDLERS
  function takeQuickAction(itemId, action) {
    // action: 'support' | 'oppose' | 'voice' | 'joinCampaign'
    setMetrics((m) => {
      const next = { ...m };
      if (action === "voice") next.messagesSent += 1;
      if (action === "joinCampaign") next.messagesSent += 1;
      next.billsEngaged = Math.min(next.billsEngaged + 1, 99999);
      return next;
    });
  }

  async function quickTakeActionThenDisable(buttonAction, id) {
    // simulate debounce / loading on the button
    setQuickBusy(true);
    await new Promise((r) => setTimeout(r, 400));
    takeQuickAction(id, buttonAction);
    setQuickBusy(false);
  }

  // UI helpers
  function urgencyBadge(urgency) {
    switch (urgency) {
      case "vote_soon":
        return <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full">Vote Soon</span>;
      case "committee":
        return <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Committee</span>;
      case "breaking":
        return <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Breaking News</span>;
      default:
        return <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">Update</span>;
    }
  }

function BillRow({ bill }) {
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm">
      {/* Top row: issue + urgency + plus */}
      <div className="flex items-center gap-2 mb-1">
        <div className="flex items-center gap-2">
          <div className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
            {bill.issues?.[0] || "General"}
          </div>
          {urgencyBadge(bill.urgency)}
        </div>
        <button className="ml-auto rounded-full p-1 hover:bg-gray-100 flex items-center justify-center">
        <Plus className="text-gray-600 hover:text-blue-900 transition-colors" size={12} />
        </button>
      </div>

      {/* Title + location */}
      <div className="flex items-center gap-2 mb-1">
        <h3 className="font-semibold text-base">{bill.title}</h3>
        <div className="text-xs bg-indigo-50 text-gray-700 px-2 py-0.5 rounded-full">
          {bill.location}
        </div>
      </div>

      {/* Action */}
      <button
        onClick={() => quickTakeActionThenDisable("voice", item.id)}
        disabled={quickBusy}
        className="w-full text-xs rounded-md border bg-gray-50 hover:bg-gray-100"
      >
        Voice Opinion
      </button>
    </div>
  );
}

// Campaign card component
  function CampaignCard({ c, big }) {
    return (
      <motion.article
        layout
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        className={`p-2 rounded-xl bg-white flex flex-col justify-between shadow-sm ${big ? "w-full" : ""}`}
      >
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full">{c.issue}</div>
              <div className="text-xs text-gray-500">{c.org}</div>
            </div>
            <button className="ml-auto rounded-full p-1 hover:bg-gray-100 flex items-center justify-center">
                <Plus className="text-gray-600 hover:text-blue-900 transition-colors" size={12} />
            </button>
          </div>

          <h4 className=" text-lg font-semibold">{c.title}</h4>
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex-1 text-sm text-gray-500">
            <div>{c.totalJoined.toLocaleString()} joined</div>
            <div className="text-xs text-gray-400">{c.joinsLast48h} joined last 48h</div>
          </div>

        <button
            onClick={() => quickTakeActionThenDisable("joinCampaign", c.id)}
            className="flex-[0_0_70%] px-4 py-2 rounded-lg font-semibold"
        >
            Join Campaign
        </button>
       
        </div>
      </motion.article>
    );
  }

function NewsCard({ news }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      className="rounded-xl shadow-sm bg-white flex flex-col"
    >
      {/* Image (smaller) */}
      <div className="w-full h-32 bg-gray-100 rounded-t-xl relative overflow-hidden">
        <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full object-cover"
        />
        <button className="absolute top-2 right-2 hover:bg-gray-100 p-1 rounded-full shadow-sm">
            <Plus className="text-gray-600 hover:text-blue-900 transition-colors" size={10} />
        </button>
        {/* Issue badge overlay */}
        <div className="absolute bottom-2 left-2 text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full shadow-sm">
            {news.issues?.[0] || "General"}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        
        {/* Title + location */}
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-base">{news.title}</h3>
          <div className="text-xs bg-indigo-50 text-gray-700 px-2 py-0.5 rounded-full">
            {news.location}
          </div>
        </div>


        {/* CTA */}
        <button
          onClick={() => quickTakeActionThenDisable("voice", news.id)}
          disabled={quickBusy}
          className="mt-auto px-2 py-1 text-xs rounded-lg border bg-gray-100 hover:bg-gray-200"
        >
          Voice Opinion
        </button>
      </div>
    </motion.article>
  );
}


  return (
    <div className="py-2 px-2 g:p-10 grid grid-cols-1 lg:grid-cols-12 gap-4 bg-gray-300 min-h-screen">
        {/* Top metrics & location */}
        <aside className="lg:col-span-12 bg-gray-100 px-4 py-2 rounded-xl shadow-sm flex flex-col lg:flex-row justify-between items-center gap-2">
        {/* User Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div>
            <div className="text-lg font-bold">Your Advocacy Briefing</div>
            <div className="text-sm text-gray-500">Monday, September 22</div>
            </div>
            <div className="w-px h-10 bg-black hidden sm:block"></div>

            <div>
            <div className="text-lg text-gray-500">Location</div>
            <div className="text-sm font-bold">{user.location_full}</div>
            </div>
        </div>

        {/* Metrics */}
        <div className="flex gap-4">
            <div className="bg-white rounded-xl p-3 text-center min-w-[80px]">
            <div className="text-xl font-bold">{metrics.messagesSent}</div>
            <div className="text-sm text-gray-500">Messages</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-3 text-center min-w-[80px]">
            <div className="text-xl font-bold">{metrics.supported}</div>
            <div className="text-sm text-emerald-700">Supported</div>
            </div>
            <div className="bg-rose-50 rounded-xl p-3 text-center min-w-[80px]">
            <div className="text-xl font-bold">{metrics.opposed}</div>
            <div className="text-sm text-rose-700">Opposed</div>
            </div>
        </div>
        </aside>


        {/* Bills Section */}
        <div className="lg:col-span-4 flex flex-col gap-4 ">
            {/* Legislation Section */}
            <section className="bg-gray-100 rounded-xl shadow-sm h-[45vh] overflow-y-auto">
                <div className="sticky top-0 bg-gray-100 z-10 px-4 pt-4 pb-2 border-b border-gray-600">
                    <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">Legislation - </h2>
                    <p className="text-sm text-gray-500">Urgent bills that need attention</p>
                    </div>
                </div>
                <div className="py-2 mx-2 space-y-2">
                    {billsAndNews.filter((b) => b.type === "bill").map((b) => (
                    <BillRow key={b.id} bill={b} />
                    ))}
                </div>
            </section>

            {/* Campaigns Section */}
            <section className="bg-gray-100 rounded-xl shadow-sm h-[45vh] overflow-y-auto">
                <div className="sticky top-0 bg-gray-100 z-10 px-4 pt-4 pb-2 border-b border-gray-600">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold">Campaigns - </h2>
                        <p className="text-sm text-gray-500">Take Action Together</p>
                    </div>
                </div>
            <div className="py-2 mx-2 space-y-2">
                {campaigns.map((c) => (
                <CampaignCard key={c.id} c={c} big />
                ))}
            </div>
            </section>
        </div>


    {/* News Section */}
    <section className="lg:col-span-8 bg-gray-100 p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-bold">News -</h2>
            <p className="text-sm text-gray-500">Top Stories Today</p>
        </div>
        <div className="my-2 border-t border-gray-600" />
            {/* Top Stories */}
            <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">National</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {billsAndNews
                    .filter((b) => b.type === "news" && b.location === "National")
                    .map((n) => (
                    <NewsCard key={n.id} news={n} />
                    ))}
        </div>
    </div>

    {/* Local Stories */}
    <div>
        <h3 className="text-lg font-semibold mb-2">Local</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {billsAndNews
            .filter((b) => b.type === "news" && b.location === "CA-12")
            .map((n) => (
            <NewsCard key={n.id} news={n} />
            ))}
        </div>
    </div>
    </section>

        
    </div>
  );
}