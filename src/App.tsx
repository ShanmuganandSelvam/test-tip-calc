import { useState } from 'react';
import { Calculator, DollarSign, Users, Percent } from 'lucide-react';
import { bayerSansClasses } from './lib/bayer-sans';

function App() {
  const [billAmount, setBillAmount] = useState<string>('');
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [customTip, setCustomTip] = useState<string>('');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('1');

  // Calculate values
  const billValue = parseFloat(billAmount) || 0;
  const peopleValue = parseInt(numberOfPeople) || 1;
  const activePercentage = customTip ? parseFloat(customTip) : tipPercentage;
  const tipAmount = billValue * (activePercentage / 100);
  const totalAmount = billValue + tipAmount;
  const tipPerPerson = tipAmount / peopleValue;
  const totalPerPerson = totalAmount / peopleValue;

  // Handle preset tip selection
  const handleTipSelect = (percentage: number) => {
    setTipPercentage(percentage);
    setCustomTip('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`${bayerSansClasses.heading.h1} text-indigo-900 mb-2`}>
            <Calculator className="inline-block mr-3 mb-1" size={36} />
            Tip Calculator
          </h1>
          <p className={`${bayerSansClasses.body.large} text-indigo-700`}>
            Calculate tips and split bills with ease
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Input Section */}
            <div className="p-6 md:p-8 bg-white">
              <h2 className={`${bayerSansClasses.heading.h4} text-gray-800 mb-6`}>Bill Details</h2>
              
              {/* Bill Amount */}
              <div className="mb-6">
                <label htmlFor="bill" className={`${bayerSansClasses.body.small} text-gray-600 block mb-2`}>
                  Bill Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={18} className="text-gray-500" />
                  </div>
                  <input
                    id="bill"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={billAmount}
                    onChange={(e) => setBillAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Tip Selection */}
              <div className="mb-6">
                <label className={`${bayerSansClasses.body.small} text-gray-600 block mb-2`}>
                  Select Tip %
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {[5, 10, 15, 18, 20, 25].map((percent) => (
                    <button
                      key={percent}
                      onClick={() => handleTipSelect(percent)}
                      className={`py-2 rounded-lg transition-all ${
                        tipPercentage === percent && !customTip
                          ? 'bg-indigo-600 text-white'
                          : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                      } ${bayerSansClasses.button.primary}`}
                    >
                      {percent}%
                    </button>
                  ))}
                </div>
                <div className="relative mt-3">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Percent size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    placeholder="Custom"
                    value={customTip}
                    onChange={(e) => setCustomTip(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Number of People */}
              <div className="mb-6">
                <label htmlFor="people" className={`${bayerSansClasses.body.small} text-gray-600 block mb-2`}>
                  Number of People
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users size={18} className="text-gray-500" />
                  </div>
                  <input
                    id="people"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="1"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="p-6 md:p-8 bg-indigo-900 text-white">
              <h2 className={`${bayerSansClasses.heading.h4} mb-6`}>Summary</h2>
              
              <div className="space-y-6">
                {/* Tip Amount */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className={`${bayerSansClasses.body.base}`}>Tip Amount</p>
                      <p className={`${bayerSansClasses.body.small} text-indigo-300`}>per person</p>
                    </div>
                    <div className={`${bayerSansClasses.heading.h3}`}>
                      ${tipPerPerson.toFixed(2)}
                    </div>
                  </div>
                  <div className="w-full bg-indigo-800 h-1 rounded-full"></div>
                </div>

                {/* Total Per Person */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className={`${bayerSansClasses.body.base}`}>Total</p>
                      <p className={`${bayerSansClasses.body.small} text-indigo-300`}>per person</p>
                    </div>
                    <div className={`${bayerSansClasses.heading.h2}`}>
                      ${totalPerPerson.toFixed(2)}
                    </div>
                  </div>
                  <div className="w-full bg-indigo-800 h-1 rounded-full"></div>
                </div>

                {/* Bill Summary */}
                <div className="pt-4 mt-4 border-t border-indigo-800">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={`${bayerSansClasses.body.small} text-indigo-300`}>Bill Amount:</span>
                      <span className={`${bayerSansClasses.body.base}`}>${billValue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${bayerSansClasses.body.small} text-indigo-300`}>Tip ({activePercentage}%):</span>
                      <span className={`${bayerSansClasses.body.base}`}>${tipAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${bayerSansClasses.body.small} text-indigo-300`}>Total Bill:</span>
                      <span className={`${bayerSansClasses.body.base}`}>${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${bayerSansClasses.body.small} text-indigo-300`}>Split Between:</span>
                      <span className={`${bayerSansClasses.body.base}`}>{peopleValue} {peopleValue === 1 ? 'person' : 'people'}</span>
                    </div>
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={() => {
                    setBillAmount('');
                    setTipPercentage(15);
                    setCustomTip('');
                    setNumberOfPeople('1');
                  }}
                  className={`w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all mt-4 ${bayerSansClasses.button.primary}`}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className={`${bayerSansClasses.body.small} text-indigo-700`}>
            A simple and elegant tip calculator for all your dining needs
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
