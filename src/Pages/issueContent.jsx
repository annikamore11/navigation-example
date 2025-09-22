import { useState } from "react";
import BillCarousel from "../Carousel/billCarousel";

// Map URL-friendly issue names to content
export const issueContentMap = {
  "all": "All issues overview content...",
  "climate-energy-&-environment": "Climate content goes here...",
  "criminal-justice": "Criminal Justice content goes here...",
  "defense-&-national-security": "Defense & National Security content goes here...",
  "discrimination-&-prejudice": "Discrimination & Prejudice content goes here...",
  "economy-&-work": "Economy & Work content goes here...",
  "education": "Education content goes here...",
  "health-policy": "Health Policy content goes here...",
  "immigration-&-migration": "Immigration & Migration content goes here...",
  "international-affairs": "International Affairs content goes here...",
  "national-conditions": "National Conditions content goes here...",
  "religion-&-government": "Religion & Government content goes here...",
  "technology": "Technology content goes here..."
};

const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming"
];

const locations = ["National", "Current Location", ...usStates];


// Example legislation cards categorized by priority
const legislationCards = {
  high: [
    { title: "Climate Bill 2025", description: "Urgent: Act now to influence votes.", hasCampaign: true },
    { title: "Education Reform Act", description: "High impact for your state.", hasCampaign: false }
  ],
  medium: [
    { title: "Healthcare Update Act", description: "Consider responding within a week.", hasCampaign: true }
  ],
  low: [
    { title: "Local Zoning Law", description: "Optional feedback.", hasCampaign: false }
  ]
};

// Example cards for other tabs
export const exampleCards = {
  News: [
    {
      id: "news-1",
      title: "Major Supreme Court Ruling Defunds Medicare",
      description: "Court decision reshapes healthcare policy nationwide.",
      issue: "health-policy", // 👈 tag
      articles: [
        { title: "NYTimes Coverage", url: "https://example.com/nyt" },
        { title: "Politico Coverage", url: "https://example.com/politico" },
      ],
    },
    {
      id: "news-2",
      title: "Climate Bill Blocked in Senate",
      description: "A major climate bill was stalled after procedural votes.",
      issue: "climate-energy-&-environment", // 👈 tag
      articles: [
        { title: "CNN Coverage", url: "https://example.com/cnn" },
        { title: "Reuters Coverage", url: "https://example.com/reuters" },
      ],
    },
  ],
  Campaigns: [
    {
      title: "Support Affordable Care Act",
      description: "League of Women Voters urges you to voice OPPOSITION to the new court ruling ",
      issue: "health-policy", // 👈 tag
      sourceType: "News",
      sourceId: "news-1",
    },
    {
      title: "Push for Renewable Energy Standards",
      description: "Join us in demanding clean energy legislation.",
      issue: "climate-energy-&-environment", // 👈 tag
      sourceType: "News",
      sourceId: "news-2",
    },
  ],
};



export function IssueContent({ issueName }) {
  const displayName = issueName
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

  const [activeType, setActiveType] = useState("Legislation");
  const [locationFilter, setLocationFilter] = useState("National");
  const [showAllBills, setShowAllBills] = useState(false); // Expandable toggle
  const [selectedBillStatus, setSelectedBillStatus] = useState("introduced");

  // Filter data by issueName
  const filteredNews = exampleCards.News.filter(
    (n) => n.issue === issueName
  );
  const filteredCampaigns = exampleCards.Campaigns.filter(
    (c) => c.issue === issueName
  );

  // Placeholder stats (replace with live data if available)
  const engagementStats = {
    total: 12345,       // total actions nationally
    impactPercent: 78,  // percentage of bills influenced
    conRepReach: 435,       // number of representatives reached
    stateRepReach: 2000
  };
  
  const allBills = [...legislationCards.high, ...legislationCards.medium, ...legislationCards.low];


  return (
    <div className="p-4 flex flex-col gap-6">
      {/* Action Banner */}
      <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded shadow flex flex-col items-center gap-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 mt-2">{displayName}</h1>

          {/* Highlighted action line */}
          <p className="text-red-700 text-xl md:text-2xl font-extrabold mb-2 animate-pulse">
            Reach the people that matter in a few simple clicks!
          </p>
        </div>

        {/* Metrics */}
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <div className="bg-white rounded shadow px-4 py-2 text-center">
            <p className="text-lg font-bold text-red-600">{engagementStats.total.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Actions taken nationally</p>
          </div>
          <div className="bg-white rounded shadow px-4 py-2 text-center">
            <p className="text-lg font-bold text-red-600">{engagementStats.impactPercent}%</p>
            <p className="text-sm text-gray-600">Bills influenced</p>
          </div>
          <div className="bg-white rounded shadow px-4 py-2 text-center">
            <p className="text-lg font-bold text-red-600">{engagementStats.conRepReach}</p>
            <p className="text-sm text-gray-600">Congressional reps reached</p>
          </div>
          <div className="bg-white rounded shadow px-4 py-2 text-center">
            <p className="text-lg font-bold text-red-600">{engagementStats.stateRepReach}</p>
            <p className="text-sm text-gray-600">State reps reached</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-center flex-wrap gap-4 items-center">
        {/* Type Tabs */}
        <div className="flex w-full gap-2">
          {[
            { key: "Legislation", hint: "See bills you can influence" },
            { key: "News", hint: "Read the latest news and respond" },
            { key: "Campaigns", hint: "Support campaigns related to this issue" }
        ].map((type) => (
          <button
            key={type.key}
            title={type.hint}
            className={`flex-1 px-6 py-3 text-lg rounded-xl font-bold shadow-md transition  ${
              activeType === type.key
                ? "bg-gray-800 text-black font-bold"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setActiveType(type.key)}
            style={{
              backgroundColor: activeType == type.key ? "#e5e5e5" : "white",
              border: activeType === type.key ? "2px solid #4b5563" : "none",
              fontWeight: activeType == type.key ? "bold": "normal",
            }}
          >
            {type.key}
          </button>
        ))}
        </div>

        {/* Location Filter */}
        <div className="flex flex-col items-center gap-2">
          <select
            className="rounded px-2 py-1 w-40 bg-white shadow-md transition"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <p className="text-gray-600 text-sm">
          {locationFilter === "National"
            ? "** Viewing congressional bills, and national-level news and campaigns. **"
            : `** Viewing legislation, news, and campaigns localized to ${locationFilter}. **`}
          </p>
        </div>
        
      </div>



      {/* Legislation Section with Carousel */}
      {activeType === "Legislation" && (
        <>
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Trending - Weigh In</h3>
              <BillCarousel cards={legislationCards.high} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">This Legislation is Moving – Act Now</h3>
              <BillCarousel cards={legislationCards.high} />
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Introduced Bills Gaining Traction – Shape the Debate</h3>
              <BillCarousel cards={legislationCards.medium} />
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Recently Passed – Express Your Support or Concern</h3>
              <BillCarousel cards={legislationCards.low} />
            </div>
          </div>

          {/* Expandable "View All Legislation" Section */}
          <div className="mt-6">
            <button
              onClick={() => setShowAllBills(!showAllBills)}
              className="w-full flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg shadow-md font-semibold"
            >
              <span className="text-gray-600 text-sm">
              {locationFilter === "National"
                ? `View all bills in Congress related to ${displayName}`
                : `View all bills in ${locationFilter} related to ${displayName}`}
              </span>
              <span>{showAllBills ? "▲" : "▼"}</span>
            </button>

            {showAllBills && (
              <div className="mt-4 flex flex-col gap-4">
                {/* Status Tabs */}
                <div className="flex gap-2 flex-wrap">
                  {["introduced", "committee", "house", "senate", "passed"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedBillStatus(status)}
                      className={`px-4 py-2 rounded-lg shadow-sm transition font-semibold ${
                        selectedBillStatus === status
                          ? "bg-gray-300 border-2 border-gray-700"
                          : "bg-white border border-gray-300"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Grid of All Bills */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allBills.map((bill, idx) => (
                    <div key={idx} className="p-4 border rounded shadow hover:shadow-md transition">
                      <h4 className="font-bold mb-1">{bill.title}</h4>
                      <p className="text-gray-600">{bill.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </>
      )}
      
      

      {/* News */}
      {activeType === "News" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNews.map((news, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-lg shadow hover:shadow-md p-4 transition"
            >
              <h4 className="font-bold text-lg mb-2">{news.title}</h4>
              <p className="text-gray-600 mb-3">{news.description}</p>

              <details className="mt-2">
                <summary className="cursor-pointer text-sm text-blue-600 font-semibold">
                  View Related Articles
                </summary>
                <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                  {news.articles.map((a, i) => (
                    <li key={i}>
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {a.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
        </div>
      )}

      {/* Campaigns */}
      {activeType === "Campaigns" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCampaigns.map((campaign, idx) => {
            let source = null;

            if (campaign.sourceType === "News") {
              source = exampleCards.News.find((n) => n.id === campaign.sourceId);
            }
            // Later you can add: if (campaign.sourceType === "Bill") { ... }

            return (
              <div
                key={idx}
                className="bg-white border rounded-lg shadow hover:shadow-md p-4 transition"
              >
                <h4 className="font-bold text-lg mb-2">{campaign.title}</h4>
                <p className="text-gray-600">{campaign.description}</p>

                {/* Support button */}
                <button className="mt-3 px-3 py-1 bg-red-600 text-black rounded shadow hover:bg-red-700 transition">
                  View Campaign
                </button>

                {/* Dropdown for source */}
                {source && (
                  <details className="mt-3">
                    <summary className="cursor-pointer text-sm text-blue-600 font-semibold">
                      View Related {campaign.sourceType}
                    </summary>
                    <div className="mt-2 text-sm text-gray-700">
                      <p className="font-semibold">{source.title}</p>
                      <p className="text-gray-600 mb-2">{source.description}</p>
                      {source.articles && (
                        <ul className="list-disc list-inside">
                          {source.articles.map((a, i) => (
                            <li key={i}>
                              <a
                                href={a.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                {a.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </details>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}