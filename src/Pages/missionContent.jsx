import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollText,ChevronDown, ChevronUp } from "lucide-react";

export default function MissionContent() {
  const navigate = useNavigate();
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [gettingStartedOpen, setGettingStartedOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 p-6 overflow-y-auto">
      <div className="w-full max-w-4xl space-y-4">
        {/* Mission Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Welcome to eGutenbergPress
          </h1>

          <p className="text-gray-600 text-lg">
            At eGutenberg Press, our mission is to{" "}
            <span className="font-semibold">bring the power back to the people</span> by connecting
            constituents directly with their elected officials in a simple, centralized, and meaningful way. 
          </p>
          <p className="text-gray-600 text-lg">
            Don’t let your voice fade into the noise of social media — be heard by the leaders who represent you. 
            An engaged public is the foundation of a healthy democracy.
          </p>
          <p className="text-gray-600 text-lg">
            By making advocacy effortless and impactful, eGutenberg 
            Press helps ensure your perspective isn’t just part of the conversation — it drives it. 
          </p>
          <p className="text-gray-600 text-lg">
            <span className="font-bold">We're different: </span>
            eGutenberg Press is your all-in-one hub — the only place you need to get 
            curated campaigns, news, and legislation on issues that matter, while sending messages effortlessly to the policymakers who can act on them.
          </p>
          <p className="text-center text-xl text-orange-700 font-bold">
            Join the advocacy groups already here, and discover the power of your VOICE!
          </p>

          <div className="flex gap-6 justify-center mt-4"> 
            {/* Button */} 
            <button onClick={() => navigate("/navigation-example/home")} className=" py-2 text-white rounded-lg hover:bg-blue-700" 
            style={{backgroundColor: "black"}} > 
              Get Started 
            </button> 
            {/* Login Link */} 
            <span className=" py-2 hover:underline cursor-pointer" > 
              Log In 
            </span> 
          </div>
        </div>

        {/* Verification Callout */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-2">Verification = Impact</h2>
          <p className="text-lg">
            We verify your voter registration to ensure your messages are taken seriously by policymakers. Verified info also allows us to autofill your profile and personalize your letters with relevant demographic insights, giving your voice more weight.
          </p>
        </div>


        {/* Features Card */}
        <div className="bg-white rounded-xl shadow border border-gray-200">
          <button
            onClick={() => setFeaturesOpen(!featuresOpen)}
            className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 hover:bg-gray-50 rounded-t-xl"
            style={{backgroundColor:"#f3f4f6"}}
          >
          
            Features
            {featuresOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          <AnimatePresence initial={false}>
            {featuresOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 pb-4 space-y-2 text-gray-600 text-lg"
              >
                <div className="p-4">
                  <p>
                    <span className="font-bold">Direct Impact - </span>
                    Send messages to policymakers in just a few clicks.
                  </p>
                  <p>
                    <span className="font-bold">All-in-One Hub - </span>
                    Access everything you need for advocacy in one place: messages, updates, campaigns, and insights.
                  </p>
                  <p>
                    <span className="font-bold">Personalized Advocacy - </span>
                    Verified voter info allows us to autofill your profile and letters with demographic context.
                  </p>
                  <p>
                    <span className="font-bold">Curated Updates - </span>
                    Stay informed with the latest bills, campaigns, and national + local news tailored to the issues you engage with.
                  </p>
                  <p>
                    <span className="font-bold">Action Oriented - </span>
                    Support campaigns, explore issues you care about, and compare insights across districts to see how your community stacks up.
                    </p>
                  
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Getting Started Card */}
        <div className="bg-white rounded-xl shadow border border-gray-200">
          <button
            onClick={() => setGettingStartedOpen(!gettingStartedOpen)}
            className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 hover:bg-gray-50 rounded-t-xl"
              style={{backgroundColor:"#f3f4f6"}}
          >
            Getting Started
            {gettingStartedOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          <AnimatePresence initial={false}>
            {gettingStartedOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 pb-4 space-y-2 text-gray-600 text-lg"
              >
                <ol className="list-decimal pl-5 space-y-1 p-4">
                  <li>Browse issues and explore topics that matter to you</li>
                  <li>Find your local representatives and explore your district insights to inform your letters</li>
                  <li>Click “Voice Opinion” or “Join Campaign” to send messages</li>
                  <li>Verify your voter registration for maximum impact</li>
                  <li>Return daily to stay updated and influence key decisions</li>
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

