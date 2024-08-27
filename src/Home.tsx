import React from "react";

export default function Main() {
  return (
    <div className="mt-10">
      <div className="flex justify-center items-center m-20 space-x-4">
        <p className="text-4xl pl-20 md:text-6xl lg:text-9xl text-ba font-bold">
          DataNill
        </p>
        <p className="text-xl pl-10 pr-20 md:text-2xl lg:text-3xl mt-5 font-bold">
          Welcome to DataNill, the revolutionary platform where data collection
          meets privacy and fairness. Our service enables both data collectors
          and submitters to engage in a secure, transparent environment,
          ensuring that contributions are valued and protected. Join us in
          reshaping the future of data crowdsourcing.
        </p>
      </div>
      <div className="bg-ba pt-20 pb-20">
        <p className="text-4xl md:text-6xl lg:text-9xl text-white font-bold text-center">
          Our Mission
        </p>
        <p className="text-xl md:text-2xl lg:text-3xl mt-5 text-white font-bold text-center">
          Provide people around the world a fair environment to participate in
          data crowdsourcing.
        </p>
      </div>
      <div className="flex justify-center items-center pt-20 pb-20">
        <p className="text-9xl font-bold text-ba text-center">
          Decentralized Secret Data Crowd Sourcing
        </p>
      </div>

      <div className="bg-ba pt-20 pb-20 pl-10 pr-10">
        <p className="text-4xl md:text-6xl lg:text-9xl font-bold text-white text-center">
          The Problem
        </p>
        <div className="flex justify-center space-x-4 mt-5">
          <div className="flex-1 p-4 border rounded">
            <p className="text-xl md:text-xl lg:text-3xl text-white font-bold text-center">
              Data is very crucial for companies to make decisions and train AI
              models and this data is collected from people. For the data
              providers, the data is very important as it might be private and
              very sensitive data like medical, financial, educational, and
              family data. Users want to provide sensitive data but also want to
              maintain privacy and secrecy.
            </p>
          </div>
          <div className="flex-1 p-4 border rounded">
            <p className="text-xl md:text-xl lg:text-3xl text-white font-bold text-center">
              Micro-tasks don't pay much, and companies often force minimum
              earnings for withdrawals, not to mention the fees associated with
              cashing out.
            </p>
          </div>
          <div className="flex-1 p-4 border rounded">
            <p className="text-xl md:text-xl lg:text-3xl text-white font-bold text-center">
              Additionally, companies can often reject your work for no reason,
              and even worse, may use the data even after rejecting your work.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-20 pb-20 pl-10 pr-10">
        <p className="text-4xl md:text-6xl lg:text-9xl font-bold text-center">
          The Solution
        </p>
        <div className="flex justify-center space-x-4 mt-5">
          <div className="flex-1 p-4 border rounded border-black">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
              Decentralized crowdsourcing platform that runs on smart contracts
              rather than a centralized entity is our solution.
            </p>
          </div>
          <div className="flex-1 p-4 border rounded border-black">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
              We aspire to build the largest web3 community that can crowdsource
              the most diverse and high-quality data sets to power AI
              applications.
            </p>
          </div>
          <div className="flex-1 p-4 border rounded border-black">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
              Decentralized crowdwork will help democratize AI and return power
              and ownership to the people who contribute to it.
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-4xl text-ba pb-20 md:text-9xl lg:text-9xl font-bold text-center">Lets Be Fair...</p>
      </div>
      <div className="bg-ba text-white py-3 text-center">
        <p className="text-lg font-bold">DataNill</p>
        <p className="text-white">Built @ HH GOA</p>
      </div>
    </div>
  );
}
