import { useState } from "react";
import Carousel from "../Carousel/advocacyCarousel";

export function AdvocacyContent({ locName }) {
// Example dummy advocacy group cards
  const savedGroups = [
    { title: "FairVote", description: "Pushing ranked choice voting.", hasCampaign: true },
    { title: "League of Women Voters", description: "Voter education & turnout.", hasCampaign: false },
  ];

  const activeGroups = [
    { title: "Vote.org", description: "Mobilizing voters nationwide.", hasCampaign: true },
    { title: "Rock the Vote", description: "Youth voter engagement.", hasCampaign: true },
    { title: "FairVote", description: "Pushing ranked choice voting.", hasCampaign: true },
  ];

  const otherGroups = [
    { title: "Democracy Works", description: "Improving voter access.", hasCampaign: false },
    { title: "League of Women Voters", description: "Voter education & turnout.", hasCampaign: false },
  ];

  const allGroups = [...savedGroups, ...activeGroups, ...otherGroups];

  const displayName = locName
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

  const engagementStats = {
    total: 120,       // total campaigns built
    actionsPrompted: 50000,  // total actions prompted
    activeGroups: 30,       // number of active groups
    billsInfluenced: 100 //bills influenced
  };

  const [showAllGroups, setShowAllGroups] = useState(false); // Expandable toggle

  return (
    <div className="p-4 flex flex-col gap-6">
      {/* Action Banner */}
      <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded shadow flex flex-col items-center gap-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 mt-2">{displayName}</h1>

          {/* Highlighted action line */}
          <p className="text-black text-xl md:text-2xl font-extrabold mb-2 ">
            Voter Advocacy Groups
          </p>
        </div>

        {/* Metrics */}
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <div className="bg-white rounded shadow px-4 py-2 text-center">
            <p className="text-lg font-bold text-yellow-600">{engagementStats.total.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Campaigns Built</p>
          </div>
          <div className="bg-white rounded shadow px-4 py-2 text-center">
            <p className="text-lg font-bold text-yellow-600">{engagementStats.actionsPrompted}</p>
            <p className="text-sm text-gray-600">Voters Mobilized Through Campaigns</p>
          </div>
          <div className="bg-white rounded shadow px-4 py-2 text-center">
            <p className="text-lg font-bold text-yellow-600">{engagementStats.activeGroups}</p>
            <p className="text-sm text-gray-600">Active Groups</p>
          </div>
          <div className="bg-white rounded shadow px-4 py-2 text-center">
            <p className="text-lg font-bold text-yellow-600">{engagementStats.billsInfluenced}</p>
            <p className="text-sm text-gray-600">Bill Influenced</p>
          </div>
        </div>
      </div>


      {/* Saved Groups */}
      <h3 className="text-lg font-semibold mb-2">Saved Groups</h3>
      <Carousel cards={savedGroups} />

      {/* Groups with Active Campaigns */}
      <h3 className="text-lg font-semibold mt-6 mb-2">Groups With Active Campaigns</h3>
      <Carousel cards={activeGroups} />

    {/* Expandable "View All Legislation" Section */}
    <div className="mt-6">
    <button
        onClick={() => setShowAllGroups(!showAllGroups)}
        className="w-full flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg shadow-md font-semibold"
    >
        <span className="text-gray-600 text-sm">
        {displayName === "National"
        ? `View all Organizations at the ${displayName} level`
        : `View all Organizations localized to ${displayName}`}
        </span>
        <span>{showAllGroups ? "▲" : "▼"}</span>
    </button>

    {showAllGroups && (
        <div className="mt-4 flex flex-col gap-4">
        
        {/* Grid of All Bills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allGroups.map((group, idx) => (
            <div key={idx} className="p-4 border rounded shadow hover:shadow-md transition">
                <h4 className="font-bold mb-1">{group.title}</h4>
                <p className="text-gray-600">{group.description}</p>
            </div>
            ))}
        </div>
        </div>
    )}
    </div>
    </div>
  );
}
