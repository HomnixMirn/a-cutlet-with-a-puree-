import { useEffect , useState,useRef} from 'react'
import poisk from '../static/img/poisk.png'
import './Calendar.css'
import {API_URL} from '../index'
import axios from 'axios'

function Calendar()  {
    const [checkModal, setCheckModal] = useState(true)
    //TODO: добавить событие пользователю по id
    // const id = 55
    // const headers = {Authorization: 'Token ' + localStorage.getItem('token')}
    // axios.post(API_URL + 'add_personal_event', {'id':id} ,   {headers: {'Authorization': 'Token ' + localStorage.getItem('token')}}).then(res => console.log( )).catch(err => console.log(err))

    const [events, setEvents] = useState([])
    const filtersRef = []
    const searchRef = []
    const timesRef = ''
    const page_num = 0
    const filters = useRef(filtersRef)['current'];
    const [search, setSearch] = useState(useRef(searchRef)['current']);
    const [times, setTimes] =useState(useRef(timesRef)['current']) ;

    console.log(times);
    
    

    useEffect(() => {
        axios.get(API_URL + page_num+ '/get_events', {params: {"filters":filters.join(','), "search":search, "time":times}} ).then(res => setEvents(res.data)).catch(err => console.log(err))
    }, [])
    console.log(events)
    console.log(  {params: {"filters":filters.join(','), "search":search, "time":times}})

    function handleClick(name) {
        try{
          if (filters.includes(name)){
            filters.splice(filters.indexOf(name), 1)
            console.log(filters)
          }
          else {
              filters.push(name)
              console.log(filters)
              }
          }catch(e){
              console.log(e)
              console.log("error")
            }
        }


    function handleTime(time) {
        setTimes('')
        setTimes(time)
        console.log(times)
    }



    function acceptfilters(){
        axios.get(API_URL + page_num+ '/get_events', {params: {"filters":filters.join(','), "search":search, "time":times}} ).then(res => setEvents(res.data)).catch(err => console.log(err))
    }
    return (
    <div className='mega-block'>
        <div className="calendar-top">
            <h1 className="h1-calendar">Календарь</h1>
            <form className="block-poisk">
                <div className="poisk-abc">
                    <input type="text" placeholder="Поиск" className='input-poisk' value={search}
                    onChange={(e) => {
                        
                        
                        setSearch(e.target.value);
                        console.log(search)
                        axios.get(API_URL + page_num + '/get_events', {
                        params: {
                            filters: filters.join(','),
                            search: search,
                            time: times
                        }
                        })
                        .then(res => setEvents(res.data))
                        .catch(err => console.log(err))
                    }} />

                    
                    
                    
                    <div className="button-form-poisk">
                        <img src={poisk} alt="" />
                    </div>
                </div>
            </form>
             <button className="check-filter" /*onClick={() => setCheckModal(!checkModal)*/> 
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37 1H1L15.4 19.92V33L22.6 37V19.92L37 1Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </div>
        <div className="calendar-bottom">
            <div className="filterSort" style={{display: checkModal ? 'flex' : 'none'}}>
                <div className="filter">
                    <h1 className="filter-h1">Пол</h1>
                    <div className="buts-filter">
                        <button onClick={() => handleClick('мужчины')} className='but-filter'>Мужчины</button>
                        <button onClick={() => handleClick('женщины')} className='but-filter'>Женщины</button>
                        <button onClick={() => handleClick('юноши')} className='but-filter'>Юноши</button>
                        <button onClick={() => handleClick('девушки')} className='but-filter'>Девушки</button>
                        <button onClick={() => handleClick('мальчики')} className='but-filter'>Мальчики</button>
                        <button onClick={() => handleClick('девочки')} className='but-filter'>Девочки</button>
                    </div>
                </div>
                <div className="prev-filterSort"></div>
                <div className="sort">
                    <h1 className="sort-h1">Мероприятие</h1>
                    <div className="buts-sort">
                        <button onClick={() => handleTime('next_day')} className="but-sort">Ближайшие</button>
                        <button onClick={() => handleTime('next_week')} className="but-sort">Текущей недели</button>
                        <button onClick={() => handleTime('next_month')} className="but-sort">Следующего месяца</button>
                        <button onClick={() => handleTime('next_quarter')} className="but-sort">Квартал</button>
                        <button onClick={() => handleTime('next_half_year')} className="but-sort">Полугодия</button>
                    </div>
                </div>
                <div className="prev-filterSort"></div>
                <button onClick={() => acceptfilters()} class="button-form-filterSort">Применить</button>
            </div>
            <div className="calendars"> 
                
                    {/* <div className="calendar-cart-top">
                        <h1 className="h1-cart">DD/MM/YYYY</h1>
                        <div className="prev-cart"></div>
                        <h1 className="h1-cart">XX:XX</h1>
                        <div className="prev-cart"></div>
                        <h1 className="h1-cart">Локация</h1>
                    </div>
                    <div className="calendar-cart-bottom">
                        <h1 className="opis-cart">Описание</h1>
                    </div> */}
                    {events.map(event => (
                        <div className="calendar" /*key={event.id} onClick={() => window.location.href = '/personal_event/' + event.id}*/ >
                    
                            <div className="calendar-cart">
                                <div className="calendar-cart-top">
                                    <h1 className="h1-date">{event.date_start} <br></br> {event.date_end}</h1>
                                    <div className="name-location">
                                        <h1 className="h1-name">{event.name}</h1>
                                        <h1 className="h1-location">{event.location}</h1>
                                    </div>
                                </div>
                                <div className="calendar-cart-bottom">
                                    <h1 className="opis-cart">{event.description} , {event.age_group}</h1>
                                </div>
                             </div>
                        </div>))}
            </div>
        </div>
    </div>
    )
}
export default Calendar