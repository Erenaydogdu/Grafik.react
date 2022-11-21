import './App.css';
import {useEffect, useState} from "react"

function App() {
  const getRandomNumber=()=>{
    return Math.floor(Math.random()*10+1)
  }
  const data=[{
    id:1,
    title:"Galatasaray",
    color:"red",
    textColor:"yellow",
    value: getRandomNumber(),
    maxValue:5000,
  },
  {
    id:2,
    title:"Fenerbahçe",
    color:"blue",
    textColor:"yellow",
    value:getRandomNumber(),
    maxValue:4000,
  },
  {
    id:3,
    title:"Beşiktaş",
    color:"black",
    textColor:"white",
    value:getRandomNumber(),
    maxValue:3000,
  },
  {
    id:4,
    title:"Bursaspor",
    color:"green",
    textColor:"white",
    value:getRandomNumber(),
    maxValue:2000,
  },
  {
    id:5,
    title:"Trabzonspor",
    color:"#800000",
    textColor:"#3BB9FF",
    value:getRandomNumber(),
    maxValue:1000,
  },
  ];

  const setBarDataRandom=()=>{
    let data=[...barData];
    data.map((item)=>{
      return item.value+=getRandomNumber()
    });
    setBarData(data);
  };

  function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  useEffect((i)=>{
    const arr=[...barData];
    let timer;
    timer=setInterval(()=>{
      arr.forEach((item,index)=>{
        if(item.value>item.maxValue){
          let data=[...barData];
          data.map((item)=>{ 
            return item.value = item.maxValue
          });
          setBarData(data);
          clearInterval(timer);
        }else{
          setBarDataRandom();
        }
      })
    },900)
  },[])

  const [barData,setBarData]=useState(data)
  return (
    <div className="App">
      <h1>React Yarışan Barlar Uygulaması</h1>
      {
        barData.sort(compareValues('value','desc')).map((item,index)=>{
          return <div className='chart' 
          style={{
            color:item.textColor, 
            backgroundColor:item.color,
            width:item.value >= item.maxValue? "99%" : (item.value*100) / item.maxValue+"%",
            transform:`translateY(${index*60 +20 +"px"})`
          }} 
          key={index}>
            {"En Değerli "+(index+1)+". şirket => "+item.title + " "+" Şirket Değeri: "+item.value }
            
          </div>
        })
      }
    </div>
  );
}

export default App;
