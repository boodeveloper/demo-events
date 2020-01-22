import React, { useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import styled from "styled-components"
import DateTimePicker from "react-datetime-picker"
import "react-big-calendar/lib/css/react-big-calendar.css"

// export default () => <div>Hello world!</div>

const localizer = momentLocalizer(moment)

const Section = styled.div`
  display: flex;
  align-items: center;
`

export default function App() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [aEvents, setAEvents] = useState([])
  const [eventNote, setEventNote] = useState("")
  const [allDay, setAllDay] = useState(false)

  const onStartDateChange = date => setStartDate(date)

  const onEndDateChange = date => setEndDate(date)

  const onNoteChange = e => {
    const noteValue = e.target.value
    setEventNote(noteValue)
  }

  const onCheckChange = e => {
    setAllDay(!allDay)
  }
  const onClickClear = e => {
    setEventNote("")
  }

  const onAddEvent = event => {
    const lastId = aEvents[aEvents.length - 1] || { id: 0 }
    var eventObj
    if (allDay) {
      eventObj = {
        id: lastId.id + 1,
        title: eventNote,
        allDay: true,
        start: startDate,
        end: endDate,
      }
    } else {
      eventObj = {
        id: lastId.id + 1,
        title: eventNote,
        start: startDate,
        end: endDate,
      }
    }
    let storeEvent = JSON.parse(JSON.stringify(aEvents))
    storeEvent.push(eventObj)
    setAEvents(storeEvent)
  }

  const onClickRemoveEvent = (eClick, event) => {
    let storeEvent = JSON.parse(JSON.stringify(aEvents))
    storeEvent = storeEvent.filter(e => {
      return e.id !== event.id
    })
    setAEvents(storeEvent)
  }
  return (
    <div className="App">
      <div style={{ height: "700px" }}>
        <Section>
          <div>Start Date: </div>
          <DateTimePicker
            onChange={onStartDateChange}
            value={startDate}
            locale={"en-EN"}
          />
        </Section>
        <Section>
          <div>End Date: </div>
          <DateTimePicker
            onChange={onEndDateChange}
            value={endDate}
            locale={"en-EN"}
          />
        </Section>
        <Section>
          <div>Note: </div>
          <input value={eventNote} onChange={onNoteChange} />
          <button onClick={e => onAddEvent(e)}>+</button>
          <button onClick={e => onClickClear(e)}>Clear</button>
        </Section>
        <Section>
          <input
            type="checkbox"
            name="allDay"
            value={allDay}
            onChange={onCheckChange}
          />
          All Day
        </Section>
        {aEvents.length > 0 ? (
          aEvents.map((evt, i) => {
            return (
              <div key={i}>
                {i + 1}. {evt.title} Time: {evt.start.toLocaleString("en")}-
                {evt.end.toLocaleString("en")}
                <button onClick={e => onClickRemoveEvent(e, evt)}>X</button>
              </div>
            )
          })
        ) : (
          <div>No event...</div>
        )}
        <Calendar localizer={localizer} events={aEvents} />
      </div>
    </div>
  )
}
