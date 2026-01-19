import React from 'react';
import { ProposalData, ScenarioValue, ScenarioBValue } from '../types';

interface InputFormProps {
  data: ProposalData;
  onChange: (data: ProposalData) => void;
  onSubmit: () => void;
}

export const InputForm: React.FC<InputFormProps> = ({ data, onChange, onSubmit }) => {

  const handleChange = (section: keyof ProposalData, field: string, value: any, subField?: string) => {
    const newData = { ...data };
    if (subField) {
      // Handle nested objects like scenarioA.year10.surrender or promo.lumpSum.enabled
      (newData[section] as any)[field][subField] = value;
    } else if (typeof (newData[section] as any)[field] === 'object') {
      // Should not happen with current logic normally
    } else {
      (newData[section] as any)[field] = value;
    }
    onChange(newData);
  };

  const handleScenarioAChange = (year: 'year10' | 'year20' | 'year30', type: keyof ScenarioValue, value: number) => {
    const newData = { ...data };
    newData.scenarioA[year][type] = value;
    onChange(newData);
  };

  const handleScenarioBChange = (year: 'year10' | 'year20' | 'year30' | 'year40', type: keyof ScenarioBValue, value: number) => {
    const newData = { ...data };
    newData.scenarioB[year][type] = value;
    onChange(newData);
  };

  return (
    <div className="bg-white shadow-xl rounded-sm border-t-[6px] border-orange-600 p-12">
      <div className="flex justify-between items-baseline mb-10">
        <h2 className="text-2xl font-bold text-slate-800 serif-font">Proposal Parameters</h2>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Private Banking Division</span>
      </div>

      <div className="space-y-14">

        {/* Section 1: Basic Info */}
        <section>
          <h3 className="text-[11px] font-black text-orange-600 uppercase tracking-[0.2em] mb-6">Client & Plan</h3>
          <div className="grid grid-cols-12 gap-x-8 gap-y-6">
            <div className="col-span-8">
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Client Name</label>
              <input
                type="text"
                value={data.client.name}
                onChange={(e) => handleChange('client', 'name', e.target.value)}
                className="block w-full rounded-sm border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-orange-600 focus:ring-orange-600 sm:text-sm shadow-sm"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Age</label>
              <input
                type="number"
                value={data.client.age}
                onChange={(e) => handleChange('client', 'age', parseInt(e.target.value) || 0)}
                className="block w-full rounded-sm border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-orange-600 focus:ring-orange-600 sm:text-sm shadow-sm"
              />
            </div>
            <div className="col-span-12">
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Plan Name</label>
              <input
                type="text"
                value={data.planName}
                onChange={(e) => handleChange('planName', '', e.target.value)}
                onInput={(e) => onChange({ ...data, planName: e.currentTarget.value })}
                className="block w-full rounded-sm border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-orange-600 focus:ring-orange-600 sm:text-sm shadow-sm"
              />
            </div>
            <div className="col-span-6">
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Total Premium ($)</label>
              <input
                type="number"
                value={data.premium.total}
                onChange={(e) => handleChange('premium', 'total', parseInt(e.target.value) || 0)}
                className="block w-full rounded-sm border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-orange-600 focus:ring-orange-600 sm:text-sm shadow-sm"
              />
            </div>
            <div className="col-span-6">
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Payment Type</label>
              <select
                value={data.premium.paymentType}
                onChange={(e) => handleChange('premium', 'paymentType', e.target.value)}
                className="block w-full rounded-sm border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-orange-600 focus:ring-orange-600 sm:text-sm shadow-sm appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat pr-10"
              >
                <option value="整付">整付 (Lump Sum)</option>
                <option value="5年">5年 (5 Years)</option>
                <option value="10年">10年 (10 Years)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Section 2: Scenario A */}
        <section>
          <h3 className="text-[11px] font-black text-orange-600 uppercase tracking-[0.2em] mb-6">Scenario A: Capital Accumulation</h3>
          <div className="space-y-5">
            {['year10', 'year20', 'year30'].map((year) => (
              <div key={year} className="flex items-center space-x-8">
                <span className="w-16 text-[10px] font-black text-slate-400 uppercase tracking-tighter italic">{year.replace('year', 'Yr ')}</span>
                <div className="flex-1 flex bg-slate-50 p-6 rounded-sm border border-slate-100 shadow-inner space-x-16">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Surrender Value</label>
                    <input
                      type="number"
                      value={data.scenarioA[year as keyof typeof data.scenarioA].surrender}
                      onChange={(e) => handleScenarioAChange(year as any, 'surrender', parseInt(e.target.value) || 0)}
                      className="w-full border-none bg-transparent p-0 text-xs font-bold text-slate-700 focus:ring-0"
                    />
                  </div>
                  <div className="flex-1 border-l border-slate-200 pl-16">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Death Benefit</label>
                    <input
                      type="number"
                      value={data.scenarioA[year as keyof typeof data.scenarioA].death}
                      onChange={(e) => handleScenarioAChange(year as any, 'death', parseInt(e.target.value) || 0)}
                      className="w-full border-none bg-transparent p-0 text-xs font-bold text-slate-700 focus:ring-0"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Scenario B */}
        <section>
          <h3 className="text-[11px] font-black text-orange-600 uppercase tracking-[0.2em] mb-6">Scenario B: Passive Income</h3>

          <div className="mb-8">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Annual Withdrawal Amount ($)</label>
            <input
              type="number"
              value={data.scenarioB.annualWithdrawal}
              onChange={(e) => handleChange('scenarioB', 'annualWithdrawal', parseInt(e.target.value) || 0)}
              className="block w-full rounded-sm border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-orange-600 focus:ring-orange-600 sm:text-sm shadow-sm"
            />
          </div>

          <div className="space-y-5">
            {['year10', 'year20', 'year30', 'year40'].map((year) => (
              <div key={year} className="flex items-center space-x-8">
                <span className="w-16 text-[10px] font-black text-slate-400 uppercase tracking-tighter italic">{year.replace('year', 'Yr ')}</span>
                <div className="flex-1 flex bg-slate-50 p-6 rounded-sm border border-slate-100 shadow-inner space-x-16">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Cumulative Withdrawn</label>
                    <input
                      type="number"
                      value={(data.scenarioB[year as keyof typeof data.scenarioB] as any).cumulative}
                      onChange={(e) => handleScenarioBChange(year as any, 'cumulative', parseInt(e.target.value) || 0)}
                      className="w-full border-none bg-transparent p-0 text-xs font-bold text-slate-700 focus:ring-0"
                    />
                  </div>
                  <div className="flex-1 border-l border-slate-200 pl-16">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Remaining Value</label>
                    <input
                      type="number"
                      value={(data.scenarioB[year as keyof typeof data.scenarioB] as any).remaining}
                      onChange={(e) => handleScenarioBChange(year as any, 'remaining', parseInt(e.target.value) || 0)}
                      className="w-full border-none bg-transparent p-0 text-xs font-bold text-slate-700 focus:ring-0"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Promo */}
        <section>
          <h3 className="text-[11px] font-black text-orange-600 uppercase tracking-[0.2em] mb-6">Promotions</h3>
          <div className="space-y-6">

            {/* Rebate Offer - Lump Sum */}
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-sm shadow-sm">
              <div className="flex items-center justify-between">
                <label className="flex items-center text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.promo.lumpSum.enabled}
                    onChange={(e) => handleChange('promo', 'lumpSum', e.target.checked, 'enabled')}
                    className="h-3.5 w-3.5 text-orange-600 focus:ring-orange-600 border-slate-300 rounded-sm mr-2"
                  />
                  Rebate: 一筆過 (Lump Sum)
                </label>
                {data.promo.lumpSum.enabled && (
                  <div className="flex items-center bg-white border border-slate-200 rounded-sm px-2 py-1">
                    <input
                      type="number"
                      value={data.promo.lumpSum.percent}
                      onChange={(e) => handleChange('promo', 'lumpSum', parseFloat(e.target.value), 'percent')}
                      className="w-12 border-none bg-transparent text-right text-xs font-bold text-slate-700 focus:ring-0 p-0"
                    />
                    <span className="bg-slate-200/50 px-1.5 py-0.5 rounded-sm text-[8px] font-bold text-slate-500 ml-1 border border-slate-300">%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Rebate Offer - 5 Year */}
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-sm shadow-sm">
              <div className="flex items-center justify-between">
                <label className="flex items-center text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.promo.fiveYear.enabled}
                    onChange={(e) => handleChange('promo', 'fiveYear', e.target.checked, 'enabled')}
                    className="h-3.5 w-3.5 text-orange-600 focus:ring-orange-600 border-slate-300 rounded-sm mr-2"
                  />
                  Rebate: 5年繳 (5-Year Payment)
                </label>
                {data.promo.fiveYear.enabled && (
                  <div className="flex items-center bg-white border border-slate-200 rounded-sm px-2 py-1">
                    <input
                      type="number"
                      value={data.promo.fiveYear.percent}
                      onChange={(e) => handleChange('promo', 'fiveYear', parseFloat(e.target.value), 'percent')}
                      className="w-12 border-none bg-transparent text-right text-xs font-bold text-slate-700 focus:ring-0 p-0"
                    />
                    <span className="bg-slate-200/50 px-1.5 py-0.5 rounded-sm text-[8px] font-bold text-slate-500 ml-1 border border-slate-300">%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Prepayment Interest */}
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-sm shadow-sm">
              <div className="flex items-center mb-4">
                <label className="flex items-center text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.promo.prepay.enabled}
                    onChange={(e) => handleChange('promo', 'prepay', e.target.checked, 'enabled')}
                    className="h-3.5 w-3.5 text-orange-600 focus:ring-orange-600 border-slate-300 rounded-sm mr-2"
                  />
                  Prepayment Interest (預繳利率)
                </label>
              </div>

              {data.promo.prepay.enabled && (
                <div className="flex space-x-8 pl-6">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Interest Rate</label>
                    <div className="flex items-center border border-slate-200 rounded-sm bg-white px-2 py-1">
                      <input
                        type="number"
                        value={data.promo.prepay.rate}
                        onChange={(e) => handleChange('promo', 'prepay', parseFloat(e.target.value), 'rate')}
                        className="w-full border-none bg-transparent p-0 text-xs font-bold text-slate-700 focus:ring-0 text-right"
                        step="0.1"
                      />
                      <span className="bg-slate-200/50 px-1.5 py-0.5 rounded-sm text-[8px] font-bold text-slate-500 ml-1 border border-slate-300">%</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Offer Deadline</label>
                    <div className="border border-slate-200 rounded-sm bg-white px-2 py-1">
                      <input
                        type="date"
                        value={data.promo.prepay.deadline}
                        onChange={(e) => handleChange('promo', 'prepay', e.target.value, 'deadline')}
                        className="w-full border-none bg-transparent p-0 text-xs font-bold text-slate-700 focus:ring-0"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="pt-8">
          <button
            onClick={onSubmit}
            className="w-full py-3.5 px-4 rounded-sm text-sm font-black text-white bg-slate-900 hover:bg-black transition-all active:translate-y-0.5 uppercase tracking-widest shadow-xl"
          >
            Generate Proposal (PDF Report)
          </button>
        </div>
      </div>
    </div>
  );


};