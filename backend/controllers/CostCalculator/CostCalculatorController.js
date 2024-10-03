const CostCalculator = require("../../models/CostCalculator/costCalculator");

const getBaseCostPerAcre = (crop) => {
  const baseCosts = {
      'Gotukola': 90,      // Leafy vegetables typically have lower costs
      'Carrot': 150,       // Carrots require more soil preparation
      'Pumpkin': 180,      // Large, water-dependent crop
      'Potato': 250,       // Tuber crops are labor and input intensive
      'Tomato': 220,       // Requires trellising and nutrient management
      'Basmati Rice': 200, // Specialized rice, usually higher input cost
      'Spinach': 120,      // Leafy vegetables, lower cost
      'Garlic': 180,       // Requires moderate soil fertility
      'Oyster Mushroom': 300, // Higher input cost due to substrate preparation
      'Chili Pepper': 170, // Moderate, common in regional agriculture
      'Cabbage': 140,      // Leafy vegetable with moderate cost
      'Ginger': 220,       // Requires more maintenance and time
      'Beetroot': 190,     // Root crops need moderate attention
      'Lettuce': 130,      // Fast-growing, low-cost leafy vegetable
  };
  return baseCosts[crop] || 100; // Default base cost if crop is not found
};
   
   const adjustCostForWaterResources = (waterResources) => {
      const waterCostMultiplier = {
          'Abundant': 0.7,   // Lower cost as less water management is needed
          'Moderate': 1.0,   // Standard cost
          'Scarce': 1.6,     // Significant increase due to water scarcity
          'Limited': 1.3,    // Costs rise due to the need for optimized irrigation
  };
      return waterCostMultiplier[waterResources] || 1.0; // Default multiplier
   };
   
   const adjustCostForSoilType = (soilType) => {
      const soilCostMultiplier = {
          'Fertile': 0.85,      // Fertile soil requires fewer inputs
          'Moderately Fertile': 1.1, // Slightly higher cost for fertilizers
          'Poor': 1.5,          // Poor soil requires significant investment
          'Sandy': 1.4,         // Sandy soil often needs more water/fertilizers
          'Rich': 0.75,         // Rich soil minimizes input costs
      };
      return soilCostMultiplier[soilType] || 1.0; // Default multiplier
   };
   
   const determineFertilizerNeeds = (crop, soilType) => {
    const needs = {
      'Gotukola': 'Low Nitrogen and Phosphorus requirement; 50kg NPK (Nitrogen, Phosphorus, Potassium) per acre',
      'Carrot': 'Moderate Nitrogen and Potassium; 150kg NPK per acre, with additional 30kg Potassium',
      'Pumpkin': 'High Nitrogen and Phosphorus; 120kg NPK per acre, with an extra 20kg Nitrogen',
      'Potato': 'High Nitrogen and Phosphorus; 200kg NPK per acre, with 40kg Potassium',
      'Tomato': 'High Potassium and Nitrogen; 180kg NPK per acre, 50kg Potassium',
      'Basmati Rice': 'Moderate Nitrogen, Phosphorus, and Potassium; 100kg NPK per acre',
      'Spinach': 'Low Nitrogen; 60kg NPK per acre',
      'Garlic': 'Moderate Nitrogen and Phosphorus; 120kg NPK per acre',
      'Oyster Mushroom': 'Requires specialized substrate with Nitrogen, no traditional fertilizer',
      'Chili Pepper': 'Moderate Nitrogen and Potassium; 100kg NPK per acre, 20kg Potassium',
      'Cabbage': 'High Nitrogen; 140kg NPK per acre, with additional 40kg Nitrogen',
      'Ginger': 'Moderate Nitrogen and Potassium; 120kg NPK per acre',
      'Beetroot': 'Moderate Nitrogen and Potassium; 150kg NPK per acre',
      'Lettuce': 'Low Nitrogen and Phosphorus; 60kg NPK per acre',
    };
    return needs[crop] || `Standard fertilizer for ${soilType} soil`;
  };
  
   
  const determineWaterNeeds = (crop, area, waterResources) => {
    const waterNeeds = {
      'Gotukola': `${(area * 0.5).toFixed(2)} acre-feet of water per season`,  // Gotukola is a leafy green and requires minimal water
      'Carrot': `${(area * 1.5).toFixed(2)} acre-feet per season`,  // Root crop with moderate water needs
      'Pumpkin': `${(area * 1.8).toFixed(2)} acre-feet per season`,  // Large fruit with high water demand
      'Potato': `${(area * 2.0).toFixed(2)} acre-feet per season`,  // Potatoes require a significant amount of water
      'Tomato': `${(area * 1.2).toFixed(2)} acre-feet per season`,  // Moderate water needs for fruiting vegetables
      'Basmati Rice': `${(area * 3.0).toFixed(2)} acre-feet per season`,  // Rice requires high water levels
      'Spinach': `${(area * 0.7).toFixed(2)} acre-feet per season`,  // Leafy green with lower water needs
      'Garlic': `${(area * 1.0).toFixed(2)} acre-feet per season`,  // Bulb crop with moderate water needs
      'Oyster Mushroom': `Water needs depend on controlled indoor cultivation`,  // Mushrooms require a controlled humid environment
      'Chili Pepper': `${(area * 1.1).toFixed(2)} acre-feet per season`,  // Requires moderate water for fruit development
      'Cabbage': `${(area * 1.5).toFixed(2)} acre-feet per season`,  // Leafy vegetable with moderate water needs
      'Ginger': `${(area * 1.4).toFixed(2)} acre-feet per season`,  // Requires consistent watering for tuber growth
      'Beetroot': `${(area * 1.6).toFixed(2)} acre-feet per season`,  // Root crop with moderate water needs
      'Lettuce': `${(area * 0.9).toFixed(2)} acre-feet per season`,  // Leafy vegetable with low-to-moderate water needs
    };
    return waterNeeds[crop] || `Water needs based on ${waterResources} resources.`;
  };
  
   
   // Main calculation function
   exports.calculateCost = async (req, res) => {
      try {
          const { crop, area, waterResources, soilType, userId } = req.body;
   
          if (!crop || !area || !waterResources || !soilType) {
              throw new Error('Missing required input fields');
          }
   
          const baseCostPerAcre = getBaseCostPerAcre(crop);
          const waterCostAdjustment = adjustCostForWaterResources(waterResources);
          const soilCostAdjustment = adjustCostForSoilType(soilType);
   
          if (baseCostPerAcre === undefined || waterCostAdjustment === undefined || soilCostAdjustment === undefined) {
              throw new Error('Calculation parameters not properly defined');
          }
   
          const estimatedCostInDollars = area * baseCostPerAcre * waterCostAdjustment * soilCostAdjustment;
          const estimatedCost = estimatedCostInDollars.toFixed(2)*300.00;

          const fertilizerNeeds = determineFertilizerNeeds(crop, soilType);
          const waterNeeds = determineWaterNeeds(crop, area, waterResources);
   
          const newCalculation = new CostCalculator({
            crop,
            area,
            waterResources,
            soilType,
            estimatedCost,
            fertilizerNeeds,
            waterNeeds,
            userId
          });
   
          await newCalculation.save();
   
          res.status(200).json(newCalculation);
      } catch (error) {
          console.error('Error calculating cost:', error.message);
          res.status(500).json({ message: 'Error calculating cost. Please try again.' });
      }
   };

exports.previousCalculations = async (req, res) => {
  try {
    const { userId } = req.query; // Retrieve userId from query parameters
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const calculations = await CostCalculator.find({ userId });
    res.status(200).json(calculations);
  } catch (error) {
    console.error('Error fetching user calculations:', error.message);
    res.status(500).json({ message: 'Error fetching calculations. Please try again.' });
  }
};
