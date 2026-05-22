import { useState,useEffect } from 'react'

export default function Myinfo() {

    const [texts, setText] = useState([])
    
    const fullTexts = ["const", "myInformation", "=",
        "{", "Name", ":", '"Korchat Piriyawongpaiboon"', ",", "Role", ":", '"Software Developer"', ",",
             "Tech_stack", ":", '[/"JavaScript"/,/"Node.js"/,/"React"/,/"Express"/,/"mongodb"/]', "}"]; 
       for(let i=0;i<fullTexts.length;i++){
        texts.push("");
    }   
    





    useEffect(  () => {

        let index = 0;
        let textIndex = 0;
        const interval =  setInterval(() => {

            let length = fullTexts[textIndex].length;
           // console.log(index,textIndex,length);
            if (index < length) {
                setText(prevTexts => {
                    const newTexts = [...prevTexts];
                    newTexts[textIndex] = fullTexts[textIndex].slice(0, index + 1);
                    return newTexts;
                });
                index++;
            } else {
                index = 0;
                textIndex++;
                if (textIndex >= fullTexts.length) {
                    return  clearInterval(interval);
                }
            }
            return () => clearTimeout(interval);
            
        }, 25);
    }, []);

    return (
        <div className=" flex flex-col text-[2vw] bg-gray-700 text-green-400 w-[80vw] h-fit ml-[20vw] p-4">
        <span className="flex flex-row justify-baseline font-bold gap-1">
            <span className="text-red-400">{texts[0]}</span>
            <span className="text-purple-400">{texts[1]}</span>
            <span  className="text-white">{texts[2]}</span>
        </span>
      
      <span className="flex flex-row justify-baseline gap-1"> 
        <p className="text-pink-400">{texts[3]}</p> 
        </span>
        <span className="flex flex-row justify-baseline gap-1">

        <p  className="text-white">{texts[4]}</p>
        <p >{texts[5]}</p>
        <p>{texts[6]}</p>
        <p className="text-white">{texts[7]}</p>
        </span>
      
      
       <span className="flex flex-row justify-baseline gap-1">
        <p className="text-white">{texts[8]}</p>
        <p >{texts[9]}</p>
        <p>{texts[10]}</p>
        <p className="text-white">{texts[11]}</p>
        </span>
        <span className="flex flex-row justify-baseline gap-1">
        <p className="text-white">{texts[12]}</p>
        <p>{texts[13]}</p>
        {texts[14].split('/').map((item, index) => {
           
           if(item === "["||item === "]"||item === ','){return <span key={index} className="text-white">{item}</span>}
           else return <span key={index} className="text-green-400">{item}</span>
        })}
        </span>

        <span className="flex flex-row justify-baseline gap-1">
        <p  className="text-pink-400">{texts[15]} </p>
        </span>
        
        </div>
        
    );




}