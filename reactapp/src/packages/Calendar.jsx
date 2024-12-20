import { useEffect , useState,useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import poisk from '../static/img/poisk.png'
import './Calendar.css'
import {API_URL} from '../index'
import axios from 'axios'

function Calendar()  {
    const [checkModal, setCheckModal] = useState(true)
    const navigate = useNavigate();
    //TODO: добавить событие пользователю по id
    // const id = 55
    // const headers = {Authorization: 'Token ' + localStorage.getItem('token')}
    // axios.post(API_URL + 'add_personal_event', {'id':id} ,   {headers: {'Authorization': 'Token ' + localStorage.getItem('token')}}).then(res => console.log( )).catch(err => console.log(err))
    const [events, setEvents] = useState([])
    const filtersRef = []
    const searchRef = []
    const timesRef = ''
    const page_numRef = 0
    const [page_num, setPage_num] = useState(useRef(page_numRef)['current']);
    const [filters, setFilters] = useState([]);
    const [search, setSearch] = useState(useRef(searchRef)['current']);
    const [times, setTimes] =useState(useRef(timesRef)['current']);
    const [pages, setPages] = useState([])
    console.log(times);
    
    

    useEffect(() => {
        axios.get(API_URL + page_num+ '/get_events', {params: {"filters":filters.join(','), "search":search, "time":times}} ).then(res =>acceptData(res)).catch(err => console.log(err))
    }, [search, page_num])
    console.log(events)
    console.log(pages)

    function handleClick(name) {
        try {
          if (filters.includes(name)) {
            setFilters(filters.filter((filter) => filter !== name));
            console.log(filters);
          } else {
            setFilters([...filters, name]);
            console.log(filters);
          }
        } catch (e) {
          console.log(e);
          console.log("error");
        }
      }

    function handleTime(time) {
        setTimes('')
        setTimes(time)
        console.log(times)
    }

    // const fetchEvents = useCallback(() => {
    //     axios.get(API_URL + page_num + '/get_events', {
    //       params: {
    //         filters: filters.join(','),
    //         search: search,
    //         time: times
    //       }
    //     })
    //     .then(res => acceptData(res))
    //     .catch(err => console.log(err))
    //   }, [page_num,search])

    function acceptfilters(){
        axios.get(API_URL + page_num+ '/get_events', {params: {"filters":filters.join(','), "search":search, "time":times}} ).then(res => acceptData(res) ).catch(err => console.log(err))
        setPage_num(0)
    }

    function acceptData(res){
        for(let i=0; i<2;i++){
            setEvents(res.data['events'])
            const pagss =[]
            for (let i=0;i<res.data['pages'];i++){
                pagss.push(i)
            }
            setPages(pagss)

        }
        
    }

    function next_page(page){
        if (page >= pages.length || page < 0){
            return
        }
        setPage_num(page)
        // fetchEvents()

    }

    const handleDetailsClick = (id) => {
        navigate(`/event/${id}`);
    };
    

    return (
    <div className='mega-block'>
        <div className="calendar-top">
            <h1 className="h1-calendar">Календарь</h1>
            <form className="block-poisk">
                <div className="poisk-abc">
                    <input type="text" placeholder="Поиск" className='input-poisk' value={search}
                    onChange={(e) => {
                        

                            setSearch(e.target.value);
                            setPage_num(0)
                            // fetchEvents()
 

                        
                        
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
                        <button onClick={() => handleClick('мужчины')} className={filters.includes('мужчины') ? 'but-filter selected' : 'but-filter'}>Мужчины</button>
                        <button onClick={() => handleClick('женщины')} className={filters.includes('женщины') ? 'but-filter selected' : 'but-filter'}>Женщины</button>
                        <button onClick={() => handleClick('юноши')} className={filters.includes('юноши') ? 'but-filter selected' : 'but-filter'}>Юноши</button>
                        <button onClick={() => handleClick('девушки')} className={filters.includes('девушки') ? 'but-filter selected' : 'but-filter'}>Девушки</button>
                        <button onClick={() => handleClick('мальчики')} className={filters.includes('мальчики')? 'but-filter selected' : 'but-filter'}>Мальчики</button>
                        <button onClick={() => handleClick('девочки')} className={filters.includes('девочки') ? 'but-filter selected' : 'but-filter'}>Девочки</button>
                    </div>
                </div>
                <div className="prev-filterSort"></div>
                <div className="sort">
                    <h1 className="sort-h1">Мероприятие</h1>
                    <div className="buts-sort">
                        <button onClick={() => handleTime('next_day')} className={times === 'next_day' ? 'but-sort selected' : 'but-sort'}>Ближайшие</button>
                        <button onClick={() => handleTime('next_week')} className={times === 'next_week' ? 'but-sort selected' : 'but-sort'}>Текущей недели</button>
                        <button onClick={() => handleTime('next_month')} className={times === 'next_month' ? 'but-sort selected' : 'but-sort'}>Следующего месяца</button>
                        <button onClick={() => handleTime('next_quarter')} className={times === 'next_quarter' ? 'but-sort selected' : 'but-sort'}>Квартал</button>
                        <button onClick={() => handleTime('next_half_year')} className={times === 'next_half_year' ? 'but-sort selected' : 'but-sort'}>Полугодия</button>
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
                                        <div class = "div__calendar-button">
                                        <button type = "submit" className="calendar-button" onClick={() => handleDetailsClick(event.id)} >ПОДРОБНЕЕ</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="calendar-cart-bottom">
                                    <h1 className="opis-cart">{event.description}</h1>
                                    <h1 className="opis-cart  age">Возрастные группы : {event.age_group}</h1>
                                </div>
                             </div>
                        </div>))}
                        {events.length === 0 ? <h1 className="no-events">Нет мероприятий</h1> : 
                        <div className="pages">
                            <div className="page_number arrow" onClick={() => next_page(page_num-1)}>←</div>
                                <div className={`page_number ${0 === page_num ? 'active' : ''}`} onClick={() => next_page(0)}>1</div>
                                {pages.slice(Math.max(0, page_num - 2), Math.min(pages.length-1, page_num + 3)).map((page, index) => (
            page+1  === 1 ? '' : <div key={index} className={`page_number ${page === page_num ? 'active' : ''}`} onClick={() => next_page(page)}>{page+1}</div>
            ))}

                                <div className={`page_number ${pages.length - 1 === page_num ? 'active' : ''}`} onClick={() => next_page(pages[pages.length - 1] )}>{pages[pages.length - 1] + 1}</div>
                            <div className="page_number arrow" onClick={() => next_page(page_num+1)}>→</div>
                        </div>}
            </div>
        
        </div>
    </div>
    )
}
export default Calendar