import React from 'react';
import { ProposalData } from '../types';

interface OutputDisplayProps {
  data: ProposalData;
  onBack: () => void;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ data, onBack }) => {

  const handlePrint = () => {
    window.print();
  };

  const formatMoney = (val: number) => val.toLocaleString();

  const getReturnRate = (val: number) => {
    if (data.premium.total === 0) return "0%";
    // Calculating Total Return % (Value / Premium)
    return ((val / data.premium.total) * 100).toFixed(0) + "%";
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const getRebateString = () => {
    const parts = [];
    if (data.promo.lumpSum.enabled) parts.push(`一筆過 ${data.promo.lumpSum.percent}%`);
    if (data.promo.fiveYear.enabled) parts.push(`5年繳 ${data.promo.fiveYear.percent}%`);
    return parts.length > 0 ? parts.join(", ") : "N/A";
  };

  const getPrepayString = () => {
    if (!data.promo.prepay.enabled) return "N/A";
    return `${data.promo.prepay.rate}%`;
  };

  const getPrepayDeadlineString = () => {
    if (!data.promo.prepay.enabled || !data.promo.prepay.deadline) return null;
    return `(至 ${formatDate(data.promo.prepay.deadline)})`;
  };

  // Replicating the TikZ design using SVG
  const Infographic = () => (
    <div className="flex justify-center my-8">
      <svg width="400" height="300" viewBox="-200 -150 400 300">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#B8860B" />
          </marker>
        </defs>
        
        {/* Connection Lines */}
        <line x1="0" y1="0" x2="0" y2="-100" stroke="#B8860B" strokeWidth="2" markerEnd="url(#arrow)" />
        <line x1="0" y1="0" x2="-86.6" y2="50" stroke="#B8860B" strokeWidth="2" markerEnd="url(#arrow)" />
        <line x1="0" y1="0" x2="86.6" y2="50" stroke="#B8860B" strokeWidth="2" markerEnd="url(#arrow)" />

        {/* Center Node */}
        <circle cx="0" cy="0" r="50" fill="#FFF8DC" stroke="#B8860B" strokeWidth="2" />
        <text x="0" y="-5" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333" fontFamily="Noto Serif, serif">財富</text>
        <text x="0" y="15" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333" fontFamily="Noto Serif, serif">傳承</text>

        {/* Top Node */}
        <circle cx="0" cy="-100" r="40" fill="#212C3C" />
        <text x="0" y="-105" textAnchor="middle" fontSize="12" fill="white" fontFamily="Noto Sans TC, sans-serif">財富</text>
        <text x="0" y="-85" textAnchor="middle" fontSize="12" fill="white" fontFamily="Noto Sans TC, sans-serif">增值</text>

        {/* Left Node */}
        <circle cx="-86.6" cy="50" r="40" fill="#212C3C" />
        <text x="-86.6" y="45" textAnchor="middle" fontSize="12" fill="white" fontFamily="Noto Sans TC, sans-serif">靈活</text>
        <text x="-86.6" y="65" textAnchor="middle" fontSize="12" fill="white" fontFamily="Noto Sans TC, sans-serif">傳承</text>

        {/* Right Node */}
        <circle cx="86.6" cy="50" r="40" fill="#212C3C" />
        <text x="86.6" y="45" textAnchor="middle" fontSize="12" fill="white" fontFamily="Noto Sans TC, sans-serif">貨幣</text>
        <text x="86.6" y="65" textAnchor="middle" fontSize="12" fill="white" fontFamily="Noto Sans TC, sans-serif">配置</text>
      </svg>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-200 print:bg-white">
      {/* Toolbar - Hidden in Print */}
      <div className="bg-white px-6 py-4 border-b border-slate-300 flex justify-between items-center shadow-sm no-print">
        <h2 className="text-xl font-bold text-slate-800 serif-font">Report Preview</h2>
        <div className="flex space-x-3">
          <button 
            onClick={onBack}
            className="text-sm text-slate-600 hover:text-slate-900 px-4 py-2 rounded border border-slate-300 hover:bg-slate-100 transition-colors"
          >
            Edit Data
          </button>
          <button 
            onClick={handlePrint}
            className="text-sm font-medium text-white bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded shadow transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Download / Print PDF
          </button>
        </div>
      </div>
      
      {/* Visual Report Container - A4 Simulation */}
      <div className="flex-1 overflow-auto p-8 flex justify-center print:p-0 print:overflow-visible">
        {/* A4 Paper Dimensions: 210mm x 297mm */}
        <div className="print-container bg-white shadow-2xl mx-auto text-slate-900 relative flex flex-col" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
          
          {/* Header */}
          <div className="border-b-2 border-amber-600 pb-4 mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold serif-font text-slate-900">私人財富管理建議書</h1>
              <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest">Private Banking Division</p>
            </div>
            <div className="text-right">
              <div className="text-amber-600 font-bold text-lg">PB</div>
              <div className="text-xs text-slate-400">Generations of Trust</div>
            </div>
          </div>

          {/* Client Overview */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-800 serif-font mb-4 border-l-4 border-amber-500 pl-3">
              客戶概覽: {data.client.name}
            </h2>
            <p className="text-justify leading-relaxed text-slate-700 mb-6">
              <span className="font-bold">尊貴的 {data.client.name} 閣下</span> (年齡: {data.client.age})，感謝您選擇我們的資產託管服務。
              本建議書旨在為您展示「{data.planName}」如何協助您實現財富增值與靈活傳承，並有效進行地緣政治風險對沖。
            </p>
            
            <div className="bg-slate-50 p-4 rounded border border-slate-100">
              <p className="font-bold text-slate-900 mb-2">保費資訊:</p>
              <ul className="list-disc list-inside text-slate-700 space-y-1">
                <li>總保費: USD {formatMoney(data.premium.total)}</li>
                <li>繳費方式: {data.premium.paymentType}</li>
              </ul>
            </div>
          </section>

          {/* Infographic */}
          <Infographic />

          {/* Scenario A Table */}
          <section className="mb-8 break-inside-avoid">
            <h2 className="text-xl font-bold text-slate-800 serif-font mb-4 border-l-4 border-amber-500 pl-3">
              情境 A: 資本累積 (Capital Accumulation)
            </h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="py-3 px-4 text-left">保單年度</th>
                  <th className="py-3 px-4 text-right">退保價值 (USD)</th>
                  <th className="py-3 px-4 text-right">身故賠償 (USD)</th>
                  <th className="py-3 px-4 text-right">總回報率 (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="py-3 px-4 font-semibold">第 10 年</td>
                  <td className="py-3 px-4 text-right">{formatMoney(data.scenarioA.year10.surrender)}</td>
                  <td className="py-3 px-4 text-right">{formatMoney(data.scenarioA.year10.death)}</td>
                  <td className="py-3 px-4 text-right font-medium text-amber-700">{getReturnRate(data.scenarioA.year10.surrender)}</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50 bg-slate-50/50">
                  <td className="py-3 px-4 font-semibold">第 20 年</td>
                  <td className="py-3 px-4 text-right">{formatMoney(data.scenarioA.year20.surrender)}</td>
                  <td className="py-3 px-4 text-right">{formatMoney(data.scenarioA.year20.death)}</td>
                  <td className="py-3 px-4 text-right font-medium text-amber-700">{getReturnRate(data.scenarioA.year20.surrender)}</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="py-3 px-4 font-semibold">第 30 年</td>
                  <td className="py-3 px-4 text-right">{formatMoney(data.scenarioA.year30.surrender)}</td>
                  <td className="py-3 px-4 text-right">{formatMoney(data.scenarioA.year30.death)}</td>
                  <td className="py-3 px-4 text-right font-medium text-amber-700">{getReturnRate(data.scenarioA.year30.surrender)}</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Scenario B Table */}
          <section className="mb-8 break-inside-avoid">
            <h2 className="text-xl font-bold text-slate-800 serif-font mb-4 border-l-4 border-amber-500 pl-3">
              情境 B: 被動收入 (Passive Income)
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              透過每年提取 <span className="font-bold text-slate-900">USD {formatMoney(data.scenarioB.annualWithdrawal)}</span>，創造穩定的現金流以應對退休生活。
            </p>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="py-3 px-4 text-left">保單年度</th>
                  <th className="py-3 px-4 text-right">累計提取 (USD)</th>
                  <th className="py-3 px-4 text-right">剩餘價值 (USD)</th>
                  <th className="py-3 px-4 text-right">總回報率 (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="py-3 px-4 font-semibold">第 10 年</td>
                  <td className="py-3 px-4 text-right">{formatMoney(data.scenarioB.year10.cumulative)}</td>
                  <td className="py-3 px-4 text-right">{formatMoney(data.scenarioB.year10.remaining)}</td>
                  <td className="py-3 px-4 text-right font-medium text-amber-700">{getReturnRate(data.scenarioB.year10.cumulative + data.scenarioB.year10.remaining)}</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50 bg-slate-50/50">
                  <td className="py-3 px-4 font-semibold">第 20 年</td>
                  <td className="py-3 px-4 text-right">{formatMoney(data.scenarioB.year20.cumulative)}</td>
                  <td className="py-3 px-4 text-right">{formatMoney(data.scenarioB.year20.remaining)}</td>
                  <td className="py-3 px-4 text-right font-medium text-amber-700">{getReturnRate(data.scenarioB.year20.cumulative + data.scenarioB.year20.remaining)}</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="py-3 px-4 font-semibold">第 30 年</td>
                  <td className="py-3 px-4 text-right">{formatMoney(data.scenarioB.year30.cumulative)}</td>
                  <td className="py-3 px-4 text-right">{formatMoney(data.scenarioB.year30.remaining)}</td>
                  <td className="py-3 px-4 text-right font-medium text-amber-700">{getReturnRate(data.scenarioB.year30.cumulative + data.scenarioB.year30.remaining)}</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50 bg-slate-50/50">
                  <td className="py-3 px-4 font-semibold">第 40 年</td>
                  <td className="py-3 px-4 text-right">{formatMoney(data.scenarioB.year40.cumulative)}</td>
                  <td className="py-3 px-4 text-right">{formatMoney(data.scenarioB.year40.remaining)}</td>
                  <td className="py-3 px-4 text-right font-medium text-amber-700">{getReturnRate(data.scenarioB.year40.cumulative + data.scenarioB.year40.remaining)}</td>
                </tr>
              </tbody>
            </table>
          </section>

           {/* Promotions */}
           <section className="mb-auto">
            <h2 className="text-xl font-bold text-slate-800 serif-font mb-4 border-l-4 border-amber-500 pl-3">
              推廣優惠
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 border-t-2 border-slate-300">
                 <div className="text-xs text-slate-500 uppercase font-bold mb-1">回贈優惠</div>
                 <div className="text-slate-800 font-medium">{getRebateString()}</div>
              </div>
              <div className="bg-slate-50 p-4 border-t-2 border-slate-300">
                 <div className="text-xs text-slate-500 uppercase font-bold mb-1">預繳利率</div>
                 <div className="text-slate-800 font-medium">{getPrepayString()} <span className="text-xs text-red-500 block sm:inline mt-1 sm:mt-0">{getPrepayDeadlineString()}</span></div>
              </div>
            </div>
          </section>

          {/* Footer / Disclaimer */}
          <div className="mt-8 pt-4 border-t border-slate-300 text-[10px] text-slate-500 text-justify">
            <span className="font-bold">免責聲明:</span> 本文件僅供參考，不構成任何要約或招攬。所有紅利及分紅均為非保證。投資涉及風險，閣下應留意美息走勢對預繳利率的影響。This proposal is generated for internal reference only.
          </div>

        </div>
      </div>
    </div>
  );
};