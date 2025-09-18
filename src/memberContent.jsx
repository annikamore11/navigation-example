import { useState } from "react";
import {Plus} from "lucide-react"

export function MemberContent({ locName }) {
    const displayName = locName
        .split("-")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" ");

  // Determine if we're showing national or state-level
  const isCongress = displayName === "Congress";

  // Filters
  const [selectedState, setSelectedState] = useState(isCongress ? "" : displayName);
  const [selectedChamber, setSelectedChamber] = useState("");
  const [selectedCommittee, setSelectedCommittee] = useState("");

  // Example committee lists
  const committees = {
    All: ["Finance", "Judiciary", "Health", "Education", "Ways & Means", "Education", "Health", "Transportation"],
    Senate: ["Finance", "Judiciary", "Health", "Education"],
    House: ["Ways & Means", "Education", "Health", "Transportation"]
  };

  // Assign chamber and committee to each member
  const senateMembers = [
    { name: "Jane Doe", party: "Democrat", chamber: "Senate", legislature: "Congress", committee: "Finance", state: "Maine", letters: {total: 3000, month: 30}},
    { name: "John Smith", party: "Republican", chamber: "Senate", legislature: "Congress", committee: "Health", state: "New York", letters: {total: 10000, month: 700 }}
  ];

  const houseMembers = [
    { name: "Alice Johnson", party: "Democrat", chamber: "House", legislature: "Congress", committee: "Education", state: "California", letters: {total: 2000, month: 80 }},
    { name: "Bob Lee", party: "Republican", chamber: "House", legislature: "Congress",committee: "Transportation", state: "Texas", letters: { total: 9000, month: 300} }
  ];

    const senateMembersMaine = [
    { name: "Russel Black", party: "Republican", chamber: "Senate", legislature: "Maine", committee: "Finance", state: "Maine", letters: {total: 3000, month: 30}},
    { name: "Henry Ingwersen", party: "Republican", chamber: "Senate", legislature: "Maine", committee: "Health", state: "Maine", letters: {total: 10000, month: 700 }}
  ];

  const houseMembersMaine = [
    { name: "Stephan Bunker", party: "Democrat", chamber: "House", legislature: "Maine", committee: "Education", state: "Maine", letters: {total: 2000, month: 80 }},
    { name: "Sharon Frost", party: "Democrat", chamber: "House", legislature: "Maine",committee: "Transportation", state: "Maine", letters: { total: 9000, month: 300} }
  ];

  // Combine members for filtering
  const allMembers = [...senateMembers, ...houseMembers, ...houseMembersMaine, ...senateMembersMaine];

  // Party color mapping
  const partyColors = { Democrat: "text-blue-600", Republican: "text-red-600", Independent: "text-yellow-600" };

  // Filter members based on chamber and committee
  const filteredMembers = allMembers.filter((member) => {
    const chamberMatch = selectedChamber === "" || member.chamber === selectedChamber;
    const committeeMatch = selectedCommittee === "" || member.committee === selectedCommittee;

    // Show Congress members when displayName is "Congress"
    const stateMatch = isCongress
        ? member.legislature === "Congress"
        : member.legislature === displayName;

    return chamberMatch && committeeMatch && stateMatch;
    });
  // Group filtered members by chamber
  const membersByChamber = {
    Senate: filteredMembers.filter((m) => m.chamber === "Senate"),
    House: filteredMembers.filter((m) => m.chamber === "House")
  };

  // Example states for state filter
  const states = [
    "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
    "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
    "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
    "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
    "New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
    "Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
    "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"
  ];
  
  const engagementStats = {
    total: 535, // total Congress members
    senate: { dem: 45, rep: 53, other: 2 },
    house: { dem: 213, rep: 219, other: 0 },
    committees: 45
};

  return (
    <div className="p-4 flex flex-col gap-6">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded shadow flex flex-col items-center gap-4">
            <div className="text-center">
                {/* Header */}
                <h1 className="text-2xl font-bold text-center">
                    Members
                </h1>
                <p className="text-black text-xl md:text-2xl font-extrabold mb-2 ">
                    {isCongress
                    ? "Congress"
                    : `${displayName} State Legislature`}
                </p>
            </div>
            {/* Metrics */}
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <div className="bg-white rounded shadow px-4 py-2 text-center">
            <p className="text-lg font-bold text-gray-600">Senate</p>
            <p className="text-sm text-gray-600">
                Democrats: <span className="text-lg font-bold text-blue-600">{engagementStats.senate.dem}</span>
            </p>
            <p className="text-sm text-gray-600">
                Republicans: <span className="text-lg font-bold text-red-600">{engagementStats.senate.rep}</span>
            </p>
            <p className="text-sm text-gray-600">
                Indpendents: <span className="text-lg font-bold text-yellow-600">{engagementStats.senate.other}</span>
            </p>
            
          </div>
          <div className="bg-white rounded shadow px-4 py-2 text-center">
            <p className="text-lg font-bold text-gray-600">House</p>
            <p className="text-sm text-gray-600">
                Democrats: <span className="text-lg font-bold text-blue-600">{engagementStats.house.dem}</span>
            </p>
            <p className="text-sm text-gray-600">
                Republicans: <span className="text-lg font-bold text-red-600">{engagementStats.house.rep}</span>
            </p>
            <p className="text-sm text-gray-600">
                Indpendents: <span className="text-lg font-bold text-yellow-600">{engagementStats.house.other}</span>
            </p>
          </div>
          
        </div>
        </div>
      

      {/* Search / Filter */}
     {/* Search */}
      <div className="w-full max-w-md">
        <input
          type="text"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          placeholder={isCongress ? "Search by Name, State, or ZIP" : "Search by Name, District, or ZIP"}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>
    


      {/* Chamber / Committee Filter */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Filter by Chamber and/or Committee</h3>
        <div className="flex gap-2 flex-wrap w-full">
          <select
            value={selectedChamber}
            onChange={(e) => setSelectedChamber(e.target.value)}
            className="text-center bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 transition"
          >
            <option value="">All Chambers</option>
            <option value="Senate">Senate</option>
            <option value="House">House</option>
          </select>

          <select
            value={selectedCommittee}
            onChange={(e) => setSelectedCommittee(e.target.value)}
            className="text-center bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 transition"
          >
            <option value="">Select Committee</option>
            {(committees[selectedChamber] || []).map((committee) => (
              <option key={committee} value={committee}>
                {committee}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Senate Section */}
      {(selectedChamber === "" || selectedChamber === "Senate") && (
        <div>
          <h2 className="text-xl font-bold mb-2">Senate Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {membersByChamber.Senate.map((member, idx) => (
              <div key={idx} className="relative bg-white p-4 rounded shadow hover:shadow-lg transition">
                <div className="absolute top-2 right-2 cursor-pointer hover:text-blue-600">
                  <Plus size={20} />
                </div>
                <p className={`font-bold ${member.party}`}>{member.name}</p>
                <p className={`${partyColors[member.party]} font-semibold`}>{member.party}</p>
                <p className="text-gray-600 text-sm">State: {member.state}</p>
                <div className="mt-2 flex flex-col gap-1">
                    <p className="text-gray-600 font-bold text-sm">eGP Letters Received:</p>
                    
                    <p className="text-gray-600 bg-gray-100 px-2 py-1 rounded text-sm inline-block">
                        Total: <span className={`${partyColors[member.party]} font-bold`}>{member.letters.total}</span>
                    </p>
                    
                    <p className="text-gray-600 bg-gray-100 px-2 py-1 rounded text-sm inline-block">
                        This Month: <span className={`${partyColors[member.party]} font-bold`}>{member.letters.month}</span>
                    </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* House Section */}
      {(selectedChamber === "" || selectedChamber === "House") && (
        <div>
          <h2 className="text-xl font-bold mb-2">House Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {membersByChamber.House.map((member, idx) => (
              <div key={idx} className="relative bg-white p-4 rounded shadow hover:shadow-lg transition">
                <div className="absolute top-2 right-2 cursor-pointer hover:text-blue-600">
                  <Plus size={20} />
                </div>
                <p className={`font-bold ${member.party}`}>{member.name}</p>
                <p className={`${partyColors[member.party]} font-semibold`}>{member.party}</p>
                <p className="text-gray-600 text-sm">State: {member.state}</p>
                <div className="mt-2 flex flex-col gap-1">
                    <p className="text-gray-600 font-bold text-sm">eGP Letters Received:</p>
                    
                    <p className="text-gray-600 bg-gray-100 px-2 py-1 rounded text-sm inline-block">
                        Total: <span className={`${partyColors[member.party]} font-bold`}>{member.letters.total}</span>
                    </p>
                    
                    <p className="text-gray-600 bg-gray-100 px-2 py-1 rounded text-sm inline-block">
                        This Month: <span className={`${partyColors[member.party]} font-bold`}>{member.letters.month}</span>
                    </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    

    </div>
  );
}
