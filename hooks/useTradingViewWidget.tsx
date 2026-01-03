'use client'
import { useEffect, useRef } from "react";

// chart parameters; height is automatically 600 accepts string urls, and there is a list of settings
const useTradingViewWidget = (scriptURL: string, config: Record<string,unknown>, height = 600) => {
    //points to div or nothing acts as a sticky note so it knows where to draw
    const containerRef = useRef<HTMLDivElement | null>(null);

    //whenever the 3 params change excecute
    useEffect(() => {
        if(!containerRef.current) return;
        // checks if there is a chart loaded
        if(containerRef.current.dataset.loaded) return;
        containerRef.current.innerHTML = `<div class = "tradingview-widget-container__widget" style = "width: 100%; height: ${height}px;"></div>`;
        
        const script = document.createElement("script");
        script.src = scriptURL;
        script.async = true;
        script.innerHTML = JSON.stringify(config);
        containerRef.current.appendChild(script);
        containerRef.current.dataset.loaded = 'true';

        return()=>{
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
                delete containerRef.current.dataset.loaded;
            }
        }
      },
      [scriptURL,config,height]
    );

  return containerRef;
};

export default useTradingViewWidget;