import { useEffect,useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import './Activity.css'
import axios from 'axios';
import { API_URL,API_MEDIA } from '..';

function Activity({ }){
    const [event,setEvent] = useState([])
    const {id}  = useParams();
    const navigate = useNavigate();
    console.log(id)

    useEffect(()=>{
        axios.get(
            API_URL + "get_event/" + id,{id}
        ).then(
            (res) => {
                setEvent(res.data)
            }
        ).catch(
            (erorr) => {console.log(erorr)}
        )
    },[]
    )
    const dataEvent = event.event ?? [] 
    const dataQuotes = event.quotes ?? [] 

    const handleRegister = () => {
        const token = localStorage.getItem('token'); // Предполагается, что токен хранится в localStorage
        if (!token) {
            console.log('No token provided');
            navigate('/register')
            return;
        }

        axios.post(`${API_URL}add_personal_event`, { id }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log('Event registered successfully');
            navigate('/user');
        })
        .catch((error) => {
            console.log('Error registering event:', error.response.data);
        });
    };
return(

    <div className ="main-activity">
        <h1 className="activity-name">{dataEvent.name}</h1>
        <div className="activity-quadruple">
            <div className="activity-description">
                <div className='activity-description2'>
                    <p className="activity-p">Локация:{dataEvent.location}</p>
                    <p className="activity-p">Возрастная группа:{dataEvent.age_group}</p>
                    <p className="activity-p">Описание:{dataEvent.description}</p>
                </div>
            </div>
            <div className="activity-triple">
                <div className="div__activity-img">
                    <img src= {API_MEDIA + dataQuotes.img} className="activity-img"/>
                </div>
                <div className="activity-double">
                    <div className="div_activity-score">
                        <div className="activity-score">
                            <p className="p-kolichestvo">Количество участников</p>
                            <p className="p-number">{dataEvent.participants}</p>
                        </div>
                    <div className="div__activity-button">
                        <button type = "submit" className="activity-button"  onClick={handleRegister}  >Записаться</button>
                    </div>
                    </div>
                    <div className="activity-qoute">
                        <p className="quote-p">{dataQuotes.citation} - {dataQuotes.name}</p>
                    </div>

                </div>
            </div>
        </div>
        <div className="activity-data">
        <p className="activity__date-start">{dataEvent.date_start}</p>
        <p className="activity__date-tire">-</p>
        <p className="activity__date-start">{dataEvent.date_end}</p>
        </div>




    </div>
)
}
export default Activity
