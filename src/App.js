import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import {
Eventcalendar,
} from '@mobiscroll/react';
import { useMemo, useState } from 'react';

const STAFF_SLOT = 4

const resources = [
  { id: 1, name: '1' },
  { id: 2, name: '2' },
  { id: 3, name: '3' },
  { id: 4, name: '4' },
  { id: 5, name: '5' },
  { id: 6, name: '6' },
  { id: 7, name: '7' },
  { id: 8, name: '8' },
  { id: 9, name: '9' },
  { id: 10, name: '10' },
  { id: 11, name: '11' },
  { id: 12, name: '12' },
  { id: 13, name: '13' },
  { id: 14, name: '14' },
  { id: 15, name: '15' },
  { id: 16, name: '16' },
  { id: 17, name: '17' },
  { id: 18, name: '18' },
  { id: 19, name: '19' },
  { id: 20, name: '20' },
  { id: 21, name: '21' },
  { id: 22, name: '22' },
  { id: 23, name: '23' },
  { id: 24, name: '24' },
  { id: 25, name: '25' },
  { id: 26, name: '26' },
  { id: 27, name: '27' },
  { id: 28, name: '28' },
  { id: 29, name: '29' },
  { id: 30, name: '30' },
  { id: 31, name: '31' },
  { id: 32, name: '32' },
  { id: 33, name: '33' },
  { id: 34, name: '34' },

];


const view = {
timeline: {
type: 'week',
eventList: true,
}
}


function App() {

  const allSlots = [
    {
      id: 0,
      name: "Start",
    },
    {
      id: 1,
      name: "Trucks",
    },
    {
      id: 2,
      name: "Staff",
    },
    {
      id: 3,
      name: "Jobs",
    }
  ];

  const mySlots = allSlots
  const [invalidSlots, setInvalidSlots] = useState([]);
  const [isJobSlotActive, setIsJobSlotActive ] = useState(false)
  const [activeSlotDate, setActiveSlotDate ] = useState(new Date())

  const myEvents = useMemo(
    () => [
  {start:new Date(),end:new Date(),title:"Drag Me Quickly",slot:2,resource:1},
      ],
      [],
  )  


  function determineInvalidSlots(activeSlot){
    const slotArray = allSlots.filter(slot => slot.id !== activeSlot).map(slot => slot.id);
    setInvalidSlots(slotArray)
  }

  function updateInvalidSlots() {
    const myInvalid = [];
    if (invalidSlots.length > 0) {

      //invalid handling for the job slot
      invalidSlots.forEach(slot => {
        myInvalid.push({
          slot: slot,
          recurring: {
            repeat: 'daily',
          },
          cssClass: 'md-lunch-break-class mbsc-flex',
        });
      });

      //additional invalid handling for all other slots
      if(!isJobSlotActive){
        //set non-active days invalid
        myInvalid.push({
          recurring: {
            repeat: 'daily',
          },
          recurringException: [activeSlotDate],
          cssClass: 'md-lunch-break-class mbsc-flex',
        })
    }
      //handling for page load
    } else {
      return {};
    }
  
    return myInvalid;
  }

return (
<Eventcalendar
view={view}
data={myEvents}
resources={resources}
clickToCreate={true}
dragToMove={true}
selectMultipleEvents={true}
slots={mySlots}
invalid={updateInvalidSlots()}
onEventDragStart={function (event, inst) {
  console.log("onEvenDragStart triggered");
  const activeSlot = event.event.slot
  const activeDate = event.event.start
  setIsJobSlotActive(activeSlot===STAFF_SLOT)
  setActiveSlotDate(activeDate)
  determineInvalidSlots(activeSlot)
}}
onEventDragEnd={(event, inst) => {
  console.log("onEvenDragEnd triggered");
  setInvalidSlots([])
}}
onEventUpdate={(event, inst) => {
console.log("onEventUpdate triggered");
}}
onEventUpdated={(event, inst) => {
console.log("onEventUpdated triggered");
}}
onEventUpdateFailed={(event, inst) => {
console.log("onEventUpdateFailed triggered");
}}
onEventHoverIn={(event, inst) => {
console.log("onEventHoverIn triggered")
}}

/>
);
}

export default App;