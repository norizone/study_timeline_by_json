import axios from "axios";

type typeTimeTableApi = { 
  date:string;
  start_at:string;
  end_at:string; 
  title:string;
  summary:string;
  room:string;
 } 

const getTimeTableApi = async()=>{
  const result = await axios.get("./../json/timeTable1.json");
  return result
}

const init = (apiDatas:Array<typeTimeTableApi>,targetTable:HTMLElement)=>{
  apiDatas.sort((a,b)=>((a.start_at<b.start_at)? -1 : 1))
  const setDateLists = apiDatas.map((apiData)=> apiData.date)
  const dateLists = [...new Set(setDateLists)]
  dateLists.sort()
  const delimiterDateDatas = dateLists.map((dateList)=>{
    return apiDatas.filter(({date})=>date===dateList)
  });
  delimiterDateDatas.forEach((delimiterDateData)=>{
    const parent = setHtmlElement({tag:'dl'})
    const h = setHtmlElement({tag:'dt',text:delimiterDateData[0].date});
    const wrap = setHtmlElement({tag:'div',className:'wrap'});
    let lunchTimeFlag = false;
    parent.appendChild(h)
    parent.appendChild(wrap);
    targetTable.appendChild(parent);
    delimiterDateData.forEach((item)=>{
      //会議室判定は?
      //startTimeが12じが来たら昼休憩 展示表示 一回だけ
      if( item.start_at >= "12:00" && !lunchTimeFlag){
        const lunch = setHtmlElement({tag:'p',text:'[12:00 ～ 13:00]昼休憩',className:'item'});
        lunch.dataset.room = '0';
        const exhibition = setHtmlElement({tag:'p',text:'[13:00 ～ 13:30]展示',className:'item'})
        exhibition.dataset.room = '0';
        wrap.appendChild(lunch);
        wrap.appendChild(exhibition);
        lunchTimeFlag = true;
      }
      const timeBox = setHtmlElement({tag:'dd',className:'item'});
      timeBox.dataset.start = item.start_at;
      timeBox.dataset.end = item.end_at;
      timeBox.dataset.room = item.room;
      const start = setHtmlElement({tag:'p',text:item.start_at})
      const end = setHtmlElement({tag:'p',text:item.end_at})
      const title = setHtmlElement({tag:'p',text:item.title});
      const summary = setHtmlElement({tag:'p',text:item.summary});
      timeBox.appendChild(start);
      timeBox.appendChild(end);
      timeBox.appendChild(title);
      timeBox.appendChild(summary);
      wrap.appendChild(timeBox);
    });
  });
}

const setHtmlElement = ({tag='p',className='',text='',id=''})=>{
  const inputEl = document.createElement(tag);
  className&&(inputEl.className = className);
  id&&(inputEl.id = id);
  text&&(inputEl.innerHTML = text);
  return inputEl
}

getTimeTableApi().then(result=>{
  const targetTable:HTMLElement|any|null = document.getElementById("js-targetTimeTable")??null;
  targetTable && init(result.data,targetTable)
});

