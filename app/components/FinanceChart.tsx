"use client";

import { useMemo } from "react";

type Props = {
  transactions: any[];
};

export default function FinanceChart({ transactions }: Props) {

  const data = useMemo(() => {

    const map: Record<string, number> = {};

    transactions.forEach(t => {
      map[t.month] = (map[t.month] || 0) + t.value;
    });

    return Object.entries(map)
      .sort()
      .map(([month,value]) => ({month,value}));

  }, [transactions]);

  const max = Math.max(...data.map(d => d.value), 1);

  return (
    <div style={{display:"grid",gap:12}}>

      {data.map(item => {

        const pct = (item.value/max)*100;

        return (
          <div key={item.month}>

            <div style={{
              display:"flex",
              justifyContent:"space-between",
              fontSize:14,
              marginBottom:4
            }}>
              <span>{item.month}</span>
              <strong>R$ {item.value.toFixed(2)}</strong>
            </div>

            <div style={{
              height:10,
              background:"#e5e7eb",
              borderRadius:999
            }}>
              <div style={{
                width:`${pct}%`,
                height:"100%",
                background:"#111827",
                borderRadius:999
              }} />
            </div>

          </div>
        );
      })}
    </div>
  );
}