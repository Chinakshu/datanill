// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataCrowdsourcing {
    struct DataEntry {
        string storeId;
        string dataName;
        string UID;
        address submitter;
        bool paid;
    }
    
    struct Campaign {
        string name;
        string UID;
        uint256 budget;
        uint256 numTasks;
        uint256 payPerTask;
        bool active;
        uint256 remainingBudget;
        uint256 entryCount; //0xBD7388875afcFd8ED303855E1888e60D13860750
        address owner; // Added owner to track campaign creator
        mapping(uint256 => DataEntry) entries;
    }
    
    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaignCount;
    mapping(address => uint256[]) public userCampaigns;

    event CampaignCreated(uint256 campaignId, string name, string UID, uint256 budget, uint256 numTasks, uint256 payPerTask, bool active);
    event DataSubmitted(uint256 campaignId, uint256 entryId, string storeId, string dataName, string UID, address submitter);
    event PaymentReleased(uint256 campaignId, uint256 entryId, address submitter, uint256 amount);
    event CampaignWithdrawn(uint256 campaignId, address creator, uint256 amount);

    function createCampaign(
        string memory name,
        string memory UID,
        uint256 budget,
        uint256 numTasks,
        uint256 payPerTask,
        bool active
    ) external payable {
        require(msg.value == budget, "Budget must be deposited");

        campaignCount++;
        Campaign storage newCampaign = campaigns[campaignCount];
        newCampaign.name = name;
        newCampaign.UID = UID;
        newCampaign.budget = budget;
        newCampaign.numTasks = numTasks;
        newCampaign.payPerTask = payPerTask;
        newCampaign.active = active;
        newCampaign.remainingBudget = budget;
        newCampaign.owner = msg.sender; // Set the campaign creator as owner

        userCampaigns[msg.sender].push(campaignCount);

        emit CampaignCreated(campaignCount, name, UID, budget, numTasks, payPerTask, active);
    }

    function submitData(uint256 campaignId, string memory storeId, string memory dataName, string memory UID) external {
        Campaign storage campaign = campaigns[campaignId];
        require(campaign.active, "Campaign is not active");
        require(keccak256(abi.encodePacked(campaign.UID)) == keccak256(abi.encodePacked(UID)), "UID does not match");
        require(campaign.entryCount < campaign.numTasks, "Campaign has reached maximum number of tasks");

        campaign.entryCount++;
        campaign.entries[campaign.entryCount] = DataEntry(storeId, dataName, UID, msg.sender, false);

        emit DataSubmitted(campaignId, campaign.entryCount, storeId, dataName, UID, msg.sender);
    }

    function releasePayment(uint256 campaignId, uint256 entryId) external {
        Campaign storage campaign = campaigns[campaignId];
        require(campaign.owner == msg.sender, "Only the campaign creator can release payments"); // Check campaign owner
        require(campaign.budget >= campaign.payPerTask, "Insufficient budget");
        require(campaign.entries[entryId].submitter != address(0), "Invalid entry");
        require(!campaign.entries[entryId].paid, "Payment already released");

        campaign.remainingBudget -= campaign.payPerTask;
        campaign.entries[entryId].paid = true;
        payable(campaign.entries[entryId].submitter).transfer(campaign.payPerTask);

        emit PaymentReleased(campaignId, entryId, campaign.entries[entryId].submitter, campaign.payPerTask);
    }

    function getEntries(uint256 campaignId) external view returns (DataEntry[] memory) {
        Campaign storage campaign = campaigns[campaignId];
        DataEntry[] memory entries = new DataEntry[](campaign.entryCount);
        for (uint256 i = 1; i <= campaign.entryCount; i++) {
            entries[i-1] = campaign.entries[i];
        }
        return entries;
    }

    function withdraw(uint256 campaignId) external {
        Campaign storage campaign = campaigns[campaignId];
        require(campaign.owner == msg.sender, "Only the campaign creator can withdraw"); // Check campaign owner
        require(!campaign.active, "Campaign is still active");
        require(campaign.remainingBudget > 0, "No remaining budget to withdraw");

        uint256 amountToWithdraw = campaign.remainingBudget;
        campaign.remainingBudget = 0;
        payable(campaign.owner).transfer(amountToWithdraw);

        emit CampaignWithdrawn(campaignId, campaign.owner, amountToWithdraw);
    }

    function getCampaignDetails(uint256 campaignId) external view returns (
        string memory name,
        string memory UID,
        uint256 budget,
        uint256 numTasks,
        uint256 payPerTask,
        bool active,
        uint256 remainingBudget,
        uint256 entryCount
    ) {
        Campaign storage campaign = campaigns[campaignId];
        return (
            campaign.name,
            campaign.UID,
            campaign.budget,
            campaign.numTasks,
            campaign.payPerTask,
            campaign.active,
            campaign.remainingBudget,
            campaign.entryCount
        );
    }
}
