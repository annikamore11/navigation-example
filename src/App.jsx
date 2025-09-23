import { useState } from "react";
import { Menu, X, ChevronRight, ChevronLeft, Building2, LogIn, UserRound } from "lucide-react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, HashRouter } from "react-router-dom";
import MissionContent from "./Pages/missionContent.jsx";
import HomeContent from "./Pages/homeContent.jsx";
import {IssueContent} from "./Pages/issueContent.jsx";
import {AdvocacyContent} from "./Pages/advocacyContent.jsx";
import {MemberContent} from "./Pages/memberContent.jsx";


function MissionPage() {
  return <MissionContent />;
}

function HomePage() {
  return <HomeContent />;
}

function IssuePage() {
  const { issueName } = useParams();
  return <IssueContent issueName={issueName} />;
}

function AdvocacyPage() {
  const { locName } = useParams();
  return <AdvocacyContent locName={locName} />;
}

function MemberPage() {
  const { locName } = useParams();
  return <MemberContent locName={locName} />;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showIssues, setShowIssues] = useState(false);
  const [showLoc, setShowLoc] = useState(false);
  const [showLocMem, setShowLocMem] = useState(false);
  const navigate = useNavigate();

  const issuesList = [
    "All",
    "Climate, Energy & Environment",
    "Criminal Justice",
    "Defense & National Security",
    "Discrimination & Prejudice",
    "Economy & Work",
    "Education",
    "Health Policy",
    "Immigration & Migration",
    "International Affairs",
    "National Conditions",
    "Religion & Government",
    "Technology"
  ];

  const states = [
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
const locations = ["National", ...states];
const Jurisdictions = ["Congress", ...states];

  // Handle selecting an issue
  const handleSelectIssue = (issue) => {
    setMenuOpen(false);   // close menu
    setShowIssues(false); // close submenu
    setShowLoc(false);
    setShowLocMem(false);
    const route = `/issues/${issue.toLowerCase().replace(/\s+/g, "-")}`;
    navigate(route)
  };
  const handleSelectLoc = (loc) => {
    setMenuOpen(false);   // close menu
    setShowIssues(false); // close submenu
    setShowLoc(false);
    setShowLocMem(false);
    const route = `/loc/${loc.toLowerCase().replace(/\s+/g, "-")}`;
    navigate(route)
  };
  const handleSelectLocMem = (loc) => {
    setMenuOpen(false);   // close menu
    setShowIssues(false); // close submenu
    setShowLoc(false);
    setShowLocMem(false);
    const route = `/members/${loc.toLowerCase().replace(/\s+/g, "-")}`;
    navigate(route)
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="flex items-center p-4 bg-gray-800 shadow z-10 justify-between">
        {/* Logo on the left */}
        <p className="text-s font-semibold text-white cursor-pointer" 
        onClick={() => navigate("/home")}
        >
          eGutenbergPress
        </p>

        {/* Buttons on the right */}
        <div className="flex items-center gap-2">
          <button className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            <UserRound className="w-4 h-4 mr-2" />
            <span>Dashboard</span>
          </button>

          <button className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            <Building2 className="w-4 h-4 mr-2" />
            <span>Partners</span>
          </button>

          <button className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            <LogIn className="w-4 h-4 mr-2" />
            <span>Log-In</span>
          </button>

          <button onClick={() => setMenuOpen(true)} className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            <Menu className="w-4 h-4 m-1" />
          </button>
        </div>
      </header>


      {/* Overlay */} 
      {menuOpen && ( 
        <div className="fixed inset-0 bg-black opacity-20 z-10" 
        onClick={() => setMenuOpen(false)} >
        </div> 
      )}

      

      {/* Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-20 flex flex-col ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex-1 overflow-y-auto">
          {/* Issues Header */}
          {showIssues && (
            <div className="flex items-center p-4 border-b">
              <button onClick={() => setShowIssues(false)} className="mr-2">
                <ChevronLeft className="w-4 h-4 text-black" />
              </button>
              <h2 className="p-4 flex justify-center font-bold">Issues</h2>
              <div className="w-6" />
            </div>
          )}

          {/* Locations Header */}
          {showLoc && (
            <div className="flex items-center p-4 border-b">
              <button onClick={() => setShowLoc(false)} className="mr-2">
                <ChevronLeft className="w-4 h-4 text-black" />
              </button>
              <h2 className="p-4 flex justify-center font-bold">Locations</h2>
              <div className="w-6" />
            </div>
          )}
          {/* Locations for Members Header */}
          {showLocMem && (
            <div className="flex items-center p-4 border-b">
              <button onClick={() => setShowLocMem(false)} className="mr-2">
                <ChevronLeft className="w-4 h-4 text-black" />
              </button>
              <h2 className="p-4 flex justify-center font-bold">Jurisdictions</h2>
              <div className="w-6" />
            </div>
          )}

          {/* Main Menu */}
          {!showIssues && !showLoc && !showLocMem &&(
            <>
            <div className="p-4 flex justify-center font-bold border-b">Navigation</div>
            <ul className="p-2 space-y-2">
              <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">For You</li>
              <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">Following</li>
              <div className="border-t border-gray-300 my-2"></div>
              <li
                className="flex justify-between items-center p-2 rounded hover:bg-gray-200 cursor-pointer"
                onClick={() => setShowIssues(true)}
              >
                <span>Issues</span>
                <ChevronRight className="w-4 h-4" />
              </li>
              <li
                className="flex justify-between items-center p-2 rounded hover:bg-gray-200 cursor-pointer"
                onClick={() => setShowLoc(true)}
              >
                <span>Organizations</span>
                <ChevronRight className="w-4 h-4" />
              </li>
              <li
                className="flex justify-between items-center p-2 rounded hover:bg-gray-200 cursor-pointer"
                onClick={() => setShowLocMem(true)}
              >
                <span>Legislators</span>
                <ChevronRight className="w-4 h-4" />
              </li>
              <div className="border-t border-gray-300 my-2"></div>
            </ul>
            </>
          )}

          {/* Issues Submenu */}
          {showIssues && (
            <ul className="p-2 space-y-2">
              {issuesList.map((issue) => (
                <li
                  key={issue}
                  className="p-2 rounded hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectIssue(issue)}
                >
                  {issue}
                </li>
              ))}
            </ul>
          )}

          {/* Location Submenu */}
          {showLoc && (
            <ul className="p-2 space-y-2">
              {locations.map((loc) => (
                <li
                  key={loc}
                  className="p-2 rounded hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectLoc(loc)}
                >
                  {loc}
                </li>
              ))}
            </ul>
          )}
          {/* Location of Members Submenu */}
          {showLocMem && (
            <ul className="p-2 space-y-2">
              {Jurisdictions.map((loc) => (
                <li
                  key={loc}
                  className="p-2 rounded hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectLocMem(loc)}
                >
                  {loc}
                </li>
              ))}
            </ul>
          )}
          
        </div>
        
      </div>

      



      {/* Main Content */}
      <main className="flex-1 overflow-y-auto text-gray-600">
        <Routes>
          <Route path="/navigation-example" element={<MissionPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/issues/:issueName" element={<IssuePage />} />
          <Route path="/loc/:locName" element={<AdvocacyPage />} />
          <Route path="/members/:locName" element={<MemberPage />} />

        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center flex justify-between gap-4">
        &copy; {new Date().getFullYear()} eGutenbergPress. All rights reserved.{" "}
        <a
          href="/navigation-example/"
          className="text-white hover:underline ml-2"
        >
          Our Mission
        </a>
      </footer>
    </div>
  );
}

// Wrap App in Router
export function Root() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}




