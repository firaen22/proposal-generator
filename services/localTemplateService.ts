import { ProposalData } from "../types";

export const generateLocalProposal = (data: ProposalData): string => {
  const rebateParts = [];
  if (data.promo.lumpSum.enabled) rebateParts.push(`一筆過 ${data.promo.lumpSum.percent}\\%`);
  if (data.promo.fiveYear.enabled) rebateParts.push(`5年繳 ${data.promo.fiveYear.percent}\\%`);
  const rebateString = rebateParts.length > 0 ? rebateParts.join(", ") : "N/A";

  const prepayString = data.promo.prepay.enabled 
    ? `${data.promo.prepay.rate}\\%`
    : "N/A";
  
  const prepayNote = data.promo.prepay.enabled ? `(注意: 優惠截止至 ${data.promo.prepay.deadline})` : "";

  const getReturnRate = (val: number) => {
    if (data.premium.total === 0) return "0\\%";
    return ((val / data.premium.total) * 100).toFixed(0) + "\\%";
  };

  return `\\documentclass[a4paper,12pt]{article}
\\usepackage{geometry}
\\geometry{top=2.5cm, bottom=2.5cm, left=2.5cm, right=2.5cm}
\\usepackage{fontspec}
\\usepackage{xeCJK}
\\usepackage{babel}
\\usepackage{tikz}
\\usepackage{array}
\\usepackage{booktabs}
\\usepackage{xcolor}
\\usepackage{colortbl}
\\usepackage{graphicx}
\\usepackage{float}

% Fonts Configuration
% Note: In a real environment ensuring these fonts exist is key. 
% Standard TeX Live usually has Noto Sans.
\\setmainfont{Noto Sans}
\\setCJKmainfont{Noto Sans CJK TC}

% Color Definitions
\\definecolor{pbGold}{RGB}{184, 134, 11}
\\definecolor{pbDark}{RGB}{33, 44, 60}
\\definecolor{pbLight}{RGB}{245, 245, 245}

\\title{\\bfseries\\color{pbDark} 私人財富管理建議書}
\\author{Private Banking Division}
\\date{\\today}

\\begin{document}

\\maketitle
\\thispagestyle{empty}

\\section*{客戶概覽: ${data.client.name}}

\\textbf{尊貴的 ${data.client.name} 閣下} (年齡: ${data.client.age})，感謝您選擇我們的資產託管服務。本建議書旨在為您展示「${data.planName}」如何協助您實現財富增值與靈活傳承，並有效進行地緣政治風險對沖。

\\vspace{1em}
\\noindent
\\textbf{保費資訊:}
\\begin{itemize}
    \\item 總保費: USD ${data.premium.total.toLocaleString()}
    \\item 繳費方式: ${data.premium.paymentType}
\\end{itemize}

\\vspace{2em}
\\begin{center}
\\begin{tikzpicture}
    % Circular Infographic - Kelly Style
    \\node[circle, draw=pbGold, line width=2pt, minimum size=4cm, align=center, fill=pbGold!10] (core) at (0,0) {\\textbf{財富}\\\\\\textbf{傳承}};
    
    \\node[circle, fill=pbDark, text=white, minimum size=2.5cm, align=center] (growth) at (90:3.5cm) {財富\\\\增值};
    \\node[circle, fill=pbDark, text=white, minimum size=2.5cm, align=center] (heritage) at (210:3.5cm) {靈活\\\\傳承};
    \\node[circle, fill=pbDark, text=white, minimum size=2.5cm, align=center] (currency) at (330:3.5cm) {貨幣\\\\配置};
    
    \\draw[->, >=latex, line width=1.5pt, pbGold] (core) -- (growth);
    \\draw[->, >=latex, line width=1.5pt, pbGold] (core) -- (heritage);
    \\draw[->, >=latex, line width=1.5pt, pbGold] (core) -- (currency);
\\end{tikzpicture}
\\end{center}

\\newpage

\\section*{情境 A: 資本累積 (Capital Accumulation)}

在此情境下，我們專注於長期的資產滾存。

\\begin{table}[H]
\\centering
\\renewcommand{\\arraystretch}{1.5}
\\begin{tabular}{c|c|c|c}
\\hline
\\rowcolor{pbDark!10} \\textbf{保單年度} & \\textbf{退保價值 (USD)} & \\textbf{身故賠償 (USD)} & \\textbf{總回報率 (\\%)} \\\\
\\hline
第 10 年 & ${data.scenarioA.year10.surrender.toLocaleString()} & ${data.scenarioA.year10.death.toLocaleString()} & ${getReturnRate(data.scenarioA.year10.surrender)} \\\\
第 20 年 & ${data.scenarioA.year20.surrender.toLocaleString()} & ${data.scenarioA.year20.death.toLocaleString()} & ${getReturnRate(data.scenarioA.year20.surrender)} \\\\
第 30 年 & ${data.scenarioA.year30.surrender.toLocaleString()} & ${data.scenarioA.year30.death.toLocaleString()} & ${getReturnRate(data.scenarioA.year30.surrender)} \\\\
\\hline
\\end{tabular}
\\caption{資本累積預測}
\\end{table}

\\section*{情境 B: 被動收入 (Passive Income)}

透過每年提取 \\textbf{USD ${data.scenarioB.annualWithdrawal.toLocaleString()}}，創造穩定的現金流以應對退休生活。

\\begin{table}[H]
\\centering
\\renewcommand{\\arraystretch}{1.5}
\\begin{tabular}{c|c|c|c}
\\hline
\\rowcolor{pbDark!10} \\textbf{保單年度} & \\textbf{累計提取 (USD)} & \\textbf{剩餘價值 (USD)} & \\textbf{總回報率 (\\%)} \\\\
\\hline
第 10 年 & ${data.scenarioB.year10.cumulative.toLocaleString()} & ${data.scenarioB.year10.remaining.toLocaleString()} & ${getReturnRate(data.scenarioB.year10.cumulative + data.scenarioB.year10.remaining)} \\\\
第 20 年 & ${data.scenarioB.year20.cumulative.toLocaleString()} & ${data.scenarioB.year20.remaining.toLocaleString()} & ${getReturnRate(data.scenarioB.year20.cumulative + data.scenarioB.year20.remaining)} \\\\
第 30 年 & ${data.scenarioB.year30.cumulative.toLocaleString()} & ${data.scenarioB.year30.remaining.toLocaleString()} & ${getReturnRate(data.scenarioB.year30.cumulative + data.scenarioB.year30.remaining)} \\\\
第 40 年 & ${data.scenarioB.year40.cumulative.toLocaleString()} & ${data.scenarioB.year40.remaining.toLocaleString()} & ${getReturnRate(data.scenarioB.year40.cumulative + data.scenarioB.year40.remaining)} \\\\
\\hline
\\end{tabular}
\\caption{被動收入流展示}
\\end{table}

\\section*{推廣優惠}

\\begin{description}
    \\item[回贈優惠:] ${rebateString}
    \\item[預繳利率:] ${prepayString} ${prepayNote}
\\end{description}

\\vfill
\\noindent
\\rule{\\linewidth}{0.5pt}
\\vspace{0.5em}
\\scriptsize
\\textbf{免責聲明:} 本文件僅供參考，不構成任何要約或招攬。所有紅利及分紅均為非保證。投資涉及風險，閣下應留意美息走勢對預繳利率的影響。

\\end{document}`;
};