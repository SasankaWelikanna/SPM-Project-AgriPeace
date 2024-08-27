const CostCalculator = require("../../models/CostCalculator/costCalculator");

const getBaseCostPerAcre = (crop) => {
   const baseCosts = {
       'Corn': 150,
       'Wheat': 120,
       'Rice': 200,
       'Soybeans': 180,
       'Barley': 110,
   };
   return baseCosts[crop] || 100; // Default base cost if crop is not found
};

const adjustCostForWaterResources = (waterResources) => {
   const waterCostMultiplier = {
       'Abundant': 0.8,
       'Moderate': 1.0,
       'Scarce': 1.5,
       'Limited': 1.3,
   };
   return waterCostMultiplier[waterResources] || 1.0; // Default multiplier
};

const adjustCostForSoilType = (soilType) => {
   const soilCostMultiplier = {
       'Fertile': 0.9,
       'Moderately Fertile': 1.1,
       'Poor': 1.3,
       'Sandy': 1.2,
       'Rich': 0.8,
   };
   return soilCostMultiplier[soilType] || 1.0; // Default multiplier
};

const determineFertilizerNeeds = (crop, soilType) => {
   return `Fertilizer needs for ${crop} in ${soilType} soil.`;
};

const determineWaterNeeds = (crop, area, waterResources) => {
   return `Water needs for ${crop} over ${area} acres with ${waterResources} water resources.`;
};

// Main calculation function

exports.calculateCost = async (req, res) => {
   try {
       const { crop, area, waterResources, soilType } = req.body;

       console.log('Received data:', { crop, area, waterResources, soilType });

       if (!crop || !area || !waterResources || !soilType) {
           throw new Error('Missing required input fields');
       }

       const baseCostPerAcre = getBaseCostPerAcre(crop);
       const waterCostAdjustment = adjustCostForWaterResources(waterResources);
       const soilCostAdjustment = adjustCostForSoilType(soilType);

       if (baseCostPerAcre === undefined || waterCostAdjustment === undefined || soilCostAdjustment === undefined) {
           throw new Error('Calculation parameters not properly defined');
       }

       const estimatedCost = area * baseCostPerAcre * waterCostAdjustment * soilCostAdjustment;

       const fertilizerNeeds = determineFertilizerNeeds(crop, soilType);
       const waterNeeds = determineWaterNeeds(crop, area, waterResources);

       const costEstimate = new CostCalculator({
           crop,
           area,
           waterResources,
           soilType,
           estimatedCost,
           fertilizerNeeds,
           waterNeeds
       });

       await costEstimate.save();

       res.status(200).json(costEstimate);
   } catch (error) {
       console.error('Error calculating cost:', error.message);
       res.status(500).json({ message: 'Error calculating cost. Please try again.' });
   }
};
