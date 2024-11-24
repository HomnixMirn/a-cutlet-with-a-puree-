import { useEffect,useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import './Activity.css'
import axios from 'axios';
import { API_URL,API_MEDIA } from '..';

function Activity(){
    const [event,setEvent] = useState([])
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const {id}  = useParams();
    const navigate = useNavigate();
    console.log(id)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
        axios.get(`${API_URL}get_event/${id}`)
            .then((res) => {
                setEvent(res.data);
                if (res.data.registered_events) { // Убедитесь, что это поле правильно возвращается сервером
                    setIsRegistered(true);
                } else {
                    setIsRegistered(false);
                }
            })
            .catch((error) => {
                console.log('Error fetching event:', error);
            });
    }, [id]);

    const dataEvent = event.event ?? [];
    const dataQuotes = event.quotes ?? [];

    const handleRegister = () => {
        if (!isAuthenticated) {
            navigate('/register');
            return;
        }

        const token = localStorage.getItem('token');
        axios.post(`${API_URL}add_personal_event`, { id }, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then((response) => {
            console.log('Event registered successfully');
            setIsRegistered(true); // Обновляем состояние после успешной регистрации
            navigate('/user');
        })
        .catch((error) => {
            console.log('Error registering event:', error.response.data);
        });

    }
    
    console.log(isRegistered)
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
                        <button
                         type = "button"
                          className="activity-button"  
                          onClick={handleRegister}
                          disabled = {isRegistered}
                          >
                            {isRegistered ? 'Вы уже записаны' : (isAuthenticated ? 'Записаться' : 'Авторизоваться')}
                            </button>
                    </div>
                    </div>
                    <div className="activity-qoute">
                        <p className="quote-p">{dataQuotes.citation} - {dataQuotes.name}</p>
                    </div>

                </div>
            </div>
        </div>
        <div className="activity-data">
        <p className="activity__date-start">{dataEvent.date_start} - {dataEvent.date_end}</p>
        </div>




    </div>
)
}
export default Activity
