import { useEffect , useState} from 'react'
import poisk from '../static/img/poisk.png'
import './Calendar.css'
import {API_URL} from '../index'
import axios from 'axios'

function Calendar()  {
    const [checkModal, setCheckModal] = useState(true)
    //TODO: добавить событие пользователю по id
    // const id = 4
    // const headers = {Authorization: 'Token ' + localStorage.getItem('token')}
    // axios.post(API_URL + 'add_personal_event', {'id':id} ,   {headers: {'Authorization': 'Token ' + localStorage.getItem('token')}}).then(res => console.log( )).catch(err => console.log(err))

    return (
    <div className='mega-block'>
        <div className="calendar-top">
            <h1 className="h1-calendar">Календарь</h1>
            <form className="block-poisk">
                <div className="poisk-abc">
                    <input type="text" placeholder="Поиск" className='input-poisk'/>
                    <div className="button-form-poisk">
                        <img src={poisk} alt="" />
                    </div>
                </div>
            </form>
            <button className="check-filter" onClick={() => setCheckModal(!checkModal)}>
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
                        <button className='but-filter'>Мужчины</button>
                        <button className='but-filter'>Женщины</button>
                        <button className='but-filter'>Юноши</button>
                        <button className='but-filter'>Девушки</button>
                        <button className='but-filter'>Мальчики</button>
                        <button className='but-filter'>Девочки</button>
                    </div>
                </div>
                <div className="prev-filterSort"></div>
                <div className="sort">
                    <h1 className="sort-h1">Мероприятие</h1>
                    <div className="buts-sort">
                        <button className="but-sort">Ближайшие</button>
                        <button className="but-sort">Текущей недели</button>
                        <button className="but-sort">Следующего месяца</button>
                        <button className="but-sort">Квартал</button>
                        <button className="but-sort">Полугодия</button>
                    </div>
                </div>
                <div className="prev-filterSort"></div>
                <button class="button-form-filterSort">Применить</button>
            </div>
            <div className="calendars"> 
                <div className="calendar-cart">
                    <div className="calendar-cart-top">
                        <h1 className="h1-cart">DD/MM/YYYY</h1>
                        <div className="prev-cart"></div>
                        <h1 className="h1-cart">XX:XX</h1>
                        <div className="prev-cart"></div>
                        <h1 className="h1-cart">Локация</h1>
                    </div>
                    <div className="calendar-cart-bottom">
                        <h1 className="opis-cart">Описание</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Calendar