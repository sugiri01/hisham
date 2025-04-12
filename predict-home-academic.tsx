import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Area, AreaChart, ScatterChart, Scatter, Cell } from 'recharts';
import { Info, Home, Database, Cpu, Zap, BarChart2, GitBranch, LucideBarChart, Eye, Code } from 'lucide-react';

// Sample data for demonstrations
const forecastData = [
  { date: 'Jan', actual: 200, predicted: 210, baseline: 180 },
  { date: 'Feb', actual: 220, predicted: 230, baseline: 200 },
  { date: 'Mar', actual: 250, predicted: 245, baseline: 220 },
  { date: 'Apr', actual: 280, predicted: 275, baseline: 240 },
  { date: 'May', actual: 300, predicted: 310, baseline: 270 },
  { date: 'Jun', actual: 350, predicted: 340, baseline: 300 },
  { date: 'Jul', actual: 380, predicted: 375, baseline: 330 },
  { date: 'Aug', actual: 400, predicted: 390, baseline: 350 },
  { date: 'Sep', actual: 350, predicted: 360, baseline: 330 },
  { date: 'Oct', actual: 300, predicted: 310, baseline: 280 },
  { date: 'Nov', actual: 280, predicted: 275, baseline: 250 },
  { date: 'Dec', actual: 260, predicted: 265, baseline: 230 },
];

const probabilisticForecastData = [
  { time: '00:00', actual: 5500, predicted: 5450, q10: 5250, q25: 5350, q75: 5550, q90: 5650 },
  { time: '02:00', actual: 5300, predicted: 5250, q10: 5050, q25: 5150, q75: 5350, q90: 5450 },
  { time: '04:00', actual: 5200, predicted: 5150, q10: 4950, q25: 5050, q75: 5250, q90: 5350 },
  { time: '06:00', actual: 5400, predicted: 5450, q10: 5250, q25: 5350, q75: 5550, q90: 5650 },
  { time: '08:00', actual: 5800, predicted: 5750, q10: 5550, q25: 5650, q75: 5850, q90: 5950 },
  { time: '10:00', actual: 6000, predicted: 6050, q10: 5850, q25: 5950, q75: 6150, q90: 6250 },
  { time: '12:00', actual: 6100, predicted: 6150, q10: 5950, q25: 6050, q75: 6250, q90: 6350 },
  { time: '14:00', actual: 6200, predicted: 6150, q10: 5950, q25: 6050, q75: 6250, q90: 6350 },
  { time: '16:00', actual: 6000, predicted: 5950, q10: 5750, q25: 5850, q75: 6050, q90: 6150 },
  { time: '18:00', actual: 5900, predicted: 5850, q10: 5650, q25: 5750, q75: 5950, q90: 6050 },
  { time: '20:00', actual: 5700, predicted: 5750, q10: 5550, q25: 5650, q75: 5850, q90: 5950 },
  { time: '22:00', actual: 5600, predicted: 5650, q10: 5450, q25: 5550, q75: 5750, q90: 5850 },
];

const featureImportanceData = [
  { feature: 'Time of Day', importance: 85 },
  { feature: 'Day of Week', importance: 65 },
  { feature: 'Temperature', importance: 80 },
  { feature: 'Humidity', importance: 40 },
  { feature: 'Previous Day', importance: 75 },
  { feature: 'Holiday', importance: 60 },
  { feature: 'Season', importance: 70 },
  { feature: 'Appliance Usage', importance: 55 },
];

const shapValues = [
  { id: 1, feature: 'hour', value: 2.35, color: '#ff0000' },
  { id: 2, feature: 'temperature', value: -0.85, color: '#0000ff' },
  { id: 3, feature: 'rain', value: 0.15, color: '#00ff00' },
  { id: 4, feature: 'weekend', value: -1.2, color: '#ffff00' },
  { id: 5, feature: 'previous day', value: 1.7, color: '#ff00ff' },
  { id: 6, feature: 'holiday', value: -0.8, color: '#00ffff' },
  { id: 7, feature: 'season', value: 0.6, color: '#f0f0f0' },
];

const modelComparisonData = [
  { model: 'ARIMA', accuracy: 65, computation: 90, interpretability: 80 },
  { model: 'Random Forest', accuracy: 75, computation: 70, interpretability: 65 },
  { model: 'LSTM', accuracy: 85, computation: 50, interpretability: 40 },
  { model: 'CNN', accuracy: 80, computation: 55, interpretability: 30 },
  { model: 'Hybrid CNN-LSTM', accuracy: 90, computation: 40, interpretability: 35 },
  { model: 'PREDICT-HOME', accuracy: 92, computation: 35, interpretability: 70 },
];

const modelPerformanceData = [
  { model: 'Linear Regression', rmse: 4236.84, r2: 0.64 },
  { model: 'Ridge Regression', rmse: 4236.83, r2: 0.64 },
  { model: 'Support Vector Regression', rmse: 5336.56, r2: 0.44 },
  { model: 'Deep Neural Network', rmse: 1466.49, r2: 0.96 },
  { model: 'Optimized Keres Model', rmse: 1169.81, r2: 0.97 },
  { model: 'PREDICT-HOME', rmse: 864.39, r2: 0.98 },
];

const attentionData = [
  { timestep: 't-1', weight: 0.8 },
  { timestep: 't-2', weight: 0.6 },
  { timestep: 't-3', weight: 0.4 },
  { timestep: 't-4', weight: 0.3 },
  { timestep: 't-5', weight: 0.2 },
  { timestep: 't-6', weight: 0.1 },
  { timestep: 't-7', weight: 0.1 },
];

const timeSeriesDecompositionData = {
  original: [
    { time: '00:00', value: 6500 },
    { time: '04:00', value: 6300 },
    { time: '08:00', value: 6100 },
    { time: '12:00', value: 6400 },
    { time: '16:00', value: 6600 },
    { time: '20:00', value: 6500 },
    { time: '24:00', value: 6300 },
  ],
  trend: [
    { time: '00:00', value: 6400 },
    { time: '04:00', value: 6300 },
    { time: '08:00', value: 6200 },
    { time: '12:00', value: 6300 },
    { time: '16:00', value: 6400 },
    { time: '20:00', value: 6400 },
    { time: '24:00', value: 6300 },
  ],
  seasonal: [
    { time: '00:00', value: 100 },
    { time: '04:00', value: 0 },
    { time: '08:00', value: -100 },
    { time: '12:00', value: 100 },
    { time: '16:00', value: 200 },
    { time: '20:00', value: 100 },
    { time: '24:00', value: 0 },
  ],
  residual: [
    { time: '00:00', value: 0 },
    { time: '04:00', value: 0 },
    { time: '08:00', value: 0 },
    { time: '12:00', value: 0 },
    { time: '16:00', value: 0 },
    { time: '20:00', value: 0 },
    { time: '24:00', value: 0 },
  ]
};

const projectPhases = [
  { 
    id: 'data',
    title: 'Data Acquisition & Analysis', 
    icon: <Database size={24} />,
    description: 'Collection and exploratory analysis of household electricity consumption data to understand patterns and influential factors.',
    keyPoints: [
      'Dataset preparation with household electricity consumption records',
      'Statistical analysis of consumption patterns',
      'Identification of external factors (weather, time, etc.)',
      'Correlation analysis between variables',
      'Baseline modeling using traditional methods'
    ]
  },
  { 
    id: 'features',
    title: 'Feature Engineering', 
    icon: <BarChart2 size={24} />,
    description: 'Creating and selecting optimal features to enhance the forecasting accuracy of the models.',
    keyPoints: [
      'Temporal feature creation (hour, day, month, holidays)',
      'Weather data integration as contextual features',
      'Feature selection techniques application',
      'Engineering of domain-specific features',
      'Evaluation of feature impact on model performance'
    ]
  },
  { 
    id: 'model',
    title: 'Hybrid Model Development', 
    icon: <Cpu size={24} />,
    description: 'Designing and implementing advanced hybrid deep learning architectures for energy forecasting.',
    keyPoints: [
      'Hybrid CNN-LSTM architecture design',
      'Implementation in TensorFlow/PyTorch',
      'Attention mechanism integration',
      'Hyperparameter optimization',
      'Model training with various feature combinations'
    ]
  },
  { 
    id: 'explainability',
    title: 'Explainability Framework', 
    icon: <Eye size={24} />,
    description: 'Developing methods to interpret and explain the predictions made by the complex AI models.',
    keyPoints: [
      'Implementation of SHAP and LIME techniques',
      'Attention visualization for temporal importance',
      'Feature importance dashboard development',
      'Analysis of consumption pattern drivers',
      'Model refinement based on explainability insights'
    ]
  },
  { 
    id: 'online',
    title: 'Online Learning Integration', 
    icon: <Zap size={24} />,
    description: 'Enabling the system to continuously learn and adapt to changing consumption patterns.',
    keyPoints: [
      'Incremental learning capability extension',
      'Data streaming simulation implementation',
      'Concept drift detection mechanisms',
      'Performance comparison with batch learning',
      'Real-world deployment requirements analysis'
    ]
  },
  { 
    id: 'peak',
    title: 'Peak Demand Prediction', 
    icon: <LucideBarChart size={24} />,
    description: 'Specialized component focused on accurately predicting periods of high electricity demand.',
    keyPoints: [
      'Peak demand event definition and identification',
      'Hybrid model optimization for peak prediction',
      'Comparison with alternative ML approaches',
      'Analysis of peak prediction success factors',
      'Visualization tools for peak demand forecasting'
    ]
  },
  { 
    id: 'integration',
    title: 'System Integration & Evaluation', 
    icon: <GitBranch size={24} />,
    description: 'Combining all components into a unified system and comprehensive performance evaluation.',
    keyPoints: [
      'Unified forecasting system integration',
      'Comprehensive multi-metric evaluation framework',
      'Ablation studies for component contribution analysis',
      'Comparison with state-of-the-art approaches',
      'Analysis of system strengths and limitations'
    ]
  }
];

const interpretabilityMethods = [
  {
    id: 'classical',
    title: 'Classical Interpretable Models',
    icon: <LucideBarChart size={24} />,
    description: 'Models that are inherently interpretable due to their simple and transparent structure.',
    examples: [
      { name: 'Linear Regression', description: 'Clear transformation from input to output with coefficients directly showing feature importance.' },
      { name: 'Rule-Based Models', description: 'Clear ramification and decision paths that are easy to understand.' },
      { name: 'Autoregressive Models', description: 'Linear relationship between past values and predicted future values.' }
    ]
  },
  {
    id: 'decomposition',
    title: 'Time Series Decomposition',
    icon: <GitBranch size={24} />,
    description: 'Breaking down complex time series into simpler, meaningful components that can be individually modeled and interpreted.',
    examples: [
      { name: 'Empirical Mode Decomposition', description: 'Splits signal into high-frequency components and low-frequency residual for easier interpretation.' },
      { name: 'Dynamic Mode Decomposition', description: 'For almost-periodic time series, separates trend and residual with stochastic modeling.' },
      { name: 'Fourier Series Transformation', description: 'Separates long-term and mid-term consumption in seasonal-trend settings.' }
    ]
  },
  {
    id: 'fuzzy',
    title: 'Fuzzy Logic Approaches',
    icon: <Cpu size={24} />,
    description: 'Using fuzzy set theory to model uncertainty and make decisions based on linguistic variables that humans can understand.',
    examples: [
      { name: 'Fuzzy Time Series', description: 'Models time series with fuzzy sets and membership functions, determining transition probabilities.' },
      { name: 'Fuzzy Knowledge Systems', description: 'Expert systems with fewer rules that model special cases like holidays or abnormal days.' },
      { name: 'Fuzzy Cognitive Maps', description: 'Knowledge-based models showing relationships between concepts for understanding interconnections.' }
    ]
  },
  {
    id: 'probabilistic',
    title: 'Probabilistic Models',
    icon: <Info size={24} />,
    description: 'Models that quantify uncertainty in forecasts, providing confidence intervals and probability distributions.',
    examples: [
      { name: 'State Space Models', description: 'Statistical models capturing trends and seasonality with quantified posterior uncertainties.' },
      { name: 'Ensemble Learning', description: 'Using multiple models to generate distribution of forecasts with confidence intervals.' },
      { name: 'Bayesian Structural Time Series', description: 'Combines state-space modeling with Bayesian approach to quantify uncertainties.' }
    ]
  }
];

const explainabilityMethods = [
  {
    id: 'featureImportance',
    title: 'Feature Importance',
    icon: <BarChart2 size={24} />,
    description: 'Methods that help understand which input features have the greatest impact on model predictions.',
    examples: [
      { name: 'SHAP (SHapley Additive exPlanations)', description: 'Game theory approach that explains feature importance for individual or multiple predictions.' },
      { name: 'LIME (Local Interpretable Model-agnostic Explanations)', description: 'Creates locally interpretable models that approximate black-box models for individual predictions.' },
      { name: 'Permutation Importance', description: 'Measure of feature importance based on decrease in model performance when feature values are randomly shuffled.' }
    ]
  },
  {
    id: 'attention',
    title: 'Attention Mechanisms',
    icon: <Eye size={24} />,
    description: 'Techniques that reveal which parts of the input data the model is focusing on when making predictions.',
    examples: [
      { name: 'Transformer Attention', description: 'Shows relationships between different time steps in the input sequence.' },
      { name: 'LSTM Attention', description: 'Reveals which historical time points influence the current prediction most strongly.' },
      { name: 'Cross-Attention for Multi-Entity', description: 'Shows relationships and dependencies between multiple entities like buildings or zones.' }
    ]
  }
];

const PhaseBadge = ({ phase, isActive, onClick }) => {
  return (
    <div 
      className={`flex items-center p-2 mb-2 rounded-lg cursor-pointer transition-all ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
      onClick={() => onClick(phase.id)}
    >
      <div className="mr-3">{phase.icon}</div>
      <div className="text-sm font-medium">{phase.title}</div>
    </div>
  );
};

const PhaseDetail = ({ phase }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="mr-3 p-2 bg-blue-100 rounded-lg text-blue-600">{phase.icon}</div>
        <h2 className="text-2xl font-bold text-gray-800">{phase.title}</h2>
      </div>
      <p className="mb-4 text-gray-600">{phase.description}</p>
      <h3 className="font-semibold text-lg mb-2 text-gray-700">Key Components:</h3>
      <ul className="list-disc pl-6 space-y-2">
        {phase.keyPoints.map((point, index) => (
          <li key={index} className="text-gray-600">{point}</li>
        ))}
      </ul>
    </div>
  );
};

const InterpretabilityCard = ({ method }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center mb-4">
        <div className="mr-3 p-2 bg-indigo-100 rounded-lg text-indigo-600">{method.icon}</div>
        <h3 className="text-xl font-bold text-gray-800">{method.title}</h3>
      </div>
      <p className="mb-4 text-gray-600">{method.description}</p>
      <div className="space-y-3">
        {method.examples.map((example, index) => (
          <div key={index} className="border-l-4 border-indigo-200 pl-4 py-2">
            <h4 className="font-semibold text-gray-700">{example.name}</h4>
            <p className="text-sm text-gray-600">{example.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectOverview = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Overview</h2>
      <p className="mb-4 text-gray-600">
        PREDICT-HOME is a comprehensive AI-based system for domestic energy forecasting that combines hybrid deep learning 
        architectures, intelligent feature engineering, explainable AI techniques, and online learning capabilities to accurately 
        predict household electricity consumption patterns with a focus on peak demand events.
      </p>
      
      <div className="p-4 bg-blue-50 rounded-lg mb-4">
        <h3 className="font-semibold text-lg mb-2 text-blue-700">Academic Relevance:</h3>
        <p className="text-gray-700">
          This project addresses key challenges in the field of electric load forecasting, particularly the need for both accurate predictions
          and transparency in AI models. As highlighted in recent research, the complexity of load forecasting requires advanced modeling
          techniques, while the critical nature of energy decisions demands explainable and interpretable approaches.
        </p>
      </div>
      
      <h3 className="font-semibold text-lg mb-2 text-gray-700">Research Questions:</h3>
      <ol className="list-decimal pl-6 space-y-2 mb-4">
        <li className="text-gray-600">How can hybrid deep learning architectures improve short-term load forecasting accuracy for domestic settings?</li>
        <li className="text-gray-600">Which features and preprocessing techniques most significantly impact forecasting performance?</li>
        <li className="text-gray-600">How can explainability mechanisms enhance trust and understanding of AI-based energy forecasts?</li>
        <li className="text-gray-600">What are the benefits of online learning for adapting to changing consumption patterns?</li>
        <li className="text-gray-600">How do different machine learning approaches compare in their ability to predict peak demand events?</li>
      </ol>
      
      <h3 className="font-semibold text-lg mb-2 text-gray-700">Key Deliverables:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li className="text-gray-600">PREDICT-HOME Software Package with complete implementations</li>
        <li className="text-gray-600">Interactive Dashboard for visualization and analysis</li>
        <li className="text-gray-600">Comprehensive Technical Report</li>
        <li className="text-gray-600">Project Presentation and Demonstration</li>
      </ul>
    </div>
  );
};

const ForecastingDemo = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Energy Forecasting Visualization</h2>
      <p className="mb-4 text-gray-600">
        This visualization demonstrates the improved accuracy of our hybrid model compared to traditional baseline methods.
        The chart shows actual consumption values alongside predictions from both our PREDICT-HOME system and a baseline model.
      </p>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={forecastData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'Energy Consumption (kWh)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual Consumption" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="predicted" stroke="#82ca9d" name="PREDICT-HOME Forecast" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="baseline" stroke="#ffc658" name="Baseline Model" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const ProbabilisticForecast = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Probabilistic Load Forecasting</h2>
      <p className="mb-4 text-gray-600">
        Probabilistic forecasting quantifies uncertainty in predictions, providing confidence intervals around the point forecast.
        This visualization shows actual values, point predictions, and prediction intervals at different quantile levels.
      </p>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={probabilisticForecastData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={['dataMin - 300', 'dataMax + 300']} label={{ value: 'Load (kW)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="q90" stackId="1" stroke="none" fill="#8884d8" fillOpacity={0.1} name="90% Interval" />
            <Area type="monotone" dataKey="q75" stackId="1" stroke="none" fill="#8884d8" fillOpacity={0.2} name="75% Interval" />
            <Area type="monotone" dataKey="q25" stackId="1" stroke="none" fill="#8884d8" fillOpacity={0.2} name="25% Interval" />
            <Area type="monotone" dataKey="q10" stackId="1" stroke="none" fill="#8884d8" fillOpacity={0.1} name="10% Interval" />
            <Line type="monotone" dataKey="actual" stroke="#ff7300" name="Actual" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="predicted" stroke="#82ca9d" name="Predicted" strokeWidth={2} dot={{ r: 3, strokeWidth: 1, stroke: '#82ca9d', fill: 'white' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const TimeSeriesDecomposition = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Time Series Decomposition</h2>
      <p className="mb-4 text-gray-600">
        Decomposing the time series into trend, seasonal, and residual components improves interpretability 
        and allows for more effective modeling of each component separately.
      </p>
      <div className="grid grid-cols-1 gap-4">
        <div className="h-48">
          <h3 className="text-center text-gray-700 font-medium">Original Signal</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesDecompositionData.original} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[6000, 6700]} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="h-48">
          <h3 className="text-center text-gray-700 font-medium">Trend Component</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesDecompositionData.trend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[6000, 6700]} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#82ca9d" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="h-48">
          <h3 className="text-center text-gray-700 font-medium">Seasonal Component</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesDecompositionData.seasonal} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[-200, 300]} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#ffc658" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="h-48">
          <h3 className="text-center text-gray-700 font-medium">Residual Component</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesDecompositionData.residual} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[-50, 50]} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#ff7300" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const FeatureImportance = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Feature Importance Analysis</h2>
      <p className="mb-4 text-gray-600">
        This visualization demonstrates the relative importance of different features in our energy forecasting model.
        Understanding feature importance helps in model interpretability and further improvements.
      </p>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={featureImportanceData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="feature" type="category" width={100} />
            <Tooltip />
            <Legend />
            <Bar dataKey="importance" fill="#8884d8" name="Relative Importance (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const ShapValuesVisualization = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">SHAP Values Explanation</h2>
      <p className="mb-4 text-gray-600">
        SHAP (SHapley Additive exPlanations) values help explain the contribution of each feature to a specific prediction.
        Positive values push the prediction higher, while negative values push it lower.
      </p>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={shapValues}
            layout="horizontal"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="feature" />
            <YAxis domain={[-2, 3]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="SHAP Value">
              {shapValues.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.value > 0 ? '#82ca9d' : '#ff7300'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-2">Interpretation:</h3>
        <p className="text-gray-600">
          In this example, the "hour" and "previous day" features have the strongest positive impact on the prediction,
          while "weekend" has the strongest negative impact. This indicates that the time of day and historical consumption
          are key drivers of our forecast, while weekend days typically see reduced consumption in this scenario.
        </p>
      </div>
    </div>
  );
};

const AttentionMechanism = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Attention Mechanism Visualization</h2>
      <p className="mb-4 text-gray-600">
        Attention mechanisms reveal which historical time steps have the greatest influence on the current prediction.
        This helps understand which past data points are most relevant for forecasting.
      </p>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={attentionData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestep" />
            <YAxis domain={[0, 1]} label={{ value: 'Attention Weight', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Line type="monotone" dataKey="weight" stroke="#8884d8" name="Attention Weight" strokeWidth={2} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-2">Interpretation:</h3>
        <p className="text-gray-600">
          The attention weights show that the model pays most attention to the most recent time steps,
          with a clear emphasis on t-1 and t-2. This aligns with the intuition that recent consumption
          patterns are typically more relevant for predicting future consumption than older data points.
        </p>
      </div>
    </div>
  );
};

const ModelComparison = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Model Comparison</h2>
      <p className="mb-4 text-gray-600">
        This chart compares different forecasting models across three dimensions: accuracy, computational efficiency, 
        and interpretability. Our PREDICT-HOME system aims to balance these factors for optimal performance.
      </p>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={modelComparisonData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="model" />
            <YAxis domain={[0, 100]} label={{ value: 'Score (0-100)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="accuracy" fill="#8884d8" name="Forecast Accuracy" />
            <Bar dataKey="computation" fill="#82ca9d" name="Computational Efficiency" />
            <Bar dataKey="interpretability" fill="#ffc658" name="Model Interpretability" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const ModelPerformance = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Model Performance Metrics</h2>
      <p className="mb-4 text-gray-600">
        This visualization compares the performance of different models using two key metrics:
        Root Mean Square Error (RMSE) and R-squared (R²). Lower RMSE and higher R² indicate better performance.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-80">
          <h3 className="text-center text-gray-700 font-medium">RMSE Comparison</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={modelPerformanceData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="model" angle={-45} textAnchor="end" height={80} />
              <YAxis domain={[0, 6000]} label={{ value: 'RMSE (lower is better)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="rmse" fill="#ff7300" name="RMSE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="h-80">
          <h3 className="text-center text-gray-700 font-medium">R² Comparison</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={modelPerformanceData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="model" angle={-45} textAnchor="end" height={80} />
              <YAxis domain={[0, 1]} label={{ value: 'R² (higher is better)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="r2" fill="#82ca9d" name="R²" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const ArchitectureDiagram = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">System Architecture</h2>
      <p className="mb-4 text-gray-600">
        The PREDICT-HOME system integrates multiple components that work together to deliver accurate and explainable 
        energy forecasting. This diagram illustrates the system architecture and data flow.
      </p>
      <div className="mx-auto p-4 bg-blue-50 rounded-lg overflow-auto">
        <div className="flex flex-col items-center">
          {/* Input Layer */}
          <div className="flex space-x-4 mb-2">
            <div className="p-2 bg-blue-100 rounded text-center w-32 border border-blue-300">
              Household<br/>Data
            </div>
            <div className="p-2 bg-blue-100 rounded text-center w-32 border border-blue-300">
              Weather<br/>Data
            </div>
            <div className="p-2 bg-blue-100 rounded text-center w-32 border border-blue-300">
              Calendar<br/>Data
            </div>
          </div>
          
          {/* Arrows */}
          <div className="flex space-x-16 items-center">
            <div className="h-6 w-0.5 bg-gray-400"></div>
            <div className="h-6 w-0.5 bg-gray-400"></div>
            <div className="h-6 w-0.5 bg-gray-400"></div>
          </div>
          
          {/* Data Processing */}
          <div className="p-3 bg-green-100 rounded text-center w-64 mb-2 border border-green-300">
            Data Preprocessing & Feature Engineering
          </div>
          
          {/* Arrow */}
          <div className="h-6 w-0.5 bg-gray-400 mb-2"></div>
          
          {/* Model Layer */}
          <div className="flex space-x-4 mb-2">
            <div className="flex flex-col items-center">
              <div className="p-2 bg-purple-100 rounded text-center w-48 border border-purple-300">
                Hybrid CNN-LSTM Model
              </div>
              <div className="h-6 w-0.5 bg-gray-400"></div>
              <div className="p-2 bg-purple-100 rounded text-center w-48 border border-purple-300">
                Online Learning Module
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-2 bg-purple-100 rounded text-center w-48 border border-purple-300">
                Explainability Framework
              </div>
              <div className="h-6 w-0.5 bg-gray-400"></div>
              <div className="p-2 bg-purple-100 rounded text-center w-48 border border-purple-300">
                Peak Demand Analyzer
              </div>
            </div>
          </div>
          
          {/* Integration Layer */}
          <div className="flex justify-center items-center">
            <div className="h-6 w-0.5 bg-gray-400"></div>
            <div className="w-24 h-0.5 bg-gray-400"></div>
            <div className="h-6 w-0.5 bg-gray-400"></div>
          </div>
          
          <div className="p-3 bg-red-100 rounded text-center w-64 mb-2 border border-red-300">
            System Integration & Evaluation
          </div>
          
          {/* Output Layer */}
          <div className="h-6 w-0.5 bg-gray-400 mb-2"></div>
          
          <div className="p-3 bg-yellow-100 rounded text-center w-64 border border-yellow-300">
            Interactive Dashboard & Visualization
          </div>
        </div>
      </div>
    </div>
  );
};

const MethodologyFlowchart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Methodology Flowchart</h2>
      <p className="mb-4 text-gray-600">
        This flowchart illustrates the methodological approach used in developing and evaluating the PREDICT-HOME system.
      </p>
      <div className="mx-auto p-4 bg-gray-50 rounded-lg overflow-auto">
        <div className="flex flex-col items-center space-y-6">
          <div className="p-3 bg-blue-100 rounded-lg text-center w-64 border border-blue-300">
            <h3 className="font-bold">Data Preprocessing</h3>
            <ul className="text-sm text-left pl-4 list-disc">
              <li>Data Splitting (Training, Testing)</li>
              <li>Training data Cleaning</li>
              <li>Training data Interpolation</li>
              <li>Save Testing data for final evaluation</li>
            </ul>
          </div>
          
          <div className="h-6 w-0.5 bg-gray-400"></div>
          
          <div className="p-3 bg-blue-100 rounded-lg text-center w-64 border border-blue-300">
            <h3 className="font-bold">EDA Analysis</h3>
            <ul className="text-sm text-left pl-4 list-disc">
              <li>Identify training data inter-variable collinearity</li>
              <li>Quantify training data stats for feature selection</li>
              <li>Standardizing training data</li>
            </ul>
          </div>
          
          <div className="h-6 w-0.5 bg-gray-400"></div>
          
          <div className="p-3 bg-blue-100 rounded-lg text-center w-64 border border-blue-300">
            <h3 className="font-bold">Modeling</h3>
            <ul className="text-sm text-left pl-4 list-disc">
              <li>Develop AI/ML model by setting up initial hyperparameters</li>
              <li>Split the training data into 80%-20% for modeling and validation</li>
            </ul>
          </div>
          
          <div className="h-6 w-0.5 bg-gray-400"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <div className="p-3 bg-blue-100 rounded-lg text-center w-64 border border-blue-300">
                <h3 className="font-bold">Model Validation</h3>
                <ul className="text-sm text-left pl-4 list-disc">
                  <li>Using the 20% data for validation</li>
                  <li>Compute the explained variation R² of the model</li>
                  <li>Quantifying the model errors</li>
                </ul>
              </div>
              
              <div className="h-6 w-0.5 bg-gray-400"></div>
              
              <div className="p-3 bg-green-100 rounded-lg text-center w-48 border border-green-300">
                Satisfied?
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="p-3 bg-blue-100 rounded-lg text-center w-64 border border-blue-300">
                <h3 className="font-bold">Cross-validate</h3>
                <ul className="text-sm text-left pl-4 list-disc">
                  <li>Freeze hyperparameters and cross-validate the training data</li>
                  <li>Quantify the average explained variation of the models and errors</li>
                </ul>
              </div>
              
              <div className="h-6 w-0.5 bg-gray-400"></div>
              
              <div className="p-3 bg-green-100 rounded-lg text-center w-48 border border-green-300">
                Satisfied?
              </div>
              
              <div className="h-6 w-0.5 bg-gray-400"></div>
              
              <div className="p-3 bg-blue-100 rounded-lg text-center w-64 border border-blue-300">
                <h3 className="font-bold">Testing and report</h3>
                <ul className="text-sm text-left pl-4 list-disc">
                  <li>Build the model using training data and optimal hyperparameters</li>
                  <li>Using the 20% testing data quantify and report the performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PredictHomeApp = () => {
  const [activePhase, setActivePhase] = useState('data');
  const [activeTab, setActiveTab] = useState('overview');
  const [activeInterpretTab, setActiveInterpretTab] = useState('classical');
  const [activeExplainTab, setActiveExplainTab] = useState('featureImportance');
  
  const selectedPhase = projectPhases.find(phase => phase.id === activePhase);
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center">
            <Home size={32} className="mr-4" />
            <h1 className="text-3xl font-bold">PREDICT-HOME</h1>
          </div>
          <p className="mt-2 text-blue-100">
            An Explainable Hybrid Deep Learning System for Adaptive Domestic Energy Forecasting
          </p>
        </div>
      </header>
      
      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto">
            <button 
              className={`py-4 px-6 font-medium text-sm focus:outline-none ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('overview')}
            >
              Project Overview
            </button>
            <button 
              className={`py-4 px-6 font-medium text-sm focus:outline-none ${activeTab === 'phases' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('phases')}
            >
              Project Phases
            </button>
            <button 
              className={`py-4 px-6 font-medium text-sm focus:outline-none ${activeTab === 'interpretability' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('interpretability')}
            >
              Interpretability
            </button>
            <button 
              className={`py-4 px-6 font-medium text-sm focus:outline-none ${activeTab === 'explainability' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('explainability')}
            >
              Explainability
            </button>
            <button 
              className={`py-4 px-6 font-medium text-sm focus:outline-none ${activeTab === 'visualization' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('visualization')}
            >
              Visualizations
            </button>
            <button 
              className={`py-4 px-6 font-medium text-sm focus:outline-none ${activeTab === 'architecture' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('architecture')}
            >
              System Architecture
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <ProjectOverview />
            <ModelPerformance />
          </div>
        )}
        
        {activeTab === 'phases' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-3 text-gray-700">Project Phases</h3>
                {projectPhases.map(phase => (
                  <PhaseBadge 
                    key={phase.id} 
                    phase={phase} 
                    isActive={activePhase === phase.id}
                    onClick={setActivePhase} 
                  />
                ))}
              </div>
            </div>
            <div className="md:col-span-3">
              {selectedPhase && <PhaseDetail phase={selectedPhase} />}
            </div>
          </div>
        )}
        
        {activeTab === 'interpretability' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Interpretability in Load Forecasting</h2>
              <p className="mb-4 text-gray-600">
                Interpretability is the extent to which a human can understand a model's prediction based only on 
                the model's design without additional information. In load forecasting, interpretable models allow 
                users to understand why certain predictions are made, increasing trust and enabling better decision-making.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Benefits of Interpretable Models:</h3>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Increased trust in forecasting results</li>
                  <li>Better identification of model errors and limitations</li>
                  <li>Improved ability to incorporate domain knowledge</li>
                  <li>Enhanced compliance with regulatory requirements</li>
                  <li>Easier model debugging and improvement</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h3 className="font-bold text-lg mb-3 text-gray-700">Interpretability Approaches</h3>
              <div className="flex overflow-x-auto mb-4">
                {interpretabilityMethods.map(method => (
                  <button 
                    key={method.id}
                    className={`py-2 px-4 mr-4 rounded-lg focus:outline-none ${activeInterpretTab === method.id ? 'bg-indigo-100 text-indigo-700 font-medium' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    onClick={() => setActiveInterpretTab(method.id)}
                  >
                    {method.title}
                  </button>
                ))}
              </div>
              <div>
                {interpretabilityMethods
                  .filter(method => method.id === activeInterpretTab)
                  .map(method => (
                    <InterpretabilityCard key={method.id} method={method} />
                  ))
                }
              </div>
            </div>
            
            {activeInterpretTab === 'decomposition' && <TimeSeriesDecomposition />}
            {activeInterpretTab === 'probabilistic' && <ProbabilisticForecast />}
          </div>
        )}
        
        {activeTab === 'explainability' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Explainability in Load Forecasting</h2>
              <p className="mb-4 text-gray-600">
                Explainability is the extent to which a human can reason about the factors influencing a model's prediction.
                Unlike interpretability, explainability is achieved through post-hoc analysis of a trained model rather than
                the model's inherent design.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Key Explainability Techniques:</h3>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Feature importance methods (SHAP, LIME)</li>
                  <li>Attention mechanisms for deep learning models</li>
                  <li>Sensitivity analysis and partial dependence plots</li>
                  <li>Counterfactual explanations</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h3 className="font-bold text-lg mb-3 text-gray-700">Explainability Approaches</h3>
              <div className="flex overflow-x-auto mb-4">
                {explainabilityMethods.map(method => (
                  <button 
                    key={method.id}
                    className={`py-2 px-4 mr-4 rounded-lg focus:outline-none ${activeExplainTab === method.id ? 'bg-indigo-100 text-indigo-700 font-medium' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    onClick={() => setActiveExplainTab(method.id)}
                  >
                    {method.title}
                  </button>
                ))}
              </div>
              <div>
                {explainabilityMethods
                  .filter(method => method.id === activeExplainTab)
                  .map(method => (
                    <InterpretabilityCard key={method.id} method={method} />
                  ))
                }
              </div>
            </div>
            
            {activeExplainTab === 'featureImportance' && <ShapValuesVisualization />}
            {activeExplainTab === 'attention' && <AttentionMechanism />}
          </div>
        )}
        
        {activeTab === 'visualization' && (
          <div className="space-y-6">
            <ForecastingDemo />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureImportance />
              <ModelComparison />
            </div>
          </div>
        )}
        
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <ArchitectureDiagram />
            <MethodologyFlowchart />
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h3 className="text-lg font-semibold">PREDICT-HOME</h3>
            <p className="text-gray-300 text-sm mt-2">
              Master's Project on AI-Based Energy Forecasting for Domestic Purposes
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PredictHomeApp;