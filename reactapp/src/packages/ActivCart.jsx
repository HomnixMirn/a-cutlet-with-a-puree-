import { useEffect,useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import './Activity.css'
import axios from 'axios';
import { API_URL } from '..';

function Activity({ match }){
    const [event,setEvent] = useState([])
    const {id}  = useParams();
    console.log(id)
    useEffect(()=>{
        axios.get(
            API_URL + "get_event/" + id,{id}
        ).then(
            (res) => {setEvent(res.data)}
        ).catch(
            (erorr) => {console.log(erorr)}
        )
    },[]
    )
return(

    <div className ="main-activity">
        <h1 className="activity-name">{event.name}</h1>
        <div className="activity-quadruple">
            <div className="activity-description">
                <div className='activity-description2'>
                    <p className="activity-p">Локация:{event.location}</p>
                    <p className="activity-p">Возрастная группа:{event.age_group}</p>
                    <p className="activity-p">Описание:{event.description}</p>
                </div>
            </div>
            <div className="activity-triple">
                <div className="div__activity-img">
                    <img className="activity-img"></img>
                </div>
                <div className="activity-double">
                    <div className="div_activity-score">
                        <div className="activity-score">
                            <p className="p-kolichestvo">Количество участников</p>
                            <p className="p-number">{event.participants}</p>
                        </div>
                    <div className="div__activity-button">
                        <button type = "submit" className="activity-button">Записаться</button>
                    </div>
                    </div>
                    <div className="activity-qoute">
                        <p className="quote-p">Цитата:</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="activity-data">
        <p className="date-start">{event.date_start}</p>
        <p className="date-start">-</p>
        <p className="date-start">{event.date_end}</p>
        </div>




    </div>
)
}
export default Activity
